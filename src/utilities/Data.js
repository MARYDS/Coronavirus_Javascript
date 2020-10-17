import { structureAll, structureDeaths, structureCases, structureHospital, structureRegion } from './DataStructures'
import { apiUrl, weekdays, ukRegionsNhs, ukRegions } from './Utils'

export default class Data {

  constructor(areaType, areaName) {
    this.areaType = areaType;
    this.areaName = areaName;
  }

  // Fetch all available data from the government API for Type/Area
  async getAPIData() {
    let filters = `areaType=${this.areaType}`
    if (this.areaName !== '') {
      filters += `;areaName=${this.areaName}`
    }
    const request = `
    ${apiUrl}?filters=${filters}&structure=${JSON.stringify(structureAll)}
    `
    let response = await fetch(request);
    let results = await response.json();
    const requiredData = this.extractRequiredFields(results.data)
    response = null
    results = null
    return requiredData;
  }

  // Fetch todays or most recent death data from API at lowest local authority level
  // Latest date may be different to UK value 
  async getAPIDeathDataByLA(latest) {
    let deaths = []
    let i = 0

    // Try last 3 days or until data found
    while (deaths.length === 0 && i <= 3) {
      i += 1

      let filters = "areaType=ltla"
      filters += `;date=${latest}`
      const request = `
      ${apiUrl}?filters=${filters}&structure=${JSON.stringify(structureDeaths)}
      `
      let response = await fetch(request);
      let results = await response.json();

      // No data available
      if (results.status >= 400) continue
      if (results.data === undefined) continue

      // Filter to results with a non-zero number of deaths 
      // and filter by nation
      deaths = results.data.filter(la => {
        const prefix = la.code.charAt(0)
        return la.count !== 0 &&
          (
            this.areaName === '' ||
            (this.areaName === 'England' && prefix === 'E') ||
            (this.areaName === 'Scotland' && prefix === 'S') ||
            (this.areaName === 'Wales' && prefix === 'W') ||
            (this.areaName === 'Northern Ireland' && prefix === 'N')
          )
      })

      // No deaths on this date, go back 1 day
      if (deaths.length === 0) {
        const latestDate = new Date(latest)
        latestDate.setDate(latestDate.getDate() - 1)
        latest = '' + latestDate.getFullYear() + '-' + ("0" + (latestDate.getMonth() + 1)).slice(-2) + '-' + ("0" + latestDate.getDate()).slice(-2)
      }
    }

    // Sort in descending order by number of deaths
    deaths.sort((a, b) => {
      if (b.count > a.count) return 1
      if (b.count < a.count) return -1
      return 0
    })

    let deathsByLocation =
      deaths.map((locn) => {
        return (
          {
            date: locn.date,
            location: locn.locn,
            code: locn.code,
            counts: [locn.count]
          }
        )
      })

    return deathsByLocation;
  }

  // Fetch todays or most recent cases data from API at lowest local authority level
  // Latest date may be different to UK value 
  async getAPICaseDataByLA(latest) {
    let cases = []
    let i = 0

    // Try last 3 days or until data found
    while (cases.length === 0 && i <= 3) {
      i += 1
      let filters = "areaType=ltla"
      filters += `;date=${latest}`
      const request = `
      ${apiUrl}?filters=${filters}&structure=${JSON.stringify(structureCases)}
      `
      let response = await fetch(request);
      let results = await response.json();

      // No data available
      if (results.status >= 400) continue
      if (results.data === undefined) continue

      // Filter to results with a non-zero number of cases
      // and filter by nation
      cases = results.data.filter(la => {
        const prefix = la.code.charAt(0)
        return la.count !== 0 &&
          (
            this.areaName === '' ||
            (this.areaName === 'England' && prefix === 'E') ||
            (this.areaName === 'Scotland' && prefix === 'S') ||
            (this.areaName === 'Wales' && prefix === 'W') ||
            (this.areaName === 'Northern Ireland' && prefix === 'N')
          )
      })

      // No cases on this date, go back 1 day
      if (cases.length === 0) {
        const latestDate = new Date(latest)
        latestDate.setDate(latestDate.getDate() - 1)
        latest = '' + latestDate.getFullYear() + '-' + ("0" + (latestDate.getMonth() + 1)).slice(-2) + '-' + ("0" + latestDate.getDate()).slice(-2)
      }

    }

    // Sort in descending order by number of cases
    cases.sort((a, b) => {
      if (b.count > a.count) return 1
      if (b.count < a.count) return -1
      return 0
    })
    let casesByLocation =
      cases.map((locn) => {
        return (
          {
            date: locn.date,
            location: locn.locn,
            code: locn.code,
            counts: [locn.count]
          }
        )
      })

    return casesByLocation;
  }

