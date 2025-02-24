export default function PaymentFailed() {
  return (
    <div className="max-w-4xl mx-auto pt-20">
      <div className="bg-white/90 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Wystąpił błąd podczas płatności
        </h1>
        <p className="text-gray-700 mb-6">
          Przepraszamy, ale płatność nie została zrealizowana. Spróbuj ponownie lub skontaktuj się z nami.
        </p>
        <a
          href="/order"
          className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
        >
          Spróbuj ponownie
        </a>
      </div>
    </div>
  );
} 