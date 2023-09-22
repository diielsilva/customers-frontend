import { Component } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  constructor(private messager: MessageService) { }

  protected title(): string {
    return this.messager.title;
  }

  protected isError(): boolean {
    return this.messager.isError;
  }

  protected messages(): string[] {
    return this.messager.messages;
  }

}