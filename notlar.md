# Proje Notları

## 24 Haziran 2026
- Proje başladı. AI Agent Context Optimizer (MCP Gateway) seçildi.
- CLI önce, dashboard sonra stratejisi.
- 15-20 saat/hafta çalışma temposu.
- Hedef: 30-50 Pro kullanıcı × $20 = $600-1000/ay
- Conduit ve Sipcode bugün PH'da 129'ar upvote aldı → pazar doğrulandı

## 29 Haziran 2026 — Proxy Engine
- @modelcontextprotocol/sdk entegrasyonu tamam
- Server lifecycle manager: spawn/kill/restart
- Lazy tool discovery: sadece profile'daki server'ları başlat
- Context window optimizer: profile'a göre tool filtreleme
- Test: sequential-thinking server başarıyla bağlandı, tools/list çalışıyor
- npm publish → contextopt@0.1.0

## CLI Tamamlama
- MCP Parser: env variable çözümleme (${VAR} → process.env)
- Config path discovery: Claude Code / Cursor / Windsurf
- Profile komutu: conf paketi ile persistent CRUD
- Built-in profiller: coding, debugging, research, default
- Analyze komutu: profile-aware rapor, per-server detaylı döküm
- CLI Pro kilidi: --http flag'i Pro token ile korumalı

## Dashboard Tamamlama
- Next.js 16 + shadcn/ui kurulum
- Landing page (hero, features, how it works, CTA, savings calculator)
- Dashboard sayfası (KPI kartları, Recharts bar chart, profil karşılaştırma)
- Dark mode (sistem algılama + toggle + localStorage)
- Works with (infinite scroll carousel, 5 araç logosu)
- Clerk auth (GitHub OAuth, sign-in/up, middleware koruması)
- Pro sayfası (/pro) + Ödeme (Lemon Squeezy)
- Başarılı ödeme yönlendirmesi (/success)
- OG meta tags (Twitter Card + Open Graph)

## 25-26 Haziran 2026 — Dashboard Canlı Veri + Tanıtım
- `/api/analyze` endpoint'i (MCP config → token/savings analizi)
- Dashboard config paste UI (textarea + dosya yükleme + adım adım talimat)
- Statik demo veri kalktı, API-driven grafikler
- localStorge ile config kalıcılığı
- README güncellendi: badge, live demo linki, fiyat tablosu
- Dev.to blog yazısı hazır (blog/contextopt-intro.md)
- Reddit: r/ClaudeAI'ye post atıldı (mod onayı bekliyor)
- Commit mesaj formatı: İngilizce + Türkçe (`Tr:` prefix)
- npm weekly downloads: 136 (sadece kendi testler + CI/CD)
- Show HN: hesap yeni, 1-2 hafta sonra tekrar dene

--- 

## ✅ Çözülen Sorunlar
- ~~Lemon Squeezy TRY/USD sorunu~~ → USD store açıldı (#417278)
- ~~Paddle entegrasyonu~~ → Lemon Squeezy'ye geçildi
- ~~Turso DB~~ → Gerek kalmadı, Clerk metadata yeterli

---

## Düşünceler
- CLI tool tek başına değer üretmeli, dashboard sonra gelmeli
- Open-source çekirdek → GitHub star'ları → organik büyüme
- İlk kullanıcı ben olacağım (dogfooding)
- AGENTS.md'yi her hafta güncelle

## Fikirler
- Demo GIF hazırla (README + Product Hunt için)
- VS Code extension?
- Team plan ($49/ay) için multi-user profile yönetimi
- Usage analytics dashboard
