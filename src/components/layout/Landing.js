import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../../App.css';

const Landing = ({ isDoctorAuthenticated, isUserAuthenticated }) => {
    if (isDoctorAuthenticated) {
        return <Redirect to="/dashboard" />
    } else if (isUserAuthenticated) {
        return <Redirect to="/appointment" />
    }

    return (
        <Fragment>
            <section id="landing">
                <div className="container">
                    <div className="heading">
                        <h1 className="main-heading">NITC Counselling</h1>
                        <h1 className="main-heading">Book Your <span className="main-span">Appointment.</span></h1>
                    </div>
                    <div className="signup">
                        <div className="doctor-signup">
                            <h2 className=" item heading-sub"><strong>Sign Up</strong></h2>
                            {/* <p className="item description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel itaque quae delectus veritatis consequatur hic!</p> */}
                            <Link to="/registerDoctor" type="button" className="item btn btn-info">For Counsellors</Link>
                        </div>
                        <div className="user-signup">
                            <h2 className="item heading-sub"><strong></strong></h2>
                            {/* <p className="item special description">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel itaque quae delectus veritatis consequatur hic!</p> */}
                            <Link to="/registerUser" className="item btn btn-outline-info" style={{ marginTop: "40px" }}>For Users</Link>
                        </div>
                    </div>
                    <br />
                    <div className="img">
                        <div className="img-1">
                            <img src={require("../../img/doctPat.jpg")} />
                        </div>
                    </div>
                </div>
                <br />
            </section>
        </Fragment>
    );
};
Landing.propTypes = {
    isDoctorAuthenticated: PropTypes.bool.isRequired,
    isUserAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isDoctorAuthenticated: state.authDoctor.isDoctorAuthenticated,
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps)(Landing);
