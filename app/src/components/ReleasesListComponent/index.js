import React from "react";
import {Trash, Edit} from 'react-feather';

import "./style.scss";

function ReleasesListComponent({ releases }) {
  function handleDeleteClick(id) {
    // if (window.confirm(`deseja realmente apagar este lançamento?\n ${id}`)) {
    //   const deleted = await api.delete(`/api/releases/${id}`);

    //   if (deleted.data.length >= 0) {
    //     const period = document.querySelector("#date-select").value;
    //     console.log(period);
    //     const reloadStates = await api.get(`/api/releases?period=${period}`);
    //     const { length, income, outcome, total } = reloadStates.data;

    //     setOverview({ length, income, outcome, total });
    //     setReleases(reloadStates.data.transactions);
    //   }
    // }
  }

  function handleUpdateClick() {
    console.log("update click");
  }

  return (
    <div className="list-container">
      <div className="col-4 list-headers">
        <span>Titulo</span>
        <span>Categoria</span>
        <span>Valor</span>
        <span>Ações</span>
      </div>
      <div className="list-body">
        {releases.length > 0 &&
          releases.map((release) => {
            return (
              <div className="col-4 list-item" key={release._id}>
                <span>{release.description}</span>
                <span>{release.category}</span>
                <span className={release.type === "+" ? "income" : "outcome"}>
                  {release.formattedValue}
                </span>
                <span className="actions">
                  <Trash size="15px" onClick={() => handleDeleteClick(release._id)}/>
                  <Edit size="15px" onClick={() => handleUpdateClick(release._id)} />
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default ReleasesListComponent;
