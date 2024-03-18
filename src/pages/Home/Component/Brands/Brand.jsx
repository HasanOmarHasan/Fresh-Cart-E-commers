import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../../../../components/ui/Loading/Loading";
import { useState } from "react";

export default function Brand() {
  const [pageCount, setPageCount] = useState(1);

  async function ourBrand() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands/", {
      params: {
        page: pageCount,
      },
    });
  }
  const { data, isLoading } = useQuery(["ourBrands", pageCount], ourBrand);
  const brands = data?.data.data;

  return (
    <>
      <div className="container  ">
        <h3 className="text-center fw-bold  py-5">Our Brand</h3>
        <div className="row">
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {brands.length ? (
                <>
                  {brands.map((item, idx) => {
                    return (
                      <div className=" col-lg-1 col-md-2 col-sm-3 col-3 " key={idx}>
                        <figure>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-100"
                          />
                        </figure>
                      </div>
                    );
                  })}

                  <div className="justify-content-center d-flex py-5 align-items-center ">
                    <ul className="pagination ">
                      <li className="page-item ">
                        <button
                          className="page-link text-dark  "
                          onClick={() => {
                            setPageCount(pageCount - 1);
                          }}
                          disabled={pageCount === 1 || pageCount !== 2}
                          aria-label="Previous"
                        >
                          <span aria-hidden="true">&laquo;</span>
                        </button>
                      </li>
                      {pageCount === 1 ? (
                        <>
                          {" "}
                          <li className="page-item">
                            <span
                              className="page-link text-light bg-main fw-bold"
                              to={""}
                            >
                              1
                            </span>
                          </li>
                          <li className="page-item">
                            <span className="page-link text-dark " to={""}>
                              2
                            </span>
                          </li>
                        </>
                      ) : (
                        <>
                          {" "}
                          <li className="page-item">
                            <span className="page-link text-dark " to={""}>
                              1
                            </span>
                          </li>
                          <li className="page-item">
                            <span
                              className="page-link text-light bg-main fw-bold "
                              to={""}
                            >
                              2
                            </span>
                          </li>
                        </>
                      )}

                      <li className="page-item">
                        <button
                          className="page-link text-dark "
                          to={""}
                          aria-label="Next"
                          onClick={() => {
                            setPageCount(pageCount + 1);
                          }}
                          disabled={pageCount !== 1 || pageCount === 2}
                        >
                          <span aria-hidden="true">&raquo;</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* {brands.length ? (
                
              ) : (
                ""
              )} */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
