import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { searchUser } from '../helpers';

const renderInput = ({ input, placeholder }) => {
  return <input {...input} placeholder={placeholder} />;
};

const Search = props => {
  const store = useStore();
  const dispatch = useDispatch();
  const history = useHistory();
  const onFormSubmit = async ({ search }) => {
    dispatch(searchUser(search, store.getState().auth.token));
    history.push(`/search?${search}`);
  };
  return (
    <form className="search_form" onSubmit={props.handleSubmit(onFormSubmit)}>
      <Field name="search" component={renderInput} placeholder="search..." />
    </form>
  );
};

export default reduxForm({ form: 'search' })(Search);
