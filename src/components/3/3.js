import React from "react";
import { gregorian_to_jalali } from "./helper/date_converter.js";
import { Link } from "react-router-dom";
import "./style.css";

class PrayerTimes extends React.Component {
  constructor() {
    super();
    this.state = {
      weekdays_list: null,
      prayertimes_list: null,
      today: null,
      persian_weekdays: [
        "شنبه",
        "یک‌شنبه",
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنج‌شنبه",
        "جمعه",
      ],
      en_weekdays_to_index: {
        Saturday: 0,
        Sunday: 1,
        Monday: 2,
        Tuesday: 3,
        Wednesday: 4,
        Thursday: 5,
        Friday: 6,
      },
    };
  }

  componentDidMount() {
    let date = new Date();
    let promises = [];
    for (let i = 1; i <= 7; i++) {
      let temp_date = date.toLocaleDateString().split("/");
      if (i === 1) {
        this.setState({
          today: gregorian_to_jalali(
            parseInt(temp_date[2]),
            parseInt(temp_date[0]),
            parseInt(temp_date[1])
          ).join("/"),
        });
      }
      temp_date = `${temp_date[1]}-${temp_date[0]}-${temp_date[2]}`;
      promises.push(
        `https://api.aladhan.com/v1/timingsByCity/${temp_date}?city=Ilam&country=Iran&method=7`
      );
      date.setDate(new Date().getDate() + i);
    }

    Promise.all(
      promises.map((url) => fetch(url).then((response) => response.json()))
    ).then((responses) => {
      this.setState({
        weekdays_list: responses.map(function (response, i) {
          return (
            <li key={i} id="custom_li">
              {
                this.state.persian_weekdays[
                  this.state.en_weekdays_to_index[
                    response["data"]["date"]["gregorian"]["weekday"]["en"]
                  ]
                ]
              }
            </li>
          );
        }, this),
        prayertimes_list: responses.map(function (response, i) {
          return (
            <Link
              key={i}
              to={`/prayer-times/details/${response["data"]["date"]["gregorian"]["date"]}`}
              style={{ textDecoration: "none" }}
            >
              <li id="custom_li">
                {response["data"]["timings"]["Fajr"].replace(
                  /\d/g,
                  (d) => "۰۱۲۳۴۵۶۷۸۹"[d]
                )}
              </li>
            </Link>
          );
        }, this),
      });
    });
    document.title = "Prayer Times";
  }

  componentWillUnmount() {
    document.getElementById("root").style.backgroundColor = "white";
  }

  render() {
    const css = `
    #container {
      display: block;
    }
    `;
    return (
      <div>
        <style>{css}</style>
        <div className="calendar">
          <header>
            <h1>آبان ۱۴۰۰</h1>
          </header>

          <ul id="ulol" className="weekdays">
            {this.state.weekdays_list}
          </ul>

          <ol id="ulol" className="day-grid">
            {this.state.prayertimes_list}
          </ol>
          <h6
            style={{ textAlign: "center", marginTop: "10%", fontSize: "25px" }}
          >
            امروز {this.state.today}
          </h6>
        </div>
      </div>
    );
  }
}

export default PrayerTimes;
