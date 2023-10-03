const p = Promise.reject('reason for reject...');
p.catch(error => console.log(error))