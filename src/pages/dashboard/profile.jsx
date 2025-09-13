import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Cookies from "js-cookie";

export function Profile() {
  const [data, setData] = useState([]);
  // pega pacientes do backend
  async function GetPsicologo() {
    try {
      const response = await api.get("/api/psicologos", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        params: {
          idpsicologo: Cookies.get('idpsicologo')
        } // hardcoded por enquanto
      });
      setData(response.data[0]);
      console.log(response.data);
      
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    GetPsicologo();
  }, [])
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/user2.jpg"
                alt="..."
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  {data.primeiroNome} {data.sobrenome}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Psicoterapêuta
                </Typography>
              </div>
            </div>
          </div>
          <div>
            
            <label htmlFor="">Primeiro nome</label>
            <input 
              type="text" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="primeiroNome"
           //   value={data.primeiroNome}
            //  onChange={handleChange}
            />
            <label htmlFor="">Sobrenome</label>
            <input 
              type="text" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="sobrenome"
           //   value={data.sobrenome}
           //   onChange={handleChange}
            />
            <label htmlFor="">Data de nascimento</label>
            <input 
              type="date" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="dataNascimento"
           //   value={data.dataNascimento}
            //  onChange={handleChange}
            />
            <label htmlFor="">E-mail</label>
            <input 
              type="email" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="email"
            //  value={data.email}
            //  onChange={handleChange}
            />
            <label htmlFor="">Telefone</label>
            <input 
              type="tel" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="telefone"
            //  value={data.telefone}
             // onChange={handleChange}
            />
            <label htmlFor="">Senha</label>
            <input 
              type="password" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="senha"
              //alue={data.senha}
             // onChange={handleChange}
            />
            <label htmlFor="">Insira a senha novamente</label>
            <input 
              type="password" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="senha2"
             // value={data.senha2}
             // onChange={handleChange}
            />
          </div>
          <div className="mt-4 flex justify-end gap-2">
              <button
               // onClick={() => setOpen(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                Cancelar 
              </button>
              <button
             //  onClick={handleClick}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Confirmar
              </button>
            </div>
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
