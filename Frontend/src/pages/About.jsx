import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

export default function About() {
  return (
    <div className='bg-[#f5f5f5] min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto px-4 py-8'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h1 className='text-4xl font-bold mb-6 text-center'>About MediMart</h1>
          <div className='mb-6'>
            <p className='text-lg leading-relaxed'>
              Welcome to <span className='font-bold'>MediMart</span>, your trusted online pharmacy dedicated to bringing healthcare products right to your doorstep. Our mission is to provide a seamless and reliable platform for ordering medications and health products, ensuring you receive the best care from the comfort of your home.
            </p>
          </div>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-3'>Our Technology</h2>
            <p className='text-lg leading-relaxed'>
              At MediMart, we leverage the latest technology to offer a user-friendly experience, from browsing our extensive catalog to placing your order and tracking it until delivery. Our platform is built with the powerful MERN stack and Tailwind CSS, ensuring a fast, responsive, and secure shopping experience.
            </p>
          </div>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-3'>Accessibility and Convenience</h2>
            <p className='text-lg leading-relaxed'>
              We understand the importance of accessibility and convenience in healthcare. That’s why MediMart is designed as a Progressive Web App (PWA), allowing you to access our services on any device, anytime, anywhere. Whether you’re using a computer, tablet, or smartphone, MediMart adapts to provide you with an optimal browsing experience.
            </p>
          </div>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-3'>Quality and Trust</h2>
            <p className='text-lg leading-relaxed'>
              Our team of dedicated professionals, including licensed pharmacists, is committed to ensuring the accuracy and quality of the products we deliver. We work tirelessly to offer a wide range of medications, supplements, and healthcare products, all sourced from reputable manufacturers.
            </p>
          </div>
          <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-3'>Expert Advice and Support</h2>
            <p className='text-lg leading-relaxed'>
              Beyond providing products, we are here to support you with expert advice and customer service. Our pharmacists are available to answer your questions and guide you in making informed decisions about your health. Our customer support team is ready to assist with any inquiries or issues you may encounter.
            </p>
          </div>
          <div>
            <h2 className='text-2xl font-semibold mb-3'>Our Commitment</h2>
            <p className='text-lg leading-relaxed'>
              At MediMart, your health and satisfaction are our top priorities. We are constantly innovating and expanding our services to better serve you. Join us in our journey to make healthcare more accessible, efficient, and patient-centric.
            </p>
            <p className='text-lg leading-relaxed mt-4'>
              Thank you for choosing MediMart as your online pharmacy. We look forward to serving you and contributing to your health and well-being.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
