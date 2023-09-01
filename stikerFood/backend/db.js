const mongoose = require("mongoose");
const mongoURI= "mongodb+srv://parmanandprajapati006:dm3rQW8X0iJybovE@cluster1.ekozqql.mongodb.net/goFoodMern?retryWrites=true&w=majority"

mongoose.connect(mongoURI,{
   useNewUrlParser:true,
   useUnifiedTopology:true,

}).then(()=>{
  console.log('connection successful')

})
.catch((e)=>{
   console.log(`no connection ${e}`)
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

db.once('open', async () => {
  try {
    // Replace 'your-collection-name' with the actual name of the collection
    const collectionName = 'food_items';
    const collection = db.collection(collectionName);

    // Fetch all documents in the collection
    const data = await collection.find({}).toArray();
    // console.log('All documents:', allDocuments);
    global.food_items=data
    // console.log(global.food_items)
    const foodCategory= await db.collection("foodCategory").find({}).toArray();
    // console.log(foodCategory) 
    global.foodCategory=foodCategory
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
