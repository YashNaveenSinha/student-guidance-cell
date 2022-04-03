import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAppointment } from '../../actions/appointment';
import { Link } from 'react-router-dom';


const Form = ({ profile, patients, doctorId, history, addAppointment }) => {

    const [formData, setFormData] = useState({
        patientname: '',
        fathername: '',
        age: '',
        status: '',
        date: '',
        slot:'',
        description: ''
    });

    const [usedSlots, setUsedSlots] = useState([])

    const slotsArray = {
        '8_9' : '8:00-9:00',
        '9_10' : '9:00-10:00',
        '10_11' : '10:00-11:00',
        '11_12' : '11:00-12:00',
        '12_1' : '12:00-1:00',
        '1_2' : '1:00-2:00',
        '2_3' : '2:00-3:00',
        '3_4' : '3:00-4:00',
        '4_5' : '4:00-5:00',
        '5_6' : '5:00-6:00',
    }

    const {
        patientname,
        fathername,
        age,
        status,
        date,
        slot,
        description
    } = formData;

    const onChange = (e, attr) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        // console.log('attr', e.target.value);
        if(attr == 'dp' && patients && patients.length){
            let uSlots = []
            patients.map((item)=>{
                console.log(item.date.split('T')[0], e.target.value, item.date.split('T')[0] == e.target.value);
                if(item.date.split('T')[0] == e.target.value){
                    uSlots.push(item.slot);
                }
            })
            console.log({uSlots});
            setUsedSlots(uSlots)
        }
    };
    const updateSlot = (e, item) =>{
        console.log('elem', e.currentTarget);
        e.currentTarget.classList.add('selected')
        setFormData({
            ...formData,
            slot: item
        })
    }

    const slotItems = Object.keys(slotsArray).map(item => (
          <span key={item} onClick={e => updateSlot(e, item)}> {!usedSlots.includes(item) ? slotsArray[item]  : ''}</span>
    ))
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
                        onChange={e => onChange(e, 'dp')} />
                </div>
                <div className="form-group">
                    <label htmlFor='slot' style={{ color: "cadetblue", marginRight: "20px", width:"100%" }}>Select a slot</label>
                    <div className='slot-wrapper'>
                        {slotItems.length > 0 ? slotItems : 'No slots left fot this day'}
                    </div>
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
