import type { Actions } from './$types'; 
import jsonwebtoken from 'jsonwebtoken';
import { invalid, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import { compareSync } from 'bcryptjs';
import { randomUUID } from 'crypto';


export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData(); 
        const email = data.get('email');
        const password = data.get('password');

        const user = await getUser(String(email));

        if (! compareSync(String(password), String(user?.password)))
            return invalid(400, {password, incorrect: true});

        /**
         * TO-DO 
         * duplicated code in register +page.server.ts 
         */
        const jwt = jsonwebtoken.sign({username: user?.email}, import.meta.env.VITE_JWT_PRIVATE_KEY, { expiresIn: '3m' });
        const refreshToken = randomUUID();

        cookies.set('sveltekit_auth_app', String(jwt), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false, // improve this -> false if is dev, true if is production
            maxAge: 60 * 60 * 35 * 30
        });

        cookies.set('sveltekit_auth_app_refresh_token', String(refreshToken), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false, // improve this -> false if is dev, true if is production
            maxAge: 60 * 60 * 35 * 30
        });

        throw redirect(302, '/dashboard');
    }
}

async function getUser(email: string) {
    const user = await db.user.findUnique({where: {email: email}});

    if (user) {
        return user;
    }

    return null;
}
