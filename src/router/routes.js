
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DashboardPage.vue'), name: 'home' }
    ]
  },
  {
    path: '/Company',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CompanyDetail.vue') }
    ]
  },
  {
    path: '/companyStat',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StatisticPage.vue') }
    ]
  },
  {
    path: '/certificate/:id',
    component: () => import('pages/CertificatePage.vue')
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),

    children: [
      { path: '', name: 'login', component: () => import('pages/LoginPage.vue') }
    ]
  },
  {
    path: '/reset',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ResetPage.vue') }
    ],
    name: 'reset'
  },
  {
    path: '/resetpassword',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/changepassword',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ChangePasswordPage.vue') }
    ]
  },
  {
    path: '/survey',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SurveyPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
