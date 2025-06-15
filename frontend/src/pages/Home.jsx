import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { fetchByCategory } from "../slices/productsSlice";
import { useDispatch } from "react-redux";
import BannerSlider from "../components/BannerSlider";
import heroImg1 from "../assets/young-man-model-posing-street.jpg";
import heroImg3 from "../assets/portrait-teenagers-posing-wearing-sunglasses.jpg";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products/categories/${category}`);
    dispatch(fetchByCategory(category));
  };

  return (
    <>
      <div className="">
        <BannerSlider />

        <div className="container py-5">
          <h2 className="text-center fw-bold">CATEGORIES</h2>
          <p className="text-center fst-italic">
            We find the best suppliers and makers of fashion and fancy products.
          </p>

          <div className="row g-3">
            {/* MENS */}
            <div className="col-md-6">
              <div
                className="position-relative w-100 h-100 rounded"
                style={{
                  height: "100%",
                  minHeight: "636px",
                  backgroundImage: `url(${heroImg1})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="position-absolute bottom-0 start-50 translate-middle-x text-center text-white w-100 pb-3">
                  <h3 className="fw-bold">MENS</h3>
                  <button
                    onClick={() => handleCategoryClick("Men's")}
                    className="btn mt-2 fw-bold"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "999px",
                      padding: "10px 26px",
                      color: "black",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.color = "#000";
                      e.target.style.border = "1px solid #000";
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#121932";
                      e.target.style.color = "#fff";
                      e.target.style.border = "none";
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: WOMENS and KIDS */}
            <div className="col-md-6 d-flex flex-column gap-3">
              {/* WOMENS */}
              <div
                className="position-relative rounded flex-grow-1"
                style={{
                  backgroundImage:
                    "url('https://img.freepik.com/free-photo/fashionable-woman-brown-coat-beige-hat-posing_273443-3773.jpg?uid=R191965247&ga=GA1.1.1972545887.1742204657&semt=ais_hybrid&w=740')",
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                  minHeight: "310px",
                }}
              >
                <div className="position-absolute bottom-0 start-50 translate-middle-x text-center text-white w-100 pb-3">
                  <h3 className="fw-bold">WOMENS</h3>
                  <button
                    onClick={() => handleCategoryClick("Women's")}
                    className="btn mt-2 fw-bold"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "999px",
                      padding: "10px 26px",
                      color: "black",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.color = "#000";
                      e.target.style.border = "1px solid #000";
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#121932";
                      e.target.style.color = "#fff";
                      e.target.style.border = "none";
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>

              {/* KIDS */}
              <div
                className="position-relative rounded flex-grow-1"
                style={{
                  backgroundImage: `url(${heroImg3})`,
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                  minHeight: "310px",
                }}
              >
                <div className="position-absolute bottom-0 start-50 translate-middle-x text-center text-white w-100 pb-3">
                  <h3 className="fw-bold">KIDS</h3>
                  <button
                    onClick={() => handleCategoryClick("Kids")}
                    className="btn mt-2 fw-bold"
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: "999px",
                      padding: "10px 26px",
                      color: "black",
                      transition: "all 0.3s ease-in-out",
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#fff";
                      e.target.style.color = "#000";
                      e.target.style.border = "1px solid #000";
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#121932";
                      e.target.style.color = "#fff";
                      e.target.style.border = "none";
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;
