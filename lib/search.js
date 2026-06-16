import data from "../data/fetvalar.json";

// Türkçe stop words
const STOP_WORDS = new Set([
  "ve", "ile", "bir", "bu", "da", "de", "mi", "mu", "mü", "mı",
  "ne", "en", "çok", "az", "için", "gibi", "ama", "ya", "ki",
  "ise", "daha", "her", "hiç", "bunu", "buna", "beni", "bana",
  "sen", "ben", "biz", "siz", "onlar", "o", "bu", "şu", "hangi",
  "nasıl", "neden", "niçin", "nerede", "ne", "olan", "olan", "var",
  "yok", "olur", "olarak", "kadar", "sonra", "önce", "veya", "ya da",
]);

function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^a-zçğışöü0-9\s]/gi, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Her doküman için token setini önceden hesapla (build time)
const index = data.map((item) => {
  const combinedText = [
    item.question || "",
    item.answer || "",
    item.main_topic || "",
    item.sub_topic || "",
    ...(item.keywords || []),
  ].join(" ");

  const tokens = tokenize(combinedText);
  const freq = {};
  for (const t of tokens) freq[t] = (freq[t] || 0) + 1;

  return { item, freq, totalTokens: tokens.length };
});

export function search(query, topK = 4) {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = index.map(({ item, freq, totalTokens }) => {
    let score = 0;
    for (const qt of queryTokens) {
      // TF: token frekansı / toplam token
      const tf = (freq[qt] || 0) / (totalTokens || 1);
      // Basit IDF: eşleşen doküman sayısına göre
      const docFreq = index.filter((d) => d.freq[qt]).length;
      const idf = docFreq > 0 ? Math.log(index.length / docFreq) : 0;
      score += tf * idf;
    }
    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.item);
}
