function Footer() {
    return (
        <div className="newsletter">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-6 col-xs-12">
                        <div className="newsletter-heading">
                            <h3>get in touch </h3>
                            <p>Subscribe for latest stories and promotions (35% sale)</p>
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-6 col-xs-12 flex-end">
                        <form className="form_newsletter" action="#" method="post">
                            <input
                                type="email"
                                placeholder="Enter your emaill"
                                name="EMAIL"
                                id="mail"
                                className="newsletter-input form-control"
                            />
                            <button id="subscribe" className="button_mini zoa-btn" type="submit">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
