import Axios from "axios";
import { NextPageContext } from "next";
import React, { useState } from "react";
import { Loading, Oops, Seccess } from "../../../../components/Alert";
import DASBOILERPLATE from "../../../../components/DASBOILERPLATE";
import ProductsList from "../../../../components/ProductsList";
import {ProductSchema} from "../../../../services/data.spec"
export default function posts(props:{Products:ProductSchema[]}) {
  const {Products} = props
  const [ProductesList, setProductesList] = useState(Products)
  const GetProducts = () => {
    return ProductesList.map(data=>(
      <ProductsList key={data.id} {...{product: data, Delete: DeleteProduct}}/>
    ))
  };
  const DeleteProduct = async(id:number)=>{
    $(`#delPost${id}`).hide()
    $(".modal-backdrop").remove()
    Loading()
    Axios.put(`/api/products/${id}`,{published: false}).then(res=>{
      const NewList = ProductesList.filter(item=>item.id!==res.data.id)
      setProductesList(NewList)
      Seccess()
    }).catch(err=>{
      Oops()
    })
  }
  return (
    <DASBOILERPLATE title="Produits">
      <div className="col-lg-10">
        <div className="container spacer-70">
          <div className="table-responsive">
{Products.length>0?(
              <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Le produit</th>
                  <th scope="col">Le prix</th>
                  <th scope="col">Promotion</th>
                  <th scope="col">Catégorie</th>
                  <th scope="col">Daté</th>
                </tr>
              </thead>
              <tbody>
                {GetProducts()}
              </tbody>
            </table>
): <img className="w-60 h-60" src="/assets/img/icons/searching.svg"/>}
          </div>
        </div>
      </div>
    </DASBOILERPLATE>
  );
}

export async function getServerSideProps(context:NextPageContext) {
  const {HOST} = process.env
  var Products:ProductSchema[] = []
  await Axios.get(`${HOST}/api/products`).then(res=>{
    Products = res.data
  }).catch(err=>{
    console.log(err);
  })
  return {
    props: {Products}
  };
}
