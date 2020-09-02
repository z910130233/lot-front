import { Modal } from 'antd';
import React from 'react';


class Img extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      previewVisible: false,
      previewTitle: '预览图片',
    };
  }

  handleOpen = () => this.setState({ previewVisible: true });
  handleCancel = () => this.setState({ previewVisible: false });

  componentWillMount() {
    const { src } = this.props;
    if (src != null) {
      this.setState({
        src: src,
      });
    }
  }

  render() {
    const { previewVisible, previewTitle, src } = this.state;
    const { width, height } = this.props;
    return (
      <div style={{margin:10}}>
        <img src={src != null ? src : ''} width={width} height={height} onClick={this.handleOpen}/>
        <Modal
          visible={previewVisible}
          title='预览图片'
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }}
               src={src != null ? src : ''} onError={{ javascript: this.src = 'https://6867-hgz-24ykg-1302666933.tcb.qcloud.la/%E6%97%A0%E5%9B%BE%E6%A8%A1%E5%BC%8F%2C%E6%97%A0%E5%9B%BE%E6%B5%8F%E8%A7%88.png?sign=a646cfd382ee5e1b50d38b1148f35ef6&t=1594998828' }}/>
        </Modal>
      </div>
    );
  }
}

export default Img;
