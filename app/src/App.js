import React, { useState, useEffect } from "react";
import { format, addYears, subYears, addMonths, isBefore } from "date-fns";
import "./global.scss";

import HeaderComponent from "./components/HeaderComponent";
import OverviewComponent from "./components/OverviewComponent";
import ReleasesListComponent from "./components/ReleasesListComponent";

import api from "./services/Api";

function App() {
  const [releases, setReleases] = useState({});
  const [overview, setOverview] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState();

  useEffect(() => {
    async function getReleases() {
      const currentDate = new Date();
      const formattedCurrentDate = format(currentDate, "yyyy-MM");

      const fetchReleases = await api.get(
        `/api/releases?period=${formattedCurrentDate}`
      );

      const { length, income, outcome, total } = fetchReleases.data;
      setOverview({ length, income, outcome, total });
      setReleases(fetchReleases.data.transactions);
    }
    getReleases();
  }, []);

  useEffect(() => {
    async function fetchReleasesChangingPeriod() {
      const fetchReleases = await api.get(
        `/api/releases?period=${currentPeriod}`
      );
      const { length, income, outcome, total } = fetchReleases.data;
      setOverview({ length, income, outcome, total });
      setReleases(fetchReleases.data.transactions);
    }

    fetchReleasesChangingPeriod();
  }, [currentPeriod]);

  return (
    <div className="container">
      <HeaderComponent onChange={setCurrentPeriod} />
      <OverviewComponent overview={overview} />
      <ReleasesListComponent releases={releases} />
    </div>
  );
}

export default App;
