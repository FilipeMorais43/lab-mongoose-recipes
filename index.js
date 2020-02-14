const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    return self.connection.dropDatabase();
  })
  .then(x => {
    console.log(`Connected to the database: `);
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: 'Spaghetti Bolognese',
      level: 'Easy Peasy',
      ingredients: [
        'pasta',
        'red meat',
        'tomatoes',
        'cheese',
        'onions',
        'garlic',
        'olive oil',
        'oreganos',
        'salt',
        'pepper'
      ],
      cuisine: ['italian'],
      dishType: 'Dish',
      image: 'https://www.recipetineats.com/wp-content/uploads/2018/07/Spaghetti-Bolognese.jpg',
      duration: 60,
      creator: 'Luca Toni'
    });
  })
  .then(multipleRecipes => {
    console.log(multipleRecipes);
    return Recipe.insertMany(data);
  })
  .then(updateRecipes => {
    console.log(updateRecipes);
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(deleteRecipe => {
    console.log('sucess', deleteRecipe);
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(message => {
    console.log('Recipe deleted', message);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
