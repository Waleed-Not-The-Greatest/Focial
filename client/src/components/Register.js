import React, { useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form, Header, Message, Container } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser } from '../helpers';
import { REGISTER_FAIL } from '../helpers/actionTypes';
import OverlayLoader from './OverlayLoader';

// function to render input fields
const renderInput = ({
  input,
  type,
  placeholder,
  meta: { touched, error },
}) => {
  let style;
  if (touched && error) {
    style = {
      border: '1px solid #FFA6A6',
      // backgroundColor: '#FFEDED'
    };
  }
  return (
    <div>
      <input {...input} placeholder={placeholder} type={type} style={style} />
      {touched && error && (
        <Message negative className="negative_message-style">
          {error}
        </Message>
      )}
    </div>
  );
};

// function to validate inputs
const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required';
  if (!values.email) errors.email = 'Email is required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Invalid email';
  if (!values.password) errors.password = 'Password is required';
  else if (values.password === values.name)
    errors.password = "You can't use your name as your password";
  else if (values.password.length < 5)
    errors.password = 'password should be of atleast 5 characters';
  else if (values.password !== values.confirm_password)
    errors.password = "Password dosen't match";
  return errors;
};

/** MAIN COMPONENT
 * - responsible for displaying and managing register operations
 */
const Register = (props) => {
  const dispatch = useDispatch();
  // select error from store
  const error = useSelector(({ error }) => error);
  // select if user is logged in
  const isLoggedIn = useSelector(({ auth }) => auth.isAuthorized);

  // using state to manage loading
  const [loading, setLoading] = useState(false);

  // funtion to perform when form is submitted
  const onFormSubmit = (values) => {
    // set loading to true
    setLoading(true);
    let opts = { setLoading, redirect: props.history.push };
    dispatch(registerUser(values, opts));
  };
  // function to render form
  const renderForm = () => {
    // if user is logged in return message
    if (isLoggedIn) {
      return (
        <Message warning style={{ marginTop: '60px ' }}>
          Logout to register
        </Message>
      );
    } else if (isLoggedIn === null) {
      return null;
    } else {
      return (
        <Form onSubmit={props.handleSubmit(onFormSubmit)} className="formStyle">
          {loading ? <OverlayLoader /> : null}
          <h1>Register</h1>
          {error.id === REGISTER_FAIL ? (
            <Message negative className="negative_message-style">
              <p>{error.msg}</p>
            </Message>
          ) : null}
          <Form.Field>
            <Field
              name="name"
              component={renderInput}
              placeholder="name"
              type="text"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="email"
              component={renderInput}
              placeholder="email"
              type="email"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="password"
              component={renderInput}
              placeholder="password"
              type="password"
            />
          </Form.Field>
          <Form.Field>
            <Field
              name="confirm_password"
              component={renderInput}
              placeholder="confirm password"
              type="password"
            />
          </Form.Field>
          <br />
          <button
            className="authLinkStyle"
            onClick={() => props.setLogin(true)}
          >
            Sign in instead
          </button>
          <br />
          <button type="submit" className="button">
            Submit
          </button>
        </Form>
      );
    }
  };

  return renderForm();
};

// powered by redux forms
export default reduxForm({
  form: 'registration form',
  validate,
})(Register);
