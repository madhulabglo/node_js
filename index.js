const fs = require("fs")
const express = require("express")
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());


app.get("/patient",(req,res)=>{
    const data = fs.readFileSync("./data.json","utf-8")
    res.send(JSON.parse(data))
})

app.post("/patient",(req,res)=>{
    const newData = req.body
    const data = fs.readFileSync("./data.json")
    const all_data = JSON.parse(data)
    const newId = all_data.data.map((ele)=>ele.id)
    const last_element = newId.slice(-1)
    const unquie_id = parseInt(last_element)+1
    newData.id = unquie_id
    all_data.data.push(newData)
    fs.writeFileSync("./data.json",JSON.stringify(all_data))
    res.status(201).json({message:"Data added successfully",data:newData})
})

app.get("/patient/:id",(req,res)=>{
    const id = req.params.id
    const data = fs.readFileSync("./data.json")
    const all_data = JSON.parse(data)
    const check = all_data?.data.find((val)=>val.id === parseInt(id))
    if(check){
        res.status(201).json({data:check})
    }
    else{
        res.send("error")

    }
})

app.put("/patient/:id",(req,res)=>{
    const id = req.params.id
    const data = fs.readFileSync("./data.json")
    const all_data = JSON.parse(data)
    const updatedData = req.body
    let fill = all_data?.data.find((ele)=>parseInt(ele.id) === parseInt(id))
    if(fill){
        fill.hospital_name = updatedData.hospital_name;
        fill.patient_count = updatedData.patient_count;
        fill.location = updatedData.location;
        fs.writeFileSync('./data.json', JSON.stringify(all_data));
            res.status(201).json({message:"Data updated Successfully",data:updatedData});
          } else {
            res.status(404).json({ message: `Data with ID ${id} not found` });
          }

})


app.delete("/patient/:id",(req,res)=>{
    const id = req.params.id
    const data = fs.readFileSync("./data.json")
    const all_data = JSON.parse(data)
    let fill = all_data.data.find((ele)=>ele.id === parseInt(id))
    if(fill){
        const index = all_data.data.indexOf(fill);
        all_data.data.splice(index,1)
        fs.writeFileSync("./data.json",JSON.stringify(all_data))
        res.status(201).json({message:"data deleted successfully"})
    }
})



PORT = 7000;
app.listen(PORT,()=>{
    console.log(`server Listening on port --> ${PORT} `);
})
