
let toDoArray = [];


window.onload = function(){

    const button = document.getElementById("addButton");
    button.addEventListener("click",addToDoList);
    
    toDoArray = fetchFromLocalStorage();
    loadToDoList();


    //function to add list of items
    function addToDoList(){
        let toDoItem = {};
        const checkBoxValue = document.getElementById("doneCheckBox").checked;
        const textBoxValue = document.getElementById("itemDescription").value;
       
                    toDoItem.description = textBoxValue;
                    toDoItem.checked = checkBoxValue;
                    toDoArray.push(toDoItem);
                    console.log(toDoArray);
                    saveToLocalStorage();
            
                loadToDoList();
    }

    function saveToLocalStorage(){
        const toDoListString = JSON.stringify(toDoArray);
        localStorage.setItem("toDoListString",toDoListString);
        return;
    }

    function fetchFromLocalStorage(){
        return JSON.parse(localStorage.getItem("toDoListString"));
    }

    function loadToDoList(){
        let array = fetchFromLocalStorage();
        const orderedList = document.getElementById("listOfItems");
        orderedList.innerHTML = "";
        for(var i=0;i<array.length;i++){
            let description = array[i].description;
            let checked = array[i].checked;
            let listItem = document.createElement('li');
            if(checked){
                listItem.innerHTML = `<label><s>${description}</s></label>
                                      <button id="${description}">Delete</button>
                `;
                let item = document.getElementById(description);
                item.addEventListener("click",deleteAnItem(this));
            } else {
                listItem.innerHTML = `<label>${description}</label>   
                <label for="${description}"><input type="checkbox" id="${description}">Mark this as Done</label>
                `;
                document.getElementById(description).addEventListener("click",markAnItemAsDone(this));

            }
            orderedList.appendChild(listItem);
        }
    
    }

    function markAnItemAsDone(clickButton){
        for(var i=0;i<toDoArray.length;i++){
            console.log(toDoArray[i].description);
            console.log(toDoArray[i].checked);
            if(toDoArray[i].description === clickButton.id){
                toDoArray[i].checked = true;
                break;
            }
        }
        saveToLocalStorage();
        loadToDoList();
    }


    function deleteAnItem(deleteButton){
        for(var i=0;i<toDoArray.length;i++){
            console.log(toDoArray[i].description);
            console.log(toDoArray[i].checked);
            if(toDoArray[i].description === deleteButton.id){
                toDoArray.splice(i,1);
                break;
            }
        }
        saveToLocalStorage();
        loadToDoList();

    }

}
    


