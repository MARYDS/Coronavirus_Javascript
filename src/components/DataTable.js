import React from 'react'

export default function DataTable({ data } = this.props) {
  return (
    <div className="table-wrapper-scroll-y custom-scrollbar">
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th>Date</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {data.map((date) => {
              return (
                <tr key={date.date}>
                  <td>{(new Date(date.date)).toLocaleDateString()}</td>
                  <td>{date.count.toLocaleString()}</td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}