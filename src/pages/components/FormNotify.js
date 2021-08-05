import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class FromNotify extends React.Component {
	constructor(props){
		super(props);
		this.state = {expense: '', name: '', tag: 'ordinaria'};
		this.postExpense = this.postExpense.bind(this);
	}
	postExpense(){
		Axios.post('https://fireg.herokuapp.com/api/expenses', {
			expenses: this.state.expense,
			name: this.state.name,
			tag: this.state.tag
		})
		.then(()=>{window.location.replace('/reg')})
		.catch((err)=>{
			document.cookie = `badReq=${err}`;
			window.location.replace('/badreq');
		});
	}
	render(){
		return(
			<div className='notifyExp__form'>
				<label>
					<p>SOMMA EUR</p>
					<input type="text" name="expenses" value={this.state.expense} onChange={(e)=>this.setState({expense: e.target.value})}/>
				</label>
				<label>
					<p>GIUSTIFICAZIONE</p>
					<input type="text" name="name" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})}/>
				</label>
				<label>
					<p>TIPO DI SPESA/TAG</p>
					<select name='tag' value={this.state.tag} onChange={(e)=>this.setState({tag: e.target.value})}>
						<option value="ordinaria">ORDINARIA</option>
						<option value="straordinaria">STRAORDINARIA</option>
						<option value="imperativa">IMPERATIVA</option>
					</select>
				</label>
				<p className='date'>IN DATA <strong>{this.props.day} {this.props.month} {this.props.year}</strong></p>
				<input className='btn-default btn-default--confirm' type="submit" name="submit-exp" value='CONFERMA' onClick={this.postExpense} />
				<button className='btn-default btn-default--reject' onClick={(e)=>e.preventDefault()}><Link to='/reg'>CANCELLA</Link></button>
			</div>
		);
	}
}

export default FromNotify;