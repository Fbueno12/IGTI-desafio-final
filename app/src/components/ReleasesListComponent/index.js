import React, { useState, useEffect } from "react";
import { Trash, Edit } from "react-feather";

import "./style.scss";
import { useReleases } from "../../shared/context/Releases";
import api from "../../services/Api";
import PopUpComponent from "../PopUpComponent";
import { useCurrentPeriod } from "../../shared/context/CurrentPeriod";

function ReleasesListComponent() {
  const { currentPeriod } = useCurrentPeriod();
  const { releases, setReleases } = useReleases();
  const [isActive, setIsActive] = useState(false);
  const [fields, setFields] = useState({});
  const [searchedReleases, setSearchedReleases] = useState();
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if(releases && releases.transactions) {
      setSearchedReleases(releases.transactions);
    }
  }, [releases]);

  useEffect(() => {
    if (searchInput.length >= 3) {
      const fetched = releases.transactions.filter(
        (release) => release.description.toLowerCase().search(searchInput.toLowerCase()) >= 0
      );
      setSearchedReleases(fetched);
    } else {
      if(releases && releases.transactions) {
        setSearchedReleases(releases.transactions);
      }
    }
  }, [releases, searchInput]);

  async function handleDeleteClick(id) {
    if (window.confirm(`deseja realmente apagar este lançamento?\n ${id}`)) {
      await api.delete(`/api/releases/${id}`);
      const releases = await api.get(`/api/releases?period=${currentPeriod}`);

      setReleases(releases.data);
    }
  }

  async function handleUpdateClick(id) {
    const fetchRelease = await api.get(`/api/releases/fetch/${id}`);
    setFields(fetchRelease.data);
    setIsActive(!!!isActive);
  }

  async function handleChangeSearch(event) {
    setSearchInput(event.target.value);
   
  }

  if (!searchedReleases) {
    return <div />;
  }
  return (
    <div className="list-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Digite o nome do lançamento para filtrar..."
          onChange={(event) => handleChangeSearch(event)}
          autoComplete="off"
        />
      </div>
      <div className="col-4 list-headers">
        <span>Titulo</span>
        <span>Categoria</span>
        <span>Valor</span>
        <span>Ações</span>
      </div>
      <div className="list-body">
        {(searchedReleases && searchedReleases.length > 0) && searchedReleases.map((release) => {
          return (
            <div className="col-4 list-item" key={release._id}>
              <span>{release.description}</span>
              <span>{release.category}</span>
              <span className={release.type === "+" ? "income" : "outcome"}>
                {release.formattedValue}
              </span>
              <span className="actions">
                <Trash
                  size="15px"
                  onClick={() => handleDeleteClick(release._id)}
                />
                <Edit
                  size="15px"
                  onClick={() => handleUpdateClick(release._id)}
                />
              </span>
            </div>
          );
        })}
      </div>
      {isActive && <PopUpComponent setIsActive={setIsActive} fields={fields} />}
    </div>
  );
}

export default ReleasesListComponent;
