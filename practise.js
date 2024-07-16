const express= require('express');
const bodyParser=require('body-parser');
const app=express();
app.use(express.json());
app.use(bodyParser.json());
const port=5000;
function book(id,title,author,year)
{
    this.id=id;
    this.title=title;
    this.author=author;
    this.year=year;
}
 const x1=new book(11,'Spare','J.R.Moehringer',2023);
 const x2=new book(12,'As Good As My Word','KM Chandrashekhar',2022);
 const x3=new book(13,'AgniSiragugal','APJ',2021)
 const x4=new book(14,'Origin of Species','Charles Darwin',2024);
 const books=[x1,x2,x3,x4];
 
 app.get('/books',(req,res)=>
{
    res.status(201).json(books);
});

app.get('/books/:id',(req,res)=>
{
    const id=parseInt(req.params.id);
    const bookindex=books.findIndex(book=>book.id==id);
    if(bookindex!==-1)
    {
         res.status(202).json(books[bookindex]);
    }
    else
    {
        res.status(404).json("id not found");
    }
})

app.post('/books',(req,res)=>
{
    const {id,title,author,year}=req.body;
    books.push({id,title,author,year});
    return res.status(203).json("new book was added");
})

app.put('/books/:id',(req,res)=>
{
    const id=parseInt(req.params.id);
    const {title,author,year}=req.body;
    const bookindex=books.findIndex(book=>book.id==id);
    if(bookindex!==-1)
    {
        books[bookindex]={id,title,author,year};
         return res.status(204).json(`book with id:${id} was updated`);
    }
    else
    {
         return res.status(404).json("id not found");
    }
})
 
app.delete('/books/:id',(req,res)=>
{
    const id=parseInt(req.params.id);
    const bookindex=books.findIndex(book=>book.id==id);
    if(bookindex!==-1)
    {
        books.splice(bookindex,1);
        res.json(`book with id:${id} was deleted`);
        res.status(204).json();
    }
    else
    {
        return res.status(404).json("id not found");
    }
})
 app.listen(port,()=>
{
    console.log(`server is running on port:${port}`);
})