export const compare = () => {
  return function (a, b) {
    if (a.date > b.date) return 1
    if (a.date < b.date) return -1
    return 0
  }
}

export const getChartSize = (sizes) => {
  let w = 0
  console.log(sizes)
  if (sizes.width >= 992) {
    w = Math.floor(400 * sizes.width / 1440)
  } else if (sizes.width >= 576) {
    w = Math.floor(400 * sizes.width / 1440) * (3 / 2)
  } else {
    w = Math.floor(400 * sizes.width / 1440) * 3
  }
  const h = Math.floor(w * 0.8)

  return ({ w, h })
}

export const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

export const apiUrl = "https://api.coronavirus.data.gov.uk/v1/data"

export const ukRegionsNhs = ['East of England', 'London', 'Midlands',
  'North East and Yorkshire', 'North West', 'South East',
  'South West', 'Scotland', 'Wales', 'Northern Ireland']

export const ukRegions = ['East Midlands', 'East of England', 'London', 'North East',
  'North West', 'South East', 'South West', 'West Midlands',
  'Yorkshire and The Humber', 'Scotland', 'Wales', 'Northern Ireland']