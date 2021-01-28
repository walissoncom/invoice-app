import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faThumbsUp, faThumbsDown, faMoneyCheckAlt, faSearchDollar } from '@fortawesome/free-solid-svg-icons';

class App extends Component {

    state = {
        isLoading: false,
        invoices: []
    }

    remove(id) {

        console.log(id);

        // Filter invoices data
        let updatedInvoices = [...this.state.invoices].filter(i => i.Id !== id);

        // Set a new invoices data
        this.setState({ invoices: updatedInvoices });
    }

    async componentDidMount() {
        const response = await fetch('https://psoga3qkne.execute-api.ap-southeast-2.amazonaws.com/Dev');
        const body = await response.json();

        this.setState({ invoices: body, isLoading: false });
    }

    render() {

        const isLoading = this.state.isLoading;
        const allInvoices = this.state.invoices;

        if (isLoading)
            return (<div>Loading...</div>);

        let invoices = allInvoices.map(invoice =>
            <tr key={invoice.Id}>
                <td>{invoice.Vendor}</td>
                <td>{invoice.Amount}</td>
                <td>{invoice.Invoice}</td>
                <td>{invoice.Date}</td>
                <td>
                    <Button className="btn btn-lg btn-success" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faThumbsUp} /> OK
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-lg btn-danger" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faThumbsDown} /> NOK
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-lg btn-warning" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faSearchDollar} /> ??
                    </Button>
                </td>
                <td>
                    <Button className="btn btn-lg btn-info" onClick={() => this.remove(invoice.Id)}>
                        <FontAwesomeIcon icon={faImage} /> Image
                    </Button>
                </td>
            </tr>
        )

        return (
            <div className="container border border-secondary rouded center">

                <div className="row">
                    <div className="col-12">
                        <h4>Pending Invoices - The Dev Company</h4>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xs-12 center text-center">
                        <Table dark responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Vendor</th>
                                    <th>Amount</th>
                                    <th>Invoice #</th>
                                    <th>Date</th>
                                    <th colSpan="4">Actions</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.invoices.length === 0 ? <tr><td colSpan="9">All caught up!</td></tr> : invoices}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;