import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import style from "../../Home.module.css";
import { useQuery } from "react-query";

export default function CategorisSlider() {
  // const [categoris, setCategoris] = useState([]);
  function getCategoris() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isError, isLoading, error } = useQuery(
    "CategorisSlider",
    getCategoris,
    {
      refetchOnMount: false,
    }
  );

  const categoris = data?.data.data;
  // console.log(categoris);
  // console.log(isError, error);

  // async function getCategoris() {
  //   const { data } = await axios
  //     .get("https://ecommerce.routemisr.com/api/v1/categories")
  //     .catch((err) => {
  //       console.log("error  in get catagoeies: ", err);
  //     });
  //   setCategoris(data?.data);
  // }

  // console.log(categoris);
  // useEffect(() => {
  //   getCategoris();
  // }, []);

  let settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    cssEase: "ease-in-out",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {categoris ? (
        <div className=" container py-5 ">
          <h2>show popular categoris</h2>
          <Slider {...settings}>
            {categoris.map((item, idx) => {
              return (
                <figure className="px-2" key={idx}>
                  <img
                    loading="lazy"
                    src={item.image}
                    alt={item.name}
                    height={"200"}
                    className={`${style.sliderContainer} w-100`}
                  />
                  <figcaption className="h5 text-center pt-2">
                    {item.name}
                  </figcaption>
                </figure>
              );
            })}
          </Slider>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
