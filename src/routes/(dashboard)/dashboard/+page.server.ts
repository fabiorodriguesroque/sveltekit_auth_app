import type { Actions } from './$types';
import { deleteAuthenticationCookies } from '$lib/cookies';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
    logout: async ({ cookies }) => {
        await deleteAuthenticationCookies(cookies);

        throw redirect(302, '/login');
    }
}