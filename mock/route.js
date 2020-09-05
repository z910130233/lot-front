export default {
  "/api/auth_routes": {
    "/form/advanced-form": {
      authority: ['admin', 'user'],
    },
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
        "authority": ['[admin]'],
        "routes": [
          {
            "path": "/admin/managementList",
            "name": "userManage"
          },
          {
            "path": "/admin/authorityManagement",
            "name": "authorityManagement"
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace"
          }
        ]
      },
      {
        "component": './404',
      },
    ]
  },
};
