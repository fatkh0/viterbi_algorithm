import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useLayoutContext } from "../../Layout/components/LayoutProvider";

const STEP = "step";
const ZERO = "zero";
const ONE = "one";
const A = "a";
const B = "b";
const C = "c";
const D = "d";
const E = "e";
const F = "f";

const Y_AXIS_TIKS = ["00", "10", "01", "11"] as const;

type RechartsGraphProps = {
  width: number;
  height: number;
};

export function RechartsGraph({
  width,
  height,
}: RechartsGraphProps): JSX.Element {
  const { message } = useLayoutContext();
  const messageNumberArray = message.split("").map((s) => Number(s));
  const output = getOutputLine(messageNumberArray);
  const graphData = generateData(12, output);

  return (
    <LineChart
      width={width}
      height={height - 50}
      data={graphData}
      margin={{ bottom: 30, top: 30, right: 20 }}
    >
      <XAxis dataKey="name" />
      <YAxis
        tickCount={4}
        tick={(props) => {
          return <text {...props}>{Y_AXIS_TIKS[props.index]}</text>;
        }}
      >
        <Label
          value="X1, X0"
          position="top"
          style={{ textAnchor: "middle" }}
          offset={15}
        />
      </YAxis>
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Line
        type="monotone"
        dataKey="mostLikelyState"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      {graphData.map((linesData, index: number) => (
        <>
          <Line type="linear" dataKey={`zero-${index}`} stroke="#8884d8">
            <Label>11</Label>
          </Line>
          <Line type="linear" dataKey={`one-${index}`} stroke="#00FF00" />
          <Line type="linear" dataKey={`a-${index}`} stroke="#00FF00" />
          <Line type="linear" dataKey={`b-${index}`} stroke="#00FF00" />
          <Line type="linear" dataKey={`c-${index}`} stroke="#8884d8" />
          <Line type="linear" dataKey={`d-${index}`} stroke="#8884d8" />
          <Line type="linear" dataKey={`e-${index}`} stroke="#8884d8" />
          <Line type="linear" dataKey={`f-${index}`} stroke="#00FF00" />
        </>
      ))}

      <Line type="linear" dataKey="output" stroke="#FF0000" strokeWidth={2} />

      <Legend content={() => null} />
      <Tooltip content={() => null} />
    </LineChart>
  );
}

function generateData(count: number, message?: number[]) {
  const lines = [];

  for (let i = 0; i < count; i++) {
    const newLine = {
      name: `${STEP}-${i}`,
      output: message?.[i],
      [`${ZERO}-${i}`]: 0,
      [`${ZERO}-${i - 1}`]: i > 0 ? 0 : undefined,
      [`${ONE}-${i}`]: i >= 2 ? 3 : undefined,
      [`${ONE}-${i - 1}`]: i >= 2 ? 3 : undefined,
      [`${A}-${i}`]: 0,
      [`${A}-${i - 1}`]: i > 0 ? 1 : undefined,
      [`${B}-${i}`]: i >= 1 ? 1 : undefined,
      [`${B}-${i - 1}`]: i >= 2 ? 3 : undefined,
      [`${C}-${i}`]: i > 0 ? 1 : undefined,
      [`${C}-${i - 1}`]: i >= 2 ? 2 : undefined,
      [`${D}-${i}`]: i >= 2 ? 2 : undefined,
      [`${D}-${i - 1}`]: i >= 2 ? 0 : undefined,
      [`${E}-${i}`]: i >= 2 ? 3 : undefined,
      [`${E}-${i - 1}`]: i >= 2 ? 2 : undefined,
      [`${F}-${i}`]: i >= 2 ? 2 : undefined,
      [`${F}-${i - 1}`]: i >= 2 ? 1 : undefined,
    };

    lines.push(newLine);
  }

  return lines;
}

function getOutputLine(message?: number[]): number[] {
  const output: number[] = [0];

  message?.forEach((symbol, index) => {
    switch (symbol) {
      case 1:
        handleSymbolOne(index);
        break;
      case 0:
        handleSymbolZero(index);
        break;
    }
  });

  function handleSymbolOne(index: number) {
    switch (output[index]) {
      case 0:
        output.push(1);
        break;
      case 1:
        output.push(3);
        break;
      case 2:
        output.push(1);
        break;
      case 3:
        output.push(3);
        break;
    }
  }

  function handleSymbolZero(index: number) {
    switch (output[index]) {
      case 0:
        output.push(0);
        break;
      case 1:
        output.push(output[index] + 1);
        break;
      case 2:
        output.push(0);
        break;
      case 3:
        output.push(output[index] - 1);
        break;
    }
  }

  return output;
}
