import React, { useEffect, useState } from "react";
import {
  Typography
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

import { ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import { chartsConfig } from "@/configs";
import { useNavigate } from "react-router-dom";
import GetDateNow from "@/lib/GetDateToday";
import GetLastMonth from "@/lib/GetLastMonth";
import NovaAnotacaoModal from "../dashboard/components/NovaAnotacaoModal";
import ModalDetalhesEmocoes from "../auth/components/Modals/ModalDetalhesEmocoes";

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
  const [open, setOpen] = useState(false);
  const [emocao, setEmocao] = useState('');
  const pieChart = {
    type: "pie",
    height: 300,
    series: data.totalEmocoes,
    options: {
      chart: {
        toolbar: {
          show: false,
        },

        events: {
          dataPointSelection: (event, chartContext, config) => {
            const index = config.dataPointIndex;
            const label = config.w.globals.labels[index];
            setEmocao(label);
            setOpen(true);
          },

        },
      },
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
  const [showModal, setShowModal] = useState(false);

  function handleNovoPacienteClick() {
    navigate('/dashboard/pacientes');
  }

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
          idpaciente: Cookies.get("idpa"),
          idpsicologo: Cookies.get("idpsicologo")
        }
      });

      const lista = response.data;
      setPacientes(lista);

      // define o primeiro paciente como selecionado
      if (lista.length > 0) {
        setFilters(prev => ({ ...prev, idpaciente: lista[0].idPaciente }));
      }

    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  // 👉 roda GetPacientes apenas uma vez ao abrir a página
  useEffect(() => {
    GetPacientes();
  }, []);

  // 👉 roda GetData SOMENTE quando houver paciente selecionado
  useEffect(() => {
    if (filters.idpaciente) {
      GetData();
    }
  }, [filters.idpaciente, filters.fim, filters.inicio]);


  return (
    <div>
      <section className="mb-3 flex justify-end gap-5 items-center">
        <div className="p-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            style={{ backgroundColor: '#1f57cf' }}
          >
            Nova Anotação
          </button>

          {showModal && (
            <NovaAnotacaoModal onClose={() => setShowModal(false)} />
          )}
        </div>
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

      <div className="mb-6 grid grid-cols-2 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
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
      <ModalDetalhesEmocoes open={open} setOpen={setOpen} detalhes={detalhes} emocao={emocao} />
    </div>
  );
}

export default Home;
