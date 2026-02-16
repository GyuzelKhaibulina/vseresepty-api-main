import { NextResponse  } from 'next/server';
import SendGmail from './services/send_gmail/SendGmail';


export async function POST(req, res) {
    const params = await req.json()
    return NextResponse.json({result: SendGmail.send(params.email, params.message, params.subject, params.html)})
}