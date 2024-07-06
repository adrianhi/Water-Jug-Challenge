import React from "react";
import "../styles/StepsTable.css";

interface Step {
  bucketX: string;
  bucketY: string;
  explanation: string;
}

interface StepsTableProps {
  steps: string[];
}

const parseStep = (step: string): Step => {
  const match = step.match(/\((\d+), (\d+)\)/);
  if (match) {
    const [, bucketX, bucketY] = match;
    const explanation = step.replace(/\(\d+, \d+\)/, "").trim();
    return { bucketX, bucketY, explanation };
  }
  return { bucketX: "", bucketY: "", explanation: step };
};

const StepsTable: React.FC<StepsTableProps> = ({ steps }) => {
  return (
    <table className="steps-table">
      <thead>
        <tr>
          <th>Bucket X</th>
          <th>Bucket Y</th>
          <th>Explanation</th>
        </tr>
      </thead>
      <tbody>
        {steps.map((step, index) => {
          const { bucketX, bucketY, explanation } = parseStep(step);
          return (
            <tr key={index}>
              <td>{bucketX}</td>
              <td>{bucketY}</td>
              <td>{explanation}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StepsTable;
