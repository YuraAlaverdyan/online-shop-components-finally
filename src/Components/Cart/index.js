import { useEffect, useMemo, useState } from "react";
import PropertyTypes from 'prop-types'
export const Cart = (props) => {
  const [showCart, setShowCart] = useState(false)
  // useEffect(() => {
  //   const { items, onSetTotal } = props
  //   if (items.length > 0) {
  //     props.onHandleSubtotal(items.reduce((a,b) => a + b.price * b.quontity,0))
  //     onSetTotal(items.map(elm => elm.price * elm.quontity).reduce((a, b) => a + b))
  //   } else {
  //     props.onHandleSubtotal(0)
  //     onSetTotal(0)
  //   }
  // }, [props.items])


  let total = useMemo(() => {
    const { items } = props
    if (items.length > 0) {
      return items.map(elm => elm.price * elm.quontity).reduce((a, b) => a + b)
    } else {
      return 0
    }
  },[props.items])

  if (showCart == false) {
    return <>
      <button className="btn btn-sm btn-danger cart-button" onClick={() => setShowCart(true)}><img src="https://www.clipartmax.com/png/full/227-2270970_basket-buy-buying-cart-online-shopping-groceries-purchase-buying-basket.png"/></button>
      {/* <button className="btn btn-md btn-danger" onClick={() => setShowCart(true)}>Show Cart</button> */}
    </>
  } else {

  return <>
    <h2>Cart (Total - {total} AMD)</h2>
    <table className='table table-dark table-bordered'>
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quontity</th>
          <th>Subtotal</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          props.items.map(elm => {
            return <tr key={elm.id} className = {elm.price * elm.quontity > elm.price * 5 ? "high" : ''}>
              <td>{elm.name}</td>
              <td>{elm.price} AMD</td>
              <td>{elm.quontity}</td>
              <td>{elm.quontity * elm.price}AMD</td>
              <td>
                <button className='btn btn-primary btn-sm mx-2' onClick={() => props.onQuontityUp(elm.id)}>+</button>
                <button className='btn btn-danger btn-sm mx-2 my-2' onClick={() => props.onQuontityDown(elm.id)}>-</button>
                <button className='btn btn-danger btn-sm mx-2' onClick={() => props.onDeleteItem(elm)}>Remove</button>
                <button className='btn btn-warning btn-sm mx-2' onClick={() => props.onMoveUp(elm)}>Move Up</button>
                <button className='btn btn-warning btn-sm' onClick={() => props.onMoveDown(elm)}>Move Down</button>
              </td>
            </tr>
          })
        }
      </tbody>
    </table>
    <button className="btn btn-sm btn-danger cart-button" onClick={() => setShowCart(false)}><img src="https://www.clipartmax.com/png/full/227-2270970_basket-buy-buying-cart-online-shopping-groceries-purchase-buying-basket.png"/></button>
    {/* <button className="btn btn-sm btn-danger cart-button" onClick={() => setShowCart(false)}>Hide Cart</button> */}
  </>
  }

}
Cart.propTypes = {
  items: PropertyTypes.array,
  onQuontityUp: PropertyTypes.func,
  onQuontitydown: PropertyTypes.func,
  onMoveDown: PropertyTypes.func,
  onMoveUp: PropertyTypes.func,
  onDeleteItem: PropertyTypes.func,
}