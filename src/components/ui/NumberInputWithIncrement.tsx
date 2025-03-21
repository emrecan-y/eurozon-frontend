import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Minus, Plus } from "lucide-react";
import MotionButton from "./MotionButton";

type NumberInputWithIncrementProps = {
  value: number;
  setValue: (value: number) => void;
};

function NumberInputWithIncrement({
  value,
  setValue,
}: NumberInputWithIncrementProps) {
  return (
    <div className="flex items-center gap-0.5">
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton onClick={() => setValue(value - 1)}>
            <Minus className="h-5 w-5" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
          <p>Anzahl erhöhen</p>
        </TooltipContent>
      </Tooltip>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number.parseInt(e.target.value))}
        min={1}
        max={10}
        className="h-8 w-8 rounded bg-primary-text-1 text-center text-primary-bg-1 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <MotionButton onClick={() => setValue(value + 1)} className="text-xl">
            <Plus className="h-5 w-5" />
          </MotionButton>
        </TooltipTrigger>
        <TooltipContent className="rounded-lg bg-primary-bg-3 p-1 text-xs text-primary-text-3">
          <p>Anzahl verringern</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

export default NumberInputWithIncrement;
