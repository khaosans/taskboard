import { cookies } from 'next/headers';

function parseSessionCookie(sessionCookie: string | null) {
    if (sessionCookie) {
        return JSON.parse(sessionCookie);
    }
    return null;
}

export const getSession = () => {
    const sessionCookie = cookies().get('supabaseSession')?.value as string | null;
    return parseSessionCookie(sessionCookie);
};