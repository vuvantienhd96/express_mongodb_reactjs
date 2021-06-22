const mongoose = require('mongoose');

module.exports =  async () => {
    try {
        const connectionParams = {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true 
        };
        await mongoose.connect(
            "mongodb://localhost:27017/todo-app",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true 
            }
        );
        console.log("Connected to database");
    }catch(e){
        console.log("could not connect to databse", e);
    }
}