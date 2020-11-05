import React from 'react'
import { shallow } from 'enzyme'
import Hospital from '../components/Hospital'

describe("Hospital", () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Hospital />)
  })
})