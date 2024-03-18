import React from "react";
import style from "../..//Home.module.css";
import Slider from "react-slick";

export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "ease",
  };

  return (
    <>
      <div className=" container py-3 container-md  ">
        <div className="row">
          <div
            className={`${style.sliderContainer}  col-lg-8  justify-content-center align-items-md-center `}
          >
            <Slider {...settings}>
              <figure>
                <img
                  loading="lazy"
                  src={require("../../../../assets/images/slider-image-1.jpeg")}
                  alt=""
                  className="w-100"
                />
              </figure>
              <figure>
                <img
                  loading="lazy"
                  src={require("../../../../assets/images/slider-image-2.jpeg")}
                  alt=""
                  className="w-100"
                />
              </figure>
              <figure>
                <img
                  loading="lazy"
                  src={require("../../../../assets/images/slider-image-3.jpeg")}
                  alt=""
                  className="w-100"
                />
              </figure>
            </Slider>
          </div>
          <div style={{}} className=" col-lg-4">
            <figure className="m-0 p-0">
              <img
                className="w-100"
                loading="lazy"
                // src={require("../../../assets/images/mainslider-1.jpg")}
                src={require("../../../../assets/images/slider-image-3.jpeg")}
                alt=""
              />
            </figure>
            <figure className="m-0 p-0">
              <img
                className="w-100"
                loading="lazy"
                src={require("../../../../assets/images/slider-image-2.jpeg")}
                // src={require("../../../assets/images/mainslider-2.jpg")}
                alt=""
              />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
}
