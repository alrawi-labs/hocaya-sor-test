"use client";

// Geometrik İslami motif - marka imzamız (Navbar ile aynı)
function IslamicStar({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,2 24.9,15.1 38,15.1 27.5,23.2 31.5,36.4 20,28.8 8.5,36.4 12.5,23.2 2,15.1 15.1,15.1" fill="#C9A84C" opacity="0.9"/>
      <polygon points="20,7 23.5,17 34,17 25.7,22.7 29,33 20,27 11,33 14.3,22.7 6,17 16.5,17" fill="#1B2A4A" opacity="0.85"/>
      <circle cx="20" cy="20" r="4" fill="#C9A84C"/>
    </svg>
  );
}

function Divider() {
  return (
    <div style={s.divider}>
      <span style={s.dividerLine} />
      <IslamicStar size={18} />
      <span style={s.dividerLine} />
    </div>
  );
}

function TeamCard({ name, role, description, initials, isLead }) {
  return (
    <div style={{ ...s.card, ...(isLead ? s.cardLead : {}) }}>
      <div style={{ ...s.avatar, ...(isLead ? s.avatarLead : {}) }}>
        <span style={s.avatarInitials}>{initials}</span>
      </div>
      {isLead && (
        <div style={s.leadBadge}>Yönetici</div>
      )}
      <div style={s.cardName}>{name}</div>
      <div style={s.cardRole}>{role}</div>
      <p style={s.cardDesc}>{description}</p>
    </div>
  );
}

function ValueItem({ icon, title, text }) {
  return (
    <div style={s.valueItem}>
      <div style={s.valueIcon}>{icon}</div>
      <div>
        <div style={s.valueTitle}>{title}</div>
        <p style={s.valueText}>{text}</p>
      </div>
    </div>
  );
}

