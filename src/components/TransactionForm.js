import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import * as action from "../redux/actions/transaction/tranasctionActions";
import {connect} from "react-redux";

class TransactionForm extends Component {

    state = {
        ...this.returnStateObject()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentId !== this.props.currentId || prevProps.list.length !== this.props.list.length) {
            this.setState({
                ...this.returnStateObject()
            })
        }
    }

    returnStateObject() {
        if (this.props.currentId === -1) {
            return {
                bankNo: '',
                accountName: '',
                amount: ''
            }
        } else {
            console.log(this.props.list[this.props.currentId])
            return this.props.list[this.props.currentId]
        }
    }

    handleInputChanges = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log(this.state)
        if (this.state.accountName === "") {
            alert("enter Account Name")
        } else if (this.state.bankNo === "") {
            alert("Enter Bank No")
        } else if (this.state.amount === "") {
            alert("Enter Amount")
        } else {
            if (this.props.currentId === -1) {
                this.props.insertTransaction(this.state)
            } else {
                this.props.updateTransaction(this.state)
            }
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <input type="text" name="bankNo" placeholder="enter Bank no"
                           value={this.state.bankNo} onChange={this.handleInputChanges}
                    /><br/>
                    <input type="text" name="accountName" placeholder="enter account Name"
                           value={this.state.accountName} onChange={this.handleInputChanges}
                    /><br/>
                    <input type="text" name="amount" placeholder="enter amount"
                           value={this.state.amount} onChange={this.handleInputChanges}
                    /> <br/>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.transaction.list,
        currentId: state.transaction.currentId
    }
}
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        insertTransaction: action.insert,
        updateTransaction: action.update
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);