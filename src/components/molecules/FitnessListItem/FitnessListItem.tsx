import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import { difficultyColors } from "@/config";
import { useCallback, useState } from "react";

export default function FitnessListItem({
  fitness_name,
  people_max,
  difficulty,
  timestamp_start,
  timestamp_end,
  checked = false,
  subscribers = 0,
}: Omit<FitnessData.FitnessListItem, "uuid">) {
  const [isChecked, setChecked] = useState(checked);

  const handleCheckboxClick = useCallback(() => {
    // if (isChecked) {
    // } else {
    // }

    return setChecked((prevState) => !prevState);
  }, []);

  return (
    <ListItem>
      <ListItemButton
        // disabled
        onClick={() => setChecked((prevState) => !prevState)}
      >
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
          secondary={people_max - subscribers}
        />
        <ListItemText
          className="ml-2 text-center grow-0"
          primary="Zapisz"
          secondary="mnie"
        />
        <Checkbox disabled edge="end" checked={isChecked} />
      </ListItemButton>
    </ListItem>
  );
}
