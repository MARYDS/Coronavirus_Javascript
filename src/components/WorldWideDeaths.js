import React from 'react'
import Barchart from '../utilities/Barchart'
import TableData from '../utilities/TableData'

export default function WorldWideDeaths(
  { latestDate, deathsTot, deaths } = this.props) {

  if (deaths === undefined || deaths === null) deaths = []
  if (deathsTot === undefined || deathsTot === null) deathsTot = 0

  // Sort in descending order by number of deaths
  let deathsSorted = [...deaths].sort((a, b) => {
    if (b.counts[0] > a.counts[0]) return 1
    if (b.counts[0] < a.counts[0]) return -1
    return 0
  })

  let deathsTop = []
  if (deathsSorted.length > 20) {
    deathsTop = [...deathsSorted].splice(0, 20)
  } else {
    deathsTop = deathsSorted
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold heading">World Wide Deaths</h5>
          <ul className="nav nav-tabs" id="worldwidedeaths-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="worldwidedeaths-tab" data-toggle="tab" href="#worldwidedeaths" role="tab" aria-controls="worldwidedeaths" aria-selected="true">Deaths</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="world-deaths-tab" data-toggle="tab" href="#worlddeaths" role="tab" aria-controls="worlddeaths" aria-selected="false">#</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="worldwidedeaths-content">

            {/* First Tab - Deaths by country */}
            <div className="tab-pane fade show active" id="worldwidedeaths" role="tabpanel" aria-labelledby="worldwidedeaths-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white rounded">
                    <span className="text-left">
                      <h6 className="font-weight-bold">{latestDate}</h6>
                    </span>
                    <span className="text-right">
                      <h6 className="font-weight-bold">{deathsTot.toLocaleString()}</h6>
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart with results */}
              <div>
                <h6 className="text-center">Deaths by Country</h6>
                <Barchart data={deathsTop} desc={['Deaths']} xaxis='country' />
              </div>
            </div>

            {/* Second Tab - Deaths Table */}
            <div className="tab-pane fade" id="worlddeaths" role="tabpanel" aria-labelledby="world-deaths-tab">
              <h6 className="text-center">Deaths by Country</h6>
              <div>
                <TableData data={deathsSorted} cols={['Country', 'Deaths']} id="worlddeathstable" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

