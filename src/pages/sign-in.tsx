import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MotionLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function SignIn() {
  return (
    <MotionLayout>
      <h1>Sign In</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/sign-up">Sign Up</Link>
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
