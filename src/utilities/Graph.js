import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, CartesianGrid,
} from 'recharts';

export default class Graph extends Component {

  render() {

    function CustomTooltip({ payload, label, active }) {
      if (active) {
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

    return (
      <div className="line-chart-wrapper">
        <LineChart
          width={300} height={200} data={this.props.data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
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
}


