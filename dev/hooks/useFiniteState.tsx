import { useState } from "react";

/**
 * Finite state machine hook
 * @param {Record<string, string>} statuses
 * @param {any} transitions
 * @param {string|null} initialStatus
 *
 * @typedef {string} currStatus  — documentation for isLoading
 * @typedef {(action : string)=>void} updateStatus — documentation for setIsLoading
 *
 * @type {[currStatus, updateStatus]} Loading
 * @return {any}
 */
export function useStateMachine(statuses : Record<string, string>, transitions : any, initialStatus : string | null = null) {
    if(initialStatus===null) initialStatus = statuses[Object.keys(statuses)[0]];
    const [ currStatus, setStatus ] = useState(initialStatus);
    const transition = (currStatus : string, action : string) : string => transitions[currStatus][action] || currStatus;
    const updateStatus = (action : string) : void => setStatus(currSt => transition(currSt, action));
    return [ currStatus, updateStatus ];
}