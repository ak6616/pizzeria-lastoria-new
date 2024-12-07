import { printOrderToLocation } from '../services/printService';

export async function createOrder(req, res) {
  try {
    // Zapisz zamówienie w bazie danych
    const order = await saveOrderToDatabase(req.body);
    
    // Wydrukuj zamówienie
    await printOrderToLocation(order, req.body.location);
    
    res.status(200).json({ success: true, orderId: order.id });
  } catch (error) {
    console.error('Błąd podczas przetwarzania zamówienia:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Wystąpił błąd podczas przetwarzania zamówienia' 
    });
  }
} 