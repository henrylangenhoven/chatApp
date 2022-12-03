import {Component} from '@angular/core';
import {Message} from "./message.model";

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss']
})
export class ChatHistoryComponent {
  public messages: Message[] = [
    {
      name: "Dummy Dum",
      body: "dummy",
      time: "2:33am",
      avatarUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
      myMessage: true
    },
    {
      name: 'You',
      body: '        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      time: '2:33 am',
      myMessage: true
    },
    {
      name: 'Sharon Lessman',
      body: '        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      time: '2:34 am'
    },
    {
      name: 'You',
      body: '        Cum ea graeci tractatos.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      time: '2:35 am',
      myMessage: true
    },
    {
      name: 'Sharon Lessman',
      body: '        Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      time: '2:36 am'
    },
    {
      name: 'Sharon Lessman',
      body: '        Cras pulvinar, sapien id vehicula aliquet, diam velit elementum orci.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      time: '2:37 am'
    },
    {
      name: 'You',
      body: '        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      time: '2:38 am',
      myMessage: true
    },
    {
      name: 'Sharon Lessman',
      body: '        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      time: '2:39 am'
    },
    {
      name: 'You',
      body: '        Cum ea graeci tractatos.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      time: '2:40 am',
      myMessage: true
    },
    {
      name: 'You',
      body: '        Morbi finibus, lorem id placerat ullamcorper, nunc enim ultrices massa, id dignissim metus urna eget purus.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      time: '2:41 am',
      myMessage: true
    },
    {
      name: 'Sharon Lessman',
      body: '        Sed pulvinar, massa vitae interdum pulvinar, risus lectus porttitor magna, vitae commodo lectus mauris et velit.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      time: '2:42 am'
    },
    {
      name: 'You',
      body: '        Lorem ipsum dolor sit amet, vis erat denique in, dicunt prodesset te vix.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar1.png',
      time: '2:43 am',
      myMessage: true
    },
    {
      name: 'Sharon Lessman',
      body: '        Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.',
      avatarUrl: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      time: '2:44 am'
    },


  ]
}
