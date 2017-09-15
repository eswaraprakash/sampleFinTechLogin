require('./ErrorPage.less');
var React = require('react');

module.exports = React.createClass({
	displayName:'ErrorPage',
	getInitialState:function(){
		return {

		}
	},
	componentDidMount:function(){

	},
	render: function(){
		return (
			<div className="c-error-page" >
				<div className="container">
					<h1 className="title">ERROR: 404 Not Found</h1>
					<div className="detail">DETAIL: Not Found The URI <a href={'#' + this.props.request.path}>{this.props.request.path}</a></div>
				</div>
			</div>
		);
	}
});
