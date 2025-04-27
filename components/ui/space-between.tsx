import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

export type SpaceBetweenProps = ComponentProps<"div"> &
  VariantProps<typeof spaceBetweenVariants> & {
    asChild?: boolean;
  };

const spaceBetweenVariants = cva("flex items-center gap-4", {
  variants: {
    direction: {
      horizontal: "flex-row",
      vertical: "flex-col",
      "horizontal-reverse": "flex-row-reverse",
      "vertical-reverse": "flex-col-reverse",
    },
  },
  defaultVariants: {
    direction: "horizontal",
  },
});

export function SpaceBetween({
  children,
  className,
  asChild,
  direction,
  ...props
}: SpaceBetweenProps) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="space-between"
      className={spaceBetweenVariants({ className, direction })}
      {...props}
    >
      {children}
    </Comp>
  );
}
