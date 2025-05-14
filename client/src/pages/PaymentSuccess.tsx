export default function PaymentSuccess() {
  return (
    <div className="max-w-4xl mx-auto pt-20">
      <div className="bg-white/90 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Płatność zakończona sukcesem!
        </h1>
        <p className="text-gray-700 mb-6">
          Dziękujemy za złożenie zamówienia. Rozpoczynamy realizację!
        </p>
        <a
          href="/"
          className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Powrót do strony głównej
        </a>
      </div>
    </div>
  );
} 