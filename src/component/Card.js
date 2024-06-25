import React, { useState, useEffect, useRef } from 'react';
import { useDispatchCart, useCart } from './ContexReducer';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const refprice = useRef();
  const { foodItem, option } = props;
  const Priceoption = Object.keys(option);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(Object.keys(option)[0]); // Default to the first option
  let finalPrice = qty * parseInt(option[size]);

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }
  useEffect(() => {
    setSize(refprice.current.value);
  }, []);

  return (
    <div className='card mt-3 mb-3' style={{ maxWidth: '18rem', margin: '0 auto', background: 'black', border: '2px solid white' }}>
      <img src={foodItem.img} className='card-img-top' alt='Food' style={{ maxHeight: '200px', objectFit: 'cover' }} />
      <div className='card-body'>
        <h5 className='card-title' style={{ color: 'white' }}>{foodItem.name}</h5>
        <div className='container'>
          <div className='d-flex align-items-center mb-2'>
            <label htmlFor='quantity' className='form-label me-2' style={{ color: 'white' }}>Quantity:</label>
            <select id='quantity' className='form-select me-2' style={{ background: 'green', color: 'white' }} onChange={(e) => { setQty(e.target.value); }}>
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className='d-flex align-items-center mb-2'>
            <label htmlFor='price' className='form-label me-2' style={{ color: 'white' }}>Price:</label>
            <select id='price' className='form-select me-2' style={{ background: 'green', color: 'white' }} ref={refprice} onChange={(e) => { setSize(e.target.value); }}>
              {Priceoption.map((data) => (
                <option value={data} key={data}>{data}</option>
              ))}
            </select>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='ft-5' style={{ color: 'white' }}>${finalPrice}/-</div>
          </div>
          <hr />
          <button className='btn btn-primary' onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
