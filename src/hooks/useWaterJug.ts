import { useState } from "react";
import measureWater from "../utils/measureWater";

/**
 * Custom hook to manage the water jug logic.
 */
const useWaterJug = () => {
  const [jugX, setJugX] = useState(0);
  const [jugY, setJugY] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  const handleMeasureWater = (x: number, y: number, z: number) => {
    const result = measureWater(x, y, z);
    updateJugState(result);
    setSteps(result);
  };

  const updateJugState = (steps: string[]) => {
    const finalStep = steps[steps.length - 1];
    const match = finalStep.match(/\((\d+), (\d+)\)/);

    if (match) {
      const [finalX, finalY] = match.slice(1).map(Number);
      setJugX(finalX);
      setJugY(finalY);
    } else {
      resetJugState();
    }
  };

  const resetJugState = () => {
    setJugX(0);
    setJugY(0);
  };

  return { jugX, jugY, steps, handleMeasureWater };
};

export default useWaterJug;
