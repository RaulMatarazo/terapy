import { useEffect, useState } from "react";
import InputDef from "../InputDef";
import { api } from "@/services/api";
import Cookies from "js-cookie";

export default function ModalEditarPaciente({open, setOpen, id}) {
  const [data, setData] = useState({
    idpsicologo: Cookies.get('idpsicologo'),
    idUsuario: id,
    primeiroNome: "",
    sobrenome: "",
    dataNascimento: "",
    email: "",
    telefone: ""
  });
  const [deleteBody, setDeleteBody] = useState({
    idUsuario: id
  })

  useEffect(() => {
    setData({...data, idUsuario: id});
    setDeleteBody({ idUsuario: id });
  }, [id]);

  async function getData() {
    const response = await api.get('/api/pacientes', {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      params: {
        idpsicologo: Cookies.get('idpsicologo'),
        idusuario: id
      }
    });
    const paciente = response.data[0];
    setData({...data, primeiroNome: paciente.primeiroNome, sobrenome: paciente.sobrenome, dataNascimento: paciente.dataNascimento, 
    email: paciente.email, telefone: paciente.telefone});
  }

  useEffect(() => {
    if (open === true) {
     getData(); 
    }
  }, [open]);


  function handleChange(e) {
    const {name, value} = e.target;
    setData({...data, [name]: value});
  }

  function handleValidate(){
    if (data.primeiroNome === ''){
      GetMessage('error', 'Preencha o campo primeiro nome');
      return false;
    }
    else if (data.sobrenome === ''){
      GetMessage('error', 'Preencha o campo sobrenome');
      return false;
    }
    else if (data.dataNascimento === ''){
      GetMessage('error', 'Preencha o campo data de nascimento');
      return false;
    }
    else if (data.email === ''){
      GetMessage('error', 'Preencha o campo E-mail');
      return false;
    }
    else if (data.telefone === ''){
      GetMessage('error', 'Preencha o campo telefone');
      return false;
    }
    else if (data.senha === ''){
      GetMessage('error', 'Preencha o campo senha');
      return false;
    } else {
      return true;
    }
    
  }

  async function handleClick(){
    if (!handleValidate()){
      return;
    }
    
    const response = await api.put('/api/pacientes', data, {
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`
      },
      params: {
        idUsuario: id
      }
    });

    if (response.status === 200) {
      GetMessage('success', 'Paciente atualizado com sucesso');
      window.location.reload();
    } else if (response.status === 207){
      alert(response.data);
    }

    
  }

  async function handleExcluirClick() {
    try {
      const response = await api.delete('/api/pacientes', {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
        params: {
          idUsuario: id
        }
      });
      if (response.status === 200) {
        GetMessage('success', 'Paciente excluído com sucesso');
      } else {
        alert('Erro ao excluir o paciente');
      }
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <div>
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center p-4 justify-center bg-black/50">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
            <h1 className="text-lg font-semibold text-gray-800 mb-5">
              Editar paciente
            </h1>
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
            {/*<label htmlFor="">Senha</label>
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
            />*/}

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleExcluirClick}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-400"
              >
                Excluir 
              </button>
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
