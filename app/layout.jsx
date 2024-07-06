import Navbar from '@components/Navbar';
import '@styles/globals.css';
import '@components/Provider'
import Provider from '@components/Provider';

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
            <Provider>
                <main className='gradient'>
                    <Navbar/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
)
}

export default RootLayout