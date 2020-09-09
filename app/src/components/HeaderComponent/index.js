import React, { useState } from "react";
import Select from "react-select";
import { PlusCircle, XCircle } from "react-feather";

import { getCurrentPeriod, getRangeOfPeriods, getPeriods } from "./helpers";

import "./style.scss";
import api from "../../services/Api";

function HeaderComponent({ onChange }) {
  const [currentPeriod] = useState(getCurrentPeriod());
  const [rangeOfPeriods] = useState(getRangeOfPeriods());

  function handleChange(event) {
    onChange(event.value);
  }

  function handleAddClick() {
    const popup = document.querySelector("#add_popup_container");

    popup.style.display = "flex";
  }

  function handleCloseClick() {
    const popup = document.querySelector("#add_popup_container");

    popup.style.display = "none";
  }

  return (
    <div className="header-container">
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
            defaultValue={{ label: String(currentPeriod), value: 2 }}
            onChange={handleChange}
            inputProps={{ id: "date-select" }}
          />
        </div>
      )}
      <div id="add_popup_container">
        <div className="content">
          <div className="header">
            <h2>Novo lançamento</h2>
            <XCircle size="30px" onClick={handleCloseClick} />
          </div>
          <div className="body">
            <div className="input-field-container">
              <p>Descrição:</p>
              <input type="text" name="description" id="description" />
            </div>
            <div className="input-field-container">
              <p>Valor:</p>
              <input type="text" name="value" id="value" />
            </div>
            <div className="input-field-container">
              <p>Categoria:</p>
              <input type="text" name="category" id="category" />
            </div>
            <div className="input-field-container">
              <p>Data:</p>
              <input type="date" name="date" id="date" />
            </div>
            <div className="input-field-radio-container">
              <p>Tipo:</p>
              <div className="radio-content">
                <label>
                  <input type="radio" name="type" value="+" checked /> Receita
                </label>
                <label>
                  <input type="radio" name="type" value="-" /> Gasto
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
