import React, { useState } from 'react';
import classnames from "classnames";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

export default function Contact() {
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);

  return (
    <div>
      

      <section className="section section-lg pt-lg-0 section-contact-us mt-5">
     
          <Row className="justify-content-center mt--300">
            <Col lg="10" md="11" sm="12" className='col-12'>
              <Card className="bg-gradient-secondary shadow" style={{maxWidth:"100%"}}>
                <CardBody className="p-lg-5">
                  <h4 className="mb-1 mt-3 text-center">Want to work with us?</h4>
                  <p className="mt-0 text-center">
                    Your project is very important to us.
                  </p>
                  <FormGroup
                    className={classnames("mt-4", {
                      focused: nameFocused,
                    })}
                  >
                    <InputGroup className="input-group-alternative">
                      
                      <Input
                        placeholder="Your name"
                        type="text"
                        onFocus={() => setNameFocused(true)}
                        onBlur={() => setNameFocused(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: emailFocused,
                    })}
                  >
                    <InputGroup className="input-group-alternative">
                     
                      <Input
                        placeholder="Email address"
                        type="email"
                        onFocus={() => setEmailFocused(true)}
                        onBlur={() => setEmailFocused(false)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Input
                      className="form-control-alternative"
                      cols="80"
                      name="name"
                      placeholder="Type a message..."
                      rows="4"
                      type="textarea"
                    />
                  </FormGroup>
                  <div>
                    <Button
                      block
                      className="btn-round"
                      color="default"
                      size="md"
                      type="button"
                    >
                      Send Message
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
     
      </section>
    </div>
  );
}
