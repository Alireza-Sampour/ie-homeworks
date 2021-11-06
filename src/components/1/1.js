import React from "react";

class CarPrice extends React.Component {
  constructor() {
    super();
    this.state = {
      input_ids: {
        year: /^1[34][0-9]{2}$/,
        base_price: /^[1-9][0-9]{7,}$/,
        insurance: /^[0-9]{1,3}$/,
        kilometer: /^[1-9][0-9]{0,5}$/,
        accident: /^[0-9]{1,3}$/,
      },
    };
    this.calculate_price = this.calculate_price.bind(this);
    this.handleInputs = this.handleInputs.bind(this);
  }

  calculate_price(e) {
    let flag = false;

    for (const [key, value] of Object.entries(this.state.input_ids)) {
      if (!value.test(document.getElementById(key).value)) {
        document.getElementById(key).classList.add("is-invalid");
        flag = true;
      }
    }

    if (flag) return;

    let price = parseInt(document.getElementById("base_price").value);

    price -=
      (parseInt(
        new Date()
          .toLocaleDateString("fa-IR")
          .replace(/([۰-۹])/g, (token) =>
            String.fromCharCode(token.charCodeAt(0) - 1728)
          )
          .split("/")[0]
      ) -
        parseInt(document.getElementById("year").value)) *
      100000;
    price += parseInt(document.getElementById("insurance").value) * 500000;
    price -= parseInt(document.getElementById("kilometer").value) * 30000;
    price -= parseInt(document.getElementById("accident").value) * 1000000;
    price -= document.getElementById("color").value === "دارد" ? 0 : 1000000;

    document.getElementById("final_price").value =
      price.toLocaleString("fa-IR").replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) +
      " تومان";

    Object.keys(this.state.input_ids).map((key) => {
      document.getElementById(key).classList.remove("is-valid");
      document.getElementById(key).value = "";
      return 0;
    });
  }

  handleInputs(e) {
    const elm_id = e.target.id;
    const elm_value = e.target.value;

    for (const [key, value] of Object.entries(this.state.input_ids)) {
      if (elm_id === key) {
        if (value.test(elm_value)) {
          document.getElementById(key).classList.remove("is-invalid");
          document.getElementById(key).classList.add("is-valid");
          return;
        } else {
          document.getElementById(key).classList.add("is-invalid");
          return;
        }
      }
    }
  }

  componentDidMount() {
    document.getElementById("root").style.backgroundColor = "#3a86ff";
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
      <div className="container">
        <style>{css}</style>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div
              className="card card-body text-center mt-5"
              style={{ backgroundColor: "#fff", borderRadius: "5%" }}
            >
              <h1 className="heading display-5 pb-3 mt-2">
                محاسبه‌گر قیمت خودرو
              </h1>{" "}
              <br />
              <div id="currencyResults mt-4">
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">سال ساخت</span>
                    </div>
                    <input
                      id="year"
                      placeholder="(شمسی) سال ساخت خودرو را وارد کنید"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputs}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">قیمت خودرو</span>
                    </div>
                    <input
                      id="base_price"
                      placeholder="(تومان) قیمت پایه خودرو را وارد کنید"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputs}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">مهلت بیمه</span>
                    </div>
                    <input
                      id="insurance"
                      placeholder="(ماه) مهلت بیمه خودرو را وارد کنید"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputs}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">کارکرد</span>
                    </div>
                    <input
                      id="kilometer"
                      placeholder="(کیلومتر) کارکرد خودرو را وارد کنید"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputs}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">میزان تصادف</span>
                    </div>
                    <input
                      id="accident"
                      placeholder="تعداد تصادفات خودرو را وارد کنید"
                      type="text"
                      className="form-control"
                      onChange={this.handleInputs}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">رنگ</span>
                    </div>
                    <select name="cars" className="custom-select" id="color">
                      <option value="دارد">دارد</option>
                      <option value="ندارد">ندارد</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    value="حساب کن"
                    className="css-button-sharp--black"
                    id="currencySubmit"
                    onClick={this.calculate_price}
                  />
                </div>
              </div>
            </div>
            <div className="card card-body mt-4 pb-2">
              <div className="form-group">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">قیمت تخمین زده شده</span>
                  </div>
                  <input
                    id="final_price"
                    type="text"
                    className="form-control"
                    disabled
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CarPrice;
