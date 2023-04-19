import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ParticlesBackground } from "@/components";
import { UserContextProvider } from "@/context";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <UserContextProvider>
      <ParticlesBackground />
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.asPath} />
      </AnimatePresence>
    </UserContextProvider>
  );
}
