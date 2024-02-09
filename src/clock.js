// clock.js
import React from "react";
import "./time.css";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.getCurrentTime(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  getCurrentTime() {
    let today = new Date();
    today.setMinutes(
      today.getMinutes() +
        today.getTimezoneOffset() +
        parseInt(this.props.Offset)
    );
    return today.toLocaleString();
  }

  tick() {
    this.setState({
      time: this.getCurrentTime(),
    });
  }

  render() {
    return (
      <div className="w3-quarter w3-padding-small">
        <div className="w3-card-2">
          <div className="w3-blue w3-container">
            <header>
              <div
                onClick={this.props.removeClick}
                className="w3-button w3-red w3-small w3-right"
              >
                ×
              </div>
              <h5>{this.props.Country}</h5>
            </header>
          </div>
          <div className="w3-container w3-light-gray">
            <p>{this.state.time}</p>
          </div>
          <footer className="w3-container w3-blue">
            <h5>{this.props.Timezone}</h5>
          </footer>
        </div>
      </div>
    );
  }
}

export default Clock;
