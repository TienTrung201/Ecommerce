import Modal from '@/components/Layout/Modal';

function Account() {
    const onDateFocus = (e) => (e.target.type = 'date');
    const onDateBlur = (e) => (e.target.type = 'text');

    return (
        <div className="tab-content">
            {/* <Modal visible={true} title={'hello'} save={'Gửi'} /> */}
            <div id="home" className="tab-pane fade in active">
                <div className="form">
                    <form action="#" method="post">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Name</label>
                                <br />
                                <input type="text" name="name" placeholder="Name" required="" className="city" />
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <label>phone</label>
                                <br />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="+84 0123456789"
                                    required=""
                                    className="phone"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Giới tính</label>
                                <br />
                                <input type="text" name="name" placeholder="Nam/Nữ" required="" className="city" />
                            </div>

                            <div className="col-md-6 col-sm-6">
                                <label>Ngày Sinh</label>
                                <br />
                                <input
                                    onFocus={onDateFocus}
                                    onBlur={onDateBlur}
                                    type="text"
                                    placeholder="Ngày sinh"
                                    name="city"
                                    className="phone Account-Date"
                                />
                            </div>
                        </div>
                        <label>Street address</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="no1, trang tien, hoan kiem district"
                            required=""
                            className="city"
                        />
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Password</label>
                                <br />
                                <input
                                    type="text"
                                    name="password"
                                    placeholder={'******'}
                                    required=""
                                    className="zipcode"
                                />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label>Country</label>
                                <br />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Việt Nam"
                                    required=""
                                    className="country"
                                />
                            </div>
                        </div>
                        <label className="mail">email</label>
                        <br />
                        <input type="text" name="city" placeholder="felixdg@gmail.com" required="" className="gmail" />
                        <button className="change">Save change</button>
                    </form>
                </div>
            </div>
            <div id="menu1" className="tab-pane fade">
                <div className="form">
                    <form action="#" method="post">
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>Country</label>
                                <br />
                                <input
                                    type="text"
                                    name="country"
                                    placeholder="Việt Nam"
                                    required=""
                                    className="country"
                                />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label>City /state</label>
                                <br />
                                <input type="text" name="city" placeholder="Hà nội" required="" className="city" />
                            </div>
                        </div>
                        <label>Street address</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="no1, trang tien, hoan kiem district"
                            required=""
                            className="city"
                        />
                        <div className="row">
                            <div className="col-md-6 col-sm-6">
                                <label>ZIP</label>
                                <br />
                                <input type="text" name="country" placeholder={12345} required="" className="zipcode" />
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <label>phone</label>
                                <br />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="+84 0123456789"
                                    required=""
                                    className="phone"
                                />
                            </div>
                        </div>
                        <label className="mail">email</label>
                        <br />
                        <input type="text" name="city" placeholder="felixdg@gmail.com" required="" className="gmail" />
                        <button className="change">Save change</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Account;
