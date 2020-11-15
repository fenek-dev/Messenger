import React, { memo } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import './AuthForm.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name should be 3 or more characters')
    .max(40, 'Name should be 40 or less characters')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password should be 6 or more characters')
    .max(50, 'Password should be 50 or less characters')
    .required('Required'),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password should be 6 or more characters')
    .max(50, 'Password should be 50 or less characters')
    .required('Required'),
});

export interface IAuthForm {
  readonly type: 'login' | 'register';
  readonly createUser?: any;
  readonly signIn?: any;
  readonly setIsAuth: any;
}

const AuthForm: React.FC<IAuthForm> = ({
  createUser,
  signIn,
  type,
  setIsAuth,
}) => {
  const dispatch = useDispatch();

  return (
    <div className='auth'>
      {type === 'register' ? (
        <>
          <h1>Signup</h1>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              return dispatch(
                createUser(
                  values.email,
                  values.password,
                  values.name,
                  setIsAuth
                )
              );
            }}>
            {({ errors, touched }) => (
              <Form className='auth-form'>
                <label htmlFor='name' className='auth-form__name-label'>
                  Name:
                </label>
                <Field
                  name='name'
                  id='name'
                  className='auth-form__name form-input'
                />
                {errors.name && touched.name ? (
                  <div className='auth-form__error'>{errors.name}</div>
                ) : null}

                <label htmlFor='email' className='auth-form__email-label'>
                  Email:
                </label>
                <Field
                  name='email'
                  id='email'
                  type='email'
                  className='auth-form__email form-input'
                />
                {errors.email && touched.email ? (
                  <div className='auth-form__error'>{errors.email}</div>
                ) : null}

                <label htmlFor='password' className='auth-form__name-label'>
                  Password:
                </label>
                <Field
                  name='password'
                  id='password'
                  type='password'
                  className='auth-form__password form-input'
                />
                {errors.password && touched.password ? (
                  <div className='auth-form__error'>{errors.password}</div>
                ) : null}
                <button type='submit' className='auth-form__submit'>
                  Submit
                </button>
                <p className='auth-form__sign'>
                  Already has an account? <Link to='/'> Sign in</Link>
                </p>
              </Form>
            )}
          </Formik>
        </>
      ) : (
        <>
          <h1>Login</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              return dispatch(signIn(values.email, values.password, setIsAuth));
            }}>
            {({ errors, touched }) => (
              <Form className='auth-form'>
                <label htmlFor='email' className='auth-form__email-label'>
                  Email:
                </label>
                <Field
                  name='email'
                  id='email'
                  type='email'
                  className='auth-form__email form-input'
                />
                {errors.email && touched.email ? (
                  <div className='auth-form__error'>{errors.email}</div>
                ) : null}

                <label htmlFor='password' className='auth-form__name-label'>
                  Password:
                </label>
                <Field
                  name='password'
                  id='password'
                  type='password'
                  className='auth-form__password form-input'
                />
                {errors.password && touched.password ? (
                  <div className='auth-form__error'>{errors.password}</div>
                ) : null}
                <button type='submit' className='auth-form__submit'>
                  Submit
                </button>
                <p className='auth-form__sign'>
                  Hasn't an acount?<Link to='/signup'> Sign up</Link>
                </p>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};
export default memo(AuthForm);
