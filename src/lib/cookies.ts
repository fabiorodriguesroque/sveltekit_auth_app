import type { Cookies } from "@sveltejs/kit";
import jsonwebtoken from 'jsonwebtoken';
import { randomUUID } from 'crypto';

export {};

export const setAuthenticationCookies = (cookies: Cookies, uuid: string) => {
    const jwt = jsonwebtoken.sign({uuid: uuid}, import.meta.env.VITE_JWT_PRIVATE_KEY, { expiresIn: '15m' });
    const refreshToken = randomUUID();

    cookies.set('sveltekit_auth_app', String(jwt), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false,
        maxAge: 60 * 60 * 35 * 30
    });

    cookies.set('sveltekit_auth_app_refresh_token', String(refreshToken), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // improve this -> false if is dev, true if is production
        maxAge: 60 * 60 * 35 * 30
    }); 
}