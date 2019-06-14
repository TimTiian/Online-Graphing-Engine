import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CollaborationService } from '../../services/collaboration.service';

declare var ace: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public languages: string[] = ['Python', 'Java'];
  editor: any;
  problemId: string;
  language: string = 'Python';
  
  defaultContent = {
    'Python': `class Solution
    def example():
      # write yoru Python code here`, //是多行的string用``
    'Java': ''
  };
  
  constructor(private route: ActivatedRoute,
    private collaboration: CollaborationService){}

  ngOnInit() {
    this.route.params
      .subscribe(params => {
          this.problemId = params['id'];
          this.initEditor();
      });
      
    this.collaboration.init(this.editor, this.problemId);
  }
  
  initEditor(): void{
    this.editor = ace.edit("editor"); //引号中的editor是html中的
    this.editor.setTheme("ace/theme/eclipse");//设置包含eclipse的theme
    this.resetEditor();
    
    document.getElementsByTagName('textarea')[0].focus();//可以进行多行编译
    
    this.editor.setOption("maxLines", 20);
    this.editor.setOption("minLines", 20);
    
    this.editor.lastAppliedChange = null;
    
    this.editor.on('change', (e) => {   //e代表event; on代表输出
      console.log('editor changes: ' + JSON.stringify(e));
      
      if(this.editor.lastAppliedChange != e){
        this.collaboration.change(JSON.stringify(e));
      }
    });
  }

  resetEditor(): void{
    this.editor.setValue(this.defaultContent[this.language]); //在各种地方都可以使用
  }
  
  setLanguage(language: string): void{
    this.language = language;
    this.resetEditor();
  }
  
  //看能不能看到用户传入的code
  submit(): void{
    let code = this.editor.getValue();
    console.log(code);
  }
}
