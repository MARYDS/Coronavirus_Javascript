import React from 'react'
import Graph from '../utilities/Graph'
import DataTable from '../components/DataTable'
import { compare } from '../utilities/Utils'

export default function Tests({ date, piller1, piller2, piller3, piller4, total, cumPiller1, cumPiller2, cumPiller3, cumPiller4, cumPillerTotal, tests1, tests2, tests3, tests4, testsTotal } = this.props) {

  const tests1Sorted = [...tests1].sort(compare())
  const tests2Sorted = [...tests2].sort(compare())
  const tests3Sorted = [...tests3].sort(compare())
  const tests4Sorted = [...tests4].sort(compare())
  const testsTotalSorted = [...testsTotal].sort(compare())

  return (

    <div className="col-md-4">
      <div className="card h-100">

        <div className="card-header text-center">
          Tests
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
              <div className="row">
                <span className="col-sm-4 text-left">
                  {date}
                </span>
                <span className="col-sm-4 text-right">
                </span>
                <span className="col-sm-4 text-right">
                </span>
              </div>
              <div className="row">
                <span className="col-sm-4 text-left">
                  Pillar 1
                </span>
                <span className="col-sm-4 text-right">
                  {piller1}
                </span>
                <span className="col-sm-4 text-right">
                  {cumPiller1}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-4 text-left">
                  Pillar 2
                </span>
                <span className="col-sm-4 text-right">
                  {piller2}
                </span>
                <span className="col-sm-4 text-right">
                  {cumPiller2}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-4 text-left">
                  Pillar 3
                </span>
                <span className="col-sm-4 text-right">
                  {piller3}
                </span>
                <span className="col-sm-4 text-right">
                  {cumPiller3}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-4 text-left">
                  Pillar 4
                </span>
                <span className="col-sm-4 text-right">
                  {piller4}
                </span>
                <span className="col-sm-4 text-right">
                  {cumPiller4}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-4 text-left">
                  Total
                </span>
                <span className="col-sm-4 text-right">
                  {total}
                </span>
                <span className="col-sm-4 text-right">
                  {cumPillerTotal}
                </span>
              </div>
              <Graph data={testsTotalSorted} />
            </div>

            <div className="tab-pane fade" id="p1data" role="tabpanel" aria-labelledby="p1-data-tab">
              <DataTable data={tests1} />
            </div>

            <div className="tab-pane fade" id="p2data" role="tabpanel" aria-labelledby="p2-data-tab">
              <DataTable data={tests2} />
            </div>

            <div className="tab-pane fade" id="p3data" role="tabpanel" aria-labelledby="p3-data-tab">
              <DataTable data={tests3} />
            </div>

            <div className="tab-pane fade" id="p4data" role="tabpanel" aria-labelledby="p4-data-tab">
              <DataTable data={tests4} />
            </div>

            <div className="tab-pane fade" id="testsdata" role="tabpanel" aria-labelledby="tests-data-tab">
              <DataTable data={testsTotal} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}