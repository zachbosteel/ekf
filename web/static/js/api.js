function baseRequest(route, verb, data = null, prefix = true) {
  const ROUTE_PREFIX = '/api';
  const requestData = {
    method: verb,
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': TOKEN,
    },
    credentials: 'same-origin',
  };
  if (data) {
    requestData.body = JSON.stringify(data);
  }

  let url = route;
  if (prefix) {
    url = `${ROUTE_PREFIX}${route}`;
  }
  return fetch(url, requestData).then((resp) => {
    return resp.json();
  });
}


const api = {
  // SESSIONS
  // POST session
  createSession: (data) => {
    baseRequest('/sessions', 'POST', data)
  },
  // DELETE session
  deleteSession: (data) => {
    baseRequest('/sessions', 'DELETE', data)
  },
  // POST refresh session
  refreshSession: (data) => {
    baseRequest('/sessions/refresh', 'POST', data)
  },
  // POST verify session
  verifySession: (data) => {
    baseRequest('/sessions/verify', 'POST', data)
  },


  // EMAIL
  // POST email
  postEmail: (data) => {
    baseRequest('/email', 'POST', data)
  },


  // USERS
  // POST users
  postUsers: (data) => {
    baseRequest('/users', 'POST', data)
  },

  // IMAGES
  // GET images
  getImages: () => {
    baseRequest('/images', 'GET');
  },
  // GET image
  getImage: (id) => {
    baseRequest(`/images/${id}`, 'GET');
  },
  // POST image
  postImage: (data) => {
    baseRequest('/images', 'POST', data);
  },
  // PATCH image
  patchImage: (id, data) => {
    baseRequest(`/images/${id}`, 'PATCH', data);
  },
  // DELETE image
  deleteImage: (id) => {
    baseRequest(`/images/${id}`, 'DELETE');
  },
  // GET gallery images
  getGalleryImages: () => {
    baseRequest('/images/gallery', 'GET');
  },


  // TEXTS
  // GET texts
  getTexts: () => {
    baseRequest('/texts', 'GET');
  },
  // GET text
  getText: (id) => {
    baseRequest(`/texts/${id}`, 'GET');
  },
  // POST text
  postText: (data) => {
    baseRequest('/texts', 'POST', data);
  },
  // PATCH text
  patchText: (id, data) => {
    baseRequest(`/texts/${id}`, 'PATCH', data);
  },
  // DELETE text
  deleteText: (id) => {
    baseRequest(`/texts/${id}`, 'DELETE');
  },


  // STATIC PAGES
  // GET static pages
  getStaticPages: () => {
    baseRequest('/static_page', 'GET');
  },
  // GET static page
  getStaticPage: (id) => {
    baseRequest(`/static_page/${id}`, 'GET');
  },
  // POST static page
  postStaticPage: (data) => {
    baseRequest('/static_page', 'POST', data);
  },
  // PATCH static page
  patchStaticPage: (id, data) => {
    baseRequest(`/static_page/${id}`, 'PATCH', data);
  },
  // DELETE static page
  deleteStaticPage: (id) => {
    baseRequest(`/static_page/${id}`, 'DELETE');
  },


  // CLASS PAGES
  // GET class pages
  getClassPages: () => {
    baseRequest('/class_page', 'GET');
  },
  // GET class page
  getClassPage: (id) => {
    baseRequest(`/class_page/${id}`, 'GET');
  },
  // POST class page
  postClassPage: (data) => {
    baseRequest('/class_page', 'POST', data);
  },
  // PATCH class page
  patchClassPage: (id, data) => {
    baseRequest(`/class_page/${id}`, 'PATCH', data);
  },
  // DELETE class page
  deleteClassPage: (id) => {
    baseRequest(`/class_page/${id}`, 'DELETE');
  },


  // INSTRUCTOR PAGES
  // GET instructor pages
  getInstructorPage: () => {
    baseRequest('/instructor_page', 'GET');
  },
  // GET image
  getInstructorPage: (id) => {
    baseRequest(`/instructor_page/${id}`, 'GET');
  },
  // POST image
  postInstructorPage: (data) => {
    baseRequest('/instructor_page', 'POST', data);
  },
  // PATCH image
  patchInstructorPage: (id, data) => {
    baseRequest(`/instructor_page/${id}`, 'PATCH', data);
  },
  // DELETE image
  deleteInstructorPage: (id) => {
    baseRequest(`/instructor_page/${id}`, 'DELETE');
  },
};


export { baseRequest, api }
