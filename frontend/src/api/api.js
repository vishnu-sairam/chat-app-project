// frontend/src/api/api.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const getSessions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`);
    if (!response.ok) throw new Error('Failed to fetch sessions');
    return await response.json();
  } catch (error) {
    console.error('Error fetching sessions:', error);
    throw error;
  }
};

export const createNewChat = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/new-chat`);
    if (!response.ok) throw new Error('Failed to create new chat');
    return await response.json();
  } catch (error) {
    console.error('Error creating new chat:', error);
    throw error;
  }
};

export const getSessionHistory = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/session/${sessionId}`);
    if (!response.ok) throw new Error('Failed to fetch session history');
    return await response.json();
  } catch (error) {
    console.error('Error fetching session history:', error);
    throw error;
  }
};

export const askQuestion = async (sessionId, question) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question }),
    });
    if (!response.ok) throw new Error('Failed to send message');
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const deleteSession = async (sessionId) => {
  try {
    console.log('Deleting session:', sessionId);
    const response = await fetch(`${API_BASE_URL}/api/session/${sessionId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Delete response status:', response.status);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `HTTP ${response.status}: ${response.statusText}` };
      }
      throw new Error(errorData.error || `Failed to delete session: ${response.status} ${response.statusText}`);
    }
    
    // Handle empty response (204 No Content) or JSON response
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('Delete response data:', data);
      return data;
    } else {
      // No content response
      return { message: 'Session deleted successfully' };
    }
  } catch (error) {
    console.error('Error deleting session:', error);
    throw error;
  }
};

