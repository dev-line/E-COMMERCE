import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Axios from "axios";
import { NextPageContext } from "next";
import { Loading, Oops, Seccess } from "../../../components/Alert";

export default function login(props:{isAuth:boolean}) {
  const PASSTYPE = "password"
  const TEXTTYPE = "text"
  const onPass = "Afficher le mot de passe"
  const onText = "Masquer le mot de passe"
  const Email = useRef<HTMLInputElement>(null)
  const Password = useRef<HTMLInputElement>(null)
  const [PassVis, setPassVis] = useState(false)
  useEffect(() => {
    var isAuth: Boolean = false
    Axios.get('/api/auth').then(res => {
      Router.push('/dashboard/admin')
    }).catch(err => {
      isAuth = false
  })}, [])
  const handleLogin = async(e:any)=>{
    e.preventDefault()
    Loading()
    await Axios.post(`/api/auth/login`,{
      email: Email.current?.value.trim(),
      password: Password.current?.value
    }).then(res=>{
      if (res.data.role == "ADMIN") {
        Seccess()
      Router.push('/dashboard/admin')
      } else {
      Oops()
      }
    }).catch(err=>{
      Oops()
    })
  }
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <script src="/assets/js/jquery.min.js" />
        <title>Panneau de contrôle | Se connecter</title>
      </Head>
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
            <div>
              <div className="mb-5 text-center">
                <h2 className="mb-1 font-weight-semi-bold text-muted-f">
                  Se connecter
                </h2>
                <p className="text-muted mb-0">Connectez-vous à votre compte</p>
              </div>
              {/* <!-- Form --> */}
              <form id="login" onSubmit={handleLogin}>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-user"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      id="inputEmail"
                      placeholder="name@example.com"
                      ref={Email}
                      required
                    />
                  </div>
                </div>
                {/* <!-- Password Input --> */}
                <div className="form-group mb-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <label
                        className="form-control-label small text-muted-f font-weight-bold"
                        htmlFor="inputPassword"
                      >
                        Mote de passe
                      </label>
                    </div>
                    <div className="mb-2">
                      <button
                        type="button"
                        className="btn smaller text-muted link-muted p-0"
                        onClick={()=>{setPassVis(!PassVis)}}
                      >
                        {PassVis?onText:onPass}
                                              </button>
                    </div>
                  </div>
                  <div className="input-group input-group-merge">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="feather feather-key"
                        >
                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                      </span>
                    </div>
                    <input
                      type={PassVis?TEXTTYPE: PASSTYPE}
                      className="form-control form-control-sm"
                      id="inputPassword"
                      placeholder="**********"
                      data-toggle="password"
                      ref={Password}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-sm btn-block btn-secondary-f text-white font-weight-semi-bold"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <script src="/assets/js/jquery.min.js"></script>
      <script src="/assets/js/popper.min.js"></script>
      <script src="/assets/js/bootstrap.min.js"></script>
      <script src="/assets/js/app.js"></script>
    </React.Fragment>
  );
}

