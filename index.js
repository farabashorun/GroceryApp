import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtimedatabase-86546-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")





addButtonEl.addEventListener("click", (event) => {
    let inputValue = document.getElementById("input-field").value;
    push(shoppingListInDB, inputValue);
    clearInput(inputValue)
    clearList()
  
        onValue(shoppingListInDB, (snapshot) => {
            if (snapshot.exists()){
            let itemsArray = Object.entries(snapshot.val())
            for (let i = 0; i < itemsArray.length; i++) {
                let currentItem = itemsArray[i]
                let currentItemID = currentItem[0]
                let currentItemValue = currentItem[1]
                generateList(currentItem)
            }
            } else { generateList()}
        })
})
    



const clearInput = (inputValue) =>{
    document.getElementById("input-field").value = " "
}

const clearList = () => {
    shoppingListEl.innerHTML = ""
}

const generateList = (currentItem,) => {
    let newEl = document.createElement("li")
    if (currentItem ) {
        newEl.textContent = currentItem[1]
    } else {
        newEl.textContent = "No items here... yet"
    }
    shoppingListEl.append(newEl)
    
        newEl.addEventListener("click", (event) => {
        let exactItemInDb = ref(database, `shoppingList/${currentItem[0]}`)
        remove(exactItemInDb)
        clearList()
        onValue(shoppingListInDB,(snapshot) => {
            if (snapshot.exists()){
                let itemsArray = Object.entries(snapshot.val())
                for (let i = 0; i < itemsArray.length; i++) {
                    let currentItem = itemsArray[i]
                    let currentItemID = currentItem[0]
                    let currentItemValue = currentItem[1]
                    generateList(currentItem)
                }
            } else { generateList()}
            })
         })

}







   