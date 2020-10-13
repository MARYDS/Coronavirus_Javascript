export default class Data {

  constructor(areaType, areaName) {
    this.areaType = areaType;
    this.areaName = areaName;
    this.weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
  }

  // Fetch data from the government API
  async getAPIData() {

    let filters = `areaType=${this.areaType}`
    if (this.areaName !== '') {
      filters += `;areaName=${this.areaName}`
    }

    const structure = {
      "areaType": "areaType",
      "areaName": "areaName",
      "areaCode": "areaCode",
      "date": "date",
      "newCasesByPublishDate": "newCasesByPublishDate",
      "cumCasesByPublishDate": "cumCasesByPublishDate",
      "cumCasesByPublishDateRate": "cumCasesByPublishDateRate",
      "newCasesBySpecimenDate": "newCasesBySpecimenDate",
      "cumCasesBySpecimenDate": "cumCasesBySpecimenDate",
      "cumCasesBySpecimenDateRate": "cumCasesBySpecimenDateRate",
      "maleCases": "maleCases",
      "femaleCases": "femaleCases",
      "newPillarOneTestsByPublishDate": "newPillarOneTestsByPublishDate",
      "cumPillarOneTestsByPublishDate": "cumPillarOneTestsByPublishDate",
      "newPillarTwoTestsByPublishDate": "newPillarTwoTestsByPublishDate",
      "cumPillarTwoTestsByPublishDate": "cumPillarTwoTestsByPublishDate",
      "newPillarThreeTestsByPublishDate": "newPillarThreeTestsByPublishDate",
      "cumPillarThreeTestsByPublishDate": "cumPillarThreeTestsByPublishDate",
      "newPillarFourTestsByPublishDate": "newPillarFourTestsByPublishDate",
      "cumPillarFourTestsByPublishDate": "cumPillarFourTestsByPublishDate",
      "newAdmissions": "newAdmissions", "cumAdmissions": "cumAdmissions",
      "cumAdmissionsByAge": "cumAdmissionsByAge",
      "cumTestsByPublishDate": "cumTestsByPublishDate",
      "newTestsByPublishDate": "newTestsByPublishDate",
      "covidOccupiedMVBeds": "covidOccupiedMVBeds",
      "hospitalCases": "hospitalCases",
      "plannedCapacityByPublishDate": "plannedCapacityByPublishDate",
      "newDeaths28DaysByPublishDate": "newDeaths28DaysByPublishDate",
      "cumDeaths28DaysByPublishDate": "cumDeaths28DaysByPublishDate",
      "cumDeaths28DaysByPublishDateRate": "cumDeaths28DaysByPublishDateRate",
      "newDeaths28DaysByDeathDate": "newDeaths28DaysByDeathDate",
      "cumDeaths28DaysByDeathDate": "cumDeaths28DaysByDeathDate",
      "cumDeaths28DaysByDeathDateRate": "cumDeaths28DaysByDeathDateRate",
    }

    const request = `
    https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
    `
    let response = await fetch(request);
    let results = await response.json();
    const requiredData = this.extractRequiredFields(results.data)
    response = null
    results = null
    return requiredData;
  }

  // Fetch todays or most recent death data from API
  // May vary by nation
  async getAPIDeathDataByLA(latest) {

    let deaths = []
    let count = 0

    const structure = {
      "locn": "areaName",
      "code": "areaCode",
      "date": "date",
      "count": "newDeaths28DaysByPublishDate",
    }

    while (deaths.length === 0 && count <= 3) {
      count = count + 1
      let filters = "areaType=ltla"
      filters += `;date=${latest}`

      const request = `
      https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
      `
      let response = await fetch(request);
      let results = await response.json();

      if (results.data === undefined) {
        break
      } else {
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

        if (deaths.length === 0) {
          const latestDate = new Date(latest)
          latestDate.setDate(latestDate.getDate() - 1)
          latest = '' + latestDate.getFullYear() + '-' + ("0" + (latestDate.getMonth() + 1)).slice(-2) + '-' + ("0" + latestDate.getDate()).slice(-2)
        }
      }
    }

    deaths.sort((a, b) => {
      if (b.count > a.count) return 1
      if (b.count < a.count) return -1
      return 0
    })
    let deathsByLocation = []
    deaths.forEach((locn) => {
      deathsByLocation.push({
        date: locn.date,
        location: locn.locn,
        code: locn.code,
        count1: locn.count
      })
    })
    return deathsByLocation;
  }

  // Fetch todays or most recent cases data from API
  // May vary by nation
  async getAPICaseDataByLA(latest) {

    const structure = {
      "locn": "areaName",
      "code": "areaCode",
      "date": "date",
      "count": "newCasesByPublishDate",
    }

    let cases = []
    let count = 0

    while (cases.length === 0 && count <= 3) {
      count = count + 1
      let filters = "areaType=ltla"
      filters += `;date=${latest}`

      const request = `
      https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
      `
      let response = await fetch(request);
      let results = await response.json();

      if (results.data === undefined) {
        break
      } else {
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

        if (cases.length === 0) {
          const latestDate = new Date(latest)
          latestDate.setDate(latestDate.getDate() - 1)
          latest = '' + latestDate.getFullYear() + '-' + ("0" + (latestDate.getMonth() + 1)).slice(-2) + '-' + ("0" + latestDate.getDate()).slice(-2)
        }
      }
    }

    cases.sort((a, b) => {
      if (b.count > a.count) return 1
      if (b.count < a.count) return -1
      return 0
    })
    let casesByLocation = []
    cases.forEach((locn) => {
      casesByLocation.push({
        date: locn.date,
        location: locn.locn,
        code: locn.code,
        count1: locn.count
      })
    })
    return casesByLocation;
  }

  // Fetch todays or most recent hospital data from API
  async getAPIHospitalDataByNHSRegion() {

    const structure = {
      "locn": "areaName",
      "code": "areaCode",
      "date": "date",
      "admissions": "newAdmissions",
      "intensiveCare": "covidOccupiedMVBeds",
      "patients": "hospitalCases"
    }

    const nhsRegions = ['East of England', 'London', 'Midlands',
      'North East and Yorkshire', 'North West', 'South East',
      'South West']

    let hosp = {}
    let region = ''

    // Retrieve data for each region and merge results
    for (let k = 0; k < nhsRegions.length; k++) {
      region = nhsRegions[k]
      let filters = "areaType=nhsRegion"
      filters += `;areaName=${region}`

      const request = `
      https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
      `
      let response = await fetch(request);
      let results = await response.json();

      if (results.data !== undefined && results.data != null) {
        for (let i = 0; i < results.data.length; i++) {
          const c = results.data[i]
          const rowDay = this.weekdays[(new Date(c.date)).getDay()]

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
              'admissionsEastOfEngland': null,
              'admissionsLondon': null,
              'admissionsMidlands': null,
              'admissionsNorthEastAndYorkshire': null,
              'admissionsNorthWest': null,
              'admissionsSouthEast': null,
              'admissionsSouthWest': null,
              'intensiveCareEastOfEngland': null,
              'intensiveCareLondon': null,
              'intensiveCareMidlands': null,
              'intensiveCareNorthEastAndYorkshire': null,
              'intensiveCareNorthWest': null,
              'intensiveCareSouthEast': null,
              'intensiveCareSouthWest': null,
            }
          }

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
      if (value.patientsEastOfEngland != null ||
        value.patientsLondon != null ||
        value.patientsMidlands != null ||
        value.patientsNorthEastAndYorkshire != null ||
        value.patientsNorthWest != null ||
        value.patientsSouthEast != null ||
        value.patientsSouthWest != null
      ) {
        hospital.patients[hospital.patients.length] = {
          'date': key,
          'day': value.day,
          'count1': value.patientsEastOfEngland,
          'count2': value.patientsLondon,
          'count3': value.patientsMidlands,
          'count4': value.patientsNorthEastAndYorkshire,
          'count5': value.patientsNorthWest,
          'count6': value.patientsSouthEast,
          'count7': value.patientsSouthWest,
        }
      }
      if (value.admissionsEastOfEngland != null ||
        value.admissionsLondon != null ||
        value.admissionsMidlands != null ||
        value.admissionsNorthEastAndYorkshire != null ||
        value.admissionsNorthWest != null ||
        value.admissionsSouthEast != null ||
        value.admissionsSouthWest != null
      ) {
        hospital.admissions[hospital.admissions.length] = {
          'date': key,
          'day': value.day,
          'count1': value.admissionsEastOfEngland,
          'count2': value.admissionsLondon,
          'count3': value.admissionsMidlands,
          'count4': value.admissionsNorthEastAndYorkshire,
          'count5': value.admissionsNorthWest,
          'count6': value.admissionsSouthEast,
          'count7': value.admissionsSouthWest,
        }
      }
      if (value.intensiveCareEastOfEngland != null ||
        value.intensiveCareLondon != null ||
        value.intensiveCareMidlands != null ||
        value.intensiveCareNorthEastAndYorkshire != null ||
        value.intensiveCareNorthWest != null ||
        value.intensiveCareSouthEast != null ||
        value.intensiveCareSouthWest != null
      ) {
        hospital.intensiveCare[hospital.intensiveCare.length] = {
          'date': key,
          'day': value.day,
          'count1': value.intensiveCareEastOfEngland,
          'count2': value.intensiveCareLondon,
          'count3': value.intensiveCareMidlands,
          'count4': value.intensiveCareNorthEastAndYorkshire,
          'count5': value.intensiveCareNorthWest,
          'count6': value.intensiveCareSouthEast,
          'count7': value.intensiveCareSouthWest,
        }
      }
    }

    return hospital;
  }

  extractRequiredFields(apiData) {

    const data = {
      dateLatest: null, deathsDate: null, deathsDateYMD: null, deathsNew: null, deathsCum: null, deathsRate: null, deathsDateAct: null, deathsNewAct: null, deathsCumAct: null, deathsRateAct: null, casesDate: null, casesDateYMD: null, casesNew: null, casesCum: null, casesRate: null, casesDateAct: null, casesNewAct: null, casesCumAct: null, casesRateAct: null, hospitalDate: null, hospitalNew: null, admissionsDate: null, admissionsNew: null, admissionsCum: null, intensiveCareDate: null, intensiveCareNew: null, testsDate: null, newP1: null, newP2: null, newP3: null, newP4: null, newTests: null, cumP1: null, cumP2: null, cumP3: null, cumP4: null, cumTests: null, deathsPub: [], deathsAct: [], casesPub: [], casesAct: [], tests1: [], tests2: [], tests3: [], tests4: [], testsTot: [], patients: [], admissions: [], intensiveCare: []
    }

    if (apiData !== undefined && apiData.length > 0) {

      data.dateLatest = apiData[0].date

      if (data.dateLatest != null) {
        for (let i = 0; i < apiData.length; i++) {
          const c = apiData[i]
          const rowDate = (new Date(c.date)).toLocaleDateString()
          const rowDay = this.weekdays[(new Date(c.date)).getDay()]

          // Get the latest values for each variable, may be on different dates
          // Deaths Published
          if (data.deathsNew == null && c.newDeaths28DaysByPublishDate != null) {
            data.deathsNew = (c.newDeaths28DaysByPublishDate || '').toLocaleString()
            data.deathsCum = (c.cumDeaths28DaysByPublishDate || '').toLocaleString()
            data.deathsRate = c.cumDeaths28DaysByPublishDateRate
            data.deathsDate = rowDate
            data.deathsDateYMD = c.date
          }
          // Deaths by Death Date
          if (data.deathsNewAct == null && c.newDeaths28DaysByDeathDate != null) {
            data.deathsNewAct = (c.newDeaths28DaysByDeathDate || '').toLocaleString()
            data.deathsCumAct = (c.cumDeaths28DaysByDeathDate || '').toLocaleString()
            data.deathsRateAct = c.cumDeaths28DaysByDeathDateRate
            data.deathsDateAct = rowDate
          }
          // Cases Published
          if (data.casesNew == null && c.newCasesByPublishDate != null) {
            data.casesNew = (c.newCasesByPublishDate || '').toLocaleString()
            data.casesCum = (c.cumCasesByPublishDate || '').toLocaleString()
            data.casesRate = c.cumCasesByPublishDateRate
            data.casesDate = rowDate
            data.casesDateYMD = c.date
          }
          // Cases by specimen date
          if (data.casesNewAct == null && c.newCasesBySpecimenDate != null) {
            data.casesNewAct = (c.newCasesBySpecimenDate || '').toLocaleString()
            data.casesCumAct = (c.cumCasesBySpecimenDate || '').toLocaleString()
            data.casesRateAct = c.cumCasesBySpecimenDateRate
            data.casesDateAct = rowDate
          }
          // Tests
          if (data.newP1 == null && c.newPillarOneTestsByPublishDate != null) {
            data.newP1 = (c.newPillarOneTestsByPublishDate || '').toLocaleString()
            data.newP2 = (c.newPillarTwoTestsByPublishDate || '').toLocaleString()
            data.newP3 = (c.newPillarThreeTestsByPublishDate || '').toLocaleString()
            data.newP4 = (c.newPillarFourTestsByPublishDate || '').toLocaleString()
            data.newTests = (parseInt(c.newPillarOneTestsByPublishDate || '0') +
              parseInt(c.newPillarTwoTestsByPublishDate || '0') +
              parseInt(c.newPillarThreeTestsByPublishDate || '0') +
              parseInt(c.newPillarFourTestsByPublishDate || '0')).toLocaleString()
            data.cumP1 = (c.cumPillarOneTestsByPublishDate || '').toLocaleString()
            data.cumP2 = (c.cumPillarTwoTestsByPublishDate || '').toLocaleString()
            data.cumP3 = (c.cumPillarThreeTestsByPublishDate || '').toLocaleString()
            data.cumP4 = (c.cumPillarFourTestsByPublishDate || '').toLocaleString()
            data.cumTests = (
              parseInt(c.cumPillarOneTestsByPublishDate || '0') +
              parseInt(c.cumPillarTwoTestsByPublishDate || '0') +
              parseInt(c.cumPillarThreeTestsByPublishDate || '0') +
              parseInt(c.cumPillarFourTestsByPublishDate || '0')).toLocaleString()
            data.testsDate = rowDate
          }

          // Hospital patients
          if (data.hospitalNew == null && c.hospitalCases != null) {
            data.hospitalNew = (c.hospitalCases).toLocaleString()
            data.hospitalDate = rowDate
          }
          // Hospital admissions
          if (data.admissionsNew == null && c.newAdmissions != null) {
            data.admissionsNew = (c.newAdmissions).toLocaleString()
            data.admissionsCum = (c.cumAdmissions || '').toLocaleString()
            data.admissionsDate = rowDate
          }
          // Intensive care
          if (data.intensiveCareNew == null && c.covidOccupiedMVBeds != null) {
            data.intensiveCareNew = (c.covidOccupiedMVBeds).toLocaleString()
            data.intensiveCareDate = rowDate
          }
          // Arrays of date / values after covid start date
          if (c.date >= '2020-03-01') {
            if (c.newDeaths28DaysByPublishDate != null) {
              data.deathsPub[data.deathsPub.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newDeaths28DaysByPublishDate
              }
            }
            if (c.newDeaths28DaysByDeathDate != null) {
              data.deathsAct[data.deathsAct.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newDeaths28DaysByDeathDate
              }
            }
            if (c.newCasesByPublishDate != null) {
              data.casesPub[data.casesPub.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newCasesByPublishDate
              }
            }
            if (c.newCasesBySpecimenDate != null) {
              data.casesAct[data.casesAct.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newCasesBySpecimenDate
              }
            }
            if (c.newPillarOneTestsByPublishDate != null) {
              data.tests1[data.tests1.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newPillarOneTestsByPublishDate
              }
            }
            if (c.newPillarTwoTestsByPublishDate != null) {
              data.tests2[data.tests2.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newPillarTwoTestsByPublishDate
              }
            }
            if (c.newPillarThreeTestsByPublishDate != null) {
              data.tests3[data.tests3.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newPillarThreeTestsByPublishDate
              }
            }
            if (c.newPillarFourTestsByPublishDate != null) {
              data.tests4[data.tests4.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newPillarFourTestsByPublishDate
              }
            }
            data.testsTot[data.testsTot.length] = {
              date: c.date,
              day: rowDay,
              count1: parseInt(c.newPillarOneTestsByPublishDate || 0) +
                parseInt(c.newPillarTwoTestsByPublishDate || 0) +
                parseInt(c.newPillarThreeTestsByPublishDate || 0) +
                parseInt(c.newPillarFourTestsByPublishDate || 0),
              count2: parseInt(c.newPillarOneTestsByPublishDate || 0),
              count3: parseInt(c.newPillarTwoTestsByPublishDate || 0),
              count4: parseInt(c.newPillarThreeTestsByPublishDate || 0),
              count5: parseInt(c.newPillarFourTestsByPublishDate || 0),
            }
            if (c.hospitalCases != null) {
              data.patients[data.patients.length] = {
                date: c.date,
                day: rowDay,
                count1: c.hospitalCases
              }
            }
            if (c.newAdmissions != null) {
              data.admissions[data.admissions.length] = {
                date: c.date,
                day: rowDay,
                count1: c.newAdmissions
              }
            }
            if (c.covidOccupiedMVBeds != null) {
              data.intensiveCare[data.intensiveCare.length] = {
                date: c.date,
                day: rowDay,
                count1: c.covidOccupiedMVBeds
              }
            }
          }
        }
      }
    }
    return data
  }
}

