import React from 'react';
import {SmileOutlined, HomeOutlined, PicLeftOutlined, SettingOutlined} from '@ant-design/icons';

/**
 * 定义图标枚举用于菜单图标显示问题
 * @type {{picLeft: *, smile: *, home: *, setting: *}}
 */
const iconEnum = {
  smile: <SmileOutlined/>,
  home: <HomeOutlined/>,
  picLeft: <PicLeftOutlined/>,
  setting: <SettingOutlined/>,
};

export default iconEnum;
