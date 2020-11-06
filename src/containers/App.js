import React, { useState, useEffect } from 'react'
import Data from '../utilities/Data'
import Deaths from '../components/Deaths'
import Cases from '../components/Cases'
import Tests from '../components/Tests'
import Hospital from '../components/Hospital'
import Admissions from '../components/Admissions'
import VentilatorBeds from '../components/VentilatorBeds'
import WorldWideDeaths from '../components/WorldWideDeaths'
import WorldWideCases from '../components/WorldWideCases'
import Footer from '../components/Footer'
import Input from '../components/Input'
import './App.css'

function App() {

  const [areaType, setAreaType] = useState('overview')
  const [areaName, setAreaName] = useState('')
  const [apiData, setAPIData] = useState({})
  const [apiCaseData, setAPICaseData] = useState([])
  const [apiDeathData, setAPIDeathData] = useState([])
  const [apiHospitalData, setAPIHospitalData] = useState({})
  const [apiRegionData, setAPIRegionData] = useState({})
  const [apiNationData, setAPINationData] = useState({})
  const [ecdcCountryData, setECDCCountryData] = useState({})
  const [noData, setNoData] = useState(false)

  useEffect(() => {
    if (areaType !== 'world') {
      let data = new Data(areaType, areaName)
      data
        .getAPIData()
        .then((response) => {
          setAPIData(response)
          setNoData(false)
        })
        .catch((err) => {
          console.log(err)
          setNoData(true)
        })
        .then(() => {
          data = null
        })
    }
  }, [areaType, areaName]);

  useEffect(() => {
    let data = new Data()
    data
      .getAPIHospitalDataByNHSRegion()
      .then((response) => {
        setAPIHospitalData(response)
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        data = null
      })
  }, []);

  useEffect(() => {
    let data = new Data(areaType, areaName)
    if (apiData !== undefined && apiData.casesDateYMD != null) {
      data
        .getAPICaseDataByLA(apiData.casesDateYMD, apiData.areaName)
        .then((response) => {
          setAPICaseData(response)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          data = null
        })
    }
    if (apiData !== undefined && apiData.deathsDateYMD != null) {
      data
        .getAPIDeathDataByLA(apiData.deathsDateYMD, apiData.areaName)
        .then((response) => {
          setAPIDeathData(response)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          data = null
        })
    }
  }, [apiData.deathsDate, apiData.casesDate, areaType, areaName]);

  useEffect(() => {
    let data = new Data()
    data
      .getAPINationData()
      .then((response) => {
        setAPINationData(response)
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        data = null
      })
  }, []);

  useEffect(() => {
    let data = new Data()
    data
      .getAPIRegionData()
      .then((response) => {
        setAPIRegionData(response)
      })
      .catch((err) => {
        console.log(err)
      })
      .then(() => {
        data = null
      })
  }, []);

  useEffect(() => {
    if (areaType === 'world' || ecdcCountryData === {}) {
      let data = new Data()
      data
        .getECDCData()
        .then((response) => {
          setECDCCountryData(response)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          data = null
        })
    }
  }, [areaType]);

  const updateAreaTypeAndName = (newAreaType, newAreaName) => {
    setAreaType(newAreaType)
    setAreaName(newAreaName)
  }

  return (
    <div className="App bg-dark">

      <h1 className="heading display-md-1 text-center text-light p-2">
        Coronavirus {areaType === 'world' ? 'World' : areaName === '' ? 'UK' : areaName}
      </h1>
      {(noData)
        ?
        <p className="display-md-3 display-xs-2 text-center text-danger">
          No data is currently available
        </p>
        : null
      }

      <div className="container-fluid">

        <div className="row">
          <Input areaType={areaType}
            areaName={areaName}
            updateAreaTypeAndName={updateAreaTypeAndName} />
        </div>

        {(areaType === 'nhsRegion' || areaType === 'world')
          ? null
          :
          <div className="row">
            <Deaths
              areaType={areaType}
              areaName={areaName}
              datePub={apiData.deathsDate}
              newPub={apiData.deathsNew}
              cumPub={apiData.deathsCum}
              ratePub={apiData.deathsRate}
              averPub={apiData.deathsAverage}
              deathsPub={apiData.deathsPub}
              dateAct={apiData.deathsDateAct}
              newAct={apiData.deathsNewAct}
              cumAct={apiData.deathsCumAct}
              rateAct={apiData.deathsRateAct}
              averAct={apiData.deathsAverageAct}
              deathsAct={apiData.deathsAct}
              deathsLoc={apiDeathData}
              regions={apiRegionData.deaths}
              regionsAct={apiRegionData.deathsAct}
              regionsAve={apiRegionData.deathsAve}
              nations={apiNationData.deaths}
              nationsAct={apiNationData.deathsAct}
            />
            <Cases
              areaType={areaType}
              areaName={areaName}
              datePub={apiData.casesDate}
              newPub={apiData.casesNew}
              cumPub={apiData.casesCum}
              ratePub={apiData.casesRate}
              averPub={apiData.casesAverage}
              casesPub={apiData.casesPub}
              dateAct={apiData.casesDateAct}
              newAct={apiData.casesNewAct}
              cumAct={apiData.casesCumAct}
              rateAct={apiData.casesRateAct}
              averAct={apiData.casesAverageAct}
              casesAct={apiData.casesAct}
              casesLoc={apiCaseData}
              regions={apiRegionData.cases}
              regionsAct={apiRegionData.casesAct}
              regionsAve={apiRegionData.casesAve}
              nations={apiNationData.cases}
              nationsAct={apiNationData.casesAct}
              casesByGender={apiData.casesByGender}
              maleCases={apiData.maleCases}
              femaleCases={apiData.femaleCases}
              totalGenderCases={apiData.totalGenderCases}
              genderDate={apiData.genderDate}
              caseAgeRanges={apiData.caseAgeRanges}
            />
            {
              (areaType === 'region' || areaType === 'ltla' || areaType === "utla")
                ? null
                :
                <Tests
                  areaName={areaName}
                  date={apiData.testsDate}
                  newP1={apiData.newP1}
                  newP2={apiData.newP2}
                  newP3={apiData.newP3}
                  newP4={apiData.newP4}
                  newTotal={apiData.newTests}
                  cumP1={apiData.cumP1}
                  cumP2={apiData.cumP2}
                  cumP3={apiData.cumP3}
                  cumP4={apiData.cumP4}
                  cumTotal={apiData.cumTests}
                  tests1={apiData.tests1}
                  tests2={apiData.tests2}
                  tests3={apiData.tests3}
                  tests4={apiData.tests4}
                  testsTot={apiData.testsTot}
                />
            }
          </div>
        }

        {(areaType === 'region' || areaType === 'ltla' || areaType === "utla" || areaType === 'world')
          ? null
          :
          <div className="row mb-2">
            <Hospital
              areaName={areaName}
              date={apiData.hospitalDate}
              latest={apiData.hospitalNew}
              average={apiData.hospitalAverage}
              patients={apiData.patients}
              regions={apiHospitalData.patients}
              regionsAve={apiHospitalData.patientsAve}
            />
            <Admissions
              areaName={areaName}
              date={apiData.admissionsDate}
              latest={apiData.admissionsNew}
              average={apiData.admissionsAverage}
              cumulative={apiData.admissionsCum}
              admissions={apiData.admissions}
              admissionsByAge={apiData.admissionsByAge}
              regions={apiHospitalData.admissions}
              regionsAve={apiHospitalData.admissionsAve}
            />
            <VentilatorBeds
              areaName={areaName}
              date={apiData.ventilatorBedsDate}
              latest={apiData.ventilatorBedsNew}
              average={apiData.ventilatorBedsAverage}
              ventilatorBeds={apiData.ventilatorBeds}
              regions={apiHospitalData.ventilatorBeds}
              regionsAve={apiHospitalData.ventilatorBedsAve}
            />
          </div>
        }

        {(areaType !== 'world')
          ? null
          :
          <div className="row mb-3">
            <WorldWideDeaths
              latestDate={ecdcCountryData.latestDate}
              deathsTot={ecdcCountryData.deathsTot}
              deaths={ecdcCountryData.deaths}
            />
            <WorldWideCases
              latestDate={ecdcCountryData.latestDate}
              casesTot={ecdcCountryData.casesTot}
              cases={ecdcCountryData.cases}
            />
          </div>
        }

        <div className="row mb-2">
          <Footer />
        </div>

      </div>
    </div >
  )
}

export default App;
