import React from "react";

const Features = () => {
  return (
    <>
      <div className="flex-col bg-white items-center px-18 pb-18">
        <h4 className="font-bold text-xl">Funcionalidades</h4> 
        <p className="text-gray-500 pb-6 text-lg">
          Entenda tudo que oferecemos
        </p>
        <div className="pt-8 grid grid-cols-2 grid-rows-3 gap-12">
          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Registro de notas</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Body text for whatever you’d like to say. Add main takeaway
                points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Gráficos do progresso do paciente</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Body text for whatever you’d like to say. Add main takeaway
                points, quotes, anecdotes, or even a very very short story
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>I.A Integrada</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Body text for whatever you’d like to say. Add main takeaway
                points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Diário de emoções</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Body text for whatever you’d like to say. Add main takeaway
                points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Questionários de autoavaliação</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Body text for whatever you’d like to say. Add main takeaway
                points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>

          <div className="flex-col">
            <div className="text-xl font-bold flex">
              <i className="text-3xl pt-[3px] bx bx-info-circle pr-4"></i>{" "}
              <h1>Fácil de usar</h1>
            </div>
            <div className="ml-12 mr-14 pb-8">
              <p className="text-lg">
                Body text for whatever you’d like to say. Add main takeaway
                points, quotes, anecdotes, or even a very very short story.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
