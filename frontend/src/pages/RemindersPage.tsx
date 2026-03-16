import { useReminders } from "../hooks/useReminders";

export function RemindersPage() {
  const { reminders, loading, error } = useReminders();

  if (loading) return <div className="p-8 text-center">Carregando lembretes...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Erro: {error}</div>;

  const pending = reminders.filter((r) => !r.completed);
  const completed = reminders.filter((r) => r.completed);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🔔 Lembretes</h1>
        <p className="text-gray-600">Gerencie tarefas e lembretes para seus animais</p>
      </div>

      {reminders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <div className="text-6xl mb-4">🔔</div>
          <p className="text-gray-600">Nenhum lembrete criado ainda</p>
        </div>
      ) : (
        <div className="space-y-8">
          {pending.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Pendentes ({pending.length})</h2>
              <div className="grid gap-4">
                {pending.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-4"
                  >
                    <h3 className="font-semibold text-lg">{reminder.title}</h3>
                    {reminder.description && (
                      <p className="text-sm text-gray-600 mt-1">{reminder.description}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">
                      Vencimento: {new Date(reminder.dueDate).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completed.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-600">Concluídos ({completed.length})</h2>
              <div className="grid gap-4">
                {completed.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="border-l-4 border-green-500 bg-green-50 rounded-lg p-4 opacity-60"
                  >
                    <h3 className="font-semibold text-lg line-through">{reminder.title}</h3>
                    {reminder.description && (
                      <p className="text-sm text-gray-600 mt-1 line-through">{reminder.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
