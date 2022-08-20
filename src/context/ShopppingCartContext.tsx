import { createContext, ReactNode, useContext, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalSotrage'

type ShoppingCartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type ShoppingCartContextProps = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext)
}

export const ShoppingCartProvider = ({
  children
}: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, SetCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  )

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0
  }
  const increaseCartQuantity = (id: number) => {
    SetCartItems((currItem) => {
      if (cartItems.find((item) => item.id === id) == null) {
        return [...currItem, { id, quantity: 1 }]
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else return item
        })
      }
    })
  }
  const decreaseCartQuantity = (id: number) => {
    SetCartItems((currItem) => {
      if (cartItems.find((item) => item.id === id) == null) {
        return currItem.filter((item) => item.id !== id)
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else return item
        })
      }
    })
  }
  const removeFromCart = (id: number) => {
    SetCartItems((currItem) => {
      return currItem.filter((item) => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity
      }}>
      <ShoppingCart isOpen={isOpen} />
      {children}
    </ShoppingCartContext.Provider>
  )
}
