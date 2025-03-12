// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchProducts } from "../slices/productsSlice";
// import { FaRegHeart } from "react-icons/fa";

// const ProductDetails = () => {
//   const dispatch = useDispatch();
//   const { products, status, error } = useSelector((state) => state.products);
//   const { productId } = useParams();
//   const product = products.find((prod) => prod._id === productId);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-md-4">
//           <div className="card">
//             <div style={{ backgroundColor: "light", padding: "20px" }}>
//               <img
//                 src={product.imgUrl}
//                 className="img-fluid"
//                 alt="Product"
//                 style={{
//                   height: "250px",
//                   width: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             </div>

//             <div
//               className="card-img-overlay p-2 d-flex justify-content-end"
//               style={{ width: "100%", pointerEvents: "none" }}
//             >
//               <h5
//                 className="card-title text-black rounded py-2 px-2 d-inline-block"
//                 style={{ pointerEvents: "auto", cursor: "pointer" }}
//               >
//                 <FaRegHeart size={20} style={{ cursor: "pointer" }} />{" "}
//               </h5>
//             </div>

//             <div className="card-body text-center">
//               <h6 className="fw-bold">{product.name}</h6>

//               <p className="fw-bold">₹{product.price}</p>

//               <button className="btn btn-primary w-100">Add to Cart</button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <h2>{product.name}</h2>
//           <p>{product.rating}</p>
//           <div className="d-flex gap-2">
//             <h5>₹{product.price} </h5>
//             <span className="text-decoration-line-through">
//               ₹{product.originalPrice}
//             </span>
//           </div>
//           <span>{product.discount} off</span>
//           <p>
//             Quantity: <button className="">-</button> {product.quantity}{" "}
//             <button>+</button>
//           </p>
//           <span>size: {product.size.join(" ")}</span>
//           <hr />

//           <div className="col-md-3">
//             <img src="" alt="" />
//             <p>{product.refundPolicy}</p>
//           </div>
//           <div className="col-md-3">
//             <img src="" alt="" />
//             <p>{product.paymentOptions.payOnDelivery}</p>
//           </div>
//           <div className="col-md-3">
//             <img src="" alt="" />
//             <p>{product.paymentOptions.freeDelivery}</p>
//           </div>
//           <div className="col-md-3">
//             <img src="" alt="" />
//             <p>{product.paymentOptions.securePayment}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { fetchProducts } from "../slices/productsSlice";
// import { FaRegHeart } from "react-icons/fa";

// const ProductDetails = () => {
//   const dispatch = useDispatch();
//   const { products, status, error } = useSelector((state) => state.products);
//   const { productId } = useParams();
//   const product = products.find((prod) => prod._id === productId);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <div className="col-md-4">
//           <div className="card">
//             <div style={{ backgroundColor: "light", padding: "20px" }}>
//               <img
//                 src={product?.imgUrl || "https://via.placeholder.com/250"}
//                 className="img-fluid"
//                 alt={product?.name || "Product Image"}
//                 style={{
//                   height: "250px",
//                   width: "100%",
//                   objectFit: "contain",
//                 }}
//               />
//             </div>

//             <div
//               className="card-img-overlay p-2 d-flex justify-content-end"
//               style={{ width: "100%", pointerEvents: "none" }}
//             >
//               <h5
//                 className="card-title text-black rounded py-2 px-2 d-inline-block"
//                 style={{ pointerEvents: "auto", cursor: "pointer" }}
//               >
//                 <FaRegHeart size={20} style={{ cursor: "pointer" }} />{" "}
//               </h5>
//             </div>

//             <div className="card-body text-center">
//               <h6 className="fw-bold">{product.name}</h6>

//               <p className="fw-bold">₹{product.price}</p>

//               <button className="btn btn-primary w-100">Add to Cart</button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-4">
//           <h2>{product.name}</h2>
//           <p>{product.rating}</p>
//           <div className="d-flex gap-2">
//             <h5>₹{product.price} </h5>
//             <span className="text-decoration-line-through text-muted">
//               ₹{product.originalPrice}
//             </span>
//           </div>
//           <span>{product.discount} off</span>
//           <p className="mt-2">
//             <b>Quantity: </b> <button className="">-</button> {product.quantity}{" "}
//             <button>+</button>
//           </p>
//           <span>Size: {product?.size?.join(" ")}</span>

