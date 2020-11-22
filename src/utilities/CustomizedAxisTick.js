import React from 'react';

export default function CustomizedAxisTick({ x, y, stroke, payload } = this.props) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={5} textAnchor="end" fill="#666" fontSize="0.5rem" transform="rotate(-50)">{payload.value}</text>
    </g>
  );
}