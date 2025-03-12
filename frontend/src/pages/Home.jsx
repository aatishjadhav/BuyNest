import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="mt-2">
          <img
            src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg"
            className="img-fluid"
            style={{ height: "500px" }}
            alt=""
          />
        </div>
        <div className="text-center py-5">
          <h2>Categories</h2>
          <div className="row py-3">
            <div className="col-md-3">
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <h2>Men</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <h2>Women</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <h2>Kids</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-light" style={{ padding: "6rem 6rem" }}>
                <h2>Electronics</h2>
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
