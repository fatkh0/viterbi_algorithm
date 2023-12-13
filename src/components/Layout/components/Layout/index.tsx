import { Container } from "@mui/material";
import { Graph } from "../../../Graph";
import { PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren;

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Container sx={{ py: 3, height: "100vh", position: 'relative' }}>
      <Graph />
      {children}
    </Container>
  );
}
