import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component{

    renderFields({label, input, type, meta: { touched, error }}){
        return(
        <fieldset className="form-group">
            <label>{label}</label>
            <input {...input} type={type} className="form-control" />
            {touched && error && <div className="alert alert-danger">{error}</div>}
        </fieldset>
        );
    }

    handleFormSubmit(formValues){
        this.props.signUpUser(formValues, () => {
            this.props.history.push('/MainGame');
        });
    }

    renderErrors(){
        if(this.props.signupError){
            return <div className="alert alert-danger">OOps.!! {this.props.signupError}</div>
        }
    }

    render(){
        const { handleSubmit, pristine, reset, submitting, valid } = this.props;
        return(
            <form className="container col-md-4" onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
                <Field name='email' label='Email:' type='text' component={this.renderFields} />
                <Field name='password' label='Password:' type='password' component={this.renderFields} />
                <Field name='confirmPass' label='Confirm Password:' type='password' component={this.renderFields} />
                {this.renderErrors()}
                <button disabled={pristine || !valid || submitting} className="btn btn-primary" type='submit'>Submit</button>&nbsp;
                <button onClick={()=>{this.props.history.push('/')}} className="btn btn-danger">Cancel</button>
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
        errors.password = "Password mandatory.!";
    }
    if(values.password !== values.confirmPass){
        errors.confirmPass = "Password and Confirm Password should Match.!";
    }

    return errors;
}

function mapStateToProps({authenticated}){
    return{
        signupError: authenticated.error
    }
}

export default reduxForm({
    form: 'user_signup',
    validate
})(connect(null, actions)(Signup))