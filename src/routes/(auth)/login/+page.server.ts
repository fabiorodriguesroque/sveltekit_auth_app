import type { Actions } from './$types'; 
import jsonwebtoken from 'jsonwebtoken';
import { invalid, redirect } from '@sveltejs/kit';
import { db } from '$lib/database';
import { compareSync } from 'bcryptjs';


export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData(); 
        const email = data.get('email');
        const password = data.get('password');

        const user = await getUser(String(email));

        if (! compareSync(String(password), String(user?.password)))
            return invalid(400, {password, incorrect: true});

        const jwt = jsonwebtoken.sign({username: user?.email}, import.meta.env.VITE_JWT_PRIVATE_KEY, { expiresIn: '3m' });
        
        cookies.set('sveltekit_auth_app', String(jwt), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
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
