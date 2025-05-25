import { useEffect, useState } from "react";
import axios from "axios";

export const useOfflineSync = ()=> {
  // Track online/offline
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  // When we go from offline → online, sync any stored sessions
  useEffect(() => {
    if (!isOnline) return;

    // 1️⃣ Work session
    const work = localStorage.getItem("workSession");
    if (work) {
      const { sessionId } = JSON.parse(work);
      axios
        .post("/api/work/restore-session", { sessionId })
        .then(() => localStorage.removeItem("workSession"))
        .catch((err) => console.error("Failed to restore work:", err));
    }

    // 2️⃣ Lunch session
    const lunch = localStorage.getItem("lunchSession");
    if (lunch) {
      const { sessionId } = JSON.parse(lunch);
      axios
        .post("/api/lunch/restore-session", { sessionId })
        .then(() => localStorage.removeItem("lunchSession"))
        .catch((err) => console.error("Failed to restore lunch:", err));
    }
  }, [isOnline]);
}
