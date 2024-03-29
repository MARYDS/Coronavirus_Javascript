import React, { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts'
import CustomTooltip from './CustomTooltip'
import { getChartSize } from './Utils'

export default function Graph({ data, desc } = this.props) {
  if (data === undefined) data = []
  if (desc === undefined) desc = []

  const [sizes, setSizes] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEffect(() => {
    function handleResize() {
      setSizes({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  const formatXAxis = (tickItem) => {
    const d = new Date(tickItem)
    const qtr = ['Jan', 'Mar', 'May', 'Jul', 'Sept', 'Nov']
    let mth = d.toLocaleString('default', { month: 'short' })
    if (qtr.includes(mth)) {
      return mth
    } else {
      return ''
    }
  }

  const { w, h } = getChartSize(sizes)
  const strokeColours = [
    '#ff7300',
    '#003EFF',
    '#008000',
    '#00C5CD',
    '#1A1A1A',
    '#8B2500',
    '#551A8B',
    '#ff0000',
    '#EEC900',
    '#b8de6f',
    '#F08080',
    '#7e8a97',
  ]

  return (
    <div className='line-chart-wrapper'>
      {data.length === 0 ? (
        <div className='text-info font-weight-bold mt-5 ml-3'>
          Waiting for data...
        </div>
      ) : (
        <div className='line-chart-wrapper'>
          {data.length === 0 ? (
            <div className='text-info font-weight-bold mt-5 ml-3'>
              Waiting for data
            </div>
          ) : (
            <LineChart
              width={w}
              height={h}
              data={data}
              margin={{ top: 30, right: 10, bottom: 10, left: 10 }}
            >
              <CartesianGrid stroke='#ccc' vertical={false} />
              <YAxis width={40} tick={{ fontSize: '0.7rem' }} />
              <XAxis
                interval={30}
                tickFormatter={formatXAxis}
                tick={{ fontSize: '0.7rem' }}
                dataKey='date'
                height={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign='bottom'
                height={25}
                wrapperStyle={{ paddingtop: '20px' }}
              />

              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
                if (data[0].counts[i] === undefined) {
                  return null
                } else {
                  return (
                    <Line
                      key={'l' + i}
                      name={desc[i] !== undefined ? desc[i] : 'data'}
                      type='monotone'
                      dataKey={'counts[' + i + ']'}
                      stroke={strokeColours[i]}
                      dot={false}
                    />
                  )
                }
              })}
            </LineChart>
          )}
        </div>
      )}
    </div>
  )
}
