import React from 'react';

export default function About() {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col'>
      <div className='flex-grow container mx-auto px-4 py-8'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h1 className='text-4xl font-bold mb-6 text-center text-teal-600'>
            Empowering Your Health Journey
          </h1>
          <div className='mb-10 flex flex-wrap justify-between'>
            <div className='w-full md:w-1/2 mb-8 md:pr-4'>
              <p className='text-lg leading-relaxed'>
                At <span className='font-bold text-teal-600'>MediMart</span>, we believe that healthcare should be accessible, convenient, and personalized. Our mission is to revolutionize the way you manage your health by bringing exceptional products and services right to your fingertips.
              </p>
            </div>
            <div className='w-full md:w-1/2'>
              <img
                src='https://media.giphy.com/media/3o7btYLAYVBIZkNQmk/giphy.gif'
                alt='Pills Animation'
                className='w-full rounded-lg shadow-md'
              />
            </div>
          </div>
          <div className='mb-10 flex flex-wrap justify-between'>
            <div className='w-full md:w-1/2 md:pr-4'>
              <img
                src='https://media.giphy.com/media/3o6nUPEMDDFUfDPHVu/giphy.gif'
                alt='Medical Care Animation'
                className='w-full rounded-lg shadow-md'
              />
            </div>
            <div className='w-full md:w-1/2 mb-8 md:pl-4'>
              <h2 className='text-2xl font-semibold mb-3 text-teal-600'>Cutting-Edge Technology, Seamless Experience</h2>
              <p className='text-lg leading-relaxed'>
                Leveraging the power of the MERN stack and Tailwind CSS, we've created a user-friendly platform that combines cutting-edge technology with a sleek, modern design. From browsing our extensive catalog to placing your order, every step is designed to be intuitive and efficient.
              </p>
            </div>
          </div>
          <div className='mb-10 flex flex-wrap justify-between'>
            <div className='w-full md:w-1/2 mb-8 md:pr-4'>
              <h2 className='text-2xl font-semibold mb-3 text-teal-600'>Healthcare at Your Fingertips</h2>
              <p className='text-lg leading-relaxed'>
                With MediMart's Progressive Web App (PWA), you can access our services from anywhere, on any device. Whether you're at home, at work, or on the go, your healthcare needs are just a tap away, ensuring you never miss a beat in your wellness journey.
              </p>
            </div>
            <div className='w-full md:w-1/2'>
              <img
                src='https://media.giphy.com/media/1Av6qg21Ysz9TnYJ0O/giphy.gif'
                alt='Healthcare Mobile App Animation'
                className='w-full rounded-lg shadow-md'
              />
            </div>
          </div>
          <div className='mb-10 flex flex-wrap justify-between'>
            <div className='w-full md:w-1/2 md:pr-4'>
              <img
                src='https://media.giphy.com/media/MsVRQAFB2HyXNkfyRk/giphy.gif'
                alt='Quality Assurance Animation'
                className='w-full rounded-lg shadow-md'
              />
            </div>
            <div className='w-full md:w-1/2 mb-8 md:pl-4'>
              <h2 className='text-2xl font-semibold mb-3 text-teal-600'>Quality and Expertise You Can Trust</h2>
              <p className='text-lg leading-relaxed'>
                At MediMart, quality is our unwavering commitment. Our team of licensed pharmacists and healthcare professionals meticulously curate our product selection, ensuring you receive only the highest-quality medications, supplements, and healthcare products from reputable manufacturers.
              </p>
            </div>
          </div>
          <div className='mb-10 flex flex-wrap justify-between'>
            <div className='w-full md:w-1/2 mb-8 md:pr-4'>
              <h2 className='text-2xl font-semibold mb-3 text-teal-600'>Personalized Support, Empowering Your Well-being</h2>
              <p className='text-lg leading-relaxed'>
                We understand that healthcare is not one-size-fits-all. That's why our pharmacists and customer support team are dedicated to providing personalized guidance and support. Whether you have questions about medications, need advice on wellness products, or require assistance with your order, we're here to empower you on your journey to optimal health.
              </p>
            </div>
            <div className='w-full md:w-1/2'>
              <img
                src='https://media.giphy.com/media/eCqEUz83VY51GG1Dsu/giphy.gif'
                alt='Customer Support Animation'
                className='w-full rounded-lg shadow-md'
              />
            </div>
          </div>
          <div className='flex flex-wrap justify-between'>
            <div className='w-full md:w-1/2 md:pr-4'>
              <h2 className='text-2xl font-semibold mb-3 text-teal-600'>Your Health, Our Passion</h2>
              <p className='text-lg leading-relaxed'>
                At MediMart, your well-being is at the heart of everything we do. We are constantly innovating and expanding our services to better cater to your evolving needs. Join us on this incredible journey as we redefine the way you experience healthcare – convenient, personalized, and empowering.
              </p>
              <p className='text-lg leading-relaxed mt-4 font-bold text-teal-600'>
                Welcome to MediMart, where your health takes center stage.
              </p>
            </div>
            <div className='w-full md:w-1/2'>
              <img
                src='https://media.giphy.com/media/XvSLUbQVDnAEG0aHqm/giphy.gif'
                alt='Health Care Animation'
                className='w-full rounded-lg shadow-md'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}