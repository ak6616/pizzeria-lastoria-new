import React, { useState, useRef, useEffect } from 'react';
import { RodoTooltipProps } from '../../../server/types';

export default function RodoTooltip({ children }: RodoTooltipProps) {
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
        <div className="absolute bottom-full left-0 mb-2 w-screen max-w-none md:max-w-md lg:max-w-2xl p-4 md:p-6 bg-white/95 rounded-lg shadow-lg text-sm text-gray-700 z-50 max-h-[80vh] overflow-y-auto">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-lg font-bold mb-4">
              Deklaracja RODO dotycząca przetwarzania danych osobowych klientów pizzerii Lastoria
            </h2>

            <p className="mb-4">
              W trosce o bezpieczeństwo Państwa danych osobowych oraz zgodnie z Rozporządzeniem 
              Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO), 
              informujemy, że Państwa dane osobowe są przetwarzane w następujących celach:
            </p>

            <h3 className="font-bold mt-4 mb-2">Administrator Danych Osobowych</h3>
            <p className="mb-4">
              Administratorem Państwa danych osobowych jest Pizzeria Lastoria z siedzibą 
              w Miejscu Piastowym, wpisana do rejestru przedsiębiorców (NIP: 6842156102, REGON: 370461912).
            </p>

            <h3 className="font-bold mt-4 mb-2">Cel i Podstawa Przetwarzania Danych</h3>
            <p className="mb-2">Państwa dane osobowe przetwarzane są w celu:</p>
            <ol className="list-decimal list-inside mb-4">
              <li>Realizacji zamówienia na posiłki i dostarczenia ich pod wskazany adres</li>
              <li>Obsługi płatności związanych z zamówieniem</li>
              <li>Ewentualnego dochodzenia lub obrony przed roszczeniami</li>
            </ol>

            <h3 className="font-bold mt-4 mb-2">Zakres Przetwarzanych Danych</h3>
            <p className="mb-2">W celu realizacji zamówienia przetwarzamy następujące dane osobowe:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Imię i nazwisko</li>
              <li>Adres dostawy</li>
              <li>Numer telefonu</li>
              <li>Adres e-mail</li>
              <li>Informacje o zamówieniu (rodzaj i ilość produktów)</li>
            </ul>

            <h3 className="font-bold mt-4 mb-2">Okres Przechowywania Danych</h3>
            <p className="mb-4">
              Państwa dane osobowe będą przechowywane przez okres niezbędny do realizacji 
              zamówienia i rozliczenia transakcji oraz do czasu przedawnienia ewentualnych 
              roszczeń.
            </p>

            <h3 className="font-bold mt-4 mb-2">Prawa Klienta</h3>
            <p className="mb-2">W związku z przetwarzaniem danych osobowych mają Państwo prawo do:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Dostępu do swoich danych</li>
              <li>Sprostowania danych</li>
              <li>Usunięcia danych</li>
              <li>Ograniczenia przetwarzania</li>
              <li>Przenoszenia danych</li>
              <li>Wniesienia sprzeciwu wobec przetwarzania danych</li>
            </ul>

            <p className="mt-4 text-sm italic">
              Podanie danych osobowych jest dobrowolne, ale niezbędne do realizacji zamówienia.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}