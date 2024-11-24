'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function TCPMessaging() {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [message, setMessage] = useState('');
  const [received, setReceived] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    setError('');
    setReceived('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/tcp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ host, port: parseInt(port), message }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setReceived(data.response);
      } else {
        setError(data.error || 'An unknown error occurred');
      }
    } catch (error) {
      console.error('Error sending TCP message:', error);
      setError(`Failed to send message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TCP Messaging (Hex Input)</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="host">Host</Label>
          <Input
            id="host"
            placeholder="Host"
            value={host}
            onChange={(e) => setHost(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="port">Port</Label>
          <Input
            id="port"
            placeholder="Port"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="message">Message (Hex)</Label>
          <Input
            id="message"
            placeholder="Enter hex values (e.g., 48 65 6C 6C 6F)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <Button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div>
          <Label htmlFor="received">Received Messages (Hex)</Label>
          <Textarea
            id="received"
            placeholder="Received Messages"
            value={received}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}