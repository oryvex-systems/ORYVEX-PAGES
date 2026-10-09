# ORYVEX EKOSİSTEMİ — İKON VE YÖNLENDİRME STANDARDI V1

**Standart:** Tüm alt marka ve uygulamalarda sağ üstte resmî ORYVEX ikonu + **ORYVEX DİJİTAL SİSTEMLER** yazısı. Bağlantı: https://oryvex.com.tr/

## Kurulum komutu
İndirilebilir **ORYVEX_IKON_KURULUM_V1.zip** paketindeki `oryvex-ikon-ekle` betiğini Mac'te `~/.local/bin/oryvex-ikon-ekle` konumuna kurun. Ardından:
```bash
oryvex-ikon-ekle "$HOME/ANKORA-DESIGN-WEB"
```
Her statik HTML sitesi için hedef klasörü değiştirin.

## Kurulum prensipleri
1. Her HTML sayfasına tek bağlantı; mevcut `oryvex-link` eski rozeti değiştirilir.
2. Mobil ve masaüstü için responsive görünüm; site menülerine göre üst boşluk kontrol edilir.
3. Orijinal dosyalar `~/.oryvex/ikon-yedekler/` içinde tarihli saklanır.
4. Çıktı `~/.oryvex/ikon-kurulum/` altında kaydedilir ve Mac panosuna kopyalanır.
5. **Git commit, push, DNS ve yayın otomatik yapılmaz**; testten sonra onaylı yayın yapılır.
6. React/Next/Vue uygulamaları için ortak bileşen gerekir; HTML betiği doğrudan kullanılmaz.

**Resmî logo kaynağı:** https://oryvex.com.tr/assets/brand/oryvex-resmi-logo.png

**Kaldırma:** Tarihli yedekleri geri yükleyin ve yeni `assets/oryvex/oryvex-badge.css` dosyasını kaldırın.

**Not:** Bu dosya kurulum standardını ORYVEX kaynak deposunda kayıt altına alır. ZIP paketi ayrıca teslim edilir; GitHub deposuna ZIP ikili dosyası yüklenmiş sayılmaz.
