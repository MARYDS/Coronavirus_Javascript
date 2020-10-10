import React, { useState } from 'react'

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
    utla: ['Aberdeen City', 'Aberdeenshire', 'Angus', 'Argyll and Bute', 'Barking and Dagenham', 'Barnet', 'Barnsley', 'Bath and North East Somerset', 'Bedford', 'Bexley', 'Birmingham', 'Blackburn with Darwen', 'Blackpool', 'Bolton', 'Bournemouth, Christchurch and Poole', 'Bracknell Forest', 'Bradford', 'Brent', 'Brighton and Hove', 'Bristol, City of', 'Bromley', 'Buckinghamshire', 'Bury', 'Calderdale', 'Cambridgeshire', 'Camden', 'Central Bedfordshire', 'Cheshire East', 'Cheshire West and Chester', 'City of Edinburgh', 'Clackmannanshire', 'Cornwall and Isles of Scilly', 'County Durham', 'Coventry', 'Croydon', 'Cumbria', 'Darlington', 'Derby', 'Derbyshire', 'Devon', 'Doncaster', 'Dorset', 'Dudley', 'Dumfries and Galloway', 'Dundee City', 'Ealing', 'East Ayrshire', 'East Dunbartonshire', 'East Lothian', 'East Renfrewshire', 'East Riding of Yorkshire', 'East Sussex', 'Enfield', 'Essex', 'Falkirk', 'Fife', 'Gateshead', 'Glasgow City', 'Gloucestershire', 'Greenwich', 'Hackney and City of London', 'Halton', 'Hammersmith and Fulham', 'Hampshire', 'Haringey', 'Harrow', 'Hartlepool', 'Havering', 'Herefordshire, County of', 'Hertfordshire', 'Highland', 'Hillingdon', 'Hounslow', 'Inverclyde', 'Isle of Wight', 'Islington', 'Kensington and Chelsea', 'Kent', 'Kingston upon Hull, City of', 'Kingston upon Thames', 'Kirklees', 'Knowsley', 'Lambeth', 'Lancashire', 'Leeds', 'Leicester', 'Leicestershire', 'Lewisham', 'Lincolnshire', 'Liverpool', 'Luton', 'Manchester', 'Medway', 'Merton', 'Middlesbrough', 'Midlothian', 'Milton Keynes', 'Moray', 'Na h-Eileanan Siar', 'Newcastle upon Tyne', 'Newham', 'Norfolk', 'North Ayrshire', 'North East Lincolnshire', 'North Lanarkshire', 'North Lincolnshire', 'North Somerset', 'North Tyneside', 'North Yorkshire', 'Northamptonshire', 'Northumberland', 'Nottingham', 'Nottinghamshire', 'Oldham', 'Orkney Islands', 'Oxfordshire', 'Perth and Kinross', 'Peterborough', 'Plymouth', 'Portsmouth', 'Reading', 'Redbridge', 'Redcar and Cleveland', 'Renfrewshire', 'Richmond upon Thames', 'Rochdale', 'Rotherham', 'Rutland', 'Salford', 'Sandwell', 'Scottish Borders', 'Sefton', 'Sheffield', 'Shetland Islands', 'Shropshire', 'Slough', 'Solihull', 'Somerset', 'South Ayrshire', 'South Gloucestershire', 'South Lanarkshire', 'South Tyneside', 'Southampton', 'Southend-on-Sea', 'Southwark', 'St. Helens', 'Staffordshire', 'Stirling', 'Stockport', 'Stockton-on-Tees', 'Stoke-on-Trent', 'Suffolk', 'Sunderland', 'Surrey', 'Sutton', 'Swindon', 'Tameside', 'Telford and Wrekin', 'Thurrock', 'Torbay', 'Tower Hamlets', 'Trafford', 'Wakefield', 'Walsall', 'Waltham Forest', 'Wandsworth', 'Warrington', 'Warwickshire', 'West Berkshire', 'West Dunbartonshire', 'West Lothian', 'West Sussex', 'Westminster', 'Wigan', 'Wiltshire', 'Windsor and Maidenhead', 'Wirral', 'Wokingham', 'Wolverhampton', 'Worcestershire', 'York'],

    ltla: []
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
          <label htmlFor="areaType" className="mr-2">Area Type</label>
          <select className="form-control w-75 mr-2" id="areaType" defaultValue={areaType} onChange={onAreaTypeChange}>
            <option value='overview'>UK</option>
            <option value='nation'>Nation</option>
            <option value='region'>Region</option>
            <option value='nhsRegion'>NHS Region</option>
            <option value='utla'>Upper-tier Local Authority</option>
            <option value='ltla'>Lower-tier Local Authority</option>
          </select>
        </div>

        <div className="form-group col-md-4">
          <label htmlFor="areaName" className="mr-2">Area Name</label>
          <select className="form-control w-75" id="areaName" defaultValue={areaName}>
            {areaNames.map((name) => (
              <option value={name} key={name}>{name}</option>
            ))}
          </select>
        </div>

        <input className="btn btn-secondary ml-3" type="button" value="Submit" onClick={onSubmitClick} />
      </form >
    </div>
  )
}
