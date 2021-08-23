import React, { useEffect, useReducer, useState } from 'react';
import { useStateMachine } from '../../hooks/useFiniteState';
import useStateStack from '../../hooks/useStateStack';
import BitBayAPIService from '../../services/BitBayAPI';
import OrderBookColumns from './orderbook.columns';
import OrderbookPagination from './orderbook.pagination';

interface OrderbookResultProps {
    readonly accessor:{
        [key: string]: any;
    },
    readonly control:{
        [key: string]: (...args : any[])=>any;
    }
}

const OrderbookResult = (props : OrderbookResultProps)=>{
    const dataIsReady = ({ sell, buy })=>{
        return Array.isArray(sell) && Array.isArray(buy); 
    }

    const statuses = {
        LOADING:"loading",
        LOAD:"loaded",
        FAILFETCH:"failfetch",
        ERROR:"error"
    };

    const transitions = {
        [statuses.LOADING]:{
            "load":statuses.LOAD,
            "error":statuses.ERROR
        },
        [statuses.LOAD]:{
            "failfetch":statuses.FAILFETCH,
            "error":statuses.ERROR
        },
        [statuses.FAILFETCH]:{
            "load":statuses.LOAD,
        }
    }

    const [ currStatus, setStatus ] = useStateMachine(statuses, transitions, statuses.LOADING);
    const [ currOrders, setOrders, ordersRange ] = useStateStack<BitBayOrderbookResponse>(null, 3);

    useEffect(()=>{
        const watcher = BitBayAPIService.watchOrderBook(props.accessor.fromCurrency+"-"+props.accessor.toCurrency);
        watcher.subscribe(d=>{
            if(dataIsReady(d)) {
                setOrders(d);
                if(currStatus!=="loaded") setStatus("load");
            } else {
                setStatus("error");
            }
        }, err=>{
            console.error(err);
            setStatus("failfetch");
        });
    }, []);

    let currView = <></>, spread = 0;

    switch(currStatus) {
        case "failfetch":
            currView = (<div className="notification is-warning">
                Chwilowy błąd z połączeniem
            </div>);
        break;
        case "loaded":
            const rd = ordersRange(-1, -2) as BitBayOrderbookResponse[];
            const current = rd.length>0 ? { sell:rd[rd.length - 1]?.sell || null, buy:rd[rd.length - 1]?.buy || null } : { sell:null, buy:null };
            const previous = rd.length>1 ? { sell:rd[rd.length - 2]?.sell || null, buy:rd[rd.length - 2]?.buy || null } : { sell:null, buy:null };
            const maxLen = Math.max(current.sell.length, current.buy.length);
            const max = Math.round(maxLen/10);
            const limit = 10;
            if(current.sell!==null && current.buy!==null) {
                let sellSpr = 0, buySpr = 0;
                for(let i = 0;i<maxLen;i++) {
                    if(typeof current.sell[i]==="object") sellSpr += parseFloat(current.sell[i].ra);
                    if(typeof current.buy[i]==="object") buySpr += parseFloat(current.buy[i].ra);
                }
                const newSpread = Math.abs( sellSpr - buySpr ).toFixed(2);
                props.control.changeSpread(newSpread);
            }
            currView = (
                <OrderbookPagination
                    max={max}
                    template={page=><OrderBookColumns accessor={{ fromCurrency:props.accessor.fromCurrency, toCurrency:props.accessor.toCurrency }} from={(page - 1) * limit} limit={page*limit} previous={previous} current={current}/>}
                />
            );                    
        break;
        case "loading":
        default:
            currView = <div>
                Loading...
            </div>;
    }
    return currView;
}

export default OrderbookResult;