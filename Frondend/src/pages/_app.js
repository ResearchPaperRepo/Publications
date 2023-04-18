import Layout from "../components/Layout/layout";
import "../styles/globals.css";
import "../styles/index.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
