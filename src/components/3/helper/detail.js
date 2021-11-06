import React from "react";
import { useParams } from "react-router-dom";
import Clock from "./Clock.js";
import HijriDate from "./Date.js";
import PrayTimes from "./PrayTimes.js";
import "../style.css";

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const { date_param } = useParams();
    return <Component {...props} selected_date={date_param} />;
  };
}

class Detail extends React.Component {
  render() {
    return (
      <div className="App">
        <p style={{ marginBottom: "90px", fontSize: "60px" }}>
          اوقات شرعی به وقت ایلام
        </p>
        <Clock />
        <HijriDate selected_date={this.props.selected_date} />
        <PrayTimes selected_date={this.props.selected_date} />
      </div>
    );
  }
}

export default withMyHook(Detail);
