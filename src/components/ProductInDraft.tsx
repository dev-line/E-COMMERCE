import React from "react";
import { ProductSchema } from "../services/data.spec";
import Link from "next/link";

export default function DraftList(props: {
  product: ProductSchema;
  Restore: any;
  Delete: any
}) {
  const { product, Restore,Delete } = props;
  const createdAt = new Date(product?.createdAt!);
  return (
    <tr>
      <td className="text-lh-md">
        <div className="media">
          <img
            src={product.image ? product.image! : "/assets/img/empty.png"}
            className="u-avatar rounded ml-3"
            alt="..."
          />
          <div className="media-body">
            <p className="font-size-1 font-weight-semi-bold mb-0">
              {product.name}
            </p>
            <ul className="list-unstyled d-flex mb-0">
              <li className="mr-3">
                <Link href={`/dashboard/admin/products/edit/${product.id}`}>
                  <a className="btn text-primary-f p-0 smaller font-weight-bold">
                  Modifier
                  </a>
                </Link>
              </li>
              <li className="mr-3">
                <button
                  type="button"
                  className="btn text-secondary-f p-0 smaller font-weight-bold"
                  data-toggle="modal"
                  data-target={`#restorePost${product.id}`}
                >
                  Récupérer
                </button>
              </li>

              <li className="mr-3">
                <button
                  type="button"
                  className="btn text-danger-f p-0 smaller font-weight-bold"
                  data-toggle="modal"
                  data-target={`#delPost${product.id}`}
                >
                  Supprimé définitivement
                </button>
              </li>
            </ul>
          </div>
        </div>
      </td>
      <td>
        <p className="font-size-1 font-weight-semi-bold mb-0 currency-sm">
          {product.price}
        </p>
      </td>
      <td>
        <p className="font-size-1 font-weight-semi-bold mb-0 currency-sm">
          {product.promo}
        </p>
      </td>
      <td>
        <p className="font-size-1 font-weight-semi-bold mb-0">
        {product.categories!.length>0?product.categories![0].name:"non classé"}
        </p>
      </td>
      <td>
        <p className="font-size-1 font-weight-semi-bold mb-0">{`${createdAt.getFullYear()}/${
          createdAt.getMonth() + 1
        }/${createdAt.getDate()}`}</p>
      </td>
      {/* <!-- Delete Post --> */}
      <div
        className="modal fade"
        id={`delPost${product.id}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="delPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">Supprimer le produit</h4>
                <p className="font-weight-semi-bold mb-0">
                Êtes-vous sûr de vouloir supprimer ce produit?
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
                onClick={() => {
                  Delete(product.id);
                }}
              >
                Supprimé
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id={`restorePost${product.id}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="delPost"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i
                  className="fal fa-3x fa-recycle text-secondary-f"
                  aria-hidden="true"
                ></i>
                <h4 className="font-weight-bold mt-5 mb-3">إستعادة المنتج</h4>
                <p className="font-weight-semi-bold mb-0">
                  هل أنت متأكد أنك تريد إستعادة هذا المنتج ؟
                </p>
              </div>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-sm text-muted font-weight-semi-bold"
                data-dismiss="modal"
              >
                إلغاء
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary-f text-white font-weight-semi-bold"
                onClick={() => {
                  Restore(product.id);
                }}
              >
                إستعادة
              </button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  );
}
