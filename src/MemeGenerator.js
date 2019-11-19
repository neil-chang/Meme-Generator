import React from 'react';

class MemeGenerator extends React.Component {
	constructor() {
		super();
		this.state = {
			topText: '',
			bottomText: '',
			randomImg: 'http://i.imgflip.com/1bij.jpg',
			allMemeImgs: []
		};
		this.componentDidMount = this.componentDidMount.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.genClick = this.genClick.bind(this);
	}
	// API call for retrieving meme imgs
	componentDidMount() {
		fetch('https://api.imgflip.com/get_memes')
			.then(response => response.json())
			.then(response => {
				const { memes } = response.data;
				this.setState({ allMemeImgs: memes });
			});
	}
	// Updates Top/Bottom text
	changeHandler(event) {
		const name = event.target.name;
		this.setState({ [name]: event.target.value });
	}
	// 'Gen' button click, displays random meme img
	genClick(event) {
		event.preventDefault();
		const number = Math.floor(Math.random() * this.state.allMemeImgs.length);
		this.setState({ randomImg: this.state.allMemeImgs[number].url });
	}
	render() {
		return (
			<div>
				<form className="meme-form" onSubmit={this.genClick}>
					<input
						type="text"
						name="topText"
						value={this.state.topText}
						placeholder="top text"
						onChange={this.changeHandler}
					/>
					<input
						type="text"
						name="bottomText"
						value={this.state.bottomText}
						placeholder="bottom text"
						onChange={this.changeHandler}
					/>
					<button>Gen</button>
				</form>
				<div className="meme">
					<img src={this.state.randomImg} alt="" />
					<h2 className="top">{this.state.topText}</h2>
					<h2 className="bottom">{this.state.bottomText}</h2>
				</div>
			</div>
		);
	}
}

export default MemeGenerator;
