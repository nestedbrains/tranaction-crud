import React, {Component} from 'react';
import TransactionForm from "./TransactionForm";
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as action from '../redux/actions/transaction/tranasctionActions'

class TransactionList extends Component {

    deleteHandle = (index) => {
        this.props.deleteTransaction(index)
    }

    editHandle = (index) => {
        this.props.updatedCurrentId(index)
    }

    render() {
        return (
            <div>
                <TransactionForm
                />
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
// const mapDispatchToProps = dispatch => {
//     return bindActionCreators({
//         deleteTransaction : action.remove,
//         updatedCurrentId: action.updateIndex
//     },dispatch)
// }
    const mapDispatchToProps = dispatch =>( {
        deleteTransaction: () => dispatch(action.remove()),
        updatedCurrentId : () => dispatch(action.updateIndex())
    })
export default connect(mapStateToProps,mapDispatchToProps)(TransactionList);