import React from "react";
import "./global.scss";

import HeaderComponent from "./components/HeaderComponent";
import OverviewComponent from "./components/OverviewComponent";
import ReleasesListComponent from "./components/ReleasesListComponent";

import ReleaseProvider from "./shared/context/Releases";
import CurrentPeriodProvider from "./shared/context/CurrentPeriod";

function App() {
  return (
    <CurrentPeriodProvider>
      <ReleaseProvider>
        <HeaderComponent />
        <OverviewComponent />
        <ReleasesListComponent />
      </ReleaseProvider>
    </CurrentPeriodProvider>
  );
}

export default App;
