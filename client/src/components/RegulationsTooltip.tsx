import React, { useState, useRef, useEffect } from 'react';
import { RegulationsTooltipProps } from '../../../server/types';

export default function RegulationsTooltip({ children }: RegulationsTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group relative inline-block" ref={tooltipRef}>
      <span 
        className="text-yellow-600 hover:text-yellow-700 cursor-pointer underline"
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
      </span>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full max-w-md md:max-w-2xl p-4 md:p-6 bg-white/95 rounded-lg shadow-lg text-sm text-gray-700 z-50 max-h-[80vh] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-lg font-bold mb-4">Regulamin Płatności Internetowych</h2>
            
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
      )}
    </div>
  );
}
