import React, {Component} from 'react';
import TransactionForm from "./TransactionForm";
import {connect} from 'react-redux'
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
            <div className="uk-container uk-container-center ">
                <h3>Account Transaction List</h3>
                <div className="uk-child-width-1-2@m uk-grid-match uk-grid" data-uk-grid>
                    <div className="uk-panel">
                        <TransactionForm/>
                    </div>
                    <div className="uk-panel">
                        <table className="uk-table uk-table-middle uk-table-divider">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Account ID</th>
                                <th>Amount</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.list.length <= 0 ? "No Account is Inserted" :
                                    this.props.list.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.accountName}</td>
                                                    <td>{item.bankNo}</td>
                                                    <td>{item.amount}</td>
                                                    <td>
                                                        <div className="uk-button-group">
                                                            <button
                                                                onClick={() => this.editHandle(index)}
                                                                className="uk-button uk-button-primary uk-button-small">Edit
                                                            </button>
                                                            <button
                                                                onClick={() => this.deleteHandle(index)}
                                                                className="uk-button uk-button-danger uk-button-small">Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
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
const mapDispatchToProps = (dispatch) => ({
    deleteTransaction: (index) => dispatch(action.remove(index)),
    updatedCurrentId: (index) => dispatch(action.updateIndex(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);