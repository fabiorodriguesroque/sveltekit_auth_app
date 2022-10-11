import type { Actions } from './$types'; 
import { PrismaClient } from '@prisma/client';
import { invalid } from '@sveltejs/kit';

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
    const prisma = new PrismaClient();

    await prisma.user.create({
        data: {
            email: email,
            password: password, 
            refresh_token: 'eqweqweqw'
        }
    }) 

    await prisma.$disconnect();
}