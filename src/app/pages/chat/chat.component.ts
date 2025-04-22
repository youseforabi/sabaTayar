import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Message {
  sender: 'admin' | 'user';
  text: string;
  timestamp: Date;
}
@Component({
    selector: 'app-chat',
    standalone:true,

    imports: [NgFor, NgClass,FormsModule,NgIf],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent {
  // newMessage: string = '';
  // messages: any[] = [
  //   { text: 'Hello, I am the site admin. May I help you?', sender: 'admin', time: new Date().toLocaleString() 
  //     , avatar: 'assets/image1jpg.jpg' }
  // ];

  // onInputChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement) {
  //     this.newMessage = inputElement.value;
  //   }
  // }

  // sendMessage() {
  //   if (this.newMessage.trim() === '') return;

  //   this.messages.push({
  //     text: this.newMessage,
  //     sender: 'user',
  //     time: new Date().toLocaleString(),
  //     avatar: 'assets/image2.jpg'
  //   });

  //   this.newMessage = ''; 
  // }

  users: User[] = [
    { id: 1, name: 'يوسف محمد', avatar: 'assets/user1.png' },
    { id: 2, name: 'سارة أحمد', avatar: 'assets/user2.png' },
    { id: 3, name: 'علي حسين', avatar: 'assets/user3.png' },
    // ... المزيد من المستخدمين
  ];

  selectedUser: User | null = null;
  messages: Message[] = [];
  newMessage: string = '';

  ngOnInit(): void {
    // هنا ممكن نعمل لود لأول محادثة بشكل افتراضي
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    // هنا هنستدعي API حقيقي لجلب رسائل المحادثة مع اليوزر ده
    this.messages = [
      { sender: 'user', text: 'مرحبا يا أدمن! كيف يمكنني المساعدة؟', timestamp: new Date() },
      { sender: 'admin', text: 'أهلاً بك يا يوسف! عندي استفسار بخصوص...', timestamp: new Date() },
      // ... رسائل المحادثة
    ];
  }

  sendMessage(): void {
    if (this.selectedUser && this.newMessage.trim() !== '') {
      const message: Message = {
        sender: 'admin',
        text: this.newMessage,
        timestamp: new Date()
      };
      this.messages.push(message);
      this.newMessage = '';
      // هنا هنستدعي API حقيقي لإرسال الرسالة
    }
  }
}

