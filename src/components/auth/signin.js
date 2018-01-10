import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component{

    handleFormSubmit(formProps){
        this.props.authorizeUser(formProps, ()=>{
            this.props.history.push('/MainGame');
        });
    }

    renderFields({type, label, input, meta: { touched, error }}){
        return(
        <fieldset className="form-group">
        <label>{label}</label>
        <input {...input} type={type} className="form-control" />
        {touched && error && <div className="aler alert-danger">{error}</div>}
        </fieldset>
        );
    }

    renderErrors(){
        if(this.props.loginerr){
            return <div className="alert alert-danger">OOps.!!{this.props.loginerr}</div>
        }
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, valid } = this.props;
        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" label="Email:" component={this.renderFields} type="text" />

                <Field name="password" label="Password:" component={this.renderFields} type="password" />

                {this.renderErrors()}
            
                <button action="submit"  disabled={pristine || !valid || submitting} className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}

function validate(values){
    const errors = {};
    if(!values.email){
        errors.email = "Must Provide an email";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if(!values.password){
        errors.password = "Must Provide a password";
    }

    return errors;
}

function mapStateToProps({authenticated}){
    return{
        loginerr: authenticated.error
    }
}

export default reduxForm({
    form: 'signin',
    validate
})(connect(mapStateToProps, actions)(Signin));