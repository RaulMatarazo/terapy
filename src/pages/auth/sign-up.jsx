import { api } from "@/services/api";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";


export function SignUp() {
  const [data, setData] = useState({
    primeiroNome: '',
    sobrenome: '',
    dataNascimento: '',
    email: '',
    telefone: '',
    senha: '',
    crp: ''
  });

  function handleChange(e){
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }


  async function handleCriarClick(){
    const response = api.post('/api/psicologos', data);
  }

  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Junte-se a nós hoje</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Seja bem-vindo a Terapy, crie a sua conta para continuar</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Primeiro nome
            </Typography>
            <Input
              size="lg"
              type="text"
              name="primeiroNome"
              id="primeiroNome"
              value={data.primeiroNome}
              onChange={handleChange}
              placeholder="Josh"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Sobrenome
            </Typography>
            <Input
              size="lg"
              placeholder="Green"
              type="text"
              name="sobrenome"
              id="sobrenome"
              value={data.sobrenome}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Data de nascimento
            </Typography>
            <Input
              size="lg"
              type="date"
              name="dataNascimento"
              id="dataNascimento"
              value={data.dataNascimento}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="josh@mail.com"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Telefone
            </Typography>
            <Input
              size="lg"
              type="number"
              min={0}
              name="telefone"
              id="telefone"
              value={data.telefone}
              onChange={handleChange}
              placeholder="+55 19 99129-3596"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Senha
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              type="password"
              name="senha"
              id="senha"
              value={data.senha}
              onChange={handleChange}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              CRP
            </Typography>
            <Input
              size="lg"
              placeholder="0000000"
              name="crp"
              id="crp"
              value={data.crp}
              onChange={handleChange}
              type="number"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button className="mt-6" fullWidth onClick={() => handleCriarClick()}>
            Register Now
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Já tem uma conta?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Entrar</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
