import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component{

    SignoutUser(){
        this.props.signoutUser();
    }

    linkHelper(){
        if(this.props.auth){
            return <li onClick={this.SignoutUser.bind(this)} className="nav-item"><Link to = "/signout" className="nav-link">Sign out</Link></li>
        }
        else {
            console.log("unauthenticated");
            return [
                <li className="nav-item"><Link to = "/signin" className="nav-link">Sign in</Link></li>,
                <li className="nav-item"><Link to = "/signup" className="nav-link">Sign up</Link></li>
                ];
        }
    }

    render(){
        console.log(this.props.auth);
        return(
            <nav className="navbar navbar-light">
                <Link to = "/" className="navbar-brand">Home</Link>
                <ul className="nav navbar-nav">
                    {this.linkHelper()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps({authenticated}){
    return{
        auth: authenticated.auth
    }
}

export default connect(mapStateToProps, actions)(Header);