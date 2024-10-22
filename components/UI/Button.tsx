import React, { PropsWithChildren } from "react";
import { cn } from "@/utils/cn";

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Button: React.FC<PropsWithChildren<TButtonProps>> = ({
  children,
  className = "",
  ...rest
}) => {
  return (
    <button className={cn("bg-transparent border border-[#6E42CA] border-solid text-[#6E42CA] rounded p-3 py-1 flex justify-center items-center w-full", className)} {...rest}>
      {children}
    </button>
  );
};

Button.displayName = "Button";

export { Button }