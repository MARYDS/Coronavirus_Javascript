import { structureAll, structureDeaths, structureCases, structureHospital } from './DataStructures'
import { apiUrl, weekdays, ukRegions } from './Utils'

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
    for (let k = 0; k < ukRegions.length; k++) {
      region = ukRegions[k]

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
              'patientsEastOfEngland': null,
              'patientsLondon': null,
              'patientsMidlands': null,
              'patientsNorthEastAndYorkshire': null,
              'patientsNorthWest': null,
              'patientsSouthEast': null,
              'patientsSouthWest': null,
              'patientsScotland': null,
              'patientsWales': null,
              'patientsNorthernIreland': null,
              'admissionsEastOfEngland': null,
              'admissionsLondon': null,
              'admissionsMidlands': null,
              'admissionsNorthEastAndYorkshire': null,
              'admissionsNorthWest': null,
              'admissionsSouthEast': null,
              'admissionsSouthWest': null,
              'admissionsScotland': null,
              'admissionsWales': null,
              'admissionsNorthernIreland': null,
              'intensiveCareEastOfEngland': null,
              'intensiveCareLondon': null,
              'intensiveCareMidlands': null,
              'intensiveCareNorthEastAndYorkshire': null,
              'intensiveCareNorthWest': null,
              'intensiveCareSouthEast': null,
              'intensiveCareSouthWest': null,
              'intensiveCareScotland': null,
              'intensiveCareWales': null,
              'intensiveCareNorthernIreland': null,
            }
          }

          // Add current region's data to appropriate slots
          switch (region) {
            case 'East of England': {
              hosp[c.date]['patientsEastOfEngland'] = c.patients
              hosp[c.date]['admissionsEastOfEngland'] = c.admissions
              hosp[c.date]['intensiveCareEastOfEngland'] = c.intensiveCare
              break
            }
            case 'London': {
              hosp[c.date]['patientsLondon'] = c.patients
              hosp[c.date]['admissionsLondon'] = c.admissions
              hosp[c.date]['intensiveCareLondon'] = c.intensiveCare
              break
            }
            case 'Midlands': {
              hosp[c.date]['patientsMidlands'] = c.patients
              hosp[c.date]['admissionsMidlands'] = c.admissions
              hosp[c.date]['intensiveCareMidlands'] = c.intensiveCare
              break
            }
            case 'North East and Yorkshire': {
              hosp[c.date]['patientsNorthEastAndYorkshire'] = c.patients
              hosp[c.date]['admissionsNorthEastAndYorkshire'] = c.admissions
              hosp[c.date]['intensiveCareNorthEastAndYorkshire'] = c.intensiveCare
              break
            }
            case 'North West': {
              hosp[c.date]['patientsNorthWest'] = c.patients
              hosp[c.date]['admissionsNorthWest'] = c.admissions
              hosp[c.date]['intensiveCareNorthWest'] = c.intensiveCare
              break
            }
            case 'South East': {
              hosp[c.date]['patientsSouthEast'] = c.patients
              hosp[c.date]['admissionsSouthEast'] = c.admissions
              hosp[c.date]['intensiveCareSouthEast'] = c.intensiveCare
              break
            }
            case 'South West': {
              hosp[c.date]['patientsSouthWest'] = c.patients
              hosp[c.date]['admissionsSouthWest'] = c.admissions
              hosp[c.date]['intensiveCareSouthWest'] = c.intensiveCare
              break
            }
            case 'Scotland': {
              hosp[c.date]['patientsScotland'] = c.patients
              hosp[c.date]['admissionsScotland'] = c.admissions
              hosp[c.date]['intensiveCareScotland'] = c.intensiveCare
              break
            }
            case 'Wales': {
              hosp[c.date]['patientsWales'] = c.patients
              hosp[c.date]['admissionsWales'] = c.admissions
              hosp[c.date]['intensiveCareWales'] = c.intensiveCare
              break
            }
            case 'Northern Ireland': {
              hosp[c.date]['patientsNorthernIreland'] = c.patients
              hosp[c.date]['admissionsNorthernIreland'] = c.admissions
              hosp[c.date]['intensiveNorthernIreland'] = c.intensiveCare
              break
            }
            default: {

            }
          }
        }
      }
    }

    // Split out patients, admissions, intensiveCare
    let hospital = {
      patients: [],
      admissions: [],
      intensiveCare: []
    }

    for (const [key, value] of Object.entries(hosp)) {
      if (
        value.patientsEastOfEngland || value.patientsLondon ||
        value.patientsMidlands || value.patientsNorthEastAndYorkshire ||
        value.patientsNorthWest || value.patientsSouthEast ||
        value.patientsSouthWest || value.patientsScotland ||
        value.patientsWales || value.patientsNorthernIreland
      ) {
        hospital.patients[hospital.patients.length] = {
          'date': key,
          'day': value.day,
          'counts': [
            value.patientsEastOfEngland,
            value.patientsLondon,
            value.patientsMidlands,
            value.patientsNorthEastAndYorkshire,
            value.patientsNorthWest,
            value.patientsSouthEast,
            value.patientsSouthWest,
            value.patientsScotland,
            value.patientsWales,
            value.patientsNorthernIreland
          ]
        }
      }
      if (
        value.admissionsEastOfEngland || value.admissionsLondon ||
        value.admissionsMidlands || value.admissionsNorthEastAndYorkshire ||
        value.admissionsNorthWest || value.admissionsSouthEast ||
        value.admissionsSouthWest || value.admissionsScotland ||
        value.admissionsWales || value.admissionsNorthernIreland
      ) {
        hospital.admissions[hospital.admissions.length] = {
          'date': key,
          'day': value.day,
          'counts': [
            value.admissionsEastOfEngland,
            value.admissionsLondon,
            value.admissionsMidlands,
            value.admissionsNorthEastAndYorkshire,
            value.admissionsNorthWest,
            value.admissionsSouthEast,
            value.admissionsSouthWest,
            value.admissionsScotland,
            value.admissionsWales,
            value.admissionsNorthernIreland
          ]
        }
      }
      if (
        value.intensiveCareEastOfEngland || value.intensiveCareLondon ||
        value.intensiveCareMidlands || value.intensiveCareNorthEastAndYorkshire ||
        value.intensiveCareNorthWest || value.intensiveCareSouthEast ||
        value.intensiveCareSouthWest || value.intensiveCareScotland ||
        value.intensiveCareWales || value.intensiveCareNorthernIreland
      ) {
        hospital.intensiveCare[hospital.intensiveCare.length] = {
          'date': key,
          'day': value.day,
          'counts': [
            value.intensiveCareEastOfEngland,
            value.intensiveCareLondon,
            value.intensiveCareMidlands,
            value.intensiveCareNorthEastAndYorkshire,
            value.intensiveCareNorthWest,
            value.intensiveCareSouthEast,
            value.intensiveCareSouthWest,
            value.intensiveCareScotland,
            value.intensiveCareWales,
            value.intensiveCareNorthernIreland
          ]
        }
      }
    }

    return hospital;
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
          val = apiData[a].newCasesPub
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
      dateLatest: null, deathsDate: null, deathsDateYMD: null, deathsNew: null, deathsCum: null, deathsRate: null, deathsAverage: null, deathsDateAct: null, deathsNewAct: null, deathsCumAct: null, deathsRateAct: null, deathsAverageAct: null, casesDate: null, casesDateYMD: null, casesNew: null, casesCum: null, casesRate: null, casesAverage: null, casesDateAct: null, casesNewAct: null, casesCumAct: null, casesRateAct: null, casesAverageAct: null, hospitalDate: null, hospitalNew: null, hospitalAverage: null, admissionsDate: null, admissionsNew: null, admissionsCum: null, admissionsAverage: null, intensiveCareDate: null, intensiveCareNew: null, intensiveCareAverage: null, testsDate: null, newP1: null, newP2: null, newP3: null, newP4: null, newTests: null, cumP1: null, cumP2: null, cumP3: null, cumP4: null, cumTests: null, deathsPub: [], deathsAct: [], casesPub: [], casesAct: [], tests1: [], tests2: [], tests3: [], tests4: [], testsTot: [], patients: [], admissions: [], admissionsByAge: [], intensiveCare: []
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
          if (data.deathsNew == null && c.newDeathsPub) {
            data.deathsNew = (c.newDeathsPub || '').toLocaleString()
            data.deathsCum = (c.cumDeathsPub || '').toLocaleString()
            data.deathsRate = c.cumDeathsPubRate
            data.deathsDate = rowDate
            data.deathsDateYMD = c.date
            data.deathsAverage = this.get7DayAverage(apiData, i, "newDeathsPub")
              .toLocaleString()
          }

          // Deaths by Death Date - Set if not already set
          if (data.deathsNewAct == null && c.newDeathsAct) {
            data.deathsNewAct = (c.newDeathsAct || '').toLocaleString()
            data.deathsCumAct = (c.cumDeathsAct || '').toLocaleString()
            data.deathsRateAct = c.cumDeathsActRate
            data.deathsDateAct = rowDate
            data.deathsAverageAct = this.get7DayAverage(apiData, i, "newDeathsAct")
              .toLocaleString()
          }

          // Cases Published - Set if not already set
          if (data.casesNew == null && c.newCasesPub) {
            data.casesNew = (c.newCasesPub || '').toLocaleString()
            data.casesCum = (c.cumCasesPub || '').toLocaleString()
            data.casesRate = c.cumCasesPubRate
            data.casesDate = rowDate
            data.casesDateYMD = c.date
            data.casesAverage = this.get7DayAverage(apiData, i, "newCasesPub")
              .toLocaleString()
          }
          // Cases by specimen date - Set if not already set
          if (data.casesNewAct == null && c.newCasesAct) {
            data.casesNewAct = (c.newCasesAct || '').toLocaleString()
            data.casesCumAct = (c.cumCasesAct || '').toLocaleString()
            data.casesRateAct = c.cumCasesActRate
            data.casesDateAct = rowDate
            data.casesAverageAct = this.get7DayAverage(apiData, i, "newCasesAct")
              .toLocaleString()
          }
          // Tests - Set if not already set
          if (data.newP1 == null &&
            (c.newPillarOneTestsByPublishDate || c.newPillarTwoTestsByPublishDate ||
              c.newPillarThreeTestsByPublishDate || c.newPillarFourTestsByPublishDate)) {
            data.newP1 = (c.newPillarOneTestsByPublishDate || '').toLocaleString()
            data.newP2 = (c.newPillarTwoTestsByPublishDate || '').toLocaleString()
            data.newP3 = (c.newPillarThreeTestsByPublishDate || '').toLocaleString()
            data.newP4 = (c.newPillarFourTestsByPublishDate || '').toLocaleString()
            data.newTests = c.newTests.toLocaleString()
            data.cumP1 = (c.cumPillarOneTestsByPublishDate || '').toLocaleString()
            data.cumP2 = (c.cumPillarTwoTestsByPublishDate || '').toLocaleString()
            data.cumP3 = (c.cumPillarThreeTestsByPublishDate || '').toLocaleString()
            data.cumP4 = (c.cumPillarFourTestsByPublishDate || '').toLocaleString()
            data.cumTests = c.cumTests.toLocaleString()
            data.testsDate = rowDate
          }

          // Hospital patients - Set if not already set
          if (data.hospitalNew == null && c.hospitalCases) {
            data.hospitalNew = (c.hospitalCases).toLocaleString()
            data.hospitalDate = rowDate
            data.hospitalAverage = this.get7DayAverage(apiData, i, "hospitalCases")
              .toLocaleString()
          }
          // Hospital admissions - Set if not already set
          if (data.admissionsNew == null && c.newAdmissions) {
            data.admissionsNew = (c.newAdmissions).toLocaleString()
            data.admissionsCum = (c.cumAdmissions || '').toLocaleString()
            data.admissionsDate = rowDate
            data.admissionsAverage = this.get7DayAverage(apiData, i, "newAdmissions")
              .toLocaleString()
          }

          // Intensive care - Set if not already set
          if (data.intensiveCareNew == null && c.covidOccupiedMVBeds) {
            data.intensiveCareNew = (c.covidOccupiedMVBeds).toLocaleString()
            data.intensiveCareDate = rowDate
            data.intensiveCareAverage = this.get7DayAverage(apiData, i, "covidOccupiedMVBeds")
              .toLocaleString()
          }

          // Arrays of date / values after covid start date
          if (c.date >= '2020-03-01') {

            if (c.newDeathsPub) {
              data.deathsPub[data.deathsPub.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newDeathsPub],
                rate: c.cumDeathsPubRate,
                lines: [this.get7DayAverage(apiData, i, "newDeathsPub")]
              }
            }
            if (c.newDeathsAct) {
              data.deathsAct[data.deathsAct.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newDeathsAct],
                rate: c.cumDeathsActRate,
                lines: [this.get7DayAverage(apiData, i, "newDeathsAct")],
              }
            }
            if (c.newCasesPub) {
              data.casesPub[data.casesPub.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newCasesPub],
                rate: c.cumCasesPubRate,
                lines: [this.get7DayAverage(apiData, i, "newCasesPub")],
              }
            }
            if (c.newCasesAct) {
              data.casesAct[data.casesAct.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newCasesAct],
                rate: c.cumCasesActRate,
                lines: [this.get7DayAverage(apiData, i, "newCasesAct")],
              }
            }
            if (c.newPillarOneTestsByPublishDate) {
              data.tests1[data.tests1.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarOneTestsByPublishDate],
                lines: []
              }
            }
            if (c.newPillarTwoTestsByPublishDate) {
              data.tests2[data.tests2.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarTwoTestsByPublishDate],
                lines: []
              }
            }
            if (c.newPillarThreeTestsByPublishDate) {
              data.tests3[data.tests3.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newPillarThreeTestsByPublishDate],
                lines: []
              }
            }
            if (c.newPillarFourTestsByPublishDate) {
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

            if (c.hospitalCases) {
              data.patients[data.patients.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.hospitalCases],
                lines: [this.get7DayAverage(apiData, i, "hospitalCases")]
              }
            }
            if (c.newAdmissions) {
              data.admissions[data.admissions.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.newAdmissions],
                lines: [this.get7DayAverage(apiData, i, "newAdmissions")]
              }
            }
            if (c.covidOccupiedMVBeds) {
              data.intensiveCare[data.intensiveCare.length] = {
                date: c.date,
                day: rowDay,
                counts: [c.covidOccupiedMVBeds],
                lines: [this.get7DayAverage(apiData, i, "covidOccupiedMVBeds")]
              }
            }
            if (c.cumAdmissionsByAge) {
              const admByAge = [0, 0, 0, 0, 0]
              c.cumAdmissionsByAge.forEach((age) => {
                switch (age.age) {
                  case "0_to_5":
                    admByAge[0] = age.value
                    break
                  case "6_to_17":
                    admByAge[1] = age.value
                    break
                  case "18_to_64":
                    admByAge[2] = age.value
                    break
                  case "65_to_84":
                    admByAge[3] = age.value
                    break
                  case "85+":
                    admByAge[4] = age.value
                    break
                  default:
                }
              })
              const admByAgePrev = [0, 0, 0, 0, 0]
              if (d && d.cumAdmissionsByAge) {
                d.cumAdmissionsByAge.forEach((age) => {
                  switch (age.age) {
                    case "0_to_5":
                      admByAgePrev[0] = age.value
                      break
                    case "6_to_17":
                      admByAgePrev[1] = age.value
                      break
                    case "18_to_64":
                      admByAgePrev[2] = age.value
                      break
                    case "65_to_84":
                      admByAgePrev[3] = age.value
                      break
                    case "85+":
                      admByAgePrev[4] = age.value
                      break
                    default:
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

