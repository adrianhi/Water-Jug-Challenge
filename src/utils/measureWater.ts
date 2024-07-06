const gcd = (a: number, b: number): number => {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

const canMeasure = (x: number, y: number, z: number): boolean => {
  return z % gcd(x, y) === 0 && z <= Math.max(x, y);
};

interface State {
  a: number;
  b: number;
  path: string[];
}

const measureWater = (x: number, y: number, z: number): string[] => {
  if (!canMeasure(x, y, z)) {
    return ["No Solution"];
  }

  const bfs = (x: number, y: number, z: number): string[] => {
    const visited = new Set<string>();
    const queue: State[] = [];
    const initialState: State = { a: 0, b: 0, path: [] };
    queue.push(initialState);
    visited.add(`0,0`);

    while (queue.length > 0) {
      const { a, b, path } = queue.shift() as State;

      if (a === z || b === z) {
        return path;
      }

      const actions = [
        { a: x, b: b, action: `Fill Jug X (${x}, ${b})` },
        { a: a, b: y, action: `Fill Jug Y (${a}, ${y})` },
        { a: 0, b: b, action: `Empty Jug X (0, ${b})` },
        { a: a, b: 0, action: `Empty Jug Y (${a}, 0)` },
        {
          a: Math.max(a - (y - b), 0),
          b: Math.min(y, a + b),
          action: `Transfer from Jug X to Jug Y (${Math.max(
            a - (y - b),
            0
          )}, ${Math.min(y, a + b)})`,
        },
        {
          a: Math.min(x, a + b),
          b: Math.max(b - (x - a), 0),
          action: `Transfer from Jug Y to Jug X (${Math.min(
            x,
            a + b
          )}, ${Math.max(b - (x - a), 0)})`,
        },
      ];

      for (const { a: newA, b: newB, action } of actions) {
        if (!visited.has(`${newA},${newB}`)) {
          visited.add(`${newA},${newB}`);
          queue.push({ a: newA, b: newB, path: [...path, action] });
        }
      }
    }

    return ["No Solution"];
  };

  return bfs(x, y, z);
};

export default measureWater;
