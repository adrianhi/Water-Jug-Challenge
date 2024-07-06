import "../styles/InputForm.css";

import { useState } from "react";
interface InputFormProps {
  onSubmit: (values: { x: number; y: number; z: number }) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [x, setX] = useState<string>("");
  const [y, setY] = useState<string>("");
  const [z, setZ] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ x: parseInt(x), y: parseInt(y), z: parseInt(z) });
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div>
        <label>
          Jug X Capacity:
          <input
            type="number"
            value={x}
            onChange={(e) => setX(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Jug Y Capacity:
          <input
            type="number"
            value={y}
            onChange={(e) => setY(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Target Amount (Z):
          <input
            type="number"
            value={z}
            onChange={(e) => setZ(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InputForm;
