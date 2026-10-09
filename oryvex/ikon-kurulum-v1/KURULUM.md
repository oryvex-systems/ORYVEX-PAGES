# ORYVEX İKON — Ortak Marka Standardı V1

**Görünüm:** Sağ üstte resmî ORYVEX logo görseli + **ORYVEX DİJİTAL SİSTEMLER**.  
**Hedef:** https://oryvex.com.tr/

## Mac'e bir defalık kurulum
Bu klasördeki `oryvex-ikon-ekle` dosyasını `~/.local/bin/` klasörüne kopyalayın, çalıştırma izni verin ve PATH'e ekleyin.

```bash
mkdir -p "$HOME/.local/bin" "$HOME/.oryvex/ikon-kurulum"
cp oryvex-ikon-ekle "$HOME/.local/bin/oryvex-ikon-ekle"
chmod +x "$HOME/.local/bin/oryvex-ikon-ekle"
export PATH="$HOME/.local/bin:$PATH"
```

## Kullanım
```bash
oryvex-ikon-ekle "$HOME/ANKORA-DESIGN-WEB"
```

Betik statik HTML siteleri içindir. Tarihli yedek alır, tüm HTML sayfalarına bağlantı ekler ve eski ANKORA OX bağlantısını kaldırır. `git push` veya canlı yayın yapmaz. Çalıştırmadan sonra `git diff` ve yerel test yapın.

## Geri alma
Yedek: `~/.oryvex/ikon-yedekler/PROJE_ADI/TARIH/`. HTML dosyalarını buradan geri yükleyin; eklenen `assets/oryvex/oryvex-badge.css` dosyasını kaldırın veya yedeğini geri koyun.

## Uyum
React/Next/Vue projelerinde ayrı bileşen entegrasyonu gerekir. Resmî logo `https://oryvex.com.tr/assets/brand/oryvex-resmi-logo.png` üzerinden yüklenir. CSP ve sabit üst menü çakışmalarını kontrol edin.

**Kaynak standart:** `docs/ORYVEX_IKON_KURULUM_STANDARDI.md`
