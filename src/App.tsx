import { useState, useRef, type CSSProperties, type FormEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AMINO_ACID_COLORS } from "./constants/amino-acid-color.constant";
import { validateSequence } from "./utils/validate";
import { useCopySeq } from "./hooks/use-copy-seq";

function App() {
  const [seq1, setSeq1] = useState({
    currentValue: "",
    newValue: "",
    error: "",
  });
  const [seq2, setSeq2] = useState({
    currentValue: "",
    newValue: "",
    error: "",
  });
  const [showVizualization, setShowVizualization] = useState(false);

  const seq1Ref = useRef<HTMLDivElement>(null);
  const seq2Ref = useRef<HTMLDivElement>(null);

  useCopySeq(seq1Ref, seq2Ref);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const seq1Validation = validateSequence(seq1.newValue);
    const seq2Validation = validateSequence(seq2.newValue, seq1.newValue.length);

    setSeq1((prev) => ({
      ...prev,
      error: seq1Validation.error,
      currentValue: seq1Validation.valid ? prev.newValue : prev.currentValue,
    }));

    setSeq2((prev) => ({
      ...prev,
      error: seq2Validation.error,
      currentValue: seq2Validation.valid ? prev.newValue : prev.currentValue,
    }));

    setShowVizualization(seq1Validation.valid && seq2Validation.valid);
  };

  return (
    <main className="main">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="form">
        <div className="input-row">
          <input
            value={seq1.newValue}
            onChange={(e) =>
              setSeq1((prev) => ({ ...prev, newValue: e.target.value.toUpperCase() }))
            }
          />
          {seq1.error && <span className="error">{seq1.error}</span>}
        </div>
        <div className="input-row">
          <input
            value={seq2.newValue}
            onChange={(e) =>
              setSeq2((prev) => ({ ...prev, newValue: e.target.value.toUpperCase() }))
            }
          />
          {seq2.error && <span className="error">{seq2.error}</span>}
        </div>
        <button type="submit">Визуализировать</button>
      </form>

      {showVizualization && (
        <div className="visualization-wrapper">
          <div ref={seq1Ref} className="seq1-container">
            {seq1.currentValue.split("").map((char, index) => (
              <span
                key={`seq1-${index}`}
                className="vizualization-char"
                style={{ "--bg-color": AMINO_ACID_COLORS[char] } as CSSProperties}
              >
                {char}
              </span>
            ))}
          </div>
          <div ref={seq2Ref} className="seq2-container">
            {seq2.currentValue.split("").map((char, index) => (
              <span
                key={`seq2-${index}`}
                className="vizualization-char"
                style={
                  {
                    "--bg-color":
                      char !== seq1.currentValue[index]
                        ? AMINO_ACID_COLORS[char]
                        : "transparent",
                  } as CSSProperties
                }
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
