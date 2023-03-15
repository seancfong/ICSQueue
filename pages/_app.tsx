import Layout from "@/components/Layout";
import "@/styles/globals.css";
import "../styles/patterns.css";
import type { AppProps } from "next/app";
import { Raleway, Inter } from "next/font/google";
import { AuthContextProvider } from "@/lib/context/AuthContext";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContextProvider>
        <style jsx global>
          {`
            :root {
              --raleway-font: ${raleway.style.fontFamily};
              --inter-font: ${inter.style.fontFamily};
            }
          `}
        </style>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </>
  );
}
