var React = require('react');
require('./Index.less');


module.exports = React.createClass({
	getInitialState:function(){
		return {};
	},
	componentDidMount:function(){
		Session.jump('/Dashboard');
	},

	render:function(){

		return (
			<UI.Layout
				direction="V"
				className="loginapp-index"
				id="loginapp-body"
				hStyle={{top:0}}
				begin={7}
				end={7} >
				<div className="header">
					<span style={{color:'#e6ebf1',marginLeft:5}}>Login Application</span>
				</div>
				<div className="body" style={{height:'100%'}}>
						<div style={{marginLeft:100}}>
							{this.props.view && <this.props.view request={this.props.request} {...this.props.request.search} />}
						</div>
				</div>

				<div className="footer">
					<i style={{ marginRight: 3 }} className="fa fa-copyright" /> 2017. All Rights Reserved.
				</div>
			</UI.Layout>
		);
	}
});
