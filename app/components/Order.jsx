import React from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Portions from './Portions';
import OrderTags from './OrderTags';
import SelectedOrderTags from './SelectedOrderTags';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {getProductPortions, getOrderTagsForTerminal} from '../queries';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

const customContentStyle = {
    'width': '95%'
};

export default class Order extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            quantity: 1,
            isDetailsOpen: false,
            selectedPortion: '',
            portions: [{ name: 'loading...' }],
            orderTags: [{ name: 'loading...', price: 1 }]
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    onQuantityDecrease = () => {
        this.setState({
        quantity: this.state.quantity - 1
        });
        () => {
            this.onQuantityDecreaseSubmit()
        };
    };

    onQuantityIncrease = () => {
        this.setState({
            quantity: this.state.quantity + 1
        });
        () => {
            this.onQuantityIncreaseSubmit()
        };
    };


    render() {


        const {id, name, quantity, price, priceTag, portion, productId, orderUid, orderTags, orderTagColors, onClick = () => { }, onCancelOrder = () => { } } = this.props;

        const detailActions = [
            <FlatButton
                label="Remove Order"
                primary={true}
                onClick={this.onOrderCancelled}/>,
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleDetailsClose}/>
        ];

        var orderName = portion != 'Normal' ? name + '.' + portion : name;

        const orderLine =
            <div>
                <div className="order">
                    <span className="orderQuantity"> {quantity}</span>
                    <span className="orderName">{orderName}</span>
                    <span className="orderPrice">
                        <span className="orderPriceTag">{priceTag}</span>
                        <span >{price}</span>
                    </span>
                </div>
                <SelectedOrderTags orderTags={orderTags}
                    orderTagColors={orderTagColors}/>
            </div>;

        const orderLine2 =
            <div>
                <div className="order">
                    <span className="orderQuantity2"><Remove onTouchTap={this.onQuantityDecrease} style={{width: '15',height: '15'}}/> {this.state.quantity} <Add onTouchTap={this.onQuantityIncrease} style={{width: '15',height: '15'}}/></span>
                    <span className="orderName">{orderName}</span>
                    <span className="orderPrice">
                        <span className="orderPriceTag">{priceTag}</span>
                        <span >{price}</span>
                    </span>
                </div>
                <SelectedOrderTags orderTags={orderTags}
                    orderTagColors={orderTagColors}/>
            </div>;

        return (
            <div key={id}>
                <ListItem  className="order" onClick={this.handleDetailsOpen.bind(null, productId, portion) }>
                    {orderLine}
                </ListItem>
                <Dialog
                    title={orderLine2}
                    actions={detailActions}
                    modal={true}
                    contentStyle={customContentStyle}
                    autoScrollBodyContent={true}
                    open={this.state.isDetailsOpen}>
                    <div className='dialogContent'>
                        <Portions portions={this.state.portions}
                            selectedPortion={this.state.selectedPortion}
                            onClick={this.onPortionSelected}/>
                        <OrderTags orderTags={this.state.orderTags}
                            onClick={this.onOrderTagSelected}/>
                    </div>
                </Dialog>
            </div>
        );
    }

    onQuantityIncreaseSubmit = (quantity) => {
        this.props.onQuantityChanged(this.props.orderUid, this.state.quantity,
            () => {
                this.setState({quantity: quantity + 1});
                });
        }

    onQuantityDecreaseSubmit = (quantity) => {
        this.props.onQuantityChanged(this.props.orderUid, this.state.quantity,
            () => {
                this.setState({quantity: quantity - 1});
                });
        }      
    

    onPortionSelected = (name) => {
        this.props.onChangePortion(this.props.orderUid, name,
            () => {
                if (this.state.orderTags && this.state.orderTags.length > 0) {
                    this.props.getOrderTags(this.props.orderUid, (orderTags) => {
                        this.setState({ orderTags: orderTags, selectedPortion: name });
                    });
                }
                else
                    this.handleDetailsClose();
            });
    }

    onOrderTagSelected = (name, tag) => {
        this.props.onOrderTagSelected(this.props.orderUid, name, tag, (ticket) => {
            this.props.getOrderTags(this.props.orderUid, (orderTags) => {
                this.setState({ orderTags: orderTags, isDetailsOpen: true });
            });
        });
    }

    onOrderCancelled = () => {
        this.props.onCancelOrder(this.props.orderUid);
        this.handleDetailsClose();
    }

    handleDetailsOpen = (productId, portion) => {
        getProductPortions(productId, (portions) => {
            this.setState({ isDetailsOpen: true, portions: portions, selectedPortion: portion });
        });
        this.props.getOrderTags(this.props.orderUid, (orderTags) => {
            this.setState({ orderTags: orderTags });
        });
    };

    handleDetailsClose = () => {
        this.setState({ isDetailsOpen: false });
    };
}