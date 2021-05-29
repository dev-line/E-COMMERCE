import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Axios from "axios";
import { NextPageContext } from "next";
import { Oops } from "../../../components/Alert";

const { HOST } = process.env;
export default function forgotPassword(props: { isAuth: boolean }) {
  const Email = useRef<HTMLInputElement>(null);
  const Router = useRouter();
  useEffect(() => {
    if (props.isAuth) {
      Router.push("/dashboard/admin");
    }
  }, []);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    await Axios.post(`/api/auth/fpassword`, {
      email: Email.current?.value.trim(),
    })
      .then((res) => {
        Router.push("/dashboard/admin/fpasswordseccess");
      })
      .catch((err) => {
        Oops();
      });
  };
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <script src="/assets/js/jquery.min.js" />
        <title>j'ai oublie le mot de passe</title>
      </Head>
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
            <div>
              <div className="mb-5 text-center">
                <h6 className="h3 mb-1 font-weight-semi-bold">
                  Restaurer le mot de passe
                </h6>
                <p className="small text-muted mb-0">
                  Nous vous enverrons un email contenant un lien vous permettant
                  de réinitialiser votre mot de passe.
                </p>
              </div>
              <span className="clearfix"></span>
              {/* <!-- Form --> */}
              <form id="reset" onSubmit={handleLogin}>
                {/* <!-- Email Input --> */}
                <div className="form-group">
                  <label className="form-control-label small text-muted-f font-weight-semi-bold">
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
                      className="form-control"
                      id="input-email"
                      placeholder="name@example.com"
                      ref={Email}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn btn-block btn-secondary-f text-white font-weight-semi-bold"
                  >
                    Demander un lien de réinitialisation
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

export async function getServerSideProps(context: NextPageContext) {
  var isAuth: Boolean = false;
  const { HOST } = process.env;
  await Axios.get(`${HOST}/api/auth`)
    .then((res) => {
      isAuth = true;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { isAuth: isAuth },
  };
}
