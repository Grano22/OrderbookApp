import React from 'react';
import OrderBookContainer from './orderbook/orderbook.container';
import { SectionLayout } from './sectionLayout';

export const Dashboard = () => {
    return (
        <div id="container is-widescreen">
            <div>
                <SectionLayout>
                    <OrderBookContainer/>
                </SectionLayout>
            </div>
        </div>
    )
}
