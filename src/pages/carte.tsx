import Axios from "axios";
import { sign } from "jsonwebtoken";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Loading, Oops, Seccess } from "../components/Alert";
import BOILERPLATE from "../components/BOILERPLATE";
import { ProductSchema, UserSchema } from "../services/data.spec";
import { EditOrders, GetOrders } from "../services/Orders";

export default function Carte(props: {title:String}) {
  const [Orders, setOrders] = useState<ProductSchema[]>([]);
  const [Cookies, setCookies] = useState<string>("")
  const [state, setState] = useState("Loading");
  const [SelectedProduct, setSelectedProduct] = useState<ProductSchema>();
  const [User, setUser] = useState<UserSchema>();
  const [QN, setQN] = useState(1);
  const Router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OrdersStr = localStorage.getItem("ORDERS");
      const List = JSON.parse(OrdersStr!) || [];
      setOrders(List);
      if (List.length == 0) {
        Router.push("/");
      }
    }
    Axios.get(`/api/auth/client`)
    .then((res) => {
      setUser(res.data.data)
    }).catch(err => {
        Router.push("/");
    })
  }, []);
  useEffect(() => {
    if (state == "Loading" || Cookies == "") {
      if (typeof window !== "undefined") {
        const OrdersStr = localStorage.getItem("ORDERS")
        setOrders(JSON.parse(OrdersStr!)||[]);
      }
      const res = GetOrders(Cookies)
      setCookies(EditOrders(Orders))
        setState("Done");
    }else{
      setCookies(EditOrders(Orders))
      localStorage.setItem("ORDERS", JSON.stringify(Orders))
    }
  }, [Orders]);
  useEffect(() => {
    $(".menu").remove();
    $(".menu2").show();
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }, []);
  const Total = () => {
    var total = 0;
    Orders.map((res) => (total += res.total!));
    return total;
  };
  const SelectProduct = (Order: ProductSchema) => {
    setQN(Number(Order.qn));
    setSelectedProduct(Order);
  };
  const EditOrder = (Order: ProductSchema) => {
    var data: ProductSchema[] = Orders;
    const IsInCart = data.findIndex((itm) => itm.id == Order.id);
    if (IsInCart >= 0) {
      const NewList = data.map((itm) => {
        if (itm.id == Order.id) {
          itm.qn! = QN;
          itm.total! = ((itm.price * (100 - itm.promo)) / 100) * itm.qn!;
          return itm;
        } else {
          return itm;
        }
      });
      setOrders([...NewList]);
    }
    $("#productInfo").hide();
    $(".modal-backdrop").remove();
  };
  const RenderList = () => {
    return Orders.map((res, key) => (
      <div className="media" key={key}>
        <div
          className="carte-prod-thumb bg-cover ml-2"
          style={{
            background: `url(${
              res.image ? res.image! : "assets/img/items/01.jpg"
            })`,
          }}
        ></div>
        <div className="media-body my-auto">
          <div className="row justify-content-between">
            <div
              className="col-7 cursor-pointer"
              data-toggle="modal"
              data-target="#productInfo"
              onClick={() => {
                SelectProduct(res);
              }}
            >
              <div className="cart-prod-name d-block text-dark opacity-80 font-weight-semi-bold">
                {res.name}
              </div>
              <small className="d-block text-body">
                <span className="mul">{res.qn}</span>
                <span className="currency-sm">
                  {(res.price * (100 - res.promo)) / 100}
                </span>
              </small>
            </div>
            <div className="col-5 text-left text-body my-auto">
              <span className="font-size-1 currency-sm">{res.total}</span>
              <button type="button" className="btn p-0 small text-muted">
                <i
                  className="far fa-times"
                  onClick={() => {
                    RemoveOrder(res);
                  }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  };
  const RemoveOrder = (Order: ProductSchema) => {
    setOrders(Orders.filter((itm) => itm != Order));
    localStorage.setItem(
      "ORDERS",
      JSON.stringify(Orders.filter((itm) => itm != Order))
    );
    if (Orders.length == 0) {
      Router.push("/");
    }
  };
  const Submit = async (E: any) => {
    E.preventDefault();
    Loading();
    const jwt = JSON.stringify(Orders);
    const Order = {
      Products: jwt,
      User:User?.id
    };
    await Axios.post("/api/orders", Order)
      .then((res) => {
        Seccess();
        localStorage.removeItem("ORDERS");
        Router.push("/")
      })
      .catch((err) => {
        Oops();
        console.log(Order);
      });
  };
  return (
    <BOILERPLATE
      {...{ Orders: Orders, RemoveOrder: RemoveOrder }}
    >
      <NextSeo
        title={`${props.title} | Liste des achats`}
        description="l'empreinte de la qualité"
      />
      <div className="container toggled spacer-80 spacer-md-100" id="wrapper">
        <div className="row">
          <div
            className="col-12 col-lg-4 z-index-1050 px-2 toggled"
            id="dash-nav"
          >
            <div className="card h-100 rounded-lg border-0 shadow-sm">
              <div className="card-header">
                <h5 className="my-auto">Panier</h5>
              </div>
              <div className="card-body">{RenderList()}</div>
              <div className="card-footer currency-xs">{Total()}</div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="card rounded-lg border-0 shadow-sm">
              <div className="card-body">
                <div className="border-bottom py-2">
                  <h6 className="text-cap text-dark-f opacity-80 font-weight-semi-bold">
                  informations essentielles
                  </h6>
                </div>
                <form className="needs-validation mt-10 px-5" onSubmit={Submit}>

                <div className="row justify-content-aroudnd">
              {/* <!--  --> */}
              <div className="col-12 col-lg-10 mt-5 mt-lg-0 order-1 order-lg-0">
                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Name Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputname"
                      >
                        Nom et Prénom
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-user"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-muted"
                          id="inputname"
                          placeholder="John Deo"
                          disabled
                          defaultValue={User?.name}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Email Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputEmail"
                      >
                        Email
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control form-control-sm text-muted"
                          id="inputEmail"
                          placeholder="name@example.com"
                          disabled
                          defaultValue={User?.email}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Phone Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputPhone"
                        >
                          Numéro de téléphone
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-phone"></i>
                            </span>
                          </div>
                          <input
                            type="number"
                            className="form-control form-control-sm text-muted"
                            id="inputPhone"
                            placeholder="0567-xxx-xxx"
                          disabled
                          defaultValue={User?.phone}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Ville Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputVille"
                        >
                          Ville
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-map"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputVille"
                            placeholder="Algerie"
                          disabled
                          defaultValue={User?.ville}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Adresse Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputAdresse"
                        >
                          Adresse
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputAdresse"
                            placeholder="Rue-20-aout-xxxxx"
                          disabled
                          defaultValue={User?.address}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Code Postal Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputCodePostal"
                        >
                          Code Postal
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-mailbox"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputCodePostal"
                            placeholder="Algerie"
                          disabled
                          defaultValue={User?.codePostal}
                            required
                          />
                        </div>
                      </div>
                    </div>
                 
                </div>


              </div>
              {/* <!--  --> */}
            </div>

                  <div>
                    <button
                      type="submit"
                      className="btn btn-sm btn-wide btn-outline-primary mr-2"
                    >
                      Commandez maintenant
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="productInfo"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable px-5 px-lg-10"
          role="document"
        >
          <div className="modal-content border-0">
            <div className="modal-top-cover bg-primary text-center">
              <figure className="position-absolute right-0 bottom-0 left-0">
                <svg
                  className="mb-n2"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 1920 100.1"
                >
                  <path
                    fill="#fff"
                    d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
                  />
                </svg>
              </figure>

              <div className="close">
                <button
                  type="button"
                  className="btn btn-sm text-white"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="modal-top-cover-avatar text-center">
              <img
                className="u-lg-avatar rounded-circle bg-white shadow-soft"
                src={SelectedProduct?.image}
                alt="Logo"
              />
            </div>

            <div className="modal-body pt-3 pb-0">
              <div className="text-center my-3">
                <h5 className="mb-1">{SelectedProduct?.name!}</h5>
                <span className="h6 font-weight-semi-bold currency-xs">
                  {(SelectedProduct?.price! * (100 - SelectedProduct?.promo!)) /
                    100}
                </span>
              </div>
              <div className="card border-0">
                <div className="card-body">
                  <p className="mb-1 small font-weight-semi-bold">Quantité:</p>
                  <div className="small mb-5">
                    <select
                      className="custom-select custom-select-sm"
                      defaultValue={SelectedProduct?.qn}
                      onChange={(e) => {
                        setQN(Number(e.target.value));
                      }}
                    >
                      <option value={1} selected>
                        01
                      </option>
                      <option value={2}>02</option>
                      <option value={3}>03</option>
                      <option value={4}>04</option>
                      <option value={5}>05</option>
                      <option value={6}>06</option>
                      <option value={7}>07</option>
                      <option value={8}>08</option>
                      <option value={9}>09</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        EditOrder(SelectedProduct!);
                      }}
                      type="button"
                      className="btn btn-sm btn-block btn-soft-primary"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BOILERPLATE>
  );
}

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      title: process.env.WEBSITENAME,
    },
  };
};
