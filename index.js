const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const {v4 :uuidv4}=require("uuid");
const methodOverride=require("method-override");
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));


let posts=[
    {
        id :uuidv4(),
        username :"krishna",
        content :"success is achieve by hardworking"
    },
    {
        id :uuidv4(),
        username :"krishnaKumar",
        content :"success is achieve by hardworking and smartworking"
    },
    {
        id :uuidv4(),
        username :"apnacollege",
        content :"success is achieve by both hardworking & smartworking"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs",{ posts });
});

app.get("/posts/new",(req,res)=>{//for adding new post rediret to new page that fill username and content
   res.render("new.ejs");
});
    //post request
app.post("/posts",(req,res)=>{//for adding new post
    let id=uuidv4();
    let {username,content}=req.body;
    posts.push({id,username,content});//add to array 
   // res.send("Post request working properly");
   res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{//show posts in details
   let {id}=req.params;
   let post=posts.find((p)=>id===p.id);
  // console.log(post);
   res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{//update specific post
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);//chech if post avalible or not 
    post.content=newContent;
    console.log(port);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

//for delete any post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});