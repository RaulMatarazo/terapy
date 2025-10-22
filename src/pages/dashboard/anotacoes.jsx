import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MarkdownIt from "markdown-it";
import TurndownService from "turndown";
import { api } from "@/services/api";
import Cookies from "js-cookie";
import { UserCircleIcon } from "@heroicons/react/24/solid"; 

export function Anotacoes() {
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [anotacoes, setAnotacoes] = useState([]);
  const [selectedAnotacao, setSelectedAnotacao] = useState(null);
  const [isNewAnotacao, setIsNewAnotacao] = useState(false);
  const [pacienteEmEdicao, setPacienteEmEdicao] = useState(""); 
  
  // ESTADOS PARA BUSCA NO EDITOR (ANOTAÇÃO)
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // <<<<<<<<<<<<<<< NOVOS ESTADOS PARA BUSCA NO FILTRO >>>>>>>>>>>>>>>
  const [filtroSearchQuery, setFiltroSearchQuery] = useState('');
  const [isFilterSearching, setIsFilterSearching] = useState(false);
  const filterSearchRef = useRef(null);
  // <<<<<<<<<<<<<<< FIM NOVOS ESTADOS >>>>>>>>>>>>>>>

  // Para editor
  const mdParser = useMemo(() => new MarkdownIt(), []);
  
  // --- Turndown para preservar linhas vazias ---
  const td = useMemo(() => {
    const turndown = new TurndownService();
    turndown.addRule('emptyParagraph', {
      filter: (node, options) => {
        return node.nodeName === 'P' && (node.innerHTML === '<br>' || node.innerHTML.trim() === '');
      },
      replacement: function (content) {
        return '\n\n';
      }
    });

    turndown.keep(['iframe']); 
    return turndown;
  }, []);
  // --- FIM FIX Turndown ---

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
        if (res.data.length > 0) {
            // Garante que o ID do filtro seja string
            if (!filtroPaciente) {
                setFiltroPaciente(res.data[0].idPaciente.toString());
            }
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPacientes();
  }, []);

  // --- Lógica para fechar a busca ao clicar fora (Editor) ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
        setSearchQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // --- Lógica para fechar a busca ao clicar fora (Filtro) ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterSearchRef.current && !filterSearchRef.current.contains(event.target)) {
        setIsFilterSearching(false);
        setFiltroSearchQuery('');
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterSearchRef]);


  // --- Filtra pacientes no editor ---
  const filteredPacientes = useMemo(() => {
    if (!searchQuery) return pacientes;
    const query = searchQuery.toLowerCase();
    return pacientes.filter(p => 
        p.primeiroNome.toLowerCase().includes(query) || 
        p.sobrenome.toLowerCase().includes(query) ||
        `${p.primeiroNome} ${p.sobrenome}`.toLowerCase().includes(query)
    );
  }, [pacientes, searchQuery]);
  
  // --- Filtra pacientes no filtro principal ---
  const filteredFiltroPacientes = useMemo(() => {
    if (!filtroSearchQuery) return pacientes;
    const query = filtroSearchQuery.toLowerCase();
    return pacientes.filter(p => 
        p.primeiroNome.toLowerCase().includes(query) || 
        p.sobrenome.toLowerCase().includes(query) ||
        `${p.primeiroNome} ${p.sobrenome}`.toLowerCase().includes(query)
    );
  }, [pacientes, filtroSearchQuery]);


  // --- Fetch anotações ---
  const fetchAnotacoes = async () => {
    if (!filtroPaciente) return;
    try {
      const res = await api.get("/api/anotacoes", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        params: { 
          // Envia o filtroPaciente, que agora é uma string
          idpaciente: filtroPaciente,
          idpsicologo: Cookies.get("idpsicologo")
        },
      });
      setAnotacoes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Garante que fetchAnotacoes seja chamado sempre que o filtroPaciente mudar
    fetchAnotacoes();
  }, [filtroPaciente]);

  // --- Abrir anotação no editor (Edição) ---
  const abrirAnotacao = (anotacao) => {
    setSelectedAnotacao(anotacao);
    setIsNewAnotacao(false);
    setPacienteEmEdicao(anotacao.idpaciente ? anotacao.idpaciente.toString() : ""); 
    setSearchQuery(''); 
    setIsSearching(false);
    setMarkdown(anotacao.anotacao);
    setHtml(mdParser.render(anotacao.anotacao));
  };

  // --- Nova anotação ---
  const novaAnotacao = () => {
    if (!filtroPaciente) {
      alert("Selecione um paciente para criar uma anotação.");
      return;
    }
    setSelectedAnotacao(null);
    setIsNewAnotacao(true);
    setMarkdown("");
    setHtml("");
    setPacienteEmEdicao(filtroPaciente ? filtroPaciente.toString() : ""); 
    setIsSearching(true); 
    setSearchQuery(''); 
  };

  // --- Seleciona um paciente na busca do editor ---
  const handleSelectPaciente = (idPaciente) => {
    setPacienteEmEdicao(idPaciente.toString());
    setIsSearching(false); 
    setSearchQuery('');
  };
  
  // --- Seleciona um paciente na busca do filtro ---
  const handleSelectFiltroPaciente = (idPaciente) => {
    setFiltroPaciente(idPaciente.toString());
    setIsFilterSearching(false); 
    setFiltroSearchQuery('');
  };


  const handleHtmlChange = (newHtml) => {
    setHtml(newHtml);
    try {
      const newMd = td.turndown(newHtml);
      setMarkdown(newMd);
    } catch (e) {
      console.error("Erro ao converter HTML para Markdown:", e);
    }
  };

  const salvarAnotacao = async () => {
    if (!markdown.trim()) {
      alert("A anotação não pode estar vazia.");
      return;
    }
    if (!pacienteEmEdicao) {
        alert("Selecione o paciente para salvar a anotação.");
        return;
    }

    try {
      const idPsicologo = parseInt(Cookies.get("idpsicologo"));
      const idPaciente = parseInt(pacienteEmEdicao);

      if (isNewAnotacao) {
        // --- Criação (POST) ---
        const payload = {
          idpsicologo: idPsicologo,
          idpaciente: idPaciente,
          anotacao: markdown,
        };

        await api.post(`/api/anotacoes`, payload, {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });

        alert("Nova anotação salva com sucesso!");

      } else if (selectedAnotacao) {
        // --- Edição (PUT) ---
        const idAnotacao = selectedAnotacao.id; 

        if (!idAnotacao) {
            alert("Erro: ID da anotação não encontrado para edição.");
            return;
        }

        const payload = { 
            idanotacao: idAnotacao, 
            idpsicologo: idPsicologo,
            idpaciente: idPaciente, 
            anotacao: markdown 
        };
        
        await api.put(`/api/anotacoes`, payload,
          {
            headers: { Authorization: `Bearer ${Cookies.get("token")}` },
          }
        );
        alert("Anotação atualizada com sucesso!");

      } else {
        alert("Erro: Não foi possível determinar se é criação ou edição.");
        return;
      }

      // Após salvar/atualizar
      await fetchAnotacoes();
      setSelectedAnotacao(null);
      setIsNewAnotacao(false);
      setPacienteEmEdicao(""); 

    } catch (err) {
      console.error("Erro ao salvar anotação:", err);
      const errorMessage = err.response?.data?.message || err.message || "Erro desconhecido";
      alert(`Erro ao salvar anotação: ${errorMessage}`);
    }
  };

  const cancelarEdicao = () => {
    setSelectedAnotacao(null);
    setIsNewAnotacao(false);
    setMarkdown("");
    setHtml("");
    setPacienteEmEdicao("");
    setIsSearching(false);
    setSearchQuery('');
  };

  // --- Render editor (Edição ou Nova Anotação) ---
  if (selectedAnotacao || isNewAnotacao) {
    const pacienteAtual = pacientes.find(p => p.idPaciente.toString() === pacienteEmEdicao.toString());
    const nomePaciente = pacienteAtual ? `${pacienteAtual.primeiroNome} ${pacienteAtual.sobrenome}` : "Nenhum paciente selecionado";

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">
          {isNewAnotacao ? "Nova Anotação" : "Editar Anotação"}
        </h1>
        
        {/* BUSCA DE PACIENTES NO EDITOR */}
        <div className="text-lg mb-4 text-gray-600 flex items-center relative" ref={searchRef}>
            <span className="font-semibold mr-2">Paciente: </span>
            
            {isSearching || !pacienteEmEdicao ? (
                // MODO DE BUSCA ATIVA
                <div className="relative w-72">
                    <input
                        type="text"
                        placeholder="Buscar paciente (nome ou sobrenome)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearching(true)}
                        className="border rounded px-3 py-1 w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    
                    {/* DROPDOWN DE SUGESTÕES */}
                    {isSearching && (
                        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
                            {filteredPacientes.length > 0 ? (
                                filteredPacientes.map((p) => (
                                    <li
                                        key={p.idPaciente}
                                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                        onClick={() => handleSelectPaciente(p.idPaciente)}
                                    >
                                        <UserCircleIcon className="h-5 w-5 mr-2 text-blue-500"/>
                                        {p.primeiroNome} {p.sobrenome}
                                    </li>
                                ))
                            ) : (
                                <li className="px-3 py-2 text-gray-500">Nenhum paciente encontrado.</li>
                            )}
                        </ul>
                    )}
                </div>
            ) : (
                // MODO DE EXIBIÇÃO
                <div className="flex items-center">
                    <span className="font-semibold text-gray-800 mr-2">{nomePaciente}</span>
                    <button
                        onClick={() => setIsSearching(true)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-2 border border-blue-500 rounded-md px-2 py-0.5 transition"
                    >
                        Trocar/Buscar
                    </button>
                </div>
            )}
        </div>
        {/* FIM BUSCA DE PACIENTES */}


        <ReactQuill
          ref={quillRef}
          value={html}
          onChange={handleHtmlChange}
          modules={{ toolbar: true }}
          className="bg-white mb-4"
        />
        <div className="mt-4 flex gap-2">
          <button
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition"
            onClick={salvarAnotacao}
          >
            Salvar Anotação
          </button>
          <button
            className="px-4 py-2 rounded bg-gray-400 text-gray-900 font-semibold shadow-md hover:bg-gray-500 transition"
            onClick={cancelarEdicao}
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  // --- Render lista de anotações ---
  const pacienteSelecionado = pacientes.find(p => p.idPaciente.toString() === filtroPaciente.toString());

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Anotações</h1>
        <button
          onClick={novaAnotacao}
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          Nova Anotação
        </button>
      </div>

      {/* <<<<<<<<<<<<<<< NOVO FILTRO POR PACIENTE COM BUSCA >>>>>>>>>>>>>>> */}
      <div className="mb-4 flex items-center relative" ref={filterSearchRef}>
        <label htmlFor="select-paciente-filter" className="font-semibold mr-2">Filtrar por paciente: </label>
        
        {isFilterSearching || !filtroPaciente ? (
            // MODO DE BUSCA ATIVA
            <div className="relative w-72">
                <input
                    id="select-paciente-filter-input"
                    type="text"
                    placeholder="Buscar paciente (nome ou sobrenome)..."
                    value={filtroSearchQuery}
                    onChange={(e) => setFiltroSearchQuery(e.target.value)}
                    onFocus={() => setIsFilterSearching(true)}
                    className="border rounded px-3 py-1 w-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                
                {/* DROPDOWN DE SUGESTÕES */}
                {isFilterSearching && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto mt-1">
                        {filteredFiltroPacientes.length > 0 ? (
                            filteredFiltroPacientes.map((p) => (
                                <li
                                    key={p.idPaciente}
                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center"
                                    onClick={() => handleSelectFiltroPaciente(p.idPaciente)}
                                >
                                    <UserCircleIcon className="h-5 w-5 mr-2 text-blue-500"/>
                                    {p.primeiroNome} {p.sobrenome}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-500">Nenhum paciente encontrado.</li>
                        )}
                    </ul>
                )}
            </div>
        ) : (
            // MODO DE EXIBIÇÃO
            <div className="flex items-center">
                <span className="font-semibold text-gray-800 mr-2">
                    {pacienteSelecionado ? `${pacienteSelecionado.primeiroNome} ${pacienteSelecionado.sobrenome}` : "Selecione um paciente"}
                </span>
                <button
                    onClick={() => setIsFilterSearching(true)}
                    className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-2 border border-blue-500 rounded-md px-2 py-0.5 transition"
                >
                    Trocar/Buscar
                </button>
            </div>
        )}
        {/* <<<<<<<<<<<<<<< FIM NOVO FILTRO >>>>>>>>>>>>>>> */}
      </div>

      {/* Lista de anotações */}
      <ul className="border rounded p-2 bg-white shadow-lg">
        {anotacoes.map((a) => (
          <li
            key={a.id}
            className="border-b py-3 px-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition duration-150"
            onClick={() => abrirAnotacao(a)}
          >
            <span className="text-gray-800 font-medium">
              {a.anotacao.split("\n")[0].substring(0, 80)}{a.anotacao.split("\n")[0].length > 80 ? '...' : ''}
            </span>
            <span className="text-gray-500 text-sm flex-shrink-0 ml-4">
              {new Date(a.createdAt).toLocaleDateString()}
            </span>
          </li>
        ))}
        {anotacoes.length === 0 && (
          <li className="py-2 text-center text-gray-500">
            {filtroPaciente ? "Nenhuma anotação encontrada para este paciente." : "Selecione um paciente para ver as anotações."}
          </li>
        )}
      </ul>
    </div>
  );
}

export default Anotacoes;