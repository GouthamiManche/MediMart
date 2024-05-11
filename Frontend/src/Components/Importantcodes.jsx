// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from '../Components/AuthProvider';

// function truncateString(str, num) {
//   if (!str || str.length === 0) return "";
//   if (str.length <= num) {
//     return str;
//   }
//   return str.slice(0, num) + "...";
// }

// function Item({ item }) {
//   const { user } = useContext(AuthContext);
//   const [isItemInCart, setIsItemInCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [error, setError] = useState("");

//   const handleAddToCart = async () => {
//     try {
//       const res = await axios.post(
//         "https://medicine-website-two.vercel.app/api/addtocart",
//         {
//           Name: item.Name,
//           Price: item.Price,
//           Image_URL: item.Image_URL,
//           quantity: quantity,
//           Product_id: item.Product_id,
//           email: user.email,
//         }
//       );
//       if (res.status === 201) {
//         setIsItemInCart(true);
//       }
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
      
//     }
//   };

//   const removeFromCart = async () => {
//     try {
//       await axios.delete(
//         `https://medicine-website-two.vercel.app/api/removefromcart/${item.Product_id}`,
//       );
//       setIsItemInCart(false);
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
     
//     }
//   };

//   const handleQuantityChange = async (value) => {
//     const newQuantity = Math.max(1, value); // Ensure minimum quantity is 1
//     setQuantity(newQuantity);

//     if (newQuantity === 1) {
//       removeFromCart(); // Remove item from cart if quantity is 1
//     }

//     try {
//       const res = await axios.put(
//         `https://medicine-website-two.vercel.app/api/updatecart/${item.Product_id}`,
//         {
//           quantity: newQuantity,
//         }
//       );
//       if (res.status !== 200) {
       
//       }
//     } catch (error) {
//       console.error("Error updating item quantity:", error);
   
//     }
//   };

//   const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);

//   return (
//     <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
//       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
//         <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
//           <img
//             src={item.Image_URL}
//             alt={item.Medicine_Name || item.Name}
//             className="max-w-full max-h-full transition duration-300 hover:scale-105"
//           />
//         </div>
//       </Link>
//       <hr className="border border-gray-300 " />
//       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
//         <div className="flex flex-col justify-between mt-6 relative">
//           <h3 className="font-semibold text-lg text-[#171A1FFF] transition duration-300 hover:text-[#3EBDE0FF]">
//             {truncatedName}
//           </h3>
//         </div>
//       </Link>
//       <div className="flex justify-between items-center mt-2">
//         <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
//         {isItemInCart ? (
//           <div className="flex items-center font-semi-bold border border-[#125872] border rounded-md px-4 py-1 shadow-md">
//             <button
//               className="text-[#125872] "
//               onClick={() => handleQuantityChange(quantity - 1)}
//             >
//               -
//             </button>
//             <span className="mx-4 text-[#125872]">{quantity}</span>
//             <button
//               className="text-[#125872] "
//               onClick={() => handleQuantityChange(quantity + 1)}
//             >
//               +
//             </button>
//           </div>
//         ) : (
//           <button
//             className="flex items-center justify-center bg-[#125872] text-white rounded-md font-bold border py-1.5 px-8 text-sm hover:bg-[#0d4456] transition duration-300 shadow-md"
//             onClick={handleAddToCart}
//           >
//             Add
//           </button>
//         )}
//       </div>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// }

// export default Item;


// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from '../Components/AuthProvider';
// // import { toast } from 'react-toastify';

// function truncateString(str, num) {
//   if (!str || str.length === 0) return "";
//   if (str.length <= num) {
//     return str;
//   }
//   return str.slice(0, num) + "...";
// }

// function getItemDetails(item) {
//   switch (item.Category) {
//     case "Supplements":
//       return { detail: item.Description, detailLabel: "Description" };
//     case "Capsules":
//       return { detail: item.Composition, detailLabel: "Composition" };
//     default:
//       return { detail: "", detailLabel: "" };
//   }
// }

// function Item({ item }) {
//   const [isItemInCart, setIsItemInCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const apiKey = "123";
//   const { isAuthenticated, user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/cartitems/${user.email}`, {
//           headers: {
//             apikey: apiKey,
//           },
//         });
//         const cartItems = response.data;
//         const existingItem = cartItems.find(
//           (cartItem) => cartItem.Product_id === item.Product_id
//         );
//         if (existingItem) {
//           setQuantity(existingItem.quantity);
//           setIsItemInCart(true);
//         } else {
//           setIsItemInCart(false);
//         }
//       } catch (error) {
//         console.error("Error fetching cart items:", error.message);
//       }
//     };

