import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
} from "@/data";
import { CheckCircleIcon, ClockIcon, UsersIcon } from "@heroicons/react/24/solid";
import { api } from "@/services/api";
import Cookies from "js-cookie";

export function Home() {
  const [data, setData] = useState({
    anotacoes: 0,
    pacientes: 0
  })

  async function GetData() {
    const response = await api.get('/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      params: {
        idpsicologo: Cookies.get('idpsicologo')
      }
    });
    console.log(response);
    setData({
      anotacoes: response.data.anotacoes,
      pacientes: response.data.pacientes
    })
  }

  useEffect(() => {
    GetData();
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
            title="Questionários pendentes"
            value={0}
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
        
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-2">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
