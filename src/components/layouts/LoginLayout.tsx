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
    <div className="bg-primary-bg-1 text-primary-text-1 flex min-h-screen flex-col items-center justify-center">
      <div className="my-8 flex flex-1 flex-col items-center justify-center md:my-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="w-fit">
              <MotionButton
                className="text-primary-text-1 w-fit pl-2 text-3xl"
                onClick={() => navigate("/")}
              >
                eurozon<span className="text-accent-1">.de</span>
              </MotionButton>
            </TooltipTrigger>
            <TooltipContent className="bg-primary-bg-3 text-primary-text-3 rounded-lg p-1 text-xs">
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
