# ContextOpt - AI Agent Context Optimizer

## Proje Künyesi
- **Amaç**: Claude Code/Cursor AI araçlarında MCP tool şişkinliğini optimize et, token maliyetini %60-90 azalt
- **Hedef Gelir**: 20.000-30.000 TL/ay (≈$600-900 USD)
- **Müşteri**: Developer'lar (Claude Code, Cursor, Windsurf kullanıcıları)
- **MVP Süresi**: ~6-7 hafta (15-20 saat/hafta)
- **Fiyat**: Free (OSS) / Pro $19/ay / Team $49/ay

---

## HAFTALIK TAKİP

### HAFTA 1 - CLI Çekirdek (24-30 Haziran)
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
- [ ] Dashboard Next.js başlangıcı
- [ ] İlk tweet: building in public

### HAFTA 2 - Proxy Engine (1-7 Temmuz)
- [x] MCP proxy engine (agent-server arası) — @modelcontextprotocol/sdk
- [x] Server lifecycle manager (spawn/kill/restart)
- [x] Lazy tool discovery (sadece profile'daki server'lar başlatılır)
- [x] Context window optimizer (profile'a göre tool filtreleme + token savings)
- [x] Profile sistemi (coding/debug/research)
- [x] Test: sequential-thinking MCP server başarılı (tools/list çalışıyor)
- [x] GitHub repo aç → github.com/AyhanYetgin/contextopt

---

## Günlük Yapılacaklar
**29 Haziran:**
- [x] Parser env variable çözümleme
- [x] Config path discovery (Claude/Cursor/Windsurf)
- [x] Profile komutu persistent CRUD (conf paketi)
- [x] Analyze profile-aware iyileştirme
- [x] @modelcontextprotocol/sdk entegrasyonu
- [x] Server lifecycle manager (spawn/kill/restart)
- [x] Lazy tool discovery + context optimizer
- [x] Proxy engine MCP server (tools/list, tools/call)
- [x] Test: sequential-thinking server başarılı
- [ ] Dashboard için Next.js kurulumu

---

## Tech Stack
| Bileşen | Teknoloji |
|---------|-----------|
| CLI | TypeScript + Commander.js |
| Frontend | Next.js 14 + Tailwind + shadcn/ui |
| Auth | Clerk (GitHub OAuth) |
| DB | Turso (SQLite edge) |
| Hosting | Vercel |
| Payments | Stripe |
| Analytics | PostHog (self-host) |

---

## Önemli Linkler
- MCP Spec: https://spec.modelcontextprotocol.io/
- Claude Code MCP: https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview
