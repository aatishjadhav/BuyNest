import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imageConfig from "../constants/imageConfig";

const images = imageConfig.homepage.bannerSlider;

const BannerSlider = () => {
  const [current, setCurrent] = useState(0);
  const [loadedImages, setLoadedImages] = useState(
    Array(images.length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  const allImagesLoaded = loadedImages.every(Boolean);

  return (
    <div
      className="position-relative"
      style={{ height: "500px", overflow: "hidden" }}
    >
      {/* Image Slides */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          loading="lazy"
          onLoad={() => handleImageLoad(index)}
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            objectFit: "cover",
            objectPosition: "right center",
            opacity: index === current && loadedImages[index] ? 1 : 0,
            transition: "opacity 2s ease-in-out",
            zIndex: index === current ? 1 : 0,
          }}
        />
      ))}

      {/* Overlay - show only if all images are loaded */}
      {allImagesLoaded && (
        <div
          className="position-absolute top-50 start-50 translate-middle text-center shadow"
          style={{
            width: "90%",
            maxWidth: "600px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            borderRadius: "0.7rem",
            padding: "1.5rem",
            zIndex: 2,
            transition: "opacity 1s ease-in-out",
          }}
        >
          <h2 className="mb-3 fs-4 fw-bold">
            Get 20% off on your first order!
          </h2>
          <p className="mb-3">
            Find your perfect shopping experience at BUYNEST
          </p>
          <Link
            to="/products"
            className="btn mt-2"
            style={{
              backgroundColor: "#121932",
              borderRadius: "999px",
              padding: "10px 26px",
              color: "#fff",
              transition: "all 0.3s ease-in-out",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#000";
              e.target.style.border = "1px solid #000";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#121932";
              e.target.style.color = "#fff";
              e.target.style.border = "none";
            }}
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default BannerSlider;
