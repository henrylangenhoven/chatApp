export class Message {
  body: string;
  time: string;
  myMessage?: boolean;
  avatarUrl?: string;


  constructor(body: string, time: string, myMessage?: boolean, avatarUrl?: string) {
    this.body = body;
    this.time = time;
    this.myMessage = myMessage;
    this.avatarUrl = avatarUrl;
  }
}
