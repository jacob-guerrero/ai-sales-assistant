import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
  OPENAI_ASSISTANT_ID: process.env.OPENAI_ASSISTANT_ID || '',
  FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || '',
};
