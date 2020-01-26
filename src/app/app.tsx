import React, {useReducer} from 'react';
import { nDays } from './constants';
import {Percentage, DirectDay, DirectMonth} from "./widgets";
import {Report} from "./report";
import {reducer} from "./reducer";
import {initialState} from "./state";

export const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState);


    return (
        <div className="App">
        <header>
            David's child support calculator
        </header>
        <div className="inputs">
            <section> 
                <header>Parent's Schedule Split<br/><i>in percentages of Mother / Father</i></header>
                <Percentage id="shabbat" label="Shabbat" state={state} dispatch={dispatch} />
                <Percentage id="sunday" label="Sunday (non-work day)" state={state} dispatch={dispatch} />
                <Percentage id="regular" label="Regular work/school day" state={state} dispatch={dispatch} />
                <Percentage id="chagim" label="Chagim" state={state} dispatch={dispatch} />
                <hr/>
                <header>Children's Expenses Per Day<br/><i>in shekels</i></header>
                <DirectDay id="shabbat" label="Shabbat" state={state} dispatch={dispatch} />
                <DirectDay id="school" label="Regular School Days" state={state} dispatch={dispatch} />
                <DirectDay id="chagim" label="Chagim" state={state} dispatch={dispatch} />
                <hr/>
                <header>Children's Expenses Per Month<br/><i>in shekels</i></header>
                <DirectMonth id="room" label="House Rental (additional room)" state={state} dispatch={dispatch} />
                <DirectMonth id="clothing" label="Clothing" state={state} dispatch={dispatch} />
                <DirectMonth id="medicine" label="Medicine" state={state} dispatch={dispatch} />
            </section>
            <section>
                <header>Live Calculated Amounts<br/><i>in shekels</i></header>
                <hr/>
                <Report state={state} />
            </section>
            <section>
                <header>Explanation</header>
                <p>
                    <b>How to use:&nbsp;</b>
                    Adjust the amounts on the far-left, according to the notes below. The results will be updated immediately.
                    <br/>
                </p>
                <p>
                    <b>All expenses&nbsp;</b>
                    are in terms of <i>necessities</i>. While the parents may agree on "extras" beyond the scope of this calculator, they are not obligatory.
                    <br/>
                </p>
                <p>
                    <b>Rental&nbsp;</b>
                    is the same cost per-parent because it's the cost of an additional bedroom and perhaps a slightly larger dining room for the children.
                    Utilities should be considered as the per-day expenses.
                    <br/>
                </p>
                <p>
                    <b>Clothing and Medicine&nbsp;</b>
                    are a single cost (to the father).
                    <br/>
                </p>
                <p>
                    <b>Holidays&nbsp;</b>
                    have a variety of overlap with shabbat and it changes based on both the parents schedule and holiday cycle of that year. 
                    Instead of analyzing a decade of exact projections, we make an approximation by removing 6 from the ~30 possible "holiday expense days" and then the rest "fall" on regular school days.
                    We also average the months to be 30 instead of 29.5 days - so there is a bit of extra holiday expense each month.
                    It is not perfect, but the difference is ultimately negligable.
                    <br/>
                </p>
                <p>
                    <b>Exact breakdown&nbsp;</b>
                    per month then becomes:
                    <ul>
                        <li>{nDays.shabbat} shabbats</li>
                        <li>{nDays.sunday} sundays (non-work days)</li>
                        <li>{nDays.regular} regular schooldays</li>
                        <li>{nDays.chagim} chagim</li>
                        <li>room is expense to both parents</li>
                        <li>clothing and medicine are only expense to mother (paid by father)</li>
                    </ul>
                    <br/>
                </p>
            </section>
        </div>
        </div>
    );
}