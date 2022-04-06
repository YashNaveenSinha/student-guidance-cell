import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
//import { update_user } from '../../actions/authUser';
import Patient from './Patient';
import Review from './Review';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { Link } from 'react-router-dom';


const UserDashboard = ({
    update_user,
    authUser: { user },
    profile: { profile, loading }
}) => {
    console.log(user?.medicalHistory, 'here');
    const [medHis, setmedHis] = useState('');
    useEffect(() => {
        user?.medicalHistory && setmedHis(user?.medicalHistory);
    }, [user?.medicalHistory]);
    return (<Fragment>
        <section id="dashboard">
            <div className="container">
                <div className="heading-common">
                    <h1><strong>Dashboard</strong></h1>
                    <h2 className="welcome-heading"><i className="fas fa-user"></i> Welcome {user?.name}</h2>
                </div>
                <br />
                {user !== null ? (
                    <Fragment>
                        {/* {profile.patients !== null && profile.patients.length > 0 ?
                                (
                                    <Patient patient={profile.patients} />
                                ) : (
                                    <h5 style={{ color: "#738f93" }}>No Appointments yet..</h5>
                                )
                            } */}
                        {/* <Review patient={profile.patients} review={profile.review} /> */}
                        {/* <Experience experience={profile.experience} /> */}
                        <input type="textarea"
                            name="textValue"
                            value={medHis}
                            onChange={e => { setmedHis(e.currentTarget.value) }}
                        />
                        <button onClick={() => { update_user({ _id: user?._id, name: user?.name, medicalHistory: medHis }) }} type="button" className='btn btn-danger'>Add</button>
                        {/* <Education education={profile.name} />
                        <button
                            onClick={() => deleteAccount()}
                            type="button"
                            className="btn btn-danger"><i className="fas fa-user-minus"></i> Delete My Account
                        </button> */}

                    </Fragment>
                ) : (
                    <Fragment>
                        <p>You do not have any Profile. Create One..</p>
                        <Link to='/create-profile' className="btn btn-info">
                            Create Profile
                        </Link>
                    </Fragment>
                )}
            </div>
        </section>
        <br />
    </Fragment>
    );
};

const mapStateToProps = state => ({
    authUser: state.authUser,
    profile: state.profile
});

export default connect(mapStateToProps, null)(UserDashboard);
