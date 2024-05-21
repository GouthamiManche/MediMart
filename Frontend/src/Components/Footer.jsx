import React from 'react'
import { Link } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className=''>
      <div className="bg-[#125872] text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/4 text-center md:text-left">
              <Link to='/about'><h2 className="text-lg font-bold mb-4">About</h2></Link>
              <ul className="mb-4">
                <Link to='/'><li className="mb-2">Home</li></Link>
                <Link to='/shop'><li className="mb-2">Shop</li></Link>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h2 className="text-lg font-bold mb-4">Help</h2>
              <ul className="list-unstyled">
                <li className="mb-2">Shipping & Returns</li>
                <li className="mb-2">Track Orders</li>
                <li className="mb-2">FAQs</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <Link to='/contact'><h2 className="text-lg font-bold mb-4">Contact</h2></Link>
              <ul className="list-unstyled">
                <li className="mb-2">Phone:</li>
                <li className="mb-2">(+1)123 456 7890</li>
                <li className="mb-2">Email:</li>
                <li className="mb-2">medimart@gmail.com</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 text-center md:text-left">
              <h2 className="text-2xl font-bold mb-4">Medimart</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio vel sed adipisci, officiis voluptatem, aspernatur tempore in earum labore nostrum praesentium, ut id!
              </p>
              <div className='flex gap-2 mt-[1rem]'>
                <FaTwitter className='text-blue-400' />
                <FaFacebook className='text-blue-950' />
                <FaLinkedin className='text-purple-300' />
                <FaYoutube className='text-red-600' />
              </div>
            </div>
          </div>
          <hr className="my-8 border-gray-700" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
              <p className="text-lg">
                &copy; {new Date().getFullYear()} Medimart. All rights reserved.
              </p>
            </div>
            <div className="w-full md:w-auto text-center md:text-right">
              <p>Privacy Policy Terms & Condition</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
