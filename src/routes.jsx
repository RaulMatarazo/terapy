import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import About from "./pages/auth/about";

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
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Pacientes",
        path: "/pacientes",
        element: <Tables />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Anotações",
        path: "/anotacoes",
        element: <Tables />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Perfil",
        path: "/profile",
        element: <Profile />,
      },/*
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "notifications",
        path: "/notifications",
        element: <Notifications />,
      },*/
    ],
  },
  {
    title: "Mais opções",
    layout: "auth",
    pages: [
      /*{
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },*/
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "Sobre nós",
        path: "/about",
        element: <About />,
      },
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
