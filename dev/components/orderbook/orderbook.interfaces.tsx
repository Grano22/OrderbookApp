export interface OrderBookColumnProps {
    readonly accessor: {
        [key: string]: any;
    };
    readonly data: Array<BitBayApiOrderbookResponseColumn>;
    readonly previous: Array<BitBayApiOrderbookResponseColumn>;
    readonly limit: number;
    readonly from: number;
}