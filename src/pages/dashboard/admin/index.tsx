import React from 'react'
import DASBOILERPLATE from '../../../components/DASBOILERPLATE'

export default function index() {
    return (
        <DASBOILERPLATE title="Acceuil">
 <div className="col-md-10">
        <div className="container vh-100 content-centered">
          <div className="d-lg-flex flex-lg-column w-100">
            <div className="d-block">
              <div className="w-md-75 w-lg-50 mx-auto">
                <img
                  className="img-fluid"
                  src="/assets/img/icons/svg/security.svg"
                  alt="Image Description"
                />
              </div>
              <div className="w-md-75 mx-auto mt-5 text-center">
                <h2>
                Fais-le mieux Avec {" "}
                  <a
                    href="https://linktr.ee/hax.codes"
                    target="_blank"
                    className="text-secondary-f"
                  >
                    Nous<span>&trade;</span>.
                  </a>
                </h2>
                
              </div>
            </div>
          </div>
        </div>
      </div>
        </DASBOILERPLATE>
    )
}
