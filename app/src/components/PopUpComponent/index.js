import React, { useState } from "react";
import api from "../../services/Api";
import { XCircle } from "react-feather";
import "./style.scss";
import { useReleases } from "../../shared/context/Releases";
import { useCurrentPeriod } from "../../shared/context/CurrentPeriod";

const PopUpComponent = ({ setIsActive, fields }) => {
  const { setReleases } = useReleases();
  const { currentPeriod } = useCurrentPeriod();
  const [description, setDescription] = useState(fields && fields.description);
  const [value, setValue] = useState(fields && fields.value);
  const [category, setCategory] = useState(fields && fields.category);
  const [date, setDate] = useState(fields ? fields.yearMonthDay : formatCurrentDateToDate(currentPeriod));
  const [type, setType] = useState(fields ? fields.type : "-");

  function formatCurrentDateToDate(str) {
    const parsedArr = str.split('-');
    parsedArr.push('01');
    const parsed = parsedArr.join('-');
    return parsed;
  }

  async function handleButtonClick(event) {
    event.preventDefault();
    
    const dateArray = date.split("-");  
    const year = Number(dateArray[0]);
    const month = Number(dateArray[1]);
    const day = Number(dateArray[2]);

    const body = { description, value, category, year, month, day, type };
    if (fields) {
      const update_release = await api.put(`/api/releases/${fields._id}`, body);
      const releases = await api.get(`/api/releases?period=${currentPeriod}`);

      if (update_release) {
        setReleases(releases.data);
        setIsActive(false);
      }
    } else {
      const new_release = await api.post(`/api/releases`, body);
      const releases = await api.get(`/api/releases?period=${currentPeriod}`);
      if (new_release) {
        setReleases(releases.data);
        setIsActive(false);
      }
    }
  }

  return (
    <div id="add_popup_container">
      <div className="content">
        <div className="header">
          <h2>{fields ? "Atualizar lançamento" : "Novo lançamento"}</h2>
          <XCircle size="30px" onClick={() => setIsActive(false)} />
        </div>
        <form className="body">
          {!fields && (
            <div className="input-field-radio-container">
              <div className="radio-content">
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="+"
                    onChange={(event) => setType(event.target.value)}
                  />{" "}
                  Receita
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    value="-"
                    defaultChecked
                    onChange={(event) => setType(event.target.value)}
                  />{" "}
                  Gasto
                </label>
              </div>
            </div>
          )}
          <div className="input-field-container">
            <p>Descrição:</p>
            <input
              type="text"
              name="description"
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="input-field-container">
            <p>Valor:</p>
            <input
              type="text"
              name="value"
              id="value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="input-field-container">
            <p>Categoria:</p>
            <input
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="input-field-container">
            <p>Data:</p>
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="input-field-container">
            <button onClick={handleButtonClick}>Confirmar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUpComponent;
