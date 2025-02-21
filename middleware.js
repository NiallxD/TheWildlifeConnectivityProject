export default function middleware(req, res) {
    const password = process.env.PASSWORD; // Use the environment variable for the password
    const authorization = req.headers['authorization'];

    if (!authorization) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const [scheme, credentials] = authorization.split(' ');

    if (scheme !== 'Basic') {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const [username, pass] = Buffer.from(credentials, 'base64').toString().split(':');

    if (username !== 'admin' || pass !== password) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    res.next();
}