//     if (isAuthenticated) {
//       fetchCartItems();
//     }
//   }, [item.Product_id, isAuthenticated]);

//   const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);
//   const { detail, detailLabel } = getItemDetails(item);

//   const handleAddToCart = async () => {
//     if (!isAuthenticated) {
//       // toast.error('Please login to add item to cart');
//       return;
//     }

//     const { _id, Name, Price, Image_URL, Product_id } = item;
//     const cartItem = {
//       _id,
//       Name,
//       Price,
//       Image_URL,
//       quantity,
//       Product_id,
//       email: user.email
//     };

//     try {
//       await axios.post(`${apiUrl}/addtocart`, cartItem, {
//         headers: {
//           apikey: apiKey,
//         },
//       });
//       // toast.success('Item Added To Cart', { autoClose: 2000 });
//     } catch (error) {
//       console.error("Error adding item to cart:", error.message);
//       // toast.error('Failed to add item to cart');
//     }
//   };

//   const handleQuantityChange = async (value) => {
//     const newQuantity = Math.max(1, value);
//     setQuantity(newQuantity);

//     if (newQuantity > 0) {
//       setIsItemInCart(true);
//     } else {
//       setIsItemInCart(false);
//       await removeFromCart();
//     }

//     if (isAuthenticated) {
//       await updateCartItem(newQuantity);
//     }
//   };

//   const removeFromCart = async () => {
//     try {
//       await axios.delete(`${apiUrl}/removefromcart/${item.Product_id}/${user.email}`, {
//         headers: {
//           apikey: apiKey,
//         },
//       });
//       setIsItemInCart(false);
//     } catch (error) {
//       console.error("Error removing item from cart:", error.message);
//     }
//   };

//   const updateCartItem = async (newQuantity) => {
//     const { _id, Name, Price, Image_URL, Product_id } = item;
//     const cartItem = {
//       _id,
//       Name,
//       Price,
//       Image_URL,
//       quantity: newQuantity,
//       Product_id,
//       email: user.email
//     };

//     try {
//       await axios.put(`${apiUrl}/updatecart/${item.Product_id}/${user.email}`, cartItem, {
//         headers: {
//           apikey: apiKey,
//         },
//       });
//     } catch (error) {
//       console.error("Error updating cart item:", error.message);
//     }
//   };

//   return (
//     <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
//       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
//         <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
//           <img
//             src={item.Image_URL}
//             alt={item.Medicine_Name || item.Name}
//             className="max-w-full max-h-full transition duration-300 hover:scale-105"
//           />
//         </div>
//       </Link>
//       <hr className="border border-gray-300 " />
//       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
//         <div className="flex flex-col justify-between mt-6 relative">
//           <h3 className="font-semibold text-lg text-[#171A1FFF] transition duration-300 hover:text-[#3EBDE0FF]">
//             {truncatedName}
//           </h3>
//         </div>
//       </Link>
//       {detail && (
//         <p className="text-sm text-gray-600 mt-2">
//           <span className="font-semibold">{detailLabel}: </span>
//           {detail}
//         </p>
//       )}
//       <div className="flex justify-between items-center mt-2">
//         <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
//         <div className="flex items-center font-semi-bold border border-[#125872] border rounded-md px-4 py-1 shadow-md">
//           <button
//             className="text-[#125872]"
//             onClick={() => handleQuantityChange(quantity - 1)}
//           >
//             -
//           </button>
//           <span className="mx-4 text-[#125872]">{quantity}</span>
//           <button
//             className="text-[#125872]"
//             onClick={() => handleQuantityChange(quantity + 1)}
//           >
//             +
//           </button>
//         </div>
//         <button
//           className="flex items-center justify-center bg-[#125872] text-white rounded-md font-bold border py-1.5 px-8 text-sm hover:bg-[#0d4456] transition duration-300 shadow-md"
//           onClick={handleAddToCart}
//         >
//           Add
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Item;




// // in this code how i select quantity and do add that much items get added in cart but i want add button transform in quantity control when i click on add then as i increase quantity it gets added in cart like plus is working like add button viceversa for minus and if i do minus and if it reaches 1 and i click minus add buttons comes again but from cart that much quantity should decrease and from minus it reaches 1 and add buttons come back cart become empty for that item


