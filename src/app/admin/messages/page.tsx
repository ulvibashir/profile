'use client'

import { useState, useEffect, useCallback } from 'react'
import { FaEnvelope, FaTrash, FaCheckCircle, FaReply } from 'react-icons/fa'

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

type MessageStatus = 'all' | 'new' | 'read' | 'replied' | 'archived';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStatus, setCurrentStatus] = useState<MessageStatus>('all');

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const statusFilter = currentStatus !== 'all' ? `?status=${currentStatus}` : '';
      const response = await fetch(`/api/admin/messages${statusFilter}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data.messages);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [currentStatus]);
  
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateMessageStatus = async (id: number, status: 'read' | 'replied' | 'archived') => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update message status');
      }
      
      // Update the message in the local state
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === id ? { ...msg, status } : msg
        )
      );
    } catch (err) {
      console.error('Error updating message status:', err);
      setError('Failed to update message status. Please try again.');
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete message');
      }
      
      // Remove the message from the local state
      setMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== id)
      );
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message. Please try again.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Messages</h1>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter by status:</label>
        <select
          value={currentStatus}
          onChange={(e) => setCurrentStatus(e.target.value as MessageStatus)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Messages</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-2 text-gray-600">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <FaEnvelope className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">No messages found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Message</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id} className={message.status === 'new' ? 'bg-blue-50' : ''}>
                  <td className="py-3 px-4">{message.name}</td>
                  <td className="py-3 px-4">
                    <a href={`mailto:${message.email}`} className="text-primary hover:underline">
                      {message.email}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <div className="max-w-xs truncate">{message.message}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      message.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      message.status === 'read' ? 'bg-gray-100 text-gray-800' :
                      message.status === 'replied' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{formatDate(message.created_at)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {message.status === 'new' && (
                        <button
                          onClick={() => updateMessageStatus(message.id, 'read')}
                          className="text-gray-600 hover:text-primary"
                          title="Mark as read"
                        >
                          <FaCheckCircle />
                        </button>
                      )}
                      <a
                        href={`mailto:${message.email}?subject=Re: Message from website&body=Hello ${message.name},%0D%0A%0D%0AThank you for your message.%0D%0A%0D%0AOriginal message:%0D%0A${message.message}`}
                        className="text-gray-600 hover:text-primary"
                        title="Reply"
                        onClick={() => updateMessageStatus(message.id, 'replied')}
                      >
                        <FaReply />
                      </a>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="text-gray-600 hover:text-red-500"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
