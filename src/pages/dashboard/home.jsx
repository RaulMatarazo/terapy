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

const lineChart = {
  type: "line",
  height: 300,
  series: [
    {
      name: "Respostas",
      data: [
        { x: "10h", y: 1 },
        { x: "11h", y: 4 },
        { x: "12h", y: 2 },
        { x: "13h", y: 6 },
        { x: "14h", y: 4 },
        { x: "15h", y: 7 },
        { x: "16h", y: 1 },
      ],
    },
  ],
  options: {
    ...chartsConfig,
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false, // mantém no fuso local
      },
    },
    yaxis: {
      title: {
        text: "Respostas",
      },
      labels: {
        formatter: (val) => `${val}`, // mostra só o número
      },
    },
    tooltip: {
      x: {
        format: "dd/MM/yyyy HH:mm", // formato da data no tooltip
      },
      y: {
        formatter: (val) => `${val} respostas`,
      },
    },
    colors: ["#1E88E5"],
    legend: {
      position: "bottom",
      labels: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
};



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
    inicio: '2025-01-01',
    fim: '2025-12-30',
    idpaciente: ''
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

  function handleChange(e) {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }

  async function GetData() {
    console.log(filters);
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

    setData({
      anotacoes: response.data.anotacoes,
      pacientes: response.data.pacientes,
      totalEmocoes: emocoesArray
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
      console.log(response);
      
      setFilters({ ...filters, idpaciente: response.data[0].idPaciente });
      setPacientes(response.data);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    GetData();
    GetPacientes();
  }, []);

  /*function handleNovoPacienteClick() {
    //navigate('/dashboard/pacientes');
    setIsModalOpen(true);
  
  }*/

  return (
    <div>
      {/*
      <section className="mb-3 flex justify-end gap-5 items-center">
        <button onClick={() => navigate('/dashboard/anotacoes')} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
          Nova anotação
        </button>
        <button onClick={handleNovoPacienteClick} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500">
          Criar novo paciente
        </button>
      </section>
      */}
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <StatisticsCard
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
            class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>
        <div>
          <label htmlFor="">Fim</label>
          <input type="date" name="fim" id="fim" onChange={handleChange} value={filters.fim}
            class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          />
        </div>
        <div>
          <label htmlFor="paciente">Seleciona o paciente</label>
          <select onChange={handleChange} value={filters.idpaciente} name='idpaciente' id="idpaciente" class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            {
              pacientes.map((paciente) => (
                <option value={paciente.idPaciente}>{paciente.primeiroNome} {paciente.sobrenome}</option>
              ))
            }
          </select>
        </div>
        <Button onClick={GetData}>Carregar</Button>
      </section>

      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <StatisticsChart
          chart={pieChart}
          key={'Emoções do paciente'}
          color="white"
          title="Emoções do paciente"
          description="Visualize como o paciente está se sentindo"
          footer={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
              <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
              &nbsp;Sinconize para atualize os dados
            </Typography>
          }
        />
        <StatisticsChart
          chart={lineChart}
          key={'Emoções do paciente2'}
          color="white"
          title="Emoções do paciente"
          description="Visualize como o paciente está se sentindo"
          footer={
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
              <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
              &nbsp;Sinconize para atualize os dados
            </Typography>
          }
        />
      </div>
      <ModalCadastrarPaciente open={isModalOpen} setOpen={setIsModalOpen} />
    </div>
  );
}

export default Home;
