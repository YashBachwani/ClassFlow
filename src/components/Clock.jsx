import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className=" top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div
        className="backdrop-blur-lg bg-green-800 text-white  
                   px-6 py-0 rounded-full shadow-lg border border-green-300 
                   text-xl font-semibold tracking-wider flex items-center gap-2
                   animate-fade-in"
      >
        🕒 {time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );
}
