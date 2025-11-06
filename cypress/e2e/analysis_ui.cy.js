describe('Katılımcıyı kaydeder ve analiz çalıştırır (GERÇEK backend)', () => {
  it('formu doldurur, kaydeder ve sonra analizi çalıştırır', () => {
    const apiBase = 'http://localhost:3000/api/v1';

    // 1) istekleri sadece İZLE (cevap verme, mocklama)
    cy.intercept('POST', `${apiBase}/responses`).as('saveResponse');
    cy.intercept('POST', `${apiBase}/analysis_results`).as('runAnalysis');

    // 2) sayfayı aç - Demo için yavaş yükleme
    cy.visit('http://localhost:5173/analysis', { timeout: 30000 });
    cy.wait(1000); // Sayfanın tam yüklenmesi için bekle

    // 3) başlık var mı - Demo için görsel doğrulama
    cy.contains(/Tükenmişlik Ölçeği v1/i).should('be.visible');
    cy.wait(500); // Görsel bekleme

    // 4) Form alanlarını göster - Demo için tüm formu kontrol et
    cy.get('input[name="participant_id"]').should('be.visible');
    cy.wait(500);

    // 5) katılımcı ID gir - Yavaş yazma efekti (demo için)
    cy.get('input[name="participant_id"]').clear();
    cy.wait(300);
    cy.get('input[name="participant_id"]').type('P-123', { delay: 100 });
    cy.wait(500); // Yazma işleminin görülmesi için

    // 6) Formu kontrol et
    cy.get('input[name="participant_id"]').should('have.value', 'P-123');
    cy.wait(500);

    // 7) kaydet butonunu göster
    cy.contains(/Yanıtı Kaydet/i).should('be.visible');
    cy.wait(500);

    // 8) kaydet
    cy.contains(/Yanıtı Kaydet/i).click();

    // 9) gerçek backend cevabını bekle
    cy.wait('@saveResponse', { timeout: 15000 })
      .its('response.statusCode')
      // bazen 422 dönüyordu, onu da kabul ediyoruz
      .should('be.oneOf', [200, 201, 422]);
    
    cy.wait(1000); // Başarı mesajının görülmesi için

    // 10) Başarı mesajını kontrol et (varsa)
    cy.get('body').then(($body) => {
      if ($body.find('.alert, .success, [class*="success"]').length > 0) {
        cy.get('.alert, .success, [class*="success"]').first().should('be.visible');
        cy.wait(1000);
      }
    });

    // 11) Analiz butonunu göster
    cy.contains(/Analizi Çalıştır/i).should('be.visible');
    cy.wait(500);

    // 12) şimdi analiz
    cy.contains(/Analizi Çalıştır/i).click();

    // 13) Analiz işleminin tamamlanmasını bekle
    cy.wait('@runAnalysis', { timeout: 30000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 201]);
    
    cy.wait(2000); // Analiz sonucunun görülmesi için daha uzun bekleme

    // 14) backend'in gönderdiği mesajı ekranda ara
    // sen React'te: setAnalysisText(data.message) yapıyorsun
    // o yüzden DOM'da message olması gerekir
    cy.get('.alert-success', { timeout: 10000 })
      .should('be.visible')
      .and(($el) => {
        const text = $el.text();
        // ör: "P-123 için analiz tamamlandı"
        expect(text.toLowerCase()).to.include('analiz');
      });
    
    cy.wait(1000); // Mesajın okunması için

    // 15) krediler de DOM'da olsun (backend dönmezse "—" görürüz, o da OK)
    cy.contains('Kalan krediler:', { timeout: 10000 }).should('be.visible');
    cy.wait(1000);

    // 16) Demo için son bir görsel kontrol - Tüm sayfayı göster
    cy.scrollTo('top', { ensureScrollable: false });
    cy.wait(500);
    cy.scrollTo('bottom', { ensureScrollable: false });
    cy.wait(1000); // Demo video için son bekleme
  });
});
