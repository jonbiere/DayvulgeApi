const User = require('./server/db/models/user');

const fakeNames = [
  {
    name: 'Yoda',
    email: 'yoda@example.com',
    password: '1234',
    picture: 'http://static.comicvine.com/uploads/original/11113/111130081/3821766-2969176990-Yoda1.jpg',
  },
  {
    name: 'Lando Calrissian',
    email: 'lando@example.gov',
    password: '1234',
    picture: 'https://vignette3.wikia.nocookie.net/darth/images/a/ab/BillyDee.jpg/revision/latest?cb=20080201203945',
  },
  {
    name: 'Captain Kirk',
    email: 'captainkirk@example.gov',
    password: '1234',
    picture: 'http://13thdimension.com/wp-content/uploads/2016/07/xfrtoc70fgzg49ubheth.jpg',
  },
  {
    name: 'Dr. Who',
    email: 'drwho@example.gov',
    password: '1234',
    picture: 'https://mattcbr.files.wordpress.com/2006/09/hof002.jpg',
  },
  {
    name: 'Storm Trooper 074',
    email: 'st074@example.gov',
    password: '1234',
    picture: 'https://www.sideshowtoy.com/photo_902292_thumb.jpg',
  },
  {
    name: 'Darth Vader',
    email: 'vaded@example.gov',
    password: '1234',
    picture: 'https://www.flickeringmyth.com/wp-content/uploads/2015/04/1521964.jpg',
  },
  {
    name: 'Jabba the Hut',
    email: 'jh@example.gov',
    password: '1234',
    picture: 'http://a.dilcdn.com/bl/wp-content/uploads/sites/6/2016/06/jabba-the-hutt-portrait-tall.jpg',
  },
  {
    name: 'Joseph Cooper',
    email: 'jc@example.gov',
    password: '1234',
    picture: 'http://cdn2us.denofgeek.com/sites/denofgeekus/files/interstellar_1_1.jpg',
  },
  {
    name: 'Thanos',
    email: 'thanos@example.gov',
    password: '1234',
    picture: 'https://www.sideshowtoy.com/wp-content/uploads/2015/01/902322-product-feature-990x600.jpg',
  }
];

let createdPeeps = Promise.all(fakeNames.map(person => {
  console.log('person', person)
  return User.create({
    name: person.name,
    email: person.email,
    password: person.password,
    picture: person.picture
   })
   .then(user => user)
   .catch(err => {
     if (err){
       console.error(err)
     }
   })
}))

console.log('created your peeps!')

// let createOneUser = () => {
//   let person = fakeNames[0];
//   return User.create({
//     name: person.name,
//       email: person.email,
//       password: person.password,
//       picture: person.picture
//   })
//   .then(user => console.log(user))
// }

// createOneUser()
