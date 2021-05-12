import Axios from "axios";
import React, { useEffect, useRef } from "react";
import { Loading, Oops, Seccess } from "../components/Alert";
import BOILERPLATE from "../components/BOILERPLATE";
import { UserSchema } from "../services/data.spec";
import Router from "next/router";

export default function editProfile() {
  const Name = useRef<HTMLInputElement>(null);
  const UserName = useRef<HTMLInputElement>(null);
  const Email = useRef<HTMLInputElement>(null);
  const Pass = useRef<HTMLInputElement>(null);
  const Phone = useRef<HTMLInputElement>(null);
  const Ville = useRef<HTMLInputElement>(null);
  const Adresse = useRef<HTMLInputElement>(null);
  const cPostal = useRef<HTMLInputElement>(null);
  useEffect(() => {
    var isAuth: Boolean = false;
    Axios.get("/api/auth/client")
      .then((res) => {
        Router.push("/");
      })
      .catch((err) => {
        isAuth = false;
      });
  }, []);

  const CreateUser = async (e: any) => {
    e.preventDefault();
    const Data: UserSchema = {
      email: Email.current?.value!,
      name: Name.current?.value!,
      username: UserName.current?.value!,
      address: Adresse.current?.value!,
      phone: Number(Phone.current?.value!),
      ville: Ville.current?.value!,
      password: Pass.current?.value!,
      codePostal: Number(cPostal.current?.value!)
    };
    Loading();
    await Axios.post(`/api/auth/create`, Data)
      .then((res) => {
        Seccess();
        Router.push("/login");
      })
      .catch((err) => {
        Oops();
      });
  };

  return (
    <BOILERPLATE title="Profile">
      <div className="container d-flex flex-column">
        <div className="row align-items-center justify-content-center min-vh-100">
          <form onSubmit={CreateUser}>
            <div className="container spacer-70">
              <div className="mb-5 text-center">
                <h2 className="mb-1 font-weight-semi-bold text-muted-f">
                  S'inscrire
                </h2>
                <p className="text-muted mb-0">Créer un compte</p>
              </div>
              <div className="row justify-content-aroudnd">
                {/* <!--  --> */}
                <div className="col-12 col-lg-10 mt-5 mt-lg-0 order-1 order-lg-0">
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Name Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputname"
                        >
                          Nom et Prénom
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-user"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputname"
                            placeholder="John Deo"
                            ref={Name}
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
                          htmlFor="inputUsername"
                        >
                          Nom d'utilisateur
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-user"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputUsername"
                            placeholder="John Deo"
                            ref={UserName}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
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
                              <i className="fal fa-envelope"></i>
                            </span>
                          </div>
                          <input
                            type="email"
                            className="form-control form-control-sm text-muted"
                            id="inputEmail"
                            placeholder="name@example.com"
                            ref={Email}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Phone Input --> */}
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
                              <i className="fal fa-phone"></i>
                            </span>
                          </div>
                          <input
                            type="number"
                            className="form-control form-control-sm text-muted"
                            id="inputPhone"
                            placeholder="0567-xxx-xxx"
                            minLength={10}
                            maxLength={10}
                            ref={Phone}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Ville Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputVille"
                        >
                          Ville
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-map"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputVille"
                            placeholder="Algerie"
                            ref={Ville}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Adresse Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputAdresse"
                        >
                          Adresse
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-map-marker-alt"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputAdresse"
                            placeholder="Rue-20-aout-xxxxx"
                            ref={Adresse}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Code Postal Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputCodePostal"
                        >
                          Code Postal
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-mailbox"></i>
                            </span>
                          </div>
                          <input
                            type="text"
                            className="form-control form-control-sm text-muted"
                            id="inputCodePostal"
                            placeholder="Algerie"
                            ref={cPostal}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      {/* <!-- Password Input --> */}
                      <div className="form-group">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold"
                          htmlFor="inputPassword"
                        >
                          Mote de passe
                        </label>
                        <div className="input-group input-group-merge">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="fal fa-lock"></i>
                            </span>
                          </div>
                          <input
                            type="password"
                            className="form-control form-control-sm text-muted"
                            id="inputPassword"
                            placeholder="password"
                            ref={Pass}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-sm btn-wide btn-secondary-f text-white"
                  >
                    S'inscrire
                  </button>
                </div>
                {/* <!--  --> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </BOILERPLATE>
  );
}
