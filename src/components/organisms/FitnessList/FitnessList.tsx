import List from "@mui/material/List";
import { FitnessListItem } from "@/components";

export default function FitnessList({ fitnessList }: FitnessData.FitnessList) {
  return (
    <List>
      {fitnessList.map(({ uuid, ...rest }) => (
        <FitnessListItem key={uuid} {...rest} />
      ))}
    </List>
  );
}
