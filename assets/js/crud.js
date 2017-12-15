getData = (url) => {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open("GET", url, true);    
        http.onload = () => {
            if(http.status == 200 && http.readyState == 4){
                resolve(JSON.parse(http.responseText));            
            } else {
                reject(http.statusText);
            }
        };
        http.onerror = () => {
            reject(http.statusText);
        }
        http.send();       
    });
}

postData = (url, data) => {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.open("POST", url, true);    
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.onload = () => {
            if(http.status == 200 && http.readyState == 4){
                resolve(JSON.parse(http.responseText));            
            } else {
                reject(http.statusText);
            }
        };
        http.onerror = () => {
            reject(http.statusText);
        }
        http.send(data);       
    });
}

loadData = () => {
    let container = document.getElementById("load-data");
    let get = getData("assets/resources/load.php");
    get.then((data) => {
        let template = "";
        for(let i in data){
            template += ` 
                <tr> 
                    <td> ${data[i].id} </td>
                    <td> ${data[i].name} </td>
                    <td> ${data[i].city} </td>                                        
                    <td> 
                        <a class="viewButton green" href="get_where.php?id=${data[i].id}"> View </a>
                        <a class="editButton blue" href="get_where.php?id=${data[i].id}"> Edit </a>
                        <a class="deleteButton red" href="delete.php?id=${data[i].id}"> Delete </a>
                    </td>                                                                                
                </tr>
            `
            ;
        }
        container.innerHTML = template;
        return afterDOMLoaded();        
    })    
}

toggleForm = (param) => {
    let editForm = document.getElementById("editForm");
    if(editForm.style.display == "none"){
        editForm.style.display = "block";
        editForm.classList.add("slideDown");        
        return getUserData(param);
    } else {
        editForm.classList.remove("slideDown");                        
        editForm.classList.add("slideUp");                
        setTimeout( () => {
            editForm.style.display = "none";                    
        }, 400);
    }
}

hideForm = () => {
    editForm.classList.remove("slideDown");                        
    editForm.classList.add("slideUp");                
    setTimeout( () => {
        editForm.style.display = "none";                    
    }, 400);
}

//A bunch of function that happen after DOM loaded dynamically by AJAX
afterDOMLoaded = () => {

    //Listen to click delete button
    let delButton = document.getElementsByClassName("deleteButton");
    for (let i = 0; i < delButton.length; i++) {
        delButton[i].onclick = (event) => {
            event.preventDefault();
            swal({
                title: "Are you sure want to delete this data?",
                type: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete",
                cancelButtonText: "No, Cancel"
            }).then((result) => {
                if (result.value){
                    let param = delButton[i].getAttribute("href");        
                    return deleteData(`assets/resources/${param}`);    
                } else {
                    return false;
                }
            });
        }    
    }

    //Listen to click edit button
    let editButton = document.getElementsByClassName("editButton");
    for (let i = 0; i < editButton.length; i++) {
        editButton[i].onclick = (event) => {
            event.preventDefault();
            let param = editButton[i].getAttribute("href");            
            return toggleForm(param);
        }
    }

    let viewButton = document.getElementsByClassName("viewButton");
    for(let i = 0; i < viewButton.length; i++){
        viewButton[i].onclick = (event) => {
            event.preventDefault();            
            let param = editButton[i].getAttribute("href");                        
            return viewData(param);
        }
    }
}

viewData = (param) => {
    let viewData = getData(`assets/resources/${param}`);
    viewData.then((data) => {
        swal({
            title: "Detail Data",
            html: `<p> ID = ${data.id} </p>
                   <p> Name = ${data.name} </p>
                   <p> City = ${data.city} </p>
                `
        })
    }).catch((err) => {

    })
}

getUserData = (param) => {
    let getUserData = getData(`assets/resources/${param}`);
    getUserData.then((data) => {
        let name = document.getElementById("newName").value = data.name,
            city = document.getElementById("newCity").value = data.city,
            id   = data.id;

        return setUpdateData(id);
    }).catch((err) =>{
        console.log(err);
    })
}

setUpdateData = (id) => {
    let name = document.getElementById("newName"),
        city = document.getElementById("newCity"),
    editForm = document.getElementById("editForm");
    
    editForm.onsubmit = (event) => {
        event.preventDefault();

        let value = {
            "newName" : name.value,
            "newCity" : city.value 
        },
        param = `id=${id}&name=${value.newName}&city=${value.newCity}`;    
        return updateData(param);
    }

}

updateData = (param) => {
    let updateData = postData("assets/resources/update.php", param);
    updateData.then((result) => {
        swal({
            title : `${result}`,
            type  : "success"
        });
        hideForm();
        return loadData();
    }).catch((err) => {
        swal({
            title : `${err}`,
            type  : "danger"
        });
    })
} 

deleteData = (param) => {
    let deleteData = getData(param);
    deleteData.then((result) => {
        swal({
            title : `${result}`,
            type  : "success"
        });
        return loadData();
    }).catch((err) => {
        swal({
            title : `${err}`,
            type  : "danger"
        });
    })
}

addData = (data) => {
    let addData = postData("assets/resources/add.php", data);
    addData.then((result) => {
        swal({
            title : `${result}`,
            type  : "success"
        });
        return loadData();
    }).catch((error) => {
        swal({
            title : `${err}`,
            type  : "danger"
        });
    });
}

window.onload = () => {

    loadData();

    //Add data when form submitted
    let form = document.getElementById("addForm");
    form.onsubmit = (event) => {
        event.preventDefault();
        let name = document.getElementById("name").value,
            city = document.getElementById("city").value,
            data = `name=${name}&city=${city}`;

        return addData(data);        
    }

}