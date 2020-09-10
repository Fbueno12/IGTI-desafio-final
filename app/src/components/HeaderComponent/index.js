import React, { useState } from "react";
import Select from "react-select";
import { PlusCircle } from "react-feather";

import { getRangeOfPeriods, getPeriods } from "./helpers";

import "./style.scss";
import api from "../../services/Api";
import { useReleases } from "../../shared/context/Releases";
import PopUpComponent from "../PopUpComponent";
import { useCurrentPeriod } from "../../shared/context/CurrentPeriod";
import { format } from "date-fns";

function HeaderComponent() {
  const { setReleases } = useReleases();
  const { currentPeriod, setCurrentPeriod } = useCurrentPeriod();
  const [isActive, setIsActive] = useState(false);
  const [rangeOfPeriods] = useState(getRangeOfPeriods());

  async function handleChange(event) {
    const fetchReleases = await api.get(`/api/releases?period=${event.value}`);

    setCurrentPeriod(event.value);
    setReleases(fetchReleases.data);
  }

  function handleAddClick() {
    setIsActive(!isActive);
  }

  return (
    <div className="header-container">
      <div className="header-content">
        <div>
          <h1>IGTI - Desafio Final</h1>
          <div className="newRelease" onClick={handleAddClick}>
            <PlusCircle size="30px" className="addButton" />
            <p>novo lançamento</p>
          </div>
        </div>
        {currentPeriod !== undefined && (
          <div style={{ width: "200px" }}>
            <Select
              options={getPeriods(rangeOfPeriods)}
              defaultValue={{
                label: format(new Date(), "MMM yyyy"),
                value: currentPeriod,
              }}
              onChange={handleChange}
              inputProps={{ id: "date-select" }}
            />
          </div>
        )}
        {isActive && <PopUpComponent setIsActive={setIsActive} />}
      </div>
    </div>
  );
}

export default HeaderComponent;
