import * as React from "react";
import { cn } from "../../../lib/utils";

const Avatar = React.forwardRef(
  ({ className, src, fallback, size = "md", ...props }, ref) => {
    const sizes = {
      sm: "h-8 w-8 text-xs",
      md: "h-10 w-10 text-sm",
      lg: "h-14 w-14 text-base",
      xl: "h-24 w-24 text-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            className="aspect-square h-full w-full object-cover"
            alt={fallback || "Avatar"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium uppercase">
            {fallback?.slice(0, 2)}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };