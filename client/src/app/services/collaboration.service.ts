import { Injectable } from '@angular/core';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private collaborationSocket: any;
  
  constructor() { } 
  
  init(editor: any, problemId: string): void{
    this.collaborationSocket = io(window.location.origin, { query: 'problemId=' + problemId }); //初始化socket，一、位置是和server连接，找到url 二、如何找
  
    this.collaborationSocket.on("message", (message) =>{
      console.log('message received from the server: ' + message);
    });
    
    this.collaborationSocket.on('change', (delta: string) => { //change来自server端的发送 changeEvent
      console.log('collaboration: editor changes by ' + delta);
      delta = JSON.parse(delta); //从string变为object，可以使用delta内容
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]); //每个用户的界面显示同步的内容
    });
  }
  
  change(delta: string): void{
    this.collaborationSocket.emit('change', delta);
  }
  //添加缓存功能，使用户随时可以看到内容
  restoreBuffer():void {
    this.collaborationSocket.emit('restoreBuffer');
  }
}
