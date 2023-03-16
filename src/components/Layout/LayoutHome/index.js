import Header from './Header';
import Footer from './Footer';

function LayoutHome({ children }) {
    return (
        <section className="">
            <Header />
            <div className="">{children}</div>
            <Footer />
        </section>
    );
}

export default LayoutHome;
