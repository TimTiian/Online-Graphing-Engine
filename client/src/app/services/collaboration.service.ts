import { Injectable } from '@angular/core';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private collaborationSocket: any;
  
  constructor() { }
  
  init(editor: any, problemId: string): void{
    this.collaborationSocket = io(window.location.origin, { query: 'problemId=' + problemId}); //初始化socket，一、位置是和server连接，找到url 二、如何找
  
    this.collaborationSocket.on("message", (message) =>{
      console.log('message received from the server: ' + message);
    });
    
    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }
  
  change(delta: string): void{
    this.collaborationSocket.emit('change', delta);
  }
}
