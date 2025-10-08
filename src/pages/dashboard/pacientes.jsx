import { Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { api } from "@/services/api";
import DropdownPacientes from "../auth/components/DropdownPacientes";
import PacientesHeader from "../auth/components/PacientesHeader";
import ModalEditarPaciente from "../auth/components/Modals/ModalEditarPaciente";
import GetDataMask from "@/lib/GetData";

export function Pacientes() {
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    primeiroNome: '',
    sobrenome: ''
  });

  // pega pacientes do backend
  async function GetPacientes() {
    try {
      const response = await api.get("/api/pacientes", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        params: { 
          idpsicologo: Cookies.get('idpsicologo'),
          ...filters
        } // hardcoded por enquanto
      });
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    GetPacientes();
  }, []);

  useEffect(() => {
    GetPacientes();
  }, [filters]);

  function handleClick(id){
    setId(id)
    setIsOpen(true);
  }  

  return (
    <div className="mt-5 flex flex-col gap-4">
      <PacientesHeader filters={filters} setFilters={setFilters} />
      <Card>
        
        <CardBody className="px-4 pt-2 pb-2">
          
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                  <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                      #
                    </Typography>
                  </th>
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
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((paciente, key) => (
                  <tr onClick={() => handleClick(paciente.idUsuario)} key={paciente.idPaciente || key} className="border-b border-blue-gray-50 hover:cursor-pointer hover:bg-gray-200">
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-4">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                          {paciente.idUsuario}
                        </Typography>
                      </div>
                    </td>
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
                          {GetDataMask(paciente.dataNascimento)}
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
      {/* modais */}
      <ModalEditarPaciente open={isOpen} setOpen={setIsOpen} id={id} />
    </div>
  );
}

export default Pacientes;
