import React from "react";

const Features = () => {
  return (
    <>
      <div className="flex-col bg-white items-center px-[72px] pb-[72px]">
        <h4 className="font-bold text-xl">Funcionalidades</h4> 
        <p className="text-gray-500 pb-6 text-lg">
          Entenda tudo que oferecemos
        </p>
        <div className="pt-8 grid grid-cols-2 grid-rows-3 gap-12">
          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Dashboard intuitivo</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Tenha acesso rápido e centralizado a todas as informações essenciais em uma única página, 
                incluindo o total de pacientes, registros recentes e indicadores visuais que facilitam 
                o acompanhamento do seu trabalho diário.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Registro de notas</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Registre observações importantes das sessões de forma rápida e organizada, 
                facilitando o acompanhamento de cada paciente.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Questionário de emoções</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Permite que os pacientes registrem diariamente suas emoções, oferecendo ao psicoterapeuta 
                uma visão mais completa do estado emocional entre as sessões e 
                facilitando um acompanhamento personalizado.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Gerenciamento do paciente</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Organize todas as informações dos pacientes em um só lugar, com funcionalidades de 
                cadastro, edição, exclusão e filtragem, facilitando a rotina do psicoterapeuta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
