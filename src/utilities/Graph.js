import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from 'recharts';

export default class Graph extends Component {

  render() {

    const data = this.props.data.map((day) => {
      const date = (new Date(day.date))
      return (
        {
          date: date.toLocaleDateString(),
          count: day.count
        }
      )
    })

    function CustomTooltip({ payload, label, active }) {
      if (active) {
        return (
          <div className="custom-tooltip">
            <span className="label">{payload[0].payload.date} :</span>
            <span className="data">{payload[0].value}</span>
          </div>
        );
      }
      return null;
    }

    return (
      <div className="line-chart-wrapper">
        <LineChart
          width={300} height={200} data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid stroke="#ccc" vertical={false} />
          <YAxis />
          <Tooltip content={<CustomTooltip />}
            labelStyle={{ fontWeight: 'bold', color: '#666666' }}
          />
          <Line type="monotone" dataKey="count" stroke="#ff7300" dot={false} />
        </LineChart>
      </div>
    );
  }
}


