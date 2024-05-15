import React from "react";

export default function SortItems({ onSortChange }) {
  const handleSortChange = (e) => {
    const selectedSortOption = e.target.value;
    onSortChange(selectedSortOption);
  };
  
    return (
    <div className="d-flex text-dark outline-secondary border border-secondary rounded-3 justify-content-center mb-3" style={{outlineStyle: "solid"}}> 
      <select
        className="form-select"
        aria-label="Default select example"
        onChange={handleSortChange}
      >
        <option value="priceLowToHigh">Sort by price: low to high</option>
        <option value="priceHighToLow">Sort by price: high to low</option>
        <option value="nameAZ">Sort by name: A to Z</option>
        <option value="nameZA">Sort by name: Z to A</option>
      </select>
    </div>
  );
}
