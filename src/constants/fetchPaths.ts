
export const FETCH_PATHS = {
  contacts: 'https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json',
  groups:   'https://fs.gcfiles.net/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json',
  // contacts: 'https://fs.getcourse.ru/fileservice/file/download/a/177331/sc/280/h/3f9021c6ea91fc0306ceb0e9c2f2e56c.json',  // fetch CORS error at https://fs.getcourse.ru
  // groups:   'https://fs.getcourse.ru/fileservice/file/download/a/177331/sc/398/h/e6c614d4c59fd9b546fb5abdfb456dd5.json',  // fetch CORS error at https://fs.getcourse.ru
}


export const MOCK_FOLDER = 'src/__data__';
const mockPrefix = '/src/__data__/';

export const FETCH_PATHS_MOCK = {
  contacts: mockPrefix + 'contacts.json',
  groups: mockPrefix + 'group-contacts.json',
}
