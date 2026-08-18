# TEKNOM YAPI WEB — ORYVEX Managed

Responsive TEKNOM YAPI kurumsal web uygulaması.

## Durum
PUBLISH_READY

## Ekranlar
- Ana Sayfa
- Kurumsal
- Faaliyetlerimiz
- Projeler
- Proje Detay
- Teknolojimiz
- Katalog
- İletişim

## Cloudflare Pages
- Repository: `oryvex-systems/ORYVEX-PAGES`
- Production branch: `main`
- Root directory: `teknom-yapi`
- Build command: `npm run check`
- Build output directory: `.`
- Canonical domain: `https://www.teknomyapi.com.tr`
- Apex domain: `https://teknomyapi.com.tr` -> 301 canonical

`wrangler.toml`, `_headers`, `_redirects`, `robots.txt`, `sitemap.xml`, `health.json` ve yayın öncesi kontrol scripti hazırdır.

## ORYVEX
Deploy politikası: `oryvex/deploy.json`
SSL politikası: `oryvex/ssl-policy.json`

Nameserver değişikliği, DNS kaydı silme, domain transferi, ödeme ve credential değişikliği manuel onay gerektirir. Diğer build, staging, health ve SSL kontrolleri otomasyona uygundur.

## Tasarım standardı
Kırık beyaz + kömür siyah + klasik altın; serif başlık, sade sans-serif gövde; gerçek TEKNOM proje görselleri; ağırbaşlı, mimari, sanatsal ve teknik kurumsal dil.

## Yayın kapısı
Cloudflare Pages projesi bu kök dizine bağlanır. İlk deploy sonrası `/health.json`, HTTPS, www/apex yönlendirmesi ve SSL sertifika zinciri doğrulanır. Bu dört kontrol başarılı olmadan ORYVEX yayını sağlıklı kabul etmez.
