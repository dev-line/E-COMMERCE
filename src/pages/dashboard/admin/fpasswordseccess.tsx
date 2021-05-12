import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import Axios from "axios";
import { NextPageContext } from "next";

const {HOST} = process.env
export default function forgotPassword(props:{isAuth:boolean}) {
  useEffect(() => {
    if (props.isAuth) {
      Router.push('/dashboard/admin')
    }else{
      console.log('Not  Auth');
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <script src="/assets/js/jquery.min.js" />
        <title>نسيت كلمة المرور</title>
      </Head>
      <div className="cover">
        <div className="container text-center align-items-center">
            <img src="/assets/img/icons/svg/done.svg" className="u-xl-avatar img-fluid" alt=""/>
            <div className="w-90 w-md-50 mx-auto my-3">
            <h2 className=" font-weight-bolder">Un lien pour réinitialiser votre mot de passe a été envoyé à votre adresse e-mail</h2>
            <p className="text-muted-f">Veuillez vérifier votre courrier entrant</p>
            {/* <a href="#" className="btn btn-sm btn-success-f font-weight-semi-bold text-white px-5">Login to your account</a> */}
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

export async function getServerSideProps(context:NextPageContext) {
  var isAuth:Boolean=false
  const {HOST} = process.env
  await Axios.get(`${HOST}/api/auth`).then(res=>{
    isAuth = true
  }).catch(err=>{
    console.log(err);
  })
  return{
    props: {isAuth: isAuth}
  }

}