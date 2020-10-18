import React from 'react'
import { shallow } from 'enzyme'
import App from '../containers/App'

describe("App", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<App />)
  })

  it('renders one Input Form', () => {
    const appWrapper = shallow(<App />)
    const inputForm = appWrapper.find('Input')
    expect(inputForm).toHaveLength(1)
  })

  it('renders one Deaths Card', () => {
    const appWrapper = shallow(<App />)
    const deaths = appWrapper.find('Deaths')
    expect(deaths).toHaveLength(1)
  })

  it('renders one Cases Card', () => {
    const appWrapper = shallow(<App />)
    const cases = appWrapper.find('Cases')
    expect(cases).toHaveLength(1)
  })

  it('renders one Tests Card', () => {
    const appWrapper = shallow(<App />)
    const tests = appWrapper.find('Tests')
    expect(tests).toHaveLength(1)
  })

  it('renders one Hospital Card', () => {
    const appWrapper = shallow(<App />)
    const hospital = appWrapper.find('Hospital')
    expect(hospital).toHaveLength(1)
  })

  it('renders one Admissions Card', () => {
    const appWrapper = shallow(<App />)
    const admissions = appWrapper.find('Admissions')
    expect(admissions).toHaveLength(1)
  })

  it('renders one Ventilator Beds Card', () => {
    const appWrapper = shallow(<App />)
    const ventilatorBeds = appWrapper.find('VentilatorBeds')
    expect(ventilatorBeds).toHaveLength(1)
  })


})


