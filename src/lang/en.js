export default {
  storeType: {
    single: 'Single',
    chain: 'Chain'
  },
  country: {
    cn: 'China',
    sg: 'Singpore'
  },
  common: {
    add: 'Add',
    cancel: 'Cancel',
    confirm: 'Confirm',
    delete: 'Delete',
    edit: 'Edit',
    saveDraft: 'Save Draft',
    actions: 'Actions',
    noStore: 'No Store',
    signup: 'Sign-up',
    phoneNumber: 'Phone',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    license: 'License',
    storeType: 'Restaurant Type',
    branchName: 'Branch Name',
    description: 'Description',
    address: 'Address',
    address1: 'Address',
    address2: 'Address2',
    district: 'District',
    city: 'City',
    state: 'State',
    country: 'Country',
    zipcode: 'Postal Code',
    contact: 'Contact',
    web: 'Webpage',
    facebook: 'Facebook',
    yelp: 'Yelp'
  },
  route: {
    dashboard: 'Dashboard',
    // currentOrder: 'Orders',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directive Permission',
    assignPermission: 'Assign Permission',
    icons: 'Icons',
    components: 'Components',
    menu: 'Menu Management',
    product: 'Product Management',
    user: 'User Management',
    store: 'Store Management',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    Table: 'Table',
    Product: 'Product Management',
    User: 'User Management',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Article List',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link'
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Theme',
    size: 'Global Size'
  },
  login: {
    title: 'Login',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !'
  },
  signup: {
    title: 'User Sign-up',
    cancel: 'Canel',
    username: 'Account',
    password: 'Password',
    name: 'Name',
    displayName: 'Display Name'
  },
  storedetail: {
    add: 'Add New Restaurant',
    delete: 'Remove Restaurant',
    name: 'Name',
    displayName: 'Display Name',
    search: 'Input store name or display name to search',
    check: 'Detail',
    title: 'Restaurant Detail',
    status: 'Current Status',
    create: 'Create',
    chooseStoreType: 'Please choose'
  },
  user: {
    addRole: 'New Role',
    editPermission: 'Edit Permission',
    roles: 'Your current role',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
    role: 'Role',
    name: 'Name',
    username: 'UserName',
    ts: 'Date',
    search: 'Input username or name to search',
    addUser: 'Add User',
    deleteUsers: 'Delete Users'
  },
  documentation: {
    documentation: 'Documentation',
    github: 'Github Repository'
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit Permission',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases it is not suitable to use v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide'
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.'
  },
  table: {
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  menu: {
    name: 'Name',
    description: 'Description',
    rating: 'Rating',
    category: 'Category',
    search: 'Search',
    price: 'Price',
    listPrice: 'List Price',
    addCategory: 'Add Category',
    add: 'Add Dish',
    export: 'Export',
    reviewer: 'Reviewer',
    id: 'Id',
    date: 'Update Time',
    author: 'Modifier',
    orders: 'Orders',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction'
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)'
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)'
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.'
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.'
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All'
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo'
  }
}
