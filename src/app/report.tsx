import React, { Dispatch } from 'react';
import { directive } from "@babel/types";


interface ReportProps {
    state: State;
}

export const Report = ({state}:ReportProps) => {

    const getCommonExpenses = (index:0 | 1):number => { 
        const getDayExpense = (percLabel: keyof State["percentages"], expensesLabel:keyof State["expensesPerDay"]) => {
            const perc = state.percentages[percLabel][index];
            const expense = state.expensesPerDay[expensesLabel];

            return expense * (perc/100);
        }

        //4 shabbats in a month
        const shabbat = 4 * getDayExpense("shabbat", "shabbat");
        //4 sundays in a month
        const sunday = 4 * getDayExpense("sunday", "school");
        //16 regular non-work schooldays in a month
        const school = 20 * getDayExpense("regular", "school");
        //2 chagim in a month
        const chagim = 2 * getDayExpense("chagim", "chagim");

        //room is identical for both parents
        const room = state.expensesPerMonth.room;

        return shabbat + sunday + school + chagim + room;
    }

    const getAdditionalMotherExpenses = ():number => {
        return state.expensesPerMonth.clothing + state.expensesPerMonth.medicine;
    }

    const motherExpenses = getCommonExpenses(0) + getAdditionalMotherExpenses();
    const fatherExpenses = getCommonExpenses(1);

    return (
        <div className="report">
            <div className="finalResult">
                <div className="label">If father owes 100% of the expenses</div>
                <div className="label">Then he gives the mother</div>
                <div className="result">{motherExpenses} NIS per month</div>

                <div className="label red">This is the absolute maximum. <br/><u>Any more than this is <i>spousal support</i></u></div>
            </div>
            <hr/>
            <div className="smaller">
                <div className="label">He actually spends a total of</div>
                <div className="result">{fatherExpenses + motherExpenses} NIS</div>
                <div className="label">Due to the above plus direct expenses of</div>
                <div className="result">{fatherExpenses} NIS</div>
            </div>
        </div>
    )
}
