import React, { useState } from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Smile, Frown, Angry, Meh, Zap, ThumbsDown, AlertTriangle } from "lucide-react";
import { api } from "@/services/api";
import Swal from "sweetalert2";

const Questionario = () => {
  const [emocaoSelecionada, setEmocaoSelecionada] = useState(null);
  const [qualidade, setQualidade] = useState(null);
  const [idintensidade, setIntensidade] = useState(4);
  const [descricao, setDescricao] = useState("");
  const [atividade, setAtividade] = useState("");
  const [resumos, setResumos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const emocoes = [
    { id: 1, nome: "Alegria", icon: <Smile className="inline w-4 h-4" /> },
    { id: 2, nome: "Surpresa", icon: <Zap className="inline w-4 h-4" /> },
    { id: 3, nome: "Tristeza", icon: <Frown className="inline w-4 h-4" /> },
    { id: 4, nome: "Neutro", icon: <Meh className="inline w-4 h-4" /> },
    { id: 5, nome: "Nojo", icon: <ThumbsDown className="inline w-4 h-4" /> },
    { id: 6, nome: "Raiva", icon: <Angry className="inline w-4 h-4" /> },
    { id: 7, nome: "Medo", icon: <AlertTriangle className="inline w-4 h-4" /> },
  ];

  const enviarParaAPI = async (dados) => {
    try {
      const token = Cookies.get('token'); 
      console.log(dados);
      const response = await api.post("/api/emocoes", dados, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log(response);
      
      if (response.status === 201) {
        Swal.fire("Sucesso!", "Questionário salvo com sucesso!", "success");
        console.log("Resposta da API:", response.data);

      } else {
        Swal.fire("Erro", "Não foi possível salvar o questionário.", "error");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emocaoSelecionada || !qualidade) return;

    const novoResumo = {
      idpaciente: Cookies.get('idpaciente'),
      idemocao: emocoes.find((e) => e.id === emocaoSelecionada)?.id,
      qualidade,
      idintensidade,
      descricao,
      atividade,
    };

    setResumos((prev) => [novoResumo, ...prev]);
    enviarParaAPI(novoResumo);

    setIsVisible(false);
    setEmocaoSelecionada(null);
    setQualidade(null);
    setIntensidade(4);
    setDescricao("");
    setAtividade("");
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
                {emocoes.map((idemocao) => (
                  <button
                    type="button"
                    key={idemocao.id}
                    onClick={() => setEmocaoSelecionada(idemocao.id)}
                    className={`px-4 py-2 rounded-xl border transition flex items-center gap-2 justify-center ${
                      emocaoSelecionada === idemocao.id
                        ? "bg-blue-900 text-white border-blue-900 shadow-md"
                        : "bg-blue-100 border-blue-300 text-blue-900 hover:bg-blue-200"
                    }`}
                  >
                    {idemocao.icon} {idemocao.nome}
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
                  onClick={() => setQualidade(1)}
                  className={`px-4 py-2 rounded-xl border transition ${
                    qualidade === (1)
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"
                  }`}
                >
                  Positiva
                </button>
                <button
                  type="button"
                  onClick={() => setQualidade(0)}
                  className={`px-4 py-2 rounded-xl border transition ${
                    qualidade === (0)
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
                Qual a intensidade dessa emoção?
              </h2>
              <input
                type="range"
                min={1}
                max={7}
                step={1}
                value={idintensidade}
                onChange={(e) => setIntensidade(Number(e.target.value))}
                className="w-full accent-blue-900"
              />
            </div>

            {/* Observações */}
            <div>
              <label
                htmlFor="descricao"
                className="block text-gray-700 font-medium mb-2"
              >
                O que aconteceu para você se sentir assim?
              </label>
              <label
                className="block text-gray-700 font-medium mb-2"
              >
                (opicional)
              </label>
              <textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Escreva aqui suas observações..."
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-800 outline-none resize-none"
                rows={4}
              />
            </div>
            {/* Atividade */}
            <div>
              <label
                htmlFor="atividade"
                className="block text-gray-700 font-medium mb-2"
              >
                O que você fez a respeito?
              </label>
              <label
                className="block text-gray-700 font-medium mb-2"
              >
                (opicional)
              </label>
              <textarea
                id="atividade"
                value={atividade}
                onChange={(e) => setAtividade(e.target.value)}
                placeholder="Escreva aqui suas reação..."
                className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-800 outline-none resize-none"
                rows={4}
              />
            </div>
            {/* Botão Enviar */}
            <button
              type="submit"
              disabled={!emocaoSelecionada || !qualidade || !idintensidade}
              className={`w-full py-3 rounded-xl font-semibold shadow-lg transition ${
                !emocaoSelecionada || !qualidade || !idintensidade
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-blue-900 text-white hover:bg-blue-800"
              }`}
            >
              Enviar Resposta
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default Questionario;
