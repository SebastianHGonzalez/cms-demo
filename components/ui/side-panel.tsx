import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { Header } from "./header";
import { Button } from "./button";
import { Icon } from "./icon";


const sidePanelVariants = cva("shrink-0 grow-0 border-2 border-gray-500 bg-gray-200", {
  variants: {
    state: {
      open: "basis-xs p-4",
      closed: "",
    },
  },
  defaultVariants: {
    state: "open",
  },
});

type SidePanelProps = ComponentProps<"div"> &
  VariantProps<typeof sidePanelVariants> & {
    header: string;
    asChild?: boolean;
    children: ReactNode;
    onOpen?: () => void;
    onClose?: () => void;
  };

type SidePanelState = NonNullable<Required<SidePanelProps>["state"]>;

export function SidePanel({
  className,
  asChild,
  header,
  children,
  state,
  onOpen,
  onClose,
  ...props
}: SidePanelProps) {
  const sidePanelTarget = document.getElementById("side-panel");

  if (!sidePanelTarget) return null;

  const Comp = asChild ? Slot : "div";

  const isOpen = state === "open";

  return createPortal(
    <Comp className={sidePanelVariants({ className, state })} {...props}>
      <Header
        variant="h3"
        className="mx-0 my-0"
        actions={
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={isOpen ? onClose : onOpen}
          >
            <Icon name={isOpen ? "right" : "left"} />
          </Button>
        }
      >
        {isOpen && header}
      </Header>
      {isOpen && children}
    </Comp>,
    sidePanelTarget,
  );
}

export function useSidePanel() {
  const [state, setState] = useState<SidePanelState>("open");
  const onOpen = () => {
    setState("open");
  };
  const onClose = () => {
    setState("closed");
  };

  return {
    state,
    onOpen,
    onClose,
  };
}
