var React = require('react');
require('./Index.less');
var HOST1 = require('../config.js').HOST;
import io from 'socket.io-client';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


module.exports = React.createClass({
	getInitialState:function(){
		return {
			cycle:[],
			rul:[],
			config:{},
			layout:{},
			data:[],
			sdata:[],
			sid:[],
			checkbox:[]
		};
	},
	componentDidMount:function(){
		this.__getConnected();
		Session.jump('/Dashboard');
	},

	__getConnected:function(){
           var socket = io.connect(HOST1 + '/socket'),
		   _self = this;
		   socket.emit('on_connect');
		   socket.emit('on_message_predict');
		   socket.emit('on_message_sensor','s1,s2,s3');
		   socket.on('message_response_predict', function(msg) {
		   		//console.log(msg);
				msg = JSON.parse(msg);
				var result = msg.result;
				result = JSON.parse(result);
				_self.state.rul.push(result.rul);
				_self.state.cycle.push(result.cycle);
				//console.log(_self.state);
		   });
		   socket.on('message_response_sensor', function(msg1) {
			   //console.log(msg1);
			   var result = JSON.parse(msg1.result.edata);
			   _self.state.sdata.push(result);
			   _self.state.sdata.map(function(item,index){
				   if(item&&item.length!==0){
					   _self.state.checkbox.push(item.sid);
				   }
			   });

		  });
    },
	__renderChart:function(){
			Highcharts.chart('RULDiagram', {
			   chart: {
				   type: 'spline',
				   animation: Highcharts.svg, // don't animate in old IE
				   marginRight: 10,
				   events: {
					   load: function () {
						   _self.chartSeries = this.series[0];
					   }
				   }
			   },
			   title: {
				   text: 'RUL Diagram'
			   },
			   xAxis: {
				   type: 'datetime',
				   tickPixelInterval: 150
			   },
			   yAxis: {
				   title: {
					   text: 'Value'
				   },
				   plotLines: [{
					   value: 0,
					   width: 1,
					   color: '#808080'
				   }]
			   },
			   tooltip: {
				   formatter: function () {
					   return '<b>' + this.series.name + '</b><br/>' +
						   Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
						   Highcharts.numberFormat(this.y, 2);
				   }
			   },
			   legend: {
				   enabled: false
			   },
			   exporting: {
				   enabled: false
			   },
			   series: [{
				   name: 'RUL data',
				   data: (function () {
					   // generate an array of random data
					   var data = [];
						   data.push({
							   x: this.state.rul,
							   y: this.state.cycle
						   });
					   return data;
				   }())
			   }]
		   });
	},
	render:function(){
		const styles = {
				  block: {
				    maxWidth: 250,
				  },
				  checkbox: {
				    marginBottom: 16,
				  },
				};
		return (
			<div id="parent_div">
				<div id="RULDiagram" style={{marginTop:'2em'}}></div>
				<ul id="sensor_diagram_checklist" style={styles.block}>
						{
							this.state.checkbox.map(function(item,index){
								return <li>
										<MuiThemeProvider>
											<Checkbox key={index} label="Simple" style={styles.checkbox} />
										</MuiThemeProvider>
										</li>;
							}.bind(this))
						}
				</ul>
				<div id="sensory_diagram"></div>
			</div>
		);
	}
});
