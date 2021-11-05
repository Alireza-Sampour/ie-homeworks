import React from "react";

class Currency extends React.Component {
  constructor() {
    super();
    this.state = {
      currency_prices: {},
      currency_code_to_id: {
        USD: "dollarsOutput",
        EUR: "euroOutput",
        CNY: "yuanOutput",
        JPY: "yenOutput",
        AED: "dirhamOutput",
        IQD: "dinarOutput",
      },
    };
    this.convertCurrency = this.convertCurrency.bind(this);
  }

  convertCurrency(e) {
    const gbAmount = document.getElementById("gbAmount").value;
    if (gbAmount !== "") {
      Object.keys(this.state.currency_code_to_id).map(
        (key) =>
          (document.getElementById(this.state.currency_code_to_id[key]).value =
            (gbAmount / this.state.currency_prices[key]).toFixed(2))
      );
    } else {
      Object.keys(this.state.currency_code_to_id).map(
        (key) =>
          (document.getElementById(this.state.currency_code_to_id[key]).value =
            "")
      );
    }
    e.preventDefault();
  }

  componentDidMount() {
    fetch(`https://api.accessban.com/v1/data/sana/json`)
      .then((response) => response.json())
      .then((result) => {
        result = result.sana.data;
        this.setState({
          currency_prices: {
            USD: result[16]["p"],
            EUR: result[1]["p"],
            CNY: result[6]["p"],
            JPY: result[9]["p"],
            AED: result[2]["p"],
            IQD: result[14]["p"],
          },
        });
      });
  }

  render() {
    const css = `
    #container {
      display: block;
    }
    `;
    return (
      <div className="container">
        <style>{css}</style>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card card-body text-center mt-5">
              <h1 className="heading display-4 pb-3">مبدل ارز</h1>
              <form action="" id="currencyForm" onSubmit={this.convertCurrency}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">IRR</span>
                    </div>
                    <input
                      type="number"
                      step="1"
                      className="form-control"
                      id="gbAmount"
                      onInput={(e) =>
                        (e.target.value = e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*?)\..*/g, "$1"))
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="تبدیل کن"
                    className="btn btn-dark btn-block"
                    id="currencySubmit"
                  />
                </div>
              </form>
              <div id="currencyResults mt-4">
                {Object.keys(this.state.currency_code_to_id).map(function (
                  key,
                  i
                ) {
                  return (
                    <div key={i} className="form-group">
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">{key}</span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          id={this.state.currency_code_to_id[key]}
                          disabled
                        ></input>
                      </div>
                    </div>
                  );
                },
                this)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Currency;
