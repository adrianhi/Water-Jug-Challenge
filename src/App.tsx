import React, { useState } from "react";
import InputForm from "./components/InputForm";
import JugDisplay from "./components/JugDisplay";
import measureWater from "./utils/measureWater";

const App: React.FC = () => {
  const [jugX, setJugX] = useState(0);
  const [jugY, setJugY] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  const handleMeasureWater = ({
    x,
    y,
    z,
  }: {
    x: number;
    y: number;
    z: number;
  }) => {
    const result = measureWater(x, y, z);
    const finalStep = result[result.length - 1];
    const match = finalStep.match(/\((\d+), (\d+)\)/);

    if (match) {
      const [finalX, finalY] = match.slice(1).map(Number);
      setJugX(finalX);
      setJugY(finalY);
    } else {
      setJugX(0);
      setJugY(0);
    }

    setSteps(result);
  };

  return (
    <div>
      <h1>Water Jug Challenge</h1>
      <InputForm onSubmit={handleMeasureWater} />
      <JugDisplay jugX={jugX} jugY={jugY} />
      <div>
        <h2>Steps</h2>
        <ul>
          {steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
