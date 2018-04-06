import {EventEmitter, Injectable} from '@angular/core';
import * as Twilio from 'twilio-chat';
import Client from "twilio-chat";
import {Util} from "../util/util";
import {Channel} from "twilio-chat/lib/channel";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class ChatService {

  public chatClient: Client;
  public currentChannel: Channel;
  public chatConnectedEmitter: EventEmitter<any> = new EventEmitter<any>()
  public chatDisconnectedEmitter: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  connect(token) {
    Twilio.Client.create(token).then( (client: Client) => {
      this.chatClient = client;
      this.chatConnectedEmitter.emit(true);
    }).catch( (err: any) => {
      this.chatDisconnectedEmitter.emit(true);
      if( err.message.indexOf('token is expired') ) {
        localStorage.removeItem('twackToken');
        this.router.navigate(['/']);
      }
    });
  }

  getPublicChannels() {
    return this.chatClient.getPublicChannelDescriptors();
  }

  getChannel(sid: string): Promise<Channel> {
    return this.chatClient.getChannelBySid(sid);
  }

  createChannel(friendlyName: string, isPrivate: boolean=false) {
    return this.chatClient.createChannel({friendlyName: friendlyName, isPrivate: isPrivate, uniqueName: Util.guid()});
  }

}
