import Axios from "axios";
import { sign, verify } from "jsonwebtoken";
import { ProductSchema } from "./data.spec";
const { SECRET } = process.env
const EmptyList = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjpbXSwiaWF0IjoxNjA1MTI0MzAxfQ.immmLAUEWSIiWeplBAzVmc1XtZTzisKsvgzT4KMaOOk"


export function EditOrders(data:ProductSchema[]) {
    const jwt = sign({
        data: data
      }, "ORDERS", { expiresIn: '30d' })
    return jwt
}

export function GetOrders(data:string) {
var cookie = EmptyList
    verify(data,"ORDERS",(err,decoded:any)=>{
        if (!err && decoded) {
            cookie = data
        }
    })
    return cookie
}