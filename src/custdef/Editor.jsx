import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import style from '../global.less';


// 定义rem基准值
const sizeBase = 23.4375;

// 定义输入转换函数
const unitImportFn = (unit, type, source) => {

  // type为单位类型，例如font-size等
  // source为输入来源，可能值为create或paste
  // console.log(type, source);

  // 此函数的返回结果，需要过滤掉单位，只返回数值
  if (unit.indexOf('rem')) {
    return parseFloat(unit, 10) * sizeBase;
  } else {
    return parseFloat(unit, 10);
  }

};

// 定义输出转换函数
const unitExportFn = (unit, type, target) => {

  if (type === 'line-height') {
    // 输出行高时不添加单位
    return unit;
  }

  // target的值可能是html或者editor，对应输出到html和在编辑器中显示这两个场景
  if (target === 'html') {
    // 只在将内容输出为html时才进行转换
    return unit / sizeBase + 'rem';
  } else {
    // 在编辑器中显示时，按px单位展示
    return unit + 'px';
  }

};

class Editor extends React.Component {

  state = {
    editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
    value: '',
  };

  componentWillMount() {
    const { value, height } = this.props;
    this.setState({
      editorState: BraftEditor.createEditorState(value, { unitImportFn }),
      height: height,
    });
  }

  componentDidMount() {
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      value: editorState.toHTML(),
    }, () => {
      this.props.onChange(editorState.toHTML());
    });
  };

  preview = () => {

    if (window.previewWindow) {
      window.previewWindow.close();
    }

    window.previewWindow = window.open('', '', '');
    window.previewWindow.document.write(this.buildPreviewHtml());
    window.previewWindow.document.close();

  };

  buildPreviewHtml() {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>预览</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `;

  }


  render() {

    const { editorState, value, height } = this.state;

    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview,
      },
    ];

    return (
      // <div>
      //   <h5>输出内容</h5>
      //   <div className="output-content">{value}</div>
      <div className="my-editor">
        <BraftEditor
          value={editorState}
          converts={{ unitImportFn, unitExportFn }}
          extendControls={extendControls}
          onChange={this.handleChange}
          // contentClassName={style.editors}
          contentStyle={{ height: height }}
        />
      </div>
      // </div>
    );

  }
}

export default Editor;
