export interface Message {
  id?: string;
  subject?: string;
  creatorId?: string;
  messageBody?: string;
  createdDate?: Date;
  parentMessageId?: string;
  isRead?: boolean;
  isForwarded?: boolean;
}
