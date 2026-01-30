export type Status = "confirmed" | "completed" | "cancelled";

export interface Booking {
  id: string;
  tutorName: string;
  subject: string;
  date: string;
  time: string;
  status: Status;
  avatar: string;
  amount: string;
}
