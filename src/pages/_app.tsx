import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ParticlesBackground } from "@/components";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  // console.log(app);
  const router = useRouter();
  // console.log(router);

  return (
    <>
      <ParticlesBackground />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </>
  );
}
