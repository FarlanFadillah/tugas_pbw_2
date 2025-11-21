document.body.insertAdjacentHTML('beforeend', `
    <div class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h3>Book Form</h3>
            </div>
            <div class="modal-body">
                
            </div>
            <div class="modal-footer">
                <button class="btn btn-gray close-modal-btn">close</button>
            </div>
        </div>
    </div>
`)

const close_btn = document.querySelector('.close-modal-btn');
const modal = document.querySelector('.modal');
const modal_content = document.querySelector('.modal-body');
const modal_header = document.querySelector('.modal-header');
const modal_body = document.querySelector('.modal-body');
const modal_footer = document.querySelector('.modal-footer')

close_btn.addEventListener('click', (event)=>{
    closeModal();
})

window.onclick = function(event){
    if (event.target == modal) {
        closeModal();
    }
}

function setModal(title = 'info', innerHTML, additionalBtn = null, fit_content = false){
    if(fit_content) modal.classList += 'fit-content'
    modal_header.innerHTML = `<h3>${title}</h3>`
    modal_body.innerHTML = innerHTML;
    if(additionalBtn) modal_footer.innerHTML += additionalBtn;
}

function closeModal()
{
    modal.style.display = 'none';
}
function openModal(){
    console.log('Modal Open');
    modal.style.display = 'block';
}