const mongoose=require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/women`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.log("Error:", err);
});

const userSchema=new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    trustedContacts:[
        {
            name:{type:String},
            email:{type:String},
            phone:{type:String}
        }
    ],

});
const User = mongoose.model('User', userSchema);

const lawSchema=new mongoose.Schema({
    title:{type:String,require:true},
    section:{type:String},
    description: { type: String, required: true },
     category: { type: String, enum: ['Physical Abuse', 'Harassment', 'Dowry', 'Other'], default: 'Other' },
     link:{type:String},
});
const Law=mongoose.model('Law',lawSchema);

module.exports={User,Law};