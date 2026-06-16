import { search } from "../../../lib/search";

const MODELS = [
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "mixtral-8x7b-32768",
  "gemma2-9b-it",
];

async function callGroq(model, systemPrompt, userPrompt) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.4,
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    // 429 = rate limit / token quota, 503 = model unavailable → fallback yap
    const shouldFallback = res.status === 429 || res.status === 503;
    throw { status: res.status, message: err?.error?.message || res.statusText, shouldFallback };
  }

  return res.json();
}

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Mesaj boş olamaz." }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { error: "GROQ_API_KEY tanımlı değil. Vercel'de Environment Variables kısmına ekleyin." },
        { status: 500 }
      );
    }

    const results = search(message, 4);

    const context = results.length
      ? results
          .map(
            (r, idx) =>
              `[${idx + 1}] Konu: ${r.main_topic} / ${r.sub_topic}\nCevap: ${r.answer}\nKaynak: ${r.url}`
          )
          .join("\n\n---\n\n")
      : "İlgili bir fetva bulunamadı.";

    const systemPrompt = `Sen "Hocaya Sor" adlı İslami danışmanlık asistanısın.
Rasattepe Camii imamı Ramazan Mert Hoca'nın fetva veri tabanını kullanarak cevap veriyorsun.

KONUŞMA TARZI:
- Samimi ve sıcak bir hoca üslubuyla konuş
- Cevaplara "Bismillah", "Elhamdülillah" gibi ifadeler doğal ve yerinde olduğunda ekle
- Hitap için "Kardeşim", "Değerli kardeşim" gibi ifadeler kullan
- Cevap sonunda "Allah kolaylık versin", "Hayırlı olsun" gibi kısa bir dua cümlesiyle bitir
- Emin olmadığın veya fetva veri tabanında yeterli bilgi olmayan konularda "Bu meseleyi bizzat bir âlime danışmanızı tavsiye ederim" de
- Uzun değil, öz ve anlaşılır cevaplar ver; gereksiz tekrardan kaçın
- Resmi bir dil değil, içten ve samimi bir dil kullan

KISITLAMALAR:
- Yalnızca sana verilen fetva veri tabanındaki bilgilere dayan
- Kesin ve bağlayıcı fetva vermekten kaçın; "genel kanaat şudur", "âlimlerin büyük çoğunluğu şöyle der" gibi ifadeler kullan
- Siyasi konulara ve tartışmalı güncel meselelere girme
- Veri tabanında olmayan bir konuda bilgi uydurmak yerine açıkça belirt
- Fetva metinlerindeki menü/başlık tekrarları gibi web sitesi artıklarını görmezden gel, sadece asıl içeriğe odaklan`;

    const userPrompt = `İlgili Fetvalar:\n${context}\n\nKullanıcı Sorusu: ${message}`;

    let lastError = null;

    for (const model of MODELS) {
      try {
        const data = await callGroq(model, systemPrompt, userPrompt);
        const answer = data.choices?.[0]?.message?.content || "Cevap alınamadı.";

        return Response.json({
          answer,
          model, // hangi modelin cevap verdiğini görmek istersen
          sources: results.map((r) => ({
            topic: `${r.main_topic} / ${r.sub_topic}`,
            url: r.url,
          })),
        });
      } catch (err) {
        lastError = err;
        if (!err.shouldFallback) {
          // 429/503 dışı bir hata (örn. 401 auth) → fallback'e gerek yok, direkt hata dön
          break;
        }
        // shouldFallback === true → bir sonraki modeli dene
        console.warn(`Model "${model}" başarısız (${err.status}), bir sonraki deneniyor…`);
      }
    }

    return Response.json(
      { error: `Tüm modeller yanıt vermedi. Son hata: ${lastError?.message}` },
      { status: 503 }
    );
  } catch (err) {
    return Response.json({ error: err.message || "Beklenmeyen bir hata oluştu." }, { status: 500 });
  }
}