import React from "react";
import "./style.scss";

import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Award,
} from "react-feather";
import { useReleases } from "../../shared/context/Releases";

function OverviewComponent() {
  const { releases } = useReleases();
  if (!releases) {
    return <div />;
  }

  return (
    <div className="overview-container">
      <div className="card">
        <div className="card-header">
          <h2>Lançamentos</h2>
          <Award color="#ffa200" />
        </div>
        <h3 style={{ color: "#ffa200" }}>{releases.transactions.length}</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Receitas</h2>
          <ArrowUpCircle color="green" />
        </div>
        <h3 style={{ color: "green" }}>{releases.income}</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Despesas</h2>
          <ArrowDownCircle color="red" />
        </div>
        <h3 style={{ color: "red" }}>{releases.outcome}</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Total</h2>
          <DollarSign color="green" />
        </div>
        <h3 style={{ color: "green" }}>{releases.total}</h3>
      </div>
    </div>
  );
}

export default OverviewComponent;
