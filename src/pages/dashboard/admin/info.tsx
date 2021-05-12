import Axios from "axios";
import { NextPageContext } from "next";
import React, { useRef } from "react";
import { Loading, Oops, Seccess } from "../../../components/Alert";
import DASBOILERPLATE from "../../../components/DASBOILERPLATE";
import { InfoSchema } from "../../../services/data.spec";
export default function info(props:{data:InfoSchema}) {
  const {data} = props
  const FACEBOOK = useRef<HTMLInputElement>(null);
  const INSTAGRAM = useRef<HTMLInputElement>(null);
  const EMAIL = useRef<HTMLInputElement>(null);
  const PHONE = useRef<HTMLInputElement>(null);
  const ADDRESS = useRef<HTMLInputElement>(null);
  const ABOUT = useRef<HTMLTextAreaElement>(null);

  const Submit = async(e:any) => {
    e.preventDefault()
    const Info = {
      instagram: INSTAGRAM.current?.value,
      about: ABOUT.current?.value,
      address: ADDRESS.current?.value,
      email: EMAIL.current?.value,
      facebook: FACEBOOK.current?.value,
      phone: Number(PHONE.current?.value),
    };
    Loading()
    await Axios.post("/api/info",Info).then(res=>{
      Seccess()
    }).catch(err=>{
      Oops()
    })
  };

  return (
    <DASBOILERPLATE title="Ifornations">
      <div className="col-md-10">
        <form onSubmit={Submit}>
          <div className="container spacer-70">
            <div className="row justify-content-aroudnd">
              {/* <!--  --> */}
              <div className="col-12 col-md-10 mt-5 mt-lg-0 order-1 order-lg-0">
                <div className="mb-3">
                  <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
                  Les réseau sociaux
                  </h5>
                </div>

                <div className="row mb-5">
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Name Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputFb"
                      >
                        Facebook
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fab fa-facebook-f"></i>
                          </span>
                        </div>
                        <input
                          type="url"
                          className="form-control form-control-sm text-muted"
                          id="inputFb"
                          placeholder="Lien de la page Facebook"
                          defaultValue={data.facebook}
                          ref={FACEBOOK}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- UserName Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputIg"
                      >
                        Instagram
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fab fa-instagram"></i>
                          </span>
                        </div>
                        <input
                          type="url"
                          className="form-control form-control-sm text-muted"
                          id="inputIg"
                          placeholder="Lien du compte Instagram"
                          defaultValue={data.Instagram}
                          ref={INSTAGRAM}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
                  autres informations
                  </h5>
                </div>

                <div className="row">
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Name Input --> */}
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
                            <i className="fas fa-phone"></i>
                          </span>
                        </div>
                        <input
                          type="number"
                          className="form-control form-control-sm text-muted"
                          id="inputPhone"
                          placeholder="Numéro de téléphone"
                          defaultValue={data.phone}
                          ref={PHONE}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    {/* <!-- UserName Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputAdress"
                      >
                        Email
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-envelope"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          className="form-control form-control-sm text-muted"
                          id="inputAdress"
                          placeholder="email@example.com"
                          defaultValue={data.email}
                          ref={EMAIL}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- UserName Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputAdress"
                      >
                        Adresse
                      </label>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fas fa-map-marker-alt"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control form-control-sm text-muted"
                          id="inputAdress"
                          placeholder="Adresse"
                          defaultValue={data.address}
                          ref={ADDRESS}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    {/* <!-- UserName Input --> */}
                    <div className="form-group">
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputAdress"
                      >
                        À PROPOS
                      </label>
                      <div className="input-group input-group-merge">
                        <textarea
                          name=""
                          id=""
                          cols={30}
                          rows={10}
                          className="form-control form-control-sm text-muted"
                          placeholder="À PROPOS"
                          ref={ABOUT}
                          required
                        >
                          {data.about}
                        </textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <!--  --> */}
            </div>
            <button
              type="submit"
              className="btn btn-sm btn-wide btn-secondary-f text-white mt-3 mt-md-5"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </DASBOILERPLATE>
  );
}
export const getServerSideProps = async (ctx:NextPageContext) => {
  var Infos:InfoSchema = {}
  const {HOST} = process.env
  await Axios.get(`${HOST}/api/info`).then(res=>{
    Infos = res.data
  }).catch(err=>{
    console.log(err);
  })
  return {
      props:{
          data:Infos
      }
  }
}