export default function HakkindaPage() {
  return (
    <>
      <style>{css}</style>
      <main style={s.page}>

        {/* ── Hero ── */}
        <section style={s.hero}>
          <div>
            <p style={s.footerText} >
              بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ — Allah'ın adıyla
            </p>
            <p style={{marginBottom: "15px"}}>

            </p>
          </div>
          <div style={s.heroBg} aria-hidden="true" />
          <div style={s.heroContent}>
            <div style={s.heroStar}>
              <img src="/logo.png" alt="logo" style={{ width: 200, height: 200}} />
            </div>
            <p style={s.heroSub}>
              Fetva veri tabanına dayalı İslami soru-cevap asistanı
            </p>
            <div style={s.heroMeta}>
              <span style={s.heroBadge}>Bağımsız Proje</span>
              <span style={s.heroBadge}>Bilgi Amaçlı</span>
            </div>
          </div>
          {/* Dekoratif köşe motifler */}
          <svg style={s.cornerTL} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <path d="M0 0 Q40 0 40 40 Q40 0 80 0" stroke="#C9A84C" strokeWidth="1" opacity="0.3" fill="none"/>
            <circle cx="0" cy="0" r="3" fill="#C9A84C" opacity="0.4"/>
          </svg>
          <svg style={s.cornerBR} width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <path d="M80 80 Q40 80 40 40 Q40 80 0 80" stroke="#C9A84C" strokeWidth="1" opacity="0.3" fill="none"/>
            <circle cx="80" cy="80" r="3" fill="#C9A84C" opacity="0.4"/>
          </svg>
        </section>

        <div style={s.container}>

          {/* ── Proje Hakkında ── */}
          <section style={s.section}>
            <div style={s.sectionLabel}>Proje</div>
            <h2 style={s.sectionTitle}>Ne İşe Yarar?</h2>
            <Divider />
            <p style={s.bodyText}>
              <strong style={s.strong}>Hocaya Sor</strong>, kullanıcıların İslami konulardaki sorularını
              hızlıca yanıtlamak amacıyla geliştirilen, fetva veri tabanına dayalı bir yapay zeka
              asistanıdır. Sistem, dini otoriteler tarafından daha önce cevaplanmış soruları
              anlamsal arama yöntemiyle eşleştirerek ilgili bilgiyi sunar.
            </p>
            <p style={{ ...s.bodyText, marginTop: 14 }}>
              Bu platform; herhangi bir resmi kuruma, vakfa ya da dini otoriteye bağlı değildir.
              Sunulan içerikler yalnızca bilgi amaçlıdır ve bireysel fetva yerine geçmez.
              Kişisel dini meseleleriniz için mutlaka yetkili bir âlime başvurmanız tavsiye edilir.
            </p>

            <div style={s.notice}>
              <span style={s.noticeIcon}>⚠️</span>
              <p style={s.noticeText}>
                Bu chatbot herhangi bir kuruma bağlı değildir. Buradaki bilgiler genel kültür
                amaçlıdır; resmi fetva niteliği taşımaz.
              </p>
            </div>
          </section>

          {/* ── Değerlerimiz ── */}
          <section style={s.section}>
            <div style={s.sectionLabel}>İlkeler</div>
            <h2 style={s.sectionTitle}>Nasıl Çalışırız?</h2>
            <Divider />
            <div style={s.valueList}>
              <ValueItem
                icon="📖"
                title="Kaynağa Bağlılık"
                text="Her cevap, doğrulanmış fetva kaynaklarına ve dini metinlere dayanır. Yorum değil, kaynak aktarımı esas alınır."
              />
              <ValueItem
                icon="🔍"
                title="Şeffaflık"
                text="Yanıtların hangi kaynaktan geldiği açıkça gösterilir. Kullanıcı her zaman orijinal kaynağa ulaşabilir."
              />
              <ValueItem
                icon="🤝"
                title="Erişilebilirlik"
                text="Dini bilgiye ulaşmak herkesin hakkıdır. Platform, teknik bilgi gerektirmeksizin herkes tarafından kullanılabilir."
              />
              <ValueItem
                icon="🛡️"
                title="Sorumluluk"
                text="Sistem, kendi sınırlarını kullanıcıya açıkça belirtir. Belirsiz durumlarda yetkili bir âlime yönlendirme yapılır."
              />
            </div>
          </section>

          {/* ── Ekip ── */}
          <section style={s.section}>
            <div style={s.sectionLabel}>Ekip</div>
            <h2 style={s.sectionTitle}>Arkasındaki İnsanlar</h2>
            <Divider />
            <div style={s.teamGrid}>
              <TeamCard
                name="Ramazan Mert"
                role="Yönetici · Rasattepe Camii İmamı"
                description="Proje içeriğinin dini doğruluğundan ve fetva veri tabanının güvenilirliğinden sorumludur. Rasattepe Camii'nde imam olarak görev yapmaktadır."
                initials="RM"
                isLead={true}
              />
              <TeamCard
                name="Yasir Alrawi"
                role="Kurucu Geliştirici"
                description="Projenin teknik altyapısını, yapay zeka entegrasyonunu ve kullanıcı arayüzünü tasarlayıp geliştirmiştir."
                initials="YA"
                isLead={false}
              />
            </div>
          </section>

          

        </div>
      </main>
    </>
  );
}

const css = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hakkinda-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(27,42,74,0.14) !important;
  }
