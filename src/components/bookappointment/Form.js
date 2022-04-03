import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAppointment } from '../../actions/appointment';
import { Link } from 'react-router-dom';


const Form = ({ profile, doctorId, history, addAppointment }) => {

    const [formData, setFormData] = useState({
        patientname: '',
        fathername: '',
        age: '',
        status: '',
        date: '',
        description: ''
    });

    const {
        patientname,
        fathername,
        age,
        status,
        date,
        description
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    return (
        <Fragment>
            <br />
            <div className="heading-common">
                <h1><strong>Book Appointment</strong>
                </h1>
                <p className="lead">
                    Provide your details correctly and book your appointment.
                </p>
                <div className="appointment-doctor">
                    <img className="round-img appointment-img" src={profile.avatar} alt="" />
                    <p className="lead"><strong>{profile.name}</strong></p>
                </div>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                addAppointment(doctorId, formData, history);
            }}>
                <small>* = required field</small>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="* Patient name"
                        name="patientname"
                        value={patientname}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="* Father name"
                        name="fathername"
                        value={fathername}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="* Age"
                        name="age"
                        value={age}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="* Status"
                        name="status"
                        value={status}
                        onChange={e => onChange(e)} />
                    <small className="form-text">Status like profession (eg. student, job etc)</small>
                </div>
                <h6 style={{ color: "cadetblue", marginRight: "20px" }}>Date</h6>
                <div className="form-group">
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={date}
                        onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <label htmlFor='slot' style={{ color: "cadetblue", marginRight: "20px" }}>Select a slot</label>
                    <select id="slot" name="slot">
                        <option value="slot-1">8:00-9:00</option>
                        <option value="slot-2">9:00-10:00</option>
                        <option value="slot-3">10:00-11:00</option>
                        <option value="slot-4">11:00-12:00</option>
                        <option value="slot-5">13:00-14:00</option>
                        <option value="slot-6">14:00-15:00</option>
                        <option value="slot-7">15:00-16:00</option>
                        <option value="slot-8">16:00-17:00</option>
                    </select>
                </div>
                <div className="form-group">
                    <textarea
                        className="form-control"
                        placeholder="* Health Problem Description"
                        name="description"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                    <small className="form-text">Tell us about the Health Problem.</small>
                </div>
                <input type="submit" value="Submit" className="btn btn-info" />{' '}
                <Link to="/profiles" type="submit" className="btn btn-outline-secondary">Go Back</Link>
            </form>
            <br />
        </Fragment>
    );
};

Form.propTypes = {
    addAppointment: PropTypes.func.isRequired
}

export default connect(null, { addAppointment })(Form);
