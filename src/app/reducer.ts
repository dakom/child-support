import * as L from "partial.lenses";
import * as R from "ramda";

export const reducer = (state:State, action: DISPATCHER_ACTION):State => {
    switch(action.type) {
        case "perc-left": 
        case "perc-right": {
            const {type, value, id} = action;
            const target_index = type === "perc-left" ? 0 : 1;
            const other_index = type === "perc-left" ? 1 : 0;
            const other_value = 100 - value;

            return R.pipe(
                L.set(["percentages", id, target_index]) (value),
                L.set(["percentages", id, other_index]) (other_value)
            ) (state);
        };

        case "expensesPerDay": 
        case "expensesPerMonth": {
            const {type, value, id} = action;

            return L.set([type, id]) (value) (state);
        }

        default: return state;
    }
}