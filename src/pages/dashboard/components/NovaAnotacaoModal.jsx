import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function NovaAnotacaoModal({ onClose }) {
  const [pacientes, setPacientes] = useState([]);
  const [pacienteId, setPacienteId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const idpsicologo = Cookies.get("idpsicologo");
        const token = Cookies.get("token");

        const res = await axios.get("http://localhost:9000/api/pacientes", {
          headers: { Authorization: `Bearer ${token}` },
          params: { idpsicologo },
        });

        setPacientes(res.data);
      } catch (err) {
        console.error("Erro ao carregar pacientes:", err);
        alert("Erro ao carregar lista de pacientes.");
      }
    };

    fetchPacientes();
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pacienteId || !titulo) return alert("Preencha todos os campos");

    setLoading(true);
    try {
      const markdownInicial = `# ${titulo}\n\n`;

      const response = await axios.post(
        "http://localhost:9000/api/anotacoes",
        {
          idpaciente: pacienteId,
          anotacao: markdownInicial,
          idpsicologo: Cookies.get("idpsicologo") // se o backend precisa disso
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const novaAnotacaoId = response.data.id;
      window.location.href = `/anotacoes/${novaAnotacaoId}`;
    } catch (err) {
      alert("Erro ao criar anotação.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Nova Anotação</h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Nome da Anotação</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="Ex: Sessão com João"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Paciente</label>
                <select
                  value={pacienteId}
                  onChange={(e) => setPacienteId(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Selecione</option>
                  {pacientes.map(p => (
                    <option key={p.idPaciente} value={p.idPaciente}>
                      {p.primeiroNome} {p.sobrenome}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  {loading ? "Criando..." : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
