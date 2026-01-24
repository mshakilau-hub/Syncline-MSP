const STORAGE_KEY = 'shakil_chat_session';

export const saveChatSession = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save chat:', err);
  }
};

export const loadChatSession = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to load chat:', err);
    return null;
  }
};




// const STORAGE_KEY = 'shakil_chat_session';

// export const saveChatSession = (state) => {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   } catch (err) {
//     console.error('Failed to save chat:', err);
//   }
// };

// export const loadChatSession = () => {
//   try {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     console.error('Failed to load chat:', err);
//     return null;
//   }
// };


// // src/components/chat/chatStorage.js

// const STORAGE_KEY = "shakil_chat_session";

// /**
//  * Saves the chat state to localStorage
//  * @param {Object} state - current chat state
//  */
// export const saveChatSession = (state) => {
//   try {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
//   } catch (err) {
//     console.error("Failed to save chat session:", err);
//   }
// };

// /**
//  * Loads chat state from localStorage
//  * @returns {Object|null} - saved state or null
//  */
// export const loadChatSession = () => {
//   try {
//     const data = localStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : null;
//   } catch (err) {
//     console.error("Failed to load chat session:", err);
//     return null;
//   }
// };

// /**
//  * Clears the chat session (optional)
//  */
// export const clearChatSession = () => {
//   try {
//     localStorage.removeItem(STORAGE_KEY);
//   } catch (err) {
//     console.error("Failed to clear chat session:", err);
//   }
// };
