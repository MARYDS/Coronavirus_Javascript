export const compare = () => {
  return function (a, b) {
    if (a.date > b.date) return 1
    if (a.date < b.date) return -1
    return 0
  }
}

export const getChartSize = (sizes) => {
  let w = 0

  if (sizes.width >= 992) {
    w = Math.floor(330 * window.screen.width / 1200)
  } else if (sizes.width >= 576) {
    w = Math.floor(330 * window.screen.width / 1200) * (3 / 2)
  } else {
    w = Math.floor(330 * window.screen.width / 1200) * 3
  }
  const h = Math.floor(w * 0.8)
  return ({ w, h })
}

export const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

export const apiUrl = "https://api.coronavirus.data.gov.uk/v1/data"

export const ecdcUrl = "https://cors-anywhere.herokuapp.com/" + "https://opendata.ecdc.europa.eu/covid19/casedistribution/json/"

export const ukRegionsNhs = ['East of England', 'London', 'Midlands',
  'North East and Yorkshire', 'North West', 'South East',
  'South West', 'Scotland', 'Wales', 'Northern Ireland']

export const ukRegions = ['East of England', 'London', 'East Midlands', 'North East',
  'North West', 'South East', 'South West', 'Scotland', 'Wales', 'Northern Ireland', 'West Midlands', 'Yorkshire and The Humber']

export const ukNations = ['England', 'Scotland', 'Wales', 'Northern Ireland']