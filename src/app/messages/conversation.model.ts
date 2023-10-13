import { Message } from './message.model';

export interface Conversation {
  id?: string;
  users?: string[];
  messages?: Message[];
}
