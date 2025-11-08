export interface Deadline {
  id: number;
  topic: string;
  days: number;
}

export interface ScheduleItem {
  day: number;
  topic: string;
  details: string;
  isMilestone: boolean;
  date?: string;
}

export interface StudyPlan {
  planTitle: string;
  schedule: ScheduleItem[];
}
