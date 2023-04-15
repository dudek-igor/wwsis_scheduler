import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MotionLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function SingUp() {
  return (
    <MotionLayout>
      <h1>Sing Up</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/scheduler">Scheduler</Link>
        </li>
      </ul>
    </MotionLayout>
  );
}