// // import React, { useState, useEffect, useContext } from "react";
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import { AuthContext } from '../Components/AuthProvider';
// // // import { toast } from 'react-toastify';

// // function truncateString(str, num) {
// //   if (!str || str.length === 0) return "";
// //   if (str.length <= num) {
// //     return str;
// //   }
// //   return str.slice(0, num) + "...";
// // }

// // function getItemDetails(item) {
// //   switch (item.Category) {
// //     case "Supplements":
// //       return { detail: item.Description, detailLabel: "Description" };
// //     case "Capsules":
// //       return { detail: item.Composition, detailLabel: "Composition" };
// //     default:
// //       return { detail: "", detailLabel: "" };
// //   }
// // }

// // function Item({ item }) {
// //   const [isItemInCart, setIsItemInCart] = useState(false);
// //   const [quantity, setQuantity] = useState(1);
// //   const apiUrl = import.meta.env.VITE_API_URL;
// //   const apiKey = "123";
// //   const { isAuthenticated, user } = useContext(AuthContext);

// //   useEffect(() => {
// //     const fetchCartItems = async () => {
// //       try {
// //         const response = await axios.get(`${apiUrl}/cartitems/${user.email}`, {
// //           headers: {
// //             apikey: apiKey,
// //           },
// //         });
// //         const cartItems = response.data;
// //         const existingItem = cartItems.find(
// //           (cartItem) => cartItem.Product_id === item.Product_id
// //         );
// //         if (existingItem) {
// //           setQuantity(existingItem.quantity);
// //           setIsItemInCart(true);
// //         } else {
// //           setIsItemInCart(false);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching cart items:", error.message);
// //       }
// //     };

// //     if (isAuthenticated) {
// //       fetchCartItems();
// //     }
// //   }, [item.Product_id, isAuthenticated]);

// //   const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);
// //   const { detail, detailLabel } = getItemDetails(item);

// //   const handleAddToCart = async () => {
// //     if (!isAuthenticated) {
// //       // toast.error('Please login to add item to cart');
// //       return;
// //     }

// //     setIsItemInCart(true);

// //     const { _id, Name, Price, Image_URL, Product_id } = item;
// //     const cartItem = {
// //       _id,
// //       Name,
// //       Price,
// //       Image_URL,
// //       quantity,
// //       Product_id,
// //       email: user.email
// //     };

// //     try {
// //       await axios.post(`${apiUrl}/addtocart`, cartItem, {
// //         headers: {
// //           apikey: apiKey,
// //         },
// //       });
// //       // toast.success('Item Added To Cart', { autoClose: 2000 });
// //     } catch (error) {
// //       console.error("Error adding item to cart:", error.message);
// //       // toast.error('Failed to add item to cart');
// //     }
// //   };

// //   const handleQuantityChange = async (value) => {
// //     const newQuantity = Math.max(1, value);

// //     if (newQuantity === 1) {
// //       setIsItemInCart(false);
// //       await removeFromCart();
// //     } else {
// //       setQuantity(newQuantity);

// //       if (isAuthenticated) {
// //         await updateCartItem(newQuantity);
// //       }
// //     }
// //   };

// //   const removeFromCart = async () => {
// //     try {
// //       await axios.delete(`${apiUrl}/removefromcart/${item.Product_id}/${user.email}`, {
// //         headers: {
// //           apikey: apiKey,
// //         },
// //       });
// //       setIsItemInCart(false);
// //     } catch (error) {
// //       console.error("Error removing item from cart:", error.message);
// //     }
// //   };

// //   const updateCartItem = async (newQuantity) => {
// //     const { _id, Name, Price, Image_URL, Product_id } = item;
// //     const cartItem = {
// //       _id,
// //       Name,
// //       Price,
// //       Image_URL,
// //       quantity: newQuantity,
// //       Product_id,
// //       email: user.email
// //     };

// //     try {
// //       await axios.put(`${apiUrl}/updatecart/${item.Product_id}/${user.email}`, cartItem, {
// //         headers: {
// //           apikey: apiKey,
// //         },
// //       });
// //     } catch (error) {
// //       console.error("Error updating cart item:", error.message);
// //     }
// //   };

