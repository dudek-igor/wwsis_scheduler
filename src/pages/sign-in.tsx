import Link from "next/link";
import { MotionLayout } from "@/components";
import { UserContext } from "@/context";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import { useState, useCallback, useContext, useEffect } from "react";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();
  const [emailError, setEmailError] = useState<string>(" ");
  const [passwordError, setPasswordError] = useState<string>(" ");
  const [loading, setLoading] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.isUserAuthenticated() && router.push("/scheduler");
  }, [router, userContext]);

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

  const handleChange = () => {
    setEmailError(" ");
    setPasswordError(" ");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    if (!email || !isEmailValid(email))
      return setEmailError("Nieprawidłowy adres email");
    if (!password || !isPasswordSecure(password))
      return setPasswordError("Nieprawidłowe hasło");
    setLoading(true);
    // Sign In Via firebase
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { uid, email, refreshToken } = userCredential.user;
        userContext.addUserData({
          uid,
          refreshToken,
          email,
          admin: email?.includes("dudekigor"),
        });
        router.push("/scheduler");
        setLoading(false);
      })
      .catch(() => {
        setEmailError("Niepoprawny login lub hasło");
        setPasswordError("Niepoprawny login lub hasłoo");
        setLoading(false);
      });
  };

  return (
    <MotionLayout>
      <Box className="flex flex-col items-center max-w-md">
        <Avatar className="bg-[#7ad7f0] m-2">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Zaloguj się
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
            error={!!passwordError.replaceAll(" ", "")}
            helperText={passwordError}
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
            Zaloguj Się
          </LoadingButton>

          <Button component={Link} href="/sign-up" variant="text" fullWidth>
            Nie masz jeszcze konta? Zarejestruj się
          </Button>
        </Box>
      </Box>
    </MotionLayout>
  );
}
