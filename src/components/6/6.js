import React from "react";
import { Pie } from "react-chartjs-2";
import "./style.css";

class LoanCalculator extends React.Component {
  constructor() {
    super();
    this.state = {
      P: null,
      R: null,
      N: null,
      reference: null,
      chartData: {
        labels: ["سپرده", "سود"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "خلاصه‌ی پرداخت",
          },
        },
      },
    };
    this.loanAmountSliderInput = this.loanAmountSliderInput.bind(this);
    this.loanRateSliderInput = this.loanRateSliderInput.bind(this);
    this.loanPeriodSliderInput = this.loanPeriodSliderInput.bind(this);
  }

  loanAmountSliderInput(self) {
    document.querySelector("#loan-amt-text").innerText =
      parseInt(self.target.value)
        .toLocaleString("fa-IR")
        .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) + " تومان";
    this.setState({ P: parseFloat(self.target.value) });
    this.displayDetails();
  }

  loanRateSliderInput(self) {
    document.querySelector("#interest-rate-text").innerText =
      self.target.value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) + "%";
    this.setState({ R: parseFloat(self.target.value) });
    this.displayDetails();
  }
  loanPeriodSliderInput(self) {
    document.querySelector("#loan-period-text").innerText =
      self.target.value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) + " سال";
    this.setState({ N: parseFloat(self.target.value) });
    this.displayDetails();
  }

  calculateLoanDetails(p, r, emi) {
    let totalInterest = 0;
    while (p > 0) {
      let interest = parseFloat(p) * parseFloat(r);
      p = parseFloat(p) - (parseFloat(emi) - interest);
      totalInterest += interest;
    }
    return totalInterest;
  }

  displayDetails() {
    let r = parseFloat(this.state.R) / 1200;
    let n = parseFloat(this.state.N) * 12;

    let num = parseFloat(this.state.P) * r * Math.pow(1 + r, n);
    let denom = Math.pow(1 + r, n) - 1;
    let emi = parseFloat(num) / parseFloat(denom);

    let payabaleInterest = this.calculateLoanDetails(this.state.P, r, emi);
    ////////////////////////////////////
    let opts = "";
    ////////////////////////////////////
    document.querySelector("#cp").innerText = parseFloat(this.state.P)
      .toLocaleString("fa-IR", opts)
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

    document.querySelector("#ci").innerText = parseFloat(payabaleInterest)
      .toLocaleString("fa-IR", opts)
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

    document.querySelector("#ct").innerText = parseFloat(
      parseFloat(this.state.P) + parseFloat(payabaleInterest)
    )
      .toLocaleString("fa-IR", opts)
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

    document.querySelector("#price").innerText = parseFloat(emi)
      .toLocaleString("fa-IR", opts)
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

    this.state.reference.data.datasets[0].data[0] = this.state.P;
    this.state.reference.data.datasets[0].data[1] = payabaleInterest;
    this.state.reference.update();
  }

  componentDidMount() {
    document.querySelector("#loan-amt-text").innerText =
      parseInt(document.getElementById("loan-amount").value)
        .toLocaleString("fa-IR")
        .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) + " تومان";
    this.setState({
      P: parseFloat(document.getElementById("loan-amount").value),
    });

    document.querySelector("#interest-rate-text").innerText =
      document
        .getElementById("interest-rate")
        .value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) + "%";
    this.setState({
      R: parseFloat(document.getElementById("interest-rate").value),
    });

    document.querySelector("#loan-period-text").innerText =
      document
        .getElementById("loan-period")
        .value.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) + " سال";
    this.setState({
      N: parseFloat(document.getElementById("loan-period").value),
    });
    document.getElementById("root").style.backgroundColor = "#bab5e3";
    document.title = "Loan Calculator";
  }

  componentWillUnmount() {
    document.getElementById("root").style.backgroundColor = "white";
  }

  render() {
    if (this.state.reference != null) {
      this.displayDetails();
    }
    return (
      <div className="Container">
        <div className="header">
          <h1 style={{ color: "#6258A8" }}>محاسبه‌گر وام</h1>
        </div>
        <div className="sub-container">
          <div className="view">
            <div className="details">
              <div>
                <div className="detail">
                  <p style={{ color: "#9088D2" }}>مقدار</p>
                  <p id="loan-amt-text" style={{ color: "#6258A8" }}></p>
                </div>
                <input
                  type="range"
                  id="loan-amount"
                  min="0"
                  max="10000000"
                  step="50000"
                  defaultValue="5000000"
                  onInput={this.loanAmountSliderInput}
                />
              </div>
              <div>
                <div className="detail">
                  <p style={{ color: "#9088D2" }}>مدت زمان</p>
                  <p id="loan-period-text" style={{ color: "#6258A8" }}></p>
                </div>
                <input
                  type="range"
                  id="loan-period"
                  min="1"
                  max="31"
                  step="1"
                  defaultValue="16"
                  onInput={this.loanPeriodSliderInput}
                />
              </div>
              <div>
                <div className="detail">
                  <p style={{ color: "#9088D2" }}>سود %</p>
                  <p id="interest-rate-text" style={{ color: "#6258A8" }}></p>
                </div>
                <input
                  type="range"
                  id="interest-rate"
                  min="1"
                  max="15"
                  step="0.5"
                  defaultValue="8"
                  onInput={this.loanRateSliderInput}
                />
              </div>
            </div>
            <div className="footer">
              <p id="price-container">
                <span id="price">0</span>/ماه
              </p>
            </div>
          </div>
          <div className="breakup">
            <Pie
              id="pieChart"
              data={this.state.chartData}
              options={this.state.options}
              type="doughnut"
              ref={(reference) => this.setState({ reference: reference })}
            />
          </div>
        </div>
        <div>
          <div className="loan-details">
            <div className="chart-details">
              <p style={{ color: "#9088D2" }}>سپرده</p>
              <p id="cp" style={{ color: "#130F31", fontSize: "17px" }}></p>
            </div>
            <div className="chart-details">
              <p style={{ color: "#9088D2" }}>سود</p>
              <p id="ci" style={{ color: "#130F31", fontSize: "17px" }}></p>
            </div>
            <div className="chart-details">
              <p style={{ color: "#9088D2" }}>قابل پرداخت</p>
              <p id="ct" style={{ color: "#130F31", fontSize: "17px" }}></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoanCalculator;
