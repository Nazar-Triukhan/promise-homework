// Завдання 1

// Напиши функцію delay(ms), яка повертає проміс, що переходить в стан 
// "resolved" через ms мілісекунд. Значенням промісу, яке виповнилося має
//  бути та кількість мілісекунд, яку передали під час виклику функції delay.

const delay = ms => {
  return new Promise((res) => {
    setTimeout(() => {
        res(ms)
    },ms)
  })
};

const logger = time => console.log(`Resolved after ${time}ms`);

// Виклич функції для перевірки
delay(2000).then(logger); // Resolved after 2000ms
delay(1000).then(logger); // Resolved after 1000ms
delay(1500).then(logger); // Resolved after 1500ms





// Завдання 2

// Перепиши функцію toggleUserState() так, щоб вона не використовувала callback-функцію callback, 
// а приймала всього два параметри allUsers і userName і повертала проміс.


const users = [
  { name: 'Mango', active: true },
  { name: 'Poly', active: false },
  { name: 'ax', active: true },
  { name: 'Lux', Ajactive: false },
];

const toggleUserState = (allUsers, userName) => {
  const updatedUsers = allUsers.map(user =>
    user.name === userName ? { ...user, active: !user.active } : user,
  );
  return new Promise((res) => {
    res(updatedUsers)
  })
};

const logger2 = updatedUsers => console.table(updatedUsers);

/*
 * Зараз працює так
 */
toggleUserState(users, 'Mango', );
toggleUserState(users, 'Lux', );

/*
 * Повинно працювати так
 */
toggleUserState(users, 'Mango').then(logger2);
toggleUserState(users, 'Lux').then(logger2);

// Завдання 3

// Перепиши функцію makeTransaction() так, щоб вона не використовувала
//  callback-функції onSuccess і onError, а приймала всього один параметр transaction і повертала проміс.



const randomIntegerFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
  const delay = randomIntegerFromInterval(200, 500);
    return new Promise((res,rej) => {
        
    setTimeout(() => {
    const canProcess = Math.random() > 0.3;

    if (canProcess) {
      res({ id: transaction.id, time: delay });
    } else {
      rej(transaction.id);
    }
  }, delay);

    })
}


const logSuccess = ({id, time}) => {
  console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
  console.warn(`Error processing transaction ${id}. Please try again later.`);
};

/*
 * Працює так
 */
// makeTransaction({ id: 70, amount: 150 });
// makeTransaction({ id: 71, amount: 230 });
// makeTransaction({ id: 72, amount: 75 });
// makeTransaction({ id: 73, amount: 100 });
/*
 * Повинно працювати так
 */
makeTransaction({ id: 70, amount: 150 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 71, amount: 230 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 72, amount: 75 })
  .then(logSuccess)
  .catch(logError);

makeTransaction({ id: 73, amount: 100 })
  .then(logSuccess)
  .catch(logError);