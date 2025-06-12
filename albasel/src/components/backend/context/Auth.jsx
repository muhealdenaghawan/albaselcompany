import { createContext } from "react";
import React, { useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [user, setUser] = useState(userInfo);

    // const [user, setUser] = useState(() => {
    //     const userInfo = localStorage.getItem('userInfo');
    //     return userInfo ? JSON.parse(userInfo) : null;
    //   });
      

    const login = (user) => {
        setUser(user)
    }
    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null)
    }
    return(
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}


// import { createContext } from "react";
// import React, { useState, useEffect } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//   }, []);

//   const login = (user) => {
//     setUser(user);
//     localStorage.setItem('userInfo', JSON.stringify(user));
//   };

//   const logout = () => {
//     localStorage.removeItem('userInfo');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{
//       user,
//       login,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// import { createContext } from "react";
// import React, { useState, useEffect } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);  // 👉 أضفناها هنا

//   useEffect(() => {
//     const userInfo = localStorage.getItem('userInfo');
//     if (userInfo) {
//       setUser(JSON.parse(userInfo));
//     }
//     setLoading(false);  // 👉 نخليها false بعد ما يخلص
//   }, []);

//   const login = (user) => {
//     setUser(user);
//     localStorage.setItem('userInfo', JSON.stringify(user));
//   };

//   const logout = () => {
//     localStorage.removeItem('userInfo');
//     setUser(null);
//   };

//   if (loading) return <div>Loading...</div>;  // 👉 أضفناها قبل return

//   return (
//     <AuthContext.Provider value={{
//       user,
//       login,
//       logout
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
