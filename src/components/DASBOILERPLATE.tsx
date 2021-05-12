import React, { FunctionComponent, useEffect, useState } from "react";
import HEAD from "next/head";
import { NextPageContext } from "next";
import Axios from "axios";
import Router from "next/router";
import Link from "next/link";

const DASBOILERPLATE = (props: { children: any; title: string }) => {
  const { children, title } = props;
  const href = "/dashboard/admin";
  const [UserId, setUserId] = useState(null)
  useEffect(() => {
    var isAuth: Boolean = false;
    Axios.get("/api/auth")
      .then((res) => {
        isAuth = true;
        setUserId(res.data.data.id)
      })
      .catch((err) => {
        Router.push("/dashboard/admin/login");
      });
    $("body").css("overflow", "auto");
  }, []);
  function openNav() {
    document!.getElementById("sidebar")!.style.width = "100%";
  }

  function closeNav() {
    document!.getElementById("sidebar")!.style.width = "0";
  }
  async function Logout() {
    console.log("LOgging Out");
    await Axios.post("/api/auth/logout")
      .then((res) => {
        console.log(res);
        Router.push("/dashboard/admin/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <React.Fragment>
      <HEAD>
        <title>{`Controle Panel ${title ? ` | ${title}` : ""}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <script src="/assets/js/jquery.min.js"></script>
      </HEAD>
      <div className="container-fluid">
        <div className="fixed-top w-100 bg-white z-index-2 shadow-sm">
          <button
            type="button"
            className="btn btn-sm d-lg-none left-0 p-3"
            onClick={() => {
              openNav();
            }}
          >
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 16 16"
              className="bi bi-list-nested"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.5 11.5A.5.5 0 0 1 5 11h10a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm-2-4A.5.5 0 0 1 1 3h10a.5.5 0 0 1 0 1H1a.5.5 0 0 1-.5-.5z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="row vh-100">
          <div className="col-lg-2 px-0" id="sidebar">
            <div
              className="vh-100 sticky-top d-flex align-content-between bg-secondary-f flex-wrap pt-4 pb-5"
              id="dash-sidebar"
            >
              <div className="container">
                <button
                  type="button"
                  className="close d-flex d-lg-none"
                  aria-label="Close"
                  onClick={() => {
                    closeNav();
                  }}
                >
                  <svg
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 16 16"
                    className="bi bi-x text-white"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                    />
                  </svg>
                </button>
                <div className="spacer-30 text-center border-bottom">
                  <h4 className="text-white mb-0">Site logo</h4>
                </div>
                <div className="my-5" id="MenuAccordion">
                  {/* <!-- Main --> */}
                  <div className="card mb-3">
                    <div className="card-header card-collapse">
                      <div className="mb-0">
                        <Link href={href}>
                          <a className="btn btn-secondary-f btn-block text-muted-f card-btn p-3">
                            <span>
                              <i className="fal fa-home-alt pr-2"></i>Accueil
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Products --> */}
                  <div className="card mb-3" role="tablist">
                    <div
                      className="card-header card-collapse"
                      id="MenuHeadingLang"
                    >
                      <div className="mb-0">
                        <button
                          type="button"
                          className="btn btn-secondary-f btn-block text-muted-f card-btn p-3 collapsed clpsd"
                          data-toggle="collapse"
                          data-target="#MenuCollapseLang"
                          aria-expanded="false"
                          aria-controls="MenuCollapseLang"
                        >
                          <span>
                            <i className="fal fa-file-alt pr-2"></i>Produits
                          </span>
                          <span className="card-btn-toggle">
                            <span className="card-btn-toggle-default">
                              <i className="fal fa-chevron-down"></i>
                            </span>
                            <span className="card-btn-toggle-active">
                              <i className="fal fa-chevron-up"></i>
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                    <div
                      id="MenuCollapseLang"
                      className="collapse"
                      aria-labelledby="MenuHeadingLang"
                      data-parent="#MenuAccordion"
                    >
                      <div className="card-body">
                        <nav className="list-group bg-white rounded">
                          <li className="list-group-item">
                            <Link href={`${href}/products`}>
                              <a className="btn btn-wide stretched-link text-reset text-left">
                              Tous les produits
                              </a>
                            </Link>
                          </li>
                          <li className="list-group-item">
                            <Link href={`${href}/products/new`}>
                              <a className="btn btn-wide stretched-link text-reset text-left">
                              Nouveau produit
                              </a>
                            </Link>
                          </li>
                          <li className="list-group-item">
                            <Link href={`${href}/products/categories`}>
                              <a className="btn btn-wide stretched-link text-reset text-left">
                              Catégories
                              </a>
                            </Link>
                          </li>
                          <li className="list-group-item">
                            <Link href={`${href}/products/draft`}>
                              <a className="btn btn-wide stretched-link text-reset text-left">
                              Corbeille
                              </a>
                            </Link>
                          </li>
                        </nav>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Orders --> */}
                  <div className="card mb-3">
                    <div className="card-header card-collapse">
                      <div className="mb-0">
                        <Link href={`${href}/orders`}>
                          <a className="btn btn-secondary-f btn-block text-muted-f card-btn p-3">
                            <span>
                              <i className="fal fa-shopping-cart pr-2"></i>
                              Ordres
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Members --> */}
                  <div className="card mb-3">
                    <div className="card-header card-collapse">
                      <div className="mb-0">
                        <Link href={`${href}/users/${UserId}`}>
                          <a className="btn btn-secondary-f btn-block text-muted-f card-btn p-3">
                            <span>
                              <i className="fal fa-user pr-2"></i>Profile
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Info --> */}
                  <div className="card mb-3">
                    <div className="card-header card-collapse">
                      <div className="mb-0">
                        <Link href={`${href}/info`}>
                          <a className="btn btn-secondary-f btn-block text-muted-f card-btn p-3">
                            <span>
                              <i className="fal fa-info-circle pr-2"></i>Informations
                            </span>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Logout --> */}
                  <div className="card mb-3">
                    <div className="card-header card-collapse">
                      <div className="mb-0">
                        <button
                          className="btn btn-secondary-f btn-block text-muted-f card-btn p-3"
                          onClick={() => {
                            Logout();
                          }}
                        >
                          <span>
                            <i className="far fa-sign-out pr-2"></i>Se déconnecter
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      <script src="/assets/js/jquery.min.js"></script>
      <script src="/assets/js/popper.min.js"></script>
      <script src="/assets/js/bootstrap.min.js"></script>
      <script src="/assets/js/swiper.min.js"></script>
      <script src="/assets/js/app.js"></script>
    </React.Fragment>
  );
};
export default DASBOILERPLATE;
