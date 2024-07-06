import React from "react";
import InputForm from "./components/InputForm";
import JugDisplay from "./components/JugDisplay";
import StepsTable from "./components/StepsTable";
import useWaterJug from "./hooks/useWaterJug";
import "./styles/App.css";

const App: React.FC = () => {
  const { jugX, jugY, steps, handleMeasureWater } = useWaterJug();

  const handleSubmit = ({ x, y, z }: { x: number; y: number; z: number }) => {
    handleMeasureWater(x, y, z);
  };

  return (
    <div className="app-container">
      <h1>Water Jug </h1>
      <InputForm onSubmit={handleSubmit} />
      <div className="steps-container">
        <h2>Steps</h2>
        <StepsTable steps={steps} />
      </div>
      <JugDisplay jugX={jugX} jugY={jugY} />
    </div>
  );
};

export default App;
