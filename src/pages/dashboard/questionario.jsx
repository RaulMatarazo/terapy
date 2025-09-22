import React, { useState } from "react";
import { motion } from "framer-motion";
import { Smile, Frown, Angry, Meh, Zap, ThumbsDown, AlertTriangle } from "lucide-react";

const Questionario = () => {
  const [emocaoSelecionada, setEmocaoSelecionada] = useState(null);
  const [qualidade, setQualidade] = useState(null);
  const [intensidade, setIntensidade] = useState(0);
  const [observacoes, setObservacoes] = useState("");
  const [resumos, setResumos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const emocoes = [
    { id: 1, nome: "alegria", icon: <Smile className="inline w-4 h-4" /> },
    { id: 2, nome: "surpresa", icon: <Zap className="inline w-4 h-4" /> },
    { id: 3, nome: "tristeza", icon: <Frown className="inline w-4 h-4" /> },
    { id: 4, nome: "neutro", icon: <Meh className="inline w-4 h-4" /> },
    { id: 5, nome: "repugnância", icon: <ThumbsDown className="inline w-4 h-4" /> },
    { id: 6, nome: "raiva", icon: <Angry className="inline w-4 h-4" /> },
    { id: 7, nome: "medo", icon: <AlertTriangle className="inline w-4 h-4" /> },
  ];

  const enviarParaAPI = async (dados) => {
    try {
      const response = await fetch("http://localhost:3000/api/questionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error("Erro ao enviar para API");
      console.log("Questionário salvo com sucesso!");
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emocaoSelecionada || !qualidade) return;

    const novoResumo = {
      id: Date.now(),
      emocao: emocoes.find((e) => e.id === emocaoSelecionada)?.nome,
      qualidade,
      intensidade,
      observacoes,
      data: new Date().toLocaleString("pt-BR"),
    };

    setResumos((prev) => [novoResumo, ...prev]); // adiciona no histórico
    enviarParaAPI(novoResumo); // manda pra API

    // limpa formulário
    setIsVisible(false);
    setEmocaoSelecionada(null);
    setQualidade(null);
    setIntensidade(0);
    setObservacoes("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-blue-gray-50 p-6">
      {!isVisible && (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-900 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-800 mb-6"
        >
          Responder Questionário
        </button>
      )}

      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg"
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Questionário de Emoções
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seleção de Emoção */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Como você está se sentindo hoje?
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {emocoes.map((emocao) => (
                  <button
                    type="button"
                    key={emocao.id}
                    onClick={() => setEmocaoSelecionada(emocao.id)}
                    className={`px-4 py-2 rounded-xl border transition flex items-center gap-2 justify-center ${
                      emocaoSelecionada === emocao.id
                        ? "bg-blue-900 text-white border-blue-900 shadow-md"
                        : "bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200"
                    }`}
                  >
                    {emocao.icon} {emocao.nome}
                  </button>
                ))}
              </div>
            </div>

            {/* Qualidade */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Essa emoção é positiva ou negativa?
              </h2>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setQualidade("Positiva")}
                  className={`px-4 py-2 rounded-xl border transition ${
                    qualidade === "Positiva"
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Positiva
                </button>
                <button
                  type="button"
                  onClick={() => setQualidade("Negativa")}
                  className={`px-4 py-2 rounded-xl border transition ${
                    qualidade === "Negativa"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-red-100 border-red-300 text-red-700 hover:bg-red-200"
                  }`}
                >
                  Negativa
                </button>
              </div>
            </div>

            {/* Intensidade */}
            <div>
              <h2 className="text-lg font-semibold mb-3 text-gray-700">
                Qual a intensidade dessa emoção? ({intensidade})
              </h2>
              <input
                type="range"
                min={-3}
                max={3}
                step={1}
                value={intensidade}
                onChange={(e) => setIntensidade(Number(e.target.value))}
                className="w-full accent-blue-900"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>-3</span>
                <span>-2</span>
                <span>-1</span>
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label
                htmlFor="observacoes"
                className="block text-gray-700 font-medium mb-2"
              >
                O que aconteceu para você se sentir assim?
              </label>
              <textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Escreva aqui suas observações..."
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-800 outline-none resize-none"
                rows={4}
              />
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              disabled={!emocaoSelecionada || !qualidade}
              className={`w-full py-3 rounded-xl font-semibold shadow-lg transition ${
                !emocaoSelecionada || !qualidade
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              Enviar Resposta
            </button>
          </form>
        </motion.div>
      )}

      {/* Histórico */}
      {resumos.length > 0 && (
        <div className="mt-8 max-w-lg w-full">
          <h2 className="font-bold text-xl mb-4 text-gray-800">
            Histórico de Questionários
          </h2>
          <div className="space-y-4">
            {resumos.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-green-100 border border-green-400 text-green-900 p-4 rounded-xl shadow"
              >
                <p><strong>Data:</strong> {item.data}</p>
                <p><strong>Emoção:</strong> {item.emocao}</p>
                <p><strong>Qualidade:</strong> {item.qualidade}</p>
                <p><strong>Intensidade:</strong> {item.intensidade}</p>
                <p><strong>Observações:</strong> {item.observacoes || "Nenhuma"}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionario;
