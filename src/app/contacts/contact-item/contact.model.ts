export class Contact {
  name: string;
  avatarUrl: string;
  status: "Online" | "Offline";
  badge?: number


  constructor(name: string, avatarUrl: string, status: "Online" | "Offline", badge?: number) {
    this.name = name;
    this.avatarUrl = avatarUrl;
    this.status = status;
    this.badge = badge;
  }
}
