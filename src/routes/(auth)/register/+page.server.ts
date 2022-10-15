import type { Actions } from './$types'; 
import { db } from '$lib/database';
import { invalid, redirect } from '@sveltejs/kit';
import { hashSync } from 'bcryptjs';
import { randomUUID } from 'crypto';
import { setAuthenticationCookies } from '$lib/cookies';

export const actions: Actions = {
    register: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
        const password_confirmation = data.get('password-confirmation');

        if (!email || !password || !password_confirmation)
            return invalid(400, { required: true })

        if (! await validateEmail(String(email)))
            return invalid(400, { unique: true })

        if (password === password_confirmation) {
            const user = await createUser(String(email), String(password));
            const uuid = user.uuid;


        setAuthenticationCookies(cookies, uuid);
        
        } else {
            return invalid(400, {password, passwordsNotMatch: true});
        }
        
        throw redirect(302, '/dashboard');

    }
}

/**
 * TODO 
 * improve this code in lib/services/users to avoid duplicated code later
 */
/**
 * Create user
 * 
 * @param email 
 * @param password 
 * @returns { object } created user
 */
async function createUser(email: string, password: string) {
    const passwordHash: string = hashSync(password, 14);
    const uuid = randomUUID();
    const refreshToken = String(randomUUID());
    const user = await db.user.create({
        data: {
            email: email,
            password: passwordHash, 
            uuid: uuid,
            refreshToken: refreshToken,
        }
    })

    return user; 
}
/**
 * Validate if email is unique
 * @param email
 * @returns {boolean} true if doesn't exists any user with this email
 */
async function validateEmail(email: string) {
    const user = await db.user.findUnique({where: {email: email}});

    if (user) return false; 

    return true;
}