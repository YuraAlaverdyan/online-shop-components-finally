import './App.css';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react'
import axios from 'axios';
import { Cart } from './Components/Cart';
import { ProductList } from './Components/ProductList';
import { ShowTabs } from './Components/ShowTabs';
import { DropDown } from './Components/DropDown';

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  // const showAll = () => {
  //   axios.get('http://localhost:5000/products')
  //     .then(resp => {
  //       setProducts(resp.data.products)
  //     })
  // }

  // const showClothes = () => {
  //   axios.get('http://localhost:5000/products/clothes')
  //     .then(resp => {
  //       setProducts(resp.data.products)
  //     })
  // }

  // const showTech = () => {
  //   axios.get('http://localhost:5000/products/Tech')
  //     .then(resp => {
  //       setProducts(resp.data.products)
  //     })
  // }

  // const showBooks = () => {
  //   axios.get('http://localhost:5000/products/books')
  //     .then(resp => {
  //       setProducts(resp.data.products)
  //     })
  // }

  useEffect(() => {
    axios.get('http://localhost:5000/products/')
      .then(resp => {
        setProducts(resp.data.products)
      })
  }, []);

  const quontityUp = id => {
    let obj = cart.find(x => x.id === id)
    if (obj) {
      obj.quontity++
    }
    setCart([...cart])
  }

  const quontityDown = id => {
    let obj = cart.find(x => x.id === id)
    if (obj && obj?.quontity > 1) {
      obj.quontity--
    }
    setCart([...cart])
  }

  const deleteItem = prod => {
    cart.splice(cart.indexOf(prod), 1)
    setCart([...cart])
  }

  const moveUp = elm => {
    let index = cart.indexOf(elm)
    if (index > 0) {
      cart.swapItems(index, index - 1)
      setCart([...cart])
    }
  }

  const moveDown = elm => {
    let index = cart.indexOf(elm)
    if (index < cart.indexOf(cart.at(-1))) {
      cart.swapItems(index, index + 1)
      setCart([...cart])
    }
  }

  const handleFilter = text => {
    let url = 'http://localhost:5000/products'
    url += text == "All" ? '' : '/' + text
    axios.get(url)
      .then(resp => {
        setProducts(resp.data.products)
      })
  }

  const priceSort = text => {
    if (text == 'asc') {
      setCart([...cart.sort((a, b) => a.price * a.quontity - b.price * b.quontity)])
    } else {
      setCart([...cart.sort((a, b) => b.price * b.quontity - a.price * a.quontity)])
    }
  }




  return <>
    <h1 className='display-1 text-center'>online shop</h1>
    {/* <ShowTabs
        onShowAll={showAll}
        onShowClothes={showClothes}
        onShowBooks={showBooks}
        onShowTech={showTech}
      /> */}
    <div className='row'>
      <div className='col-md-7'>
      <DropDown
        items={["clothes", "Tech", "books", "All"]}
        onFilter={handleFilter}
      />
        <ProductList
          allProducts={products}
          items={cart}
          setItems={setCart}
        />
      </div>
      <div className='col'>
      <DropDown
          items={["asc", "desc"]}
          onFilter={priceSort}
          />
        <Cart
          items={cart}
          onQuontityDown={quontityDown}
          onQuontityUp={quontityUp}
          onDeleteItem={deleteItem}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
        />
      </div>
    </div>
  </>
}

export default App;