//           <hr />

//           <div className="d-flex justify-content-between">
//             <div className="text-center">
//               <img
//                 src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"
//                 alt="Refund Policy"
//               />
//               <p>{product?.refundPolicy}</p>
//             </div>

//             <div className="text-center">
//               <img
//                 src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png"
//                 alt="Pay on Delivery"
//               />
//               <p>
//                 {product?.paymentOptions?.payOnDelivery
//                   ? "Pay on Delivery"
//                   : ""}
//               </p>
//             </div>

//             <div className="text-center">
//               <img
//                 src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"
//                 alt="Free Delivery"
//               />
//               <p>
//                 {product?.paymentOptions?.freeDelivery ? "Free Delivery" : ""}
//               </p>
//             </div>

//             <div className="text-center">
//               <img
//                 src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png"
//                 alt="Secure Payment"
//               />
//               <p>
//                 {product?.paymentOptions?.securePayment ? "Secure Payment" : ""}
//               </p>
//             </div>
//           </div>

//           <hr />
//           <h5>Description:</h5>
//           <span>{product.description}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../slices/productsSlice";
import { FaRegHeart, FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { productId } = useParams();
  const product = products.find((prod) => prod._id === productId);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Function to render stars with half stars
  const renderStars = (rating) => {
    const ratingValue = parseFloat(rating);
    const stars = [];
    
    // Create 5 stars (filled, half-filled, or empty)
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(ratingValue)) {
        // Full star
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i - 0.5 <= ratingValue) {
        // Half star
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        // Empty star
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    
    return stars;
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div style={{ backgroundColor: "light", padding: "20px" }}>
              <img
                src={product?.imgUrl || "https://via.placeholder.com/250"}
                className="img-fluid"
                alt={product?.name || "Product Image"}
                style={{
                  height: "250px",
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </div>

            <div
              className="card-img-overlay p-2 d-flex justify-content-end"
              style={{ width: "100%", pointerEvents: "none" }}
            >
              <h5
                className="card-title text-black rounded py-2 px-2 d-inline-block"
                style={{ pointerEvents: "auto", cursor: "pointer" }}
              >
                <FaRegHeart size={20} style={{ cursor: "pointer" }} />{" "}
              </h5>
            </div>

            <div className="card-body text-center">
              <h6 className="fw-bold">{product.name}</h6>

              <p className="fw-bold">₹{product.price}</p>

              <button className="btn btn-primary w-100">Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <h2>{product.name}</h2>
          {/* Modified to include stars with half-star support */}
          <div className="d-flex align-items-center mb-2">
            <p className="mb-0 me-2">{product.rating}</p>
            <div className="d-flex">
              {renderStars(product.rating)}
            </div>
          </div>
          <div className="d-flex gap-2">
            <h5>₹{product.price} </h5>
            <span className="text-decoration-line-through text-muted">
              ₹{product.originalPrice}
            </span>
          </div>
          <span>{product.discount} off</span>
          <p className="mt-2">
            <b>Quantity: </b>  <button className="btn btn-sm btn-outline-primary rounded-circle mx-2">-</button> {product.quantity}{" "}
            <button className="btn btn-sm btn-outline-primary rounded-circle mx-2">+</button>
          </p>
          <span>Size: {product?.size?.join(" ")}</span>

          <hr />

          <div className="d-flex justify-content-between">
            <div className="text-center">
              <img
                src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png"
                alt="Refund Policy"
              />
              <p>{product?.refundPolicy}</p>
            </div>

            <div className="text-center">
              <img
                src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png"
                alt="Pay on Delivery"
              />
              <p>
                {product?.paymentOptions?.payOnDelivery
                  ? "Pay on Delivery"
                  : ""}
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png"
                alt="Free Delivery"
              />
              <p>
                {product?.paymentOptions?.freeDelivery ? "Free Delivery" : ""}
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png"
                alt="Secure Payment"
              />
              <p>
                {product?.paymentOptions?.securePayment ? "Secure Payment" : ""}
              </p>
            </div>
          </div>

          <hr />
          <h5>Description:</h5>
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;