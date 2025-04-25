import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const headerVariants = cva("font-bold block mx-8 my-4", {
  variants: {
    variant: {
      h1: "text-4xl",
      h2: "text-3xl",
      h3: "text-2xl",
      h4: "text-xl",
      h5: "text-lg",
      h6: "text-base",
    },
  },
  defaultVariants: {
    variant: "h2",
  },
});

export type HeaderProps =  VariantProps<typeof headerVariants> & {
    className?: string;
    asChild?: boolean;
    children: ReactNode;
  };

export function Header({
  className,
  variant,
  asChild,
  ...props
}: HeaderProps) {
  const Comp = asChild ? Slot : (variant ?? "h2");

  return (
    <Comp className={cn(headerVariants({ variant, className }))} {...props} />
  );
}
