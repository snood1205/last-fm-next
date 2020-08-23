import { StrictMode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/globals.css";

interface Props {
  Component: any;
  pageProps: Record<string, unknown>;
}

const Application: React.FC<Props> = ({ Component, pageProps }: Props) => (
  <StrictMode>
    <Component {...pageProps} />
  </StrictMode>
);

export default Application;
