export class ChatMessage {
  name?: string;
  body?: string;
  time?: string;
  date?: string;
  myMessage?: boolean;
  avatarUrl?: string;

  constructor(name: string, body: string, time: string, myMessage?: boolean, avatarUrl?: string) {
    this.name = name;
    this.body = body;
    this.time = time;
    this.myMessage = myMessage;
    this.avatarUrl = avatarUrl;
  }
}
