/**
 * Authentication Context
 * Manages user authentication state and operations with MongoDB backend
 */

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

  // Check for existing session on mount
  useEffect(() => {
    // Clean up old localStorage data (if any)
    localStorage.removeItem('user')
    localStorage.removeItem('users')
    
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          // Fetch user data from MongoDB via backend API
          const response = await axios.get(`${API_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          // User data comes from MongoDB, not localStorage
          setUser(response.data.user)
        } catch (error) {
          // Invalid token, remove it
          localStorage.removeItem('token')
        }
      }
      setLoading(false)
    }
    verifyToken()
  }, [])

  const login = async (email, password) => {
    try {
      // Send credentials to backend, which checks MongoDB
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      })
      
      const { token, user: userData } = response.data
      // Only store JWT token, user data comes from MongoDB
      localStorage.setItem('token', token)
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  }

  const signup = async (name, email, password) => {
    try {
      // Send user data to backend, which saves to MongoDB
      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password
      })
      
      const { token, user: userData } = response.data
      // Only store JWT token, user data is saved in MongoDB
      localStorage.setItem('token', token)
      setUser(userData)
      return userData
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Signup failed')
    }
  }

  const logout = () => {
    setUser(null)
    // Only remove JWT token, user data stays in MongoDB
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
