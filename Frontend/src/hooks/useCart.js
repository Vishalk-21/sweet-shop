/**
 * useCart Hook
 * Manages shopping cart state and operations
 */

import { useStore } from '../store/store';

const useCart = () => {
  const cartItems = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCartItem = useStore((state) => state.updateCartItem);
  const clearCart = useStore((state) => state.clearCart);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    total,
    itemCount,
  };
};

export default useCart;
