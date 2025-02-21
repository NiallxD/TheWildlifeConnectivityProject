export default function middleware(req) {
    const password = process.env.PASSWORD;
    const authHeader = req.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protected"',
            },
        });
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials).split(':');

    if (credentials[0] !== 'admin' || credentials[1] !== password) {
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protected"',
            },
        });
    }

    return new Response('OK', {
        status: 200,
    });
}

export const config = {
    matcher: '/partners-area',
};