  // Fetch todays or most recent hospital data from API
  async getAPIHospitalDataByNHSRegion() {

    let hosp = {}
    let region = ''

    // Retrieve data for each region and merge results
    for (let k = 0; k < ukRegionsNhs.length; k++) {
      region = ukRegionsNhs[k]

      let filters = ""
      if (region === "Scotland" || region === "Wales" || region === "Northern Ireland") {
        filters = "areaType=nation"
      } else {
        filters = "areaType=nhsRegion"
      }
      filters += `;areaName=${region}`
      const request = `
      ${apiUrl}?filters=${filters}&structure=${JSON.stringify(structureHospital)}
      `
      let response = await fetch(request);
      let results = await response.json();

      // No data available
      if (results.status >= 400) continue
      if (results.data === undefined) continue

      // Got data
      if (results.data != null) {

        // Merge with other regions data by date
        for (let i = 0; i < results.data.length; i++) {
          const c = results.data[i]
          const rowDay = weekdays[(new Date(c.date)).getDay()]

          // New date, create empty object
          if (!(c.date in hosp)) {
            hosp[c.date] = {
              'day': rowDay,
              'patients': [null, null, null, null, null, null, null, null, null, null],
              'admissions': [null, null, null, null, null, null, null, null, null, null],
              'intensiveCare': [null, null, null, null, null, null, null, null, null, null]
            }
          }

          if (c.patients != null) {
            hosp[c.date]['patients'][k] = c.patients
          }
          if (c.admissions != null) {
            hosp[c.date]['admissions'][k] = c.admissions
          }
          if (c.intensiveCare != null) {
            hosp[c.date]['intensiveCare'][k] = c.intensiveCare
          }
        }
      }
    }

    // Split out deaths and cases
    let hospital = {
      patients: [],
      admissions: [],
      intensiveCare: []
    }

    for (const [key, value] of Object.entries(hosp)) {

      let tot = value.patients.reduce((tot, val) => {
        return ((val == null) ? tot : tot + val)
      }, 0)
      if (tot !== 0) {
        hospital.patients[hospital.patients.length] = {
          'date': key,
          'day': value.day,
          'counts': value.patients
        }
      }

      tot = value.admissions.reduce((tot, val) => {
        return ((val == null) ? tot : tot + val)
      }, 0)
      if (tot !== 0) {
        hospital.admissions[hospital.admissions.length] = {
          'date': key,
          'day': value.day,
          'counts': value.admissions
        }
      }

      tot = value.intensiveCare.reduce((tot, val) => {
        return ((val == null) ? tot : tot + val)
      }, 0)
      if (tot !== 0) {
        hospital.intensiveCare[hospital.intensiveCare.length] = {
          'date': key,
          'day': value.day,
          'counts': value.intensiveCare
        }
      }
    }
    return hospital;
  }

  // Fetch todays or most recent regional data from API
  async getAPIRegionData() {

    let reg = {}
    let region = ''

    // Retrieve data for each region and merge results
    for (let k = 0; k < ukRegions.length; k++) {
      region = ukRegions[k]

      let filters = ""
      if (region === "Scotland" || region === "Wales" || region === "Northern Ireland") {
        filters = "areaType=nation"
      } else {
        filters = "areaType=region"
      }
      filters += `;areaName=${region}`
      const request = `
      ${apiUrl}?filters=${filters}&structure=${JSON.stringify(structureRegion)}
      `
      let response = await fetch(request);
      let results = await response.json();

      // No data available
      if (results.status >= 400) continue
      if (results.data === undefined) continue

      // Got data
      if (results.data != null) {

        // Merge with other regions data by date
        for (let i = 0; i < results.data.length; i++) {
          const c = results.data[i]

          // Arrays of date / values after region data is available
          if (c.date >= '2020-03-01' && c.date !== '2020-07-01') {
            const rowDay = weekdays[(new Date(c.date)).getDay()]

            // New date, create empty object
            if (!(c.date in reg)) {
              reg[c.date] = {
                'day': rowDay,
                'deaths': [],
                'cases': []
              }
            }

            reg[c.date]['deaths'][k] = c.deaths
            reg[c.date]['cases'][k] = c.cases
          }
        }
      }
    }

    // Split out deaths and cases
    let regions = {
      deaths: [],
      cases: [],
    }

    for (const [key, value] of Object.entries(reg)) {
      if (key >= '2020-08-16') {
        regions.deaths[regions.deaths.length] = {
          'date': key,
          'day': value.day,
          'counts': value.deaths
        }
      }
      regions.cases[regions.cases.length] = {
        'date': key,
        'day': value.day,
        'counts': value.cases
      }
    }
    return regions;
  }

