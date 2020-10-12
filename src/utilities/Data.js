export default class Data {

  constructor(areaType, areaName) {
    this.areaType = areaType;
    this.areaName = areaName;
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

  // Fetch todays death data from API
  async getAPIDeathDataByLA(latest) {
    let filters = "areaType=ltla"
    filters += `;date=${latest}`

    const structure = {
      "locn": "areaName",
      "code": "areaCode",
      "date": "date",
      "count": "newDeaths28DaysByPublishDate",
    }

    const request = `
    https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
    `
    let response = await fetch(request);
    let results = await response.json();
    let deaths = results.data.filter(la => la.count !== 0)
    deaths.sort((a, b) => {
      if (b.count > a.count) return 1
      if (b.count < a.count) return -1
      return 0
    })
    let deathsByLocation = []
    deaths.forEach((locn) => {
      const prefix = locn.code.charAt(0)
      if (this.areaName === '' ||
        (this.areaName === 'England' && prefix === 'E') ||
        (this.areaName === 'Scotland' && prefix === 'S') ||
        (this.areaName === 'Wales' && prefix === 'W') ||
        (this.areaName === 'Northern Ireland' && prefix === 'N')) {
        deathsByLocation.push({
          date: locn.date,
          location: locn.locn,
          code: locn.code,
          count: locn.count
        })
      }
    })
    return deathsByLocation;
  }

  // Fetch todays cases data from API
  async getAPICaseDataByLA(latest) {
    let filters = "areaType=ltla"
    filters += `;date=${latest}`

    const structure = {
      "locn": "areaName",
      "code": "areaCode",
      "date": "date",
      "count": "newCasesByPublishDate",
    }

    const request = `
    https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
    `
    let response = await fetch(request);
    let results = await response.json();
    let cases = results.data.filter(la => la.count !== 0)
    cases.sort((a, b) => {
      if (b.count > a.count) return 1
      if (b.count < a.count) return -1
      return 0
    })
    let casesByLocation = []
    cases.forEach((locn) => {
      const prefix = locn.code.charAt(0)
      if (this.areaName === '' ||
        (this.areaName === 'England' && prefix === 'E') ||
        (this.areaName === 'Scotland' && prefix === 'S') ||
        (this.areaName === 'Wales' && prefix === 'W') ||
        (this.areaName === 'Northern Ireland' && prefix === 'N')) {
        casesByLocation.push({
          date: locn.date,
          location: locn.locn,
          code: locn.code,
          count: locn.count
        })
      }
    })
    return casesByLocation;
  }

  extractRequiredFields(apiData) {

    const data = {
      dateLatest: null, deathsDate: null, deathsDateYMD: null, deathsNew: null, deathsCum: null, deathsRate: null, deathsDateAct: null, deathsNewAct: null, deathsCumAct: null, deathsRateAct: null, casesDate: null, casesDateYMD: null, casesNew: null, casesCum: null, casesRate: null, casesDateAct: null, casesNewAct: null, casesCumAct: null, casesRateAct: null, hospitalDate: null, hospitalNew: null, admissionsDate: null, admissionsNew: null, admissionsCum: null, intensiveCareDate: null, intensiveCareNew: null, testsDate: null, newP1: null, newP2: null, newP3: null, newP4: null, newTests: null, cumP1: null, cumP2: null, cumP3: null, cumP4: null, cumTests: null, deathsPub: [], deathsAct: [], casesPub: [], casesAct: [], tests1: [], tests2: [], tests3: [], tests4: [], testsTot: [], patients: [], admissions: [], intensiveCare: []
    }

    if (apiData !== undefined && apiData.length > 0) {

      const weekdays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
      data.dateLatest = apiData[0].date

      if (data.dateLatest != null) {
        for (let i = 0; i < apiData.length; i++) {
          const c = apiData[i]
          const rowDate = (new Date(c.date)).toLocaleDateString()
          const rowDay = weekdays[(new Date(c.date)).getDay()]

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
                count: c.newDeaths28DaysByPublishDate
              }
            }
            if (c.newDeaths28DaysByDeathDate != null) {
              data.deathsAct[data.deathsAct.length] = {
                date: c.date,
                day: rowDay,
                count: c.newDeaths28DaysByDeathDate
              }
            }
            if (c.newCasesByPublishDate != null) {
              data.casesPub[data.casesPub.length] = {
                date: c.date,
                day: rowDay,
                count: c.newCasesByPublishDate
              }
            }
            if (c.newCasesBySpecimenDate != null) {
              data.casesAct[data.casesAct.length] = {
                date: c.date,
                day: rowDay,
                count: c.newCasesBySpecimenDate
              }
            }
            if (c.newPillarOneTestsByPublishDate != null) {
              data.tests1[data.tests1.length] = {
                date: c.date,
                day: rowDay,
                count: c.newPillarOneTestsByPublishDate
              }
            }
            if (c.newPillarTwoTestsByPublishDate != null) {
              data.tests2[data.tests2.length] = {
                date: c.date,
                day: rowDay,
                count: c.newPillarTwoTestsByPublishDate
              }
            }
            if (c.newPillarThreeTestsByPublishDate != null) {
              data.tests3[data.tests3.length] = {
                date: c.date,
                day: rowDay,
                count: c.newPillarThreeTestsByPublishDate
              }
            }
            if (c.newPillarFourTestsByPublishDate != null) {
              data.tests4[data.tests4.length] = {
                date: c.date,
                day: rowDay,
                count: c.newPillarFourTestsByPublishDate
              }
            }
            data.testsTot[data.testsTot.length] = {
              date: c.date,
              day: rowDay,
              count: parseInt(c.newPillarOneTestsByPublishDate || 0) +
                parseInt(c.newPillarTwoTestsByPublishDate || 0) +
                parseInt(c.newPillarThreeTestsByPublishDate || 0) +
                parseInt(c.newPillarFourTestsByPublishDate || 0)
            }
            if (c.hospitalCases != null) {
              data.patients[data.patients.length] = {
                date: c.date,
                day: rowDay,
                count: c.hospitalCases
              }
            }
            if (c.newAdmissions != null) {
              data.admissions[data.admissions.length] = {
                date: c.date,
                day: rowDay,
                count: c.newAdmissions
              }
            }
            if (c.covidOccupiedMVBeds != null) {
              data.intensiveCare[data.intensiveCare.length] = {
                date: c.date,
                day: rowDay,
                count: c.covidOccupiedMVBeds
              }
            }
          }
        }
      }
    }
    return data
  }
}

