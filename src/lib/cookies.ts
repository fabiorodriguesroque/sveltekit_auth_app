import type { Cookies } from "@sveltejs/kit";
import jsonwebtoken from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { dev } from '$app/environment';
import { variables } from '$lib/variables'; 

export {};

export const setAuthenticationCookies = (cookies: Cookies, uuid: string) => {
    const jwt = jsonwebtoken.sign({uuid: uuid}, variables.private_key, { expiresIn: '15m' });
    const refreshToken = randomUUID();

    cookies.set('sveltekit_auth_app', String(jwt), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: dev ? false : true,
        maxAge: 60 * 60 * 35 * 30
    });

    cookies.set('sveltekit_auth_app_refresh_token', String(refreshToken), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: dev ? false : true,
        maxAge: 60 * 60 * 35 * 30
    }); 
}

export const deleteAuthenticationCookies = async (cookies: Cookies,) => {
    cookies.delete('sveltekit_auth_app');
    cookies.delete('sveltekit_auth_app_refresh_token');
}