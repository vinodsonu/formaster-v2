const endpoints = {
   signIn: '/login/v1',
   signUp:'/signup/v1',
   userPreview: ['/forms/', '/preview/v1/'],
   questionSubmit: ['/forms/', '/submit/'],
   forms:"/user_forms/v1/?limit=3&offset=0"
}

export default endpoints
