import { chartsConfig } from "@/configs";

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Views",
      data: [50, 20, 10, 22, 50, 10, 40],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#388e3c",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
  },
};
/*
5 - Felicidade
4 - Calma
3 - Ansiedade
2 - Tristeza
1 - Raiva
*/
const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Emocoes",
      data: [5, 2, 4, 4, 4, 5, 5],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#0288d1"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Dom",
        "Seg",
        "Ter",
        "Qua",
        "Qui",
        "Sex",
        "Sab",
      ],
    },
  },
};

const completedTaskChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "Anotações",
      data: [5, 40, 300, 320, 500, 350],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#388e3c"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: [
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep"
      ],
    },
  },
};
const completedTasksChart = {
  ...completedTaskChart,
  series: [
    {
      name: "Tasks",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Anotações",
    description: "Fique por dentro de todos os registros",
    footer: "Sinconize para atualize os dados",
    chart: websiteViewsChart,
  },
  {
    color: "white",
    title: "Emoções do paciente",
    description: "Visualize como o paciente está se sentindo",
    footer: "Sinconize para atualize os dados",
    chart: dailySalesChart,
  },
  /*{
    color: "white",
    title: "Asihaisuh",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: completedTasksChart,
  },*/
];

export default statisticsChartsData;
