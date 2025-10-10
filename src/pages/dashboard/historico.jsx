import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

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
          // Converte o horário UTC para horário de São Paulo (UTC-3)
          const horaLocal = new Date(item.hora).toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
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
              <p><strong>Emoção:</strong> {item.nome}</p>
              <p><strong>Data/Hora:</strong> {horaLocal}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Historico;
