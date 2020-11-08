import React, { useState, useEffect } from 'react';
import {
  ComposedChart, Area, XAxis, YAxis, Line,
  Tooltip, Legend, CartesianGrid
} from 'recharts';
import CustomTooltip from './CustomTooltip'
import CustomizedAxisTick from './CustomizedAxisTick'
import { getChartSize } from './Utils';

export default function Chart({ data, desc, linesDesc, xaxis } = this.props) {

  if (data === undefined) data = []
  if (desc === undefined) desc = []
  if (linesDesc === undefined) linesDesc = []
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
  const strokeColours =
    ["#7e8a97", "#28abb9", "#ffe05d", "#b8de6f", "#01cfc4",
      "#ff9a76", "#ffeadb", "#637373", "#ffcbcb", "#e97171"]
  const fillColours =
    ["#a9b1ba", "#28abb9", "#ffe05d", "#b8de6f", "#01cfc4",
      "#ff9a76", "#ffeadb", "#637373", "#ffcbcb", "#e97171"]
  const lineStrokeColours =
    ["#ff7300", "#003EFF", "#63c47c", "#61D8F5", "#1A1A1A",
      "#8B2500", "#551A8B", "#ff0000", "#debe3a", "#F08080"]

  return (
    <div className="area-chart-wrapper">
      {(data.length === 0)
        ?
        <div className="text-info font-weight-bold mt-5 ml-3">
          Retrieving data if available...
        </div>
        :
        <ComposedChart width={w} height={h} data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 10 }}>

          <CartesianGrid stroke="#ccc" vertical={false} />
          <YAxis width={40} tick={{ fontSize: '0.7rem' }} tickFormatter={tick => {
            return tick.toLocaleString();
          }} />
          {(xaxis === "date") ?
            <XAxis interval={30} tickFormatter={formatXAxis}
              tick={{ fontSize: '0.7rem' }} dataKey="date" height={30} />
            :
            <XAxis interval={1}
              tick={<CustomizedAxisTick xaxis={xaxis} />} dataKey={xaxis} height={50} />
          }

          <Tooltip content={<CustomTooltip xaxis={xaxis} />} />
          <Legend wrapperStyle={{ bottom: -10, left: 20 }} />

          {(data.length > 0) ?
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              if (data[0].counts[i] === undefined) {
                return null
              } else {
                return (
                  <Area key={"a" + i} type="monotone" name={(desc !== undefined) ? desc[i] : 'data'} dataKey={"counts[" + i + "]"}
                    stroke={strokeColours[i]} stackId="1" fillOpacity={0.8} fill={fillColours[i]} />
                )
              }
            })
            : null
          }
          {(data.length > 0 && data[0].lines && data[0].lines.length > 0) ?
            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              if (data[0].lines.length < i + 1 || data[0].lines[i] === undefined) {
                return null
              } else {
                return (
                  <Line key={"l" + i} type="monotone" name={(linesDesc[i] !== undefined) ? linesDesc[i] : 'data'} dataKey={"lines[" + i + "]"} stroke={lineStrokeColours[i]} dot={false} hide={false} />
                )
              }
            })
            : null
          }
        </ComposedChart>
      }
    </div>
  );
}


