import { ReactNode } from "react";

export {};

declare global {
    interface ChildrenContainer {
        children: ReactNode;
    }

    interface BitBayApiOrderbookResponseColumn {
        ra: string;
        ca: string;
        sa: string;
        pa: string;
        co: number;
    }


    interface BitBayOrderbookResponse {
        readonly status: "OK";
        readonly sell: Array<BitBayApiOrderbookResponseColumn>;
        readonly buy: Array<BitBayApiOrderbookResponseColumn>;
        readonly timestamp: string;
        readonly seqNo: string;
    }
}