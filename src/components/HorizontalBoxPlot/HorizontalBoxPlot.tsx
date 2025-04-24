import {
  createContext,
  ReactNode,
  use,
  useMemo,
  DragEvent,
  useState,
} from "react";

interface HorizontalBoxPlotProps {
  min?: number;
  max?: number;
  items: PlotItems[];
  axisProps?: AxisProps;
  gaugeProps?: GaugeProps;
}

type PlotItems = PlotItem | PlotItem[];

type PlotItem = {
  id: string;
  label: string;
  value: number;
  width: number;
  color: string;
};

const boxPlotContext = createContext({ min: 0, max: 1000 });

export function HorizontalBoxPlot({
  min,
  max,
  items,
  axisProps,
  gaugeProps,
}: HorizontalBoxPlotProps) {
  const contextValue = useMemo(
    () => ({
      min: min ?? getMin(items),
      max: max ?? getMax(items),
    }),
    [min, max, items]
  );

  return (
    <boxPlotContext.Provider value={contextValue}>
      <div className="relative">
        <div className="flex flex-col space-y-1 p-1 bg-gray-200 border border-gray-400 overflow-hidden">
          {items.map((item) =>
            Array.isArray(item) ? (
              // eslint-disable-next-line react/jsx-key
              <BoxGroup items={item} />
            ) : (
              <BoxGroup items={[item]} key={item.id} />
            )
          )}
        </div>
        <Axis {...axisProps} />
        {gaugeProps && <Gauge {...gaugeProps} />}
      </div>
    </boxPlotContext.Provider>
  );
}

function BoxGroup({ items }: { items: PlotItem[] }) {
  const sortedItems = useMemo(
    () => items.sort((a, b) => a.value - b.value),
    [items]
  );

  return (
    <ol
      className="relative h-4"
      style={{ paddingBlockEnd: `${items.length * 4}px` }}
    >
      {sortedItems.map((item) => (
        // render pill with selected color
        <Box key={item.id} item={item} />
      ))}
    </ol>
  );
}

function Box({ item }: { item: PlotItem }) {
  const { min, max } = use(boxPlotContext);

  const x = ((item.value - min) / (max - min)) * 100;
  const width = (item.width / (max - min)) * 100;

  return (
    <li
      className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-full hover:scale-y-125 hover:brightness-125"
      style={{
        marginInlineStart: `${x}%`,
        width: `${width}%`,
        backgroundColor: item.color,
      }}
    />
  );
}

function getMin(items: PlotItems[]): number {
  return Math.min(
    ...items.map((item) => (Array.isArray(item) ? getMin(item) : item.value))
  );
}

function getMax(items: PlotItems[]): number {
  return Math.max(
    ...items.map((item) =>
      Array.isArray(item) ? getMax(item) : item.value + item.width
    )
  );
}

interface AxisProps {
  renderValue?: (value: number) => ReactNode;
  step?: number;
}

function Axis({ step, renderValue = (value) => value }: AxisProps) {
  const { min, max } = use(boxPlotContext);
  const axisStep = step ?? (max - min) / 10;
  const axisLength = Math.floor((max - min) / axisStep);

  return (
    <div className="flex justify-between text-xs mt-2">
      {Array.from({ length: axisLength }, (_, i) => (
        <span key={i} className={`text-gray-500`}>
          {renderValue(min + i * axisStep)}
        </span>
      ))}
    </div>
  );
}

interface GaugeProps {
  value: number;
}
function Gauge({ value }: GaugeProps) {
  const { min, max } = use(boxPlotContext);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const dragProps = {
    // draggable: true,
    onDrag: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsGrabbing(true);
      const newValue =
        min + (e.clientX / e.currentTarget.clientWidth) * (max - min);
    //   setCurrentValue(newValue);
    },
    onDragEnd: (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsGrabbing(false);
      const newValue =
        min + (e.clientX / e.currentTarget.clientWidth) * (max - min);
    //   setCurrentValue(newValue);
    },
  };

  return (
    <>
    <div
      {...dragProps}
      className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-full"
      style={{
        cursor: isGrabbing ? "grabbing" : "grab",
        marginInlineStart: `${((currentValue - min) / (max - min)) * 100}%`,
      }}
    />
    </>
  );
}
