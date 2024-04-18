import type { RouteRecordRaw } from 'vue-router'
import ACCESS_ENUM from '@/access/accessEnum'

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/user',
        name: '用户管理',
        component: () => import('@/layout/UserLayout.vue'),
        meta: {
            hidden: true,
            access: ACCESS_ENUM.NOT_LOGIN
        },
        children: [
            {
                path: '/user/login',
                name: '用户登录',
                component: () => import('@/views/user/UserLogin.vue'),
                meta: {
                    access: ACCESS_ENUM.NOT_LOGIN
                }
            },
            {
                path: '/user/register',
                name: '用户注册',
                component: () => import('@/views/user/UserRegister.vue'),
                meta: {
                    access: ACCESS_ENUM.NOT_LOGIN
                }
            }
        ]
    },
    {
        path: '/',
        name: '主页',
        component: () => import('@/views/question/QuestionsView.vue'),
        meta: {
            hidden: false,
            access: ACCESS_ENUM.NOT_LOGIN
        }
    },
    {
        path: '/questions',
        name: '浏览题目',
        component: () => import('@/views/question/QuestionsView.vue'),
        meta: {
            hidden: false,
            access: ACCESS_ENUM.NOT_LOGIN
        }
    },
    {
        path: '/view/question/:id',
        name: '在线做题',
        component: () => import('@/views/question/DoQuestionView.vue'),
        props: true,
        meta: {
            hidden: false,
            access: ACCESS_ENUM.USER
        }
    },
    {
        path: '/add/question',
        name: '创建题目',
        component: () => import('@/views/question/AddQuestion.vue'),
        meta: {
            hidden: false,
            access: ACCESS_ENUM.ADMIN
        }
    },
    {
        path: '/update/question',
        name: '修改题目',
        component: () => import('@/views/question/UpdateQuestion.vue'),
        meta: {
            hidden: true,
            access: ACCESS_ENUM.ADMIN
        }
    },
    {
        path: '/manage/question',
        name: '管理题目',
        component: () => import('@/views/question/ManageQuestion.vue'),
        meta: {
            hidden: false,
            access: ACCESS_ENUM.ADMIN
        }
    },
    {
        path: '/example',
        name: '示例',
        component: () => import('@/views/Example.vue'),
        meta: {
            hidden: true,
            access: ACCESS_ENUM.NOT_LOGIN
        }
    },
    {
        path: '/admin',
        name: '管理员',
        component: () => import('@/views/Admin.vue'),
        meta: {
            hidden: true,
            access: ACCESS_ENUM.ADMIN
        }
    },
    {
        path: '/hidden',
        name: '隐藏',
        component: () => import('@/views/Hidden.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/noAuth',
        name: '无权限',
        component: () => import('@/views/NoAuth.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/about',
        name: '关于我的',
        component: () => import('@/views/About.vue'),
        meta: {
            hidden: false,
            access: ACCESS_ENUM.USER
        }
    }
]
