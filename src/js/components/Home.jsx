import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calculator() {
  const [input, setInput] = useState("0");
  const [memory, setMemory] = useState("");
  const [operator, setOperator] = useState(null);
  const [resetInput, setResetInput] = useState(false);

  const handleClick = (value) => {
    if (resetInput && !["+", "-", "×", "÷"].includes(value)) {
      setInput(value === "," ? "0," : value);
      setResetInput(false);
      return;
    }

    if (["+", "-", "×", "÷"].includes(value)) {
      setMemory(input);
      setOperator(value);
      setResetInput(true);
    } else if (value === "=") {
      try {
        let expression = `${memory} ${operator} ${input}`
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/,/g, ".");
        let result = eval(expression).toString().replace(".", ",");
        setInput(result);
        setMemory("");
        setOperator(null);
        setResetInput(true);
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("0");
      setMemory("");
      setOperator(null);
    } else if (value === "←") {
      setInput(input.length > 1 ? input.slice(0, -1) : "0");
    } else {
      if (input === "0" && value !== ",") {
        setInput(value);
      } else if (value === "," && input.includes(",")) {
        return;
      } else {
        setInput(input + value);
      }
      setResetInput(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="card shadow-lg p-3 rounded" style={{ width: "320px", backgroundColor: "#1C1C1C" }}>
        <div className="card-body text-center">
          <input
            value={input}
            readOnly
            className="form-control mb-3 text-end fs-4 bg-dark text-white border-0"
          />
          <div className="d-grid gap-2">
            <div className="row g-2">
              {["7", "8", "9", "÷", "4", "5", "6", "×", "1", "2", "3", "-"].map((item) => (
                <div className="col-3" key={item}>
                  <button
                    className={`btn btn-secondary w-100 py-3 fs-5`}
                    onClick={() => handleClick(item)}
                  >
                    {item}
                  </button>
                </div>
              ))}
            </div>
            <div className="row g-2">
              <div className="col-3">
                <button className="btn btn-danger w-100 py-3 fs-5" onClick={() => handleClick("C")}>
                  C
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-secondary w-100 py-3 fs-5" onClick={() => handleClick("0")}>
                  0
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-secondary w-100 py-3 fs-5" onClick={() => handleClick(",")}>
                  ,
                </button>
              </div>
              <div className="col-3">
                <button className="btn btn-secondary w-100 py-3 fs-5" onClick={() => handleClick("+")}>
                  +
                </button>
              </div>
            </div>
            <div className="row g-2">
              <div className="col-6">
                <button className="btn btn-warning w-100 py-3 fs-5" onClick={() => handleClick("←")}>
                  ←
                </button>
              </div>
              <div className="col-6">
                <button className="btn btn-success w-100 py-3 fs-5" onClick={() => handleClick("=")}>
                  =
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}