import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export function Pacientes() {
  const [data, setData] = useState([]);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
  const [showInput, setShowInput] = useState(false);
  const [inputPagina, setInputPagina] = useState('');
  const itensPorPagina = 5;

  // pega pacientes do backend
  async function GetPacientes() {
    try {
      const response = await api.get("/api/pacientes", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        params: { idpsicologo: 1 } // hardcoded por enquanto
      });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    GetPacientes();
  }, []);

  // filtra pacientes pelo search
  const pacientesFiltrados = data.filter(p =>
    `${p.primeiroNome} ${p.sobrenome}`.toLowerCase().includes(busca.toLowerCase())
  );

  const totalPaginas = Math.ceil(pacientesFiltrados.length / itensPorPagina);

  // pega apenas os pacientes da página atual
  const pacientesExibidos = pacientesFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  // gera páginas visíveis (até 5)
  const gerarPaginasVisiveis = () => {
    let inicio = Math.max(1, pagina - 2);
    let fim = Math.min(totalPaginas, inicio + 4);
    if (fim - inicio < 4) inicio = Math.max(1, fim - 4);
    const pages = [];
    for (let i = inicio; i <= fim; i++) pages.push(i);
    return pages;
  };

  // envia input da página
  const handleInputPaginaKey = (e) => {
    if (e.key === "Enter") {
      const num = parseInt(inputPagina);
      if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
        setPagina(num);
      }
      setShowInput(false);
      setInputPagina('');
    }
    if (e.key === "Escape") {
      setShowInput(false);
      setInputPagina('');
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-4">
      <Card>
        <CardHeader>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-4 pt-2 pb-2">
          <input
            type="text"
            placeholder="Pesquisar paciente..."
            value={busca}
            onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
            className="border border-blue-300 focus:border-blue-600 px-2 py-1 rounded mb-4 w-full max-w-sm placeholder-gray-400"
          />
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Nome", "Email", "Telefone", "Ações"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pacientesExibidos.length > 0 ? (
                pacientesExibidos.map((paciente, key) => (
                  <tr key={paciente.idPaciente || key} className="border-b border-blue-gray-50">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={"https://via.placeholder.com/40"}
                          alt={paciente.primeiroNome}
                          size="sm"
                          variant="rounded"
                        />
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.primeiroNome} {paciente.sobrenome}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs text-blue-gray-600">
                        {paciente.email}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography className="text-xs text-blue-gray-600">
                        {paciente.telefone}
                      </Typography>
                    </td>
                    <td className="py-3 px-5">
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600"
                      >
                        Editar
                      </Typography>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-3 text-gray-500">
                    Nenhum paciente encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Paginação avançada */}
          <div className="flex justify-center mt-4 items-center gap-2">
            <button
              disabled={pagina === 1}
              onClick={() => setPagina(1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <ChevronDoubleLeftIcon className="h-5 w-5" />
            </button>
            <button
              disabled={pagina === 1}
              onClick={() => setPagina(pagina - 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {gerarPaginasVisiveis().map((p) => (
              <button
                key={p}
                onClick={() => setPagina(p)}
                className={`px-3 py-1 border rounded ${p === pagina ? "bg-blue-500 text-white" : "bg-white text-blue-gray-600"}`}
              >
                {p}
              </button>
            ))}

            {totalPaginas > 5 && (
              <div className="relative">
                {showInput ? (
                  <input
                    type="text"
                    value={inputPagina}
                    onChange={(e) => setInputPagina(e.target.value)}
                    onKeyDown={handleInputPaginaKey}
                    className="w-12 text-center border border-blue-300 rounded"
                    autoFocus
                  />
                ) : (
                  <button
                    onClick={() => setShowInput(true)}
                    className="px-3 py-1 border rounded text-blue-gray-600"
                  >
                    ...
                  </button>
                )}
              </div>
            )}

            <button
              disabled={pagina === totalPaginas || totalPaginas === 0}
              onClick={() => setPagina(pagina + 1)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <button
              disabled={pagina === totalPaginas || totalPaginas === 0}
              onClick={() => setPagina(totalPaginas)}
              className="px-2 py-1 border rounded disabled:opacity-50"
            >
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Pacientes;
