const addBox = document.getElementById('addBoxes');
const removeBox = document.getElementById('removeBoxes');
const boxCounter = document.getElementById('boxCounter');
const id = window.location.pathname.split('/pallets/')[1];
const deleteWarehouse = document.getElementById('deletePallet')

//add event to delete pallet
deleteWarehouse.addEventListener('click', async () => {
    //fetch sauce route for this id with the DELETE method
    let res = await fetch(`/pallets/${id}`, {
        method: 'DELETE'
    })
    console.log(res)
    //send user back to the pallets path
    window.location.assign('/pallets')
  });

addBox.addEventListener('click', async () =>{
    //get current boxes from counter
    let currentBox = parseInt(boxCounter.innerHTML)
    console.log(currentBox)
    //Increment current boxes
    currentBox += 1

    //update the likes counter
    boxCounter.innerHTML = currentBox
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
    //Increment current boxes
    currentBox -= 1
    
    //update the likes counter
    boxCounter.innerHTML = currentBox
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