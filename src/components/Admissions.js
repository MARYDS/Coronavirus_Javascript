import React from 'react'
import Graph from '../utilities/Graph'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare, ukRegionsNhs } from '../utilities/Utils'

export default function Admissions(
  { date, latest, average, cumulative, admissions, admissionsByAge, regions }
    = this.props) {

  if (admissions === undefined || admissions === null) admissions = []
  if (admissionsByAge === undefined || admissionsByAge === null) admissionsByAge = []
  if (regions === undefined || regions === null) regions = []
  const admissionsSorted = [...admissions].sort(compare())
  const admissionsByAgeSorted = [...admissionsByAge].sort(compare())
  const regionsSorted = [...regions].sort(compare())

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="card mb-5 h-100">

        <div className="card-header text-center">
          <h5>Hospital Admissions</h5>
          <ul className="nav nav-tabs" id="admissions-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="admissions-tab" data-toggle="tab" href="#admissions" role="tab" aria-controls="admissions" aria-selected="true">Admissions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admissions-data-tab" data-toggle="tab" href="#admissionsdata" role="tab" aria-controls="admissionsdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admissions-byage-data-tab" data-toggle="tab" href="#admissionsbyagedata" role="tab" aria-controls="admissionsbyagedata" aria-selected="false">By Age</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="regions-admissions-data-tab" data-toggle="tab" href="#regionsadmissionsdata" role="tab" aria-controls="regionsadmissionsdata" aria-selected="false">Regions</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="admissions-content">
            <div className="tab-pane fade show active" id="admissions" role="tabpanel"
              aria-labelledby="admissions-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>New Admissions to Hospital</h6>
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  <h6>{date}</h6>
                </span>
                <span className="col-sm-6 text-right">
                  <h6>{latest}</h6>
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  7 Day Average
                </span>
                <span className="col-sm-6 text-right">
                  {average}
                </span>
              </div>
              <div className="row">
                <Chart data={admissionsSorted} desc={['Admissions']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            <div className="tab-pane fade" id="admissionsdata" role="tabpanel" aria-labelledby="admissions-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>New Admissions to Hospital</h6>
                </span>
              </div>
              <TableData data={admissions} cols={['Date', 'Day', 'Admissions']} id='admissionstable' />
            </div>

            <div className="tab-pane fade" id="admissionsbyagedata" role="tabpanel"
              aria-labelledby="admissions-byage-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>New Admissions to Hospital by Age</h6>
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  <h6>{date}</h6>
                </span>
                <span className="col-sm-6 text-right">
                  <h6>{latest}</h6>
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  7 Day Average
                </span>
                <span className="col-sm-6 text-right">
                  {average}
                </span>
              </div>
              <div className="row">
                <Chart data={admissionsByAgeSorted} desc={['0-5', '6-17', '18-64', '65-84', '85+']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            <div className="tab-pane fade" id="regionsadmissionsdata" role="tabpanel"
              aria-labelledby="regions-admissions-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>All Regions New Admissions to Hospital</h6>
                </span>
              </div>
              <div className="row">
                <Graph data={regionsSorted} desc={ukRegionsNhs} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

