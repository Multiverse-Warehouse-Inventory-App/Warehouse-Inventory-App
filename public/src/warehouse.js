const wid = window.location.pathname.split('/warehouses/')[1];
const deleteWarehouse = document.getElementById('delete')

//add event to delete warehouse
deleteWarehouse.addEventListener('click', async () => {
    //fetch sauce route for this id with the DELETE method
    let res = await fetch(`/warehouses/${wid}`, {
        method: 'DELETE'
    })
    console.log(res)
    //send user back to the warehouses path
    window.location.assign('/warehouses')
  });