import List from "@mui/material/List";
import { FitnessListItem } from "@/components";

export default function FitnessList({
  day,
  fitnessList,
}: FitnessData.FitnessList) {
  return (
    <List>
      {fitnessList
        .filter(({ timestamp_start }) => {
          if (day.toLocaleDateString() !== new Date().toLocaleDateString())
            return true;
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
