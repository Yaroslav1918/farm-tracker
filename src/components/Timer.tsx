"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import axios from "axios";

import { formatMilliseconds } from "../lib/formatTime";
import { isWithinRadius } from "../lib/isWithinRadius";
import { FARM_LOCATIONS } from "../lib/farmLocation";
import { useOfflineSync } from "../lib/useOfflineSync";

const Timer = () => {
  const [isInsideWorker, setIsIntsideWorker] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [, setError] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const [lunchStartTime, setLunchStartTime] = useState<Date | null>(null);
  const [lunchElapsedTime, setLunchElapsedTime] = useState<string>("00:00:00");


  const [locationChecked, setLocationChecked] = useState(false);
  const [lunchSessionId, setLunchSessionId] = useState<string | null>(null);
  const [initialTotalTimeMs, setInitialTotalTimeMs] = useState(0);
  const [initialTotalTime, setInitialTotalTime] = useState("00:00:00");
  const [initialTotalLunchTime, setInitialTotalLunchTime] =
    useState("00:00:00");
  const [initialTotalTimeLunchMs, setInitialTotalTimeLunchMs] = useState(0);
  const [canStartExtra, setCanStartExtra] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  useOfflineSync();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        return;
      }
      const user = data?.user;
      setUser(user);

      if (user) {
        try {
          const res = await axios.post(`/api/user-profile`, {
            userId: user.id,
          });
          const profileData = res.data;
          if (res.status === 200 && profileData.profile) {
            setIsIntsideWorker(profileData.profile.isInsideWorker);
          } else {
            setError(profileData.error || "Failed to fetch user profile");
          }
        } catch (err: unknown) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
      await fetchTotalWorkTime(user.id);
      await fetchTotalLunchTime(user.id);
    };
    fetchUser();
    checkLocation();
  }, [supabase.auth]);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (startTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diffMs = now.getTime() - startTime.getTime() + initialTotalTimeMs;
        const readableTime = formatMilliseconds(diffMs);
        setElapsedTime(readableTime);
        setInitialTotalTime(readableTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, initialTotalTimeMs]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (lunchStartTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diffMs =
          now.getTime() - lunchStartTime.getTime() + initialTotalTimeLunchMs;
        const readableTime = formatMilliseconds(diffMs);
        setLunchElapsedTime(readableTime);
        setInitialTotalLunchTime(readableTime);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [lunchStartTime, initialTotalTimeLunchMs]);



  const fetchTotalWorkTime = async (userId: string) => {
    try {
      const res = await axios.post("/api/work/total-time", {
        userId,
      });
      const totalMs = res.data.totalMilliseconds;
      setInitialTotalTimeMs(totalMs);
      setInitialTotalTime(res.data.formattedTime);
      // Check if today is weekend
      const today = new Date().getDay(); // Sunday = 0, Saturday = 6
      const isWeekend = today === 0 || today === 6;
      // 8 hours = 28,800,000 milliseconds
      const hasWorked8Hours = totalMs >= 28800000;
      setCanStartExtra(isWeekend || hasWorked8Hours);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };
  const fetchTotalLunchTime = async (userId: string) => {
    try {
      const res = await axios.post("/api/lunch/total-time", {
        userId,
      });
      setInitialTotalTimeLunchMs(res.data.totalMilliseconds);
      setInitialTotalLunchTime(res.data.formattedTime);
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const checkLocation = () => {
    setLoading(true);
    try {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(
            "🚀 ~ checkLocation ~ latitude, longitude :",
            latitude,
            longitude
          );
          setLocation({ latitude, longitude });
          const isAtFarm = Object.values(FARM_LOCATIONS).some((farm) =>
            isWithinRadius(latitude, longitude, farm.latitude, farm.longitude)
          );
          if (isAtFarm) {
            setLocationAllowed(true);
            setError("");
          } else {
            setLocationAllowed(false);
            setError("You are not at the farm location.");
          }
        },
        (err) => {
          setError("Failed to retrieve your location: " + err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        }
      );
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartLunch = async () => {
    setLoading(true);
    if (!user) return;

    try {
      const res = await axios.post("/api/lunch/start", { userId: user.id });
      localStorage.setItem(
        "lunchSession",
        JSON.stringify({
          sessionId: res.data.sessionId,
        })
      );
      setLunchSessionId(res.data.sessionId);
      setLunchStartTime(new Date(res.data.startTime));
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const handleEndLunch = async () => {
    setLoading(true);
    if (!lunchSessionId || !user) return;

    try {
      if (navigator.onLine) {
        await axios.post("/api/lunch/stop", { sessionId: lunchSessionId });
        localStorage.removeItem("lunchSession");
        setLunchSessionId(null);
        setLunchStartTime(null);
        await fetchTotalLunchTime(user.id);
      } else {
        alert(
          "⚠️ You’re currently offline. Your session will be finalized when you reconnect."
        );
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  const handleStartWork = async (keyType: "standard" | "extra") => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("User not found.");
      return;
    }

    if (!locationAllowed) {
      setError("Location not verified. You must be at the farm.");
      return;
    }

    try {
      const res = await axios.post("/api/work/start", {
        userId: user.id,
        keyType,
        locationAllowed,
        latitude: location?.latitude,
        longitude: location?.longitude,
      });
      localStorage.setItem(
        "workSession",
        JSON.stringify({ sessionId: res.data.sessionId })
      );
      setCurrentSessionId(res.data.sessionId);
      setStartTime(new Date(res.data.startTime));
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEndWork = async () => {
    setLoading(true);
    if (!currentSessionId || !user) return;

    try {
      if (navigator.onLine) {
        await axios.post("/api/work/stop", { sessionId: currentSessionId });
        localStorage.removeItem("workSession");
        setCurrentSessionId(null);
        setStartTime(null);
        await fetchTotalWorkTime(user.id);
      } else {
        alert(
          "⚠️ You’re currently offline. Your session will be finalized when you reconnect."
        );
      }
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-[#fbf5fb] border border-gray-300 rounded-2xl shadow-md w-full max-w-2xl mx-auto mt-40 md:mt-40">
      <h2 className="text-xl font-semibold text-center">Work Timer</h2>
      <>
        <button
          disabled={loading}
          onClick={() => {
            checkLocation();
            setLocationChecked(true);
          }}
          className="w-full rounded-lg bg-[#D6DAFF] hover:bg-[#C7CCFF] text-gray-800 font-medium py-2 transition cursor-pointer"
        >
          Check Location
        </button>
        {isInsideWorker ? (
          <button
            onClick={() => handleStartWork("standard")}
            className={`w-full rounded-lg   text-gray-800 font-medium py-2 transition  ${
              !locationAllowed ||
              currentSessionId ||
              lunchSessionId ||
              canStartExtra ||
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#D6DAFF] hover:bg-[#C7CCFF] cursor-pointer"
            }`}
            disabled={
              canStartExtra ||
              !!currentSessionId ||
              !!lunchSessionId ||
              !locationAllowed ||
              loading
            }
          >
            Start Work / Day (first key)
          </button>
        ) : (
          <button
            onClick={() => handleStartWork("standard")}
            className={`w-full rounded-lg   text-gray-800 font-medium py-2 transition  ${
              currentSessionId || lunchSessionId || !locationAllowed
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#D6DAFF] hover:bg-[#C7CCFF] cursor-pointer"
            }`}
            disabled={
              !!currentSessionId ||
              !!lunchSessionId ||
              !locationAllowed ||
              loading
            }
          >
            Start Work / Day
          </button>
        )}

        {isInsideWorker === true && canStartExtra && (
          <button
            onClick={() => handleStartWork("extra")}
            className={`w-full rounded-lg   text-gray-800 font-medium py-2 transition  ${
              !canStartExtra || !!lunchSessionId || !locationAllowed
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#D6DAFF] hover:bg-[#C7CCFF] cursor-pointer"
            }`}
            disabled={
              !canStartExtra || !!lunchSessionId || !locationAllowed || loading
            }
          >
            Start Extra / Weekend (second key)
          </button>
        )}
        {lunchSessionId ? (
          <button
            onClick={handleEndLunch}
            className="w-full rounded-lg bg-orange-300 hover:bg-orange-350 text-gray-800 font-medium py-2 transition cursor-pointer"
          >
            End Lunch
          </button>
        ) : (
          <button
            onClick={handleStartLunch}
            className={`w-full rounded-lg   text-gray-800 font-medium py-2 transition  ${
              currentSessionId || !locationAllowed || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#D6DAFF] hover:bg-[#C7CCFF] cursor-pointer"
            }`}
            disabled={!!currentSessionId || !locationAllowed || loading}
          >
            Start Lunch
          </button>
        )}

        {currentSessionId && (
          <>
            <button
              onClick={handleEndWork}
              className="w-full rounded-lg bg-orange-300 hover:bg-orange-350 text-gray-800 font-medium py-2  cursor-pointer"
            >
              End Work
            </button>
          </>
        )}

        {currentSessionId && elapsedTime !== "00:00:00" ? (
          <div className="text-lg font-mono text-center">
            ⏱ Work Time: <span className="font-semibold">{elapsedTime}</span>
          </div>
        ) : (
          <div className="text-lg font-mono text-center">
            🏆 Total work time today:{" "}
            <span className="font-semibold">{initialTotalTime}</span>
          </div>
        )}

        {locationChecked &&
          (locationAllowed ? (
            <p className="text-green-500 text-center mt-4">
              ✅ You are at the farm location.
            </p>
          ) : (
            <p className="text-red-500 text-center mt-4">
              ❌ You are not at the farm location.
            </p>
          ))}
        {lunchSessionId && lunchElapsedTime !== "00:00:00" ? (
          <div className="text-lg font-mono text-center">
            🍽️ Lunch Time:{" "}
            <span className="font-semibold">{lunchElapsedTime}</span>
          </div>
        ) : (
          <div className="text-lg font-mono text-center">
            🏆 Total lunch time today:{" "}
            <span className="font-semibold">{initialTotalLunchTime}</span>
          </div>
        )}
      </>
    </div>
  );
};

export default Timer;
