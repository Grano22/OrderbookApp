import React from 'react';

export const SectionLayout = (props) => {
    return (
        <section className="section">
            <div className="in">
                {props.children}
            </div>
        </section>
    )
}