let ckCatergories = document.querySelectorAll(".categories-container input")

let curCategory = "Background"

ckCatergories.forEach(el => {
    el.addEventListener('change', () => {
        ckCatergories.forEach(el => {
            if (el.checked) {
                curCategory = el.value;
                displayStyle();
            }
        })
    })
})

function displayStyle() {

}