import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { CiDeliveryTruck } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

export default function Cart() {
  return (
    <div className='bg-[#f5f5f5]'>
      <Navbar />
      <div className='font-semibold text-4xl text-center'>
        <p>My Shopping Bag</p>
      </div>
      <div className='border rounded-lg bg-blue-100 m-7 p-7 '>
        <h1>Cart details</h1>
      </div>
      <button className='border rounded-lg p-7 ml-7 w-[30rem] hover:bg-red-100'>
        <div className='flex'>
          <CiDeliveryTruck className='size-14' />
          <p className='ml-6 text-3xl'> Delivery Options</p>
        </div>
        <div>
          <p>Free</p>
          <p>Standard Delivery</p>
        </div>
      </button>
      <div className='border rounded-lg p-7 m-7'>
        <div className='flex '>
          <CgProfile className="size-9 ml-2" />
          <p className='ml-5 text-2xl'>Customer Details</p>
        </div>
        <div>
          <form>
          <label>First name: </label>
          <input className="border rounded-md "type="text"></input><br/>
          <label>First name: </label>
          <input className="border rounded-md "type="text"></input><br/>
          <label >First name: </label>
          <input className="border rounded-md "type="text"></input><br/>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
