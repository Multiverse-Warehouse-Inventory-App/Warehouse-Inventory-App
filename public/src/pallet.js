const addBox = document.getElementById('addBoxes');
const removeBox = document.getElementById('removeBoxes');
const boxCounter = document.getElementById('boxCounter');
const capacity = document.getElementById('capacity');
const id = window.location.pathname.split('/pallets/')[1];
const deletePallet = document.getElementById('deletePallet')
const note = document.getElementById('note')
const deleteNote = document.getElementById('deleteNote');

//add event to delete pallet
deletePallet.addEventListener('click', async () => {
    //fetch sauce route for this id with the DELETE method
    let res = await fetch(`/pallets/${id}`, {
        method: 'DELETE'
    })
    console.log(res)
    //send user back to the pallets path
    window.location.assign('/warehouses')
  });

addBox.addEventListener('click', async () =>{
    //get current boxes from counter
    let currentBox = parseInt(boxCounter.innerHTML)
    let maxCapacity = parseInt(capacity.innerHTML)
    console.log(currentBox)
    console.log(maxCapacity)

 if(currentBox >= maxCapacity) {
    note.innerHTML = "Limit has been reached"
    deleteNote.innerHTML = ""
    return
 } else {
    note.innerHTML = ""
    deletePallet.style.display = 'none'
           //Increment current boxes
           currentBox += 1
           //update the likes counter
           boxCounter.innerHTML = currentBox
 }
    //fetch the route for this id with the PUT method
    let res = await fetch(`/pallets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentCapacity: currentBox

        })
    })
})

removeBox.addEventListener('click', async () =>{
    //get current boxes from counter
    let currentBox = parseInt(boxCounter.innerHTML)
    console.log(currentBox)

    if (currentBox <= 0) {
        deleteNote.innerHTML = "It is time to delete this palette!"
        return deletePallet.style.display = ''
    } 
    else {
     //Increment current boxes
    currentBox -= 1
    //update the likes counter
    boxCounter.innerHTML = currentBox
    }

    //fetch the route for this id with the PUT method
    let res = await fetch(`/pallets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentCapacity: currentBox
        })
    })
})