export const initialState:State = {
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
