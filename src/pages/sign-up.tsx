import Link from "next/link";
import { MotionLayout } from "@/components";
import { UserContext } from "@/context";
import { useState, useCallback, useEffect, useContext } from "react";
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { useRouter } from "next/router";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function SignUp() {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string>(" ");
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.isUserAuthenticated() && router.push("/scheduler");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEmailValid = useCallback((email: string): boolean => {
    const re =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    return re.test(email);
  }, []);

  const isPasswordSecure = useCallback((password: string): boolean => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return re.test(password);
  }, []);

  const handleChange = useCallback(() => {
    setEmailError(" ");
    setPasswordError(false);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    if (!email || !isEmailValid(email))
      return setEmailError("Nieprawidłowy adres email");
    if (!password || !isPasswordSecure(password)) return setPasswordError(true);
    setLoading(true);
    // Sign In Via firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        router.push("/sign-in");
        setLoading(false);
      })
      .catch(() => {
        setEmailError("Użytkownik o podanym adresie email już istnieje");
        setLoading(false);
      });
  };

  return (
    <MotionLayout>
      <Box className="flex flex-col items-center max-w-md">
        <Avatar className="bg-[#7ad7f0] m-2">
          <CoPresentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zarejestruj się
        </Typography>
        <Box
          component="form"
          onChange={handleChange}
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            error={!!emailError.replaceAll(" ", "")}
            helperText={emailError}
            required
            fullWidth
            id="email"
            label="Adres Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            error={passwordError}
            helperText={
              <List
                disablePadding
                subheader={
                  <Typography variant="body1">
                    Hasło musi zawierać przynajmniej:
                  </Typography>
                }
              >
                <ListItem disablePadding>
                  <Typography variant="body2">* Jedną dużą literę</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="body2">* Jedną mała literę:</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="body2">* Jedną cyfrę</Typography>
                </ListItem>
                <ListItem disablePadding>
                  <Typography variant="body2">
                    * Jeden znak specjalny !@#$%^&*
                  </Typography>
                </ListItem>
              </List>
            }
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <LoadingButton
            loading={loading}
            type="submit"
            fullWidth
            variant="outlined"
            endIcon={<LoginIcon />}
            sx={{ mt: 3, mb: 2 }}
          >
            Zarejestruj się
          </LoadingButton>

          <Button component={Link} href="/sign-in" variant="text" fullWidth>
            Masz już konta? Zaloguj się
          </Button>
        </Box>
      </Box>
    </MotionLayout>
  );
}
