import type { UserInfoFormState } from "../types";

export type Action =
    | { type: "SET_OCCUPATION"; payload: string }
    | { type: "SET_AGE_RANGE"; payload: string }
    | { type: "TOGGLE_PURPOSE"; payload: string }
    | { type: "SET_NICKNAME"; payload: string }
    | { type: "RESET"; payload: Partial<UserInfoFormState> };

export const initialState: UserInfoFormState = {
    occupation: "",
    ageRange: "",
    purposes: [],
    nickname: "",
};

export function reducer(state: UserInfoFormState, action: Action): UserInfoFormState {
    switch (action.type) {
        case "SET_OCCUPATION":
            return { ...state, occupation: action.payload };
        case "SET_AGE_RANGE":
            return { ...state, ageRange: action.payload };
        case "TOGGLE_PURPOSE": {
            const exists = state.purposes.includes(action.payload);
            return {
                ...state,
                purposes: exists
                    ? state.purposes.filter((p) => p !== action.payload)
                    : [...state.purposes, action.payload],
            };
        }
        case "SET_NICKNAME":
            return { ...state, nickname: action.payload };
        case "RESET":
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
