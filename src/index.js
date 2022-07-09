document.addEventListener('DOMContentLoaded', () => {
const tableBody = document.querySelector("#table-body");

fetch ("http://localhost:3000/dogs")
.then(response => response.json())
.then(data=>{
    for (let i = 0; i<data.length; i++){
        let row = document.createElement("tr");
        row.setAttribute("id", `${i+1}`);

        let inputName = document.createElement("input");
        inputName.value = data[i].name;
        inputName.setAttribute("id", `Name-${i+1}`);
        inputName.disabled = true;
        cellName = document.createElement("td");
        cellName.appendChild(inputName);
        row.appendChild(cellName);

        let inputBreed = document.createElement("input");
        inputBreed.value = data[i].breed;
        inputBreed.setAttribute("id", `Breed-${i+1}`);
        inputBreed.disabled = true;
        cellBreed = document.createElement("td");
        cellBreed.appendChild(inputBreed);
        row.appendChild(cellBreed);

        let inputSex = document.createElement("input");
        inputSex.value = data[i].sex;
        inputSex.setAttribute("id", `Sex-${i+1}`);
        inputSex.disabled = true;
        cellSex = document.createElement("td");
        cellSex.appendChild(inputSex);
        row.appendChild(cellSex);

        let EditBtn = document.createElement("button");
        EditBtn.textContent = "Edit Dog";
        cellEditBtn = document.createElement("td");
        cellEditBtn.appendChild(EditBtn);
        row.appendChild(cellEditBtn);
       
        tableBody.appendChild(row);
    }
})

tableBody.addEventListener("click", function (e){
    if (e.target.tagName === "BUTTON"){

        let n = e.target.parentNode.parentNode.id;
        let cellName = document.querySelector(`#Name-${n}`);
        let cellBreed = document.querySelector(`#Breed-${n}`);
        let cellSex = document.querySelector(`#Sex-${n}`);

        if(e.target.textContent == "Edit Dog"){

            cellName.disabled = false;
            cellBreed.disabled = false;
            cellSex.disabled = false;

            e.target.textContent = "Save"

        } else if (e.target.textContent == "Save"){

            fetch(`http://localhost:3000/dogs/${n}`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                name: cellName.value,
                breed: cellBreed.value,
                sex: cellSex.value
                })
            })
            .catch(console.error);

            cellName.disabled = true;
            cellBreed.disabled = true;
            cellSex.disabled = true;

            e.target.textContent = "Edit Dog"
        }

    }
});

})