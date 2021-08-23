import React, { useCallback, useEffect, useRef, useState } from 'react';
import OrderbookResult from './orderbook.result';

import OrderbookToolbar from './orderbook.toolbar';

const OrderBookContainer = ()=>{
    const [ currMarket, setMarket ] = useState("BTC-PLN");
    const toolbarRef = useRef(null);

    const fromCurrency = currMarket.split("-")[0], toCurrency = currMarket.split("-")[1];

    const changeSpread = useCallback((newSpread: string)=>{
        toolbarRef.current.changeSpread(newSpread);
    }, [toolbarRef]);

    return (
        <div id="orderBookContainer">
            <OrderbookToolbar
                ref={toolbarRef}
                accessor={{
                    currMarket
                }}
                control={{
                    setMarket
                }}
            />
            <OrderbookResult
                control={{
                    changeSpread
                }}
                accessor={{
                    fromCurrency,
                    toCurrency
                }}
            />
        </div>
    )
}

export default OrderBookContainer;