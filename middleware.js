export default function middleware(req, res, next) {
    const password = process.env.PASSWORD; // Use the environment variable for the password
    if (req.headers['authorization'] !== `Basic ${Buffer.from(`admin:${password}`).toString('base64')}`) {
        res.status(401).send('Unauthorized');
        return;
    }
    next();
}
