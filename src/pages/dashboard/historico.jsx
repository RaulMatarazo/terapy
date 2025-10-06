import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Historico = ({ pacienteId }) => {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);

  const buscarHistorico = async () => {
    try {
      const token = Cookies.get("token");

      const response = await api.get(`/api/emocoes/paciente/${pacienteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setHistorico(response.data);
      } else {
        Swal.fire("Erro", "Não foi possível buscar o histórico.", "error");
      }
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      Swal.fire("Erro", "Falha ao conectar ao servidor.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pacienteId) buscarHistorico();
  }, [pacienteId]);

  if (loading) return <p className="text-gray-500">Carregando histórico...</p>;

  if (historico.length === 0)
    return <p className="text-gray-500">Nenhum registro encontrado.</p>;

  return (
    <div className="mt-8 max-w-lg w-full">
      <h2 className="font-bold text-xl mb-4 text-gray-800">
        Histórico de Emoções
      </h2>
      <div className="space-y-4">
        {historico.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 border border-green-400 text-green-900 p-4 rounded-xl shadow"
          >
            <p><strong>Emoção:</strong> {item.idemocao}</p>
            <p><strong>Qualidade:</strong> {item.qualidade}</p>
            <p><strong>Intensidade:</strong> {item.idintensidade}</p>
            <p><strong>Descrição:</strong> {item.descricao || "Nenhuma"}</p>
            <p><strong>Atividade:</strong> {item.atividade || "Nenhuma"}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Historico;
