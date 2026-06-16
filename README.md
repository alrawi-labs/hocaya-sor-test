# Fetva Asistanı — RAG Test Botu

Diyanet fetva verisine dayanan, Groq LLM + TF-IDF arama tabanlı basit bir chatbot.

## Dosya Yapısı

```
fetva-asistan/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.js       ← API endpoint (RAG + Groq)
│   ├── globals.css
│   ├── layout.js
│   └── page.js                ← Chat arayüzü
├── data/
│   └── fetvalar.json          ← ⭐ KENDİ VERİNİ BURAYA KOY
├── lib/
│   └── search.js              ← TF-IDF arama motoru
├── .env.local.example
├── package.json
└── README.md
```

## Kurulum (Yerel)

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. .env.local dosyası oluştur
cp .env.local.example .env.local
# Sonra .env.local içine Groq API key'ini yaz

# 3. Geliştirme sunucusunu başlat
npm run dev
# → http://localhost:3000
```

## Vercel'e Deploy

1. GitHub'a push et
2. https://vercel.com → "Import Project" → repo'yu seç
3. **Environment Variables** kısmına `GROQ_API_KEY` ekle
4. Deploy et

## Kendi Verini Eklemek

`data/fetvalar.json` dosyasını aşağıdaki formatla doldur:

```json
[
  {
    "main_topic": "HELAL ÜRÜN VE HİZMET",
    "sub_topic": "Yiyecekler",
    "date": "09 Nisan 2025",
    "question": "Soru metni...",
    "answer": "Cevap metni...",
    "keywords": ["anahtar", "kelime"],
    "url": "https://kurul.diyanet.gov.tr/..."
  }
]
```

## Groq API Key Almak

1. https://console.groq.com adresine git
2. Ücretsiz hesap aç
3. API Keys → Create API Key
4. Key'i kopyalayıp Vercel'deki Environment Variables'a ekle
"# hcoaya-sor-test" 
