import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MarkdownIt from "markdown-it";
import TurndownService from "turndown";
import { api } from "@/services/api";
import Cookies from "js-cookie";

export function Anotacoes() {
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [anotacoes, setAnotacoes] = useState([]);
  const [selectedAnotacao, setSelectedAnotacao] = useState(null);

  // Para editor
  const mdParser = useMemo(() => new MarkdownIt(), []);
  const td = useMemo(() => new TurndownService(), []);
  const quillRef = useRef(null);
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");

  // --- Fetch pacientes ---
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const res = await api.get("/api/pacientes", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          params: { idpsicologo: Cookies.get("idpsicologo") },
        });
        setPacientes(res.data);
        if (res.data.length > 0) setFiltroPaciente(res.data[0].idPaciente);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPacientes();
  }, []);

  // --- Fetch anotações ---
  useEffect(() => {
    const fetchAnotacoes = async () => {
      if (!filtroPaciente) return;
      try {
        const res = await api.get("/api/anotacoes", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          params: { 
            idpaciente: filtroPaciente,
            idpsicologo: Cookies.get("idpsicologo")
          },
        });
        setAnotacoes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAnotacoes();
  }, [filtroPaciente]);

  // --- Abrir anotação no editor ---
  const abrirAnotacao = (anotacao) => {
    setSelectedAnotacao(anotacao);
    setMarkdown(anotacao.anotacao);
    setHtml(mdParser.render(anotacao.anotacao));
  };

  const handleHtmlChange = (newHtml) => {
    setHtml(newHtml);
    try {
      const newMd = td.turndown(newHtml);
      setMarkdown(newMd);
    } catch (e) {}
  };

  const salvarAnotacao = async () => {
    if (!anotacao.id) return alert("Anotação não encontrada!");

    try {
      const res = await api.put(
        `http://localhost:9000/api/anotacoes/${anotacao.id}`,
        { anotacao: markdown },
        {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        }
      );
      alert("Anotação salva com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar anotação:", err);
      alert("Erro ao salvar anotação.");
    }
  };


  // --- Render lista ou editor ---
  if (selectedAnotacao) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Editar Anotação</h1>
        <ReactQuill
          ref={quillRef}
          value={html}
          onChange={handleHtmlChange}
          modules={{ toolbar: true }}
        />
        <div className="mt-4 flex gap-2">
          <button
            className="px-3 py-1 rounded bg-blue-600 text-white"
            onClick={salvarAnotacao}
          >
            Salvar
          </button>
          <button
            className="px-3 py-1 rounded bg-gray-300"
            onClick={() => setSelectedAnotacao(null)}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anotações</h1>

      {/* Filtro por paciente */}
      <div className="mb-4">
        <label>Filtrar por paciente: </label>
        <select
          value={filtroPaciente}
          onChange={(e) => setFiltroPaciente(e.target.value)}
          className="ml-2 border rounded px-2 py-1"
        >
          {pacientes.map((p) => (
            <option key={p.idPaciente} value={p.idPaciente}>
              {p.primeiroNome} {p.sobrenome}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de anotações */}
      <ul className="border rounded p-2">
        {anotacoes.map((a) => (
          <li
            key={a.id}
            className="border-b py-2 px-2 hover:bg-gray-100 cursor-pointer flex justify-between"
            onClick={() => abrirAnotacao(a)}
          >
            <span>{a.anotacao.split("\n")[0]}</span>
            <span className="text-gray-400 text-sm">{new Date(a.createdAt).toLocaleDateString()}</span>
          </li>
        ))}
        {anotacoes.length === 0 && (
          <li className="py-2 text-gray-500">Nenhuma anotação encontrada</li>
        )}
      </ul>
    </div>
  );
}

export default Anotacoes;
