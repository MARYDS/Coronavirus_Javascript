import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from 'recharts';

export default function Graph({ data } = this.props) {

  const [sizes, setSizes] = useState(
    {
      height: window.innerHeight,
      width: window.innerWidth
    })

  useEffect(() => {
    function handleResize() {
      setSizes({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }
    window.addEventListener('resize', handleResize)

    return _ => {
      window.removeEventListener('resize', handleResize)
    }

  })

  function CustomTooltip({ payload, label, active }) {
    if (active && payload != null) {
      return (
        <div className="custom-tooltip">
          <span className="label">{(new Date(payload[0].payload.date)).toLocaleDateString()} </span>
          <span className="data">{(payload[0].value).toLocaleString()}</span>
        </div>
      );
    }
    return null;
  }
  const formatXAxis = (tickItem) => {
    const d = new Date(tickItem);
    return d.toLocaleString('default', { month: 'short' });
  };

  let w = 0
  if (sizes.width >= 770) {
    w = Math.floor(400 * sizes.width / 1440)
  } else if (sizes.width >= 540) {
    w = Math.floor(400 * sizes.width / 1440) * (3 / 2)
  } else {
    w = Math.floor(400 * sizes.width / 1440) * 3
  }
  const h = Math.floor(w / 2)

  return (
    <div className="line-chart-wrapper">
      <LineChart
        width={w} height={h} data={data}
        margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid stroke="#ccc" vertical={false} />
        <YAxis tick={{ fontSize: '0.8rem' }} />
        <XAxis interval={30} tickFormatter={formatXAxis}
          tick={{ fontSize: '0.8rem' }} dataKey="date" />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="count" stroke="#ff7300" dot={false} />
      </LineChart>
    </div>
  );
}


