function displayItem(item){

    let card = document.createElement("div")
    card.className= "card col"
    card.innerHTML= `
    <img src= ${item.imageLink} class= "card-img-top" alt= "${item.title}">
    <div class = "card-body">
         <h4 class = "card-title"> ${item.title} </h4>
         <p class = "card-text"> ${item.description} </p>
         <p class = "card-text">Ksh.${item.price} </p>
         <h5 class = "card-title">
           Stock<span> ${item.stock} </span>
         </h5>
         <div class = "buttons">
         <button id = 'buy'>BUY </button>
         <button id = 'delete'>Delete</button>
         </div>
     </div> 
    `

    card.querySelector('#buy').addEventListener('click', () => {
        item.stock -=1
        if (item.stock===0){
            alert("Hi, Not available!")
        }
        card.querySelector('span').textContent = item.stock

    })

    function updatePrice(itemPrice){
        fetch (`http://localhost:3000/items/${itemPrice.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(itemPrice)
        })
        .then(res => res.json())
        .then(item => console.log(item))
    }


// delete

card.querySelector('#delete').addEventListener('click', () => {
    card.remove()
    deleteItem(item.id)
})

function deleteItem(id){
    fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(item => console.log(item))
}

// adding elements to the DOM
document.querySelector("#div-samples").appendChild(card)
}

// fetching products

function getItems(){
    fetch ("http://localhost:3000/items")
    .then(res => res.json())
    .then(items=> {
        items.forEach(item => {
            displayItem(item)
        });
    })
}
getItems()

// fetch and display reviews
const init = () => {
    const inputForm =document.querySelector('form');
    inputForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const input = document.querySelector('input#searchByID');

        fetch(`http://localhost:3000/reviews/ ${input.value}`)
        .then(response=> response.json())
        .then(data =>{
            const title = document.querySelector('section#itemReviews h5')
            const comment = document.querySelector('section#itemReviews p')

            title.innerText = data.title;
            comment.innerText= data.comment;
        });
    });
}

document.addEventListener('DOMContentLoaded', init)
