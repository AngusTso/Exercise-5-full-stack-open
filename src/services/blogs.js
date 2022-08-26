import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const Login = async (info) => {
  const request = await axios.post(loginUrl , info)
  return request.data
}

const Create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl , newObj ,config)
  return request.data
}
const Delete = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${id}`
  const request = await axios.delete(url,config)
  return request.data
}
const Update = async (newObj , id) => {
  const url = `${baseUrl}/${id}`
  const request = await axios.put(url , newObj)
  return request.data
}

export default { getAll , Login , Create , Update , Delete , setToken }