import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { appconfig } from '../config';
import uuid from 'uuid';
import Header from './Header';
import Menu from './Menu';
import Orders from './Orders';
import TicketTotal from './TicketTotal';
import TicketTags from './TicketTags';
import Commands from './Commands';
import MyTickets from './MyTickets';
import Signalr from '../signalr';
import Snackbar from 'material-ui/Snackbar';
import * as Queries from '../queries';
import * as Actions from '../actions';

class App extends Component {

    componentDidMount() {
        if (localStorage['terminalId']) {
            var terminalId = localStorage['terminalId'];
            Queries.getTerminalExists(terminalId, (result) => {
                if (result) {
                    Queries.getTerminalTicket(terminalId, (ticket) => {
                        this.props.changeTerminalId(terminalId);
                        this.props.setTicket(ticket);
                    })
                } else Queries.registerTerminal((terminalId) => this.updateTerminalId(terminalId));
            });
        }
        else {
            Queries.registerTerminal((terminalId) => this.updateTerminalId(terminalId));
        }

        if (this.props.terminalId) return;

        Signalr.connect((message) => {
            if (message.indexOf('TICKET_REFRESH') > -1) {
                console.log('Ticket refreshed');
                this.props.ticketsNeedsRefresh();
            }
        });
    }

    updateTerminalId(terminalId) {
        localStorage['terminalId'] = terminalId;
        this.props.changeTerminalId(terminalId);
    }

    getHeader(ticket = { entities: [] }) {
        var title = ticket.id === undefined ? 'PM-POS' :
            ticket.id > 0 ? 'Ticket' : 'New Ticket';
        var entityList = ticket != null && ticket.entities.length > 0 ? ticket.entities.map(x => x.name).join() : undefined;
        return title + (entityList ? ` (${entityList})` : '');
    }

    render() {
        const {menu, menuItems, ticket} = this.props;
        return (
            <div className="mainDiv">
                <Header header={this.getHeader(ticket)} />
                <div className="mainBody">
                    <Menu onMenuItemClick={this.onMenuItemClick} />
                    <Orders ticket={ticket}
                        onChangePortion={this.changePortion}
                        getOrderTags={this.getOrderTags}
                        onCancelOrder={this.cancelOrder}
                        onOrderTagSelected={this.onOrderTagSelected} />
                    <MyTickets ticket={ticket} onClick={this.onTicketClick} />
                </div>
                <TicketTags ticket={ticket} />
                <Commands commands={[
                    { command: this.cleanTicket, caption: 'Clear Orders', color: 'White' },
                    { command: this.selectTable, caption: 'Tables', color: 'White' },
                    { command: this.closeTicket, caption: 'Close', color: 'Red', foreground: 'White' }
                ]} />
                <TicketTotal />
                <Snackbar
                    open={this.props.isMessageOpen}
                    message={this.props.message}
                    autoHideDuration={4000}
                    onRequestClose={this.closeMessage} />
            </div>
        );
    }

    onTicketClick = (ticketId) => {
        console.log('Ticket Open', ticketId);
        Queries.loadTerminalTicket(this.props.terminalId, ticketId, (ticket) => {
            this.props.setTicket(ticket);
        });
    }

    getOrderTags = (orderUid, callback) => {
        Queries.getOrderTagsForTerminal(this.props.terminalId, orderUid, (orderTags) => {
            callback(orderTags);
        })
    }

    onOrderTagSelected = (orderUid, name, tag, callback) => {
        Queries.updateOrderTagOfTerminalTicket(this.props.terminalId, orderUid, name, tag, (ticket) => {
            this.props.setTicket(ticket);
            callback(ticket);
        });
    }

    onMenuItemClick = (productId, orderTags = '') => {
        if (!this.props.ticket) {
            Queries.createTerminalTicket(this.props.terminalId, (ticket) => {
                this.props.setTicket(ticket);
                this.onMenuItemClick(productId, orderTags);
            });
            return;
        }
        Queries.addOrderToTerminalTicket(this.props.terminalId, productId, 1, orderTags, (ticket) => {
            this.props.setTicket(ticket);
            this.closeMessage();
        });
    }

    cleanTicket = () => {
        Queries.clearTerminalTicketOrders(this.props.terminalId, (ticket) => {
            this.props.setTicket(ticket);
        });
    }

    selectTable = () => {
        if (!this.props.ticket) {
            this.props.updateMessage('Select a ticket');
            return;
        }
        this.context.router.push({
            pathname: '/entities',
            query: {
                terminalId: this.props.terminalId,
                screenName: appconfig().entityScreenName
            }
        });
    }

    closeTicket = () => {
        if (this.props.ticket.orders.length == 0) {
            this.props.updateMessage('Add orders to create a ticket.');
            return;
        }
        Queries.closeTerminalTicket(this.props.terminalId, (errorMessage) => {
            Queries.postRefresh();

            // notify other Clients that a Food Order Task has been Printed (for GQL Kitchen Display)
            Queries.broadcastMessage('{"eventName":"TASK_PRINTED","terminal":"Server","userName":"Administrator","productType":"Food"}');

            this.setState({ errorMessage: errorMessage });
            if (this.props.ticket.id == 0)
                this.props.updateMessage('Ticket sucsessfully submitted!');
            this.props.setTicket(undefined);
        });
    }

    changePortion = (orderUid, portion, callback) => {
        Queries.updateOrderPortionOfTerminalTicket(this.props.terminalId, orderUid, portion, (ticket) => {
            this.props.setTicket(ticket);
            if (callback) callback();
        });
    }

    cancelOrder = (orderUid) => {
        Queries.cancelOrderOnTerminalTicket(this.props.terminalId, orderUid, (ticket) => {
            this.props.setTicket(ticket);
        });
    }

    closeMessage = () => {
        if (this.props.isMessageOpen)
            this.props.closeMessage();
    };
}

App.contextTypes = {
    router: React.PropTypes.object
}

App.defaultProps = {
    message: '',
    isMessageOpen: false,
    menu: { categories: [] },
    menuItems: []
}

App.PropTypes = {
    terminalId: PropTypes.number,
    message: PropTypes.object,
    isMessageOpen: PropTypes.boolean,
    ticket: PropTypes.object
}

const mapStateToProps = state => ({
    terminalId: state.app.get('terminalId'),
    message: state.app.getIn(['message', 'text']),
    isMessageOpen: state.app.getIn(['message', 'isOpen']),
    ticket: state.app.get('ticket')
})

const mapDispatchToProps = ({
    changeTerminalId: Actions.chageTerminalId,
    updateMessage: Actions.updateMessage,
    closeMessage: Actions.closeMessage,
    setTicket: Actions.setTicket,
    ticketsNeedsRefresh: Actions.ticketsNeedsRefresh
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)