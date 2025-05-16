import React from 'react';

export default function RegulationsPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white/90 rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Regulamin Płatności Internetowych
      </h1>
      <div className="mt-6 prose prose-lg text-gray-700">
        <h3 className="font-bold mt-4 mb-2">1. Postanowienia ogólne</h3>
        <p className="mb-4">
          Niniejszy regulamin określa zasady dokonywania płatności internetowych za zamówienia
          składane na stronie internetowej Pizzerii Lastoria Marek Domaradzki, adres: Krośnieńska 1, 38-430 Miejsce Piastowe; NIP: 6842156102, REGON: 370461912 za pośrednictwem systemu płatności online Tpay.
        </p>
        
        <h3 className="font-bold mt-4 mb-2">2. Metody płatności</h3>
        <p className="mb-2">Pizzeria Lastoria umożliwia realizację płatności poprzez Tpay, w tym:</p>
        <ul className="list-disc list-inside mb-4">
          <li>BLIK</li>
          <li>Przelew online (szybkie przelewy bankowe)</li>
          <li>Karty płatnicze (Visa, Mastercard itp.)</li>
          <li>Inne metody dostępne w Tpay</li>
        </ul>
        
        <h3 className="font-bold mt-4 mb-2">3. Realizacja zamówienia</h3>
        <p className="mb-4">
        Płatność internetowa jest równoznaczna z potwierdzeniem zamówienia.
          Po dokonaniu płatności Klient otrzymuje potwierdzenie na podany adres e-mail.
          Jeśli płatność nie zostanie zaksięgowana w ciągu 15 minut, zamówienie może zostać anulowane.
          Jeżeli klient dokonał zamówienia na obszar nie objęty dostawą, zamówienie zostanie anulowane, bądź klient zostanie poproszony o jego odbiór w lokalizacji znajdującej się w obszarze dostawy.
          Jeżeli zamówienie zostało złożone na adres inny niż rzeczywisty adres dostawy, klient może zostać obciążony dodatkowymi kosztami dostawy.
        </p>
        
        <h3 className="font-bold mt-4 mb-2">4. Zwroty i reklamacje</h3>
        <p className="mb-4">
          Klient ma prawo zgłosić reklamację w przypadku niepoprawnej realizacji płatności.
          W razie błędnego obciążenia konta lub problemów z transakcją należy skontaktować się z Tpay
          oraz obsługę Pizzerii pod adresem e-mail mp.lastoria@gmail.com lub numerem telefonu 13 43 393 34.
          Zwroty realizowane są w ciągu 14 dni roboczych od zatwierdzenia reklamacji.
        </p>
        
        <h3 className="font-bold mt-4 mb-2">5. Bezpieczeństwo transakcji</h3>
        <p className="mb-4">
          Wszystkie transakcje są zabezpieczone zgodnie ze standardami Tpay oraz przepisami dotyczącymi płatności elektronicznych.
          Pizzeria Lastoria nie przechowuje danych płatniczych Klientów.
        </p>
        
        <h3 className="font-bold mt-4 mb-2">6. Postanowienia końcowe</h3>
        <p className="mb-4">
          Pizzeria Lastoria zastrzega sobie prawo do zmiany niniejszego regulaminu.
          W sprawach nieuregulowanych regulaminem zastosowanie mają przepisy prawa polskiego.
          Regulamin wchodzi w życie z dniem publikacji na stronie internetowej Pizzerii.
        </p>
      </div>
    </div>
  );
}
