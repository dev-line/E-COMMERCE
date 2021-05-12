import React from 'react'
import { ProductSchema } from '../services/data.spec';

export default function ProductInCarte(props:{data:ProductSchema, Remove:Function}) {
  const {data,Remove} = props
  return (
    <React.Fragment>
      <div className="media dropdown-item py-0">
        <div
          className="carte-prod-thumb bg-cover ml-2"
          style={{ background: `url(${data.image?data.image!:"/assets/img/empty.png"})` }}
        ></div>
        <div className="media-body my-auto">
          <div className="row justify-content-between">
            <div
              className="col-7 cursor-pointer"
            >
              <div className="cart-prod-name d-block text-dark opacity-80 font-weight-semi-bold">
                {data.name}
              </div>
              <small className="d-block text-body">
                <span className="mul">{data.qn}</span>
                <span className="currency-sm">
                {(data.price * (100 - data.promo)) / 100}
                </span>
              </small>
            </div>
            <div className="col-5 text-left text-body my-auto">
              <span className="font-size-1 currency-sm">{data.total}</span>
              <button
                onClick={() => {
                  Remove(data);
                }}
                type="button"
                className="btn p-0 small text-muted"
              >
                <i className="far fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
