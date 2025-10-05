import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Smile, Frown, Meh, Zap, ThumbsUp, AlertTriangle } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Introdução */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center justify-center bg-white"
        style={{paddingTop: '200px', paddingBottom: '200px'}}
      >
        <h1 className="font-bold text-8xl text-blue-900">Terapy</h1>
        <h2 className="pt-6 text-4xl text-gray-800">Organizando sua mente</h2>

        <div className="flex gap-6 pt-8">
          <button
            onClick={() => navigate("/auth/sign-in")}
            className="bg-blue-900 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-800 transition-all duration-300"
          >
            Começar agora
          </button>
          <button
            onClick={() => navigate("/auth/sign-up")}
            className="bg-black text-white px-6 py-3 rounded-xl shadow hover:bg-gray-800 transition-all duration-300"
          >
            Criar conta
          </button>
        </div>
      </motion.div>

      {/* Funcionalidades */}
      <Section
        title="Funcionalidades"
        subtitle="Entenda tudo que oferecemos"
        items={[
          {
            title: "Dashboard intuitivo",
            description:
              "Tenha acesso rápido e centralizado a todas as informações essenciais em uma única página, incluindo o total de pacientes, registros recentes e indicadores visuais que facilitam o acompanhamento do seu trabalho diário.",
            icon: <Smile className="w-6 h-6 text-blue-900" />,
          },
          {
            title: "Registro de notas",
            description:
              "Registre observações importantes das sessões de forma rápida e organizada, facilitando o acompanhamento de cada paciente.",
            icon: <Frown className="w-6 h-6 text-blue-900" />,
          },
          {
            title: "Questionário de emoções",
            description:
              "Permite que os pacientes registrem diariamente suas emoções, oferecendo ao psicoterapeuta uma visão mais completa do estado emocional entre as sessões e facilitando um acompanhamento personalizado.",
            icon: <Zap className="w-6 h-6 text-blue-900" />,
          },
          {
            title: "Gerenciamento do paciente",
            description:
              "Organize todas as informações dos pacientes em um só lugar, com funcionalidades de cadastro, edição, exclusão e filtragem, facilitando a rotina do psicoterapeuta.",
            icon: <Meh className="w-6 h-6 text-blue-900" />,
          },
        ]}
      />

      {/* Benefícios */}
      <Section
        title="Por que a Terapy é boa para você?"
        subtitle="Saiba todos os benefícios de utilizar a Terapy na sua rotina"
        items={[
          {
            title: "Eficiência no acompanhamento",
            description:
              "Permite registrar e acompanhar o progresso de cada paciente de forma rápida e detalhada, garantindo decisões mais precisas durante o tratamento.",
            icon: <ThumbsUp className="w-6 h-6 text-white" />,
            gradient: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white",
          },
          {
            title: "Maior organização",
            description:
              "Centraliza todas as informações do paciente, como cadastros, notas e histórico de sessões, facilitando o gerenciamento da rotina clínica.",
            icon: <Smile className="w-6 h-6 text-white" />,
            gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          },
          {
            title: "Seu trabalho fica mais fácil",
            description:
              "Automatiza tarefas rotineiras e organiza dados importantes, permitindo que você foque no acompanhamento emocional dos pacientes.",
            icon: <AlertTriangle className="w-6 h-6 text-white" />,
            gradient: "bg-gradient-to-r from-green-400 to-teal-500 text-white",
          },
          {
            title: "Temos tudo para você",
            description:
              "Reúne todas as ferramentas essenciais para psicólogos em uma única plataforma, garantindo praticidade e controle completo da rotina clínica.",
            icon: <Smile className="w-6 h-6 text-white" />,
            gradient: "bg-gradient-to-r from-blue-800 to-indigo-900 text-white",
          },
        ]}
      />
    </div>
  );
};

const Section = ({ title, subtitle, items }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1 }}
      className="py-16 px-8 md:px-16"
    >
      <motion.h3
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        }}
        className="text-3xl font-bold text-gray-800 mb-2"
      >
        {title}
      </motion.h3>
      <motion.p
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
        }}
        className="text-gray-500 mb-12 text-lg"
      >
        {subtitle}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 12 } },
            }}
            whileHover={{ scale: 1.04, y: -5 }}
            className={`flex gap-4 items-start p-6 rounded-xl shadow-lg transition-all duration-300 ${
              item.gradient ? item.gradient : "bg-white"
            }`}
          >
            <div className="flex-shrink-0">{item.icon}</div>
            <div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className={`mt-2 ${item.gradient ? "text-white" : "text-gray-600"}`}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default About;
