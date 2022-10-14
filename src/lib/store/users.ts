import { writable } from 'svelte/store'; 

export const AuthUser: object = writable({}); 

export const setAuthUser = (uuid: string) => {
    // code here 
}