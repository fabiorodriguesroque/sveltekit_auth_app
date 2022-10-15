import type { Actions } from './$types'; 
import { invalid, redirect } from '@sveltejs/kit';
import { compareSync } from 'bcryptjs';
import { setAuthenticationCookies } from '$lib/cookies';
import { findByEmail } from '$lib/services/users';


export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData(); 
        const email = data.get('email');
        const password = data.get('password');

        const user = await findByEmail(String(email));

        if (! compareSync(String(password), String(user?.password)))
            return invalid(400, {password, incorrect: true});

        if (user)
            setAuthenticationCookies(cookies, user.uuid);

        throw redirect(302, '/dashboard');
    }
}

