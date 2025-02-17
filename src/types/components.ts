import { ReactElement } from "react";

export interface FlightSelectProps {
  prefix: ReactElement | null;
  type: "from" | "to";
  placeholder?: string;
}
