import fs from 'fs';
import path from 'path';

// Let's directly call the buildSystemPrompt function or simulate the route logic.
// Better yet, we can't easily start the Next.js server and curl it.
// Wait, we can test the `streamText` function.
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// We need to set the API key to test it. We can't unless we have it.
// The user might not have set the API key, or the system prompt is too big.
console.log("Checking if google API key is set:", process.env.GOOGLE_GENERATIVE_AI_API_KEY ? "Yes" : "No");
