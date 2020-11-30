//===== React and Redux =====
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducerInterface } from '../../Redux/Reducers/Reducers';
import {
  AddUserAction,
  UpdateUserInfoThunk,
} from '../../Redux/Actions/user.action';

//===== Components =====
import Button from '../../Components/Button/Button';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

//===== Stules =====
import './ProfileInputs.scss';

//===== Schema of user date =====
const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name should be 3 or more characters')
    .max(40, 'Name should be 40 or less characters')
    .required('Required'),
  status: Yup.string().max(250, 'Status should be 250 or less characters'),
});

//===== Main =====
const ProfileInputs: React.FC = () => {
  const { name, status } = useSelector(
    (state: RootReducerInterface) => state.user
  );
  const dispatch = useDispatch();

  return name ? (
    <Formik
      initialValues={{ name, status }}
      validationSchema={ProfileSchema}
      onSubmit={(values) => {
        dispatch(
          UpdateUserInfoThunk({ name: values.name, status: values.status })
        );
        dispatch(AddUserAction({ name: values.name, status: values.status }));
      }}>
      {({ errors, touched }) => (
        <Form className='profile-form'>
          <label htmlFor='name' className=''>
            Name:
          </label>
          <Field
            name='name'
            id='name'
            className='profile-form_input form-input'
          />
          {errors.name && touched.name && (
            <div className='auth-form__error'>{errors.name}</div>
          )}

          <label htmlFor='status' className='auth-form__email-label'>
            Status:
          </label>
          <Field
            name='status'
            id='status'
            className='profile-form_input form-input'
          />
          {errors.status && touched.status && (
            <div className='auth-form__error'>{errors.status}</div>
          )}
          <Button label='Save' type='submit' />
        </Form>
      )}
    </Formik>
  ) : null;
};

export default ProfileInputs;
