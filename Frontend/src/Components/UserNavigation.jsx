
import { Link } from 'react-router-dom';


const UserNavigation = () => {




  return (
    
        <div className=" mt-[2rem]">
        <Link to="/profile">
          <button
            className={`py-2 px-4 border border-gray-400 rounded-full transition-colors duration-300   `}
         
          >
        Profile
          </button>
          </Link>
          <Link to="/orderhistory">
          <button
            className={`py-2 px-4 border border-gray-400 rounded-full transition-colors duration-300`}
           
          >
           Order History
          </button>
          </Link>
          <Link to="/address">
          <button
            className={`py-2 px-4 border border-gray-400 rounded-full transition-colors duration-300`}
           
          >
      Address
          </button>
          </Link>
        </div>
       
   
  );
};

export default UserNavigation;