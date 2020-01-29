const defaultState:State = {
    percentages: {
        shabbat: [50, 50],
        sunday: [50, 50],
        regular: [75,25],
        chagim: [50,50],
        schoolVacation: [85,15]
    },

    expensesPerDay: {
        shabbat: 150,
        school: 70,
        chagim: 125,
        schoolVacation: 100 
    },

    expensesPerMonth: {
        room: 500,
        clothing: 150,
        medicine: 100
    }
}

export const getInitialState = ():State => {

    const hashString = decodeURIComponent(window.location.href.split("#")[1] || "");

    try {
        const hashState = JSON.parse(hashString);
        if(validate(hashState)) {
            console.log("using hash state");
            return hashState;
        } else {
            console.log("using default state (invalid hash state)");
            return defaultState;
        }
    } catch (e) {
            console.log("using default state (corrupt or no hash state)");
        return defaultState;
    }
}

const validate = (state:State):boolean => {
    if(state.expensesPerDay == null 
        || state.expensesPerMonth == null 
        || state.percentages == null) {
        return false;
    }

    if(!validateNumber(state.expensesPerMonth.clothing)
        || !validateNumber(state.expensesPerMonth.medicine)
        || !validateNumber(state.expensesPerMonth.room)
        || !validateNumber(state.expensesPerDay.chagim)
        || !validateNumber(state.expensesPerDay.school)
        || !validateNumber(state.expensesPerDay.schoolVacation)
        || !validateNumber(state.expensesPerDay.shabbat)
    ) {
        return false;
    }

    if(!validatePair(state.percentages.chagim)
        || !validatePair(state.percentages.regular)
        || !validatePair(state.percentages.schoolVacation)
        || !validatePair(state.percentages.shabbat)
        || !validatePair(state.percentages.sunday)
    ) {
        return false;
    }

    return true;


}

const validateNumber = (n:number):boolean => {
    if((typeof n) !== "number" || isNaN(n) || n === Infinity) {
        return false;
    }
    return true;
}

const validatePair = ([n1,n2]:[number, number]):boolean => {
    return true;
}