import React from "react";
import { ProductSchema } from "../services/data.spec";

function ProductCard(props: { data: ProductSchema; addOrder: Function }) {
  const { data, addOrder } = props;
  return (
    <div className="col-6 col-lg-3 mb-5">
      <div className="card product border">
        <div className="productThumbs">
          <div className="text-center">
            <img
              src={data.image ? data.image! : "/assets/img/empty.png"}
              className="card-img-top w-100"
              alt="item"
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="position-relative mx-auto swiper-pagination pb-3"></div>
        <h5 className="product-title font-size-2 mb-1">
          <a href="">{data.name}</a>
        </h5>
        <div className="d-flex justify-content-between">
          {data.promo ? (
            <span className="small text-accent currency-sm my-auto text-danger" style={{textDecoration:"line-through double"}}>
              {data.price}
            </span>
          ) : (
            ""
          )}
          <span className="small text-accent currency-sm my-auto">
            {(data.price * (100 - data.promo)) / 100}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          addOrder(data, "Create");
        }}
        type="button"
        className="btn btn-sm btn-block btn-soft-primary border-0 rounded-0"
        data-toggle="modal"
        data-target="#productInfo"
      >
        <i className="fal fa-shopping-cart"></i>
      </button>
    </div>
  );
}

export default ProductCard;
