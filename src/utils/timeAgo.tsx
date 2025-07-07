import { useEffect, useState } from "react";

interface TimeAgoProps {
  date: string;
}

const getShortTimeAgo = (date: string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    y: 31536000,
    mo: 2592000,
    w: 604800,
    d: 86400,
    h: 3600,
    m: 60,
    s: 1,
  };

  for (const key in intervals) {
    const interval = Math.floor(diffInSeconds / intervals[key]);
    if (interval >= 1) {
      return `${interval}${key}`;
    }
  }

  return "Just now";
};

const TimeAgo: React.FC<TimeAgoProps> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState<string>(getShortTimeAgo(date));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(getShortTimeAgo(date));
    }, 60000);

    return () => clearInterval(interval);
  }, [date]);

  return <span className="text-muted-foreground">{timeAgo}</span>;
};

export default TimeAgo;
