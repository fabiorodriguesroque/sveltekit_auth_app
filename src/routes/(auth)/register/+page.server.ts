import type { Actions } from './$types'; 
import { db } from '$lib/database';
import { invalid } from '@sveltejs/kit';
import { hashSync } from 'bcryptjs';

export const actions: Actions = {
    register: async ({ request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const password_confirmation = data.get('password-confirmation');

        if (password === password_confirmation) {
            createUser(String(email), String(password));
        } else {
            return invalid(400, {password, passwordsNotMatch: true});
        }   

    }
}

async function createUser(email: string, password: string) {
    const passwordHash = hashSync(password, 14);

    await db.user.create({
        data: {
            email: email,
            password: passwordHash, 
            refresh_token: 'eqweqweqw'
        }
    }) 
}