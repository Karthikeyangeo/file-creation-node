
const express = require('express');
const req = require('express/lib/request');
const fs = require('fs');   // fs stands for File System

const app = express();
//third party middleware

app.get("/",(req,res)=>{
    
    res.send(`<button onclick="window.location.href='/create'">Click to create file</button>`);

})
app.get("/create",(req,res)=>{
    let {file_name,html_data} = CreateFile();
    let allFiles = ReadDirectory(); 
    // ReadDirectory()
    res.type('text/html')
    res.write(`<script>alert("File Created as ${file_name}.txt ") </script>`);
    res.write(`File Created Successfully  <br/> ${html_data}<br/><br/>`);
    
    // res.write(`${allFiles}`)
    res.write(`<button onclick="window.location.href='/create'">Click to create another file</button>`);
    console.log(`consoling in get ${allFiles}`)
    res.write(`<br/><br/>File List <br/>${allFiles}`)       // returning undefined
    res.end();
    console.log('File Created')
})

// const PORT =  5000;
// app.listen(PORT, ()=>{console.log(`Server started at ${PORT}`)});

const PORT = process.env.PORT || 5001;
//Heroku dynamically assigns your app a port, so you can't set the port to a fixed number. 
// Heroku adds the port to the env, so you can pull it from there.
app.listen(PORT, ()=>{console.log(`Server started at ${PORT}`)});




function CreateFile(){
    const date = new Date().toString();     // to get the full current date_time and convert it to string 
    const date_array = date.split(' ');     // to split the date string to array based on space
    const day = date_array[0];               // to get the day from the date array    
    const time = date_array.slice(4,5).join('');    // to extract the time only 
    const full_time = date_array.slice(4).join(' ');    // to extract the time with GMT 
    const full_date = date_array.slice(1,4).join('_');  // to extract the date from the date array 


    const text_data =`Date : ${full_date.split('_').join(' ')}\nDay : ${day}\nTime: ${full_time}`;   // to create the data using the extracted details
    const html_data =`Date : ${full_date.split('_').join(' ')}<br/>Day : ${day}<br/>Time: ${full_time}`;   // to create the data using the extracted details
    const file_name = `${full_date}_${time.split(':').join('_')}`;      // file name string contains the date and time seperated by '_'
    console.log(full_date)
    console.log(time);

    fs.writeFile(`./Files/${file_name}.txt`,text_data,(err)=>{
        console.log('File created');
    })

    return {file_name,html_data};
}

function ReadDirectory(){

    
    //To read all the files from the directory 
    let tempFile 
    fs.readdir('./Files',(err,files)=>{
        if (err)
            console.log(err);
        else {
            console.log("\nCurrent directory filenames:");
            // files.forEach(file => {
            // console.log(file);
            // })
            // console.log(files)
            let full_files  = files.join(' ');       // to append the file name as string 
            tempFile =full_files;
            console.log('tempFiles',tempFile)
            console.log('fullfiles',full_files)
            return full_files;
        }
        })
    console.log(`console before return `,tempFile)
    return tempFile
}
