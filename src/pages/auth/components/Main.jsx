import React from "react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  function handleComecarClick(e) {
    navigate('/dashboard/home');
  }

  function handleCriarClick() {
    navigate('/auth/sign-up');
  }

  return (
    <div className="flex flex-col ">
      {/* Introdução */}
      <div className="flex-col bg-white flex items-center justify-center pt-20 pb-32">
        <h1 className="font-bold text-9xl">Terapy</h1>
        
        <h2 className="pt-8 text-5xl">Organizando sua mente</h2>
        
        <div className="justify-between space-x-10 pt-8">
          <button onClick={handleComecarClick} className="text-amber-50 bg-blue-700 rounded-md py-2 px-4 text-xl">
            Começar agora
          </button>
          <button onClick={handleCriarClick} className="text-amber-50 bg-black rounded-md py-2 px-4 text-xl">
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
