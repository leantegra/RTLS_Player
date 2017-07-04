import {PureComponent} from 'react'
import {Grid, Cell, IconToggle, LinearProgress} from 'react-mdc-web'

export default class Timer extends PureComponent {

  state = {
    start: 0,
    end: 0,
    time: 0,
    speed: 2.0,
    stopped: true
  }

  constructor (props) {
    super(props)
  }

  render () {
    let {time, speed, stopped} = this.state
    return (
      <Grid>
        <Cell col={1}>
          <IconToggle className="material-icons" onClick={this.toggle}> 
            {(this.state.stopped ? 'play': 'pause') + '_circle_outline'}
          </IconToggle>
        </Cell>
        <Cell col={5}>
          cELL2
          <LinearProgress accent progress={time / this.props.max} />  
        </Cell>
        <Cell col={3}>
              Time: { time / 1000 }s
        </Cell>
        <Cell col={3}>
              Speed: { speed }s
        </Cell>
        
      </Grid>

    )
  }

  tick = (force) => {
    let {time, speed, stopped} = this.state
    console.log('tick', time, stopped, force)
    if (stopped && !force) return;
    time += 1000
    this.setState({time})
    this.props.onTick(time)
    if (time > this.props.max) this.stop()
    else setTimeout(this.tick, 1000 / speed)
  }

  stop() {
    this.setState({stopped: true})
  }

  start() {
    this.setState({
      stopped: false
    })
    this.tick(true)
  }

  toggle = () => this.state.stopped ? this.start() : this.stop()
}

Timer.defaultProps = {
  max: 5 * 60 * 1000
}