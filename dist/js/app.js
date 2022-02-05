// const imagesLabels = require("./ressources-labels");
import {imagesLabels} from "./ressources-labels.js";

const styleContainer = document.querySelector(".style-container")

imagesLabels.forEach( label => {
    let el = `<div id=${label.category}-style class="style-container-list hidden">\n`
    for (let i = 0; i < label.items.length; i++) {
        const item = label.items[i]
        const l = label.labels[i]
        el += `<input type="radio" name="${label.category}" id="${label.category}-${item}" value="${item}" hidden>\n<label class="ck-button" for="${label.category}-${item}">${l}</label>\n`
    }
    el += "</div>"
    styleContainer.innerHTML += el
})

const styleContainerLists = document.querySelectorAll(".style-container-list")

const ckCategories = document.querySelectorAll(".categories-container input")
let curCategory = ""

ckCategories.forEach( el => el.addEventListener('change', () => {
    if (el.checked) {
        if (curCategory !== "") {
            let styleList = document.querySelector(`#${curCategory.toLowerCase()}-style`)
            styleList.classList.add("hidden")
        }
        curCategory = el.value;
        let styleList = document.querySelector(`#${curCategory.toLowerCase()}-style`)
        styleList.classList.remove("hidden")
    }
}))

for (let i = 0; i < styleContainerLists.length; i++) {
    const container = styleContainerLists[i]
    const inputs = container.querySelectorAll("input")
    const imgContainer = document.querySelector(`.img-container .shifting-image:nth-child(${i + 1})`)
    console.log(imgContainer)
    inputs.forEach( input => {
        input.addEventListener('change', () => {
            const loc = input.id.split("-")
            imgContainer.src = `res/images/${loc[0]}/${loc[1]}.png`
        })
    })
}

