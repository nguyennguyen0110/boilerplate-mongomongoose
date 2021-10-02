require('dotenv').config();

//Import Mongoose and connect to MongoDB with URI store in secret
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Create Schema then Model
const personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  let Nguyen = new Person({name: 'Nguyen', age: 18, favoriteFoods: ['undefined']});
  Nguyen.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  /*
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
  */
  Person.insertMany(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, docs) => {
    if (err) return done(err);
    done(null, docs);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, doc) => {
    if (err) return done(err);
    done(null, doc);
  });
};

const findPersonById = (personId, done) => {
  //findById equals to find({_id: personId})
  Person.findById(personId, (err, doc) => {
    if (err) return done(err);
    done(null, doc);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, doc) => {
    if (err) return done(err);
    doc.favoriteFoods.push(foodToAdd);
    doc.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, doc) => {
    if (err) return done(err);
    done(null, doc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, doc) => {
    if (err) return done(err);
    done(null, doc);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  /*
  Person.remove({name: nameToRemove}, (err, docs) => {
    if (err) return done(err);
    done(null, docs);
  });
  */
  Person.deleteMany({name: nameToRemove}, (err, docs) => {
    if (err) return done(err);
    done(null, docs);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort('name').limit(2).select('-age').exec((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
