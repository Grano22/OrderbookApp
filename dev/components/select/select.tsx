import React, { ReactNode } from 'react';

interface SelectProps {
    children: ReactNode;
}

export const Select = (props) => {
    return (
        <div className="select" {...props}>
            <select>
                {props.children}
            </select>
        </div>
    )
}
