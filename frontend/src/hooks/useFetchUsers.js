import { useState, useEffect } from 'react'
import { api as axios } from '../api'
import { isAxiosError } from 'axios'
import { useCallback } from 'react'

const userCache = {}

export const useFetchUsers = (id = null) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  let url = '/users'
  if (id) url = `/users/${id}`

  const getUsers = useCallback(async () => {
    if (userCache[url]) {
      setData(userCache[url])
      setLoading(false)
      return
    }
    try {
      const response = await axios.get(url)
      const usersData = await response.data
      setData(usersData)
      userCache[url] = usersData
    } catch (error) {
      if (isAxiosError(error)) {
        const message = await error.response.data?.message
        console.log(message || 'An error has occured')
        setError(message || 'An error has occured')
        return
      }
      console.log(error.message || 'An error has occured')
      setError(error.message || 'An error has occured')
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const refetch = async () => {
    // Always refetch from server and update cache
    setLoading(true)
    try {
      const response = await axios.get(url)
      const usersData = await response.data
      setData(usersData)
      userCache[url] = usersData // Update cache
    } catch (error) {
      if (isAxiosError(error)) {
        const message = await error.response.data.message
        setError(message || 'An error has occured')
        return
      }
      setError(error.message || 'An error has occured')
    } finally {
      setLoading(false)
    }
  }

  return { data, error, loading, refetch }
}
