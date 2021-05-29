import React, { useState, useRef, useEffect } from "react";
import DASBOILERPLATE from "../../../../components/DASBOILERPLATE";
import Select from 'react-select'
import { NextPageContext } from "next";
import { CategSchema } from "../../../../services/data.spec"
import Axios from "axios";
import Router from "next/router";
import { Loading, Seccess,Oops } from "../../../../components/Alert";


const superBase64 = (file:any) => {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });
};

export default function newPost(props: { Categories: CategSchema[] }) {
  interface categs {
    label: string,
    value: number
  }
  // States for Craetion Content
  const Categs = props.Categories
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const promo = useRef<HTMLInputElement>(null);
  const [image, setimage] = useState<any>(null);
  const [imgtmp, setimgTmp] = useState<[any]>();
  const [CategoriesList, setCategoriesList] = useState<categs[]>([]);
  const [Categories, setCategories] = useState([{id:0}]);
  const [isDraft, setIsDraft] = useState(false);

  const GetCategs = async() => {
    const List:categs[] = []
    await Categs.map(data => {
      List.push({ label: data.name,value: data.id })
    })
    return setCategoriesList(List)
  }
  const CheckImg = (e: any) => {
    const ImgsExt = ["png", "jpg", "svg"];
    const imgPart = e.target.value.split(".");
    const Ext = imgPart[imgPart.length - 1];
    if (ImgsExt.indexOf(Ext) >= 0) {
    setimgTmp(e.target.files)
    var blob = new Blob(e.target.files);
    superBase64(blob).then(res=>{
      setimage(res)
    })
    } else {
      setimgTmp(null!)      
    }

  };
  const newProduct = async(e:any)=>{
    e.preventDefault();
    Loading()
    let bodyFormatData = new FormData()
    bodyFormatData.append("file",imgtmp![0])
    var Product ={
      name: name.current?.value,
      image: "",
      price: Number(price.current?.value),
      promo: Number(promo.current?.value)||0,
      published: !isDraft,
      categories: Categories[0].id!=0?Categories:[]
    }
   await Axios.post("/api/upload",bodyFormatData).then(res=>{
     const imgUrl = `/upload/${res.data.src}`
     Product.image = imgUrl

   }).finally(async()=>{
    await Axios.post("/api/products",Product).then(res=>{
      Seccess()
      Router.push('/dashboard/admin/products')
    }).catch(err => {
      console.log(Product);
      Oops()
    })
   })
  }
const on_change = (val:any)=>{
  setCategories([{id: val.value}])
}
useEffect(() => {
  GetCategs()
}, [])
  return <DASBOILERPLATE title="Nouveau produit">
    <div className="col-12 col-lg-10">
      <form className="container spacer-70" onSubmit={newProduct}>

        <div className="mb-0">
          <h5 className="font-size-2 font-weight-bold text-muted-f mb-0">Nom du produit</h5>
        </div>
        <div className="row justify-content-between mt-n3">
          <div className="col-12 col-lg-8">
            <div className="mt-5 mb-0 mb-md-3">
              <div className="input-group input-group-merge">
                <input type="text" className="form-control form-control-lg font-size-1 text-muted-f border-0 rounded-lg shadow" id="Ds-articleTitle" placeholder="Nom du produit" required ref={name} />
              </div>
              <img src={image?image:"/assets/img/misc/office.svg"} className="d-none d-lg-block w-100" alt="svg" />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="sticky-top mt-5 mb-3">
              <div className="card border-0 rounded-lg shadow-sm">
                <div className="card-body">

                  <div className="mb-4">
                    <div className="mb-2">
                      <h6 className="small test-muted-f font-weight-bold mb-0">Image du produit</h6>
                    </div>


                    <div className="card mb-3" role="tablist">
                      <div id="PostImg">
                        <div className="border-bottom mb-0">
                          <button type="button" className="btn btn-sm btn-block text-muted d-flex justify-content-between collapsed"
                            data-toggle="collapse" data-target="#UploadPostImg" aria-expanded="false" aria-controls="UploadPostImg">
                            <span><i className="far fa-image pr-2"></i>Téléchargez une photo</span>
                          </button>
                        </div>
                      </div>
                      <div id="UploadPostImg" className="collapse" aria-labelledby="PostImg" data-parent="#UploadPostImg">
                        <div className="card-body">
                          <label className="file-attachment-input" htmlFor="fileAttachmentInput">
                            <span id="customFile" className="font-weight-semi-bold">Parcourez votre appareil et téléchargez une photo.</span>
                            <small className="d-block text-muted pt-2">La taille maximale du fichier est de 10 Mo</small>

                            <input id="fileAttachmentInput" name="file-attachment" type="file" className="file-attachment-input-label" onChange={CheckImg} />
                          </label>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div className="mb-4">
                    <div className="mb-2">
                      <h6 className="small test-muted-f font-weight-bold mb-0">Le Prix</h6>
                    </div>
                    <input type="number" className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm" placeholder="1000 DA" min={1} required ref={price} />
                  </div>
                  <div className="mb-4">
                    <div className="mb-2">
                      <h6 className="small test-muted-f font-weight-bold mb-0">Promotion</h6>
                    </div>
                    <input type="number" className="form-control form-control-sm font-size-1 text-muted-f rounded shadow-sm" placeholder="20 %" required ref={promo} min={0} max={100} />
                  </div>
                  {CategoriesList?(
                    <div className="mb-4">
                    <div className="mb-2">
                      <h6 className="small text-muted-f font-weight-bold mb-0">Catégories</h6>
                    </div>
                    <Select
                      multi={true}
                      options={[...CategoriesList]}
                      onChange={on_change}
                      required
                      />
                  </div>
                  ):""}


                  <div className="mb-4">
                    <div className="mb-2">
                      <h6 className="small text-muted-f font-weight-bold mb-0">Masquer le produit</h6>
                    </div>
                    <span className="custom-control custom-switch mr-2">
                      <input type="checkbox" className="custom-control-input" id="hidePost" onChange={(e)=>{setIsDraft(e.target.checked)}} defaultChecked={isDraft} />
                      <label className="custom-control-label" htmlFor="hidePost"></label>
                    </span>
                  </div>

                  <div className="d-flex mb-4">

                    <button type="submit" className="btn w-50 btn-sm btn-secondary-f font-weight-semi-bold text-white mr-1">
                      <i className="fal fa-file-alt pr-2"></i>Ajouter
                        </button>

                    <button type="reset" className="btn w-50 btn-sm btn-danger-f font-weight-semi-bold text-white ml-1">
                      <i className="fal fa-redo-alt pr-2"></i>Réinitialiser
                                        </button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  </DASBOILERPLATE>;
}

export async function getServerSideProps(context: NextPageContext) {
  const {HOST} = process.env
  var Categories: CategSchema[] = []
  await Axios.get(`${HOST}/api/categories`).then(res => {
    Categories = res.data || []
  }).catch(err => {
    Categories = []
  })
  return {
    props: { Categories }
  };
}
