export default {
  "/api/auth_routes": {
    "/form/advanced-form": {
      authority: ['admin', 'user'],
    },
  },

  "GET /api/examples": {
    "routes": [
      // {
      //   "path": "/user",
      //   "name": null,
      //   "icon": null,
      //   "component": "../layouts/UserLayout",
      //   "authority": null,
      //   "redirect": null,
      //   "children": [
      //     {
      //       "path": "/user/login",
      //       "name": "login",
      //       "icon": null,
      //       "component": "./user/login",
      //       "authority": null,
      //       "redirect": null,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "path": "/admin",
      //   "name": "admin",
      //   "icon": "crown",
      //   "component": null,
      //   "authority": [
      //     "[admin]",
      //     "[user]"
      //   ],
      //   "redirect": null,
      //   "children": [
      //     {
      //       "path": "/admin/managementList",
      //       "name": "userManage",
      //       "icon": "solution",
      //       "component": "./management",
      //       "authority": [
      //         "[admin]"
      //       ],
      //       "redirect": null,
      //       "children": []
      //     },
      //     {
      //       "path": "/admin/authorityManagement",
      //       "name": "authorityManagement",
      //       "icon": "tool",
      //       "component": "./authorityManagement",
      //       "authority": [
      //         "[admin]"
      //       ],
      //       "redirect": null,
      //       "children": []
      //     }
      //   ]
      // },
      // {
      //   "path": "/demand",
      //   "name": "demand",
      //   "icon": "block",
      //   "component": null,
      //   "authority": [
      //     "[admin]"
      //   ],
      //   "redirect": null,
      //   "children": [
      //     {
      //       "path": "/demand/demandRequest",
      //       "name": "demandRequest",
      //       "icon": "experiment",
      //       "component": "./demandRequest",
      //       "authority": null,
      //       "redirect": null,
      //       "children": []
      //     },
      //     {
      //       "path": "/demand/demand",
      //       "name": "demand",
      //       "icon": "fundView",
      //       "component": "./demand",
      //       "authority": null,
      //       "redirect": null,
      //       "children": []
      //     }
      //   ]
      // },
      {
        "path": "/other",
        "name": "other",
        "icon": "nodeIndex",
        "authority": [
          "[admin]"
        ],
        "children": [
          {
            "path": "/other/OtherIndex",
            "name": "OtherIndex",
            "icon": "setting",
            "component": "./other",
            "children": []
          }
        ]
      },
      // {
      //   "path": "/editor",
      //   "name": "editor",
      //   "icon": "highlight",
      //   "component": null,
      //   "authority": null,
      //   "redirect": null,
      //   "children": [
      //     {
      //       "path": "/editor/flow",
      //       "name": "flow",
      //       "icon": "smile",
      //       "component": "./editor/flow",
      //       "authority": null,
      //       "redirect": null,
      //       "children": []
      //     },
      //     {
      //       "path": "/editor/mind",
      //       "name": "mind",
      //       "icon": "smile",
      //       "component": "./editor/mind",
      //       "authority": null,
      //       "redirect": null,
      //       "children": []
      //     },
      //     {
      //       "path": "/editor/koni",
      //       "name": "koni",
      //       "icon": "smile",
      //       "component": "./editor/koni",
      //       "authority": null,
      //       "redirect": null,
      //       "children": []
      //     }
      //   ]
      // },
      {
        "path": "",
        "name": "",
        "icon": "",
        "component": "./404",
        "authority": "",
        "redirect": "",
        "children": []
      }
    ]
  },


  "GET /api/example": {
    "routes": [
      {
        "path": "/user",
        "component": "../layouts/UserLayout",
        "children": [
          {
            "name": "login",
            "path": "/user/login",
            "component": "./user/login",
          },
        ],
      },
      {
        "path": "/admin",
        "name": "admin",
        "icon": "smile",
        "authority": ["[admin]"],
        "children": [
          {
            "path": "/admin/managementList",
            "name": "userManage",
            "icon": "highlight",
            "authority": ["[admin]"],
          },
          {
            "path": "/admin/authorityManagement",
            "name": "authorityManagement",
            "authority": ["[admin]"],
            "createTime": '2020',
          }
        ]
      },
      {
        "path": "/resources",
        "name": "resources",
        "icon": "gold",
        "component": "",
        "authority": ["[admin]"],
        "children": [
          {
            "routesId": "2020091011",
            "path": "/resources/resourcesManage",
            "name": "resourcesManage",
            "icon": "car",
            "component": "./resourcesManage",
            "authority": null,
            "redirect": null,
            "pId": "2020091010",
            "children": []
          },
          {
            "routesId": "2020091012",
            "path": "/resources/homePage",
            "name": "resources_index",
            "icon": "partition",
            "component": "./resources",
            "authority": null,
            "redirect": null,
            "pId": "2020091010",
            "children": []
          },
          {
            "routesId": "2020091013",
            "path": "/resources/ResourcesShortcutAmend",
            "name": "resources_ResourcesShortcutAmend",
            "icon": "frown",
            "component": "./resourcesShortcutAmend",
            "authority": null,
            "redirect": null,
            "pId": "2020091010",
            "children": []
          },
          {
            "routesId": "2020091014",
            "path": "/resources/rotationChart",
            "name": "rotationChart_index",
            "icon": "fileImage",
            "component": "./rotationChart",
            "authority": null,
            "redirect": null,
            "pId": "2020091010",
            "children": []
          },
          {
            "routesId": "2020091015",
            "path": "/resources/freightIndex",
            "name": "freightIndex",
            "icon": "car",
            "component": "./freightManage",
            "authority": null,
            "redirect": null,
            "pId": "2020091010",
            "children": []
          },
          {
            "routesId": "2020091016",
            "path": "/resources/noticeIndex",
            "name": "noticeIndex",
            "icon": "bell",
            "component": "./notice",
            "authority": null,
            "redirect": null,
            "pId": "2020091010",
            "children": []
          }
        ]
      },

      {
        "path": "/other",
        "name": "other",
        "icon": "nodeIndex",
        "authority": ["[admin]"],
        "children": [
          {
            "path": "/other/OtherIndex",
            "name": "OtherIndex",
            "icon": "setting",
            "component": "./other",
          }
        ]
      },
      {
        "path": "/editor",
        "name": "editor",
        "icon": "highlight",
        "children": [
          {
            "path": "/editor/flow",
            "name": "flow",
            "icon": "highlight",
            "component": "./editor/flow",
          },
          {
            "path": "/editor/mind",
            "name": "mind",
            "icon": "smile",
            "component": "./editor/mind",
          },
          {
            "path": "/editor/koni",
            "name": "koni",
            "icon": "smile",
            "component": "./editor/koni",
          }
        ]
      },
      {
        "component": './404',
      },
    ]
  },


};
