var React = require('react');
require('./Dashboard.less');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

var BankAccountItem = React.createClass({
    getInitialState: function() {
        return {ibanErr:'',bankErr:''};
    },
    __onIbanChange: function(event) {
        var value = event.target.value;
        if (IBAN.isValid(value)){
            this.setState({ibanErr:''});
            this.props.onChange && this.props.onChange('iban', value);
        } else {
            this.setState({ibanErr:'IBAN is not Valid'});
            event.target.focus();
        }
    },
    __onbnameChange: function(event) {
        var value =event.target.value;
        if (value ===''){
            this.setState({bankErr:"Bank name Should not be Blank"});
            event.target.focus();
        } else {
            this.setState({bankErr:''});
            this.props.onChange && this.props.onChange('bankName', value);
        }
    },
    render: function() {
        return (
            <li className="accountItem">
                    <div >
                        <TextField name='iban' floatingLabelText="IBAN" onBlur ={(event)=>this.__onIbanChange(event)} errorText={this.state.ibanErr}/>
                        <span>
                        <i className="fa fa-remove" onClick={this.props.onRemove}/></span>
                        <TextField name='bankName' floatingLabelText="Bank Name" onBlur ={(event)=>this.__onbnameChange(event)} errorText={this.state.bankErr}/>
                    </div>
            </li>
        );
    }
});

module.exports = React.createClass({
    getInitialState: function() {
        return {
            bankac: [],
            fnameErr:'',
            lnameErr:'',
            emailErr:'',
            addAccErr:'',
            fName:'',
            lName:'',
            email:'',
            formData:{},
            logsBox:false
        };
    },
    __removeItem: function(name, index) {
        this.state[name].splice(index, 1);
        this.state[name] = this.state[name];
        this.forceUpdate();
    },
    __onAddBankAccountItem: function() {
        this.setState({addAccErr:''});
        this.state.bankac.push({iban: '', bankName: ''});
        this.setState({bankac: this.state.bankac});
    },
    __onNameValidate: function(event){
        var value=event.target.value, regEx = /^[A-z]+$/;
        if(value.search(regEx) == -1){
            if(event.target.id ==='firstName'){
                this.setState({fnameErr:'FirstName Should only contain Alphabets'});
                event.target.focus();
            } else if (event.target.id ==='lastName') {
                this.setState({lnameErr:'LastName Should only contain Alphabets'});
                event.target.focus();
            }
		} else {
            if(event.target.id ==='firstName'){
                this.setState({fName:value});
            } else if(event.target.id ==='lastName') {
                this.setState({lName:value});
            }
            this.setState({fnameErr:'',lnameErr:''});
        }
    },
    __onEmailValidate: function(event){
        var value = event.target.value,
        regEx= /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
        if(value.search(regEx) == -1){
            this.setState({emailErr:'Email is not valid'});
            event.target.focus();
		} else{
            this.setState({email:value,emailErr:''});
        }
    },
    __formSubmit:function(){
        var formData={};
        if(this.state.bankac.length==0){
            this.setState({addAccErr:'Add Atleast One Bank Account'});
        } else{
            formData.firstName=this.state.fName;
            formData.lastName=this.state.lName;
            formData.email=this.state.email;
            formData.bankAccounts=[];
            formData.bankAccounts=this.state.bankac;
            this.setState({logsBox:true, formData:formData});
        }

    },

    render: function() {
        const style = {
            height: 'auto',
            width: 400,
            margin: '3% 0 0 35%',
            padding: 20,
            textAlign: 'center'
        };
        var result= JSON.stringify(this.state.formData);
        return (
            <div className="rt-dashboard">
                <MuiThemeProvider>
                    <Paper style={style} zDepth={4}>
                            <h3>Register Account</h3>
                            <TextField id="firstName" floatingLabelText="First Name" onBlur ={(event)=>this.__onNameValidate(event)} errorText ={this.state.fnameErr}/>
                            <TextField id="lastName" floatingLabelText="Last Name" onBlur ={(event)=>this.__onNameValidate(event)} errorText ={this.state.lnameErr}/>
                            <TextField floatingLabelText="Email" onBlur ={(event)=>this.__onEmailValidate(event)} errorText ={this.state.emailErr}/>
                            <RaisedButton style={{width:250, textAlign:'center'}} label="+Add Bank Account" primary={true} onClick={this.__onAddBankAccountItem}/>
                            <div style={{color:'red'}}>{this.state.addAccErr}</div>
                            {this.state.bankac.map(function(input, index) {
                                    return <ul>
                                        <BankAccountItem key={index} onChange={(key, value) => {
                                            input[key] = value;
                                        }} onRemove={() => this.__removeItem('bankac', index)}/>
                                    </ul>;
                                }.bind(this))
                            }
                        <RaisedButton style={{width:200, textAlign:'center', marginTop:10}} label="Submit" primary={true} onClick={this.__formSubmit}/>
                    </Paper>
                </MuiThemeProvider>
                <MuiThemeProvider>
                    <Dialog title="Form Result"
                          actions={[ <RaisedButton label="close" primary={true} onClick={()=>this.setState({logsBox: false})} /> ]}
                          modal={false} open={this.state.logsBox}
                          onRequestClose={()=>this.setState({logsBox: false})}>
                      {result}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
});
