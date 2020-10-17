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
    ltla: getLtla()
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

    <div className="container-fluid">
      <form className="form-inline">

        <div className="form-group col-md-4">
          <div class="input-group-prepend">
            <span class="input-group-text">Area Type</span>
          </div>
          <select className="form-control mr-2 w-75 custom-select" id="areaType" defaultValue={areaType} onChange={onAreaTypeChange}>
            <option value='overview'>UK</option>
            <option value='nation'>Nation</option>
            <option value='region'>Region</option>
            <option value='nhsRegion'>NHS Region</option>
            <option value='utla'>Upper-tier Local Authority</option>
            <option value='ltla'>Lower-tier Local Authority</option>
          </select>
        </div>

        <div className="form-group col-md-4">
          <div class="input-group-prepend">
            <span class="input-group-text">Area Name</span>
          </div>
          <select className="form-control w-75 custom-select" id="areaName" defaultValue={areaName}>
            {areaNames.map((name) => (
              <option value={name} key={name}>{name}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-info ml-4" type="button" onClick={onSubmitClick}>Get Data</button>
      </form >
    </div>
  )
}
