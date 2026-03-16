import { useVetVisits } from "../hooks/useVetVisits";

export function VetVisitsPage() {
  const { vetVisits, loading, error } = useVetVisits();

  if (loading) return <div className="p-8 text-center">Carregando consultas...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🩺 Consultas Veterinárias</h1>
        <p className="text-gray-600">Histórico de visitas ao veterinário</p>
      </div>

      {vetVisits.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🩺</div>
          <p className="text-gray-600">Nenhuma consulta registrada ainda</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {vetVisits.map((visit) => (
            <div key={visit.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{visit.reason}</h3>
                  <p className="text-sm text-gray-600">
                    {new Date(visit.date).toLocaleDateString("pt-BR")}
                  </p>
                  {visit.diagnosis && (
                    <p className="text-sm text-gray-600">Diagnóstico: {visit.diagnosis}</p>
                  )}
                  {visit.veterinarian && (
                    <p className="text-sm text-gray-600">Veterinário: {visit.veterinarian}</p>
                  )}
                  {visit.cost && (
                    <p className="text-sm text-green-600 font-medium">Custo: R$ {visit.cost.toFixed(2)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
