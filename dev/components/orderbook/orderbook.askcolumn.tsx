import React from 'react';
import { OrderBookColumnProps } from './orderbook.interfaces';
import OrderBookItem from './orderbook.item';
import OrderBookList from './orderbook.list';

const OrderBookAskColumn = ({ data, previous, from, limit, accessor } : OrderBookColumnProps) => {
    const prepareItems = () => {
        if(data===null) return [];
        const outp = [];
        let starts = from || 0, end = limit || 10;
        for(let st=starts;st<end;st++) {
            outp.push(<OrderBookItem accessor={{
                fromCurrency:accessor.fromCurrency,
                toCurrency:accessor.toCurrency
            }}  key={st+1} index={st+1} current={data[st]} previous={previous!==null ? previous[st] : null}/>);
        }
        return outp;
    }   

    return (
        <div className="column">
            <h3>Ask</h3>
            <OrderBookList>
                {/*data!==null && data.map(v=><OrderBookItem {...v}/>).splice(from || 0, limit || 10)*/}
                {prepareItems()}
            </OrderBookList>
        </div>
    );
}

export default OrderBookAskColumn;