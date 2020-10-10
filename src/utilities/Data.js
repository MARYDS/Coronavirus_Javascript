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

    const page = "&page=1"
    const request = `
    https://api.coronavirus.data.gov.uk/v1/data?filters=${filters}&structure=${JSON.stringify(structure)}
    `
    const response = await fetch(request);
    const responseData = await response.json();
    return responseData;
  }

}

