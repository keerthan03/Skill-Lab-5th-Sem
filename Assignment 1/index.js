const express=require('express')
const bodyParser=require('body-parser')
const {v4:uuidv4}=require('uuid')

const app=express();
const PORT=process.env.PORT||3500;

const blog_database={}

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

app.post('/blog',(req,res)=>{
    const {authname,pwd,content}=req.body;
    if(authname&&pwd&&content){
        const id=uuidv4();
        blog_database[id]={authname,pwd,content}
        res.send(`Thankyou ${authname}! Your Blog with ID: ${id}, has been successfully saved!`);
    }
    else{
        res.status(400).send(`Sorry ${authname}! Your Blog couldn't be saved!`);
    }
});

app.get('/blog/:id',(req,res)=>{
    const {id}=req.params;
    const blog=blog_database[id]||blog_database[req.query.id]
    if(blog){
        res.send(`
        <h1>${blog.authname}'s Blog:</h1>
        <p>${blog.content}</p>
        `);
    }
    else{
        res.status(404).send("Blog was not found!")
    }
});

app.get('/blog', (req, res) => {
    const id = req.query.id;
    const blog = blog_database[id];
    if (blog) {
        res.send(`
            <h1>${blog.authname}'s Blog:</h1>
            <p>${blog.content}</p>
        `);
    } else {
        res.status(404).send("Blog was not found!");
    }
});

app.listen(PORT,()=>{
    console.log(`Server running at: http://localhost:${PORT}`);
});