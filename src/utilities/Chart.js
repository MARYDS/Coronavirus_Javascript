import React, { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid
} from 'recharts';
import CustomTooltip from './CustomTooltip'
import { getChartSize } from './Utils';

export default function Chart({ data, desc } = this.props) {
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

  const formatXAxis = (tickItem) => {
    const d = new Date(tickItem);
    return d.toLocaleString('default', { month: 'short' });
  };

  const { w, h } = getChartSize(sizes)
  const strokeColours =
    ["#7e8a97", "#28abb9", "#ffe05d", "#b8de6f", "#01cfc4",
      "#ff9a76", "#ffeadb", "#637373", "#ffcbcb", "#e97171"]
  const fillColours =
    ["#a9b1ba", "#28abb9", "#ffe05d", "#b8de6f", "#01cfc4",
      "#ff9a76", "#ffeadb", "#637373", "#ffcbcb", "#e97171"]

  return (
    <div className="line-chart-wrapper">
      {(data.length === 0)
        ?
        <div className="text-info font-weight-bold mt-5 ml-3">
          No Data Available for this level
        </div>
        :
        <AreaChart width={w} height={h} data={data}
          margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>

          <YAxis tick={{ fontSize: '0.8rem' }} />
          <XAxis interval={30} tickFormatter={formatXAxis}
            tick={{ fontSize: '0.8rem' }} dataKey="date" height={80} />
          <CartesianGrid stroke="#ccc" vertical={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={5}
            wrapperStyle={{ paddingtop: "20px" }} />

          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
            if (data[0].counts[i] === undefined) {
              return null
            } else {
              return (
                <Area key={i} type="monotone" name={(desc !== undefined) ? desc[i] : 'data'} dataKey={"counts[" + i + "]"}
                  stroke={strokeColours[i]} stackId="1" fillOpacity={1} fill={fillColours[i]} />
              )
            }
          })}
        </AreaChart>
      }
    </div>
  );
}


