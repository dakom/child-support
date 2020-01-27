import * as L from "partial.lenses";
import React, { Dispatch } from 'react';


interface PercentageProps {
    id: string;
    label: string;
    state: State;
    dispatch: Dispatch<DISPATCHER_ACTION_PERC>;
}

export const Percentage = ({id, label, state, dispatch}:PercentageProps) => {
    
    const PercentageLine = (side:"left" | "right") => {
        const index = side === "left" ? 0 : 1;
        const value = L.get([id, index]) (state.percentages);


        const handleChange = (value:string) => {
            const n = Number(value);
            if(!isNaN(n)) {
                dispatch({type: side === "left" ? "perc-left" : "perc-right", id, value: n});
            }
        }
        return <input 
            type="text" 
            value={value}
            onChange={evt => handleChange(evt.target.value)}
        />
    }

    return (
        <div className="percentage">
            <div className="label">{label}</div>
            {PercentageLine("left")}
            {PercentageLine("right")}
        </div>
    );
}

interface DirectProps {
    id: string;
    label: string;
    state: State;
    dispatch: Dispatch<DISPATCHER_ACTION_DIRECT>;
}
export const DirectDay = (props:DirectProps) => direct("expensesPerDay") (props);
export const DirectMonth = (props:DirectProps) => direct("expensesPerMonth") (props);

const direct = (category:"expensesPerDay" | "expensesPerMonth") => ({id, label, state, dispatch}:DirectProps) => {
    const value = L.get([category, id]) (state);

    const handleChange = (value:string) => {
        const n = Number(value);
        if(!isNaN(n)) {
            dispatch({type: category, id, value: n});
        }
    }
    return (
        <div className="direct">
            <div className="label">{label}</div>
            <input 
                type="text" 
                value={value}
                onChange={evt => handleChange(evt.target.value)}
            />
        </div>
    );
}