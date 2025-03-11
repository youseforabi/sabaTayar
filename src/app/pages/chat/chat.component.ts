import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  newMessage: string = '';
  messages: any[] = [
    { text: 'Hello, I am the site admin. May I help you?', sender: 'admin', time: new Date().toLocaleString() 
      , avatar: 'assets/image1jpg.jpg' }
  ];

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.newMessage = inputElement.value;
    }
  }

  sendMessage() {
    if (this.newMessage.trim() === '') return;

    this.messages.push({
      text: this.newMessage,
      sender: 'user',
      time: new Date().toLocaleString(),
      avatar: 'assets/image2.jpg'
    });

    this.newMessage = ''; 
  }
}

