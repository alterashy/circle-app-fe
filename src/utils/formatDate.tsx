import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (timestamp: number | string | Date): string => {
  const date = new Date(timestamp);
  return format(date, "MMMM d, yyyy", { locale: enUS });
};
