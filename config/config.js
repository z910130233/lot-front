// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      authority: ['[admin]'],
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['[admin]'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
              authority: ['[admin]'],
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
              authority: ['[admin]'],
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              authority: ['[admin]'],
              routes: [
                {
                  path: '/admin/managementList',
                  name: 'userManage',
                  icon: 'solution',
                  component: './management',
                  authority: ['[user]'],
                },
                {
                  path: '/admin/authorityManagement',
                  name: 'authorityManagement',
                  icon: 'tool',
                  component: './authorityManagement',
                  authority: ['[admin]'],
                },
              ],
            },
            {
              name: 'resources',
              icon: 'gold',
              path: '/resources',
              authority: ['[admin]'],
              routes:[
                {
                  name: 'resourcesManage',
                  icon: 'Car',
                  path: '/resources/resourcesManage',
                  component: './resourcesManage',
                },
                {
                  name: 'resources_index',
                  icon: 'partition',
                  path: '/resources/homePage',
                  component: './resources',
                },{
                  name: 'resources_ResourcesShortcutAmend',
                  icon: 'Frown',
                  path: '/resources/ResourcesShortcutAmend',
                  component: './resourcesShortcutAmend',
                },
                {
                  name: 'rotationChart_index',
                  icon: 'FileImage',
                  path: '/resources/rotationChart',
                  component: './rotationChart',
                },{
                  name: 'freightIndex',
                  icon: 'Car',
                  path: '/resources/freightIndex',
                  component: './freightManage',
                },
                {
                  name: 'noticeIndex',
                  icon: 'Bell',
                  path: '/resources/noticeIndex',
                  component: './notice',
                }
              ],
            },{
              name: 'demand',
              icon: 'Block',
              path: '/demand',
              authority: ['[admin]'],
              routes:[
                {
                  name: 'demandRequest',
                  icon: 'Experiment',
                  path: '/demand/demandRequest',
                  component: './demandRequest',
                },{
                  name: 'demand',
                  icon: 'FundView',
                  path: '/demand/demand',
                  component: './demand',
                },
              ]
            },
            {
              name: 'other',
              icon: 'NodeIndex',
              path: '/other',
              authority: ['[admin]'],
              routes:[
                {
                  name: 'OtherIndex',
                  icon: 'Setting',
                  path: '/other/OtherIndex',
                  component: './other',
                }
              ]
            },
            {
              name: 'editor',
              icon: 'highlight',
              path: '/editor',
              routes: [
                {
                  name: 'flow',
                  icon: 'smile',
                  path: '/editor/flow',
                  component: './editor/flow',
                },
                {
                  name: 'mind',
                  icon: 'smile',
                  path: '/editor/mind',
                  component: './editor/mind',
                },
                {
                  name: 'koni',
                  icon: 'smile',
                  path: '/editor/koni',
                  component: './editor/koni',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});

