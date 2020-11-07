import React, { useState } from 'react'
import { getUtla } from '../utilities/utla'
import { getLtla } from '../utilities/ltla'

export default function Input({ areaType, areaName, updateAreaTypeAndName } = this.props) {

  const [areaNames, setAreaNames] = useState(['']);

  const nameOptions = {
    overview: [''],
    nation: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    region: ['East Midlands', 'East of England', 'London', 'North East',
      'North West', 'South East', 'South West', 'West Midlands',
      'Yorkshire and The Humber'],
    nhsRegion: ['East of England', 'London', 'Midlands',
      'North East and Yorkshire', 'North West', 'South East',
      'South West'],
    utla: getUtla(),
    ltla: getLtla(),
    world: ['']
  }

  const onAreaTypeChange = (event) => {
    setAreaNames(nameOptions[event.target.value])
  }

  const onSubmitClick = (event) => {
    updateAreaTypeAndName(
      document.getElementById("areaType").value,
      document.getElementById("areaName").value)
  }

  return (

    <form className="form-inline w-100 mb-3">

      <div className="input-group col-sm-6 col-lg-4">

        <div className="input-group-prepend">
          <span className="input-group-text prefix">Area Type</span>
        </div>
        <select className="form-control custom-select" id="areaType" defaultValue={areaType} onChange={onAreaTypeChange}>
          <option value='overview'>UK</option>
          <option value='nation'>Nation</option>
          <option value='region'>Region</option>
          <option value='nhsRegion'>NHS Region</option>
          <option value='utla'>Upper-tier Local Authority</option>
          <option value='ltla'>Lower-tier Local Authority</option>
          <option value='world'>World</option>
        </select>
      </div>

      <div className="input-group col-sm-6 col-lg-4">
        <div className="input-group-prepend">
          <span className="input-group-text prefix">Area Name</span>
        </div>
        <select className="form-control custom-select" id="areaName" defaultValue={areaName}>
          {areaNames.map((name) => (
            <option value={name} key={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="form-group col-sm-6 col-lg-4">
        <button className="form-control btn btn-info" type="button" onClick={onSubmitClick}>Get Data</button>
      </div>
    </form >
  )
}
