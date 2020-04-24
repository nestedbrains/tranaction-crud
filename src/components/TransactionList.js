import React, {Component} from 'react';
import TransactionForm from "./TransactionForm";
import {connect} from 'react-redux'
import * as action from '../redux/actions/transaction/tranasctionActions'

class TransactionList extends Component {

    style = {
        margin: "100px 300px "
    }

    deleteHandle = (index) => {
        console.log(this.props.deleteTransaction(index)
        )
        this.props.deleteTransaction(index)
    }

    editHandle = (index) => {
        console.log(index)
        console.log(this.props.updatedCurrentId(index))
        this.props.updatedCurrentId(index)
    }

    render() {
        return (
            <div style={this.style}>
                <TransactionForm/>
                <hr/>
                <table border="1">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Account Id</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.accountName}</td>
                                        <td>{item.bankNo}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <button onClick={() => this.editHandle(index)}>Edit</button>
                                        </td>
                                        <td>
                                            <button onClick={() => this.deleteHandle(index)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.transaction.list
    }
}
/*
* for using bindActionsCreators need to added this lin
* import {bindActionCreators} from 'redux'
* */
// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({
//         deleteTransaction : action.remove,
//         updatedCurrentId: action.updateIndex
//     },dispatch)
// }
const mapDispatchToProps =( dispatch )=> ({
    deleteTransaction: (index) => dispatch(action.remove(index)),
    updatedCurrentId: (index) => dispatch(action.updateIndex(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);