import React from "react";
import "./style.scss";

import {
  DollarSign,
  ArrowUpCircle,
  ArrowDownCircle,
  Award,
} from "react-feather";

function OverviewComponent({ overview }) {
  return (
    <div className="overview-container">
      <div className="card">
        <div className="card-header">
          <h2>Lançamentos</h2>
          <Award color="#ffa200" />
        </div>
        <h3 style={{ color: "#ffa200" }}>{overview.length}</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Receitas</h2>
          <ArrowUpCircle color="green" />
        </div>
        <h3 style={{ color: "green" }}>{overview.income}</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Despesas</h2>
          <ArrowDownCircle color="red" />
        </div>
        <h3 style={{ color: "red" }}>{overview.outcome}</h3>
      </div>
      <div className="card">
        <div className="card-header">
          <h2>Total</h2>
          <DollarSign color="green" />
        </div>
        <h3 style={{ color: "green" }}>{overview.total}</h3>
      </div>
    </div>
  );
}

export default OverviewComponent;
