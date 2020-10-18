import React from 'react';

export default function CustomTooltip({ payload, label, active, xaxis }) {
  if (active && payload != null && payload[0] !== undefined) {
    if (xaxis === undefined) {
      xaxis = "date"
    }

    return (
      <div className="custom-tooltip">
        <div className="label">
          {(xaxis === "date") ?
            (new Date(payload[0].payload.date)).toLocaleDateString()
            : label
          }
        </div>
        {payload.map((load) => {
          return (
            <div key={load.name}>
              <span className="label">{load.name} </span>
              <span className="data">{load.value.toLocaleString()}</span>
            </div>
          )
        })
        }
      </div>
    );
  }
  return null;
}