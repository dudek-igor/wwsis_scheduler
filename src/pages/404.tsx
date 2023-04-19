import { MotionLayout } from "@/components";
import { useRouter } from "next/router";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <MotionLayout>
      <Typography component="h1" variant="h5" gutterBottom>
        Wygląda na to, że zabłądziłeś
      </Typography>
      <Button
        onClick={() => router.back()}
        variant="outlined"
        fullWidth
        endIcon={<SendIcon />}
      >
        Powrót
      </Button>
    </MotionLayout>
  );
}
