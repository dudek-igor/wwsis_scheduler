import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MotionLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function AdminPage() {
  return (
    <MotionLayout>
      <h1>scheduler</h1>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/sign-in">sign-in</Link>
        </li>
        <li>
          <Link href="/sign-up">sign-up</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </MotionLayout>
  );
}
