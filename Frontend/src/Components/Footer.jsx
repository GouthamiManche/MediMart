import React from 'react'

function Footer() {
  return (
    <div>
      <div className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">About</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel
              tellus vel ipsum consectetur commodo.
            </p>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">Help</h2>
            <ul className="list-unstyled">
              <li className="mb-2">FAQs</li>
              <li className="mb-2">Shipping & Returns</li>
              <li className="mb-2">Contact Us</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">Shop</h2>
            <ul className="list-unstyled">
              <li className="mb-2">Browse Medicines</li>
              <li className="mb-2">Order Tracking</li>
              <li className="mb-2">Prescription Services</li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h2 className="text-lg font-bold mb-4">Subscribe</h2>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-700 focus:outline-none focus:border-white"
              />
              <button className="w-full py-2 mb-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold">
                Subscribe
              </button>
            </form>
            <p className="text-sm">
              We respect your privacy and will never share your email address.
            </p>
          </div>
        </div>
        <hr className="my-8 border-gray-700" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} PharmaEasy. All rights reserved.
            </p>
          </div>
          <div className="w-full md:w-auto text-center md:text-right">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-white hover:text-gray-400 text-sm font-bold"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href="#"
                  className="text-white hover:text-gray-400 text-sm font-bold"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Footer
