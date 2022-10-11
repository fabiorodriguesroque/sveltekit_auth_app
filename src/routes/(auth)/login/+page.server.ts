import { PrismaClient } from '@prisma/client'
import type { Actions } from './$types'; 
import jsonwebtoken from 'jsonwebtoken';
import { invalid } from '@sveltejs/kit';

export const actions: Actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData(); 
        const email = data.get('email');
        const password = data.get('password');

        const user = await getUser(String(email));

        if (user?.password != password )
            return invalid(400, {password, incorrect: true});

        const jwt = jsonwebtoken.sign({username: user?.email}, import.meta.env.VITE_JWT_PRIVATE_KEY, { expiresIn: '3m' });
        
        console.log(cookies);

        cookies.set('sveltekit_auth_app', String(jwt), {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: false,
            maxAge: 60 * 60 * 35 * 30
        });
        // setCookie(jwt);
    }
}

async function getUser(email: string) {
    const prisma = new PrismaClient(); 
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    });

    if (user) {
        return user;
    }

    prisma.$disconnect;

    return null;
}

function setCookie(token: string) {
    return {
        headers: {
            'Set-Cookie': [
                `token=${token}; Max-Age=${15 * 60}; Path=/; ${false} HttpOnly`
            ]
        }
    }
}

// function createCookie(email: string, value: string) {
//     const expires = new Date()
//     expires.setMonth(expires.getMonth()+1) //setting cookie to expire in 6 months
//     const cookie_options = {httpOnly:true, path:'/',sameSite:true,expires}
//     // if(!dev){
//     //     cookie_options.secure = true
//     //     cookie_options.domain = domain
//     // }
//     const cookie = serialize(email,value,cookie_options)
//     return cookie
// }


        // const cookie = createCookie(
        //     String(user?.email),
        //     String(jwt),
        //     // String(url.hostname)
        // );

        // return {
        //     status: 200,
        //     headers: {
        //         'set-cookie': cookie,
        //     }
        // };
