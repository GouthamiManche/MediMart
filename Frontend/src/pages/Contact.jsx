import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Contact = () => {
  return (
    <div className='bg-white'>
   
      <section className="py-4 text-center ">
        <h2 className="text-3xl font-bold ">Contact page</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.0819762387664!2d73.03754307442739!3d19.016109053851505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c14ce39a43b3%3A0x729c8296be43f413!2sUnipolar%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1711392952821!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="mt-8"
        ></iframe>
        <div className="container mx-auto mt-10">
          <div className="w-full md:w-1/2 mx-auto">
            <form
              action="https://formspree.io/f/xoqgkadj"
              method="POST"
              className="flex flex-col gap-6"
            >
              <input
                type="text"
                placeholder="username"
                name="username"
                required
                autoComplete="off"
                className="px-4 py-2 border border-[#125872] rounded"
              />
              <input
                type="email"
                name="Email"
                placeholder="Email"
                autoComplete="off"
                required
                className="px-4 py-2 border border-[#125872] rounded"
              />
              <textarea
                name="Message"
                cols="30"
                rows="10"
                required
                autoComplete="off"
                placeholder="Enter your message"
                className="px-4 py-2 border border-[#125872] rounded"
              ></textarea>
              <input
                type="submit"
                value="send"
                className="px-4 py-2 bg-[#125872] text-white rounded cursor-pointer"/>
            </form>
          </div>
        </div>
      </section>
 
    </div>
  );
};

export default Contact;