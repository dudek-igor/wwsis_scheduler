import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MotionLayout } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function UserPage() {
  return (
    <MotionLayout>
      <h1>Dashboard</h1>
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
          <Link href="/scheduler">scheduler</Link>
        </li>
      </ul>
    </MotionLayout>
  );
}

// const fitness = {
//   sports_activities: [
//     fitness_name: "Zumba Fit",
//     timestamp_start: new Date(),
//     timestamp_end: new Date(),
//     people_max: 20,
//     people_subscribe: [
//       "jT7mJ7s0rIa4yU6fhDibzKJ8m4I3"
//     ]
// };
//

// setDoc(doc(db, "fitness_by_day", "3"), {
//   workouts: [
//     {
//       uuid: "3cbc8b49-b045-430f-ad0c-562e6a1622eb",
//       fitness_name: "PORANNY STRETCHING",
//       canceled: false,
//       difficulty: 1,
//       timestamp_start: "8:00",
//       timestamp_end: "8:50",
//       people_max: 20,
//     },
//     {
//       uuid: "2f810a86-8257-401d-8f26-2b95c269c473",
//       fitness_name: "FULL BODY WORKOUT",
//       canceled: false,
//       difficulty: 2,
//       timestamp_start: "18:00",
//       timestamp_end: "18:50",
//       people_max: 20,
//     },
//     {
//       uuid: "9ea37d04-0169-4324-9e54-c5e8a5178203",
//       fitness_name: "PILATES & STRETCHING",
//       canceled: false,
//       difficulty: 1,
//       timestamp_start: "19:00",
//       timestamp_end: "19:50",
//       people_max: 20,
//     },
//     {
//       uuid: "f50e2aad-4e6e-4985-984a-3e80e2527d49",
//       fitness_name: "SPINNING lvl.2",
//       canceled: false,
//       difficulty: 2,
//       timestamp_start: "19:10",
//       timestamp_end: "20:00",
//       people_max: 12,
//     },
//     {
//       uuid: "07b9a959-e89e-4efe-a370-62eb71d6730e",
//       fitness_name: "ZUMBA FIT",
//       canceled: false,
//       difficulty: 3,
//       timestamp_start: "20:00",
//       timestamp_end: "20:50",
//       people_max: 20,
//     },
//     {
//       uuid: "9ff65009-b5db-4cb2-9b16-5498804f7820",
//       fitness_name: "SPINNING lvl.3",
//       canceled: false,
//       difficulty: 3,
//       timestamp_start: "20:10",
//       timestamp_end: "21:00",
//       people_max: 12,
//     },
//   ],
// });

// setDoc(doc(db, "fitness", "PORANNY STRETCHING"), {
//   difficulty: 1,
// });
// setDoc(doc(db, "fitness", "FULL BODY WORKOUT"), {
//   difficulty: 2,
// });
// setDoc(doc(db, "fitness", "PILATES & STRETCHING"), {
//   difficulty: 1,
// });
// setDoc(doc(db, "fitness", "FULL BODY WORKOUT PRO"), {
//   difficulty: 3,
// });
// setDoc(doc(db, "fitness", "Box"), {
//   difficulty: null,
// });
// setDoc(doc(db, "fitness", "MIX TRAINING"), {
//   difficulty: 2,
// });

// const ref = doc(db, "fitness", "18.04.2023");

// Atomically add a new region to the "regions" array field.
// updateDoc(ref, {
//   sports_activities: arrayUnion(),
// });

// // Atomically remove a region from the "regions" array field.
// await updateDoc(washingtonRef, {
//   regions: arrayRemove("east_coast"),
// });
