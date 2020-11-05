import React from 'react'
import { shallow } from 'enzyme'
import VentilatorBeds from '../components/VentilatorBeds'

describe("Ventilator Beds", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<VentilatorBeds />)
  })
})