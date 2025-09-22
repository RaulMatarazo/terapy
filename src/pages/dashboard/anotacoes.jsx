import React, { useState, useMemo, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import MarkdownIt from "markdown-it";
import TurndownService from "turndown";

export function Anotacoes() {
  const DEFAULT_VH = 0.8; // min-height = 80vh
  const PADDING_EXTRA = 8; // folga pequena
  const GAP_BOTTOM = 24; // espaço entre conteúdo e borda inferior
  const TOOLBAR_HEIGHT = 48; // ajuste se necessário
  const LINE_HEIGHT = 24; // altura aproximada de uma linha de texto

  const mdParser = useMemo(() => new MarkdownIt(), []);
  const td = useMemo(() => new TurndownService(), []);

  const [markdown, setMarkdown] = useState("# Título\nEscreva sua **anotação**...");
  const initialHtml = useMemo(() => mdParser.render(markdown), [markdown, mdParser]);
  const [html, setHtml] = useState(initialHtml);

  const quillRef = useRef(null);

  const getMinPx = () => (typeof window === "undefined" ? 400 : Math.round(window.innerHeight * DEFAULT_VH));
  const [minHeightPx, setMinHeightPx] = useState(getMinPx);

  const [outerHeight, setOuterHeight] = useState(getMinPx);

  // Atualiza minHeight ao redimensionar janela
  useEffect(() => {
    const onResize = () => {
      const newMin = getMinPx();
      setMinHeightPx(newMin);
      setOuterHeight((prev) => Math.max(prev || 0, newMin));
      setTimeout(resizeEditorToContent, 80);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função para calcular altura com base no número de linhas
  const resizeEditorToContent = () => {
    try {
      const editor = quillRef.current?.getEditor();
      if (!editor) {
        setOuterHeight((prev) => Math.max(prev || 0, minHeightPx));
        return;
      }

      const editorRoot = editor.root;
      let numLines = editorRoot.querySelectorAll("p").length;
      if (numLines === 0) numLines = 1;

      const desiredOuter = Math.max(
        minHeightPx,
        TOOLBAR_HEIGHT + numLines * LINE_HEIGHT + GAP_BOTTOM + PADDING_EXTRA
      );

      setOuterHeight((prev) => {
        if (!prev || Math.abs(desiredOuter - prev) > 2) return desiredOuter;
        return prev;
      });
    } catch (e) {
      setOuterHeight((prev) => Math.max(prev || 0, minHeightPx));
    }
  };

  useEffect(() => {
    const attempt = setTimeout(resizeEditorToContent, 40);
    return () => clearTimeout(attempt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quillRef.current, minHeightPx]);

  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) {
      const t = setTimeout(resizeEditorToContent, 60);
      return () => clearTimeout(t);
    }

    resizeEditorToContent();

    const textHandler = () => {
      resizeEditorToContent();
      try {
        const newMd = td.turndown(editor.root.innerHTML);
        setMarkdown(newMd);
      } catch (e) {}
    };
    editor.on("text-change", textHandler);

    const observer = new MutationObserver(() => {
      setTimeout(resizeEditorToContent, 30);
    });
    observer.observe(editor.root, { childList: true, subtree: true, attributes: true });

    return () => {
      try {
        editor.off("text-change", textHandler);
      } catch (e) {}
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quillRef.current, minHeightPx]);

  const handleHtmlChange = (newHtml) => {
    setHtml(newHtml);
    try {
      const newMd = td.turndown(newHtml);
      setMarkdown(newMd);
    } catch (e) {}
    setTimeout(resizeEditorToContent, 20);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Anotações</h1>

      <div
        className="outer-editor border rounded-lg shadow-sm"
        style={{
          boxSizing: "border-box",
          padding: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ReactQuill
          ref={quillRef}
          value={html}
          onChange={handleHtmlChange}
          modules={modules}
          formats={formats}
          placeholder="Escreva suas anotações aqui..."
          className="custom-quill"
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-1 rounded bg-blue-600 text-white"
          onClick={() => {
            console.log("anotação salva:", markdown);
            alert("salvo no console (veja devtools).");
          }}
        >
          Salvar
        </button>
      </div>

      <style jsx>{`
        .outer-editor {
          min-height: ${minHeightPx}px !important;
          height: ${outerHeight}px !important;
          transition: height 140ms ease !important;
          box-sizing: border-box !important;
        }

        .custom-quill {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .custom-quill .ql-toolbar {
          height: ${TOOLBAR_HEIGHT}px;
          box-sizing: border-box;
          flex: 0 0 ${TOOLBAR_HEIGHT}px;
        }

        .custom-quill .ql-container {
          height: calc(100% - ${TOOLBAR_HEIGHT}px) !important;
          overflow: visible !important;
          box-sizing: border-box;
        }

        .custom-quill .ql-editor {
          min-height: 0;
          padding: 12px;
        }
      `}</style>
    </div>
  );
}

export default Anotacoes;
