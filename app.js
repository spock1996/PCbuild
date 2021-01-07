// === work todo list project === //



let intel3 = [];
let intel5 = [];
let pcNumber = 0;



// load data from json file
function loadData(cpuNum) {
    // create hmlhttprequest
    const xhr = new XMLHttpRequest();
    
    // open
    xhr.open("GET", "tasks.json", true);

    // load tasks from tasks.json and check if cpu is I3 or I5
    // then push the tasks to right aray
    xhr.onload = function() {
        if(this.status === 200) {
            const tasks = JSON.parse(this.responseText)
            // check if cpu is I3 or I5
            // then push to right aray
            // than call the AddtoList class and add to right list
            if(cpuNum === 3) {
                tasks.tasks.intelI3.forEach(e => {
                    intel3.push(e)
                })
                // call the ui class and add to the right list
                const ui = new UI();
                // addToList metod requers the arrey, the list number and the text to display as a <h3>element</h3>
                ui.addToList(intel3, 1, "Intel I3");
            } 
            else if(cpuNum === 5) {
                tasks.tasks.intelI5.forEach(e => {
                    intel5.push(e)
                })
                // call the ui class and add to the right list
                const ui = new UI()
                ui.addToList(intel5, 2, "Intel I5");
            }
        }
    }
    xhr.send()
}




class GetTasks {
    // call loadData function and fech tasks from tasks.json
    /* the cpuNum atribut is the cpu type in number value 
        and it can be: 3 or 5*/
    getTask(cpuNum) {
        loadData(cpuNum);
        pcNumber += 1;
    }
};




class UI {
    // select the list and add tasks on it
    addToList(arr, listNumber, cpuType) {
        // if you click intel3 btn list1 is selested and vice versa
        const list = document.getElementById(`list${listNumber}`)
        //create table element to add tasks in
        const table = document.createElement("table")
        table.innerHTML = `<div class = "inputs-container">
        <h3>${cpuType} PC ${pcNumber}</h3>
        <div class="move-top">
        <label>Name</label>
        </div>
        <input type= "text" >
        <div class="move-top">
        <label>Connector Number</label>
        </div>
        <input type= "text" >
        <div class="move-top">
        <label>Service Tag</label>
        </div>
        <input type= "text" >
        </div>`
        
        
        // loop across the given arrey
        arr.forEach(task => {
            //create table row
            const tr = document.createElement("tr");
            //add html to table row
            tr.innerHTML =  `<tr>
            <td><input  type="checkbox" class = "check-box"><label for="chkMango">${task}</label></td>
            </tr>`;
            //appent tr to table and table to list
            table.appendChild(tr);
            list.appendChild(table);
            // if checkbox is clicked cross the task
            this.crossTask(tr)
        });
        // clear the arrays every time
        intel3 = [];
        intel5 = [];
        
        // create the button for removing table elemtn or the task list
        // add the button to table element
        // create onclick event if button is clicked
        const btnRemove = document.createElement("button");
        btnRemove.innerText = "Remove List";
        btnRemove.classList.add("btnRemove");
        table.appendChild(btnRemove);
        btnRemove.onclick = this.removeTasksList;
        
    }

    

    // metod for crossing the task if the checkbox is clicked
    crossTask(tr) {
        tr.addEventListener("click", (e) => {
            if(e.target.classList.contains("check-box")) {
                tr.classList.toggle("completed");
            };
        });
    };

    // metod for removing table or the task list
    removeTasksList() {
        console.log(this)
        let table = this.parentElement;
        table.remove()
    }

}




//event listener to create i3 pc tasks
const btnCreateIntel3 = document.getElementById("btn-add-i3");
btnCreateIntel3.addEventListener("click", () => {
    const newPC = new GetTasks();
    newPC.getTask(3);
});





//event listener to create i5 pc tasks
const btnCreateInteli5 = document.getElementById("btn-add-i5");

btnCreateInteli5.addEventListener("click", () => {
    const newPC = new GetTasks();
    newPC.getTask(5)

    
});