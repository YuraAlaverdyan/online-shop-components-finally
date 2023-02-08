import { useState } from 'react';

Array.prototype.swapItems = function (i1, i2) {
    [this[i1], this[i2]] = [this[i2], this[i1]]
}

export const ProductList = (props) => {
    const [styles, setStyles] = useState('col-md-4 my-2')
    const moveToCart = prod => {
        let obj = props.items.find(elm => elm.id === prod.id)
        if (obj) {
            obj.quontity++
            props.setItems([...props.items])
        } else {
            props.setItems([{ ...prod, quontity: 1 }, ...props.items])
        }
    }

    const show4Row = () => {
        setStyles('col-md-3 my-2')
    }

    const show3Row = () => {
        setStyles('col-md-4 my-2')
    }

    return <>
        <h2 className='text-center'>Products</h2>
        <div className="d-flex justify-content-center gap-2">
            <button className="btn btn-warning" onClick={() => show4Row()}>Show 4</button>
            <button className="btn btn-warning" onClick={() => show3Row()}>Show 3</button>
        </div>
        <div className='row'>
            {
                props.allProducts.map((elm, i) => {
                    return <div className={styles} key={elm.id}>
                        <img src={elm.photo} />
                        <h4>{elm.name}</h4>
                        <h5>{elm.category}</h5>
                        <p className='text-danger'>{elm.price} AMD</p>
                        <button className='btn btn-success btn-sm' onClick={() => moveToCart(elm)}>Move to Cart</button>
                    </div>
                })
            }
        </div>
    </>
}