import { db } from '$lib/database';

/**
 * Get user by uuid 
 * 
 * @param uuid 
 * @returns 
 */
export const findByUuid = async (uuid: string) => {
    return await db.user.findUnique({
        where: {
            uuid: uuid,
        },
        select: {
            email: true,
        }
    })
}