# ContextOpt — Yol Haritası

## ✅ Tamamlananlar

### CLI Çekirdek
- [x] CLI iskeleti (TypeScript + Commander.js)
- [x] 3 komut: analyze, start, profile
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

### Dashboard (Tasarım)
- [x] Next.js 16 + shadcn/ui kurulum
- [x] Landing page (hero, features, how it works, CTA)
- [x] Dashboard sayfası (KPI kartları, Recharts bar chart, profil karşılaştırma)
- [x] Dark mode (sistem algılama + toggle + localStorage)
- [x] Works with (infinite scroll carousel, 5 araç logosu)

---

## ⬜ Sıradaki: AŞAMA 1 — Ürünü Tamamla

### 1a. Clerk Auth (GitHub OAuth)
- [ ] Clerk kurulumu ve entegrasyonu
- [ ] GitHub ile giriş butonu
- [ ] Kullanıcı oturumu (sign-in, sign-out)
- [ ] Middleware ile route koruma

### 1b. Turso DB + API
- [ ] Turso veritabanı kurulumu
- [ ] Kullanıcı tablosu (user_id, email, plan, created_at)
- [ ] MCP config tablosu (config_json, token_analysis)
- [ ] API routes: /api/analyze, /api/profile, /api/config

### 1c. Dashboard — Gerçek Veri
- [ ] Kullanıcının kendi MCP config'ini yüklemesi
- [ ] Gerçek token verisi (statik demo veri yerine)
- [ ] API'den çekilen veri ile grafikler

### 1d. Pro Kilit Mekanizması
- [ ] Free / Pro plan ayrımı
- [ ] Pro özellik: --http profili
- [ ] Pro özellik: Detaylı analytics
- [ ] Pro özellik: Geçmiş veri

---

## ⬜ AŞAMA 2 — Para Kazanma

### 2a. Stripe Entegrasyonu
- [ ] Stripe hesabı + webhook
- [ ] $19/ay Pro plan
- [ ] Ödeme sayfası
- [ ] Abonelik yönetimi (iptal, değiştir)

### 2b. CLI'da Pro Kilidi
- [ ] API token doğrulama
- [ ] Pro komutlar: --http profili
- [ ] Ücretsiz sürümde "upgrade to Pro" mesajı

---

## ⬜ AŞAMA 3 — Tanıtım

- [ ] Tweet: building in public
- [ ] Reddit: r/ClaudeAI, r/cursor
- [ ] GitHub star kas (README güncelleme, demo GIF)
- [ ] Product Hunt sayfası hazırlığı

---

## ⬜ AŞAMA 4 — Lansman (29 Temmuz - 4 Ağustos)

- [ ] Product Hunt lansmanı
- [ ] HN Show HN
- [ ] Twitter/X thread
- [ ] İlk 3-5 müşteriyi kazan

---

## Gelir Hedefi

| Kullanıcı | Dönüşüm | Aylık Gelir |
|-----------|---------|-------------|
| 100 CLI kullanıcısı | %3-5 | $57-95 |
| 500 CLI kullanıcısı | %3-5 | $285-475 |
| 1000 CLI kullanıcısı | %3-5 | $570-950 |

- Fiyat: Free (OSS) / Pro $19/ay / Team $49/ay
- Hedef: 20.000-30.000 TL/ay (≈$600-900 USD)
