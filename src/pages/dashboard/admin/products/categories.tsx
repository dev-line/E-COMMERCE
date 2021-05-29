import Axios from "axios";
import React, { useState } from "react";
import DASBOILERPLATE from "../../../../components/DASBOILERPLATE";
import CategoriesList from "../../../../components/CategoriesList";
import { NextApiHandler } from "next";
import {CategSchema} from "../../../../services/data.spec"
import { Loading, Oops, Seccess } from "../../../../components/Alert";

export default function categories(props:{ Categories:CategSchema[] }) {
  const [Name, setName] = useState("")
  const [Categs, setCategs] = useState(props.Categories)
  const AddCateg = async (e:any) => {
    e.preventDefault();
    Loading()
    await Axios.post(
      `/api/categories`,{ name: Name })
      .then((res) => {
        setName("");
        setCategs([res.data,...Categs])
        Seccess()
      })
      .catch((error) => {
        Oops()
      })
  };
  const GetCategories = () => {
    return Categs.map((data:CategSchema) => {
      return <CategoriesList key={data.id} {...{Categorie: data,Edit:EditCategory, Remove:RemoveCategory}} />;
    });
  };
  const EditCategory = async(id:number,name:string)=>{
    $(`#editCategory${id}`).hide();
    $(".modal-backdrop").remove()
    Loading()
    await Axios.put(`/api/categories/${id}`,{name: name}).then((res) => {
      const NewCategsList = Categs.map((data:CategSchema)=>{
        if (data.id == id) {
          data.name = name
          return data
        }else{
          return data
        }
      });
      setCategs(NewCategsList);
      Seccess()
    })
    .catch((err) => {
      Oops()
    })
  }
  const RemoveCategory = async(id:number)=>{
    $(`#delCategory${id}`).hide();
    $(".modal-backdrop").remove()
    Loading()
      await Axios.delete(`/api/categories/${id}`).then((res) => {
        const NewCategsList = Categs.filter(item=>res.data.id !== item.id)
        setCategs(NewCategsList);
        Seccess()
      })
      .catch((err) => {
        Oops()
      })
  }
  return (
    <DASBOILERPLATE title="Categories">
      <div className="col-md-10 mx-auto">
        <div className="container spacer-70">
          <div className="row">
            <div className="col-12 col-lg-8 mb-5 mb-lg-0">
              {Categs.length>0?(
                <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Nom</th>
                    <th scope="col">lien</th>
                    <th scope="col">number</th>
                  </tr>
                </thead>
                <tbody>{GetCategories()}</tbody>
              </table>
              ):<img className="w-60 h-60" src="/assets/img/icons/searching.svg"/>}
            </div>
            <div className="col-12 col-lg-4">
              <div className="sticky-top">
                <div className="card border-0 rounded-lg shadow-sm">
                  <form className="card-body" onSubmit={AddCateg}>
                    <div className="mb-5">
                      <h6 className="small test-muted-f font-weight-bold mb-0">
                      Ajouter une nouvelle catégorie
                      </h6>
                    </div>

                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                        Nom de catégorie
                        </h6>
                      </div>
                      <input
                        type="text"
                        value={Name}
                        onChange={(e) => {
                          setName(e.currentTarget.value);
                        }}
                        className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm"
                        id="input-token"
                        placeholder="Nom de catégorie"
                      />
                      <small></small>
                    </div>

                    <div className="mb-4">
                      <button
                        type="submit"
                        className="btn btn-block btn-sm btn-secondary-f font-weight-semi-bold text-white"
                      >
                        Ajouter
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DASBOILERPLATE>
  );
}

export async function getServerSideProps(ctx:NextApiHandler) {
  var Categories:CategSchema[] = [];
  const {HOST} = process.env
  await Axios.get(`${HOST}/api/categories`)
    .then((res) => {
      Categories = res.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: { Categories },
  };
}
