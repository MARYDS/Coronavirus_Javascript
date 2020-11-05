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
              {(cols.length > 2)
                ? <th>{cols[2]}</th>
                : null}
              {(cols.length > 3)
                ? <th>{cols[3]}</th>
                : null}
            </tr>
          </thead>
          <tbody>
            {
              data.map((elem) => {
                return (
                  <tr key={(elem.location !== undefined) ? elem.location : (elem.country !== undefined) ? elem.country : elem.date}>
                    {(elem.date !== undefined)
                      ? <td>{(new Date(elem.date)).toLocaleDateString()}</td>
                      : null}
                    {(elem.location !== undefined)
                      ? <td>{elem.location}</td>
                      : null}
                    {(elem.country !== undefined)
                      ? <td>{elem.country}</td>
                      : null}
                    {(elem.day !== undefined)
                      ? <td>{elem.day}</td>
                      : null}
                    {(elem.counts[0] !== undefined && elem.counts[0] != null)
                      ? <td>{elem.counts[0].toLocaleString()}</td>
                      : null}
                    {(elem.rate !== undefined)
                      ? <td>{elem.rate}</td>
                      : null}
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