import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

export function Anotacoes() {
  const [texto, setTexto] = useState("# Título\nEscreva algo em **Markdown**...");
  const [editando, setEditando] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anotações</h1>

      {editando ? (
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onBlur={() => setEditando(false)} // quando perde o foco, volta pro modo preview
          autoFocus
          className="w-full min-h-screen p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div
          onClick={() => setEditando(true)} // ao clicar, vira editor
          className="prose max-w-none border rounded-lg p-4 bg-gray-50 min-h-screen cursor-text"
        >
          <ReactMarkdown>{texto || "*Clique para começar a escrever...*"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default Anotacoes;