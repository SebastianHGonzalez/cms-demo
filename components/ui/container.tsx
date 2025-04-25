import { ReactNode } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Header, HeaderProps } from "./header";

interface ContainerProps {
  header: string;
  headerVariant?: HeaderProps["variant"];
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}

export function Container({
  header,
  headerVariant,
  description,
  actions,
  children,
  footer,
}: ContainerProps) {
  const HeaderComp = headerVariant ?? "h2";

  return (
    <Card className="mx-8 my-4 gap-4">
      <CardHeader>
        <Header asChild className="mx-0 my-0" variant={headerVariant}>
          <CardTitle asChild>
            <HeaderComp>{header}</HeaderComp>
          </CardTitle>
        </Header>
        {description && <CardDescription>{description}</CardDescription>}
        {actions && <CardAction>{actions}</CardAction>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter className="flex flex-row justify-end">{footer}</CardFooter>
      )}
    </Card>
  );
}
