console.log('person1: shows ticket');
console.log('person2: shows ticket');

const preMovie = async () => {
  const promiseWifeBringingTickets = new Promise((resolve, reject) => setTimeout(() => resolve('ticket'), 3000));

  const getPopcorn = new Promise((resolve, reject) => resolve('popcorn'));

  const getButter = new Promise((resolve, reject) => resolve('butter'));
  
  const getColdDrinks = new Promise((resolve, reject) => resolve('cold drinks'));


  let ticket = await promiseWifeBringingTickets;
  console.log(`wife: I got the ${ticket}`);
  console.log('husband: we should go in');
  console.log('wife: no, I am hungry');
  
  let popcorn = await getPopcorn;
  console.log(`husband: purchases ${popcorn}`);
  console.log('wife: I need butter on my popcorn');
  
  let butter = await getButter;
  console.log(`husband: purchases ${butter}`);

  let coldDrinks = await getColdDrinks;
  console.log(`husband: purchases ${coldDrinks}`);
  
  return ticket;
}

preMovie().then((t) => {console.log(`person3: shows ${t}`)})

console.log('person4: shows ticket');
console.log('person5: shows ticket');