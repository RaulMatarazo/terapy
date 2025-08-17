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
import InputMask from "react-input-mask";
import { Link, useSearchParams, useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

  function handleChange(e){
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }


  async function handleCriarClick(){
    const response = await api.post('/api/psicologos', data, {
      headers: { "Content-Type": "application/json" }
    });

    console.log(response.data);
    if (response.status === 200) {
      Cookies.set('token', response.data.token);
      if (response.data.papel === 'psicologo') {
        navigate('/auth/sign-in') 
      } else{
        alert('Entre como psicólogo')
      }
    } else{
      alert('Usuário ou senha incorretos');
    }
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
            <InputMask
  mask="99/99/9999"
  maskChar={null}
  value={data.dataNascimento}
  onChange={handleChange}
  beforeMaskedValueChange={(newState, oldState, userInput) => {
    let { value } = newState;

    // valida primeiro dígito do dia
    if (value.length === 1) {
      if (!/[0-3]/.test(value)) {
        value = "";
      }
    }

    // valida segundo dígito do dia dependendo do primeiro
    if (value.length === 2) {
      const primeiro = value[0];
      const segundo = value[1];

      if (primeiro === "3" && !/[0-1]/.test(segundo)) {
        value = primeiro; // mantém só o primeiro dígito
      } else if (primeiro !== "3" && !/[0-9]/.test(segundo)) {
        value = primeiro;
      }
    }

    // valida primeiro dígito do mês
    if (value.length === 4 && !/[0-1]/.test(value[3])) {
      value = value.slice(0, 3);
    }

    // valida segundo dígito do mês
    if (value.length === 5) {
      const primeiroMes = value[3];
      const segundoMes = value[4];
      if (primeiroMes === "1" && !/[0-2]/.test(segundoMes)) {
        value = value.slice(0, 4);
      } else if (primeiroMes === "0" && !/[1-9]/.test(segundoMes)) {
        value = value.slice(0, 4);
      }
    }

    return { ...newState, value };
  }}
>
  {(inputProps) => (
    <Input
      {...inputProps}
      size="lg"
      type="text"
      name="dataNascimento"
      placeholder="DD/MM/AAAA"
      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
    />
  )}
</InputMask>
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
            <InputMask
              mask="+55 (99) 99999-9999"
              value={data.telefone}
              onChange={handleChange}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  size="lg"
                  type="text"
                  name="telefone"
                  id="telefone"
                  placeholder="+55 (19) 99129-3596"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              )}
            </InputMask>
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
          <Button type="button" className="mt-6" fullWidth onClick={handleCriarClick}>
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
