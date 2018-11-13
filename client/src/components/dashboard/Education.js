import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Moment from 'react-moment'
import {
    deleteEducation
} from '../../actions/profileActions';

class Education extends Component {

    constructor(props){
        super(props);
    }

    onDeleteClick = (id) => {
        this.props.deleteEducation(id, this.props.history);
    };

    render() {

        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                    {edu.to === null ? (' Now') : <Moment fomat="YYYY/MM/DD"> {edu.to}</Moment>}
                </td>
                <td><button onClick={this.onDeleteClick.bind(null, edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ));

        return(
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                    {education}
                    </thead>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
};

export default connect(null, {
    deleteEducation
})(withRouter(Education));