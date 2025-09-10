import React, { useState } from "react";

const Questionario = () => {
  const [emocaoSelecionadas, setEmocaoSelecionadas] = useState([]);
  const [observacoes, setObservacoes] = useState("");
  const [resumo, setResumo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const emocoes = [
    "raiva",
    "medo",
    "alegria",
    "tristeza",
    "nojo",
    "surpresa",
    "neutro"
  ];

  const toggleEmocao = (emocao) => {
    setEmocaoSelecionadas((prev) =>
      prev.includes(emocao)
        ? prev.filter((e) => e !== emocao)
        : [...prev, emocao]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (emocaoSelecionadas.length === 0) {
      alert("Selecione ao menos uma emoção antes de enviar.");
      return;
    }

    setResumo({
      emocoes: emocaoSelecionadas,
      observacoes,
    });

    setIsVisible(false);

    setEmocaoSelecionadas([]);
    setObservacoes("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-gray-50 p-4">
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mb-4"
        >
          Mostrar Questionário
        </button>
      )}

      {isVisible && (
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Questionário de Emoções
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                O que você está sentindo hoje?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {emocoes.map((emocao) => (
                  <button
                    type="button"
                    key={emocao}
                    onClick={() => toggleEmocao(emocao)}
                    className={`px-4 py-2 rounded-xl border transition ${
                      emocaoSelecionadas.includes(emocao)
                        ? "bg-blue-900 text-white border-blue-900 shadow-md"
                        : "bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200"
                    }`}
                  >
                    {emocao}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label
                htmlFor="observacoes"
                className="block text-gray-700 font-medium mb-2"
              >
                Descreva as situações que desencadearam esse sentimento:
              </label>
              <textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Você pode escrever aqui."
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-800 outline-none resize-none"
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-800 transition"
            >
              Enviar Respostas
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Questionario;