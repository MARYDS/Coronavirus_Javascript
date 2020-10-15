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
    ["#949ea9", "#28abb9", "#ffe05d", "#b8de6f", "#01cfc4",
      "#ff9a76", "#ffeadb", "#637373", "#ffcbcb", "#e97171"]

  return (
    <div className="line-chart-wrapper">
      {(data.length === 0)
        ?
        <div className="text-info font-weight-bold mt-5 ml-3">No Data Available for this level</div>
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

          {(data[0].count1 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[0] : 'data'} dataKey="count1"
              stroke={strokeColours[0]} stackId="1" fillOpacity={1} fill={fillColours[0]} />
          }
          {(data[0].count2 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[1] : 'data'} dataKey="count2"
              stroke={strokeColours[1]} stackId="1" fillOpacity={1} fill={fillColours[1]} />
          }
          {(data[0].count3 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[2] : 'data'} dataKey="count3"
              stroke={strokeColours[2]} stackId="1" fillOpacity={1} fill={fillColours[2]} />
          }
          {(data[0].count4 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[3] : 'data'} dataKey="count4"
              stroke={strokeColours[3]} stackId="1" fillOpacity={1} fill={fillColours[3]} />
          }
          {(data[0].count5 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[4] : 'data'} dataKey="count5"
              stroke={strokeColours[4]} stackId="1" fillOpacity={1} fill={fillColours[4]} />
          }
          {(data[0].count6 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[5] : 'data'} dataKey="count6"
              stroke={strokeColours[5]} stackId="1" fillOpacity={1} fill={fillColours[5]} />
          }
          {(data[0].count7 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[6] : 'data'} dataKey="count7"
              stroke={strokeColours[6]} stackId="1" fillOpacity={1} fill={fillColours[6]} />
          }
          {(data[0].count8 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[7] : 'data'} dataKey="count8"
              stroke={strokeColours[7]} stackId="1" fillOpacity={1} fill={fillColours[7]} />
          }
          {(data[0].count9 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[8] : 'data'} dataKey="count9"
              stroke={strokeColours[8]} stackId="1" fillOpacity={1} fill={fillColours[8]} />
          }
          {(data[0].count10 === undefined) ? null :
            <Area type="monotone" name={(desc !== undefined) ? desc[9] : 'data'} dataKey="count10"
              stroke={strokeColours[9]} stackId="1" fillOpacity={1} fill={fillColours[9]} />
          }
        </AreaChart>
      }
    </div>
  );
}


