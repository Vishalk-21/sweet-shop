import { create } from 'zustand'

export const useStore = create((set) => ({
  // Auth state
  isLoggedIn: !!localStorage.getItem('authToken'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('authToken') || null,

  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('authToken', token)
    set({ isLoggedIn: true, user, token })
  },

  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('authToken')
    set({ isLoggedIn: false, user: null, token: null, cart: [] })
  },

  // Cart state
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),

  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item._id === product._id)
    let newCart

    if (existingItem) {
      newCart = state.cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCart = [...state.cart, { ...product, quantity: 1 }]
    }

    localStorage.setItem('cart', JSON.stringify(newCart))
    return { cart: newCart }
  }),

  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(item => item._id !== productId)
    localStorage.setItem('cart', JSON.stringify(newCart))
    return { cart: newCart }
  }),

  updateQuantity: (productId, quantity) => set((state) => {
    const newCart = state.cart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    )
    localStorage.setItem('cart', JSON.stringify(newCart))
    return { cart: newCart }
  }),

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ cart: [] })
  }
}))
