import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import { difficultyColors } from "@/config";
import { useState, useContext } from "react";
import { UserContext } from "@/context";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/firebase";

export default function FitnessListItem({
  uuid: fitness_uuid,
  fitness_name,
  people_max,
  difficulty,
  timestamp_start,
  timestamp_end,
  checked = false,
  subscribers = 0,
}: FitnessData.FitnessListItem) {
  const [subscribersCount, setSubscribersCount] = useState<number>(subscribers);
  const [isChecked, setChecked] = useState(checked);
  const [disabled, setDisabled] = useState(false);
  const userContext = useContext(UserContext);

  const handleCheckboxClick = async () => {
    setDisabled(true);
    const checkIfDocExists = await getDoc(
      doc(db, "fitness_subscribers", new Date().toLocaleDateString())
    );
    if (checkIfDocExists.exists()) {
      await await updateDoc(
        doc(db, "fitness_subscribers", new Date().toLocaleDateString()),
        {
          subscribers: isChecked
            ? arrayRemove({ fitness_uuid, user_uid: userContext.userData.uid })
            : arrayUnion({ fitness_uuid, user_uid: userContext.userData.uid }),
        }
      );
    } else {
      await await setDoc(
        doc(db, "fitness_subscribers", new Date().toLocaleDateString()),
        { subscribers: [{ fitness_uuid, user_uid: userContext.userData.uid }] }
      );
    }

    setSubscribersCount((prevState) => (isChecked ? --prevState : ++prevState));
    setChecked((prevState) => !prevState);
    setDisabled(false);
  };

  return (
    <ListItem>
      <ListItemButton disabled={disabled} onClick={() => handleCheckboxClick()}>
        <ListItemAvatar>
          <Avatar
            sx={{
              bgcolor: difficultyColors[difficulty] || difficultyColors[0],
            }}
          >
            {fitness_name.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          className="text-center grow-1"
          primary={fitness_name}
          secondary={timestamp_start + "-" + timestamp_end}
        />
        <ListItemText
          className="mx-2 text-center grow-0"
          primary="Wolne miejsca"
          secondary={people_max - subscribersCount}
        />
        <ListItemText
          className="ml-2 text-center grow-0"
          primary={isChecked ? "Wypisz" : "Zapisz"}
          secondary="mnie"
        />
        <Checkbox disabled edge="end" checked={isChecked} />
      </ListItemButton>
    </ListItem>
  );
}
