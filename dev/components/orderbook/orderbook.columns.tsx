import React from 'react';
import OrderBookAskColumn from './orderbook.askcolumn';
import OrderBookBidColumn from './orderbook.bidcolumn';

interface OrderBookColumnsProps {
    readonly accessor:{
        [key: string]: any;
    },
    current:{
        sell: Array<BitBayApiOrderbookResponseColumn>;
        buy: Array<BitBayApiOrderbookResponseColumn>;
    },
    previous:{
        sell: Array<BitBayApiOrderbookResponseColumn>;
        buy: Array<BitBayApiOrderbookResponseColumn>;
    },
    readonly limit : number,
    readonly from : number;
}

const OrderBookColumns = ({ current, previous, limit, from, accessor } : OrderBookColumnsProps) => {
    return (
        <div className="columns is-relative">
            <OrderBookBidColumn accessor={{
                fromCurrency:accessor.fromCurrency,
                toCurrency:accessor.toCurrency
            }} from={from} limit={limit} previous={previous.sell} data={current.sell}/>
            <div className="vl"></div>
            <OrderBookAskColumn accessor={{
                fromCurrency:accessor.fromCurrency,
                toCurrency:accessor.toCurrency
            }} from={from} limit={limit} previous={previous.buy} data={current.buy}/>
        </div>
    );
}

export default OrderBookColumns;