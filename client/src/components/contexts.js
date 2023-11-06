import { createContext } from "react";

export const ThemeContext = createContext({
    primaryColor: "yellow",
    secocondColor: "blue",
})

export const StateContext= createContext({
    state: {},
    dispatch: () => {}
})