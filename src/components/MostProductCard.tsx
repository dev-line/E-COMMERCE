import React from 'react'

function ProductCard() {
  return (
    <div className="col-6 col-lg-3 mb-5">
    <div className="card product border">
      <div className="SoldThdumbs">
          <div className="text-center"><img src="/assets/img/items/01.jpg" className="card-img-top w-70" alt="item" /></div>
        </div>
      </div>
      <div className="card-body">
        <div className="position-relative mx-auto swiper-pagination pb-3"></div>
        <h5 className="product-title font-size-2 mb-1"><a href="">Colorblock Sneakers</a></h5>
        <div className="d-flex justify-content-between">
          <span className="small text-accent currency-sm my-auto">154.99</span>
          <span className="small text-accent weight-sm">10</span>
        </div>
      </div>
      <button type="button" className="btn btn-sm btn-block btn-soft-primary border-0 rounded-0" data-toggle="modal" data-target="#productInfo"><i className="fal fa-shopping-cart"></i></button>
    </div>
  )
}

export default ProductCard
