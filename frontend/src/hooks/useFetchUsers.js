import { useState, useEffect } from 'react'
import { api as axios } from '../api'
import { isAxiosError } from 'axios'

export const useFetchUsers = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      const response = await axios.get('/users')
      const usersData = await response.data
      setData(usersData)
    } catch (error) {
      if (isAxiosError(error)) {
        const message = await error.response.data.message
        console.log(message || 'An error has occured')
        setError(message || 'An error has occured')
        return
      }
      console.log(error.message || 'An error has occured')
      setError(error.message || 'An error has occured')
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading }
}
