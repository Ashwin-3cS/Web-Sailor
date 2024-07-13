// 'use client';

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     const [token, setToken] = useState('');
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const storedToken = localStorage.getItem('jwtToken');
//         if (storedToken) {
//             setToken(storedToken);
//         }
//         setLoading(false);
//     }, []);

//     const setAuthToken = (newToken) => {
//         setToken(newToken);
//         localStorage.setItem('jwtToken', newToken);
//     };

//     const clearAuthToken = () => {
//         setToken('');
//         localStorage.removeItem('jwtToken');
//         router.push('/login');
//     };

//     return (
//         <AuthContext.Provider value={{ token, setAuthToken, clearAuthToken }}>
//             {loading ? <p>Loading...</p> : children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => useContext(AuthContext);



// AuthContext with User ID Storage:







'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        const storedUserId = localStorage.getItem('userId');
        if (storedToken && storedUserId) {
            setToken(storedToken);
            setUserId(storedUserId);
        }
        setLoading(false);
    }, []);

    const setAuthToken = (newToken, newUserId) => {
        setToken(newToken);
        setUserId(newUserId);
        localStorage.setItem('jwtToken', newToken);
        localStorage.setItem('userId', newUserId);
    };

    const clearAuthToken = () => {
        setToken('');
        setUserId('');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userId');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ token, userId, setAuthToken, clearAuthToken }}>
            {loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);


