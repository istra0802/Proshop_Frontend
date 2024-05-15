// Filter.js
import React, { useState, useCallback } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import PriceRangeSlider from "./filtermicrocompo.js/PriceRangeSlider";
import FilterButton from "./filtermicrocompo.js/FilterButton";
import Accordion from "./filtermicrocompo.js/FilterAccordion";

const Filter = ({ handleFilter }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [priceRange, setPriceRange] = useState([20, 10000]);

  const handleRangeChange = useCallback((newPriceRange) => {
    setPriceRange(newPriceRange);
  }, []);

  const handleFilterButtonClick = useCallback(() => {
    handleFilter(priceRange);
    handleClose();
  }, [handleFilter, priceRange]);



  return (
    <>
      <button
        type="button"
        onClick={handleShow}
        className="btn outline-secondary  bg-transparent text-dark" 
        style={{outlineStyle: "solid"}}
      >
        Filter
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mt-5 fs-2">Filter by price</div>
          <PriceRangeSlider
            priceRange={priceRange}
            handleRangeChange={handleRangeChange}
          />
          <FilterButton
            handleFilterButtonClick={handleFilterButtonClick}
            priceRange={priceRange}
          />

          <div>
         <Accordion/>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
};

export default Filter;