  get7DayAverage(apiData, i, field) {
    let tot = 0
    for (let a = i; a < (i + 7); a++) {
      let val = 0
      switch (field) {
        case "newDeathsPub":
          val = apiData[a].newDeathsPub
          break
        case "newDeathsAct":
          val = apiData[a].newDeathsAct
          break
        case "newCasesPub":
          if (this.areaType !== 'region' ||
            (this.areaType === 'region' && apiData[a].date !== '2020-07-01')) {
            val = apiData[a].newCasesPub
          }
          break
        case "newCasesAct":
          val = apiData[a].newCasesAct
          break
        case "hospitalCases":
          val = apiData[a].hospitalCases
          break
        case "newAdmissions":
          val = apiData[a].newAdmissions
          break
        case "covidOccupiedMVBeds":
          val = apiData[a].covidOccupiedMVBeds
          break
        default:
          break
      }
      if (a < apiData.length && val != null) {
        tot += val
      }
    }
    return Math.floor(tot / 7)
  }

  // Get required fields from the main extract and reformat
  extractRequiredFields(apiData) {

    const data = {
      dateLatest: null, deathsDate: null, deathsDateYMD: null, deathsNew: null, deathsCum: null, deathsRate: null, deathsAverage: null, deathsDateAct: null, deathsNewAct: null, deathsCumAct: null, deathsRateAct: null, deathsAverageAct: null, casesDate: null, casesDateYMD: null, casesNew: null, casesCum: null, casesRate: null, casesAverage: null, casesDateAct: null, casesNewAct: null, casesCumAct: null, casesRateAct: null, casesAverageAct: null, hospitalDate: null, hospitalNew: null, hospitalAverage: null, admissionsDate: null, admissionsNew: null, admissionsCum: null, admissionsAverage: null, intensiveCareDate: null, intensiveCareNew: null, intensiveCareAverage: null, testsDate: null, newP1: null, newP2: null, newP3: null, newP4: null, newTests: null, cumP1: null, cumP2: null, cumP3: null, cumP4: null, cumTests: null, deathsPub: [], deathsAct: [], casesPub: [], casesAct: [], casesByGender: [], tests1: [], tests2: [], tests3: [], tests4: [], testsTot: [], patients: [], admissions: [], admissionsByAge: [], intensiveCare: []
    }

    // Got data
    if (apiData !== undefined && apiData.length > 0) {
      data.dateLatest = apiData[0].date

      // Got the latest date where data is available
      if (data.dateLatest != null) {

        // Process all dates
        for (let i = 0; i < apiData.length; i++) {
          // Current Row
          const c = apiData[i]
          // Next Row
          let d = null
          if (i + 1 < apiData.length) {
            d = apiData[i + 1]
          }

          const rowDate = (new Date(c.date)).toLocaleDateString()
          const rowDay = weekdays[(new Date(c.date)).getDay()]

          // Get the latest values for each variable, may be on different dates

          // Deaths Published - Set if not already set
          if (data.deathsNew == null && c.newDeathsPub != null) {
            data.deathsNew = (c.newDeathsPub || '0').toLocaleString()
            data.deathsCum = (c.cumDeathsPub || '0').toLocaleString()
            data.deathsRate = c.cumDeathsPubRate
            data.deathsDate = rowDate
            data.deathsDateYMD = c.date
            data.deathsAverage = this.get7DayAverage(apiData, i, "newDeathsPub")
              .toLocaleString()
          }

          // Deaths by Death Date - Set if not already set
          if (data.deathsNewAct == null && c.newDeathsAct != null) {
            data.deathsNewAct = (c.newDeathsAct || '0').toLocaleString()
            data.deathsCumAct = (c.cumDeathsAct || '0').toLocaleString()
            data.deathsRateAct = c.cumDeathsActRate
            data.deathsDateAct = rowDate
            data.deathsAverageAct = this.get7DayAverage(apiData, i, "newDeathsAct")
              .toLocaleString()
          }

          // Cases Published - Set if not already set
          if (data.casesNew == null && c.newCasesPub != null) {
            data.casesNew = (c.newCasesPub || '0').toLocaleString()
            data.casesCum = (c.cumCasesPub || '0').toLocaleString()
            data.casesRate = c.cumCasesPubRate
            data.casesDate = rowDate
            data.casesDateYMD = c.date
            data.casesAverage = this.get7DayAverage(apiData, i, "newCasesPub")
              .toLocaleString()
          }
          // Cases by specimen date - Set if not already set
          if (data.casesNewAct == null && c.newCasesAct != null) {
            data.casesNewAct = (c.newCasesAct || '0').toLocaleString()
            data.casesCumAct = (c.cumCasesAct || '0').toLocaleString()
            data.casesRateAct = c.cumCasesActRate
            data.casesDateAct = rowDate
            data.casesAverageAct = this.get7DayAverage(apiData, i, "newCasesAct")
              .toLocaleString()
          }

          const caseAgeRanges =
            ["0_to_4", "5_to_9", "10_to_14", "15_to_19", "20_to_24", "25_to_29", "30_to_34",
              "35_to_39", "40_to_44", "45_to_49", "50_to_54", "55_to_59", "60_to_64", "65_to_69",
              "70_to_74", "75_to_79", "80_to_84", "85_to_89", "90+"]

          const maleCasesByAgeNow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          const femaleCasesByAgeNow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          if (data.casesByGender.length === 0 &&
            (c.maleCases != null || c.femaleCases != null)) {
            if (c.maleCases != null) {
              c.maleCases.forEach((age) => {
                const loc = caseAgeRanges.indexOf(age.age)
                if (loc !== -1) {
                  maleCasesByAgeNow[loc] = age.value
                }
              })
            }
            if (c.femaleCases != null) {
              c.femaleCases.forEach((age) => {
                const loc = caseAgeRanges.indexOf(age.age)
                if (loc !== -1) {
                  femaleCasesByAgeNow[loc] = age.value
                }
              })
            }

            for (let g = 0; g < 19; g++) {
              data.casesByGender[data.casesByGender.length] = {
                age: caseAgeRanges[g],
                counts: [maleCasesByAgeNow[g], femaleCasesByAgeNow[g]],
                lines: []
              }
            }
          }

          // Tests - Set if not already set
          if (data.newP1 == null &&
            (c.newPillarOneTestsByPublishDate != null ||
              c.newPillarTwoTestsByPublishDate != null ||
              c.newPillarThreeTestsByPublishDate != null ||
              c.newPillarFourTestsByPublishDate != null)) {
            data.newP1 = (c.newPillarOneTestsByPublishDate || '0').toLocaleString()
            data.newP2 = (c.newPillarTwoTestsByPublishDate || '0').toLocaleString()
            data.newP3 = (c.newPillarThreeTestsByPublishDate || '0').toLocaleString()
            data.newP4 = (c.newPillarFourTestsByPublishDate || '0').toLocaleString()
            data.newTests = c.newTests.toLocaleString()
            data.cumP1 = (c.cumPillarOneTestsByPublishDate || '0').toLocaleString()
            data.cumP2 = (c.cumPillarTwoTestsByPublishDate || '0').toLocaleString()
            data.cumP3 = (c.cumPillarThreeTestsByPublishDate || '0').toLocaleString()
            data.cumP4 = (c.cumPillarFourTestsByPublishDate || '0').toLocaleString()
            data.cumTests = c.cumTests.toLocaleString()
            data.testsDate = rowDate
          }

          // Hospital patients - Set if not already set
          if (data.hospitalNew == null && c.hospitalCases != null) {
            data.hospitalNew = (c.hospitalCases).toLocaleString()
            data.hospitalDate = rowDate
            data.hospitalAverage = this.get7DayAverage(apiData, i, "hospitalCases")
              .toLocaleString()
          }
          // Hospital admissions - Set if not already set
          if (data.admissionsNew == null && c.newAdmissions != null) {
            data.admissionsNew = (c.newAdmissions).toLocaleString()
            data.admissionsCum = (c.cumAdmissions || '0').toLocaleString()
            data.admissionsDate = rowDate
            data.admissionsAverage = this.get7DayAverage(apiData, i, "newAdmissions")
              .toLocaleString()
          }

          // Intensive care - Set if not already set
          if (data.intensiveCareNew == null && c.covidOccupiedMVBeds != null) {
            data.intensiveCareNew = (c.covidOccupiedMVBeds).toLocaleString()
            data.intensiveCareDate = rowDate
            data.intensiveCareAverage = this.get7DayAverage(apiData, i, "covidOccupiedMVBeds")
              .toLocaleString()
          }

          // Arrays of date / values after covid start date
          if (c.date >= '2020-03-01' && (c.date !== '2020-07-01' || c.areaType !== 'region')) {

            if (c.newDeathsPub != null) {
              data.deathsPub[data.deathsPub.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newDeathsPub],
                rate: c.cumDeathsPubRate,
                lines: [this.get7DayAverage(apiData, i, "newDeathsPub")]
              }
            }
            if (c.newDeathsAct != null) {
              data.deathsAct[data.deathsAct.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newDeathsAct],
                rate: c.cumDeathsActRate,
                lines: [this.get7DayAverage(apiData, i, "newDeathsAct")],
              }
            }
            if (c.newCasesPub != null) {
              data.casesPub[data.casesPub.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newCasesPub],
                rate: c.cumCasesPubRate,
                lines: [this.get7DayAverage(apiData, i, "newCasesPub")],
              }
            }
            if (c.newCasesAct != null) {
              data.casesAct[data.casesAct.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newCasesAct],
                rate: c.cumCasesActRate,
                lines: [this.get7DayAverage(apiData, i, "newCasesAct")],
              }
            }
            if (c.newPillarOneTestsByPublishDate != null) {
              data.tests1[data.tests1.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarOneTestsByPublishDate],
                lines: []
              }
            }
            if (c.newPillarTwoTestsByPublishDate != null) {
              data.tests2[data.tests2.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarTwoTestsByPublishDate],
                lines: []
              }
            }
            if (c.newPillarThreeTestsByPublishDate != null) {
              data.tests3[data.tests3.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarThreeTestsByPublishDate],
                lines: []
              }
            }
            if (c.newPillarFourTestsByPublishDate != null) {
              data.tests4[data.tests4.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarFourTestsByPublishDate],
                lines: []
              }
            }
            data.testsTot[data.testsTot.length] = {
              date: c.date,
              day: rowDay,
              counts: [
                parseInt(c.newTests || 0),
                parseInt(c.newPillarOneTestsByPublishDate || 0),
                parseInt(c.newPillarTwoTestsByPublishDate || 0),
                parseInt(c.newPillarThreeTestsByPublishDate || 0),
                parseInt(c.newPillarFourTestsByPublishDate || 0)
              ],
              lines: []
            }

            if (c.hospitalCases != null) {
              data.patients[data.patients.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.hospitalCases],
                lines: [this.get7DayAverage(apiData, i, "hospitalCases")]
              }
            }
            if (c.newAdmissions != null) {
              data.admissions[data.admissions.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newAdmissions],
                lines: [this.get7DayAverage(apiData, i, "newAdmissions")]
              }
            }
            if (c.covidOccupiedMVBeds != null) {
              data.intensiveCare[data.intensiveCare.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.covidOccupiedMVBeds],
                lines: [this.get7DayAverage(apiData, i, "covidOccupiedMVBeds")]
              }
            }

            const admAgeRanges = ["0_to_5", "6_to_17", "18_to_64", "65_to_84", "85+"]
            const admByAge = [0, 0, 0, 0, 0]
            const admByAgePrev = [0, 0, 0, 0, 0]

            if (c.cumAdmissionsByAge != null) {
              c.cumAdmissionsByAge.forEach((age) => {
                const loc = admAgeRanges.indexOf(age.age)
                if (loc !== -1) {
                  admByAge[loc] = age.value
                }
              })
              if (d && d.cumAdmissionsByAge != null) {
                d.cumAdmissionsByAge.forEach((age) => {
                  const loc = admAgeRanges.indexOf(age.age)
                  if (loc !== -1) {
                    admByAgePrev[loc] = age.value
                  }
                })
              }

              data.admissionsByAge[data.admissionsByAge.length] = {
                date: c.date,
                day: rowDay,
                counts: [
                  admByAge[0] - admByAgePrev[0],
                  admByAge[1] - admByAgePrev[1],
                  admByAge[2] - admByAgePrev[2],
                  admByAge[3] - admByAgePrev[3],
                  admByAge[4] - admByAgePrev[4]
                ],
                lines: []
              }
            }
          }
        }
      }
    }

    return data
  }
}
