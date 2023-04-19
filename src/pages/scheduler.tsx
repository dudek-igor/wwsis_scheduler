import { MotionLayout, FitnessList } from "@/components";
import { days } from "@/config";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";
import { useEffect, useState, useCallback, useContext } from "react";
import {
  DocumentData,
  DocumentSnapshot,
  arrayUnion,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  collection,
  setDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { UserContext } from "@/context";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SchedulerPage() {
  /**
   * @info Hooks
   */
  const [fitnessList, setFitnessList] = useState<any>();
  const userContext = useContext(UserContext);
  const router = useRouter();
  /**
   * @info Check if user is authenticated
   */
  useEffect(() => {
    if (!userContext.isUserAuthenticated()) {
      router.push("/sign-in");
    }
  }, [router, userContext]);
  /**
   * @info Fetch fitness data
   */
  const fetchFitnessData = useCallback(async () => {
    const fitnessSubscribers = await getDoc(
      doc(db, "fitness_subscribers", new Date().toLocaleDateString())
    );

    const fitnessByDay = await getDoc(
      doc(db, "fitness_by_day", new Date().getDay().toString())
    );

    if (fitnessByDay.exists() && fitnessSubscribers.exists()) {
      const fitnessSubscribersData = fitnessSubscribers.data().subscribers;
      const fitnessByDayData = fitnessByDay.data().workouts;

      const parsedfitnessSubscribersWorkouts = fitnessByDayData.map(
        ({ uuid, ...rest }) => {
          return {
            uuid,
            ...rest,
            checked: fitnessSubscribersData.some(
              ({ fitness_uuid, user_uid }) =>
                fitness_uuid === uuid &&
                user_uid === "1yrczRRWireqpeJdAiKjjWsopD23"
            ),
            subscribers: fitnessSubscribersData.filter(
              ({ fitness_uuid }) => fitness_uuid === uuid
            ).length,
          };
        }
      );
      console.log(parsedfitnessSubscribersWorkouts);

      return setFitnessList(parsedfitnessSubscribersWorkouts);
    } else if (fitnessByDay.exists()) {
      return setFitnessList(fitnessByDay.data().workouts);
    } else {
      return setFitnessList([]);
    }

    // if (fitnessSubscribersData.exists()) {
    //   console.log(fitnessSubscribersData.data().subscribers);
    //   setFitnessSubscribersList(fitnessSubscribersData.data().subscribers);
    // } else {
    //   setFitnessSubscribersList([]);
    // }

    // const data = await getDocs(collection(db, "fitness"));
    // data.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });
    // const day = new Date().getDay();

    // doc(db, "fitness_by_day", day);

    // const data = await getDoc(
    //   doc(db, "fitness_by_day", new Date().getDay().toString())
    // );
    // const { workouts } = data.data();
    // console.log(workouts);

    // workouts.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.get());

    //   // console.log(doc.id, " => ", doc.data());
    // });
  }, []);

  useEffect(() => {
    fetchFitnessData();
  }, [fetchFitnessData]);
  /**
   * @info Main Handler
   */
  return (
    <MotionLayout>
      <Box className="text-center">
        <Typography component="h1" variant="h4">
          {days[new Date().getDay()]}
        </Typography>
        <Typography component="p" variant="h5" gutterBottom>
          {new Date().toLocaleDateString()}
        </Typography>
        <Divider />
        {!fitnessList ? (
          <Stack className="p-16 w-96" direction="column" spacing={2}>
            <Typography variant="body1" gutterBottom>
              Pobieranie danych...
            </Typography>
            <LinearProgress />
          </Stack>
        ) : (
          <>
            {!fitnessList?.length ? (
              <Typography
                className="block p-16 w-96"
                variant="h5"
                component="p"
                gutterBottom
              >
                Brak Zajęć
              </Typography>
            ) : (
              <FitnessList fitnessList={fitnessList} />
            )}
          </>
        )}
      </Box>
      <Link href="/">Home</Link>
      <br />
      <Link href="/sign-in">sign-in</Link>
      <br />
      <Link href="/sing-up">sing-up</Link>
    </MotionLayout>
  );
}
