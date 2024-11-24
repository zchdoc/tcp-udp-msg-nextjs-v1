import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { host, port, message } = req.body;

    if (!host || !port || !message) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Simulate TCP message sending
    simulateTCPMessage(message, host, port)
      .then(response => {
        res.status(200).json({ response });
      })
      .catch(error => {
        console.error('TCP Error:', error);
        res.status(500).json({ error: error.message || 'Failed to send TCP message' });
      });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function simulateTCPMessage(message: string, host: string, port: number): Promise<string> {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        // Convert hex string to Buffer
        const buffer = Buffer.from(message.replace(/\s/g, ''), 'hex');
        
        // Simulate response (echo the message back)
        const hexResponse = buffer.toString('hex').toUpperCase().match(/.{1,2}/g)?.join(' ') || '';
        console.log(`Simulated TCP response: ${hexResponse}`);
        resolve(hexResponse);
      } catch (error) {
        reject(new Error(`Simulated TCP error: ${error.message}`));
      }
    }, 1000); // 1 second delay
  });
}