import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown, faSearchDollar } from '@fortawesome/free-solid-svg-icons';

import './App.css';

class App extends Component {

    // State
    state = {
        isLoading: true,
        invoices: []
    }

    // Remove method
    // Removes item from the current table (invoices state), when page is reloaded, items are back
    remove(id) {

        // Filter invoices data
        let updatedInvoices = [...this.state.invoices].filter(i => i.Id !== id);

        // Set a new invoices data
        this.setState({ invoices: updatedInvoices });
    }

    async componentDidMount() {

        // Retrieve data from AWS API
        const response = await fetch('https://psoga3qkne.execute-api.ap-southeast-2.amazonaws.com/Dev');
        const body = await response.json();

        // Set the state with the data retrieved
        this.setState({ invoices: body, isLoading: false });
    }

    render() {

        const isLoading = this.state.isLoading;
        const allInvoices = this.state.invoices;

        // Check if data is still being loaded and display info to user
        if (isLoading)
            return (<div>Loading...</div>);

        // Build invoices table rows with the data retireved from API
        let invoices = allInvoices.map(invoice =>
            <tr key={invoice.Id}>
                <td>{invoice.Invoice}</td>
                <td>{invoice.Vendor}</td>
                <td>{invoice.Amount}</td>
                <td>{invoice.Date}</td>
                <td>
                    <Button className="btn btn-lg btn-success" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faThumbsUp} />
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-lg btn-danger" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faSearchDollar} />
                    </Button>
                </td>
            </tr>
        )

        return (
            <div className="container-xl center">

                <div className="row">
                    <div className="col-md-12 col-lg-3 company">
                        <h1>The Dev Company</h1>
                    </div>
                    <div className="col-md-12 col-lg-9 text-center invoices">
                        <div className="pending-title text-right">
                            <h3>Pending Invoices.</h3>
                        </div>
                        <div className="center text-center">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Invoice #</th>
                                        <th>Vendor</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th colSpan="3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.invoices.length === 0 ? <tr><td colSpan="7">All caught up!</td></tr> : invoices}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;