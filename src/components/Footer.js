import React from 'react'

export default function Footer() {
  return (
    <div className="col-sm-12">
      <div className="row">
        <div className="col-sm-4">
          <p className="text-left text-white text-wrap text-break">Uk Data from https://api.coronavirus.data.gov.uk/v1/data</p>
        </div>
        <div className="col-sm-4">
          <p className="text-left text-white text-wrap text-break">World Data from https://opendata.ecdc.europa.eu/covid19/casedistribution/json/</p>
        </div>
        <div className="col-sm-4">
          <p className="text-left text-white text-wrap text-break">Excess Deaths from https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/deaths/datasets/weeklyprovisionalfiguresondeathsregisteredinenglandandwales</p>
        </div>
      </div>
    </div>
  )
}
