
import React from 'react';


type PermalinkProps = {state: State};

export const Permalink = ({state}:PermalinkProps) => {
    const str = JSON.stringify(state);
    
    const updatePermalink = () => {
        window.location.hash = str;
    }
    return (
        <div className="permalink" onClick={updatePermalink}>
            update permalink
        </div>
    );
}