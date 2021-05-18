import Axios from "axios";
import { verify } from "jsonwebtoken";
import { NextPageContext } from "next";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import BOILERPLATE from "../components/BOILERPLATE";
import ProductCard from "../components/ProductCard";
import { ProductSchema, CategSchema } from "../services/data.spec";
import { EditOrders, GetOrders } from "../services/Orders";

import { NextSeo } from "next-seo";
const { HOST } = process.env;
export default function Home(props: {
  products: ProductSchema[];
  title: string;
}) {
  const { products, title } = props;
  const [state, setState] = useState("Loading");
  const [Method, setMethod] = useState("Create");
  const [Cookies, setCookies] = useState<string>("");
  const [Orders, setOrders] = useState<ProductSchema[]>([]);
  const [SelectedProduct, setSelectedProduct] = useState<ProductSchema>();
  const [QN, setQN] = useState<number>(1);
  const [Swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    if (state == "Loading" || Cookies == "") {
      if (typeof window !== "undefined") {
        const OrdersStr = localStorage.getItem("ORDERS");
        setOrders(JSON.parse(OrdersStr!) || []);
      }
      setCookies(EditOrders(Orders));
      setState("Done");
    } else {
      setCookies(EditOrders(Orders));
      localStorage.setItem("ORDERS", JSON.stringify(Orders));
    }
  }, [Orders]);
  const Next = () => {
    Swiper.slickNext();
  };
  const Previous = () => {
    Swiper.slickPrev();
  };
  const RenderProducts = () => {
    var ProductsList = [...products];
    var Slides: ProductSchema[][] = [];
    while (ProductsList.length) {
      const Slide = ProductsList.splice(0, 8);
      Slides.push(Slide);
    }
    return Slides.map((item, index) => {
      return (
        <div key={index} className="row m-2">
          <div className="row m-2">
            {item.map((data) => {
              return (
                <ProductCard
                  key={data.id}
                  {...{ data: data, addOrder: SelectProduct }}
                />
              );
            })}
          </div>
        </div>
      );
    });
  };
  const MostProduct = () => {
    var List: ProductSchema[] = [];
    if (products.length >= 10) {
      for (let i = 0; i < 4; i++) {
        var index = Math.floor(Math.random() * products.length);
        List.push(products[index]);
      }
    }
    return List.map((res, key) => {
      if (key < 4) {
        return (
          <ProductCard
            key={res.id}
            {...{ data: res, addOrder: SelectProduct }}
          />
        );
      }
    });
  };
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    speed: 500,
  };
  const SelectProduct = (data: ProductSchema, MethodT: string) => {
    setMethod(MethodT);
    setSelectedProduct(data);
  };
  const Submit = () => {
    Method == "Create"
      ? AddOrder(SelectedProduct!)
      : EditOrder(SelectedProduct!);
    setQN(1);
    $("#productInfo").hide();
    $(".modal-backdrop").remove();
  };
  const AddOrder = (Order: ProductSchema) => {
    verify(Cookies, "ORDERS", async (err, decoded: any) => {
      if (!err && decoded) {
        var data: ProductSchema[] = decoded.data;
        const IsInCart = data.findIndex((itm) => itm.id == Order.id);
        if (IsInCart >= 0) {
          const NewList = data.map((itm) => {
            if (itm.id == Order.id) {
              itm.qn! += QN;
              itm.total! = ((itm.price * (100 - itm.promo)) / 100) * itm.qn!;
              return itm;
            } else {
              return itm;
            }
          });
          setOrders([...NewList]);
        } else {
          var NewItem = Order;
          NewItem.qn = QN;
          NewItem.total = ((NewItem.price * (100 - NewItem.promo)) / 100) * QN;
          setOrders([...data, NewItem]);
        }
      } else {
        console.log(err);
      }
    });
  };
  const EditOrder = (Order: ProductSchema) => {
    verify(Cookies, "ORDERS", async (err, decoded: any) => {
      if (!err && decoded) {
        var data: ProductSchema[] = decoded.data;
        const IsInCart = data.findIndex((itm) => itm.id == Order.id);
        if (IsInCart >= 0) {
          const NewList = data.map((itm) => {
            if (itm.id == Order.id) {
              itm.qn! += QN;
              itm.total! = ((itm.price * (100 - itm.promo)) / 100) * itm.qn!;
              return itm;
            } else {
              return itm;
            }
          });
          setOrders([...NewList]);
        }
      } else {
        console.log(err);
      }
    });
  };
  const RemoveOrder = (Order: ProductSchema) => {
    setOrders(Orders.filter((itm) => itm != Order));
  };
  return (
    <BOILERPLATE
      {...{
        Orders: Orders,
        RemoveOrder: RemoveOrder,
        SelectProduct: SelectProduct,
      }}
    >
      <NextSeo
        title={`${title} | Accueil`}
        description="l'empreinte de la qualité"
      />
      <div className="bg-content d-block">
        <div
          className="vh-100 d-flex align-items-center bg-cover overlay position-relative"
          style={{ background: "url('/assets/img/bg/bg-hero.jpg')" }}
        >
          <div className="container text-left z-index-4">
            <h1 className="text-white mb-lg-5">{title}</h1>
            <p className="text-white opacity-80 mb-lg-8 w-lg-35">
              l'empreinte de la qualité
            </p>
            <a className="btn btn-dark" href="#stb">
              Parcourir les produits
              <i className="fal fa-long-arrow-right mr-2"></i>{" "}
            </a>
          </div>
        </div>
      </div>

      {products.length >= 10 ? (
        <div className="spacer-30 spacer-lg-80" id="stb">
          <div className="container">
            <div className="text-center">
              <h6 className="mb-2 text-muted-f">Nos produits</h6>
              <h2 className="mb-5 mb-lg-10">Découvrez les produits premium</h2>
            </div>

            <div className="row">{MostProduct()}</div>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="spacer-30 spacer-lg-80">
        <div className="container-fluid px-2 px-lg-10">
          <div className="row prod-list">
            <div className="col-12 col-lg-4 d-none d-lg-block">
              <div className="card h-100 bg-content rounded-lg border overflow-hidden">
                <div className="sticky-top">
                  <div className="card-header bg-transparent border-0 w-100">
                    <div className="d-flex justify-content-between">
                      <div>
                        <h3 className="mb-0">Liste des produits</h3>
                      </div>
                      <div className="my-auto">
                        <button
                          onClick={() => {
                            Next();
                          }}
                          type="button"
                          className="btn btn-xs btn-white swiper-next shadow-soft mr-1"
                        >
                          <i className="fal fa-chevron-left"></i>
                        </button>
                        <button
                          onClick={() => {
                            Previous();
                          }}
                          type="button"
                          className="btn btn-xs btn-white swiper-prev shadow-soft ml-1"
                        >
                          <i className="fal fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body overflow-hidden">
                  <div
                    className="h-75 bg-category"
                    style={{ background: "url('assets/img/bg/01.jpg')" }}
                  ></div>
                </div>
              </div>
            </div>
            {/* <!--  --> */}
            <div className="col-12 col-lg-8 mt-5">
              <div className="card border-0 h-100 rounded-lg border">
                <div className="card-header bg-content rounded-0 border-0 w-100 d-block d-lg-none">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h3 className="mb-0">Liste des produits</h3>
                    </div>
                    <div className="my-auto">
                      <button
                        onClick={() => {
                          Next();
                        }}
                        type="button"
                        className="btn btn-xs btn-white swiper-next shadow-soft mr-1"
                      >
                        <i className="fal fa-chevron-left"></i>
                      </button>
                      <button
                        onClick={() => {
                          Previous();
                        }}
                        type="button"
                        className="btn btn-xs btn-white swiper-prev shadow-soft ml-1"
                      >
                        <i className="fal fa-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <Slider {...settings} ref={(S) => setSwiper(S)}>
                    {products.length > 0 ? (
                      RenderProducts()
                    ) : (
                      <img
                        className="w-60 h-60"
                        src="/assets/img/icons/searching.svg"
                      />
                    )}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Social --> */}
      {/* <!-- <div className="container-fluid px-0 border-0">
                <div className="bg-cover h-100" style={{background: "url('assets/img/bg/01.jpg')"}}></div>
                <div className="row no-gutters">
                    <div className="col">
                        <div className="card spacer-30 border-0 rounded-0 bg-faded-primary">
                            <div className="card-body text-center">
                                <i className="fas fa-2x fa-phone-alt text-secondary-f my-2"></i>
                                <h3 className="h5 mb-1">06.25.48.75.95</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card spacer-30 border-0 rounded-0 bg-faded-accent">
                            <div className="card-body text-center">
                                <i className="fas fa-2x fa-envelope-open text-secondary-f my-2"></i>
                                <h3 className="h5 mb-1">contact@mail.com</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div> --> */}
      <div className="solution spacer-30 spacer-lg-70 bg-content">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <div className="media d-block d-lg-flex text-center text-lg-right">
                <i className="far fa-2x fa-shipping-fast my-auto"></i>
                <div className="media-body mr-3">
                  <h6 className="mb-0">Livraison gratuite</h6>
                  <p className="small mb-0 d-none d-lg-block">
                    Livraison gratuite et rapide dans tous les états du pays.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4" id="stb">
              <div className="media d-block d-lg-flex text-center text-lg-right">
                <i className="far fa-2x fa-box-check my-auto"></i>
                <div className="media-body mr-3">
                  <h6 className="mb-0">Qualité garantie</h6>
                  <p className="small mb-0 d-none d-lg-block">
                    Produits de qualité garantis.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="media d-block d-lg-flex text-center text-lg-right">
                <i className="far fa-2x fa-user-headset my-auto"></i>
                <div className="media-body mr-3">
                  <h6 className="mb-0">Support Technique</h6>
                  <p className="small mb-0 d-none d-lg-block">
                    Support technique toute la semaine 7/7.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ========== FOOTER ========== --> */}
      <footer className="container space-2 text-center">
        {/* <!-- Logo --> */}
        <a
          className="d-inline-flex align-items-center mb-3"
          href="#"
          aria-label={title}
        >
          <img
            className="brand"
            src="/assets/img/Logo.png"
            width="100"
            alt={title}
          />
        </a>

        <p className="font-size-1 mb-1">© 2021. Tous droits réservés.</p>
        <p className="font-size-1" dir="ltr">
          Créé par{" "}
          <a href="#" target="_blank">
            Our Team™
          </a>
        </p>

        {/* <!-- Social --> */}
        <ul className="list-inline mb-0">
          <li className="list-inline-item ml-3">
            <a className="btn btn-sm btn-icon btn-soft-facebook" href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a className="btn btn-sm btn-icon btn-soft-instagram" href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </footer>
      {/* <!-- ========== END FOOTER ========== --> */}

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
                src={SelectedProduct?.image!}
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
                  <p className="mb-1 small font-weight-semi-bold">الكمية:</p>
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
                      onClick={Submit}
                      type="button"
                      className="btn btn-sm btn-block btn-soft-primary"
                    >
                      أضف إلى سلة المشتريات
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

export async function getServerSideProps(context: NextPageContext) {
  var products: ProductSchema[] = [];
  await Axios.get(`${HOST}/api/products`)
    .then((res) => {
      products = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { products, title: process.env.WEBSITENAME },
  };
}
