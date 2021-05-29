import React, { useState } from "react";
import { CategSchema } from "../services/data.spec";

export default function CategoriesList(props: {
  Categorie: CategSchema;
  Edit: any;
  Remove: any;
}) {
  const { Categorie, Edit, Remove } = props;
  const [Name, setName] = useState(Categorie.name);
  return (
    <tr>
      <td>
        <div className="d-block">
          <span>{Categorie.name}</span>
          <ul className="list-unstyled d-flex mb-0 mt-2">
            <li className="ml-3">
              <button
                type="button"
                className="btn text-primary-f p-0 smaller font-weight-bold"
                data-toggle="modal"
                data-target={`#editCategory${Categorie.id}`}
              >
                Modifier
              </button>
            </li>
            <li>
              <button
                type="button"
                className="btn text-danger-f p-0 smaller font-weight-bold"
                data-toggle="modal"
                data-target={`#delCategory${Categorie.id}`}
              >
                Supprimé
              </button>
            </li>
          </ul>
        </div>
      </td>
      <td>{Categorie.name}</td>
      <td>{Categorie.products?.length}</td>
      {/* <!-- Edit Category --> */}
      <div
        className="modal fade"
        id={`editCategory${Categorie.id}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="editCategory"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5
                className="modal-title font-weight-semi-bold"
                id="editCategory"
              >
                Modification de catégorie
              </h5>
            </div>
            <div className="modal-body">
              <div className="mb-2">
                <span className="small font-weight-bold">Nom de catégorie</span>
              </div>
              <input
                type="text"
                value={Name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
                className="form-control form-control-sm text-muted mb-3"
                id="input-catName"
                placeholder="Nom de catégorie"
              />
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
                className="btn btn-sm btn-secondary-f text-white"
                onClick={() => {
                  Edit(Categorie.id, Name);
                }}
              >
                sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Delete Category --> */}
      <div
        className="modal fade"
        id={`delCategory${Categorie.id}`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="delCategory"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body px-3">
              <div className="pt-5 text-center">
                <i className="fal fa-3x fa-trash-alt text-danger-f"></i>
                <h4 className="font-weight-bold mt-5 mb-3">
                  Supprimer la catégorie
                </h4>
                <p className="mb-1 w-80 mx-auto">
                  Une fois cette catégorie supprimée, elle ne peut pas être
                  restaurée.
                </p>
                <p className="font-weight-semi-bold mb-0">
                  Etes-vous sûr que vous voulez continuer?
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
                  Remove(Categorie.id);
                }}
              >
                Supprimé
              </button>
            </div>
          </div>
        </div>
      </div>
    </tr>
  );
}
