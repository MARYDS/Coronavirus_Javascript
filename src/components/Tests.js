import React from 'react'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare } from '../utilities/Utils'

export default function Tests(
  { areaName, date, newP1, newP2, newP3, newP4, newTotal,
    cumP1, cumP2, cumP3, cumP4, cumTotal,
    tests1, tests2, tests3, tests4, testsTot } = this.props) {
  if (tests1 === undefined) tests1 = []
  if (tests2 === undefined) tests2 = []
  if (tests3 === undefined) tests3 = []
  if (tests4 === undefined) tests4 = []
  if (testsTot === undefined) testsTot = []
  if (areaName === '') areaName = 'UK'
  const testsTotSorted =
    [...testsTot.map(
      (day) => {
        return {
          date: day.date,
          day: day.day,
          counts: [...day.counts].slice(1)
        }
      })
    ].sort(compare())

  return (
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold heading">Tests</h5>

          {/* Navigation */}
          <ul className="nav nav-tabs" id="tests-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="tests-tab" data-toggle="tab" href="#tests" role="tab" aria-controls="tests" aria-selected="true">Tests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p1-data-tab" data-toggle="tab" href="#p1data" role="tab" aria-controls="p1data" aria-selected="false">#P1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p2-data-tab" data-toggle="tab" href="#p2data" role="tab" aria-controls="p2data" aria-selected="false">#P2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p3-data-tab" data-toggle="tab" href="#p3data" role="tab" aria-controls="p3data" aria-selected="false">#P3</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p4-data-tab" data-toggle="tab" href="#p4data" role="tab" aria-controls="p4data" aria-selected="false">#P4</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="tests-data-tab" data-toggle="tab" href="#testsdata" role="tab" aria-controls="testsdata" aria-selected="false">Total</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="tests-content">

            {/* First Tab - Tests with Chart */}
            <div className="tab-pane fade show active" id="tests" role="tabpanel"
              aria-labelledby="tests-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white rounded">
                    <span className="text-left tests">
                      <h6 className="font-weight-bold">{date}</h6>
                    </span>
                    <span className="text-right tests">
                      <h6 className="font-weight-bold">{newTotal}</h6>
                    </span>
                    <span className="text-right tests">
                      <h6 className="font-weight-bold">{cumTotal}</h6>
                    </span>
                  </div>
                </div>
                {/* Other Stats */}
                <div className="card-body py-1">
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left tests">
                      Pillar 1
                    </span>
                    <span className="text-right tests">
                      {newP1}
                    </span>
                    <span className="text-right tests">
                      {cumP1}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left tests">
                      Pillar 2
                    </span>
                    <span className="text-right tests">
                      {newP2}
                    </span>
                    <span className="text-right tests">
                      {cumP2}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left tests">
                      Pillar 3
                    </span>
                    <span className="text-right tests">
                      {newP3}
                    </span>
                    <span className="text-right tests">
                      {cumP3}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left tests">
                      Pillar 4
                   </span>
                    <span className="text-right tests">
                      {newP4}
                    </span>
                    <span className="text-right tests">
                      {cumP4}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graph with results */}
              <div>
                <h6 className="text-center">Tests by Published Date - {areaName}</h6>
                <Chart data={testsTotSorted} desc={['Pillar 1', 'Pillar 2', 'Pillar 3', 'Pillar 4']} />
              </div>
            </div>

            {/* Second Tab - Pillar 1 Table */}
            <div className="tab-pane fade" id="p1data" role="tabpanel" aria-labelledby="p1-data-tab">
              <h6 className="text-center">Pillar 1 (NHS/PHE) Tests - {areaName}</h6>
              <TableData data={tests1} cols={['Date', 'Day', 'Tests']} id="testsp1table" />
            </div>

            {/* Third Tab - Pillar 2 Table */}
            <div className="tab-pane fade" id="p2data" role="tabpanel"
              aria-labelledby="p2-data-tab">
              <h6 className="text-center">Pillar 2 (Non-NHS) Tests - {areaName}</h6>
              <TableData data={tests2} cols={['Date', 'Day', 'Tests']} id="testsp2table" />
            </div>

            {/* Forth Tab - Pillar 3 Table */}
            <div className="tab-pane fade" id="p3data" role="tabpanel" aria-labelledby="p3-data-tab">
              <h6 className="text-center">Pillar 3 (Antibody) Tests - {areaName}</h6>
              <TableData data={tests3} cols={['Date', 'Day', 'Tests']} id="testsp3table" />
            </div>

            {/* Fifth Tab - Pillar 4 Table */}
            <div className="tab-pane fade" id="p4data" role="tabpanel" aria-labelledby="p4-data-tab">
              <h6 className="text-center">Pillar 4 (Surveillance) Tests - {areaName}</h6>
              <TableData data={tests4} cols={['Date', 'Day', 'Tests']} id="testsp4table" />
            </div>

            {/* Sixth Tab - Totals Table */}
            <div className="tab-pane fade" id="testsdata" role="tabpanel" aria-labelledby="tests-data-tab">
              <h6 className="text-center">Total Tests - {areaName}</h6>
              <TableData data={testsTot} cols={['Date', 'Day', 'Tests']} id="teststottable" />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}