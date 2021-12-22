const savedProjects = ['0x004322', '0x004323'];
const acquiredProjects = ['0x004321'];
const myProjects = ['0x004324'];

const allProjects = [
   {
    id: '0x004321',
    name: 'information system',
    status: 'in review',
    resources: 10,
    price: 550,
    provider: '',
    complicity: 0,
    startDate: new Date(),
    deadline: new Date(),
    offers: 0,
   },
   {
    id: '0x004322',
    name: 'accounting system',
    status: 'in review',
    resources: 37,
    price: 300,
    provider: '',
    complicity: 30,
    startDate: new Date(),
    deadline: new Date(),
    offers: 75,
   },
   {
    id: '0x004323',
    name: 'banking software',
    status: 'in progress',
    resources: 8,
    price: 220,
    provider: '',
    complicity: 100,
    startDate: new Date(),
    deadline: new Date(),
    offers: 88,
   },
   {
    id: '0x004324',
    name: 'automation factory',
    status: 'design',
    resources: 15,
    price: 190,
    provider: '',
    complicity: 0,
    startDate: new Date(),
    deadline: new Date(),
    offers: 20,
   },
];

const sortedProjects = {
  saved: savedProjects,
  acquired: acquiredProjects,
  my: myProjects,
};

export {
  sortedProjects,
  allProjects,
  myProjects,
}
