import Header from './Header';
import Footer from './Footer';

function LayoutPage({ children }) {
    return (
        <section className="">
            <Header />
            <div className="margin_top-80 shopProducts">{children}</div>
            <Footer />
        </section>
    );
}

export default LayoutPage;
