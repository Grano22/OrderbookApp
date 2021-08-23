import { useCallback, useState } from "react";

interface StateStackConfig {
    readonly limit: number;

}

const DefaultStateStackConfig : StateStackConfig = {
    limit:5
};

class StackItem<T> {
    #value = null;

    constructor(newValue : T) {
        this.#value = newValue;
    }

    valueOf() {
        return this.#value;
    }

    toString() {
        return this.#value.toString();
    }
}

class StateStack<T> {
    #id = 0;
    #data = new Array<StackItem<T>>();
    #config = DefaultStateStackConfig;
    times = 0;

    constructor(initialValue : T | null = null, config : StateStackConfig | null = null) {
        if(config!==null) this.configure(config);
        if(initialValue!==null) this.push(initialValue);
    }

    configure(config : StateStackConfig) {
        this.#config = Object.assign(DefaultStateStackConfig, config);
    }

    get(index : number) : T | null {
        return this.#data[index].valueOf() || null;
    }

    push(newData : T) : StateStack<T> {
        this.#data.push(new StackItem<T>(newData));
        if(this.length>this.#config.limit) this.#data.shift();
        this.times++;
        return this;
    }

    range(to : number, from=0) : T[] {
        return this.#data.map(v=>v.valueOf()).slice(from, to+1);
    }
 
    get last() {
        return this.#data[this.#data.length - 1].valueOf();
    }

    get all() : T[] {
        return this.#data.map(v=>v.valueOf());
    }

    get length() {
        return this.#data.length;
    }
}

/*const getStateByRange = (to : number, from=0) : ST[] => {
    
}
const getStateByIndex = () => {
}*/

export default function useStateStack<ST>(initialValue : ST, limit=5) : [ (itemSelector : string | number)=>ST | null, (value: ST)=>void, (itemSelector : string | number, rangeStart?: number)=>ST[] ] {
    const [ getStack, updateStack ] = useState<StateStack<ST>>(new StateStack(initialValue, { limit }));
    const [ , update ] = useState(0);

    const getStackItem = useCallback((itemSelector : string | number = "last") : ST | null => {
        if(typeof itemSelector==="number") {
            if(itemSelector>=getStack.length) return null;
            if(itemSelector<0) {
                let tgIndex = getStack.length - Math.abs(itemSelector);
                if(tgIndex>=0) return getStack.get(tgIndex); else return null;
            } else return getStack.get(itemSelector);
        } else if(typeof itemSelector==="string" && itemSelector==="last") return getStack.last;
    }, [getStack]);

    const updateStackItem = useCallback((value : ST) : void => {
        updateStack(v=>v.push(value));
        update(v=>v+1);
    }, [updateStack]);

    const getStackItemRange = useCallback((itemSelector : string | number = "*", rangeStart=0) : ST[] => { 
        if(typeof itemSelector==="number") {
            let tgIndex = itemSelector, startIndex = rangeStart;
            if(itemSelector>=getStack.length) return [];
            if(itemSelector<0) {
                tgIndex = getStack.length - Math.abs(itemSelector);
                if(tgIndex<0) return [];
            }
            if(rangeStart<0) {
                startIndex = getStack.length - Math.abs(rangeStart);
                if(startIndex<0) rangeStart = 0; //return [];
            }
            if(startIndex>tgIndex) return [];
            return getStack.range(tgIndex, startIndex);
        } else if(typeof itemSelector==="string" && itemSelector==="*" || itemSelector==="all") return getStack.all;
    }, [getStack]);

    return [ getStackItem, updateStackItem, getStackItemRange ];
}