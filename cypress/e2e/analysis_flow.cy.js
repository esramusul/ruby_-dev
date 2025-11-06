describe('Analysis Flow - API Test', () => {
  it('creates user → scale → survey → response → analysis_result', () => {
    // 1️⃣ User oluştur
    cy.request('POST', 'http://localhost:3000/api/v1/users', {
      user: {
        forename: 'Esra',
        surname: 'Musul',
        hashed_password: 'secret',
        credit_balance: 10,
        role: 'admin'
      }
    }).then((userRes) => {
      const userId = userRes.body.id

      // 2️⃣ Scale oluştur
      cy.request('POST', 'http://localhost:3000/api/v1/scales', {
        scale: {
          user_id: userId,
          unique_scale_id: crypto.randomUUID(),
          title: 'Burnout Scale v1',
          version: '1.0',
          last_validation_date: new Date().toISOString(),
          is_public: true
        }
      }).then((scaleRes) => {
        const scaleId = scaleRes.body.id

        // 3️⃣ Survey oluştur
        cy.request('POST', 'http://localhost:3000/api/v1/surveys', {
          survey: {
            user_id: userId,
            scale_id: scaleId,
            title: 'Survey from Burnout Scale v1',
            status: 'draft',
            distribution_mode: 'link',
            is_mobile_friendly: true
          }
        }).then((surveyRes) => {
          const surveyId = surveyRes.body.id

          // 4️⃣ Response oluştur
          cy.request('POST', 'http://localhost:3000/api/v1/responses', {
            response: {
              survey_id: surveyId,
              participant_id: 'P-123',
              submitted_at: new Date().toISOString(),
              raw_data: JSON.stringify({ q1: 5, q2: 3 })
            }
          }).then((responseRes) => {
            const responseId = responseRes.body.id

            // 5️⃣ AnalysisResult oluştur
            cy.request('POST', 'http://localhost:3000/api/v1/analysis_results', {
              analysis_result: {
                response_id: responseId,
                cost: 1,
                activity_type: 'ai_analysis',
                transaction_date: new Date().toISOString(),
                reference_id: crypto.randomUUID()
              }
            }).then(() => {
              // 6️⃣ Kullanıcıyı tekrar getir (şimdilik 10 bekliyoruz)
              cy.request('GET', `http://localhost:3000/api/v1/users/${userId}`).then((updatedUser) => {
                expect(updatedUser.status).to.eq(200)
                expect(updatedUser.body.forename).to.eq('Esra')
                expect(updatedUser.body.credit_balance).to.eq(10)
              })
            })
          })
        })
      })
    })
  })
})
