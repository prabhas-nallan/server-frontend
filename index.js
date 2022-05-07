let container=document.getElementById('container')
async function fetchData(){
    let url="http://localhost:4000/getdata";
    let response=await fetch(url);
    let data=await response.json();
    console.log(data);
    data.map((ele)=>{
        const {name,rollno,branch}=ele;
        console.log(name,rollno,branch);
        container.innerHTML+=`
        <h1>Name : ${name}</h1>
        <h1>Rollno : ${rollno}</h1>
        <h1>Branch : ${branch}</h1>
        <hr>
        `
    })
}
function addData(){
    const name=document.getElementById('name').value;
    const rollno=document.getElementById('rollno').value;
    const branch=document.getElementById('branch').value;
    const obj={
        name:name,
        rollno:rollno,
        branch:branch
    }
    fetch("http://localhost:4000/addemp",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(obj)
    }).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}
