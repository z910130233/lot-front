import { Modal } from 'antd';
import React from 'react';
import style from '../global.less';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';


class ImgList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      previewVisible: false,
      previewTitle: '预览图片',
      srcList: [],
    };
  }

  handleOpen = (item) => this.setState({ previewVisible: true, src: item });
  handleCancel = () => this.setState({ previewVisible: false });

  componentWillMount() {
    const { src, srcList } = this.props;
    if (src != null || srcList != null) {
      this.setState({
        src: src,
        srcList: srcList,
      });
    }
  }

  render() {
    const { previewVisible, previewTitle, src, srcList } = this.state;
    const { width, height } = this.props;

    return (
      <div className={style.ImgList}>
        {srcList.map((item, index) => {
          return (
            <div>
              <img src={item != null ? item : ''} width={width} height={height} onClick={()=>this.handleOpen(item)}/>
              <Modal
                visible={previewVisible}
                title='预览图片'
                footer={null}
                onCancel={this.handleCancel}
              >
                <img alt="example" style={{ width: '100%' }}
                     src={src != null ? src : ''}/>
              </Modal>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImgList;
