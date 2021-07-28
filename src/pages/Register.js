import React from 'react';
import Expenses from './components/Expenses';
import Sidebar from './components/Sidebar';

class Register extends React.Component {

	render(){
		let logo = {
			backgroundImage: 'url(./logoSide.png)',
			backgroundSize: 'contain',
			backgroundRepeat: 'no-repeat'
		};
		return (
		<div className='regView'>
			<div className='regView__header'>
				<div className='regView__header__wrapper'>
					<div style={{flex:4}} className='regView__header__wrapper__date'>
						<ul>
							<li><h1>GIORNO<br /><span>{this.props.day}</span></h1></li>
							<li><h1>MESE<br /><span>{this.props.month}</span></h1></li>
							<li><h1>ANNO<br /><span>{this.props.year}</span></h1></li>
						</ul>
					</div>
					<h1 style={logo} className='regView__header__wrapper__title'></h1>
				</div>
			</div>
			<div className='regView__content'>
				<Sidebar reportData={this.props.reportData} isOpen={this.props.isOpen}/>
				<Expenses exps={this.props.exps} />
			</div>
		</div>
		);
	}
}

export default Register;