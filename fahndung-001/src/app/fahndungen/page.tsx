import { Suspense } from 'react';
// importiere ggf. deine API und Komponenten
// import { api } from '@/lib/api';
// import FahndungList from '@/components/fahndung/FahndungList';

interface SearchParams {
  q?: string;
  cat?: string;
  region?: string;
  from?: string;
  to?: string;
  page?: string;
}

export default async function FahndungPage({ searchParams }: { searchParams: SearchParams }) {
  const filters = {
    query: searchParams.q ?? '',
    category: searchParams.cat ?? 'all',
    region: searchParams.region ?? 'Alle Regionen',
    dateFrom: searchParams.from,
    dateTo: searchParams.to,
    page: Number(searchParams.page) || 1,
  };

  // Beispiel: Ergebnisse holen (hier als Platzhalter)
  // const results = await api.fahndung.search(filters);
  const results = [
    { id: 1, title: 'Vermisste 15-Jährige aus Stuttgart' },
    { id: 2, title: 'Raubüberfall in Karlsruhe - Täter flüchtig' },
    { id: 3, title: 'Senior aus Freiburg vermisst' },
  ];

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Fahndungsergebnisse</h1>
      <div className="mb-4 text-gray-600">
        <span>Suchbegriff: <b>{filters.query}</b></span>{' '}
        <span>Kategorie: <b>{filters.category}</b></span>{' '}
        <span>Region: <b>{filters.region}</b></span>
      </div>
      <ul className="space-y-4">
        {results.map(result => (
          <li key={result.id}>
            <a href={`/fahndung/${result.id}`} className="text-blue-600 underline hover:text-blue-800">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
      {/* Hier Pagination-Komponente einbauen */}
    </div>
  );
} 