import { API } from "../../config"
import axios from "axios";


export const getPublicKey = async() => {
     const res = await axios.get(`${API}/getpublicKey`);
     return (res.data.publicKey)
 }

