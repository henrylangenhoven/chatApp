import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { NgOptimizedImage } from '@angular/common';
import { ChatComponent } from './chats/chat/chat.component';
import { ChatHeaderComponent } from './chats/chat/chat-header/chat-header.component';
import { ChatHistoryComponent } from './chats/chat/chat-history/chat-history.component';
import { ChatMessageComponent } from './chats/chat/chat-message/chat-message.component';
import { ChatHistoryItemComponent } from './chats/chat/chat-history-item/chat-history-item.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactItemComponent,
    ChatComponent,
    ChatHeaderComponent,
    ChatHistoryComponent,
    ChatMessageComponent,
    ChatHistoryItemComponent,
  ],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgOptimizedImage, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
