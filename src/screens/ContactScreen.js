import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import ProfileNameField from  "../componant/profile/profileField/ProfileNameField"
import ProfileEmailField from "../componant/profile/profileField/ProfileEmailField";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { validateContactFormValues } from "../componant/joi_validation/validation";


export default function ContactScreen() {
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userInfo ? userInfo.name : "",
      email: userInfo ? userInfo.email : "",
      message: "",
    },
    validate: (values) =>  validateContactFormValues(values),
    onSubmit: async (values, { resetForm }) => {
      try {
        // You can add your submission logic here
        
        toast.success("Message sent successfully.");

        // Clear form fields after submission
        resetForm();
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message. Please try again later.");
      }
    },
  });

  return (
    <div className="contact-screen">
      <Row>
        <Col md={6} className="contact-info">
          <h1>Contact Us</h1>
          <ul>
            <li>
              <FaEnvelope /> example@example.com
            </li>
            <li>
              <FaPhone /> +1 234 567 890
            </li>
            <li>
              <FaMapMarkerAlt /> 123 Street, City, Country
            </li>
          </ul>
        </Col>
        <Col md={6} className="contact-form">
          <h1>Send us a message</h1>
          <Form onSubmit={formik.handleSubmit} noValidate>
            <ProfileNameField formik={formik} />
            <ProfileEmailField formik={formik} />
            <Form.Group controlId="formBasicMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.message && formik.errors.message}
                placeholder="Enter your message"
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-4">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
