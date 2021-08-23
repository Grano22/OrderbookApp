import { Observable, Subject } from "rxjs";

export default class BitBayAPIService {
    public static watchOrderBook(market="BTC-PLN") : Observable<BitBayOrderbookResponse> {
        const sub = new Subject<BitBayOrderbookResponse>(); let tm = -1;
        (function wrapper() {
            BitBayAPIService.fetchOrderBook()
            .then(res=>{
                sub.next(res);
                if(tm>=0) clearTimeout(tm);
                setTimeout(wrapper, 200);
            })
            .catch(err=>console.error(err));
        })();
        return sub;
    }

    public static fetchOrderBook(market="BTC-PLN") : Promise<BitBayOrderbookResponse> {
        return fetch(`https://api.bitbay.net/rest/trading/orderbook/${market}`, {
            method: "GET"
        })
        .then(res=>res.json());
    }
}