import React from 'react'
import { shallow } from 'enzyme'
import Deaths from '../components/Deaths'

describe("Deaths", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Deaths />)
  })
})