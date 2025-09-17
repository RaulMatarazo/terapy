import { GetMessage } from "@/lib/GetMessage";
import { api } from "@/services/api";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function SignIn() {
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  const navigate = useNavigate();

  function handleChange(e){
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }

  async function handleLoginClick(){
    if (data.username === ''){
      GetMessage('warning', 'Preencha o campo E-mail');
      return;
    }
    if (data.password === ''){
      GetMessage('warning', 'Preencha o campo senha');
      return;
    }
    const response = await api.post('/api/login', data);
    console.log(response);
    
    if (response.status === 200) {
      Cookies.set('token', response.data.token);
      if (response.data.papel === 'psicologo') {
        Cookies.set('idpsicologo', response.data.idpsicologo);
        Cookies.set('role', 'psicologo');
        navigate('/dashboard/home') 
      } else if (response.data.papel === 'paciente'){
        Cookies.set('role', 'paciente');
        navigate('/dashboard/questionario') 
      }
    } else if (response.status === 240){
      GetMessage('warning', 'Entre como paciente ou psicólogo, função de admin indisponível no momento')
    }
    
    else{
      GetMessage('error', 'Usuário ou senha incorretos');
    }
  }
  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Entre na sua conta</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Insira o email e a senha para continuar</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Seu email
            </Typography>
            <Input
              size="lg"
              placeholder=""
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              name="username"
              id="username"
              value={data.username}
              onChange={handleChange}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Senha
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          
          <Button style={{backgroundColor: '#1f57cf'}} className="mt-6" fullWidth onClick={() => handleLoginClick()}>
            Entrar
          </Button>
          {/*
          <div className="flex items-center justify-between gap-2 mt-6">
            <Typography variant="small" className="font-medium text-gray-900">
              <a href="#">
                Forgot Password
              </a>
            </Typography>
          </div>
          */}
          
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Não tem uma conta?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">Criar conta</Link>
          </Typography>
        </form>

      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern2.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>

    </section>
  );
}

export default SignIn;
