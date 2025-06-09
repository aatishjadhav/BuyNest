import heroImg1 from "../assets/img1.png";
import heroImg2 from "../assets/img2.png";
import heroImg3 from "../assets/img3.png";

const Carousal = () => {
  return (
    <div className="">
      {/* <img
            src={heroImg}
            className="img-fluid rounded"
            style={{ height: "500px", width: "1300px" }}
            alt=""
          /> */}
      <div
        id="carouselExampleAutoplaying"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src={heroImg2}
              class="d-block w-100 img-fluid"
              style={{ height: "500px", width: "1300px" }}
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src={heroImg3}
              class="d-block w-100 img-fluid"
              style={{ height: "500px", width: "1300px" }}
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src={heroImg1}
              class="d-block w-100 img-fluid"
              style={{ height: "500px", width: "1300px" }}
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousal;
