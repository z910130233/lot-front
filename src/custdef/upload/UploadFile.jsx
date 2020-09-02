import React from 'react';
import { Upload, Modal } from 'antd';
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined';
import { upLoadFile } from '@/services/upload';
import ImgCrop from 'antd-img-crop';
import 'antd/dist/antd.css';
// import 'antd/es/modal/style';
// import 'antd/es/slider/style';

class UploadFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImage: '',
      fileList: [],
      max: 1,
      previewVisible: false,
      previewTitle: '预览图片',
      aspect: props.aspect
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  componentWillMount() {
    const { value, max, aspect,disabled } = this.props;
    const { fileList } = this.state;
    if (value != null) {
      value.map((item) => {
        fileList.push(item);
      });
      this.setState({
        fileList: fileList,
        max: max,
        aspect: aspect,
        disabled: disabled
      });
    } else {
      this.setState({
        fileList: [],
      });
    }
  }

  handlePreview = async file => {
    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  customRequest = (option) => {
    const that = this;
    const formData = new FormData();
    const { fileList } = this.state;
    formData.append('file', option.file);
    upLoadFile(formData).then(res => {
      fileList.push({
        name: '',
        status: 'done',
        url: res.data.url,
        uid: res.data.uid,
      });
      that.setState({
        fileList: fileList
      });
      that.props.onChange(that.state.fileList);
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };

  render() {
    const { fileList, previewVisible, previewImage, max, previewTitle, aspect,disabled } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined/>
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <ImgCrop rotate grid aspect={aspect}>
          <Upload
            action=""
            listType="picture-card"
            customRequest={this.customRequest}
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            disabled={disabled}
          >
            {fileList.length >= max ? null : uploadButton}
          </Upload>
        </ImgCrop>
        <Modal
          visible={previewVisible}
          title='预览图片'
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }}
               src={previewImage != null ? previewImage : 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592889536016&di=8f884018e221e2926e8f21d3fb27dad4&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F6d84060bdff92fad071278ec9aa72b52aac49ac2b3ff-Ba8AUJ_fw658'}/>
        </Modal>
      </div>
    );
  }
}

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

export default UploadFile;
