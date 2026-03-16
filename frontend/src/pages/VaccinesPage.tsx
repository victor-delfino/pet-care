import { useVaccines } from "../hooks/useVaccines";

export function VaccinesPage() {
  const { vaccines, loading, error } = useVaccines();

  if (loading) return <div className="p-8 text-center">Carregando vacinas...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">💉 Vacinas</h1>
        <p className="text-gray-600">Gerenciar cronograma de vacinações dos animais</p>
      </div>

      {vaccines.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">💉</div>
          <p className="text-gray-600">Nenhuma vacina registrada ainda</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {vaccines.map((vaccine) => (
            <div key={vaccine.id} className="border rounded-lg p-4 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{vaccine.name}</h3>
                  <p className="text-sm text-gray-600">
                    Aplicada em {new Date(vaccine.appliedAt).toLocaleDateString("pt-BR")}
                  </p>
                  {vaccine.veterinarian && (
                    <p className="text-sm text-gray-600">Veterinário: {vaccine.veterinarian}</p>
                  )}
                  {vaccine.nextDoseAt && (
                    <p className="text-sm text-blue-600 font-medium">
                      Próxima dose: {new Date(vaccine.nextDoseAt).toLocaleDateString("pt-BR")}
                    </p>
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
