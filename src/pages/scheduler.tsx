import { MotionLayout, FitnessList } from "@/components";
import { days, difficultyColors } from "@/config";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { useEffect, useState, useCallback, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { UserContext } from "@/context";
import { useRouter } from "next/router";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function SchedulerPage() {
  /**
   * @info Hooks
   */
  const [fitnessList, setFitnessList] = useState<
    FitnessData.FitnessListItem[] | undefined
  >();
  const [date, setDate] = useState(new Date());
  const userContext = useContext(UserContext);
  const router = useRouter();
  /**
   * @info Check if user is authenticated
   */
  useEffect(() => {
    if (!userContext.isUserAuthenticated()) {
      router.push("/sign-in");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /**
   * @info Fetch fitness data
   */
  const fetchFitnessData = useCallback(async () => {
    setFitnessList(undefined);
    const fitnessSubscribers = await getDoc(
      doc(db, "fitness_subscribers", date.toLocaleDateString())
    );

    const fitnessByDay = await getDoc(
      doc(db, "fitness_by_day", date.getDay().toString())
    );

    if (fitnessByDay.exists() && fitnessSubscribers.exists()) {
      const fitnessSubscribersData = fitnessSubscribers.data()
        .subscribers as FitnessData.FitnessSubscriber[];
      const fitnessByDayData = fitnessByDay.data()
        .workouts as FitnessData.FitnessListItem[];

      const parsedfitnessSubscribersWorkouts = fitnessByDayData.map(
        ({ uuid, ...rest }) => {
          return {
            uuid,
            ...rest,
            checked: fitnessSubscribersData.some(
              ({ fitness_uuid, user_uid }) =>
                fitness_uuid === uuid && user_uid === userContext.userData.uid
            ),
            subscribers: fitnessSubscribersData.filter(
              ({ fitness_uuid }) => fitness_uuid === uuid
            ).length,
          };
        }
      );
      return setFitnessList(parsedfitnessSubscribersWorkouts);
    }

    if (fitnessByDay.exists() && fitnessByDay.data()?.workouts) {
      return setFitnessList(fitnessByDay.data().workouts);
    }

    return setFitnessList([]);
  }, [date, userContext.userData.uid]);

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
          {days[date.getDay()]}
        </Typography>
        <ButtonGroup variant="text" size="large" className="mb-2">
          <Button
            disabled={
              date.toLocaleDateString() === new Date().toLocaleDateString()
            }
            onClick={() =>
              setDate(
                (prevState) =>
                  new Date(prevState.setDate(prevState.getDate() - 1))
              )
            }
          >
            <ArrowBackIosNewIcon />
          </Button>
          <Button disabled className="disabled:text-black">
            {date.toLocaleDateString()}
          </Button>
          <Button
            onClick={() =>
              setDate(
                (prevState) =>
                  new Date(prevState.setDate(prevState.getDate() + 1))
              )
            }
          >
            <ArrowForwardIosIcon />
          </Button>
        </ButtonGroup>
        <Divider />
        <Box className="py-4">
          <Typography component="p" variant="body1" gutterBottom>
            Poziom zaawansowania zajęć fitness
          </Typography>

          <Stack
            className="py-2"
            direction="row"
            flexWrap="wrap"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Paper
              sx={{ bgcolor: difficultyColors[1] }}
              className="flex-auto text-white"
            >
              Łatwe
            </Paper>
            <Paper
              sx={{ bgcolor: difficultyColors[2] }}
              className="flex-auto text-white"
            >
              Średnie
            </Paper>
            <Paper
              sx={{ bgcolor: difficultyColors[3] }}
              className="flex-auto text-white"
            >
              Trudne
            </Paper>
          </Stack>
        </Box>
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
              <FitnessList day={date} fitnessList={fitnessList} />
            )}
          </>
        )}
      </Box>
    </MotionLayout>
  );
}
