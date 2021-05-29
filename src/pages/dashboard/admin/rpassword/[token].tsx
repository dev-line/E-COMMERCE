import React, { useRef, useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Axios from "axios";
import { NextPageContext } from "next";
import { Oops } from "../../../../components/Alert";
import Swal from "sweetalert2";

export default function resetpassword(props: { isAuth: boolean }) {
  const route = useRouter();
  const Password = useRef<HTMLInputElement>(null);
  const CPassword = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.isAuth) {
      Router.push("/dashboard/admin");
    }
  }, []);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (Password.current?.value === CPassword.current?.value) {
      await Axios.post(`/api/auth/rpassword/${route.query.token}`, {
        token: route.query.token,
        password: Password.current?.value,
      })
        .then((res) => {
          Router.push("/dashboard/admin/rpasswordseccess");
        })
        .catch((err) => {
          Oops();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Ooops ...",
        text: `Le mot de passe ne correspond pas`,
      });
    }
  };
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <script src="/assets/js/jquery.min.js" />
        <title>إعادة تعيين كلمة السر</title>
      </Head>
      <div className="cover">
        <div className="container d-flex flex-column">
          <div className="row align-items-center justify-content-center min-vh-100">
            <div className="col-md-6 col-lg-5 col-xl-5 py-6 py-md-0">
              <div>
                <div className="mb-5 text-center">
                  <h6 className="h3 mb-1 font-weight-semi-bold">
                    Réinitialisez le mot de passe
                  </h6>
                  <p className="w-75 mx-auto small text-muted mb-0">
                    Pour la sécurité de votre compte, veuillez vous définir un
                    mot de passe sécurisé contenant
                    <span className="text-muted-f font-weight-semi-bold">
                      Lettres majuscules et minuscules{" "}
                    </span>
                    ،
                    <span className="text-muted-f font-weight-semi-bold">
                      Nombres
                    </span>{" "}
                    En plus de
                    <span className="text-muted-f font-weight-semi-bold">
                      {" "}
                      Codes
                    </span>
                    .
                  </p>
                </div>
                <span className="clearfix"></span>
                {/* <!-- Form --> */}
                <form onSubmit={handleLogin}>
                  {/* <!-- New Password --> */}
                  <div className="form-group">
                    <label className="form-control-label small text-muted-f font-weight-semi-bold">
                      Nouveau mot de passe
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
                            className="feather feather-key"
                          >
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                          </svg>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-sm text-muted"
                        id="input-password"
                        placeholder="********"
                        ref={Password}
                      />
                    </div>
                  </div>
                  {/* <!-- Repeat New Password --> */}
                  <div className="form-group">
                    <label className="form-control-label small text-muted-f font-weight-semi-bold">
                      Retapez le nouveau mot de passe
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
                            className="feather feather-key"
                          >
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                          </svg>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control form-control-sm text-muted"
                        id="reapeat-input-password"
                        placeholder="********"
                        ref={CPassword}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn btn-sm btn-block btn-secondary-f text-white"
                    >
                      Enregistrez le nouveau mot de passe
                    </button>
                  </div>
                </form>
              </div>
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
