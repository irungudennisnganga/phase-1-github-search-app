// making the DOM interactive after the DOM contente is loaded 

let searchBtn= document.getElementById('github-form')
let inputEl= document.getElementById('search')
let addLi=document.getElementById('user-list')
let addRepo=document.getElementById('repos-list')



document.addEventListener('DOMContentLoaded', ()=> {
 
    searchBtn.addEventListener('submit', (e)=> {
        e.preventDefault()
        inputEl=inputEl.value
        fetch(`https://api.github.com/search/users?q=${inputEl}`, {
            method:"GET",
            headers: {
                "content-Type" : "application/json",
                "Accept" : "application/vnd.github.v3+json"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data['items'])
            data['items'].forEach(element => {
                let newEl= document.createElement('div')
                newEl.innerHTML+=`
                    <h3>${element.login}</h3> <br> 
                    <img class="avatar" src=${element.avatar_url}><br> <br>
                    <a href=${element.url} target="blank" >Git Hub Account</a>
                `
                addLi.appendChild(newEl)
                console.log(element)
                let image=newEl.querySelector('.avatar')
                // console.log(image)
                image.addEventListener('click', ()=> {
                    console.log('clicked')
                    console.log(element.id)
                    
                    fetch(`https://api.github.com/users/${element.id}/repos`)
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        let newRepoLi=document.createElement('li')
                       
                           // console.log(element)
                           data.forEach(el => {
                            newRepoLi.innerHTML+=`
                            <p>Forks : ${el.forks}</p>`
                           })
                            
                       
                   
                    addRepo.appendChild(newRepoLi)
                    })
                })
            })
        })
        
        console.log
        
    })
})