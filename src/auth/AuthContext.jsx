import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { removerCookies } from "@/lib/diversos";
import { GetMessage } from "@/lib/GetMessage";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user_token = Cookies.get("tokenb");
    setIsAuthenticated(!!user_token);
  }, []);

  const login = async (username, password) => {
    const data = { username, password };
    removerCookies();
    try {
      if (username.trim() === "") {
        GetMessage("error", "Usuário não informado");
        return false;
      }

      if (password.trim() === "") {
        GetMessage("error", "Senha não informado");
        return false;
      }

      setLoading(true);
      console.log(data);
      
      const response = await api.post("/api/login", data);
      console.log(response);
      
      Cookies.set('token', response.data.token);
      Cookies.set('idusuario', response.data.idusuario);
      if (response.data.papel === 'psicologo') {
        Cookies.set('idpsicologo', response.data.idpsicologo);
        Cookies.set('role', 'psicologo');
        navigate('/dashboard/home')
      } else if (response.data.papel === 'paciente') {
        Cookies.set('idpaciente', response.data.idpaciente);
        Cookies.set('role', 'paciente');
        navigate('/dashboard/questionario');
      }
      setLoading(false);
      console.log('chegou');
      
      if (response.status === 200) {
        console.log('autenticado');
        
        setIsAuthenticated(true);
        return true;
      } else {
        GetMessage("error", "Usuário ou senha incorretos");
      }
    } catch (erro) {
      Swal.fire({
        icon: "error",
        iconColor: "#610905",
        confirmButtonColor: "#610905",
        showDenyButton: true,
        denyButtonText: "Reiniciar conexão",
        denyButtonColor: "#610905",
        text: `Ocorreu um erro interno no servidor, consulte o departamento de tecnologia.`,
      }).then((result) => {
        if (result.isDenied) {
          removerCookies();
          document.location.reload();
        }
      });
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    removerCookies();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
