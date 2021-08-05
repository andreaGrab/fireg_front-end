import React from 'react';
import {
	Switch,
    Redirect} from 'react-router-dom';

class OnLoading extends React.Component {
    constructor(props){
        super(props);
        this.redirectTo = this.redirectTo.bind(this);
    }
    redirectTo(){
        if(this.props.mainData){
            return this.props.mainData.data.length !==0 ? <Redirect to='/reg' /> : <Redirect to='/init' />
        }
    }
	render(){
        const styling = {
            backgroundImage: 'url(./logoFull.png)',
            width: '645px',
            height: '223px',
            margin: '15% auto',
            marginBottom: '0',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            color: 'transparent'// for react warnings
        };
        const spinLoad = {
            width: '15%',
            margin: 'auto',
            display: 'block'
        };
		return (
            <div>
                <h1 style={styling}>fireg</h1>
                <img style={spinLoad} src='./spinLoad.gif' alt='icon spin' />
                <Switch>
                    {this.redirectTo()}
                </Switch>
            </div>
		);
	}
}

export default OnLoading;