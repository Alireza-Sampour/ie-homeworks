import React from "react";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  componentDidMount() {
    document.title = "IE Homework 1";
  }
  render() {
    const info = [
      {
        title: "قیمت خودرو",
        desc: "یک پروژه ایجاد کنید که قیمت خودرو را براساس  سال ساخت، قیمت پایه، مهلت، بیمه، کارکرد، میزان تصادف و رنگ حساب کند.",
      },
      {
        title: "تغییر رنگ",
        desc: "یک صفحه طراحی کنید که کاربر بتواند رنگ پس زمینه را تغییر دهد.",
      },
      {
        title: "اوقات نماز",
        desc: "یک شی React درست کنید که اوقات نماز صبح را در هفته‌ی آینده نمایش دهد. اگر  کاربر روی یک روزی کلیک کرد، اوقات تمام نمازهای پنج‌گانه به همراه ساعات طلوع و غروب آفتاب ونیمه‌شب شرعی را نمایش دهد.",
      },
      {
        title: "شبکه‌ی اجتماعی",
        desc: "یک صفحه طراحی کنید که متن یک بلاگ را به همراه اطلاعات نویسنده )شامل عکس، تعداد مطالب، بیوگرافی، تعداد کامنت‌ها، تعداد لایک‌ها، تاریخ ارسال مطلب و برچسب‌ها را نمایش دهد. کاربر باید بتواند مطلب را نشانه‌گذاری کند و یا در شبکه‌های اجتماعی به اشتراک بگذارد. هر مطلب شامل نویسنده، متن و یک تصویر است.",
      },
      {
        title: "مترونوم",
        desc: "یک شی React درست کنید که یک مترونوم را نمایش دهد.",
      },
      {
        title: "وام بانکی",
        desc: "یک شی React درست کنید که اطلاعات وام مثل تعداد اقساط، مبلغ وام و نرخ سود را بگیرد و مبلغ ماهیانه وام را حساب کند.",
      },
      {
        title: "تبدیل ارز",
        desc: "یک شی React درست کنید که یک عدد را در یکی از ارزهای رایج (دلار، یورو، یوان، ین، ریال، درهم و دینار) بگیرد و معادل آن را در بقیه‌ی ارزها نشان دهد.",
      },
    ];
    return (
      <div className="row">
        {info.map(function (question, i) {
          return (
            <div className="col-md-4" key={i}>
              <div className="service-card">
                <Link to={`/${this.props.routes[i].path}`}>
                  <div className="title">{question.title}</div>
                </Link>
                <p className="bodyin">
                  {question.desc} <br />
                </p>
              </div>
            </div>
          );
        }, this)}
      </div>
    );
  }
}

export default HomePage;
