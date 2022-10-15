import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';
import { findByUuid } from '$lib/services/users';
import type { JwtPayload } from '$lib/utils'; 

export const load: PageServerLoad = ({cookies}) => {
    const token = cookies.get('sveltekit_auth_app');
    try {
        const user = jsonwebtoken.verify(String(token), import.meta.env.VITE_JWT_PRIVATE_KEY) as JwtPayload;
        
        return {
            authUser: findByUuid(user.uuid),
        }
    } catch {
        throw error(404, 'Not found');
    }
}