import React from 'react';

interface OrderBookItemProps {
    current: BitBayApiOrderbookResponseColumn,
    previous: BitBayApiOrderbookResponseColumn,
    readonly className?: string;
    readonly index: number;
    readonly accessor:{
        [key: string]: any;
    };
}

const OrderBookItem = ({ previous, current, index, accessor } : OrderBookItemProps) => {
    const classOfAssert = (prev, curr) : string => {
        curr = parseFloat(curr); prev = parseFloat(prev) || curr; 
        if(curr===prev) return "";
        else if(curr>prev) return "has-text-success";
        else return "has-text-danger";
    }

    const prevPln = previous!==null ? (parseFloat(previous.sa) * parseFloat(previous.ra)) : 0, plnVal = parseFloat(current.sa) * parseFloat(current.ra);

    return (
        <li className="orderbookItem">
            <strong>Lp:</strong>&nbsp;&nbsp;<span>{index}</span><br/>
            <strong>Kurs:</strong>&nbsp;&nbsp;<span className={classOfAssert(previous?.ra, current?.ra)}>{current.ra}</span><br/>
            <strong>Ilość {accessor.fromCurrency}:</strong>&nbsp;&nbsp;<span className={classOfAssert(previous?.ca, current?.ca)}>{current.ca}</span><br/>
            <strong>Wartość {accessor.toCurrency}:</strong>&nbsp;&nbsp;<span className={classOfAssert(prevPln, plnVal)}>{plnVal}</span><br/>
            <strong>Liczba ofert:</strong>&nbsp;&nbsp;<span className={classOfAssert(previous?.co, current?.co)}>{current.co}</span>
        </li>
    );
}

export default OrderBookItem;