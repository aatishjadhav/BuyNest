import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { fetchByCategory } from "../slices/productsSlice";
import { useDispatch } from "react-redux";
import Carousal from "../components/Carousal";

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
        <Carousal />
        <div className="text-center py-5 container">
          <h2>Categories</h2>
          <div className="row py-3 rounded">
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("mens")}
            >
              <div
                className="bg-light rounded text-white d-flex align-items-center justify-content-center"
                style={{
                  height: "310px",
                  backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1687914904404-b683856ae25c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fG1lbnN8ZW58MHx8MHx8fDA%3D')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                }}
              >
                <h4 className="bg-dark bg-opacity-50 w-100 text-center py-2 m-0">
                  Men
                </h4>
              </div>
            </div>
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("womens")}
            >
              <div
                className="bg-light rounded text-white d-flex align-items-center justify-content-center"
                style={{
                  height: "310px",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tZW5zfGVufDB8fDB8fHww')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                }}
              >
                <h4 className="bg-dark bg-opacity-50 w-100 text-center py-2 m-0">
                  Women
                </h4>
              </div>
            </div>
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("Kids")}
            >
              <div
                className="bg-light rounded text-white d-flex align-items-center justify-content-center"
                style={{
                  height: "310px",
                  backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1691367782367-2bd37f646abc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGtpZHMlMjBjbG90aGVzfGVufDB8fDB8fHww')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                }}
              >
                <h4 className="bg-dark bg-opacity-50 w-100 text-center py-2 m-0">
                  Kids
                </h4>
              </div>
            </div>
            <div
              className="col-md-3 mb-3"
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick("Electronics")}
            >
              <div
                className="bg-light rounded text-white d-flex align-items-center justify-content-center"
                style={{
                  height: "310px",
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "12px",
                }}
              >
                <h4 className="bg-dark bg-opacity-50 w-100 text-center py-2 m-0">
                  Electronics
                </h4>
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
