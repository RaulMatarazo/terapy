import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

import { ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import InputDef from "../auth/components/InputDef";
import { chartsConfig } from "@/configs";
import { useNavigate } from "react-router-dom";
import ModalCadastrarPaciente from "../auth/components/Modals/ModalCadastrarPaciente";
import GetDateNow from "@/lib/GetDateToday";
import getLastMonth from "@/lib/GetLastMonth";
import GetLastMonth from "@/lib/GetLastMonth";
import GetEmocao from "@/lib/GetEmocao";
import GetIntensidade from "@/lib/GetIntensidade";
import GetQualidade from "@/lib/GetQualidade";
import GetDataMask from "@/lib/GetData";
import GetHoraMask from "@/lib/GetHoraMask";

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [data, setData] = useState({
    anotacoes: 0,
    pacientes: 0,
    totalEmocoes: []
  });
  const [filters, setFilters] = useState({
    inicio: GetLastMonth(),
    fim: GetDateNow(),
    idpaciente: pacientes[0]?.idPaciente
  });
  const pieChart = {
    type: "pie",
    height: 300,
    series: data.totalEmocoes,
    options: {
      ...chartsConfig,
      labels: ["Alegria", "Surpresa", "Medo", "Neutro", "Tristeza", "Repugnância", "Raiva"],
      colors: ["#FDD835", "#FB8C00", "#6A1B9A", "#9E9E9E", "#1E88E5", "#558B2F", "#E53935"],
      legend: {
        position: "bottom",
        labels: {
          colors: "#37474f",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
      tooltip: {
        ...chartsConfig.tooltip,
        y: {
          formatter: (val) => `${val} respostas`,
        },
      },
    },
  };
  const [detalhes, setDetalhes] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }

  async function GetData() {
    const response = await api.get('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      params: {
        idpsicologo: Cookies.get('idpsicologo'),
        ...filters
      }
    });

    const emocoes = response.data.totalEmocoes;
    const emocoesArray = [0, 0, 0, 0, 0, 0, 0];
    emocoes.map((emocao) => {
      if (emocao.nome === 'Alegria') {
        emocoesArray[0] = emocao.count;
      }
      if (emocao.nome === 'Surpresa') {
        emocoesArray[1] = emocao.count;
      }
      if (emocao.nome === 'Medo') {
        emocoesArray[2] = emocao.count;
      }
      if (emocao.nome === 'Neutro') {
        emocoesArray[3] = emocao.count
      }
      if (emocao.nome === 'Tristeza') {
        emocoesArray[4] = emocao.count;
      }
      if (emocao.nome === 'Repugnância') {
        emocoesArray[5] = emocao.count;
      }
      if (emocao.nome === 'Raiva') {
        emocoesArray[6] = emocao.count;
      }
    })

    setDetalhes(response.data.emocoesDetalhe)
    setData({
      anotacoes: response.data.anotacoes,
      pacientes: response.data.pacientes,
      totalEmocoes: emocoesArray,
    })
  }

  async function GetPacientes() {
    try {
      const response = await api.get("/api/pacientes", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        params: {
          idpsicologo: Cookies.get('idpsicologo')
        }
      });
      setFilters({ ...filters, idpaciente: response.data[0].idPaciente });
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    GetData()
  }, [pacientes, filters.idpaciente, filters.fim, filters.inicio])

  useEffect(() => {
    GetPacientes();
  }, []);

  function handleNovoPacienteClick() {
    navigate('/dashboard/pacientes');
  }

  return (
    <div>
      <section className="mb-3 flex justify-end gap-5 items-center">
        <button onClick={() => navigate('/dashboard/anotacoes')} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500" style={{ backgroundColor: '#1f57cf' }}>
          Nova anotação
        </button>
        <button onClick={handleNovoPacienteClick} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500" style={{ backgroundColor: '#1f57cf' }}>
          Criar novo paciente
        </button>
      </section>
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <StatisticsCard
          key={2}
          color="gray"
          title="Total de pacientes"
          value={data.pacientes}
          icon={React.createElement(UsersIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+3%</strong>
              &nbsp;em relação ao ano passado
            </Typography>
          }
        />
        <StatisticsCard
          key={1}
          color="gray"
          title="Total de anotações"
          value={data.anotacoes}
          icon={React.createElement(ClockIcon, {
            className: "w-6 h-6 text-white",
          })}
          footer={
            <Typography className="font-normal text-blue-gray-600">
              <strong className="text-green-500">+3%</strong>
              &nbsp;em relação ao ano passado
            </Typography>
          }
        />

      </div>
      <section className="mb-3 flex justify-start gap-5 items-center">
        <div>
          <label htmlFor="">Início</label>
          <input type="date" name="inicio" id="inicio" onChange={handleChange} value={filters.inicio}
            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>
        <div>
          <label htmlFor="">Fim</label>
          <input type="date" name="fim" id="fim" onChange={handleChange} value={filters.fim}
            className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>
        <div>
          <label htmlFor="paciente">Seleciona o paciente</label>
          <select onChange={handleChange} value={filters.idpaciente} name='idpaciente' id="idpaciente" className="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            {
              pacientes.map((paciente) => (
                <option key={paciente.idPaciente} value={paciente.idPaciente}>{paciente.primeiroNome} {paciente.sobrenome}</option>
              ))
            }
          </select>
        </div>
      </section>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-1 xl:grid-cols-1">
        <StatisticsChart
          chart={pieChart}
          key={4}
          title={'Gráfico de emoções do paciente'}
          color="white"
          description="Saiba como o paciente está se sentindo"
          footer={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
              <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
              Clique sobre a emoção para saber mais sobre ela
            </Typography>
          }
        />
      </div>
      <CardBody className="px-4 pt-2 pb-2">
        <table className="w-full min-w-[640px] table-auto bg-white">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Emoção
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Qualidade
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Acontecimento
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Atividade
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Data
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Hora
                </Typography>
              </th>
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                  Intensidade
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {detalhes.length > 0 ? (
              detalhes.map((detalhe) => (
                <tr className="border-b border-blue-gray-50 hover:cursor-pointer hover:bg-gray-200">
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {GetEmocao(detalhe.idEmocao)}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {GetQualidade(detalhe.qualidade)}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {detalhe.descricao}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {detalhe.atividade}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {GetDataMask(detalhe.data)}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {GetHoraMask(detalhe.hora)}
                      </Typography>
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-4">
                      <Typography variant="small" color="blue-gray" className="font-semibold">
                        {GetIntensidade(detalhe.idIntensidade)}
                      </Typography>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-3 text-gray-500">
                  Nenhum detalhe encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </CardBody>
    </div>
  );
}

export default Home;
