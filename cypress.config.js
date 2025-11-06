const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    // Video kaydı ayarları - Demo video için optimize edildi
    video: true, // Video kaydını açık tut
    videoCompression: 0, // 0 = En yüksek kalite (0-51 arası, 0 = lossless'a yakın, en düşük sıkıştırma)
    videosFolder: 'cypress/videos', // Video kayıt klasörü
    
    // Ekran çözünürlüğü - Test runner'da okunabilir ve yüksek kaliteli video için
    viewportWidth: 1600, // HD+ genişlik (test runner'da büyük ve okunabilir görünecek)
    viewportHeight: 900, // HD+ yükseklik
    
    // Video encoding için ek ayarlar (environment variable ile kontrol edilebilir)
    // CYPRESS_VIDEO_COMPRESSION=0 olarak ayarlanabilir
    
    // Test süreleri - Daha uzun timeout = Daha uzun video
    defaultCommandTimeout: 10000, // Komutlar için bekleme süresi (ms)
    requestTimeout: 10000, // API istekleri için bekleme süresi (ms)
    responseTimeout: 30000, // Sayfa yükleme için bekleme süresi (ms)
    
    // Animasyonlar ve geçişler için bekleme
    animationDistanceThreshold: 5,
    waitForAnimations: true,
  },
});
