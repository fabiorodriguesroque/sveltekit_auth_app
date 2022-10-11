import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { headers } from '../config.server'; 

export const GET: RequestHandler = () => {
    throw error(404, 'Not found.');
}

export const POST: RequestHandler = () => {
    
    const body = {
        status: '401',
        message: 'Unauthorized, You must be logged in to see this endpoint.'
    }

    const response = new Response(JSON.stringify(body), {
        status: 401, 
        statusText: 'Unauthorized, You must be logged in to see this endpoint.',
        headers,
    });

    return response; 
}