// const resources =['network','disk','database']
const NO_DATA_AVAIL = 0;
const RESOURCE_CLOSED = 1;


// //Non-blocking I/O

// while (resources.length !== 0) {
//     console.log(resources)
//   for (let i = 0; i < resources.length; i++) {
//     let resource = resources[i]
//     console.log(resource)
//     //try to read
//     if (resource === NO_DATA_AVAIL)
//       //there is no data to read at the moment
//       continue;
//     if (resource === RESOURCE_CLOSED)
//       //the resource was closed, remove it from the list
//       resources.slice(i, i)

//     //some data was received, process it
//     else return resource;
//   }
//   console.log(resources)
// }

// Event Loop or Event Demultiplexer
const watchList = new Map();
watchList.set("network", "READ");
watchList.set("disk", "READ");
let events = [];

// console.log(watchList)

const demultiplexer = (event) => {
  if (event !== 0) {
    console.log(event);
  }
};

demultiplexer(watchList);
while ((events = demultiplexer(watchList))) {
  // Event Loop will only run if there are events CPU TIME SAVE
  for (event of events) {
    let data = event.resource.read();
    console.log(data);
    if (data === RESOURCE_CLOSED) {
      demultiplexer.event;
    } else {
      return data;
    }
  }
}
