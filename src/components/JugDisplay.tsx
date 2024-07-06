interface JugDisplayProps {
  jugX: number;
  jugY: number;
}

const JugDisplay: React.FC<JugDisplayProps> = ({ jugX, jugY }) => {
  return (
    <div>
      <h2>Jug States</h2>
      <p>Jug X: {jugX}</p>
      <p>Jug Y: {jugY}</p>
    </div>
  );
};

export default JugDisplay;
