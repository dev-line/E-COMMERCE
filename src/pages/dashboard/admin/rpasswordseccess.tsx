import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Axios from "axios";
import { NextPageContext } from "next";
import Link from "next/link";

const { HOST } = process.env;
export default function forgotPassword(props: { isAuth: boolean }) {
  const Email = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.isAuth) {
      Router.push("/dashboard/admin");
    } else {
      console.log("Not  Auth");
    }
  }, []);
  const handleLogin = async (e: any) => {
    e.preventDefault();
    await Axios.post(`/api/auth/fpassword`, {
      email: Email.current?.value.trim(),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  };
  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <script src="/assets/js/jquery.min.js" />
        <title>Récupération de mot de passe</title>
      </Head>
      <div className="cover">
        <div className="container text-center">
          <img
            src="/assets/img/icons/svg/done.svg"
            className="u-xl-avatar img-fluid"
            alt=""
          />
          <div className="w-90 w-md-50 mx-auto my-3">
            <h2 className=" font-weight-bolder">
              votre mot de passe a été réinitialisé
            </h2>
            <Link href="/dashboard/admin/login">
              <a className="btn btn-sm btn-success-f font-weight-semi-bold text-white px-5">
                Aller à la page de connexion
              </a>
            </Link>
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
