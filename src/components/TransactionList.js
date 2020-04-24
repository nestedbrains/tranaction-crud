import React, {Component} from 'react';
import TransactionForm from "./TransactionForm";
import {connect} from 'react-redux'
import * as action from '../redux/actions/transaction/tranasctionActions'
import * as appConstants from "../constantsAndUtils/AppConstants";

class TransactionList extends Component {

    deleteHandle = (index) => {
        this.props.deleteTransaction(index)
    }

    searchAccount (event) {
        debugger;
        const searchKey = event.target.value
        const erer ={aa:JSON.parse(localStorage.getItem(appConstants.TRANSACTION))}
        const result = erer.aa.filter((account) => {
            console.log(account.accountName)
            account.accountName.includes(searchKey)
        })
        console.log("asdasd" ,result)
       this.props.updatedList(result)
    }

    editHandle = (index) => {
        this.props.updatedCurrentId(index)
    }

    render() {
        return (
            <div className="uk-container uk-container-center ">
                <h3>Account Transaction List</h3>
                <hr className="uk-divider-icon"/>
                <div className="uk-child-width-1-2@m uk-grid-match uk-grid" data-uk-grid>
                    <div className="uk-panel">
                        <TransactionForm/>
                    </div>
                    <div className="uk-panel">
                        <form className="uk-search uk-search-default">
                            <a href="" data-uk-search-icon></a>
                            <input className="uk-search-input" type="search" onChange={this.searchAccount}
                                   placeholder="Search..."/>
                        </form>
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
                        {
                            this.props.list.length >= 5 ?
                                <ul className="uk-pagination uk-flex-center" data-uk-margin>
                                    <li><a href="#"><span data-uk-pagination-previous></span></a></li>
                                    <li><a href="#">1</a></li>
                                    <li className="uk-disabled"><span>...</span></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">6</a></li>
                                    <li className="uk-active"><span>7</span></li>
                                    <li><a href="#">8</a></li>
                                    <li><a href="#"><span data-uk-pagination-next></span></a></li>
                                </ul> : ""
                        }
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
    updatedCurrentId: (index) => dispatch(action.updateIndex(index)),
    updatedList: (list) => dispatch(action.updateIndex(list))
})

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);