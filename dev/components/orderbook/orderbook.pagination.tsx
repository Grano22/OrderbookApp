import React, { ReactNode, useState } from 'react';

interface OrderbookPaginationProps {
    readonly starting? : number;
    readonly max : number;
    readonly template : (page: number)=>ReactNode;
}

const OrderbookPagination = ({ starting, max, template } : OrderbookPaginationProps) => {
    const [ current, setPage ] = useState(starting || 1);

    const previous = current - 1>0 ? current - 1 : 0;
    const next = current + 1<=max ? current + 1 : 0;
    
    return (
        <div className="pagination_container">
            <nav className="pagination" role="navigation" aria-label="pagination">
                <a className="pagination-previous" onClick={ev=>{ if(current>0) setPage(p=>{ return p - 1; }); }}>&lt;</a>
                <a className="pagination-next" onClick={ev=>{ if(current<max) setPage(p=>{ return p + 1; }); }}>&gt;</a>     
                <ul className="pagination-list">
                    <li>
                        <a className="pagination-link" aria-label="Goto page 1" onClick={ev=>setPage(1)}>1</a>
                    </li>
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    {previous>0 && <li>
                        <a className="pagination-link" aria-label={"Goto page "+previous} onClick={ev=>setPage(p=>previous)}>{previous}</a>
                    </li>}
                    <li>
                        <a className="pagination-link is-current" aria-label={"Page "+current} aria-current="page">{current}</a>
                    </li>
                    {next>0 && <li>
                        <a className="pagination-link" aria-label={"Goto page "+next} onClick={ev=>setPage(p=>next)}>{next}</a>
                    </li>}
                    <li>
                        <span className="pagination-ellipsis">&hellip;</span>
                    </li>
                    <li>
                        <a className="pagination-link" aria-label={"Goto page "+max} onClick={ev=>setPage(max)}>{max}</a>
                    </li>
                </ul>
            </nav>
            <div className="pagination_content">
                {template(current)}
            </div>
        </div>
    );
}

export default OrderbookPagination;