import { Form, Formik } from "formik";
import React from "react";
import { addPlayerValidation } from "../api";
import { InputField } from "../components";
import axios from "../api";

const role = ["Batsman", "Bowler", "All-rounder"];

const AddPlayer = () => {
  const initialState = {
    code: 0,
    playerName: "",
    imageUri: "",
    from: "",
    price: 0,
    isPlaying: false,
    description: "Batsman",
  };
  const onAddClick = (value, action) => {
    const { code, ...data } = value;
    const usersData = { code };
    axios
      .post("/players", {
        usersData,
        data: { ...data, price: `${data.price} Cr` },
      })
      .then((res) => {
        if (res && res.data === "Code Already Added") {
          alert("Please enter different code");
        } else if (res && res.data && res.data._id) {
          window.alert("Player added successfully");
          action.resetForm(initialState);
        }
      });
  };
  return (
    <div>
      <Formik
        initialValues={initialState}
        onSubmit={onAddClick}
        validateOnBlur
        validationSchema={addPlayerValidation}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form style={{ width: "100%" }}>
            <InputField
              name="code"
              label="Code"
              type="number"
              value={values.code || ""}
              onChange={handleChange}
            />
            <InputField
              name="playerName"
              label="Player Name"
              value={values.playerName || ""}
              onChange={handleChange}
            />
            <InputField
              name="imageUri"
              label="Player Image"
              value={values.imageUri || ""}
              onChange={handleChange}
            />
            <InputField
              name="from"
              label="Team"
              value={values.from || ""}
              onChange={handleChange}
            />
            <InputField
              name="price"
              label="Price"
              type="number"
              value={values.price || ""}
              onChange={handleChange}
            />
            <div className="flex items-center block mt-1">
              <input
                type="checkbox"
                style={{ marginRight: "8px" }}
                checked={values.isPlaying}
                onChange={(event) =>
                  setFieldValue("isPlaying", event.target.checked)
                }
              />
              <span>Playing</span>
            </div>
            <div className="flex items-center block mt-1 mb-1">
              <select
                value={values.description}
                onChange={(e) => setFieldValue("description", e.target.value)}
              >
                {role.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mt-1"
            >
              Add Player
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPlayer;
