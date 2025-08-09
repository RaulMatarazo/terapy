import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    color: "gray",
    icon: UsersIcon,
    title: "Total de pacientes",
    value: "12",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "em relação ao ano passado",
    },
  },
  {
    color: "gray",
    icon: UserPlusIcon,
    title: "Questionários pendentes",
    value: "2",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "em relação ao dia anterior",
    },
  },
  {
    color: "gray",
    icon: ChartBarIcon,
    title: "Total de anotações",
    value: "26",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "em relação ao mês passado ",
    },
  },
];

export default statisticsCardsData;
