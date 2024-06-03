import React from 'react'
import CartProducts from '../../components/shoppingCart/CartProducts'

function ShoppingCart({token}) {
  return (
    <div>
      <CartProducts token={token}/>
    </div>
  )
}

export default ShoppingCart
