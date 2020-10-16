import React from 'react'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare } from '../utilities/Utils'

export default function Tests(
  { date, newP1, newP2, newP3, newP4, newTotal,
    cumP1, cumP2, cumP3, cumP4, cumTotal,
    tests1, tests2, tests3, tests4, testsTot } = this.props) {
  if (tests1 === undefined) tests1 = []
  if (tests2 === undefined) tests2 = []
  if (tests3 === undefined) tests3 = []
  if (tests4 === undefined) tests4 = []
  if (testsTot === undefined) testsTot = []
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

    <div className="col-md-4 col-sm-6 mb-3">
      <div className="card card-main h-100">

        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">Tests</h5>
          <ul className="nav nav-tabs" id="tests-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="tests-tab" data-toggle="tab" href="#tests" role="tab" aria-controls="tests" aria-selected="true">Tests</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p1-data-tab" data-toggle="tab" href="#p1data" role="tab" aria-controls="p1data" aria-selected="false">P1</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p2-data-tab" data-toggle="tab" href="#p2data" role="tab" aria-controls="p2data" aria-selected="false">P2</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p3-data-tab" data-toggle="tab" href="#p3data" role="tab" aria-controls="p3data" aria-selected="false">P3</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="p4-data-tab" data-toggle="tab" href="#p4data" role="tab" aria-controls="p4data" aria-selected="false">P4</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="tests-data-tab" data-toggle="tab" href="#testsdata" role="tab" aria-controls="testsdata" aria-selected="false">Total</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="tests-content">
            <div className="tab-pane fade show active" id="tests" role="tabpanel"
              aria-labelledby="tests-tab">

              <div className="card mb-3">
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="row text-white p-0 m-0 rounded">
                    <span className="col-sm-4 text-left">
                      <h6 className="font-weight-bold">{date}</h6>
                    </span>
                    <span className="col-sm-4 text-right">
                      <h6 className="font-weight-bold">{newTotal}</h6>
                    </span>
                    <span className="col-sm-4 text-right">
                      <h6 className="font-weight-bold">{cumTotal}</h6>
                    </span>
                  </div>
                </div>
                <div className="card-body p-2 mx-4">
                  <div className="row">
                    <span className="col-sm-4 text-left">
                      Pillar 1
                </span>
                    <span className="col-sm-4 text-right">
                      {newP1}
                    </span>
                    <span className="col-sm-4 text-right">
                      {cumP1}
                    </span>
                  </div>
                  <div className="row">
                    <span className="col-sm-4 text-left">
                      Pillar 2
                </span>
                    <span className="col-sm-4 text-right">
                      {newP2}
                    </span>
                    <span className="col-sm-4 text-right">
                      {cumP2}
                    </span>
                  </div>
                  <div className="row">
                    <span className="col-sm-4 text-left">
                      Pillar 3
                </span>
                    <span className="col-sm-4 text-right">
                      {newP3}
                    </span>
                    <span className="col-sm-4 text-right">
                      {cumP3}
                    </span>
                  </div>
                  <div className="row">
                    <span className="col-sm-4 text-left">
                      Pillar 4
                </span>
                    <span className="col-sm-4 text-right">
                      {newP4}
                    </span>
                    <span className="col-sm-4 text-right">
                      {cumP4}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Tests by Published Date</h6>
                </span>
              </div>
              <div className="row">
                <Chart data={testsTotSorted} desc={['Pillar 1', 'Pillar 2', 'Pillar 3', 'Pillar 4']} />
              </div>
            </div>

            <div className="tab-pane fade" id="p1data" role="tabpanel" aria-labelledby="p1-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Pillar 1 Tests</h6>
                </span>
              </div>
              <TableData data={tests1} cols={['Date', 'Day', 'Tests']} id="testsp1table" />
            </div>

            <div className="tab-pane fade" id="p2data" role="tabpanel"
              aria-labelledby="p2-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Pillar 2 Tests</h6>
                </span>
              </div>
              <TableData data={tests2} cols={['Date', 'Day', 'Tests']} id="testsp2table" />
            </div>

            <div className="tab-pane fade" id="p3data" role="tabpanel" aria-labelledby="p3-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Pillar 3 Tests</h6>
                </span>
              </div>
              <TableData data={tests3} cols={['Date', 'Day', 'Tests']} id="testsp3table" />
            </div>

            <div className="tab-pane fade" id="p4data" role="tabpanel" aria-labelledby="p4-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Pillar 4 Tests</h6>
                </span>
              </div>
              <TableData data={tests4} cols={['Date', 'Day', 'Tests']} id="testsp4table" />
            </div>

            <div className="tab-pane fade" id="testsdata" role="tabpanel" aria-labelledby="tests-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Total Tests</h6>
                </span>
              </div>
              <TableData data={testsTot} cols={['Date', 'Day', 'Tests']} id="teststottable" />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}