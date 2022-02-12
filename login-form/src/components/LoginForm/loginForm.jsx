import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import ApiService from "../../services/api-service";
import { login } from "../../store/auth";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import CloseIcon from "@material-ui/icons/Close";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState(null);

  const validationSchema = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    } else if (values.email) {
    }
    return errors;
  };
  const authorization = async ({ email, password }) => {
    try {
      const { user } = await ApiService.login({ email, password });
      const loginSuccess = login(user);
      dispatch(loginSuccess);
    } catch (error) {
      setErrorMsg(error.message);
      console.log(errorMsg);
    }
  };
  const deleteErrorHandler = () => {
    setErrorMsg(null);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={validationSchema}
      onSubmit={authorization}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form className='ContainerForm' onSubmit={handleSubmit}>
          {errorMsg ? (
            <p className='errorValid'>
              <CloseIcon
                className='inputIcon'
                style={{ padding: "0" }}
                onClick={deleteErrorHandler}></CloseIcon>
              {errorMsg}
            </p>
          ) : null}

          <p className='inputBox'>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder='Username'></input>
            <PersonIcon className='inputIcon' />
          </p>
          <span className='errorValid'>
            {errors.email && touched.email && errors.email}
          </span>
          <p className='inputBox'>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder='Password'
              autoComplete='on'></input>
            <LockIcon className='inputIcon' />
          </p>
          <span className='errorValid'>
            {errors.password && touched.password && errors.password}
          </span>
          <button type='submit'>Sign In</button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
