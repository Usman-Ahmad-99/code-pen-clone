import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "../App.css";
import Editor from "./Editor";
function App() {
  const [html, setHtml] = useLocalStorage("html", "<h1>Hello there!</h1>");
  const [css, setCss] = useLocalStorage("css", "h1{color: white}");
  const [js, setJs] = useLocalStorage(
    "js",
    'document.body.style.backgroundColor = "black"'
  );
  const [srcDoc, setSrcDoc] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          frameborder="0"
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
