import React from 'react';
import { Link, Form, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from '../components';
import { useDispatch } from 'react-redux';
import { loginUser } from "../features/user/userSlice";
import { toast } from 'react-toastify';
import { customFetch } from '../utils';

export const action = (store) => async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
  
    try {
      const response = await customFetch.post('/auth/local', data);
      store.dispatch(loginUser(response.data));
      toast.success('Logged in successfully');
      return redirect('/');
    } catch (error) {
      const errorMessage = error?.response?.data?.error?.message || 'please double check your credentials';
      toast.error(errorMessage);
      return null;
    }
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginAsGuest = async () => {
        try {
            const response = await customFetch.post('/auth/local', {
                identifier : 'test@test.com',
                password : 'secret'
            });
            dispatch(loginUser(response.data));
            toast.success('Welcome guest user');
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('Guest user login error, please try again');
        }
    };

  return (
     <section className='h-screen grid place-items-center'>
        <Form method='post' className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <h4 className='text-center text-3xl font-bold'>Login</h4>
            <FormInput type='email' label='Email' name='identifier' defaultValue='' />
            <FormInput type='password' label='Password' name='password' defaultValue='' />
            <div className='mt-4'>
                <SubmitBtn text='login' />
            </div>
            <button type='button' className='btn btn-secondary btn-block uppercase' onClick={loginAsGuest}>guest user</button>
            <p className='text-center'>
                Not a member yet?{' '}
                <Link to='/register' className='ml-2 link link-hover link-primary capitalize'>
                    register
                </Link>
            </p>
        </Form>
     </section>
  )
};

export default Login;