import React from "react";

class HijriDate extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
    };
  }

  componentWillMount() {
    fetch(
      `https://api.aladhan.com/v1/timingsByCity/${this.props.selected_date}?city=Ilam&country=Iran&method=7`
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          data: result,
        });
      });
  }

  render() {
    if (this.state.data != null) {
      return (
        <div className="date">
          {
            <h2>
              {this.state.data["data"]["date"]["hijri"]["weekday"]["ar"]}{" "}
              {this.state.data["data"]["date"]["hijri"]["day"].replace(
                /\d/g,
                (d) => "۰۱۲۳۴۵۶۷۸۹"[d]
              )}{" "}
              {this.state.data["data"]["date"]["hijri"]["month"]["ar"]}{" "}
              {this.state.data["data"]["date"]["hijri"]["year"].replace(
                /\d/g,
                (d) => "۰۱۲۳۴۵۶۷۸۹"[d]
              )}{" "}
            </h2>
          }
        </div>
      );
    } else {
      return false;
    }
  }
}

export default HijriDate;
