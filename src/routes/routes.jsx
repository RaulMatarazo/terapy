import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  PencilSquareIcon,
  ClockIcon
} from "@heroicons/react/24/solid";
import { Home, Pacientes, Profile, ProfilePaciente } from "@/pages/dashboard";
import Anotacoes from "@/pages/dashboard/anotacoes";
import { SignIn, SignUp } from "@/pages/auth";
import About from "@/pages/auth/about";
import Questionario from "@/pages/dashboard/questionario";
import Historico from "@/pages/dashboard/historico";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
        role: 'psicologo'
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Pacientes",
        path: "/pacientes",
        element: <Pacientes />,
        role: 'psicologo'
      },
      {
        icon: <PencilSquareIcon {...icon} />,
        name: "Anotações",
        path: "/anotacoes",
        element: <Anotacoes />,
        role: 'psicologo'
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Meu perfil",
        path: "/perfil-psicologo",
        element: <Profile />,
        role: 'psicologo'
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Registro de Emoções",
        path: "/questionario",
        element: <Questionario />,
        role: 'paciente'
      },
      {
        icon: <ClockIcon {...icon} />,
        name: "Histórico",
        path: "/historico",
        element: <Historico />,
        role: 'paciente'
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Meu perfil",
        path: "/perfil-paciente",
        element: <ProfilePaciente />,
        role: 'paciente'
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
        show: false
      },
      /*{
        icon: <RectangleStackIcon {...icon} />,
        name: "Saber mais",
        path: "/about",
        element: <About />,
      },*/
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Sair",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
