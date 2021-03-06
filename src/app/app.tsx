import React, {useReducer} from 'react';
import { nDays } from './constants';
import {Percentage, DirectDay, DirectMonth} from "./widgets";
import {Report} from "./report";
import {reducer} from "./reducer";
import {getInitialState} from "./state";
import {Permalink} from "./permalink";

export const App = () => {

    const [state, dispatch] = useReducer(reducer, getInitialState());

    return (
        <div className="App">
        <header>
            David's child support calculator
        </header>
        <Permalink state={state} />
        <div className="inputs">
            <section> 
                <header>Parent's Schedule Split<br/><i>in percentages of Mother / Father</i></header>
                <Percentage id="shabbat" label="Shabbat" state={state} dispatch={dispatch} />
                <Percentage id="sunday" label="Sunday (non-work day)" state={state} dispatch={dispatch} />
                <Percentage id="regular" label="Regular work/school day" state={state} dispatch={dispatch} />
                <Percentage id="chagim" label="Chagim" state={state} dispatch={dispatch} />
                <Percentage id="schoolVacation" label="School Vacation" state={state} dispatch={dispatch} />
                <hr/>
                <header>Children's Expenses Per Day<br/><i>in shekels</i></header>
                <DirectDay id="shabbat" label="Shabbat" state={state} dispatch={dispatch} />
                <DirectDay id="school" label="Regular School Days" state={state} dispatch={dispatch} />
                <DirectDay id="chagim" label="Chagim" state={state} dispatch={dispatch} />
                <DirectDay id="schoolVacation" label="School Vacation" state={state} dispatch={dispatch} />
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
                    Each day should consider the necessary expenses specifically for that day (primarily food and travel).
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
                    <b>Chagim&nbsp;</b>
                    have a variety of overlap with shabbat and it changes based on both the parents schedule and holiday cycle of that year. 
                    Instead of analyzing a decade of exact projections, we make an approximation by removing 6 from the ~30 possible "holiday expense days" and then the rest "fall" on regular school days.
                    These 24 days are divided over 12 months yielding 2 holidays that replace regular school days each month
                    It is not perfect, but the difference is ultimately negligable.
                    <br/>
                </p>
                <p>
                    <b>School vacation&nbsp;</b>
                    is similar to chagim. However, chagim are also work holidays - and school vacation is not, hence it may be divided differently for schedule purposes.
                    We assume around 72 children's school vacation days that are not also work holidays (for example summer and the week leading up to pesach).
                    8 of these are definitely shabbat (e.g. the summer). Another 4 are removed due to falling on shabbat in the year. 
                    This leaves us with a final number of 60 vacation days to account for, divided over 12 months gives us 5 per month.
                    <br/>
                </p>
                <p>
                    <b>Final amount&nbsp;</b>
                    is the complete expenses for the children and should be considered an <i>upper bound</i>. For example it does not include government subsidies or tax returns which could be considered a reduction on top of this.
                    <br/>
                </p>
                <b>Exact breakdown&nbsp;</b>
                per month then becomes:
                <ul>
                    <li>{nDays.shabbat} shabbats</li>
                    <li>{nDays.sunday} sundays (non-work days)</li>
                    <li>{nDays.regular} regular schooldays</li>
                    <li>{nDays.chagim} chagim</li>
                    <li>{nDays.schoolVacation} school vacation</li>
                    <li>room is expense to both parents</li>
                    <li>clothing and medicine are only expense to mother (paid by father)</li>
                </ul>
                <br/>
            </section>
        </div>
        </div>
    );
}