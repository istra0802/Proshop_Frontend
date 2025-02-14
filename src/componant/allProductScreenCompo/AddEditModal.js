import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../scss/Modal.scss"

import { updateProduct } from "../../Slices/productSlice";
import toast from "react-hot-toast";
import { addProductFromList } from "../../Slices/productSlice";

import { validateProductFormValues } from "../joi_validation/validation";
import { addProductHandlerService, updateProductHandler } from "../../service/product";

const UpdateModal = ({ show, handleClose, product}) => {
  console.log("product from modal", product);
  const dispatch = useDispatch();
  const [imgurl, setImgurl] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: product?.name || "",
      productPrice: product?.price || "",
      productImage: product?.image || "",
      productCategory: product ? product.category : "",
      productDescription: product ? product.description : "",
      productBrandName: product ? product.brand : "",
      productCountInStock: product ? product.countInStock : "",
    },
    // validate: (values) =>  validateProductFormValues(values),
  
    onSubmit: async (values) => {
      console.log(values,'000000000000000000000000000000000')
      const obj = {
        name: values.productName,
        price: values.productPrice,
        image: imgurl ? imgurl : product.image,
        category: values.productCategory,
        description: values.productDescription,
        brand: values.productBrandName,
        countInStock: values.productCountInStock,
      };
      if (product == undefined) {
        const token = localStorage.getItem("token");
        try {
          const { data } = await addProductHandlerService(obj)
          dispatch(addProductFromList(data.createdProduct));
        } catch (error) {
          console.log("error", error);
        }
        handleClose();
      } else {
       
        const updateProductbyid = async (id) => {

          console.log(id, " to check the id  ");

          try {

            const data = await updateProductHandler({id,obj})

            console.log(data,'update5555555555555555555555555')
            dispatch(updateProduct(data?.data?.product));
            toast.success("Product updated successfully");
          } catch (error) {
            toast.error("Updation failed ", {
              style: {
                borderRadius: "10px",
                background: "#FF3232",
                color: "#fff",
              },
            });
          }
        };
        updateProductbyid(product?._id);
        handleClose();

      }
    },
  });
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
      }}
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {product?._id ? "UPDATE PRODUCT DETAILS" : "ADD PRODUCT DETAILS"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formik.values.productName}
              initialValues={formik.values.productName}
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productName")}
            />
            {formik.errors.productName && formik.touched.productName ? (
              <div className="text-danger">{formik.errors.productName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Price:</label>
            <input
              min="0"
              type="text"
              id="productPrice"
              value={formik.values.productPrice}
              name="productPrice"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productPrice")}
            />
            {formik.errors.productPrice && formik.touched.productPrice ? (
              <div className="text-danger">{formik.errors.productPrice}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="image">Add Image:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              className="p-3 border border-dark rounded form-control-file"
              onChange={(e) => {
                const image = e.target.files[0];
                formik.setFieldValue("image", image);
                const reader = new FileReader();
                reader.readAsDataURL(image);
                reader.onload = () => {
                  setImgurl(reader.result); // This will set imgurl to a data URL
                };
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Category:</label>
            <select
              id="productCategory"
              name="productCategory"
              className="form-control border border-dark rounded p-2"
              style={{ padding: "inherit" }}
              {...formik.getFieldProps("productCategory")}
            >
              <option value="">Category</option>
              <option value="camera">Camera</option>
              <option value="laptop">Laptops</option>
              <option value="mobile phone">Mobile Phone</option>
            </select>
            {formik.errors.productCategory && formik.touched.productCategory ? (
              <div className="text-danger">{formik.errors.productCategory}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productdescription">Description:</label>
            <textarea
              id="productdescription"
              name="productdescription"
              className="form-control border border-dark rounded"
              rows="4"
              {...formik.getFieldProps("productDescription")}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="productBrandName">Brand Name:</label>
            <input
              type="text"
              id="productBrandName"
              name="productBrandName"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productBrandName")}
            />
            {formik.errors.productBrandName &&
            formik.touched.productBrandName ? (
              <div className="text-danger">
                {formik.errors.productBrandName}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productCountInStock">Count in Stock:</label>
            <input
              type="text"
              min="0"
              id="productCountInStock"
              name="productCountInStock"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productCountInStock")}
            />
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {product?._id ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default UpdateModal;
