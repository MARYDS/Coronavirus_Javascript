export const compare = () => {
  return function (a, b) {
    if (a.date > b.date) return 1
    if (a.date < b.date) return -1
    return 0
  }
}

export const getChartSize = (sizes) => {
  let w = 0
  if (sizes.width >= 770) {
    w = Math.floor(400 * sizes.width / 1440)
  } else if (sizes.width >= 540) {
    w = Math.floor(400 * sizes.width / 1440) * (3 / 2)
  } else {
    w = Math.floor(400 * sizes.width / 1440) * 3
  }
  const h = Math.floor(w * 0.8)

  return ({ w, h })
}

export const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

export const apiUrl = "https://api.coronavirus.data.gov.uk/v1/data"

export const ukRegions = ['East of England', 'London', 'Midlands',
  'North East and Yorkshire', 'North West', 'South East',
  'South West', 'Scotland', 'Wales', 'Northern Ireland']