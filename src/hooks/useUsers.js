import {
  useState,
  useCallback,
  useEffect
} from 'react'

import axios from 'axios'
import { LIMIT_PAGE } from '../constants'

const useUsers = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState(0)

  const getUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_USERS_URL}?skip=${page*5}&limit=${LIMIT_PAGE}`)
      setUsers(data)
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
    console.log('_id :>> ', _id);
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

  const changePage = async (value) => {
    setPage(value)
    try {
      getUsers()
    } catch (err) {
      console.log('KO::USERS', err)
    }
  }

  /** GET USERS */
  useEffect(() => {
    getUsers()
    return () => {
      getUsers()
    }
  })

  return {
    users,
    createUser,
    editUser,
    deleteUser,
    changePage,
  }
}

export default useUsers
