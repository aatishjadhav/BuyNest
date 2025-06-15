const FilterSidebar = ({
  filters,
  handlePriceChange,
  handleCategory,
  handleRatingChange,
  handleSort,
  dispatch,
  clearFilters,
}) => (
  <div className="col-md-3 col-lg-2 bg-white p-4 nscroll">
    <h5 className="fw-bold">
      Filters
      <span
        className="text-primary float-end"
        style={{ cursor: "pointer" }}
        onClick={() => dispatch(clearFilters())}
      >
        Clear
      </span>
    </h5>

    {/* Price Slider */}
    <div className="mb-4">
      <h6>Price</h6>
      <div className="d-flex justify-content-between px-2">
        {[0, 2000, 4000, 6000, 8000].map((price) => (
          <span key={price} className="small">
            {price / 1000}k
          </span>
        ))}
      </div>
      <input
        type="range"
        className="form-range"
        min="0"
        max="8000"
        step="2000"
        value={filters.maxPrice}
        onChange={handlePriceChange}
      />
      <p>Up to ₹{filters.maxPrice.toLocaleString()}</p>
    </div>

    {/* Category Checkboxes */}
    <div className="mb-4">
      <h6>Category</h6>
      {["Men's", "Women's", "Kids"].map((cat) => (
        <div className="form-check" key={cat}>
          <label>
            <input
              type="checkbox"
              className="form-check-input"
              name="category"
              value={cat}
              checked={filters.category.includes(cat)}
              onChange={handleCategory}
            />{" "}
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </label>
        </div>
      ))}
    </div>

    {/* Rating */}
    <div className="mb-4">
      <h6>Rating</h6>
      {[
        "4 Stars & above",
        "3 Stars & above",
        "2 Stars & above",
        "1 Star & above",
      ].map((rating, index) => (
        <div className="form-check" key={index}>
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            id={`rating${index}`}
            value={5 - index}
            onChange={handleRatingChange}
            checked={filters.rating === 5 - index}
          />
          <label className="form-check-label" htmlFor={`rating${index}`}>
            {rating}
          </label>
        </div>
      ))}
    </div>

    {/* Sort By */}
    <div>
      <h6>Sort by</h6>
      {[
        { id: "sort1", label: "Price - Low to High", value: "lowToHigh" },
        { id: "sort2", label: "Price - High to Low", value: "highToLow" },
      ].map((option) => (
        <div className="form-check" key={option.id}>
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id={option.id}
            checked={filters.sortBy === option.value}
            onChange={() => handleSort(option.value)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default FilterSidebar;
