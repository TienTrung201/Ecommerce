import Header from './Header';
import Footer from './Footer';

function LayoutHome({ children }) {
    // Get current admin information

    return (
        <>
            <Header />
            <div className="margin_top-100">{children}</div>
            <Footer />
        </>
    );
}

export default LayoutHome;
