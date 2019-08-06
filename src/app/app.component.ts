import { Component,OnInit } from '@angular/core';
import { HubConnection,HubConnectionBuilder } from '@aspnet/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _hubConnection: HubConnection;
  title = 'UI';
  messages: string[] = [];
  nick = '';
  
  ngOnInit() {
    this._hubConnection = new HubConnectionBuilder()
                        .withUrl("https://pinakisignalr.herokuapp.com/Hubs/Values").build();

    this._hubConnection
      .start()
      .then(() => 
      console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

      this._hubConnection.on('Add', (nick: string, receivedMessage: string) => {
        
        this.messages.push(nick);
      });

      this._hubConnection.on('Delete', (nick: string, receivedMessage: string) => {
      
        console.log('Ms to be deleted '+ nick);
        const index: number = this.messages.indexOf(nick);
        if (index !== -1) {
            this.messages.splice(index, 1);
        } 
      });

    }
}
