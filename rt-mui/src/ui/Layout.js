require('./Layout.less');
var React = require('react');

module.exports = React.createClass({
	displayName:'Layout',
	getDefaultProps: function (){
		return {
			begin: 0,
			end: 0,
			barWidth: 0.3,
			hStyle: {},
			bStyle: {},
			fStyle: {},
			mode: 'normal',
			className: '',
			direction: 'H',
			unit: 'rem'
		};
	},
	getInitialState: function(){
		return {
			fixedStyles: this.__getFixedStyles()
		};
	},
	componentDidMount: function(){

	},
	__onClick: function (event){
		this.props.onClick && this.props.onClick(this.props, event);
	},
	ext: function (target, source){
		for(var key in source){
			target[key] = source[key];
		}
		return target;
	},
	__getFixedStyles: function (){
		var props = this.props,
			_begin = props.begin,
			_end = props.end,
			_head = {},
			_body = {},
			_foot = {};

		if(props.direction == 'H'){
			_body.width = props.barWidth + props.unit;
			if(_begin){
				_head.width = _begin + props.unit;
				_body.left = _begin + props.unit;
				_foot.left = (_begin + props.barWidth) + props.unit;
			}
			if(_end){
				_head.right = (_end + props.barWidth) + props.unit;
				_body.right = _end + props.unit;
				_foot.width = _end + props.unit;
			}
		} else {
			_body.height = props.barWidth + props.unit;
			if(_begin){
				_head.height = _begin + props.unit;
				_body.top = _begin + props.unit;
				_foot.top = (_begin + props.barWidth) + props.unit;
			}
			if(_end){
				_head.bottom = (_end + props.barWidth) + props.unit;
				_body.bottom = _end + props.unit;
				_foot.height = _end + props.unit;
			}
		}

		return {
			head: this.ext(_head, props.hStyle),
			body: this.ext(_body, props.bStyle),
			foot: this.ext(_foot, props.fStyle)
		}
	},
	__getNormalStyles: function () {
		var props = this.props,
			_begin = props.begin,
			_end = props.end,
			_head = {},
			_body = {},
			_foot = {};

		if(props.direction == 'H'){
			_head = {
				width: _begin + props.unit
			};
			_body = {
				left: _begin + props.unit,
				right: _end + props.unit
			};
			_foot = {
				width: _end + props.unit
			}
		} else {
			_head = {
				height: _begin + props.unit
			};
			_body = {
				top: _begin + props.unit,
				bottom: _end + props.unit
			};
			_foot = {
				height: _end + props.unit
			}
		}

		return {
			head: this.ext(_head, props.hStyle),
			body: this.ext(_body, props.bStyle),
			foot: this.ext(_foot, props.fStyle)
		}
	},
	__fixedBodyRender: function (){
		var _render = this.props.bodyRender && this.props.bodyRender(this);
		if(_render){
			return _render;
		} else {
			return <div className="fixed-bar"></div>;
		}
	},
	__renderFixed: function (_children){
		var _styles = this.__getFixedStyles();   //h, v
		return (
			<div style={this.props.style} className={"c-layout mode-fixed " + this.props.direction + ' ' + this.props.className} >
				<div ref="layout-head" className="c-layout-head" style={_styles.head}>
					{_children[0]}
				</div>
				<div ref="layout-body" className="c-layout-body" style={_styles.body}>
					{this.__fixedBodyRender()}
				</div>
				<div ref="layout-foot" className="c-layout-foot" style={_styles.foot}>
					{_children[1]}
				</div>
			</div>
		);
	},
	__renderNormal: function (_children){
		var _styles = this.__getNormalStyles();   //h, v
		if(!this.props.begin){
			_children.unshift(null);
		}
		if(!this.props.end){
			_children.push(null);
		}
		return (
			<div style={this.props.style} className={"c-layout mode-normal " + this.props.direction + ' ' + this.props.className} >
				{
					!!this.props.begin && <div ref="layout-head" className="c-layout-head" style={_styles.head}>
						{_children[0] && _children[0]}
					</div>
				}
				<div ref="layout-body" className="c-layout-body" style={_styles.body}>
					{_children[1] && _children[1]}
				</div>
				{
					!!this.props.end && <div ref="layout-foot" className="c-layout-foot" style={_styles.foot}>
						{_children[2] && _children[2]}
					</div>
				}
			</div>
		);
	},
	render: function(){
		var _children = this.props.children.slice(0);
		if(_children&&_children.length === undefined){
			_children = [_children];
		}
		if(this.props.mode=='fixed'){
			return this.__renderFixed(_children);
		} else {
			return this.__renderNormal(_children);
		}
	}
});
