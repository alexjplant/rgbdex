import { Signal, signal } from "@preact/signals";
import { ComponentChildren, createContext } from "preact";
import { Monster } from "./domains/monsters/data/Monster";
import { Move } from "./domains/moves/data/Move";
import { TypeMatchup } from "./domains/types/data/TypeMatchup";

export const createAppState = (): AppState => {
	return {
        ui: {
            sidebar: signal(null)
        },
        data: {
            moves: signal([]),
            monsters: signal([]),
            typesMatchups: signal([])
        }
	};
}

export interface AppState {
    ui: {
        sidebar: Signal<ComponentChildren>; 
    }
    data: {
        moves: Signal<Move[]>;
        monsters: Signal<Monster[]>;
        typesMatchups: Signal<TypeMatchup[]>;
    }
}

export const State = createContext({} as AppState);