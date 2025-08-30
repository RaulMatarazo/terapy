import { useState } from "react";
import InputDef from "../InputDef";
import { api } from "@/services/api";
import Cookies from "js-cookie";

export default function ModalCadastrarPaciente({open, setOpen}) {
  const [data, setData] = useState({
    idpsicologo: Cookies.get('idpsicologo'),
    primeiroNome: "",
    sobrenome: "",
    dataNascimento: "",
    email: "",
    telefone: "",
    senha: "",
    senha2: ""
  })

  function handleChange(e) {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }

  function handleValidate(){
    if (data.senha !== data.senha2) {
      alert('As senhas estão diferentes')
      return false;
    }
    else if (data.primeiroNome === ''){
      alert('Primeiro nome em branco')
      return false;
    }
    else if (data.sobrenome === ''){
      alert('Sobrenome em branco')
      return false;
    }
    else if (data.dataNascimento === ''){
      alert('Data nascimento em branco')
      return false;
    }
    else if (data.email === ''){
      alert('E-mail em branco')
      return false;
    }
    else if (data.telefone === ''){
      alert('Telefone em branco')
      return false;
    }
    else if (data.senha === ''){
      alert('Senha em branco')
      return false;
    } else {
      return true;
    }
    
  }

  async function handleClick(){
    if (!handleValidate()){
      return;
    }

    const response = await api.post('/api/pacientes', data, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      }
    });

    console.log(response);
    
    setData({
      idpsicologo: Cookies.get('idpsicologo'),
      primeiroNome: "",
      sobrenome: "",
      dataNascimento: "",
      email: "",
      telefone: "",
      senha: "",
      senha2: ""
    });

    alert('Paciente cadastrado com sucesso!');
  }

  return (
    <div>
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center p-4 justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="text-lg font-semibold text-gray-800">
              Cadastrar paciente
            </h1>
            <p className="mt-2 text-sm text-gray-600">Preencha todos os campos para cadastrar o paciente</p>
            <label htmlFor="">Primeiro nome</label>
            <input 
              type="text" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="primeiroNome"
              value={data.primeiroNome}
              onChange={handleChange}
            />
            <label htmlFor="">Sobrenome</label>
            <input 
              type="text" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="sobrenome"
              value={data.sobrenome}
              onChange={handleChange}
            />
            <label htmlFor="">Data de nascimento</label>
            <input 
              type="date" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="dataNascimento"
              value={data.dataNascimento}
              onChange={handleChange}
            />
            <label htmlFor="">E-mail</label>
            <input 
              type="email" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            <label htmlFor="">Telefone</label>
            <input 
              type="tel" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="telefone"
              value={data.telefone}
              onChange={handleChange}
            />
            <label htmlFor="">Senha</label>
            <input 
              type="password" 
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 placeholder-gray-400 shadow-sm
                  focus:outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-1
                  transition-all duration-200 ease-in-out
                  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-500"
              name="senha"
              value={data.senha}
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
              value={data.senha2}
              onChange={handleChange}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
              >
                Cancelar 
              </button>
              <button
                onClick={handleClick}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
