import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';

export const load: PageServerLoad = ({cookies}) => {
    const token = cookies.get('sveltekit_auth_app');
    try {
        const user = jsonwebtoken.verify(String(token), import.meta.env.VITE_JWT_PRIVATE_KEY);
        console.log(user);
    } catch {
        throw error(404, 'Not found');
    }
}

