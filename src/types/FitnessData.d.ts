declare namespace FitnessData {
  interface FitnessListItem {
    uuid: string;
    fitness_name: string;
    people_max: number;
    difficulty: number;
    timestamp_start: string;
    timestamp_end: string;
    checked?: boolean;
    subscribers?: nubmer;
  }

  interface FitnessList {
    day: Date;
    fitnessList: FitnessListItem[];
  }

  interface FitnessSubscriber {
    fitness_uuid: string;
    user_uid: string;
  }
}
