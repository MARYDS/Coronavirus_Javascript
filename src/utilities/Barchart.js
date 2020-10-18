import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, CartesianGrid
} from 'recharts';
import CustomTooltip from './CustomTooltip'
import CustomizedAxisTick from './CustomizedAxisTick'
import { getChartSize } from './Utils';

export default function Barchart({ data, desc, xaxis } = this.props) {

  if (data === undefined) data = []
  if (desc === undefined) desc = []
  if (xaxis === undefined) {
    xaxis = "date"
  }

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

  const fillColours =
    ["#a9b1ba", "#28abb9", "#ffe05d", "#b8de6f", "#01cfc4",
      "#ff9a76", "#ffeadb", "#637373", "#ffcbcb", "#e97171"]

  return (

    <div className="line-chart-wrapper pb5">
      {(data.length === 0)
        ?
        <div className="text-info font-weight-bold mt-5 ml-3">
          No Data Available for this level
        </div>
        :
        <BarChart width={w} height={h} data={data}
          margin={{ top: 30, right: 10, left: 10, bottom: 10 }}>
          <YAxis width={40} tick={{ fontSize: '0.8rem' }} />
          {(xaxis === "date") ?
            <XAxis interval={30} tickFormatter={formatXAxis}
              tick={{ fontSize: '0.8rem' }} dataKey="date" height={60} />
            :
            <XAxis interval={1}
              tick={<CustomizedAxisTick xaxis={xaxis} />} dataKey={xaxis} height={60} />
          }
          <CartesianGrid stroke="#ccc" vertical={false} />
          <Tooltip content={<CustomTooltip xaxis={xaxis} />} />
          <Legend verticalAlign="bottom" height={5}
            wrapperStyle={{ paddingtop: "5px" }} />

          {(data.length > 0) ?
            [0, 1].map((i) => {
              if (data[0].counts[i] === undefined) {
                return null
              } else {
                return (
                  <Bar key={"b" + i} type="monotone" name={(desc !== undefined) ? desc[i] : 'data'} dataKey={"counts[" + i + "]"}
                    fill={fillColours[i]} fillOpacity={0.8} />
                )
              }
            })
            : null
          }

        </BarChart>
      }
    </div >
  );
}


