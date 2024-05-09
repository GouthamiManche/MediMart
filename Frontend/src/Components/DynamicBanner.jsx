
import { Link, useLocation, useNavigate } from 'react-router-dom';
export default function DynamicBanner() {
  return (
    <div className="flex flex-col md:flex-row border rounded-md text-gray-700">
      <div className="bg-blue-50 ml-2 md:ml-[1.5rem] mt-7 mb-7 p-7 border md:rounded-l-md w-[18rem] md:w-[36rem]">
        <p className="text-2xl font-semibold">Get 15% off on Medicine Purchases</p>
        <p>and get 15% off on your order</p>
        <div className="flex md:h-[8rem] h-[4rem]">
          <p className="text-2xl font-semibold"><Link to ="/shop">Order now</Link></p>
          <img
            src="https://images.apollo247.in/images/ui_revamp_Prescription_Pot.svg"
            alt="Order now"
          />
        </div>
      </div>
      <div className="bg-white w-full mr-7 mt-7 mb-7 p-7 border md:rounded-r-md hidden md:block">
        <div className="text-lg font-semibold">
          <p className="">How does this work?</p>
          <br />
          <div className="flex flex-wrap -mx-4">
            <div className="w-1/2 px-4">
              <span>1. Add medicines to your cart</span>
              <br />
              <br />
              <span>3. We will call you to confirm the medicines</span>
            </div>
            <div className="w-1/2 px-2">
              <span>2. Add delivery address and place the order</span>
              <br />
              <br />
              <span>4. Your medicines will get delivered at your doorstep</span>
            </div>
          </div>
          <br />
          <p>Get 15% off on Medicine Purchases and get 15% off on your order. <Link to ="/shop">Order now</Link></p>
        </div>
      </div>
    </div>
  );
}