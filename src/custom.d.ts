interface DISPATCHER_ACTION_PERC {
    type: "perc-left" | "perc-right",
    id: string, 
    value: number
}

interface DISPATCHER_ACTION_DIRECT {
    type: "expensesPerDay" | "expensesPerMonth",
    id: string, 
    value: number
}
type DISPATCHER_ACTION = DISPATCHER_ACTION_PERC | DISPATCHER_ACTION_DIRECT;

interface State {
    percentages: {
        shabbat: Percentage 
        sunday: Percentage 
        regular: Percentage 
        chagim: Percentage 
    }

    expensesPerDay: {
        shabbat: number,
        school: number,
        chagim: number,
    }

    expensesPerMonth: {
        room: number,
        clothing: number,
        medicine: number
    }
}

type Percentage = [number, number];