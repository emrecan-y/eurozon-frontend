import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import { Outlet, useNavigate } from "react-router-dom";
import MotionButton from "../ui/MotionButton";

function LoginLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="my-8 flex flex-1 flex-col items-center justify-center md:my-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton
                className="text-2xl font-bold text-primary-text"
                onClick={() => navigate("/")}
              >
                Eurozon.de
              </MotionButton>
            </TooltipTrigger>
            <TooltipContent className="rounded-lg bg-tooltip-bg p-1 text-xs text-tooltip-text">
              <p>Homepage</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Outlet />
      </div>
    </div>
  );
}

export default LoginLayout;
