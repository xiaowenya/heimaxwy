import axios from "axios"
const instance = axios.create({
  baseUrl: process.env.VUE_APP_BASEURL,
  withCredentials: true
})