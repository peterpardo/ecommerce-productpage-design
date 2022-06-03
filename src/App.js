import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import productImg1 from './assets/image-product-1.jpg';
import productImg2 from './assets/image-product-2.jpg';
import productImg3 from './assets/image-product-3.jpg';
import productImg4 from './assets/image-product-4.jpg';

function App() {
  const product = {
    id: 1,
    company: "SNEAKER COMPANY",
    images: [
      productImg1, 
      productImg2, 
      productImg3, 
      productImg4
    ],
    name: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    currentPrice: 125.00,
    discount: 50,
    origPrice: 250.00
  }

  const [currentProduct, setCurrentProduct] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const handleCarousel = (action) => {
    if (action == 'prev') {
      currentProduct === 0 
      ? setCurrentProduct(product.images.length - 1) 
      : setCurrentProduct(prev => prev - 1)
    } else {
      currentProduct === product.images.length - 1
      ? setCurrentProduct(0)
      : setCurrentProduct(prev => prev + 1)
    }
  }

  const handleQuantity = (action) => {
    if (action === 'subtract' && quantity !== 0) {
      setQuantity(prev => prev - 1);
    } else if (action === 'add'){
      // Optional: add limit to adding of qty based on stocks
      setQuantity(prev => prev + 1);
    }
  }

  const handleAddToCart = () => {
    // Must order atleast one item
    if (quantity === 0) return;
    console.log("ordered");
    
    // Reset quantity to 0
    setQuantity(0);

    const orderedItem = {
      id: product.id,
      image: product.images[0],
      itemName: product.name,
      price: product.currentPrice,
      quantity: quantity, 
      total: product.currentPrice * quantity
    }

    setCartItems([...cartItems, orderedItem]);
  }

  return (
    <div className="app">
      <Navbar cartItems={cartItems} setCartItems={setCartItems}/>
      
      <div className="productContainer">
        {/* product carousel */}
        <div className="productCarousel">
          <div className="arrow prev-arrow" onClick={() => handleCarousel('prev')}>
            <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg"><path d="M11 1 3 9l8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
          </div>

          <img src={product.images[currentProduct]} alt="img1" />     

          <div className="arrow next-arrow" onClick={() => handleCarousel('next')}>
            <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg"><path d="m2 1 8 8-8 8" stroke="#1D2026" stroke-width="3" fill="none" fill-rule="evenodd"/></svg>
          </div>
        </div>

        <div className="productDetails">
          <span className="productCompany">{product.company}</span>
          <h1 className="productName">{product.name}</h1>
          <p className="productDesc">{product.description}</p>

          <div className="priceWrapper">
            <h1 className="productPrice">${product.currentPrice.toFixed(2)}</h1>
            <span className="productDiscount">{product.discount}%</span>
            <del className="pOrigPrice">${product.origPrice.toFixed(2)}</del>
          </div>

          <div className="productQty">
            <span disabled={quantity <= 0} className="operation" onClick={() => handleQuantity('subtract')}>-</span>
            <span className="pQtyCount">{quantity}</span>
            <span className="operation" onClick={() => handleQuantity('add')}>+</span>
          </div>

          <div onClick={() => handleAddToCart()}className="cartWrapper">
            {/* cart */}
            <svg  className="addCart"width="22" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z" fill="currentColor" fill-rule="nonzero"/></svg>

            <span>Add to Cart</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
