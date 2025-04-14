app.post('/api/payment/status', async (req, res) => {
  try {
    const { transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ error: 'Brak transactionId' });
    }

    const maxAttempts = 30; // 30 prób
    const intervalTime = 30000; // 30 sekund
    let attempts = 0;

    while (attempts < maxAttempts) {
      attempts++;
      console.log(`Próba nr ${attempts}...`);

      try {
        const response = await fetch(`https://api.tpay.com/transactions/${transactionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${tpayToken}` // Zaktualizuj token
          }
        });

        if (!response.ok) {
          throw new Error(`Błąd HTTP! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(`Odpowiedź z API (${attempts}):`, data);

        if (data.status === "correct") {
          console.log("Płatność zakończona sukcesem!");
          return res.json({ status: "success", data }); // Odpowiedź do klienta
        } else {
          console.log(`Płatność nie zakończona sukcesem: ${data.status}`);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania statusu transakcji:", error);
      }

      if (attempts < maxAttempts) {
        console.log(`Czekam ${intervalTime / 1000} sekund przed kolejną próbą...`);
        await new Promise(resolve => setTimeout(resolve, intervalTime));
      }
    }

    console.log("Przekroczono maksymalną liczbę prób!");
    return res.status(408).json({ status: "timeout", message: "Czas oczekiwania minął." });
  } catch (error) {
    console.error('Błąd statusu płatności:', error);
    res.status(500).json({ error: 'Błąd statusu płatności' });
  }
});






// Endpoint dla sukcesu płatności
app.get('/payment-success', async (req, res) => {
    const { tr_id, tr_amount, tr_crc } = req.query;
  
    try {
      const tpay = new TPay({
        merchantId: process.env.TPAY_CLIENT_ID,
        merchantSecret: process.env.TPAY_SECRET,
        sandbox: false
      });
  
      // Weryfikacja statusu transakcji
      const verification = await tpay.verifyTransaction(tr_id);
  
      if (verification.result) {
        // Aktualizacja statusu zamówienia w bazie danych
        // const connection = await getConnection();
        // try {
        //   await connection.execute(
        //     'UPDATE zamowienia SET status_platnosci = ? WHERE id = ?',
        //     ['paid', tr_crc]
        //   );
        // } finally {
        //   await connection.release();
        // }
  
        // Przekierowanie do strony potwierdzenia
        res.redirect('/order-confirmation');
      } else {
        res.redirect('/payment/error');
      }
    } catch (error) {
      console.error('Błąd weryfikacji płatności:', error);
      res.redirect('/payment/error');
    }
  });

  // Endpoint dla błędu płatności
app.get('/payment/error', (req, res) => {
    res.redirect('/payment-failed');
  });


// Jeśli płatność się powiedzie, wysyłamy zamówienie
const response = await fetch(`/api/orders/${location}`, {
method: 'POST',
headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify(orderData)
});

if (!response.ok) {
throw new Error('Błąd podczas składania zamówienia');
}

    const transactionStatus = await checkTransactionStatus(transaction.transactionId);
    console.log(transactionStatus);  
    if (transactionStatus.status == 'success') {
        

       async function checkTransactionStatus(transactionId) {
    try {
      const response = await fetch('/api/payment/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactionId })
      });
  
      if (!response.ok) {
        throw new Error('Nie udało się pobrać statusu płatności');
      }
      return await response.json();
    } catch (error) {
      console.error('Błąd w checkTransactionStatus:', error);
      throw error;
    }
  } 