import React, { useState, useContext, useEffect } from "react";
import * as fire from "firebase/app";
import { Button, Form } from "react-bootstrap";
import FirebaseContext from "../../firebase/context";
import FormValidation from "../../utils/from-validation";
import ValidateModel from "./validation";
import ModelsList from "../models-list";

const INITIAL_STATE = {
  brand: "",
  name: "",
};

const ModelForm = () => {
  const { firebase } = useContext(FirebaseContext);

  const { handleSubmit, handleChange, values } = FormValidation(
    INITIAL_STATE,
    ValidateModel,
    AddModel
  );

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);

  useEffect(() => {
    firebase.getCollectionSnapshotDocs("brands", setBrands);
  }, [firebase]);

  async function AddModel() {
    const brandId = await JSON.parse(values.brand).id;
    const brandRef = firebase.db.collection("brands").doc(brandId);

    await brandRef.update({
      models: fire.firestore.FieldValue.arrayUnion(values.name),
    });
  }

  function handleChangeOption(e) {
    const currentBrand = JSON.parse(e.target.value);
    setModels(currentBrand.models);
    handleChange(e);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control
            as="select"
            name="brand"
            onChange={handleChangeOption}
            value={values.brand}
          >
            <option value="">SELECT BRAND</option>
            {brands.map((b, index) => (
              <option key={index} value={JSON.stringify(b)}>
                {b.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Model Name"
            value={values.name}
          />
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
      <br />
      <ModelsList models={models} />
    </>
  );
};

export default ModelForm;
