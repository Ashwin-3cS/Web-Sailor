import Navbar from '@components/Navbar';
import '@styles/globals.css';
import '@components/Provider'
import Provider from '@components/Provider';
import Footer from '@components/Footer';
import { AuthProvider } from './context/AuthContext';
export const metadata = {
    title : "Web Sailor",
    description : "Ocean of Websites"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <head>
            <meta name="description" content={metadata.description} />
            <link rel="icon" href="/assets/images/sailor.svg" />
        </head>
        <body>
        <AuthProvider>
            <Provider>
                <main className='gradient '>
                    <Navbar/>
                    {children}
                    <Footer/>
                </main>
            </Provider>
        </AuthProvider>
 
        </body>
    </html>
)
}

export default RootLayout