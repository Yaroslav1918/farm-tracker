"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

import { formatMilliseconds } from "@/lib/formatTime"; 

type DailyReport = {
  [date: string]: {
    standardWork: number;
    extraWork: number;
    lunch: number;
  };
};


export default function ReportsPage() {
  const [data, setData] = useState<DailyReport>({});
  const [totalWork, setTotalWork] = useState(0);
  const [totalLunch, setTotalLunch] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        setError(userError.message);
        return;
      }
      const user = data?.user;
      setUser(user);
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const res = await axios.post("/api/reports/monthly", {
        userId : user.id,
        year,
        month,
      });

      const daily: DailyReport = res.data.daily;
      setData(daily);

      let totalWorkMs = 0;
      let totalLunchMs = 0;
      Object.values(daily).forEach((d) => {
        totalWorkMs += d.standardWork + d.extraWork;
        totalLunchMs += d.lunch;
      });

      setTotalWork(totalWorkMs);
      setTotalLunch(totalLunchMs);
    };

    fetchData();
  }, [supabase.auth]);

 
  
  return (
    <div className="max-w-3xl mx-auto p-4 mt-42">
      <h1 className="text-2xl font-bold mb-6 text-center">📋 Monthly Report</h1>

      <div className="bg-white shadow rounded-lg p-4 space-y-4">
        {Object.entries(data).length === 0 && (
          <p className="text-center text-gray-600 font-semibold text-lg">
            No reports found.
          </p>
        )}
        {Object.entries(data).map(([date, times]) => (
          <div
            key={date}
            className="border-b pb-2 last:border-none flex justify-between text-sm md:text-base"
          >
            <span className="font-medium mr-2">{date}</span>
            <div className="flex gap-4">
              <span className="text-green-700">
                First key : {formatMilliseconds(times.standardWork)}
              </span>
              <span className="text-red-700">
                Second key : {formatMilliseconds(times.extraWork)}
              </span>
              <span className="text-purple-700">
                Lunch: {formatMilliseconds(times.lunch)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center font-semibold text-lg">
        🧮 Total Work: {formatMilliseconds(totalWork)} | 🍱 Total Lunch:{" "}
        {formatMilliseconds(totalLunch)}
      </div>
      {/* Print Button */}
      <div className="flex justify-end mb-4 print:hidden mt-4">
        <button
          onClick={() => window.print()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          🖨️ Print Report
        </button>
      </div>
    </div>
  );
}
