import List from "@mui/material/List";
import { FitnessListItem } from "@/components";

export default function FitnessList({ fitnessList }: FitnessData.FitnessList) {
  return (
    <List>
      {fitnessList
        .filter(({ timestamp_start }) => {
          const [hour, minutes] = timestamp_start.split(":");
          const currentD = new Date().getTime();
          const startHappyHourD = new Date().setHours(+hour, +minutes, 0);
          return startHappyHourD > currentD;
        })
        .map((fitnessList) => (
          <FitnessListItem key={fitnessList.uuid} {...fitnessList} />
        ))}
    </List>
  );
}
