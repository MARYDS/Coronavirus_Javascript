import React from 'react'
import { shallow } from 'enzyme'
import App from '../containers/App'

describe("App", () => {

  let appWrapper
  beforeAll(() => {
    appWrapper = shallow(<App />)
  })

  it('renders one Input Form', () => {
    const inputForm = appWrapper.find('Input')
    expect(inputForm).toHaveLength(1)
  })

  it('renders one Deaths Card', () => {
    const deaths = appWrapper.find('Deaths')
    expect(deaths).toHaveLength(1)
  })

  it('renders one Cases Card', () => {
    const cases = appWrapper.find('Cases')
    expect(cases).toHaveLength(1)
  })

  it('renders one Tests Card', () => {
    const tests = appWrapper.find('Tests')
    expect(tests).toHaveLength(1)
  })

  it('renders one Hospital Card', () => {
    const hospital = appWrapper.find('Hospital')
    expect(hospital).toHaveLength(1)
  })

  it('renders one Admissions Card', () => {
    const admissions = appWrapper.find('Admissions')
    expect(admissions).toHaveLength(1)
  })

  it('renders one Ventilator Beds Card', () => {
    const ventilatorBeds = appWrapper.find('VentilatorBeds')
    expect(ventilatorBeds).toHaveLength(1)
  })

  it('renders one Footer', () => {
    const footer = appWrapper.find('Footer')
    expect(footer).toHaveLength(1)
  })

})


