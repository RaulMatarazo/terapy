import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListaAnotacoes() {
  const [anotacoes, setAnotacoes] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [filtroData, setFiltroData] = useState("");

  useEffect(() => {
    carregarPacientes();
    carregarAnotacoes();
  }, []);

  const carregarPacientes = async () => {
    const res = await axios.get("http://localhost:9000/api/pacientes");
    setPacientes(res.data);
  };

  const carregarAnotacoes = async () => {
    const res = await axios.get("http://localhost:9000/api/anotacoes");
    setAnotacoes(res.data);
  };

  const filtradas = anotacoes.filter(a => {
    const okPaciente = !filtroPaciente || a.id_paciente === Number(filtroPaciente);
    const okData = !filtroData || a.data_criacao.startsWith(filtroData);
    return okPaciente && okData;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Anotações</h1>

      <div className="flex gap-3 mb-4">
        <select
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="">Todos os pacientes</option>
          {pacientes.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <input
          type="date"
          value={filtroData}
          onChange={(e) => setFiltroData(e.target.value)}
          className="border rounded-md px-3 py-2"
        />
      </div>

      <div className="space-y-2">
        {filtradas.map(a => (
          <Link
            key={a.id}
            to={`/anotacoes/${a.id}`}
            className="block border rounded-md p-3 hover:bg-gray-100"
          >
            <p className="font-medium">
              {a.texto?.split('\n')[0]?.replace(/^# /, '') || "Sem título"}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(a.data_criacao).toLocaleDateString()}
            </p>
          </Link>
        ))}

        {filtradas.length === 0 && (
          <p className="text-gray-500">Nenhuma anotação encontrada.</p>
        )}
      </div>
    </div>
  );
}
