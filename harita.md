# ContextOpt — Yol Haritası

## ✅ Tamamlananlar

### CLI Çekirdek
- [x] CLI iskeleti (TypeScript + Commander.js)
- [x] 3 komut: analyze, start, profile, config
- [x] MCP settings.json parser + env variable çözümleme
- [x] Token hesaplama + maliyet tahmini
- [x] Config path discovery (Claude/Cursor/Windsurf)
- [x] Profile sistemi (persistent CRUD, built-in profiller)
- [x] Profile-aware analyze

### Proxy Engine
- [x] MCP proxy engine (@modelcontextprotocol/sdk)
- [x] Server lifecycle manager (spawn/kill/restart)
- [x] Lazy tool discovery
- [x] Context window optimizer
- [x] tools/list + tools/call tam destek
- [x] HTTP transport (--http flag, Streamable HTTP)

### Altyapı
- [x] npm publish → contextopt@0.1.0
- [x] GitHub repo: github.com/AyhanYetgin/contextopt
- [x] GitHub Actions CI/CD (build+lint+test+publish)
- [x] Vitest test framework + unit test'ler

### Web Dashboard
- [x] Next.js 16 + shadcn/ui kurulum
- [x] Landing page (hero, features, how it works, CTA)
- [x] Dashboard sayfası (KPI kartları, Recharts bar chart, profil karşılaştırma)
- [x] Dark mode (sistem algılama + toggle + localStorage)
- [x] Works with (infinite scroll carousel, 5 araç logosu)
- [x] OG meta tags (Twitter Card + Open Graph)

### AŞAMA 1 — Ürünü Tamamla
- [x] Clerk auth (GitHub OAuth, sign-in/up, middleware)
- [x] API routes: /api/analyze, /api/checkout, /api/webhook, /api/cli-token
- [x] Dashboard canlı veri (config paste UI, localStorage, API-driven grafikler)
- [x] Pro kilit mekanizması (Clerk metadata ile Free/Pro ayrımı)
- [x] Dashboard config upload UX (adım adım talimat, dosya yükleme)

### AŞAMA 2 — Para Kazanma
- [x] Lemon Squeezy USD store kurulumu ($20/ay Pro plan)
- [x] Ödeme sayfası (/pro) + checkout redirect (/success)
- [x] Webhook ile plan güncelleme (order_created → pro, cancelled → free)
- [x] CLI Pro token doğrulama (/api/cli-token)
- [x] CLI'da Pro kilidi (--http requirePro ile korumalı)

### AŞAMA 3 — Tanıtım (Kısmi)
- [x] README güncelleme (badge, live demo, fiyat tablosu)
- [x] Dev.to blog yazısı hazır (blog/contextopt-intro.md)
- [x] Reddit: r/ClaudeAI'ye post atıldı

---

## ⬜ Sıradaki

### AŞAMA 3 — Tanıtım (Kalan)
- [ ] Tweet: building in public
- [ ] Dev.to yazısını yayınla
- [ ] Reddit mod onayı gelince post canlı
- [ ] Show HN (hesap yeni, 1-2 hafta sonra dene)
- [ ] Demo GIF hazırla
- [ ] Product Hunt sayfası hazırlığı

### AŞAMA 4 — Lansman (29 Temmuz - 4 Ağustos)
- [ ] Product Hunt lansmanı
- [ ] Twitter/X thread
- [ ] İlk 3-5 müşteriyi kazan

---

## Gelir Hedefi

| Kullanıcı | Dönüşüm | Aylık Gelir |
|-----------|---------|-------------|
| 100 CLI kullanıcısı | %3-5 | $57-95 |
| 500 CLI kullanıcısı | %3-5 | $285-475 |
| 1000 CLI kullanıcısı | %3-5 | $570-950 |

- Fiyat: Free (OSS) / Pro $20/ay
- Hedef: 20.000-30.000 TL/ay (≈$600-900 USD)
