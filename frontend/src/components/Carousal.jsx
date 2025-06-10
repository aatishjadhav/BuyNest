// import heroImg1 from "../assets/img1.png";
// import heroImg2 from "../assets/img2.png";
// import heroImg3 from "../assets/img3.png";
// import heroImg4 from "../assets/happy-modern-asian-woman-going-shopping-malls-holding-bags-with-clothes-smiling-wearing-sungl.jpg";

// const Carousal = () => {
//   return (
//     <div className="">
//       {/* <img
//             src={heroImg}
//             className="img-fluid rounded"
//             style={{ height: "500px", width: "1300px" }}
//             alt=""
//           /> */}
//       <div
//         id="carouselExampleAutoplaying"
//         class="carousel slide"
//         data-bs-ride="carousel"
//       >
//         <div class="carousel-inner">
//           <div class="carousel-item active">
//             <img
//               src={heroImg4}
//               class="d-block w-100 img-fluid"
//               style={{ height: "500px", width: "1300px" }}
//               alt="..."
//             />
//           </div>
//           <div class="carousel-item">
//             <img
//               src={heroImg2}
//               class="d-block w-100 img-fluid"
//               style={{ height: "500px", width: "1300px" }}
//               alt="..."
//             />
//           </div>
//           <div class="carousel-item">
//             <img
//               src={heroImg1}
//               class="d-block w-100 img-fluid"
//               style={{ height: "500px", width: "1300px" }}
//               alt="..."
//             />
//           </div>
//         </div>
//         <button
//           class="carousel-control-prev"
//           type="button"
//           data-bs-target="#carouselExampleAutoplaying"
//           data-bs-slide="prev"
//         >
//           <span class="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span class="visually-hidden">Previous</span>
//         </button>
//         <button
//           class="carousel-control-next"
//           type="button"
//           data-bs-target="#carouselExampleAutoplaying"
//           data-bs-slide="next"
//         >
//           <span class="carousel-control-next-icon" aria-hidden="true"></span>
//           <span class="visually-hidden">Next</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Carousal;

import heroImg1 from "../assets/img1.png";
import heroImg2 from "../assets/img2.png";
import heroImg3 from "../assets/img3.png";
import heroImg4 from "../assets/happy-modern-asian-woman-going-shopping-malls-holding-bags-with-clothes-smiling-wearing-sungl.jpg";

const Carousal = () => {
  return (
    <div className="">
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* First Image with Card Overlay */}
          <div className="carousel-item active position-relative">
            <img
              src={heroImg4}
              className="d-block w-100 img-fluid"
              style={{ height: "500px", width: "100%" }}
              alt="Shopping woman"
            />
            {/* Overlay card only on this image */}
            <div
              className="position-absolute top-50 start-50 translate-middle p-4 bg-white rounded shadow text-center"
              style={{ maxWidth: "600px" }}
            >
              <h2>Get 20% off on your first order!</h2>
              <p className="mb-2">Find your perfect shopping experience at ATTIREX</p>
              <button className="btn btn-dark rounded">Shop Now</button>
            </div>
          </div>

          {/* Other images without overlay */}
          <div className="carousel-item">
            <img
              src={heroImg2}
              className="d-block w-100 img-fluid"
              style={{ height: "500px", width: "100%" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src={heroImg1}
              className="d-block w-100 img-fluid"
              style={{ height: "500px", width: "100%" }}
              alt="..."
            />
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;

