import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:4000"
})
export const dataProvider = {
    ListData: async (resource:string)=>{
       return await api.get(resource)
    },
    createData: async <T>(resource:string,data:T)=>{
        return await api.post(resource,data)
     },
    updateData: async <T>(resource:string,data:T,id:number|string)=>{
        return await api.put(resource+`/${id}`,data)
     },
    deleteData: async (resource:string,id:number|string)=>{
        return await api.delete(resource+`/${id}`)
     }
}
export const {ListData,createData,updateData,deleteData} = dataProvider