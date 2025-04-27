import { ReactNode, ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";

const headerVariants = cva("font-bold", {
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

export type HeaderProps = VariantProps<typeof headerVariants> & {
  className?: string;
  asChild?: boolean;
  children: ReactNode;
  description?: string;
  actions?: ReactNode;
};

export function Header({
  className,
  variant,
  asChild,
  description,
  actions,
  ...props
}: HeaderProps) {
  const Comp = asChild ? Slot : (variant ?? "h2");

  return (
    <InternalHeader className={className}>
      <InternalHeaderTitle asChild>
        <Comp className={cn(headerVariants({ variant }))} {...props} />
      </InternalHeaderTitle>
      {description && (
        <InternalHeaderDescription>{description}</InternalHeaderDescription>
      )}
      {actions && <InternalHeaderAction>{actions}</InternalHeaderAction>}
    </InternalHeader>
  );
}

function InternalHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "@container/header mx-8 my-4 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 has-data-[slot=header-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function InternalHeaderTitle({
  className,
  asChild,
  ...props
}: ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      data-slot="header-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  );
}

function InternalHeaderDescription({
  className,
  asChild,
  ...props
}: ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "p";

  return (
    <Comp
      data-slot="header-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function InternalHeaderAction({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="header-action"
      className={cn(
        "col-start-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}
