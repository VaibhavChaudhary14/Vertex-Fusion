import { config } from 'dotenv';
config();

import '@/ai/flows/classify-system-state.ts';
import '@/ai/flows/gnn-security-score.ts';