import React, { useState, useEffect, createContext, useContext } from "react";
import api from "../../services/Api";
import { format } from "date-fns";

const ReleaseContext = createContext();

export default function ReleaseProvider({ children }) {
  const [releases, setReleases] = useState();

  useEffect(() => {
    async function getReleases() {
      const currentDate = new Date();
      const formattedCurrentDate = format(currentDate, "yyyy-MM");

      const fetchReleases = await api.get(
        `/api/releases?period=${formattedCurrentDate}`
      );

      setReleases(fetchReleases.data);
    }
    getReleases();
  }, []);

  return (
    <ReleaseContext.Provider value={{ releases, setReleases }}>
      <div className="container">{children}</div>
    </ReleaseContext.Provider>
  );
}

export function useReleases() {
  const context = useContext(ReleaseContext);
  const { releases, setReleases } = context;
  return { releases, setReleases };
}
