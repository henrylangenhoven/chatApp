export interface Message {
  id?: string;
  creatorId?: string;
  messageBody?: string;
  createdDate?: Date;
  isRead?: boolean;
}