// //   return (
// //     <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
// //       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
// //         <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
// //           <img
// //             src={item.Image_URL}
// //             alt={item.Medicine_Name || item.Name}
// //             className="max-w-full max-h-full transition duration-300 hover:scale-105"
// //           />
// //         </div>
// //       </Link>
// //       <hr className="border border-gray-300 " />
// //       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
// //         <div className="flex flex-col justify-between mt-6 relative">
// //           <h3 className="font-semibold text-lg text-[#171A1FFF] transition duration-300 hover:text-[#3EBDE0FF]">
// //             {truncatedName}
// //           </h3>
// //         </div>
// //       </Link>
// //       {detail && (
// //         <p className="text-sm text-gray-600 mt-2">
// //           <span className="font-semibold">{detailLabel}: </span>
// //           {detail}
// //         </p>
// //       )}
// //       <div className="flex justify-between items-center mt-2">
// //         <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
// //         {isItemInCart ? (
// //           <div className="flex items-center font-semi-bold border border-[#125872] border rounded-md px-4 py-1 shadow-md">
// //             <button
// //               className="text-[#125872]"
// //               onClick={() => handleQuantityChange(quantity - 1)}
// //             >
// //               -
// //             </button>
// //             <span className="mx-4 text-[#125872]">{quantity}</span>
// //             <button
// //               className="text-[#125872]"
// //               onClick={() => handleQuantityChange(quantity + 1)}
// //             >
// //               +
// //             </button>
// //           </div>
// //         ) : (
// //           <button
// //             className="flex items-center justify-center bg-[#125872] text-white rounded-md font-bold border py-1.5 px-8 text-sm hover:bg-[#0d4456] transition duration-300 shadow-md"
// //             onClick={handleAddToCart}
// //           >
// //             Add
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Item;













// // import React, { useState, useEffect, useContext } from "react";
// // import { Link } from "react-router-dom";
// // import axios from "axios";
// // import { AuthContext } from '../Components/AuthProvider';

// // function truncateString(str, num) {
// //   if (!str || str.length === 0) return "";
// //   if (str.length <= num) {
// //     return str;
// //   }
// //   return str.slice(0, num) + "...";
// // }

// // function getItemDetails(item) {
// //   switch (item.Category) {
// //     case "Supplements":
// //       return { detail: item.Description, detailLabel: "Description" };
// //     case "Capsules":
// //       return { detail: item.Composition, detailLabel: "Composition" };
// //     default:
// //       return { detail: "", detailLabel: "" };
// //   }
// // }

// // function Item({ item }) {
// //   const [isItemInCart, setIsItemInCart] = useState(false);
// //   const [quantity, setQuantity] = useState(1);
// //   const [showQuantityController, setShowQuantityController] = useState(false);
// //   const apiUrl = import.meta.env.VITE_API_URL;
// //   const apiKey = "123";
// //   const { isAuthenticated, user } = useContext(AuthContext);

// //   useEffect(() => {
// //     const fetchCartItems = async () => {
// //       try {
// //         const response = await axios.get(`${apiUrl}/cartitems/${user.email}`, {
// //           headers: {
// //             apikey: apiKey,
// //           },
// //         });
// //         const cartItems = response.data;
// //         const existingItem = cartItems.find(
// //           (cartItem) => cartItem.Product_id === item.Product_id
// //         );
// //         if (existingItem) {
// //           setQuantity(existingItem.quantity);
// //           setIsItemInCart(true);
// //           setShowQuantityController(true);
// //         } else {
// //           setIsItemInCart(false);
// //           setShowQuantityController(false);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching cart items:", error.message);
// //       }
// //     };

// //     if (isAuthenticated) {
// //       fetchCartItems();
// //     }
// //   }, [item.Product_id, isAuthenticated]);

// //   const truncatedName = truncateString(item.Medicine_Name || item.Name, 20);
// //   const { detail, detailLabel } = getItemDetails(item);

// //   const handleAddToCart = async () => {
// //     if (!isAuthenticated) {
// //       // Handle authentication
// //       return;
// //     }

// //     setIsItemInCart(true);
// //     setShowQuantityController(true);

// //     const { _id, Name, Price, Image_URL, Product_id } = item;
// //     const cartItem = {
// //       _id,
// //       Name,
// //       Price,
// //       Image_URL,
// //       quantity,
// //       Product_id,
// //       email: user.email
// //     };

