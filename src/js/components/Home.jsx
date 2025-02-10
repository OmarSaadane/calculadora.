import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
    } else if (value === "C") {
      setInput("");
    } else {
      setInput(input + value);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card shadow-lg p-3 rounded" style={{ width: "320px", backgroundColor: "#1C1C1C" }}>
        <div className="card-body text-center">
          <h3 className="text-white mb-3">Calculadora</h3>
          <input
            value={input}
            readOnly
            className="form-control mb-3 text-end fs-4 bg-dark text-white border-0"
          />
         
        </div>
      </div>
    </div>
  );
}
