import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteAppointment } from '../../actions/appointment';

const AppointmentItems = ({
    appointment, deleteAppointment,
}) => {
    const slotsArray = {
        '8_9': '8:00-9:00',
        '9_10': '9:00-10:00',
        '10_11': '10:00-11:00',
        '11_12': '11:00-12:00',
        '12_1': '12:00-1:00',
        '1_2': '1:00-2:00',
        '2_3': '2:00-3:00',
        '3_4': '3:00-4:00',
        '4_5': '4:00-5:00',
        '5_6': '5:00-6:00',
    }
    const appointments = appointment.map(appnt => (
        <div key={appnt.id} className="profile-1">
            <div className="profile-img">
                <Link to={`/doctor/${appnt.doctor}`}>
                    <img src={appnt.avatar} alt="" />
                </Link>
                <h5 className="heading-sub"><strong>{appnt.name}</strong></h5>
            </div>
            <div className="profile-details">
                <div className="appointment-p profile-desc">
                    <h2 className="profile-heading"><strong>{appnt.patientname}</strong></h2>
                    <p className="profile-p"><strong>Father's name: {appnt.fathername}</strong></p>
                    <p className="profile-p2"><strong>Age: </strong>{appnt.age}</p>
                    <p className="profile-p2"><strong>Status: </strong>{appnt.status}</p>
                    <p className="profile-p2"><strong>Date: </strong><Moment format='DD/MM/YYYY'>{appnt.date}</Moment></p>
                    <p className="profile-p2"><strong>Slot: </strong>{slotsArray[appnt.slot]}</p>
                    <p className="profile-p2"><strong>Booking ID: </strong>{appnt.bookingId}</p>
                </div>
            </div>
            <div className="desc-p">
                <p className="profile-p2"><strong>Description: </strong>{appnt.description}</p>
                <button onClick={() => deleteAppointment(appnt._id)} type="button" className="profile-btn btn btn-danger">Cancel</button>
            </div>
        </div>
    ));
    return (
        <Fragment>
            {appointments}
        </Fragment>
    );
};

AppointmentItems.propTypes = {
    appointment: PropTypes.array.isRequired,
    deleteAppointment: PropTypes.func.isRequired
}

export default connect(null, { deleteAppointment })(AppointmentItems);
