import { motion } from "framer-motion";

type ComponentProps = {
  children: React.ReactNode;
};

const MotionLayout = ({ children }: ComponentProps) => (
  <main className="fixed w-full	h-full flex items-center justify-center">
    <motion.div
      className="bg-white p-8 rounded-lg shadow-[rgba(0,_0,_0,_0.6)_0px_30px_90px]"
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  </main>
);
export default MotionLayout;
