import Axios from 'axios'
import { decode, verify } from 'jsonwebtoken'
import React, { useEffect, useState } from 'react'
import { OrdersSchema, ProductSchema } from '../services/data.spec'

function OrdersList(props:{data:OrdersSchema,Select:Function,Remove:Function}) {    
  const {data,Remove}=props
const createdAt = new Date(data?.createdAt!)

  const CalcTotal = ()=>{
    const List:ProductSchema[] = data?.products! || []
    var total = 0
    List.map(res=>{
      total+=res.total!
    })
    return total
  }
  const RemoveOrder = ()=>{
    Remove(data.id)
  }
  const [Total, setTotal] = useState(CalcTotal())
    return (
        <tr>
        <td className="text-lh-md">
          <div className="media">
            {/* <!-- <img src="assets/img/08.jpg" className="u-avatar rounded ml-3" alt="product-pic"> --> */}
            <div className="media-body">
              <p className="font-size-2 text-dark font-weight-semi-bold mb-0">
                {data.User?.name}
              </p>
              <ul className="list-unstyled d-flex mb-0">
                <li>
                  <button
                    type="button"
                    className="btn text-primary-f p-0 smaller font-weight-bold"
                    data-toggle="modal"
                    data-target="#cOrder"
                    onClick={()=>{props.Select(data,Total)}}
                  >
                    Afficher
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="btn text-danger-f p-0 smaller font-weight-bold mx-3"
                    data-toggle="modal"
                    data-target={`#delPost${data.id}`}
                  >
                    Supprimé
                  </button>
                </li>
                <li>
                  <div className="btn text-success p-0 smaller font-weight-bold">
                  Statut de la commande:{" "}
                    <span id="ordStatus" className="text-dark">
                    {data.delivered?"livré":"En attente"}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </td>
        <td>
          <p className="font-size-1 font-weight-semi-bold mb-0 currency-sm">
            {Total}
          </p>
        </td>
        <td>
          <p className="font-size-1 font-weight-semi-bold mb-0">
            {data.User?.address} - {data.User?.ville}
          </p>
        </td>
        <td>
          <p className="font-size-1 font-weight-semi-bold mb-0">
          {`${createdAt.getFullYear()}/${createdAt.getMonth()+1}/${createdAt.getDate()}`}
          </p>
        </td>
        {/* <!-- Delete Post --> */}
      <div
        className="modal fade"
        id={`delPost${data.id}`}
        tabIndex={1}
        role="dialog"
        aria-labelledby="delPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">Supprimer la demande</h4>
                <p className="font-weight-semi-bold mb-0">
                Voulez-vous vraiment supprimer cette demande?
                </p>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-sm text-muted font-weight-semi-bold"
                data-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-sm btn-danger-f text-white font-weight-semi-bold"
                onClick={()=>{RemoveOrder()}}
              >
                Supprimé
              </button>
            </div>
          </div>
        </div>
      </div>
      </tr>
    )
}

export default OrdersList
