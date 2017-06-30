import React from 'react'
import { PathLine } from 'react-svg-pathline'

export class SvgTest extends React.Component {
  render () {
    return (<svg>
      <PathLine
        points={[{ x: 0, y: 0 }, { x: 125, y: 0 }, { x: 125, y: 125 }, { x: 250, y: 125 }, {x: 250, y: 102}, {x: 10, y: 10}]}
        stroke='red'
        strokeWidth='3'
        fill='none'
        r={10}
      />
    </svg>)
  }
}

export default SvgTest
