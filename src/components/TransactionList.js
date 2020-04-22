import React, {Component} from 'react';
import TransactionForm from "./TransactionForm";

class TransactionList extends Component {

    TRANSACTION = "transaction"

    state = {
        currentId: -1,
        list: this.returnList()
    }

    returnList() {
        if (localStorage.getItem(this.TRANSACTION) == null) {
            localStorage.setItem(this.TRANSACTION, JSON.stringify([]))
        }
        return JSON.parse(localStorage.getItem(this.TRANSACTION))
    }

    saveOrUpdateData = (data) => {
        let list = this.returnList()
        console.log(list)
        if (this.state.currentId === -1) {
            list.push(data)
        } else {
            list[this.state.currentId] = data
        }
        localStorage.setItem(this.TRANSACTION, JSON.stringify(list))
        this.setState({list: list, currentId: -1})
    }

    editFrom = (index) => {
        console.log(index)
        this.setState({
            currentId: index
        })
    }

    deleteHandle = (index) => {
        let list = this.returnList()
        list.splice(index, 1)
        localStorage.setItem(this.TRANSACTION, JSON.stringify(list))
        this.setState({list: list, currentId: -1})
    }

    render() {
        return (
            <div>
                <TransactionForm
                    saveOrUpdateData={this.saveOrUpdateData}
                    currentId={this.state.currentId}
                    list={this.state.list}
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
                        this.state.list.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.accountName}</td>
                                        <td>{item.bankNo}</td>
                                        <td>{item.amount}</td>
                                        <td>
                                            <button onClick={() => this.editFrom(index)}>Edit</button>
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

export default TransactionList;