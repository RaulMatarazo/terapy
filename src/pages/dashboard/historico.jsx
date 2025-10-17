import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

// Mapeamento das emoções
const emocoes = [
  { id: 1, nome: "Alegria" },
  { id: 2, nome: "Surpresa" },
  { id: 3, nome: "Tristeza" },
  { id: 4, nome: "Neutro" },
  { id: 5, nome: "Nojo" },
  { id: 6, nome: "Raiva" },
  { id: 7, nome: "Medo" },
];

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarHistorico = async () => {
      const idpaciente = Cookies.get("idpaciente");

      if (!idpaciente) {
        console.warn("⚠️ Nenhum idpaciente encontrado nos cookies!");
        setLoading(false);
        return;
      }

      console.log("🔎 Buscando histórico de paciente:", idpaciente);

      try {
        const token = Cookies.get("token");
        const response = await api.get(`/api/emocoes?idpaciente=${idpaciente}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          console.log("📦 Dados recebidos:", response.data);

          setHistorico(response.data);
        } else {
          Swal.fire("Erro", "Não foi possível buscar o histórico.", "error");
        }
      } catch (error) {
        console.error("❌ Erro ao buscar histórico:", error);
        Swal.fire("Erro", "Falha ao conectar ao servidor.", "error");
      } finally {
        setLoading(false);
      }
    };

    buscarHistorico();
    
  }, []);

  if (loading) return <p className="text-gray-500">Carregando histórico...</p>;

  if (historico.length === 0)
    return <p className="text-gray-500">Nenhum registro encontrado.</p>;

  return (
    <div className="mt-8 max-w-lg w-full">
      <h2 className="font-bold text-xl mb-4 text-gray-800">
        Histórico de Emoções
      </h2>
      <div className="space-y-4">
        {historico.map((item, index) => {
          // Ajuste de UTC → UTC-3
          const dataUtc = new Date(item.hora);
          const dataSP = new Date(dataUtc.getTime() + 3 * 60 * 60 * 1000);
          const horaLocal = dataSP.toLocaleString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-green-100 border border-green-400 text-green-900 p-4 rounded-xl shadow"
            >
              <p>
                <strong>Emoção:</strong>{" "}
                {emocoes.find((e) => e.id === item.idemocao)?.nome || item.nome}
              </p>
              <p>
                <strong>Qualidade:</strong>{" "}
                {item.qualidade === 1
                  ? "Positiva"
                  : item.qualidade === 0
                  ? "Negativa"
                  : "Nenhuma"}
              </p>
              <p>
                <strong>Intensidade:</strong> {item.idIntensidade - 4 || "Nenhuma"}
              </p>
              <p>
                <strong>Descrição:</strong>{" "}
                {item.descricao && item.descricao !== "null" && item.descricao !== "undefined"
                  ? item.descricao
                  : "Nenhuma"}
              </p>

              <p>
                <strong>Atividade:</strong>{" "}
                {item.atividade && item.atividade !== "null" && item.atividade !== "undefined"
                  ? item.atividade
                  : "Nenhuma"}
              </p>

              <p>
                <strong>Hora:</strong> {horaLocal}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Historico;
