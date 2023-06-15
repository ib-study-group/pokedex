import { getPokemon } from './getPokemon';

const getPokemonsListPromiseAll = async (amount: number) => {
  const promiseList = Array.from(Array(amount), (_, i) => getPokemon(i + 1));

  // const promiseList = [
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(1);
  //     }, 3000);
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(2);
  //     }, 6000);
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(3);
  //     }, 1000);
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject(4);
  //     }, 4000);
  //   }),
  // ];

  const data = await Promise.all(promiseList).then((values) => values);

  console.log({ data });

  return data;
};

const getPokemonsListPromiseAllSettled = async (amount: number) => {
  const promiseList = Array.from(Array(amount), (_, i) => getPokemon(i + 1));

  // const promiseList = [
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(1);
  //     }, 3000);
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(2);
  //     }, 6000);
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       resolve(3);
  //     }, 1000);
  //   }),
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       reject(4);
  //     }, 4000);
  //   }),
  // ];

  const data = await Promise.allSettled(promiseList)
    .then((results) => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Request ${index + 1} succeeded:`, result.value);
          // Handle the successful response here
        } else {
          console.log(`Request ${index + 1} failed:`, result.reason);
          // Handle the error here
        }
      });

      return results;
    })
    .catch((error) => {
      console.log('An error occurred while making requests:', error);
    });

  // Continue loading other parts of your application immediately
  console.log('Loading other content...');

  console.log({ data });
};

export { getPokemonsListPromiseAll as getPokemonsList };
