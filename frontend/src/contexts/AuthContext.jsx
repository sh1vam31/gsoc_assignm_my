

import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5002/api'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
   
    localStorage.removeItem('user')
    localStorage.removeItem('users')
    
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          
          const response = await axios.get(`${API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          
          setUser(response.data.user)
        } catch (error) {
         
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }
    verifyToken()
  }, [])

  const login = async (email, password) => {
    try {
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      
      const { token, user: userData } = response.data
      
      localStorage.setItem('token', token)
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const signup = async (name, email, password) => {
    try {

      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password
      })
      
      const { token, user: userData } = response.data
      
      localStorage.setItem('token', token)
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed')
    }
  }

  const logout = () => {
    setUser(null)
    
    localStorage.removeItem('token')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
