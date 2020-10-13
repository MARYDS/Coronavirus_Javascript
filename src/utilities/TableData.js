import React from 'react'

export default function TableData({ data, cols, id } = this.props) {
  if (data === undefined) data = []

  return (
    <div className="table-wrapper-scroll-y custom-scrollbar">
      <div className="table-responsive">
        <table id={id} className="table table-striped table-bordered table-sm">
          <thead>
            <tr>
              <th>{cols[0]}</th>
              <th>{cols[1]}</th>
              <th>{cols[2]}</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((elem) => {
                return (
                  <tr key={(elem.location !== undefined) ? elem.location : elem.date}>
                    {(elem.date !== undefined)
                      ? <td>{(new Date(elem.date)).toLocaleDateString()}</td>
                      : null}
                    {(elem.location !== undefined)
                      ? <td>{elem.location}</td>
                      : null}
                    {(elem.day !== undefined)
                      ? <td>{elem.day}</td>
                      : null}
                    <td>{elem.count1.toLocaleString()}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}