export class Contact {
  name: string;
  avatarUrl: string;
  status: "online" | "offline";
  statusMessage: string
  active?: boolean;


  constructor(name: string, avatarUrl: string, status: "online" | "offline", statusMessage: string, active:boolean) {
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.statusMessage = statusMessage;
  }
}
