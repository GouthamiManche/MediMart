import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SiPhonepe } from 'react-icons/si';

const stateData = [
  { name: 'Andhra Pradesh', cities: ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Kadapa', 'Anantapur', 'Kakinada', 'Tirupati', 'Chittoor'] },
  { name: 'Arunachal Pradesh', cities: ['Itanagar', 'Ziro', 'Tawang', 'Bomdila', 'Roing', 'Tezu', 'Namsai', 'Pasighat', 'Aalo', 'Daporijo'] },
  { name: 'Assam', cities: ['Guwahati', 'Silchar', 'Dibrugarh', 'Tezpur', 'Jorhat', 'Nagaon', 'Bongaigaon', 'Dhubri', 'Goalpara', 'Kokrajhar'] },
  { name: 'Bihar', cities: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Arrah', 'Begusarai', 'Katihar', 'Chhapra'] },
  { name: 'Chhattisgarh', cities: ['Raipur', 'Bilaspur', 'Durg', 'Bhilai', 'Korba', 'Raigarh', 'Rajnandgaon', 'Jagdalpur', 'Ambikapur', 'Dhamtari'] },
  { name: 'Goa', cities: ['Panaji', 'Vasco da Gama', 'Mapusa', 'Margao', 'Ponda', 'Bicholim', 'Valpoi', 'Pernem', 'Sanguem', 'Quepem'] },
  { name: 'Gujarat', cities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar', 'Junagadh', 'Anand', 'Nadiad'] },
  { name: 'Haryana', cities: ['Faridabad', 'Gurgaon', 'Hisar', 'Rohtak', 'Panipat', 'Karnal', 'Sonipat', 'Yamunanagar', 'Bahadurgarh', 'Rewari'] },
  { name: 'Himachal Pradesh', cities: ['Shimla', 'Dharamshala', 'Mandi', 'Solan', 'Kullu', 'Hamirpur', 'Una', 'Bilaspur', 'Chamba', 'Kangra'] },
  { name: 'Jharkhand', cities: ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Phusro', 'Ramgarh', 'Medininagar'] },
  { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Hubli-Dharwad', 'Mangaluru', 'Belagavi', 'Shivamogga', 'Kalaburagi', 'Tumakuru', 'Davangere', 'Vijayapura'] },
  { name: 'Kerala', cities: ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Alappuzha', 'Kottayam', 'Malappuram', 'Palakkad', 'Kasaragod'] },
  { name: 'Madhya Pradesh', cities: ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Ratlam', 'Mandsaur'] },
  { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Navi Mumbai', 'Solapur', 'Amravati', 'Kolhapur', 'Panvel', 'Kurla'] },
  { name: 'Manipur', cities: ['Imphal', 'Thoubal', 'Kakching', 'Lilong', 'Mayang Imphal', 'Bishnupur', 'Moirang', 'Wangoi', 'Ningthoukhong', 'Jiribam'] },
  { name: 'Meghalaya', cities: ['Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Baghmara', 'Resubelpara', 'Sohra', 'Mairang', 'Nongpoh'] },
  { name: 'Mizoram', cities: ['Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Saiha', 'Serchhip', 'Lawngtlai', 'Mamit', 'Khawzawl', 'Hnahthial'] },
  { name: 'Nagaland', cities: ['Kohima', 'Dimapur', 'Mokokchung', 'Zunheboto', 'Tuensang', 'Mon', 'Wokha', 'Phek', 'Kiphire', 'Longleng'] },
  { name: 'Odisha', cities: ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore', 'Puri', 'Bhadrak', 'Baripada', 'Jeypore'] },
  { name: 'Punjab', cities: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Hoshiarpur', 'Moga', 'Pathankot', 'Malerkotla', 'Khanna'] },
  { name: 'Rajasthan', cities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Ajmer', 'Kota', 'Bikaner', 'Bhilwara', 'Alwar', 'Sikar', 'Tonk'] },
  { name: 'Sikkim', cities: ['Gangtok', 'Namchi', 'Mangan', 'Gyalshing', 'Singtam', 'Rangpo', 'Jorethang', 'Nayabazar', 'Rabongla', 'Rongli'] },
  { name: 'Tamil Nadu', cities: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 'Erode', 'Thanjavur', 'Vellore', 'Tiruppur'] },
  { name: 'Telangana', cities: ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar', 'Ramagundam', 'Mahbubnagar', 'Adilabad', 'Nalgonda', 'Suryapet'] },
];

const AddressForm = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNo: '',
    total: 0,
  });
  const [cartItems, setCartItems] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    contactNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });

    if (name === 'state') {
      const selectedState = stateData.find((state) => state.name === value);
      setCities(selectedState ? selectedState.cities : []);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const validationErrors = {};

      if (!formData.fullName) {
        validationErrors.fullName = 'Please enter your full name.';
      }
      if (!formData.address) {
        validationErrors.address = 'Please enter your address.';
      }
      if (!formData.city) {
        validationErrors.city = 'Please enter your city.';
      }
      if (!formData.state) {
        validationErrors.state = 'Please select your state.';
      }
      if (!formData.pincode) {
        validationErrors.pincode = 'Please enter your pincode.';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        validationErrors.pincode = 'Please enter a valid 6-digit pincode.';
      }
      if (!formData.contactNo) {
        validationErrors.contactNo = 'Please enter your contact number.';
      } else if (!/^\d{10}$/.test(formData.contactNo)) {
        validationErrors.contactNo = 'Please enter a valid 10-digit contact number.';
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      const cartItemsArray = Object.values(cartItems);
      const totalPrice = cartItemsArray.reduce((total, item) => total + (item.Price * item.quantity), 0);

      const orderItems = cartItemsArray.map(item => ({
        productId: item.Product_id,
        name: item.Name,
        quantity: item.quantity,
        price: item.Price
      }));

      const orderData = {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        contactNo: formData.contactNo,
        total: totalPrice,
        userDetails: null,
        cartItems: orderItems,
      };

      const res = await axios.post(`${apiUrl}/createorder`, orderData);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  return (
    <div className="flex items-center min-h-full mx-[4vw]">
      <div className="bg-white p-6 max-w-2xl w-full md:mt-[2rem] mx-auto">
        <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
        <div className="md:flex md:mb-[2rem]">
          <div className="w-full md:w-1/2 md:mr-2 mb-4 md:mb-0">
            <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 py-3 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.fullName && <span className="text-red-500">{errors.fullName}</span>}
          </div>
          <div className="w-full md:w-1/2 md:ml-2">
            <label htmlFor="contactNo" className="text-sm font-medium text-gray-700">
              Contact number
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              className="mt-1 p-2 block py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.contactNo && <span className="text-red-500">{errors.contactNo}</span>}
          </div>
        </div>
        <div className="mb-[2rem]">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 p-2 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.address && <span className="text-red-500">{errors.address}</span>}
        </div>
        <div className="md:flex md:mb-4">
          <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-[1rem]">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
              className="mt-1 p-2 block py-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {errors.pincode && <span className="text-red-500">{errors.pincode}</span>}
          </div>
          <div className="w-full md:w-1/3 md:mr-2 mb-4 md:mb-0">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State
            </label>
            <select
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="mt-1 p-2 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a state</option>
              {stateData.map((state) => (
                <option key={state.name} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state && <span className="text-red-500">{errors.state}</span>}
          </div>
          <div className="w-full md:w-1/3">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="mt-1 p-2 py-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            {errors.city && <span className="text-red-500">{errors.city}</span>}
          </div>
        </div>
        <div className="mb-[2rem] flex items-center justify-between">
          <div className="flex items-center">
            <input type="radio" className="w-4 h-4 py-3 text-blue-600 bg-gray-100 rounded border-gray-300" />
            <label htmlFor="default-checkbox" className="ml-2 flex items-center text-lg font-medium text-fuchsia-900">
              <SiPhonepe className="text-2xl" />
              <span className="ml-1">Phone Pe</span>
            </label>
          </div>
        </div>
      </div>
      <div className="w-[30%] p-[2rem] border border-gray-300 sticky top-2 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Order Total</h2>
        <div className="bg-white">
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">
              ₹{cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)}
            </p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Discount</p>
            <p className="font-semibold">-₹0</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-500">Delivery Fee</p>
            <p className="font-semibold">₹0</p>
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between">
            <p className="font-bold">Total</p>
            <p className="font-bold">
              {`₹${cartItems.reduce((total, item) => total + item.Price * item.quantity, 0)}`}
            </p>
          </div>
          <button onClick={handleSubmit} className="bg-[#125872] text-white font-semibold w-full py-3 rounded-md mt-4">
            Proceed To Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
