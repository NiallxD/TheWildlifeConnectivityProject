export default function middleware(req, res, next) {
    const password = 'yourPassword'; // Replace with your actual password
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Basic ')) {
        res.status(401).send('Unauthorized');
        return;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString().split(':');
    
    if (credentials[0] !== 'admin' || credentials[1] !== password) {
        res.status(401).send('Unauthorized');
        return;
    }

    next();
}
