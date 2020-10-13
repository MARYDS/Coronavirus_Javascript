import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid
} from 'recharts';

export default function Graph({ data, desc } = this.props) {

  if (data === undefined) data = []
  if (desc === undefined) desc = []

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

    return () => {
      window.removeEventListener('resize', handleResize)
    }

  })

  function CustomTooltip({ payload, label, active }) {
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
  const h = Math.floor(w * 0.8)

  return (
    <div className="line-chart-wrapper">
      <LineChart
        width={w} height={h} data={data}
        margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
      >
        <CartesianGrid stroke="#ccc" vertical={false} />
        <YAxis tick={{ fontSize: '0.8rem' }} />
        <XAxis interval={30} tickFormatter={formatXAxis}
          tick={{ fontSize: '0.8rem' }} dataKey="date" height={80} />
        <Tooltip content={<CustomTooltip />} />
        <Legend verticalAlign="bottom" height={5}
          wrapperStyle={{ paddingtop: "20px" }} />

        <Line name={(desc !== undefined) ? desc[0] : 'data'} type="monotone" dataKey="count1" stroke="#ff7300" dot={false} />

        {(data.length > 0 && data[0].count2 === undefined) ? null :
          <Line name={desc[1]} type="monotone" dataKey="count2" stroke="#003EFF" dot={false} />
        }
        {(data.length > 0 && data[0].count3 === undefined) ? null :
          <Line name={desc[2]} type="monotone" dataKey="count3" stroke="#008000" dot={false} />
        }
        {(data.length > 0 && data[0].count4 === undefined) ? null :
          <Line name={desc[3]} type="monotone" dataKey="count4" stroke="#00C5CD" dot={false} />
        }
        {(data.length > 0 && data[0].count5 === undefined) ? null :
          <Line name={desc[4]} type="monotone" dataKey="count5" stroke="#1A1A1A" dot={false} />
        }
        {(data.length > 0 && data[0].count6 === undefined) ? null :
          <Line name={desc[5]} type="monotone" dataKey="count6" stroke="#8B2500" dot={false} />
        }
        {(data.length > 0 && data[0].count7 === undefined) ? null :
          <Line name={desc[6]} type="monotone" dataKey="count7" stroke="#551A8B" dot={false} />
        }
        {(data.length > 0 && data[0].count8 === undefined) ? null :
          <Line name={desc[7]} type="monotone" dataKey="count8" stroke="#551011" dot={false} />
        }
        {(data.length > 0 && data[0].count9 === undefined) ? null :
          <Line name={desc[8]} type="monotone" dataKey="count9" stroke="#EEC900" dot={false} />
        }
        {(data.length > 0 && data[0].count10 === undefined) ? null :
          <Line name={desc[9]} type="monotone" dataKey="count10" stroke="#F08080" dot={false} />
        }

      </LineChart>
    </div>
  );
}


