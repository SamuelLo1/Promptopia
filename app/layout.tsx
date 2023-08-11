import '@styles/globals.css'; //imports css to entire application

//this layout of navbar will be used throughout each page
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const metadata = {
    title: "Promptopia", 
    description: 'Discover & share AI Prompts'
}

const Rootlayout = ({ children }) => {
  return (
    <html lang ="en">
        <body>
            <div className="main">
                <div className = "gradient"/>
            </div>

            <main className ="app">
                <Nav />
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout