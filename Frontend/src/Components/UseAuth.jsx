// import { useContext } from 'react';
// import { AuthContext } from './AuthProvider';

// const useAuth = () => {
//   const auth = useContext(AuthContext);

//   if (!auth) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }

//   return auth;
// };

// const checkUserLoggedIn = () => {
//   const { isAuthenticated } = useAuth(); // This line might be causing the issue
//   return isAuthenticated;
// };

// export { useAuth, checkUserLoggedIn };