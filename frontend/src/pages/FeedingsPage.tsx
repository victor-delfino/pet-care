import { useFeedings } from "../hooks/useFeedings";

export function FeedingsPage() {
  const { feedings, loading, error } = useFeedings();

  if (loading) return <div className="p-8 text-center">Carregando alimentações...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🍖 Alimentação</h1>
        <p className="text-gray-600">Gerenciar planos nutricionais dos animais</p>
      </div>

      {feedings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🍖</div>
          <p className="text-gray-600">Nenhum plano alimentar registrado ainda</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {feedings.map((feeding) => (
            <div key={feeding.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{feeding.foodName}</h3>
                  <div className="mt-2 space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Frequência:</span> {feeding.frequency}
                    </p>
                    {feeding.quantity && (
                      <p className="text-gray-600">
                        <span className="font-medium">Quantidade:</span> {feeding.quantity}
                      </p>
                    )}
                    {feeding.time && (
                      <p className="text-gray-600">
                        <span className="font-medium">Horário:</span> {feeding.time}
                      </p>
                    )}
                    {feeding.notes && (
                      <p className="text-gray-600">
                        <span className="font-medium">Notas:</span> {feeding.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
