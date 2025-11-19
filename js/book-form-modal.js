const close_btn = document.querySelector('.close-modal-btn');
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal-body');
const modal_header = document.querySelector('.modal-header');

close_btn.addEventListener('click', (event)=>{
    closeFormModal();
})

window.onclick = function(event){
    if (event.target == modal) {
        closeFormModal();
    }
}


function closeFormModal()
{
    modal.style.display = 'none';
}
function openFormModal(){
    modal.style.display = 'block';
}