// //     try {
// //       await axios.post(`${apiUrl}/addtocart`, cartItem, {
// //         headers: {
// //           apikey: apiKey,
// //         },
// //       });
// //       // Handle success
// //     } catch (error) {
// //       console.error("Error adding item to cart:", error.message);
// //       // Handle error
// //     }
// //   };

// //   const handleQuantityChange = async (value) => {
// //     const newQuantity = Math.max(1, value);
// //     setQuantity(newQuantity);

// //     if (newQuantity > 1) {
// //       setIsItemInCart(true);
// //       setShowQuantityController(true);

// //       if (isAuthenticated) {
// //         await updateCartItem(newQuantity);
// //       }
// //     } else {
// //       setIsItemInCart(false);
// //       setShowQuantityController(false);
// //       await removeFromCart();
// //     }
// //   };

// //   const removeFromCart = async () => {
// //     try {
// //       await axios.delete(`${apiUrl}/removefromcart/${item.Product_id}/${user.email}`, {
// //         headers: {
// //           apikey: apiKey,
// //         },
// //       });
// //       setIsItemInCart(false);
// //       setShowQuantityController(false);
// //     } catch (error) {
// //       console.error("Error removing item from cart:", error.message);
// //     }
// //   };

// //   const updateCartItem = async (newQuantity) => {
// //     const { _id, Name, Price, Image_URL, Product_id } = item;
// //     const cartItem = {
// //       _id,
// //       Name,
// //       Price,
// //       Image_URL,
// //       quantity: newQuantity,
// //       Product_id,
// //       email: user.email
// //     };

// //     try {
// //       if (isItemInCart) {
// //         await axios.put(`${apiUrl}/updatecart/${item.Product_id}/${user.email}`, cartItem, {
// //           headers: {
// //             apikey: apiKey,
// //           },
// //         });
// //       } else {
// //         await axios.post(`${apiUrl}/addtocart`, cartItem, {
// //           headers: {
// //             apikey: apiKey,
// //           },
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Error updating cart item:", error.message);
// //     }
// //   };

// //   return (
// //     <div className="bg-white m-2 p-4 rounded-xl border border-gray-200 flex flex-col md:w-[16rem] w-[16rem] md:h-[22rem] h-[22rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 ">
// //       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
// //         <div className="relative h-56 overflow-hidden rounded-lg flex items-center justify-center">
// //           <img
// //             src={item.Image_URL}
// //             alt={item.Medicine_Name || item.Name}
// //             className="max-w-full max-h-full transition duration-300 hover:scale-105"
// //           />
// //         </div>
// //       </Link>
// //       <hr className="border border-gray-300 " />
// //       <Link to={`/${item.Sub_Category}/${item.Name}`} state={item}>
// //         <div className="flex flex-col justify-between mt-6 relative">
// //           <h3 className="font-semibold text-lg text-[#171A1FFF] transition duration-300 hover:text-[#3EBDE0FF]">
// //             {truncatedName}
// //           </h3>
// //         </div>
// //       </Link>
// //       {detail && (
// //         <p className="text-sm text-gray-600 mt-2">
// //           <span className="font-semibold">{detailLabel}: </span>
// //           {detail}
// //         </p>
// //       )}
// //       <div className="flex justify-between items-center mt-2">
// //         <h3 className="text-2xl font-bold text-[#323743FF]">₹{item.Price}</h3>
// //         {showQuantityController ? (
// //           <div className="flex items-center font-semi-bold border border-[#125872] border rounded-md px-4 py-1 shadow-md">
// //             {quantity > 1 && (
// //               <button
// //                 className="text-[#125872]"
// //                 onClick={() => handleQuantityChange(quantity - 1)}
// //               >
// //                 -
// //               </button>
// //             )}
// //             <span className="mx-4 text-[#125872]">{quantity}</span>
// //             <button
// //               className="text-[#125872]"
// //               onClick={() => {
// //                 handleQuantityChange(quantity + 1);
// //                 handleAddToCart();
// //               }}
// //             >
// //               +
// //             </button>
// //           </div>
// //         ) : (
// //           <button
// //             className="flex items-center justify-center bg-[#125872] text-white rounded-md font-bold border py-1.5 px-8 text-sm hover:bg-[#0d4456] transition duration-300 shadow-md"
// //             onClick={handleAddToCart}
// //           >
// //             Add
// //           </button>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Item;
