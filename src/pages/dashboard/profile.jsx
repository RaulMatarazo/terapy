import {
  Card,
  CardBody, Avatar,
  Typography, Tooltip
} from "@material-tailwind/react";
import {
  PencilIcon
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "@/widgets/cards";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { GetMessage } from "@/lib/GetMessage";

export function Profile() {
  const [edit, setEdit] = useState(false);
  const [nome, setNome] = useState('');
  const [corpo, setCorpo] = useState({
    idpsicologo: Cookies.get('idpsicologo'),
    idusuario: "",
    primeiroNome: "",
    sobrenome: "",
    dataNascimento: "",
    email: "",
    telefone: ""
  })

  function handleChange(e) {
    const { name, value } = e.target;
    setCorpo({ ...corpo, [name]: value });
  }

  async function GetPsicologo() {
    try {
      const response = await api.get("/api/psicologos", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        params: {
          idpsicologo: Cookies.get('idpsicologo')
        }
      });
      const corpoRetorno = response.data[0];
      setCorpo({
        ...corpo,
        idusuario: corpoRetorno.idUsuario,
        primeiroNome: corpoRetorno.primeiroNome,
        sobrenome: corpoRetorno.sobrenome,
        dataNascimento: corpoRetorno.dataNascimento,
        email: corpoRetorno.email,
        telefone: corpoRetorno.telefone
      });
      setNome(corpoRetorno.primeiroNome + ' ' + corpoRetorno.sobrenome);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  async function PutPsicologo() {
    try {
      const response = await api.put('/api/pacientes', corpo, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        params: {
          idUsuario: corpo.idusuario
        }
      });
      if (response.status === 200) {
        Swal.fire({ text: 'Paciente atualizado com sucesso', icon: 'success', position: 'top', iconColor: '#1f57cf' }).then((result) => {
          if (result.isConfirmed || result.isDenied || result.isDismissed) {
            window.location.reload();
          }
        })
      } else {
        GetMessage('error', response.data);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    GetPsicologo();
  }, [])
  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/pattern4.png')] bg-cover	bg-center">
        
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
                  {nome}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600"
                >
                  Profissional de Saúde Mental
                </Typography>
              </div>
            </div>
          </div>
          {edit === false && (
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <ProfileInfoCard
                title="Informações do perfil"
                details={{
                  "primeiro nome": corpo.primeiroNome,
                  sobrenome: corpo.sobrenome,
                  "data de nascimento": corpo.dataNascimento,
                  email: corpo.email,
                  telefone: corpo.telefone,


                }}
                action={
                  <Tooltip content="Editar" >
                    <PencilIcon onClick={() => setEdit(true)} className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            </div>
          )}
          {edit === true && (
            <>
              <div>
                <label htmlFor="">Primeiro nome</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 mb-2"
                  name="primeiroNome"
                  value={corpo.primeiroNome}
                  onChange={handleChange}
                />
                <label htmlFor="">Sobrenome</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 mb-2"
                  name="sobrenome"
                  value={corpo.sobrenome}
                  onChange={handleChange}
                />
                <label htmlFor="">Data de nascimento</label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 mb-2"
                  name="dataNascimento"
                  value={corpo.dataNascimento}
                  onChange={handleChange}
                />
                <label htmlFor="">E-mail</label>
                <input
                  type="email"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 mb-2"
                  name="email"
                  value={corpo.email}
                  onChange={handleChange}
                />
                <label htmlFor="">Telefone</label>
                <input
                  type="tel"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500 mb-2"
                  name="telefone"
                  value={corpo.telefone}
                  onChange={handleChange}
                />
                {/*
            <label htmlFor="">Senha</label>
            <input
              type="password"
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="senha"
              value={corpo.senha}
              onChange={handleChange}
            />
            <label htmlFor="">Insira a senha novamente</label>
            <input
              type="password"
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="senha2"
             value={corpo.senha2}
             onChange={handleChange}
            />*/}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                  onClick={() => setEdit(false)}
                >
                  Cancelar
                </button>
                <button
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                  onClick={PutPsicologo}
                >
                  Atualizar dados
                </button>
              </div>
            </>
          )}

        </CardBody>
      </Card>
    </>
  );
}

export default Profile;
