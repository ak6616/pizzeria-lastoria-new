export async function initializePayment(paymentData) {
  // Tutaj implementacja integracji z API TPay
  const response = await fetch('https://api.tpay.com/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.TPAY_API_KEY}`
    },
    body: JSON.stringify({
      amount: paymentData.amount,
      description: paymentData.description,
      crc: paymentData.crc,
      email: paymentData.email,
      name: paymentData.name,
      address: paymentData.address,
      phone: paymentData.phone,
      return_url: process.env.TPAY_RETURN_URL,
      return_error_url: process.env.TPAY_ERROR_URL
    })
    
  });

  return response.json();
} 

    