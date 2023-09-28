import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function getHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Your GET API logic here
        const responseData = {
            message: 'Hello, this is your GET API response!',
            timestamp: new Date(),
        };
        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error in GET handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Your POST API logic here
        const responseData = {
            message: 'Hello, this is your POST API response!',
            timestamp: new Date(),
        };
        return NextResponse.json({ error: 'Internal Server Error' });
    } catch (error) {
        console.error('Error in POST handler:', error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}
