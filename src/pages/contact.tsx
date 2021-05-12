import Axios from "axios";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import Head from "next/head";
import { title } from "process";
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { Loading, Oops, Seccess } from "../components/Alert";
import BOILERPLATE from "../components/BOILERPLATE"
import { InfoSchema, ProductSchema } from "../services/data.spec";
const {HOST} = process.env

export default function Contact(props:{data:InfoSchema,title:string}) {
  const {data,title} = props
  const Name = useRef<HTMLInputElement>(null)
  const From = useRef<HTMLInputElement>(null)
  const Subject = useRef<HTMLInputElement>(null)
  const Content = useRef<HTMLTextAreaElement>(null)
  const [Orders, setOrders] = useState<ProductSchema[]>([]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const OrdersStr = localStorage.getItem("ORDERS")
      setOrders(JSON.parse(OrdersStr!));
    }
  }, [])
  const SendMsg = async(e:any)=>{
    e.preventDefault()
    const Email = {
      Name: Name.current?.value,
      From: From.current?.value,
      Subject: Subject.current?.value,
      Content: Content.current?.value
    }
    Loading()
 await Axios.post("/api/email",Email).then(res=>{
   Seccess()
  e.target.reset()
 }).catch(err=>{
   Oops()
 })
  }
  return (
    <BOILERPLATE {...{Orders:Orders}}>
      <NextSeo
      title={`${title} | Contactez nous`}
      description="l'empreinte de la qualité"
    />
      {/* <Head>
  <title>{process.env.WEBSITENAME}</title>
      </Head> */}
      <div className="spacer-80 spacer-md-100">
        <div className="container">
          <div className="row justify-content-md-between">

            <div className="col-md-6 col-lg-5 mb-5 mb-md-0">
              <div className="card card-contact border-0 rounded py-5 px-3">
                <div className="card-body py-0">
                  <h4 className="h3 font-weight-bold">Vous avez une question ou une suggestion que vous aimeriez partager?</h4>
                  <p className="small font-weight-semi-bold mb-0"> N'hésitez pas à nous contacter, nous serons plus qu'heureux de vous entendre</p>
                  <form className="mt-4" onSubmit={SendMsg}>
                    {/* <!-- Name --> */}
                    <div className="form-group">
                      <label className="form-control-label small font-weight-bold text-muted-f">Nom et Prénom<span className="text-danger-f pr-1">*</span></label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                          </span>
                        </div>
                        <input type="text" className="form-control form-control-sm text-muted" id="input-text" placeholder="John Deo" required ref={Name} />
                      </div>
                    </div>
                    {/* <!-- Email --> */}
                    <div className="form-group">
                      <label className="form-control-label small font-weight-bold text-muted-f">E-mail<span className="text-danger-f pr-1">*</span></label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-at-sign"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
                          </span>
                        </div>
                        <input type="email" className="form-control form-control-sm text-muted" id="input-email" placeholder="John@gmail.com" required ref={From} />
                      </div>
                    </div>
                    {/* <!-- Name --> */}
                    <div className="form-group">
                      <label className="form-control-label small font-weight-bold text-muted-f">Sujet<span className="text-danger-f pr-1">*</span></label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-file-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z" />
                              <path fill-rule="evenodd" d="M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
                            </svg>
                          </span>
                        </div>
                        <input type="text" className="form-control form-control-sm text-muted" id="input-text" placeholder="Sujet..." required ref={Subject} />
                      </div>
                    </div>
                    {/* <!-- Message --> */}
                    <div className="form-group">
                      <label className="form-control-label small font-weight-bold text-muted-f">Comment pouvons-nous vous aider ?<span className="text-danger-f pr-1">*</span></label>
                      <textarea className="form-control small text-muted" id="contact" rows={4} placeholder="Ecrivez votre message ici" required ref={Content}></textarea>
                    </div>
                    <button type="submit" className="btn btn-sm btn-block btn-secondary-f text-white font-weight-semi-bold">Envoyez le message</button>
                  </form>
                  <p className="small font-weight-semi-bold text-center mb-0 pt-2">Votre message sera répondu dans les plus brefs délais</p>
                </div>
              </div>

            </div>

            <div className="col-lg-6 my-auto">
              {/* <!-- Info --> */}
              <div className="mb-5">
                <h3 className="w-md-80 mb-4">Vous pouvez également nous contacter via les plateformes de réseaux sociaux.</h3>
                <ul className="list-inline">
                  <li className="list-inline-item">
                    <a className="btn btn-xs btn-icon btn-soft-secondary" href={data.facebook}>
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="btn btn-xs btn-icon btn-soft-secondary" href={data.Instagram}>
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  
                </ul>
                <ul className="list-inline">
                  <li className="list-inline-item ml-2">
                    <a href={`tel:${data.phone}`} className="small font-weight-semi-bold text-muted-f">
                      <i className="fas fa-phone-alt pl-1"></i>{data.phone}
                                        </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={`mailto:${data.email}`} className="small font-weight-semi-bold text-muted-f">
                      <i className="fas fa-envelope my-auto pl-1"></i>{data.email}
                                        </a>
                  </li>
                </ul>
              </div>

              <img src="assets/img/misc/office.svg" className="mx-auto" alt="" />
            </div>

          </div>
        </div>
      </div>
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
          data:Infos,
          title: process.env.WEBSITENAME
      }
  }
}
