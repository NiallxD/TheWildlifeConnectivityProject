import { NextResponse } from 'next/server';

export function middleware(req) {
    const password = process.env.PASSWORD;
    const authorization = req.headers.get('authorization');

    if (!authorization || authorization !== `Basic ${Buffer.from(`admin:${password}`).toString('base64')}`) {
        return NextResponse('Unauthorized', { status: 401 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/partners-area',
};
