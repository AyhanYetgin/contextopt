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

## Fikirler
- Claude Code'un MCP config'i ~/.claude/settings.json'da
- Kullanıcı bunu okuyup optimize edebilmeli
- Lazy loading: tool'lar sadece kullanılınca yüklensin
