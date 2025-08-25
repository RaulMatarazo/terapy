import { Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import DropdownPacientes from "../auth/components/DropdownPacientes";
import PacientesHeader from "../auth/components/PacientesHeader";

export function Pacientes() {
  const [data, setData] = useState([]);
  const [busca, setBusca] = useState('');
  const [pagina, setPagina] = useState(1);
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


  // pega apenas os pacientes da página atual
  const pacientesExibidos = pacientesFiltrados.slice(
    (pagina - 1) * itensPorPagina,
    pagina * itensPorPagina
  );

  return (
    <div className="mt-5 flex flex-col gap-4">
      <PacientesHeader />
          {/*<input
            type="text"
            placeholder="Pesquisar paciente..."
            value={busca}
            onChange={(e) => { setBusca(e.target.value); setPagina(1); }}
            className="border border-blue-300 focus:border-blue-600 px-2 py-1 rounded mb-4 w-full max-w-sm placeholder-gray-400"
          />*/}
      <Card>
        
        <CardBody className="px-4 pt-2 pb-2">
          
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      Primeiro nome
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      Sobrenome
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      Data de nascimento
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      E-mail
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      Telefone
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      Ações
                    </Typography>
                  </th>
              </tr>
            </thead>
            <tbody>
              {pacientesExibidos.length > 0 ? (
                pacientesExibidos.map((paciente, key) => (
                  <tr key={paciente.idPaciente || key} className="border-b border-blue-gray-50">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.primeiroNome}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.sobrenome}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.dataNascimento}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.email}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.telefone}
                        </Typography>
                      </div>
                    </td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          <DropdownPacientes />
                        </Typography>
                      </div>
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

        </CardBody>
      </Card>
    </div>
  );
}

export default Pacientes;
