import SendGmail from './send_gmail/SendGmail';


export default async function send_email (req, res) {    
    const param = JSON.parse(req.body)
        if (req.method === "POST") {
            try {    
                return res.status(200).json({result: SendGmail.send(param.email, param.message, param.subject, param.html)});                     
            } 
            catch (error) {          
                return res.status(500).json({message: error})
            }  
        }
}
       


