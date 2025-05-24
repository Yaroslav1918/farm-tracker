"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import axios from "axios";

const FARM_LOCATION = {
  latitude: 62.770796, // Replace with your farm's actual latitude
  longitude: 22.879545, // Replace with your farm's actual longitude
};

function getDistanceFromLatLonInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in meters
}

const Timer = () => {
  const [isInsideWorker, setIsIntsideWorker] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState("");
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<string>("00:00:00");
  const [locationChecked, setLocationChecked] = useState(false);
  const [workEnded, setWorkEnded] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (startTime) {
      timer = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now.getTime() - startTime.getTime()) / 1000);

        const hours = Math.floor(diff / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((diff % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (diff % 60).toString().padStart(2, "0");

        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    const savedSessionId = localStorage.getItem("workSessionId");
    const savedStartTime = localStorage.getItem("workStartTime");

    if (savedSessionId && savedStartTime) {
      setCurrentSessionId(savedSessionId);
      setStartTime(new Date(savedStartTime));
    }
    const fetchUser = async () => {
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
        }
      }
    };

    fetchUser();
    checkLocation();
  }, [supabase.auth]);

  const checkLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("🚀 ~ checkLocation ~ latitude:", latitude)
        console.log("🚀 ~ checkLocation ~ longitude:", longitude)

        setLocation({ latitude, longitude });

        const distance = getDistanceFromLatLonInMeters(
          latitude,
          longitude,
          FARM_LOCATION.latitude,
          FARM_LOCATION.longitude
        );

        if (distance <= 500) {
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
        timeout: 10000, // Optional: 10 seconds max wait
        maximumAge: 0, // Optional: always fetch fresh position
      }
    );
  };
  

  const handleStartWork = async (keyType: "standard" | "extra") => {
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

      setCurrentSessionId(res.data.sessionId);
      setStartTime(new Date());
      localStorage.setItem("workSessionId", res.data.sessionId);
      localStorage.setItem("workStartTime", new Date().toISOString());
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  const handleEndWork = async () => {
    if (!currentSessionId) return;

    try {
      await axios.post("/api/work/stop", { sessionId: currentSessionId });
      setCurrentSessionId(null);
      setStartTime(null);
      setWorkEnded(true);
      localStorage.removeItem("workSessionId");
      localStorage.removeItem("workStartTime");
    } catch (err: unknown) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 border border-gray-300 rounded shadow md:w-1/2 md:mx-auto md:mt-40">
      <h2 className="text-xl font-bold">Work Timer</h2>
      {user && <p className="text-gray-600">Hello {user.email}</p>}
      {error && <p className="text-red-500">{error}</p>}
      {isInsideWorker === true && (
        <>
          <button
            onClick={() => {
              checkLocation();
              setLocationChecked(true);
            }}
            className="btn cursor-pointer pt-2 "
          >
            Check Location
          </button>
          <button onClick={() => handleStartWork("standard")} className="btn">
            Start Weekday
          </button>
          <button onClick={() => handleStartWork("extra")} className="btn">
            Start Extra/Weekend
          </button>
        </>
      )}

      {isInsideWorker === false && (
        <>
          <button
            onClick={() => {
              checkLocation();
              setLocationChecked(true);
            }}
            className="btn cursor-pointer pt-2 "
          >
            Check Location
          </button>
          <button onClick={() => handleStartWork("standard")} className="btn">
            Start Work
          </button>
        </>
      )}

      {currentSessionId && (
        <>
          <button onClick={handleEndWork} className="btn bg-red-500 text-white">
            End Work
          </button>
        </>
      )}

      {(currentSessionId || workEnded) && (
        <div className="text-lg font-mono text-center">
          ⏱ Elapsed Time: <span className="font-semibold">{elapsedTime}</span>
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
    </div>
  );
};

export default Timer;
