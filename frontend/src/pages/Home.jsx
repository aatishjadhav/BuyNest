import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { fetchByCategory } from "../slices/productsSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products/categories/${category}`);
    dispatch(fetchByCategory(category));
  };

  return (
    <>
      <div className="container">
        <div className="mt-2">
          <img
            src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg"
            className="img-fluid rounded"
            style={{ height: "500px" }}
            alt=""
          />
        </div>
        <div className="text-center py-5">
          <h2>Categories</h2>
          <div className="row py-3 rounded">
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("mens")}
            >
              <div
                className="bg-light vspace=4"
                style={{ padding: "6rem 6rem" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <polyline points="17 11 19 13 23 9"></polyline>
                </svg>
                <h4 className="mt-3">Men</h4>
              </div>
            </div>
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("womens")}
            >
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 2H8l-4 7h3l-4 7h4l3 5 .5-9h4l.5 9 3-5h4l-4-7h3l-4-7Z"></path>
                </svg>
                <h4 className="mt-3">Women</h4>
              </div>
            </div>
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("Kids")}
            >
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M10 2v1h4V2"></path>
                  <path d="M13.8 8.8a2 2 0 0 0-3.6 0"></path>
                  <path d="M7 13.8a5 5 0 0 0 10 0"></path>
                  <path d="M17 15.2V16a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-.8"></path>
                  <path d="M12 22v-1"></path>
                </svg>
                <h4 className="mt-3">Kids</h4>
              </div>
            </div>
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("Electronics")}
            >
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
                <h4 className="mt-3">Electronics</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
