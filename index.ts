type Direction = 'L' | 'R' | 'U' | 'D';
type Coords = [number, number];

const getClosestIntersection = (path1: string[], path2: string[]): number | null => {
  const track1 = getWireTrack(path1);
  const track2 = getWireTrack(path2);

  let res: number | null = null;

  for (const [x1, y1] of track1) {
    const isIntersection = track2.some(([x2, y2]) => x1 === x2 && y1 === y2);

    if (isIntersection) {
      const distance = getManhattanDistance([x1, y1]);

      if (res == null || distance < res) {
        res = distance;
      }
    }
  }

  return res;
};

const getManhattanDistance = ([x1, y1]: Coords, [x2, y2]: Coords = [0, 0]): number =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2);

const getStepCoordinates = ([x, y]: Coords, direction: Direction): Coords => {
  switch (direction) {
    case 'L':
      return [x, y - 1];
    case 'R':
      return [x, y + 1];
    case 'U':
      return [x + 1, y];
    case 'D':
      return [x - 1, y];
    default:
      throw new Error('Incorrect direction!');
  }
};

const getWireTrack = (wirePath: string[]): Coords[] => {
  const res: Coords[] = [];

  for (const move of wirePath) {
    const direction = move[0] as Direction;
    const steps = +move.slice(1);

    for (let j = 0; j < steps; j++) {
      res.push(getStepCoordinates(res[res.length - 1] || [0, 0], direction));
    }
  }

  return res;
};

export default getClosestIntersection;
