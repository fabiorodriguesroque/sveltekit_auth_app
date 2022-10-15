import type { LayoutServerLoad } from './$types'; 
import type { JwtPayload } from '$lib/utils';
import jsonwebtoken from 'jsonwebtoken';
import { variables } from '$lib/variables';
import { findByUuid } from '$lib/services/users';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = ({ cookies }) => {
    const token = cookies.get('sveltekit_auth_app');

    try {
        const user = jsonwebtoken.verify(String(token), variables.private_key) as JwtPayload;
    
        return {
            authUser: findByUuid(user.uuid)
        }
    } catch {
        throw error(401, 'Unauthorized, please sign in');
    }
}