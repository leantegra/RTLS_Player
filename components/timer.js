import {PureComponent} from 'react'
import {Grid, Cell, Textfield, IconToggle, LinearProgress} from 'react-mdc-web'

let TimeField = ({time, onChange}) => (
  <Textfield
    helptext="Duration, sec"
    value={time / 1000}
    onChange={onChange}
  />
)

export default class Timer extends PureComponent {

  state = {
    start: 0,
    end: 0,
    time: 0,
    speed: 2.0,
    stopped: true
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
        <Cell col={7}>
          <LinearProgress accent progress={time / this.props.max} />  
        </Cell>
        <Cell col={2}>
          <TimeField time={time} onChange={this.onTimeChange} />
        </Cell>
        <Cell col={2}>
              Speed: { speed }s
        </Cell>
        
      </Grid>

    )
  }

  onTimeChange = ({target: {value}}) => {
    // FIX
    let time = +value * 1000
    if (typeof time !== 'number' || time < 0 || time > this.props.max) return
    this.setState({time})
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