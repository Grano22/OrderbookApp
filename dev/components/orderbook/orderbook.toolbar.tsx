import React, { ChangeEvent, forwardRef, useImperativeHandle, useRef } from 'react';
import { Select } from '../select/select';

interface OrderbookToolbarProps {
    readonly accessor: {
        [key: string]: any;
    },
    readonly control: {
        [key: string]: (...args : any[])=>any;
    }
}

const OrderbookToolbar = forwardRef((props : OrderbookToolbarProps, rf) => {
    const handleMarketSelect = (evt: ChangeEvent)=>{
        const currSelect = evt.target as HTMLSelectElement;
        const currOption = currSelect.options[currSelect.selectedIndex].text;
        console.log('cr opt', currSelect, currOption);
        props.control.setMarket(currOption);
    };

    const spreadRef = useRef(null);

    useImperativeHandle(rf, ()=>({
        changeSpread(newSpread : string) {
            const spreadFld = spreadRef.current as HTMLSpanElement;
            spreadFld.textContent = newSpread;
        }
    }));

    return (
        <header className="toolbar level">
            <div className="lefty level-left">
                <Select onChange={(evt: ChangeEvent)=>handleMarketSelect(evt)}>
                    <option>BTC-PLN</option>
                    <option>BTC-USD</option>
                    <option>BTC-GBP</option>
                </Select>
            </div>
            <div className="center level-item">
                <strong>Spread:</strong>&nbsp;<span ref={spreadRef}>0</span>
            </div>
            <div className="righty level-right">
                <div>
                    <span className="line">24h max</span>
                    <span className="line">24h min</span>
                </div>
            </div>
        </header>
    )
});

export default OrderbookToolbar;