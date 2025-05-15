
import { useNews } from '../hooks/useNews';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { motion } from 'framer-motion';

export default function News() {
  const { articles, loading, error } = useNews();

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-3xl font-bold mb-8">Aktualności</h1>
        <p>Brak aktualności do wyświetlenia</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Aktualności</h1>
      <div className="space-y-6">
        {articles.map((article, index) => (
          <motion.article
            key={article.id}
            className="bg-white/90 rounded-lg p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-xl font-bold mb-2">{article.tytul}</h2>
            <time className="text-sm text-gray-500 mb-4 block">
              {format(new Date(article.data), 'd MMMM yyyy', { locale: pl })}
            </time>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {article.tekst}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}