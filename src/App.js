import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  TextareaAutosize,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Checkbox,
  FormGroup
} from "@material-ui/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  gender: Yup.string().required("Gender is required"),
  hobbies: Yup.array().min(1, "Select at least one hobby/interest")
});

const countries = [
  { value: "usa", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "ind", label: "India" },
  { value: "afg", label: "Afghanistan" },
  { value: "nep", label: "Nepal" },
  { value: "ch", label: "China" },
  { value: "bh", label: "Bhutan" },
  { value: "ban", label: "Bangladesh" }
  // Add more countries as needed
];

const hobbiesOptions = [
  { value: "reading", label: "Reading" },
  { value: "sports", label: "Sports" },
  { value: "music", label: "Music" },
  { value: "chess", label: "Chess" },
  { value: "singing", label: "singing" },
  { value: "writing", label: "Writng" }
  // Add more hobbies/interests as needed
];

const MyForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      country: "",
      gender: "",
      hobbies: []
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextareaAutosize
        rowsMin={3}
        placeholder="Address"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.address && Boolean(formik.errors.address)}
      />

      <FormControl
        fullWidth
        error={formik.touched.country && Boolean(formik.errors.country)}
      >
        <InputLabel htmlFor="country">Country</InputLabel>
        <Select
          id="country"
          name="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.country && formik.errors.country}
        </FormHelperText>
      </FormControl>

      <FormControl
        component="fieldset"
        error={formik.touched.gender && Boolean(formik.errors.gender)}
      >
        <RadioGroup
          row
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
        <FormHelperText>
          {formik.touched.gender && formik.errors.gender}
        </FormHelperText>
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
      >
        <InputLabel htmlFor="hobbies">Hobbies/Interests</InputLabel>
        <Select
          multiple
          id="hobbies"
          name="hobbies"
          value={formik.values.hobbies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderValue={(selected) => selected.join(", ")}
        >
          {hobbiesOptions.map((hobby) => (
            <MenuItem key={hobby.value} value={hobby.value}>
              <Checkbox checked={formik.values.hobbies.includes(hobby.value)} />
              {hobby.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {formik.touched.hobbies && formik.errors.hobbies}
        </FormHelperText>
      </FormControl>

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
};

export default MyForm;
