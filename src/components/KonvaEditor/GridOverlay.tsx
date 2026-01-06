import { Layer, Line } from 'react-konva';

type Props = {
  width: number;
  height: number;
  visible: boolean;
};

export function GridOverlay({ width, height, visible }: Props) {
  if (!visible) return null;

  const thirdX = width / 3;
  const thirdY = height / 3;

  return (
    <Layer listening={false}>
      {/* Vertical lines */}
      <Line points={[thirdX, 0, thirdX, height]} stroke="white" strokeWidth={1} opacity={0.6} />
      <Line points={[2 * thirdX, 0, 2 * thirdX, height]} stroke="white" strokeWidth={1} opacity={0.6} />

      {/* Horizontal lines */}
      <Line points={[0, thirdY, width, thirdY]} stroke="white" strokeWidth={1} opacity={0.6} />
      <Line points={[0, 2 * thirdY, width, 2 * thirdY]} stroke="white" strokeWidth={1} opacity={0.6} />
    </Layer>
  );
}
