import React from 'react';
import { nDays } from './constants';


interface ReportProps {
    state: State;
}

type ValidIndex = 0 | 1;

export const Report = ({state}:ReportProps) => {

    const getPerc = (index:ValidIndex) => (label:keyof State["percentages"]) => 
        (state.percentages[label][index])/100;


    const getDayExpense = (index:ValidIndex) => (percLabel: keyof State["percentages"], expensesLabel:keyof State["expensesPerDay"]) => {
        const expense = state.expensesPerDay[expensesLabel];
        return nDays[percLabel] * (getPerc(index) (percLabel) * expense); 
    }
    const getShabbat = (index:ValidIndex):number => 
        getDayExpense (index) ("shabbat", "shabbat");
    
    const getSunday = (index:ValidIndex):number => 
        getDayExpense (index) ("sunday", "school");

    const getRegular = (index:ValidIndex):number => 
        getDayExpense (index) ("regular", "school");

    const getChagim = (index:ValidIndex):number => 
        getDayExpense (index) ("chagim", "chagim");

    const getSchoolVacation = (index:ValidIndex):number => 
        getDayExpense (index) ("schoolVacation", "schoolVacation");

    const getRoom = (index:ValidIndex):number =>
        //room is identical for both parents
        state.expensesPerMonth.room;

    const getClothing= (index:ValidIndex):number =>
        //clothing is only mother's expense
        index === 0 ? state.expensesPerMonth.clothing : 0;

    const getMedicine= (index:ValidIndex):number =>
        //medicine is only mother's expense
        index === 0 ? state.expensesPerMonth.medicine : 0;

    const getTotalExpenses = (index:ValidIndex):number => { 
        return getShabbat(index) 
            + getSunday(index) 
            + getRegular(index)
            + getChagim(index)
            + getSchoolVacation(index)
            + getRoom(index)
            + getClothing(index)
            + getMedicine(index);
    }

    const motherExpenses = getTotalExpenses(0);
    const fatherExpenses = getTotalExpenses(1);

    const makeBreakdown = (index:ValidIndex) => {
        const shabbatDays = getPerc (index) ("shabbat") * nDays.shabbat;
        const sundayDays = getPerc (index) ("sunday") * nDays.sunday;
        const regularDays = getPerc (index) ("regular") * nDays.regular;
        const chagimDays = getPerc (index) ("chagim") * nDays.chagim;
        const schoolVacationDays = getPerc (index) ("schoolVacation") * nDays.schoolVacation;
        return (
            <ul>
                <li>{shabbatDays} shabbats: {getShabbat(index)} NIS</li>
                <li>{sundayDays} sundays (non-work days): {getSunday(index)} NIS</li>
                <li>{regularDays} regular schooldays: {getRegular(index)} NIS</li>
                <li>{chagimDays} chagim: {getChagim(index)} NIS</li>
                <li>{schoolVacationDays} school vacation: {getSchoolVacation(index)} NIS</li>
                <li>room: {getRoom(index)} NIS</li>
                <li>clothing: {getClothing(index)} NIS</li>
                <li>medicine: {getMedicine(index)} NIS</li>
                <li className="nobullet"><div className="result left">total: {getTotalExpenses(index)}</div></li>
            </ul>
        );
    }
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
                <hr/>
                <div className="label">Mother's breakdown:</div>
                {makeBreakdown(0)}
                <hr/>
                <div className="label">Father's breakdown:</div>
                {makeBreakdown(1)}
            </div>
        </div>
    )
}
