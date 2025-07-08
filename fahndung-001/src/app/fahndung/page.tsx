import Link from 'next/link';

export default function FahndungUebersicht() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Fahndungsübersicht</h1>
      <p className="mb-4">Hier werden alle aktuellen Fahndungen angezeigt.</p>
      <ul className="space-y-4">
        {[1,2,3,4,5].map(id => (
          <li key={id}>
            <Link href={`/fahndung/${id}`} className="text-blue-600 underline hover:text-blue-800">
              Fahndung #{id} ansehen
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 