import { cookies } from 'next/headers';

function parseSessionCookie(sessionCookie: string | undefined) {
    if (sessionCookie) {
        return JSON.parse(sessionCookie);
    }
    return null;
}

export const getSession = async () => {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('supabaseSession')?.value;
    return parseSessionCookie(sessionCookie);
};
