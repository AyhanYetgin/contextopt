# Proje Notları

## 24 Haziran 2026
- Proje başladı. AI Agent Context Optimizer (MCP Gateway) seçildi.
- CLI önce, dashboard sonra stratejisi.
- 15-20 saat/hafta çalışma temposu.
- Hedef: 30-50 Pro kullanıcı × $19 = $570-950/ay
- Conduit ve Sipcode bugün PH'da 129'ar upvote aldı → pazar doğrulandı

## Aşama 1 Tamamlandı — Aşama 2 Başladı

### Proxy Engine (29 Haziran 2026)
- @modelcontextprotocol/sdk entegrasyonu
- Server lifecycle manager: MCP server process'lerini spawn/kill/restart
- Lazy tool discovery: sadece profile'daki server'ları başlat
- Context window optimizer: profile'a göre tool filtreleme
- Test: sequential-thinking server başarıyla bağlandı, tools/list çalışıyor
- Kullanım: `contextopt start --profile coding -c mcp-config.json`

## Aşama 1 — CLI Tamamlama
- MCP Parser: env variable çözümleme eklendi (${VAR} → process.env)
- Config path discovery: Claude Code / Cursor / Windsurf otomatik algılama
- Profile komutu: conf paketi ile persistent CRUD (create/list/set/delete)
- Built-in profiller: coding, debugging, research, default
- Analyze komutu: profile-aware rapor, per-server detaylı döküm

## Düşünceler
- CLI tool tek başına değer üretmeli, dashboard sonra gelmeli
- Open-source çekirdek → GitHub star'ları → organik büyüme
- İlk kullanıcı ben olacağım (dogfooding)
- AGENTS.md'yi her hafta güncelle

## Sorular
- CLI'ı npm paketi mi olarak dağıtalım yoksa npx mi?
  → Cevap: npx ile başla, sonra npm publish
- Dashboard'da hangi metrikler kritik?
  → Token savings %, tool usage frequency, cost per session

## ⚠️ Düzeltilmesi Gerekenler

### Lemon Squeezy — USD Store (Kritik)
- **Sorun:** Store TRY para biriminde açıldı, site $19 diyor ama checkout TRY gösteriyor
- **Çözüm:** Yeni bir USD store aç + USD ile $19/ay product oluştur
- **Ne zaman:** Rate limit geçince (1 saat sonra)
- **Nasıl:**
  1. https://lemonsqueezy.com → Stores → Create Store
  2. Store name: `ContextOpt`, Currency: **USD**, Country: `United States`
  3. Store URL: `contextopt-shop` gibi boşta bir şey
  4. New Product → Subscription → $19/month
  5. Store ID + Variant ID'yi al → `.env.local`'ı güncelle
- **Kime:** Ayhan

## 25 Haziran 2026
- Dashboard canlı veriye bağlandı:
  - `/api/analyze` endpoint'i oluşturuldu (MCP config JSON alır, token/savings analizi yapar)
  - Dashboard sayfası: config paste UI (textarea ile), analiz sonucu canlı grafik ve KPI kartları
  - localStorage ile config kalıcılığı (sayfa yenilemelerde kaybolmaz)
  - Statik `serverData` kalktı, yerini API'den gelen gerçek veri aldı
- Turso DB ihtiyacı yok — Clerk metadata her şeyi karşılıyor
- AŞAMA 1 ve AŞAMA 2 tamamen bitti, sıra AŞAMA 3 (tanıtım) ve AŞAMA 4 (lansman)

## 25 Haziran 2026 — Tanıtım Başladı
- README güncellendi: badge'ler, live demo linki, fiyat tablosu
- OG meta tagleri eklendi (site paylaşılınca güzel görünsün diye)
- Dev.to blog yazısı hazırlandı (blog/contextopt-intro.md)
- Reddit: r/ClaudeAI'ye post atıldı (mod onayı bekliyor)
- Show HN: hesap yeni olduğu için kısıtlama var, 1-2 hafta sonra tekrar dene
- npm weekly downloads: 136 (sadece kendi testler + CI/CD)
- Sıradaki: Dev.to'ya yazıyı yayınla, ardından Twitter/LinkedIn

## Fikirler
- Claude Code'un MCP config'i ~/.claude/settings.json'da
- Kullanıcı bunu okuyup optimize edebilmeli
- Lazy loading: tool'lar sadece kullanılınca yüklensin
- GitHub repo: github.com/AyhanYetgin/contextopt
- npm: contextopt@0.1.0
- Proxy: HTTP mode eklendi (--http flag, Streamable HTTP transport)
- GitHub Actions: CI (build+lint+test) + Publish workflow
- Vitest: 7 test, hepsi geçiyor
- Dashboard: Next.js 16 + shadcn/ui, landing + /dashboard sayfası
- Kullanım: contextopt start --http --port 3456
