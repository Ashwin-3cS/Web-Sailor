// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function LoginPage() {
//     const [email, setEmail] = useState('');
//     const [username, setUsername] = useState('');
//     const [error, setError] = useState('');
//     const router = useRouter();  // Correct placement of the hook

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const res = await fetch('/api/auth', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, username }),
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 throw new Error(errorData.message || 'Something went wrong');
//             }

//             const data = await res.json();
//             localStorage.setItem('jwtToken', data.token);  // Store token in local storage
//             router.push('/adProvider-post');  // Navigate to the next page
//         } catch (error) {
//             setError(error.message);  // Set the error message to display
//         }
//     };

//     return (
//         <div>
//             <h1>Login</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Email"
//                     required
//                 />
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     placeholder="Username"
//                     required
//                 />
//                 <button type="submit">Login</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// }









'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const { setAuthToken } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Something went wrong');
            }

            const data = await res.json();
            setAuthToken(data.token, data.userId);
            router.push('/adProvider-post');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

