// src/waterJugSolver.ts
export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

interface State {
  x: number;
  y: number;
  explanation: string;
  stateX: string;
  stateY: string;
}

interface Result {
  steps: State[];
  stepCount: number;
}

export function solveWaterJug(
  x: number,
  y: number,
  z: number
): Result | string {
  if (z > Math.max(x, y)) {
    return "No Solution";
  }

  if (z % gcd(x, y) !== 0) {
    return "No Solution";
  }

  const queue: State[] = [
    { x: 0, y: 0, explanation: "Start", stateX: "Empty", stateY: "Empty" },
  ];
  const visited = new Set<string>();
  visited.add(`0,0`);
  let stepCount = 0;

  while (queue.length > 0) {
    stepCount++;
    const { x: currX, y: currY, explanation } = queue.shift()!;

    if (currX === z || currY === z) {
      return {
        steps: [
          ...queue,
          {
            x: currX,
            y: currY,
            explanation: `${explanation}. Solved`,
            stateX: getState(currX, x),
            stateY: getState(currY, y),
          },
        ],
        stepCount,
      };
    }

    const nextStates: State[] = [
      {
        x,
        y: currY,
        explanation: "Fill bucket x",
        stateX: "Full",
        stateY: getState(currY, y),
      },
      {
        x: currX,
        y,
        explanation: "Fill bucket y",
        stateX: getState(currX, x),
        stateY: "Full",
      },
      {
        x: 0,
        y: currY,
        explanation: "Empty bucket x",
        stateX: "Empty",
        stateY: getState(currY, y),
      },
      {
        x: currX,
        y: 0,
        explanation: "Empty bucket y",
        stateX: getState(currX, x),
        stateY: "Empty",
      },
      {
        x: currX - Math.min(currX, y - currY),
        y: currY + Math.min(currX, y - currY),
        explanation: "Transfer from bucket x to bucket y",
        stateX: getState(currX - Math.min(currX, y - currY), x),
        stateY: getState(currY + Math.min(currX, y - currY), y),
      },
      {
        x: currX + Math.min(currY, x - currX),
        y: currY - Math.min(currY, x - currX),
        explanation: "Transfer from bucket y to bucket x",
        stateX: getState(currX + Math.min(currY, x - currX), x),
        stateY: getState(currY - Math.min(currY, x - currX), y),
      },
    ];

    for (const state of nextStates) {
      const stateKey = `${state.x},${state.y}`;
      if (!visited.has(stateKey)) {
        visited.add(stateKey);
        queue.push(state);
      }
    }
  }

  return "No Solution";
}

function getState(amount: number, capacity: number): string {
  if (amount === 0) return "Empty";
  if (amount === capacity) return "Full";
  return "Partially Full";
}
