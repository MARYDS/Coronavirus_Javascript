import React from 'react'
import Barchart from '../utilities/Barchart'
import TableData from '../utilities/TableData'

export default function WorldWideCases(
  { latestDate, casesTot, cases } = this.props) {

  if (cases === undefined || cases === null) cases = []
  if (casesTot === undefined || casesTot === null) casesTot = 0

  // Sort in descending order by number of cases
  let casesSorted = [...cases].sort((a, b) => {
    if (b.counts[0] > a.counts[0]) return 1
    if (b.counts[0] < a.counts[0]) return -1
    return 0
  })

  let casesTop = []
  if (casesSorted.length > 20) {
    casesTop = [...casesSorted].splice(0, 20)
  } else {
    casesTop = casesSorted
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">World Wide Cases</h5>
          <ul className="nav nav-tabs" id="worldwidecases-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="worldwidecases-tab" data-toggle="tab" href="#worldwidecases" role="tab" aria-controls="worldwidecases" aria-selected="true">Cases</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="world-cases-tab" data-toggle="tab" href="#worldcases" role="tab" aria-controls="worldcases" aria-selected="false">#</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="worldwidecases-content">

            {/* First Tab - Cases by country */}
            <div className="tab-pane fade show active" id="worldwidecases" role="tabpanel" aria-labelledby="worldwidecases-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white rounded">
                    <span className="text-left">
                      <h6 className="font-weight-bold">{latestDate}</h6>
                    </span>
                    <span className="text-right">
                      <h6 className="font-weight-bold">{casesTot.toLocaleString()}</h6>
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart with results */}
              <div>
                <h6 className="text-center">Cases by Country</h6>
                <Barchart data={casesTop} desc={['Cases']} xaxis='country' />
              </div>
            </div>

            {/* Second Tab - Cases Table */}
            <div className="tab-pane fade" id="worldcases" role="tabpanel" aria-labelledby="world-cases-tab">
              <h6 className="text-center">Cases by Country</h6>
              <div>
                <TableData data={casesSorted} cols={['Country', 'Cases']} id="worldcasestable" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

