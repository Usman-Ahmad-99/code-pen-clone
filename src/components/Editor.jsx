import { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from "@fortawesome/free-solid-svg-icons";

const Editor = (props) => {
  const { displayName, onChange, value, language } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className={`editor-container ${open ? "" : "collapse"}`}>
        <div className="editor-title">
          {displayName}
          <button
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            className="expand-collapse-btn"
          >
            <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
          </button>
        </div>
        <ControlledEditor
          onBeforeChange={handleChange}
          value={value}
          className="code-mirror-wrapper"
          options={{
            lineWrapping: true,
            lint: true,
            theme: "material",
            mode: language,
            lineNumbers: true,
          }}
        />
      </div>
    </>
  );
};

export default Editor;
