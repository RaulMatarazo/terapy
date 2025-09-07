import React from "react";

const Bennefits = () => {
  return (
    <>
      <div className="flex-col bg-white items-center px-[72px] pb-[72px]">
        <h4 className="font-bold text-xl">Por que a Terapy é boa para você?</h4>{" "}
        <p className="text-gray-500 pb-6 text-lg">
          Saiba todos os benefícios de utilizar a Terapy na sua rotina
        </p>
        <div className="pt-8 grid grid-cols-2 grid-rows-3 gap-12">
          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Eficiência no acompanhamento</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Permite registrar e acompanhar o progresso de cada paciente de forma rápida e detalhada, 
                garantindo decisões mais precisas durante o tratamento.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Maior organização</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Centraliza todas as informações do paciente, como cadastros, notas e histórico de sessões, 
                facilitando o gerenciamento da rotina clínica.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Seu trabalho fica mais fácil</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Automatiza tarefas rotineiras e organiza dados importantes, permitindo que você 
                foque no acompanhamento emocional dos pacientes..
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Temos tudo para você</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Reúne todas as ferramentas essenciais para psicólogos em uma única plataforma, 
                garantindo praticidade e controle completo da rotina clínica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bennefits;
