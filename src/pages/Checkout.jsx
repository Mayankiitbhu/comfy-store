import React from 'react';
import { useSelector } from 'react-redux';
import { CartTotals, CheckoutForm, SectionTitle } from '../components';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const loader = (store) => () => {
  const user = store.getState().userState.user;
  if (!user) {
    toast.warn('You must login to checkout!');
    return redirect('/login');
  }
  return null;
};

const Checkout = () => {
  // const cartItems = useSelector(state => state.cartState.cartItems);
  const cartTotals = useSelector(state => state.cartState.orderTotal);
  if(cartTotals === 0) {
    return <SectionTitle text='Your cart is empty' />
  }
  return (
     <>
      <SectionTitle text='Place your order' />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
     </>
  )
};

export default Checkout;