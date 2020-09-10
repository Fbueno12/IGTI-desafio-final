import React, { useState, createContext, useContext } from "react";
import { format } from "date-fns";

const CurrentPeriodContext = createContext();

export default function CurrentPeriodProvider({ children }) {
  const [currentPeriod, setCurrentPeriod] = useState(
    format(new Date(), "yyyy-MM")
  );

  return (
    <CurrentPeriodContext.Provider value={{ currentPeriod, setCurrentPeriod }}>
      {children}
    </CurrentPeriodContext.Provider>
  );
}

export function useCurrentPeriod() {
  const context = useContext(CurrentPeriodContext);
  const { currentPeriod, setCurrentPeriod } = context;
  return { currentPeriod, setCurrentPeriod };
}
