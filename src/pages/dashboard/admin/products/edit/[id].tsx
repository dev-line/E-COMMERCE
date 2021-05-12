import React, { useState, useRef, useEffect } from "react";
import DASBOILERPLATE from "../../../../../components/DASBOILERPLATE";
import Select from "react-select";
import { NextPageContext } from "next";
import { CategSchema, ProductSchema } from "../../../../../services/data.spec";
import Axios from "axios";
import { Loading, Oops, Seccess } from "../../../../../components/Alert";
import { useRouter } from "next/router";

const superBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function newPost(props: {
  Categs: CategSchema[];
  Product: ProductSchema;
}) {
  interface categs {
    label: string;
    value: number;
  }
  const { Categs, Product } = props;
  // States for Craetion Content
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const promo = useRef<HTMLInputElement>(null);
  const [image, setimage] = useState<any>(Product.image);
  const [imgtmp, setimgTmp] = useState<[any]>();
  const [CategoriesList, setCategoriesList] = useState<categs[]>([]);
  const [Categories, setCategories] = useState([{id:0}]);
  const [SelectCategs, setSelectCategs] = useState({});
  const [isDraft, setIsDraft] = useState(!Product.published);

  const GetCategs = async () => {
    const List: categs[] = [];
    await Categs.map((data) => {
      List.push({ label: data.name, value: data.id });
    });
    return setCategoriesList(List);
  };
  const CheckImg = (e: any) => {
    const ImgsExt = ["png", "jpg", "svg"];
    const imgPart = e.target.value.split(".");
    const Ext = imgPart[imgPart.length - 1];
    if (ImgsExt.indexOf(Ext) >= 0) {
      setimgTmp(e.target.files);
      var blob = new Blob(e.target.files);
      superBase64(blob).then((res) => {
        setimage(res);
      });
    } else {
      setimgTmp(null!);
    }
  };
  const newProduct = async(e: any) => {
    e.preventDefault();
    Loading()
    let bodyFormatData = new FormData()
    bodyFormatData.append("file",imgtmp![0])
    var product ={
      name: name.current?.value,
      image: Product.image,
      price: Number(price.current?.value),
      promo: Number(promo.current?.value),
      published: !isDraft,
      categories: Categories
    }
   await Axios.post("/api/upload",bodyFormatData,{headers:{"Content-Type": "multipart/form-data"}}).then(res=>{
     const imgUrl = `/upload/${res.data.src}`
     product.image = imgUrl
   }).finally(()=>{
    Axios.put(`/api/products/${Product.id}`,product).then(res=>{
      Seccess()
      Router.push('/dashboard/admin/products')
    }).catch(err=>{
      Oops()
    })
   })
  };
  const on_change = (val: any) => {
    setCategories([{ id: val.value }]);
    setSelectCategs(val)
  };
  const SetCateg = async () => {
    await Product.categories?.map((val:CategSchema) => {
      setCategories([{id:val.id}]);
      setSelectCategs({ label: val.name, value: val.id });
    });
  };
  const Router = useRouter()
  useEffect(() => {
    if (Product.id == 0) {
      Router.push("/dashboard/admin")
    }
    GetCategs();
    SetCateg();
  }, []);
  return (
    <DASBOILERPLATE title={Product.name}>
      <div className="col-12 col-lg-10">
        <form className="container spacer-70" onSubmit={newProduct}>
          <div className="mb-0">
            <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">
            Nom du produit
            </h5>
          </div>
          <div className="row justify-content-between mt-n3">
            <div className="col-12 col-lg-8">
              <div className="mt-5 mb-0 mb-md-3">
                <div className="input-group input-group-merge">
                  <input
                    type="text"
                    defaultValue={Product.name}
                    className="form-control form-control-lg font-size-1 text-muted-f border-0 rounded-lg shadow"
                    id="Ds-articleTitle"
                    placeholder="Nom du produit"
                    ref={name}
                  />
                </div>
                <img
                  src={Product.image?Product.image:image?image:"/assets/img/misc/office.svg"}
                  className="d-none d-lg-block w-100"
                  alt="svg"
                />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="sticky-top mt-5 mb-3">
                <div className="card border-0 rounded-lg shadow-sm">
                  <div className="card-body">
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                        Image du produit
                        </h6>
                      </div>

                      <div className="card mb-3" role="tablist">
                        <div id="PostImg">
                          <div className="border-bottom mb-0">
                            <button
                              type="button"
                              className="btn btn-sm btn-block text-muted d-flex justify-content-between collapsed"
                              data-toggle="collapse"
                              data-target="#UploadPostImg"
                              aria-expanded="false"
                              aria-controls="UploadPostImg"
                            >
                              <span>
                                <i className="far fa-image pl-2"></i>Téléchargez une photo
                              </span>
                            </button>
                          </div>
                        </div>
                        <div
                          id="UploadPostImg"
                          className="collapse"
                          aria-labelledby="PostImg"
                          data-parent="#UploadPostImg"
                        >
                          <div className="card-body">
                            <label
                              className="file-attachment-input"
                              htmlFor="fileAttachmentInput"
                            >
                              <span
                                id="customFile"
                                className="font-weight-semi-bold"
                              >
                                Parcourez votre appareil et téléchargez une photo.
                              </span>
                              <small className="d-block text-muted pt-2">
                              La taille maximale du fichier est de 10 Mo
                              </small>

                              <input
                                id="fileAttachmentInput"
                                name="file-attachment"
                                type="file"
                                className="file-attachment-input-label"
                                onChange={CheckImg}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                        Le Prix
                        </h6>
                      </div>
                      <input
                        type="number"
                        defaultValue={Product.price}
                        className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm"
                        placeholder="1000 دج"
                        ref={price}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small test-muted-f font-weight-bold mb-0">
                          Promotion
                        </h6>
                      </div>
                      <input
                        type="number"
                        defaultValue={Product.promo}
                        className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm"
                        placeholder="20 %"
                        ref={promo}
                        min={0} max={100}
                      />
                    </div>
                    {CategoriesList ? (
                      <div className="mb-4">
                        <div className="mb-2">
                          <h6 className="small text-muted-f font-weight-bold mb-0">
                            Categories
                          </h6>
                        </div>
                        <Select
                          multi={true}
                          value={SelectCategs}
                          options={[...CategoriesList]}
                          onChange={on_change}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="mb-4">
                      <div className="mb-2">
                        <h6 className="small text-muted-f font-weight-bold mb-0">
                        Masquer le produit
                        </h6>
                      </div>
                      <span className="custom-control custom-switch mr-2">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="hidePost"
                          onChange={(e) => {
                            setIsDraft(!isDraft);
                          }}
                          defaultChecked={isDraft}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="hidePost"
                        ></label>
                      </span>
                    </div>

                    <div className="d-flex mb-4">
                      <button
                        type="submit"
                        className="btn w-50 btn-sm btn-secondary-f font-weight-semi-bold text-white"
                      >
                        <i className="fal fa-file-alt pr-1"></i>sauvegarder
                      </button>

                      <button
                        type="button"
                        className="btn w-50 btn-sm btn-danger-f font-weight-semi-bold text-white mr-2"
                      >
                        <i className="fal fa-redo-alt pl-1"></i>Annuler
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </DASBOILERPLATE>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const {HOST} = process.env
  var Categs: CategSchema[] = [];
  var Product: ProductSchema = {
    id: 0,
    name: "",
    price: 0,
    promo: 0,
  };
  await Axios.get(`${HOST}/api/products/${context.query.id}`)
    .then((res) => {
      Product = res.data;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(async () => {
      await Axios.get(`${HOST}/api/categories`)
        .then((res) => {
          Categs = res.data || [];
        })
        .catch((err) => {
          console.log(err);
        });
    });
  return {
    props: { Categs, Product },
  };
}
