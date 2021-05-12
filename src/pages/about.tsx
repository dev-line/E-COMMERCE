import Axios from 'axios';
import { NextPageContext } from 'next';
import { NextSeo } from 'next-seo';
import React, { useEffect, useState } from 'react'
import BOILERPLATE from '../components/BOILERPLATE'
import { InfoSchema, ProductSchema } from '../services/data.spec';

const {HOST} = process.env

export default function About(props:{data:InfoSchema,title:string}) {
  const [Orders, setOrders] = useState<ProductSchema[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OrdersStr = localStorage.getItem("ORDERS")
      setOrders(JSON.parse(OrdersStr!));
    }
  }, [])
  return (
    <BOILERPLATE {...{Orders:Orders, Title:"Qui sommes-nous"}}>
            <NextSeo
      title={`${props.title} | Qui sommes-nous`}
      description="l'empreinte de la qualité"
    />
            <div className="vh-90 content-centered bg-cover position-relative" style={{background: "url('assets/img/bg/cover-01.jpg')"}}>
                <div className="overlay-black"></div>
                <div className="container z-index-4 text-center">
                    <h2 className="display-4 font-weight-bold mb-5">À propos du site</h2>
  <p className="lead w-100 w-lg-75 mx-auto mb-0">{props.data.about}</p>
                </div>
            </div>
            {/* <!-- Content --> */}
            <div className="container spacer-100"></div>
    </BOILERPLATE>
  )
}

export const getServerSideProps = async (ctx:NextPageContext) => {
  var Infos:InfoSchema = {}
  await Axios.get(`${HOST}/api/info`).then(res=>{
    Infos = res.data
  }).catch(err=>{
    console.log(err);
  })
  return {
      props:{
          data:Infos,title: process.env.WEBSITENAME
      }
  }
}
