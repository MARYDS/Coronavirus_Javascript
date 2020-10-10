import React, { useState, useEffect } from 'react'
import Data from '../utilities/Data'
import Deaths from '../components/Deaths'
import Cases from '../components/Cases'
import Tests from '../components/Tests'
import Hospital from '../components/Hospital'
import Admissions from '../components/Admissions'
import IntensiveCare from '../components/IntensiveCare'
import Input from '../components/Input'
import { compare } from '../utilities/Utils'
import './App.css'

function App() {

  const [areaType, setAreaType] = useState('overview');
  const [areaName, setAreaName] = useState('');
  const [apiData, setAPIData] = useState([{}])
  let dateLatest = null
  let deathsDate = null
  let deathsLatest = null
  let deathsCum = null
  let deathsRate = null
  let deathsDateActual = null
  let deathsLatestActual = null
  let deathsCumActual = null
  let deathsRateActual = null
  let casesDate = null
  let casesLatest = null
  let casesCum = null
  let casesRate = null
  let casesDateActual = null
  let casesLatestActual = null
  let casesCumActual = null
  let casesRateActual = null
  let hospitalDate = null
  let hospitalLatest = null
  let admissionsDate = null
  let admissionsLatest = null
  let admissionsCum = null
  let intensiveCareDate = null
  let intensiveCareLatest = null
  let testsDate = null
  let testsP1 = null
  let testsP2 = null
  let testsP3 = null
  let testsP4 = null
  let totalPillars = null
  let cumTestsP1 = null
  let cumTestsP2 = null
  let cumTestsP3 = null
  let cumTestsP4 = null
  let cumTotalPillars = null
  let deaths = []
  let deathsActual = []
  let cases = []
  let casesActual = []
  let tests1 = []
  let tests2 = []
  let tests3 = []
  let tests4 = []
  let totalTests = []
  let patients = []
  let admissions = []
  let intensiveCare = []

  useEffect(() => {
    const data = new Data(areaType, areaName)
    data
      .getAPIData()
      .then((results) => {
        setAPIData(results.data)
      })
      .catch((err) => console.log(err))
  }, [areaType, areaName]);

  const updateAreaTypeAndName = (newAreaType, newAreaName) => {
    setAreaType(newAreaType)
    setAreaName(newAreaName)
  }

  if (apiData !== undefined && apiData.length > 0) {

    dateLatest = apiData[0].date

    if (dateLatest != null) {
      for (let i = 0; i < apiData.length; i++) {
        const c = apiData[i]
        const rowDate = (new Date(c.date)).toLocaleDateString()

        // Get the latest values for each variable, may be on different dates
        // Deaths Published
        if (deathsLatest == null && c.newDeaths28DaysByPublishDate != null) {
          deathsLatest = (c.newDeaths28DaysByPublishDate || '').toLocaleString()
          deathsCum = (c.cumDeaths28DaysByPublishDate || '').toLocaleString()
          deathsRate = c.cumDeaths28DaysByPublishDateRate
          deathsDate = rowDate
        }
        // Deaths by Death Date
        if (deathsLatestActual == null && c.newDeaths28DaysByDeathDate != null) {
          deathsLatestActual = (c.newDeaths28DaysByDeathDate || '').toLocaleString()
          deathsCumActual = (c.cumDeaths28DaysByDeathDate || '').toLocaleString()
          deathsRateActual = c.cumDeaths28DaysByDeathDateRate
          deathsDateActual = rowDate
        }
        // Cases Published
        if (casesLatest == null && c.newCasesByPublishDate != null) {
          casesLatest = (c.newCasesByPublishDate || '').toLocaleString()
          casesCum = (c.cumCasesByPublishDate || '').toLocaleString()
          casesRate = c.cumCasesByPublishDateRate
          casesDate = rowDate
        }
        // Cases by specimen date
        if (casesLatestActual == null && c.newCasesBySpecimenDate != null) {
          casesLatestActual = (c.newCasesBySpecimenDate || '').toLocaleString()
          casesCumActual = (c.cumCasesBySpecimenDate || '').toLocaleString()
          casesRateActual = c.cumCasesBySpecimenDateRate
          casesDateActual = rowDate
        }
        // Tests
        if (testsP1 == null && c.newPillarOneTestsByPublishDate != null) {
          testsP1 = (c.newPillarOneTestsByPublishDate || '').toLocaleString()
          testsP2 = (c.newPillarTwoTestsByPublishDate || '').toLocaleString()
          testsP3 = (c.newPillarThreeTestsByPublishDate || '').toLocaleString()
          testsP4 = (c.newPillarFourTestsByPublishDate || '').toLocaleString()
          totalPillars = (parseInt(c.newPillarOneTestsByPublishDate || '0') +
            parseInt(c.newPillarTwoTestsByPublishDate || '0') +
            parseInt(c.newPillarThreeTestsByPublishDate || '0') +
            parseInt(c.newPillarFourTestsByPublishDate || '0')).toLocaleString()
          cumTestsP1 = (c.cumPillarOneTestsByPublishDate || '').toLocaleString()
          cumTestsP2 = (c.cumPillarTwoTestsByPublishDate || '').toLocaleString()
          cumTestsP3 = (c.cumPillarThreeTestsByPublishDate || '').toLocaleString()
          cumTestsP4 = (c.cumPillarFourTestsByPublishDate || '').toLocaleString()
          cumTotalPillars = (
            parseInt(c.cumPillarOneTestsByPublishDate || '0') +
            parseInt(c.cumPillarTwoTestsByPublishDate || '0') +
            parseInt(c.cumPillarThreeTestsByPublishDate || '0') +
            parseInt(c.cumPillarFourTestsByPublishDate || '0')).toLocaleString()
          testsDate = rowDate
        }

        // Hospital patients
        if (hospitalLatest == null && c.hospitalCases != null) {
          hospitalLatest = (c.hospitalCases).toLocaleString()
          hospitalDate = rowDate
        }
        // Hospital admissions
        if (admissionsLatest == null && c.newAdmissions != null) {
          admissionsLatest = (c.newAdmissions).toLocaleString()
          admissionsCum = (c.cumAdmissions || '').toLocaleString()
          admissionsDate = rowDate
        }
        // Intensive care
        if (intensiveCareLatest == null && c.covidOccupiedMVBeds != null) {
          intensiveCareLatest = (c.covidOccupiedMVBeds).toLocaleString()
          intensiveCareDate = rowDate
        }

        // Arrays of date / values after covid start date
        if (c.date >= '2020-03-01') {
          if (c.newDeaths28DaysByPublishDate != null) {
            deaths[deaths.length] = {
              date: c.date,
              count: c.newDeaths28DaysByPublishDate
            }
          }
          if (c.newDeaths28DaysByDeathDate != null) {
            deathsActual[deathsActual.length] = {
              date: c.date,
              count: c.newDeaths28DaysByDeathDate
            }
          }
          if (c.newCasesByPublishDate != null) {
            cases[cases.length] = {
              date: c.date,
              count: c.newCasesByPublishDate
            }
          }
          if (c.newCasesBySpecimenDate != null) {
            casesActual[casesActual.length] = {
              date: c.date,
              count: c.newCasesBySpecimenDate
            }
          }
          if (c.newPillarOneTestsByPublishDate != null) {
            tests1[tests1.length] = {
              date: c.date,
              count: c.newPillarOneTestsByPublishDate
            }
          }
          if (c.newPillarTwoTestsByPublishDate != null) {
            tests2[tests2.length] = {
              date: c.date,
              count: c.newPillarTwoTestsByPublishDate
            }
          }
          if (c.newPillarThreeTestsByPublishDate != null) {
            tests3[tests3.length] = {
              date: c.date,
              count: c.newPillarThreeTestsByPublishDate
            }
          }
          if (c.newPillarFourTestsByPublishDate != null) {
            tests4[tests4.length] = {
              date: c.date,
              count: c.newPillarFourTestsByPublishDate
            }
          }
          totalTests[totalTests.length] = {
            date: c.date,
            count: parseInt(c.newPillarOneTestsByPublishDate || 0) +
              parseInt(c.newPillarTwoTestsByPublishDate || 0) +
              parseInt(c.newPillarThreeTestsByPublishDate || 0) +
              parseInt(c.newPillarFourTestsByPublishDate || 0)
          }
          if (c.hospitalCases != null) {
            patients[patients.length] = {
              date: c.date,
              count: c.hospitalCases
            }
          }
          if (c.newAdmissions != null) {
            admissions[admissions.length] = {
              date: c.date,
              count: c.newAdmissions
            }
          }
          if (c.covidOccupiedMVBeds != null) {
            intensiveCare[intensiveCare.length] = {
              date: c.date,
              count: c.covidOccupiedMVBeds
            }
          }
        }
      }
    }
  }

  return (
    <div className="App">
      <h1 className="display-4 text-center">Coronavirus {areaName == '' ? 'UK' : areaName}</h1>
      <div className="container-fluid">
        <div className="row mb-3">
          <Input areaType={areaType} areaName={areaName}
            updateAreaTypeAndName={updateAreaTypeAndName} />
        </div>
        {
          (areaType === 'nhsRegion')
            ? null
            :
            <div className="row mb-3">
              <Deaths
                date={deathsDate}
                latest={deathsLatest}
                cumulative={deathsCum}
                rate={deathsRate}
                deaths={deaths}
                dateActual={deathsDateActual}
                latestActual={deathsLatestActual}
                cumulativeActual={deathsCumActual}
                rateActual={deathsRateActual}
                deathsActual={deathsActual}
              />
              <Cases
                date={casesDate}
                latest={casesLatest}
                cumulative={casesCum}
                rate={casesRate}
                cases={cases}
                dateActual={casesDateActual}
                latestActual={casesLatestActual}
                cumulativeActual={casesCumActual}
                rateActual={casesRateActual}
                casesActual={casesActual}
              />
              {
                (areaType === 'region' || areaType === 'ltla' || areaType === "utla")
                  ? null
                  :
                  <Tests
                    date={testsDate}
                    piller1={testsP1}
                    piller2={testsP2}
                    piller3={testsP3}
                    piller4={testsP4}
                    total={totalPillars}
                    cumPiller1={cumTestsP1}
                    cumPiller2={cumTestsP2}
                    cumPiller3={cumTestsP3}
                    cumPiller4={cumTestsP4}
                    cumPillerTotal={cumTotalPillars}
                    tests1={tests1}
                    tests2={tests2}
                    tests3={tests3}
                    tests4={tests4}
                    testsTotal={totalTests}
                  />
              }
            </div>
        }
        {
          (areaType === 'region' || areaType === 'ltla' || areaType === "utla")
            ? null
            :
            <div className="row mb-3">
              <Hospital
                date={hospitalDate}
                latest={hospitalLatest}
                patients={patients}
              />
              <Admissions
                date={admissionsDate}
                latest={admissionsLatest}
                cumulative={admissionsCum}
                admissions={admissions}
              />
              <IntensiveCare
                date={intensiveCareDate}
                latest={intensiveCareLatest}
                intensiveCare={intensiveCare}
              />
            </div>
        }
      </div>
    </div>
  );
}

export default App;