`;

const s = {
  page: {
    minHeight: "calc(100vh - 64px)",
    background: "#FAF8F3",
  },

  /* Hero */
  hero: {
    position: "relative",
    background: "linear-gradient(150deg, #1B2A4A 0%, #243660 60%, #1a3a55 100%)",
    padding: "60px 24px 52px",
    textAlign: "center",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%),
                      radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
    pointerEvents: "none",
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    animation: "fadeUp 0.6s ease both",
  },
  heroStar: {
    marginBottom: 16,
    display: "inline-block",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "-0.01em",
    margin: 0,
  },
  heroSub: {
    fontSize: "clamp(13px, 2.5vw, 16px)",
    color: "rgba(255,255,255,0.65)",
    marginTop: 10,
    maxWidth: 400,
    margin: "10px auto 0",
    lineHeight: 1.5,
  },
  heroMeta: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    flexWrap: "wrap",
  },
  heroBadge: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    color: "#C9A84C",
    border: "1px solid rgba(201,168,76,0.4)",
    borderRadius: 99,
    padding: "4px 12px",
  },
  cornerTL: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  cornerBR: {
    position: "absolute",
    bottom: 0,
    right: 0,
    pointerEvents: "none",
  },

  /* Container */
  container: {
    maxWidth: 760,
    margin: "0 auto",
    padding: "0 20px 60px",
  },

  /* Sections */
  section: {
    paddingTop: 52,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#C9A84C",
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(20px, 4vw, 28px)",
    fontWeight: 700,
    color: "#1B2A4A",
    margin: 0,
  },

  /* Divider */
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "16px 0 24px",
  },
  dividerLine: {
    flex: 1,
    height: 1,
    background: "linear-gradient(to right, #E8E2D6, transparent)",
  },

  /* Body */
  bodyText: {
    fontSize: 15,
    lineHeight: 1.75,
    color: "#374151",
  },
  strong: {
    color: "#1B2A4A",
    fontWeight: 600,
  },

  /* Notice */
  notice: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    background: "#FEF9EE",
    border: "1px solid rgba(201,168,76,0.35)",
    borderLeft: "3px solid #C9A84C",
    borderRadius: 8,
    padding: "14px 16px",
    marginTop: 24,
  },
  noticeIcon: {
    fontSize: 16,
    flexShrink: 0,
    marginTop: 1,
  },
  noticeText: {
    fontSize: 13,
    lineHeight: 1.6,
    color: "#6B5B2A",
    margin: 0,
  },

  /* Values */
  valueList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  valueItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    background: "#FFFFFF",
    border: "1px solid #E8E2D6",
    borderRadius: 12,
    padding: "16px 20px",
    boxShadow: "0 1px 4px rgba(27,42,74,0.06)",
  },
  valueIcon: {
    fontSize: 22,
    flexShrink: 0,
    width: 36,
    textAlign: "center",
    marginTop: 2,
  },
  valueTitle: {
    fontWeight: 600,
    fontSize: 15,
    color: "#1B2A4A",
    marginBottom: 4,
  },
  valueText: {
    fontSize: 14,
    lineHeight: 1.65,
    color: "#4B5563",
    margin: 0,
  },

  /* Team */
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
  },
  card: {
    background: "#FFFFFF",
    border: "1px solid #E8E2D6",
    borderRadius: 14,
    padding: "28px 24px 24px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(27,42,74,0.07)",
    transition: "transform 0.22s, box-shadow 0.22s",
    cursor: "default",
    position: "relative",
  },
  cardLead: {
    borderColor: "rgba(201,168,76,0.5)",
    background: "linear-gradient(160deg, #FFFDF7 0%, #FAF8F3 100%)",
    boxShadow: "0 4px 20px rgba(201,168,76,0.12)",
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: "50%",
    background: "#1B2A4A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 14px",
    border: "2px solid #E8E2D6",
  },
  avatarLead: {
    background: "linear-gradient(135deg, #1B2A4A, #243660)",
    border: "2px solid #C9A84C",
    boxShadow: "0 0 0 4px rgba(201,168,76,0.15)",
  },
  avatarInitials: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#C9A84C",
    letterSpacing: "0.03em",
  },
  leadBadge: {
    display: "inline-block",
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#C9A84C",
    border: "1px solid rgba(201,168,76,0.5)",
    borderRadius: 99,
    padding: "2px 10px",
    marginBottom: 10,
  },
  cardName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    color: "#1B2A4A",
    marginBottom: 4,
  },
  cardRole: {
    fontSize: 12,
    fontWeight: 500,
    color: "#C9A84C",
    marginBottom: 12,
    letterSpacing: "0.02em",
  },
  cardDesc: {
    fontSize: 13,
    lineHeight: 1.65,
    color: "#6B7280",
    margin: 0,
  },

  /* Footer note */
  footerNote: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 60,
    paddingTop: 28,
    borderTop: "1px solid #E8E2D6",
  },
  footerText: {
    fontSize: 13,
    color: "#9CA3AF",
    fontStyle: "italic",
  },
};