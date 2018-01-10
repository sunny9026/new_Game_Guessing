import React, {Component} from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){
    
    class AuthHOC extends Component{

        

        componentWillMount(){
            if(!this.props.auth){
                this.props.history.push('/');
            }
        }

        componentWillUpdate(nextProps){
            if(!this.nextProps.auth){
                this.props.history.push('/');
            }
        }

        render(){
            return <ComposedComponent {...this.props} />
        }

    }

    function mapStateToProps({authenticated}){
        return{
            auth: authenticated.auth
        }
    }

    return connect(mapStateToProps)(AuthHOC)
}