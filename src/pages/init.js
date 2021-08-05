import React from 'react';
import Axios from 'axios';
import {apiUrl} from '../App';

class Init extends React.Component {
		constructor(props){
			super(props);
			this.state = {capital: '', reserve: ''};
			this.postMainData = this.postMainData.bind(this);
		}

		postMainData(){
			Axios.post(`${apiUrl}/main-data`,{
				capital: this.state.capital,
				reserve: this.state.reserve
			})
			.then(()=>window.location.replace('/reg'))
			.catch(err=>{
				document.cookie = `badReq=${err};`;
            	window.location.replace('/badreq');
            	console.log(err);
			});
		}
	render(){
		return (
        <div className='setUpReg'>
			<div className='setUpReg__header'>
				<h1>REGISTRO FINANZIARIO</h1>
				<h1><span>DATA CORRENTE</span><br />{this.props.day} {this.props.month} {this.props.year}</h1>
			</div>

			<div className='setUpReg__form'>
				<label>
					<p>INSERIRE IL CAPITALE</p><br />
					<input type="text" name="capital" value={this.state.capital} onChange={(e)=>{this.setState({capital: e.target.value})}}/>
				</label>
				<label>
					<p>INSERIRE RISERVA FONDO</p><br />
					<input type="text" name="reserve" value={this.state.reserve} onChange={(e)=>{this.setState({reserve: e.target.value})}}/>
				</label><br />
				<input className='btn-default' type="submit" name="submitBtn" value='CONFERMA' onClick={this.postMainData}/>
			</div>
		</div>
		);
	}
}

export default Init;