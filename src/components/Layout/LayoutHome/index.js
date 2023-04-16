import Header from './Header';
import Footer from './Footer';

function LayoutHome({ children }) {
    // Get current admin information

    return (
        <>
            <Header />
            <div className="">{children}</div>
            <Footer />
        </>
    );
}

export default LayoutHome;
