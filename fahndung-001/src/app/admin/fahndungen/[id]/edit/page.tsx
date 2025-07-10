interface AdminFahndungEditProps {
  params: Promise<{ id: string }>;
}

export default async function AdminFahndungEditPage({ params }: AdminFahndungEditProps) {
  const { id } = await params;
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Fahndung {id} bearbeiten</h1>
      <p className="text-gray-600">Hier können Administratoren die Fahndung bearbeiten.</p>
    </div>
  );
}
