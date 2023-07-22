import React from "react";
import PrayCard from "./Card";

class PrayTimes extends React.Component {
  constructor() {
    super();
    this.state = {
      timings: null,
    };
  }
  componentWillMount() {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/${this.props.selected_date}?city=gonabad&country=Iran&method=7`
    )
      .then((response) => response.json())
      .then((result) => {
        let temp = result["data"]["timings"];
        delete temp["Imsak"];
        this.setState({
          timings: temp,
        });
      });
  }

  render() {
    if (this.state.timings != null) {
      const prayerNames = Object.keys(this.state.timings);
      const prayTimes = Object.values(this.state.timings);

      const prayerTimeList = prayerNames.map((p, i) => (
        <PrayCard key={p} name={p} time={prayTimes[i]} />
      ));
      return (
        <div className="prayTime">
          <ul>{prayerTimeList}</ul>
        </div>
      );
    } else {
      return false;
    }
  }
}

export default PrayTimes;
