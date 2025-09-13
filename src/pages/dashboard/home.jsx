import React, { useEffect, useState } from "react";
import {
  Typography
} from "@material-tailwind/react";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";

import { ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import InputDef from "../auth/components/InputDef";
import { chartsConfig } from "@/configs";

const pieChart = {
  type: "pie",
  height: 300,
  series: [10, 3, 3, 3, 2, 1, 4],
  options: {
    ...chartsConfig,
    labels: ["Alegria", "Surpresa", "Medo", "Neutro", "Tristeza", "Nojo", "Raiva"],
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

export function Home() {
  const [data, setData] = useState({
    anotacoes: 0,
    pacientes: 0
  })

  const [pacientes, setPacientes] = useState([]);

  async function GetData() {
    const response = await api.get('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      params: {
        idpsicologo: Cookies.get('idpsicologo')
      }
    });
    setData({
      anotacoes: response.data.anotacoes,
      pacientes: response.data.pacientes
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
        console.log(response.data);
        
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    }

  useEffect(() => {
    GetData();
    GetPacientes();
  }, [])

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">

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
          <InputDef type='date' placeholder="Sobrenome" idName={'sobrenome'} />
        </div>
        <div>
          <label htmlFor="">Fim</label>
          <InputDef type='date' placeholder="Sobrenome" idName={'sobrenome'} />
        </div>
      </section>
      <section className="mb-3 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        <div>
          <select class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            <option selected="">Selecione o paciente</option>
            {
              pacientes.map((paciente) => (
                <option>{paciente.primeiroNome} {paciente.sobrenome}</option>
              ))
            }
          </select>
        </div>
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

      </div>
    </div>
  );
}

export default Home;
