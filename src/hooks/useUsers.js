import {
  useState,
  useCallback,
  useEffect
} from 'react'

import axios from 'axios'
import { LIMIT_PAGE } from '../constants'

const useUsers = (setloader) => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  const getUsers = useCallback(async (_page) => {
    try {
      setloader(true)
      setPage(page)
      const { data:cant } = await axios.get(process.env.REACT_APP_USERS_URL)
      setTotal(cant.length)
      const { data } = await axios.get(`${process.env.REACT_APP_USERS_URL}?skip=${(_page || page)*LIMIT_PAGE}&limit=${LIMIT_PAGE}`)
      setUsers(data)
      setloader(false)
    } catch (err) {
      console.log('KO::USERS', err)
    }
  }, [page, setUsers])

  const createUser = async (user) => {
    try {
      const { data } = await axios.post(process.env.REACT_APP_USERS_URL, user)
      console.log('data :>> ', data, user);
      getUsers()
    } catch (err) {
      console.log('KO::USERS', err)
    }
  }

  const editUser = async ({_id, ...user}) => {
    try {
      if (Object.keys(user).length === 5) {
        const { data } = await axios.put(`${process.env.REACT_APP_USERS_URL}/${_id}`, user)
        console.log('data :>> ', data);
      } else {
        const { data } = await axios.patch(`${process.env.REACT_APP_USERS_URL}/${_id}`, user)
        console.log('data :>> ', data);
      }
      getUsers()
    } catch (err) {
      console.log('KO::USERS', err)
    }
  }

  const deleteUser = async (id) => {
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_USERS_URL}/${id}`)
      console.log('data :>> ', data);
      getUsers()
    } catch (err) {
      console.log('KO::USERS', err)
    }
  }

  useEffect(() => {
    getUsers()
  },[])

  return {
    users,
    createUser,
    editUser,
    deleteUser,
    getUsers,
    total
  }
}

export default useUsers
