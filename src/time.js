// time.js
import React from "react";
import ReactDOM from "react-dom";
import timezone from "./timezone.json";
import Clock from "./clock";
import "./time.css";

class TimeApp extends React.Component {
  constructor(props) {
    super(props);
    this.addTimeZone = this.addTimeZone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedClock: null,
      clockComponent: null,
    };
  }

  handleChange(e) {
    this.setState({ selectedClock: e.target.value }, this.addTimeZone);
  }

  addTimeZone() {
    if (this.state.selectedClock) {
      let zone = timezone.find((k) => k.Timezone === this.state.selectedClock);
      this.setState({
        clockComponent: (
          <Clock
            {...zone}
            key={zone.Timezone}
            removeClick={() => this.setState({ clockComponent: null })}
          />
        ),
      });
    } else {
      this.setState({ clockComponent: null });
    }
  }

  render() {
    let optionItems = timezone.map((zone) => (
      <option value={zone.Timezone} key={zone.Timezone}>
        {zone.Country}-{zone.Timezone}
      </option>
    ));

    return (
      <div className="w3-container">
        <div>
          <p>
            <select
              value={this.state.selectedClock || ""}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Select a time zone
              </option>
              {optionItems}
            </select>
          </p>
        </div>
        {this.state.clockComponent}
      </div>
    );
  }
}

ReactDOM.render(<TimeApp />, document.getElementById("root"));
export default TimeApp;
