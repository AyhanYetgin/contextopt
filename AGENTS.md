# ContextOpt - AI Agent Context Optimizer

## Proje Künyesi
- **Amaç**: Claude Code/Cursor AI araçlarında MCP tool şişkinliğini optimize et, token maliyetini %60-90 azalt
- **Hedef Gelir**: 20.000-30.000 TL/ay (≈$600-900 USD)
- **Müşteri**: Developer'lar (Claude Code, Cursor, Windsurf kullanıcıları)
- **MVP Süresi**: ~6-7 hafta (15-20 saat/hafta)
- **Fiyat**: Free (OSS) / Pro $20/ay

---

## Tamamlanan Aşamalar

### ✅ HAFTA 1 - CLI Çekirdek
- [x] Proje klasörü oluştur
- [x] CLI iskeleti (TypeScript + Commander.js)
- [x] MCP settings.json parser
- [x] Tool listesi token hesaplama fonksiyonu
- [x] AGENTS.md ve notlar.md oluştur
- [x] 3 komut: analyze, start, profile
- [x] Test config ile doğrulama
- [x] Env variable çözümleme (${VAR} → process.env)
- [x] Config path discovery (Claude/Cursor/Windsurf)
- [x] Profile komutu persistent CRUD
- [x] Analyze profile-aware iyileştirme
- [x] Dashboard Next.js kurulum (shadcn/ui, landing + dashboard sayfası)

### ✅ HAFTA 2 - Proxy Engine
- [x] MCP proxy engine (agent-server arası) — @modelcontextprotocol/sdk
- [x] Server lifecycle manager (spawn/kill/restart)
- [x] Lazy tool discovery (sadece profile'daki server'lar başlatılır)
- [x] Context window optimizer (profile'a göre tool filtreleme + token savings)
- [x] Profile sistemi (coding/debug/research)
- [x] Test: sequential-thinking MCP server başarılı (tools/list çalışıyor)
- [x] GitHub repo aç → github.com/AyhanYetgin/contextopt
- [x] npm publish → contextopt@0.1.0
- [x] Proxy HTTP transport (--http flag ile)
- [x] GitHub Actions CI/CD (build + lint + test)
- [x] Test framework (Vitest) + ilk unit test'ler

### ✅ AŞAMA 1 — Ürünü Tamamla
- [x] Clerk auth (GitHub OAuth)
- [x] API routes (/api/analyze, /api/checkout, /api/webhook, /api/cli-token)
- [x] Dashboard'u gerçek veriye bağla (config paste + canlı API)
- [x] Pro kilit mekanizması (Clerk metadata ile Free/Pro ayrımı)
- [x] Lemon Squeezy ödeme entegrasyonu ($20/ay)

### ✅ AŞAMA 2 — Para Kazanma
- [x] CLI'da Pro kilidi (API token doğrulama)
- [x] Lemon Squeezy webhook + abonelik yönetimi
- [x] Ödeme sonrası yönlendirme (/success sayfası)

---

## Devam Eden Aşamalar

### 🔄 AŞAMA 3 — Tanıtım
- [x] OG meta tags (site paylaşılınca güzel görünsün)
- [x] README güncelleme (badge, live demo, fiyat tablosu)
- [x] Dev.to blog yazısı hazır (blog/contextopt-intro.md)
- [x] Reddit: r/ClaudeAI'ye post atıldı (mod onayı bekliyor)
- [ ] Tweet: building in public
- [ ] Dev.to yazısını yayınla
- [ ] Demo GIF hazırla
- [ ] Product Hunt sayfası hazırlığı

### ⬜ AŞAMA 4 — Lansman (29 Temmuz - 4 Ağustos)
- [ ] Product Hunt lansmanı
- [ ] Twitter/X thread
- [ ] Show HN
- [ ] İlk 3-5 müşteri

---

## Günlük Yapılacaklar

**25-26 Haziran:**
- [x] Dashboard canlı veri (/api/analyze endpoint)
- [x] Config upload UX (adım adım talimat + dosya yükleme)
- [x] OG meta tags
- [x] README badge, live demo, fiyat tablosu
- [x] Dev.to blog yazısı hazır
- [x] Reddit post
- [x] Commit mesaj formatı düzeltmesi (İngilizce + Türkçe)
- [ ] Dev.to yazısını yayınla
- [ ] Tweet

---

## Tech Stack
| Bileşen | Teknoloji |
|---------|-----------|
| CLI | TypeScript + Commander.js |
| Frontend | Next.js 16 + Tailwind + shadcn/ui + Recharts |
| Auth | Clerk (GitHub OAuth) |
| Hosting | Vercel |
| Payments | Lemon Squeezy |
| Storage | conf (JSON-based) + Clerk metadata |

---

## Önemli Linkler
- MCP Spec: https://spec.modelcontextprotocol.io/
- Claude Code MCP: https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview
- Canlı Site: https://contextopt.vercel.app
- GitHub: https://github.com/AyhanYetgin/contextopt
- npm: https://www.npmjs.com/package/contextopt
