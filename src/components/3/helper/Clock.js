import React from "react";

class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
    };
  }

  setTime = () => {
    this.setState({
      date: new Date(),
    });
  };

  componentDidMount() {
    clearInterval();
    setInterval(() => this.setTime(), 1000);
  }

  render() {
    const currentTime = `${
      this.state.date.getHours() < 10
        ? "0" + this.state.date.getHours()
        : this.state.date.getHours()
    }:${
      this.state.date.getMinutes() < 10
        ? "0" + this.state.date.getMinutes()
        : this.state.date.getMinutes()
    }`;
    return (
      <div className="clock">
        <h2>
          {currentTime.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])}
          <span>
            :
            {this.state.date.getSeconds() < 10
              ? "۰" +
                this.state.date
                  .getSeconds()
                  .toString()
                  .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])
              : this.state.date
                  .getSeconds()
                  .toString()
                  .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])}
          </span>
        </h2>
      </div>
    );
  }
}

export default Clock;
