export const structureAll = {
  "areaType": "areaType",
  "areaName": "areaName",
  "areaCode": "areaCode",
  "date": "date",
  "newCasesPub": "newCasesByPublishDate",
  "cumCasesPub": "cumCasesByPublishDate",
  "cumCasesPubRate": "cumCasesByPublishDateRate",
  "newCasesAct": "newCasesBySpecimenDate",
  "cumCasesAct": "cumCasesBySpecimenDate",
  "cumCasesActRate": "cumCasesBySpecimenDateRate",
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
  "newAdmissions": "newAdmissions",
  "cumAdmissions": "cumAdmissions",
  "cumAdmissionsByAge": "cumAdmissionsByAge",
  "cumTests": "cumTestsByPublishDate",
  "newTests": "newTestsByPublishDate",
  "covidOccupiedMVBeds": "covidOccupiedMVBeds",
  "hospitalCases": "hospitalCases",
  "plannedCapacityByPublishDate": "plannedCapacityByPublishDate",
  "newDeathsPub": "newDeaths28DaysByPublishDate",
  "cumDeathsPub": "cumDeaths28DaysByPublishDate",
  "cumDeathsPubRate": "cumDeaths28DaysByPublishDateRate",
  "newDeathsAct": "newDeaths28DaysByDeathDate",
  "cumDeathsAct": "cumDeaths28DaysByDeathDate",
  "cumDeathsActRate": "cumDeaths28DaysByDeathDateRate",
}

export const structureDeaths = {
  "locn": "areaName",
  "code": "areaCode",
  "date": "date",
  "count": "newDeaths28DaysByPublishDate",
}

export const structureCases = {
  "locn": "areaName",
  "code": "areaCode",
  "date": "date",
  "count": "newCasesByPublishDate",
}

export const structureHospital = {
  "locn": "areaName",
  "code": "areaCode",
  "date": "date",
  "admissions": "newAdmissions",
  "ventilatorBeds": "covidOccupiedMVBeds",
  "patients": "hospitalCases"
}

export const structureRegion = {
  "locn": "areaName",
  "code": "areaCode",
  "date": "date",
  "deaths": "newDeaths28DaysByPublishDate",
  "cases": "newCasesByPublishDate",
}