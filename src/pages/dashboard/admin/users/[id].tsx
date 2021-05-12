import Axios from "axios";
import { NextPageContext } from "next";
import React, { useEffect, useRef, useState } from "react";
import { Loading, Oops, Seccess } from "../../../../components/Alert";
import DASBOILERPLATE from "../../../../components/DASBOILERPLATE";
import { UserSchema } from "../../../../services/data.spec";

export default function editProfile(props:{User:UserSchema}) {
  const {User} = props
  const Name = useRef<HTMLInputElement>(null)
  const UserName = useRef<HTMLInputElement>(null)
  const Email = useRef<HTMLInputElement>(null)
  const oPass = useRef<HTMLInputElement>(null)
  const nPass = useRef<HTMLInputElement>(null)
  const cPass = useRef<HTMLInputElement>(null)
  const Phone = useRef<HTMLInputElement>(null);
  const Ville = useRef<HTMLInputElement>(null);
  const Adresse = useRef<HTMLInputElement>(null);
  const cPostal = useRef<HTMLInputElement>(null);
  const EditUser=async(e:any)=>{
    e.preventDefault()
    const Data:UserSchema = {
      id: User.id,
      email: Email.current?.value!,
      name: Name.current?.value!,
      username: UserName.current?.value!,
      address: Adresse.current?.value!,
      phone: Number(Phone.current?.value!),
      ville: Ville.current?.value!,
      codePostal: Number(cPostal.current?.value!)
    }
    Loading()
    await Axios.put(`/api/auth/profile`,Data).then(res=>{
      Seccess()
    }).catch(err=>{
      Oops()
    })
  }
  const EditPassword = async(e:any)=>{
    e.preventDefault()
    if (nPass.current?.value == cPass.current?.value) {
      const PasswordData = {
        id: User.id,
        OldPass: oPass.current?.value,
        password: nPass.current?.value
      }
      Loading()
      await Axios.put("/api/auth/profile",PasswordData).then(res=>{
        Seccess()
      }).catch(err=>{
        Oops()
      })
    }
  }
  return (
    <DASBOILERPLATE title="Profile">
      <div className="col-lg-10">
        <form onSubmit={EditUser}>
              <div className="container spacer-70">
              <div className="mb-5 text-center">
                <h2 className="mb-1 font-weight-semi-bold text-muted-f">
                  Profile
                </h2>
                <p className="text-muted mb-0">Modifier votre compte</p>
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
                          defaultValue={User.name}
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
                          defaultValue={User.username}
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
                          defaultValue={User.email}
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
                          ref={Phone}
                              defaultValue={User.phone}
                              minLength={10}
                            maxLength={10}
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
                          defaultValue={User.ville}
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
                          defaultValue={User.address}
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
                          defaultValue={User.codePostal}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  <div className="col-12 col-md-6 mb-3">
                    {/* <!-- Password Input --> */}
                    <div className="form-group">
                      <div className="d-flex mt-1">
                        <label
                          className="form-control-label small text-muted-f font-weight-bold my-auto pl-1"
                          htmlFor="inputPassword"
                        >
                          Mot de passe
                        </label>
                        <button
                          type="button"
                          className="btn btn-sm p-0 text-primary-f font-weight-semi-bold"
                          data-toggle="modal"
                          data-target="#editPassword"
                        >
                          ( Changement )
                        </button>
                      </div>
                      <div className="input-group input-group-merge">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="fal fa-key"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          className="form-control form-control-sm text-muted bg-white"
                          id="inputPassword"
                          placeholder="********"
                          data-toggle="password"
                          disabled
                        />
                      </div>
                      <span className="smaller text-muted">
                      C'est une bonne idée d'utiliser un mot de passe fort que vous n'utilisez nulle part ailleurs
                      </span>
                    </div>
                  </div>
                 
                </div>

                <button
                  type="submit"
                  className="btn btn-sm btn-wide btn-secondary-f text-white"
                >
                  Enregistrer les modifications
                </button>
              </div>
              {/* <!--  --> */}
            </div>
          </div>
        </form>
      </div>

      {/* <!-- Edit Password --> */}
    <div className="modal fade" id="editPassword" tabIndex={-1} role="dialog" aria-labelledby="editPassword" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <form className="modal-content" onSubmit={EditPassword}>
                <div className="modal-header border-0">
                    <h5 className="modal-title font-weight-semi-bold" id="editPassword">changer mot de passe</h5>
                </div>
                <div className="modal-body" onSubmit={EditPassword}>
                       
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <div className="mb-2"><span className="small text-muted-f font-weight-bold">Mot de passe actuel</span></div>
                            </div>
                            <div className="mb-2">
                                <button type="button" className="btn smaller text-muted link-muted p-0">Afficher le mot de passe</button>
                            </div>
                        </div>
                        <input type="password" className="form-control form-control-sm text-muted mb-3" id="input-catName" placeholder="********" ref={oPass}/>
                        <div className="mb-2"><span className="small text-muted-f font-weight-bold">Nouveau mot de passe</span></div>
                        <input type="password" className="form-control form-control-sm text-muted mb-3" id="input-catUrl" placeholder="********" ref={nPass}/>
                        <div className="mb-2"><span className="small text-muted-f font-weight-bold">Retapez le nouveau mot de passe</span></div>
                        <input type="password" className="form-control form-control-sm text-muted mb-3" id="input-catUrl" placeholder="********" ref={cPass}/>
                </div>
                <div className="modal-footer border-0">
                    <button type="button" className="btn btn-sm text-muted font-weight-semi-bold" data-dismiss="modal">Annuler</button>
                    <button type="submit" className="btn btn-sm btn-secondary-f text-white">Sauvegarder</button>
                </div>
            </form>
        </div>
    </div>
    </DASBOILERPLATE>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  var User: any = {};
  const {HOST} = process.env
  await Axios.post(`${HOST}/api/auth/profile`, {
    id: Number(context.query.id),
  })
    .then((res) => {
      User = res.data;
    })
    .catch((err) => {
      User = {};
    });
  return {
    props: { User },
  };
}
