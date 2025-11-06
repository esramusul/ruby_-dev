import { useState } from "react";
import "./AnalysisPage.css";

const API_BASE = "http://localhost:3000/api/v1";

export default function AnalysisPage() {
  const [participantId, setParticipantId] = useState("");
  const [analysisText, setAnalysisText] = useState("");
  const [credits, setCredits] = useState(null);
  const [lastResponseId, setLastResponseId] = useState(null); // 👈 YENİ

  async function handleCreateSurvey() {
    try {
      const res = await fetch(`${API_BASE}/scales`);
      const data = await res.json();
      console.log("scales:", data);
      alert(`Toplam ${data.length} ölçek bulundu.`);
    } catch (err) {
      console.error("scale error", err);
    }
  }

  async function handleSaveResponse() {
    // 👇 BURAYA EKLE
    if (!participantId) {
      alert("Önce katılımcı ID gir 👀");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/responses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          response: {
            participant_id: participantId,
            survey_id: 1,
          },
        }),
      });
      const data = await res.json();

      if (data.errors) {
        alert("Yanıt kaydedilemedi: " + data.errors.join(", "));
        return;
      }

      setLastResponseId(data.id);
      alert("Yanıt başarıyla kaydedildi ✅");
    } catch (err) {
      console.error("response error", err);
    }
  }

  async function handleRunAnalysis() {
    try {
      // önce gerçekten bir response kaydedilmiş mi kontrol et
      if (!lastResponseId) {
        alert("Önce 'Yanıtı Kaydet' e basmalısın, response_id yok 👀");
        return;
      }

      const res = await fetch(`${API_BASE}/analysis_results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          analysis_result: {
            response_id: lastResponseId, // 👈 artık sabit 1 değil
            cost: 1,
            activity_type: "burnout_test",
            transaction_date: new Date().toISOString(), // 👈 string olsun
            reference_id: participantId || "P-123", // 👈 kimin analizi
          },
        }),
      });

      const data = await res.json();
      console.log("analysis:", data);

      // backend zaten "P-123 için analiz tamamlandı" diye dönüyor
      setAnalysisText(data.message);

      // backend artık kalan krediyi de dönüyor
      setCredits(data.remaining_credits);
    } catch (err) {
      console.error("analysis error", err);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="content-container">
        <div className="header-row">
          <h1 className="header-title">Tükenmişlik Ölçeği v1</h1>
          <span className="header-badge">TR · draft</span>
        </div>
        <div className="header-divider"></div>

        <div className="top-grid">
          <section className="card left-card">
            <h2 className="card-title">Ölçek Bilgisi</h2>
            <p className="card-description">
              Bu sayfada Tükenmişlik Ölçeği v1 ölçeğinden anketler oluşturup
              yanıtları analiz edebilirsin.
            </p>
            <button
              className="btn btn-primary"
              onClick={handleCreateSurvey}
            >
              Ölçekten Anket Oluştur
            </button>
          </section>

          <section className="card right-card">
            <h2 className="card-title">Yeni Yanıt</h2>
            <p className="card-description">Katılımcı bu ankete yanıt verdi.</p>

            <div className="form-group">
              <label htmlFor="participant_id" className="form-label">
                Katılımcı ID
              </label>
              <input
                id="participant_id"
                name="participant_id"
                type="text"
                className="form-input"
                placeholder="ör: P-123"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
              />
            </div>

            <div className="button-container">
              <button className="btn btn-outline">Yanıt Ekle</button>
              <button
                className="btn btn-primary"
                onClick={handleSaveResponse}
              >
                Yanıtı Kaydet
              </button>
            </div>
          </section>
        </div>

        <section className="card analysis-card">
          <h2 className="card-title">Analiz</h2>
          <p className="card-description">Seçili yanıt için analiz çalıştır.</p>
          <button className="btn btn-dark" onClick={handleRunAnalysis}>
            Analizi Çalıştır
          </button>

          {analysisText && (
            <div className="alert-success">{analysisText}</div>
          )}
        </section>

        <div className="credit-box">
          <span className="credit-label">Kalan krediler:</span>
          <span className="credit-value">{credits ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}
