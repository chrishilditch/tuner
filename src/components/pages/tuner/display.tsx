interface Note {
  name: string;
  frequency: number;
}

interface DisplayProps {
  pitch: number | undefined;
  activeNote: Note;
}

const width = 6.5;
const gap = 2;
const segmentRange = 1;
const innerSmall = 20;
const outerSmall = 45;
const innerMedium = 19.5;
const outerMedium = 46;
const innerLarge = 18;
const outerLarge = 47;

interface SegmentProps {
  start: number;
  end: number;
  isActive: boolean;
  size: "small" | "medium" | "large";
  direction?: "antiClockwise" | "clockwise";
}

const rotateCoordinates = (
  coordination: [number, number],
  direction: "antiClockwise" | "clockwise",
) => {
  if (direction === "clockwise") {
    return [coordination[0], coordination[1]];
  } else {
    return [coordination[1], coordination[0]];
  }
};

const Segment = ({
  start,
  end,
  isActive,
  size = "small",
  direction = "clockwise",
}: SegmentProps) => {
  const inner =
    size === "small"
      ? innerSmall
      : size === "medium"
        ? innerMedium
        : innerLarge;
  const outer =
    size === "small"
      ? outerSmall
      : size === "medium"
        ? outerMedium
        : outerLarge;

  const coord1 = rotateCoordinates(
    [
      Math.cos((Math.PI / 180) * (start - 90)) * inner,
      Math.sin((Math.PI / 180) * (start - 90)) * inner,
    ],
    direction,
  );
  const coord2 = rotateCoordinates(
    [
      Math.cos((Math.PI / 180) * (end - 90)) * inner,
      Math.sin((Math.PI / 180) * (end - 90)) * inner,
    ],
    direction,
  );
  const coord3 = rotateCoordinates(
    [
      Math.cos((Math.PI / 180) * (start - 90)) * outer,
      Math.sin((Math.PI / 180) * (start - 90)) * outer,
    ],
    direction,
  );
  const coord4 = rotateCoordinates(
    [
      Math.cos((Math.PI / 180) * (end - 90)) * outer,
      Math.sin((Math.PI / 180) * (end - 90)) * outer,
    ],
    direction,
  );
  return (
    <path
      d={`M${coord1},${coord2} L${coord4},${coord3} Z`}
      fill={isActive ? "#004b59" : "#00d8ca"}
      stroke="#004b59"
      strokeWidth="0.1"
      className="transition-fill duration-100 delay-75"
    />
  );
};

export default function Display({ pitch, activeNote }: DisplayProps) {
  const targetPitch = activeNote.frequency;

  const activePitchLow = targetPitch ? targetPitch + -1 * segmentRange : null;
  const activePitchHigh = targetPitch ? targetPitch + segmentRange : null;
  const isActive =
    pitch !== undefined &&
    activePitchLow !== null &&
    activePitchHigh !== null &&
    pitch > activePitchLow &&
    pitch < activePitchHigh;

  return (
    <div className="flex flex-col items-center">
      <svg
        width="100"
        height="100"
        className="w-100 h-70"
        viewBox="-50 -50 100 70"
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const activePitchLow = targetPitch
            ? targetPitch + (i + 1) * segmentRange
            : null;
          const activePitchHigh =
            i === 10
              ? 1000
              : targetPitch
                ? targetPitch + (i + 2) * segmentRange
                : null;
          const isActive =
            pitch !== undefined &&
            activePitchLow !== null &&
            activePitchHigh !== null &&
            pitch > activePitchLow &&
            pitch < activePitchHigh;

          const start = i * (width + gap) + 7;
          const end = start + width;
          return (
            <Segment
              key={i}
              start={start}
              end={end}
              isActive={isActive}
              size={i === 10 ? "medium" : "small"}
            />
          );
        })}

        <Segment
          key="target"
          start={-5}
          end={5}
          isActive={isActive}
          size="large"
        />

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
          const activePitchLow = targetPitch
            ? i === 10
              ? 1
              : targetPitch + (i * -1 - 2) * segmentRange
            : null;

          const activePitchHigh = targetPitch
            ? targetPitch + (i * -1 - 1) * segmentRange
            : null;
          const isActive =
            pitch !== undefined &&
            activePitchLow !== null &&
            activePitchHigh !== null &&
            pitch > activePitchLow &&
            pitch < activePitchHigh;
          const start = i * (width + gap) - 90 + 7;
          const end = start + width;
          return (
            <Segment
              key={i}
              start={start}
              end={end}
              isActive={isActive}
              size={i === 10 ? "medium" : "small"}
              direction="antiClockwise"
            />
          );
        })}
        <text
          x={0}
          y={4}
          textAnchor="middle"
          alignmentBaseline="middle"
          className="text-4xl"
        >
          {activeNote.name}
        </text>
        <text
          x={0}
          y={17}
          textAnchor="middle"
          alignmentBaseline="middle"
          className="text-[4px]"
        >
          {activeNote.frequency}
        </text>
      </svg>
    </div>
  );
}
