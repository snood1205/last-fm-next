import "../styles/globals.css";

interface Props {
  Component: any;
  pageProps: Record<string, unknown>;
}

const Application: React.FC<Props> = ({ Component, pageProps }: Props) => <Component {...pageProps} />;

export default Application;
