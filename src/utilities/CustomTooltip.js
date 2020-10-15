import React from 'react';

export default function CustomTooltip({ payload, label, active }) {
  if (active && payload != null && payload[0] !== undefined) {
    return (
      <div className="custom-tooltip">
        <div className="label">{(new Date(payload[0].payload.date)).toLocaleDateString()} </div>
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