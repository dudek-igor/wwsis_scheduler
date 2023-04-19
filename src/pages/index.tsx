import Link from "next/link";
import { MotionLayout } from "@/components";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { UserContext } from "@/context";
import { useContext } from "react";

export default function HomePage() {
  const userContext = useContext(UserContext);

  return (
    <MotionLayout>
      <Stack
        className="max-w-md"
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1}
      >
        <Avatar className="bg-[#7ad7f0] flex items-center justify-center">
          <CalendarMonthIcon />
        </Avatar>
        <Typography align="center" variant="h4" component="h1">
          Witaj w planerze Fitness
        </Typography>
        {userContext.isUserAuthenticated() ? (
          <>
            <br />
            <Typography variant="h5" component="h2">
              Cześć {userContext?.userData?.email}
            </Typography>
            <br />
            <Button
              className="my-32"
              component={Link}
              size="large"
              variant="outlined"
              href="/scheduler"
            >
              Przejdż do planera
            </Button>
          </>
        ) : (
          <>
            <Button
              component={Link}
              size="large"
              variant="outlined"
              endIcon={<LoginIcon />}
              href="/sign-in"
            >
              Zaloguj się
            </Button>

            <Typography variant="caption" className="underline text-gray-500">
              &nbsp;&nbsp;&nbsp;lub&nbsp;&nbsp;&nbsp;
            </Typography>

            <Button
              className="max-w-xs"
              component={Link}
              size="medium"
              variant="outlined"
              href="/sign-up"
            >
              Zarejestruj się
            </Button>
          </>
        )}
      </Stack>
    </MotionLayout>
  );
}
