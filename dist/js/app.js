import mergeImages from './merge-images.js'

import {imagesLabels} from "./ressources-labels.js";

const NOSE_ID = 6

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
styleContainerLists.forEach( (el) => {
    if (el.children.item(0) !== null) el.children.item(0).setAttribute("checked", "")
})

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
    inputs.forEach( input => {
        input.addEventListener('change', () => {
            const loc = input.id.split("-")
            if (loc[0] === "accessories") {
                if (loc[1] !== "none") {
                    imgContainer.src = `res/images/${loc[0]}/${loc[1]}.png`
                    imgContainer.removeAttribute("hidden")
                } else {
                    imgContainer.src = "#"
                    imgContainer.setAttribute("hidden", "")
                }
            } else {
                imgContainer.src = `res/images/${loc[0]}/${loc[1]}.png`
            }
        })
    })
}

const btnRandom = document.querySelector("#btn-random")

btnRandom.addEventListener('click', () => {
    imagesLabels.forEach(image => {
        if(image.id !== NOSE_ID) {
            const imgContainer = document.querySelector(`.img-container .shifting-image:nth-child(${image.id})`)
            const r = Math.floor(Math.random() * image.items.length)
            imgContainer.src = `res/images/${image.category}/${image.items[r]}.png`
        }
    })
})

const btnDownload = document.querySelector("#btn-download")

btnDownload.addEventListener('click', () => {
    const images = document.querySelectorAll(".img-container img")
    let imageUrls = []
    images.forEach( el => {
        if (!el.hasAttribute("hidden")) {
            imageUrls.push(el.src)
        }
    })
    mergeImages(imageUrls).then( (b64) => {
        let link = document.createElement("a")
        link.download = 'alpaca.png'
        link.href = b64;
        link.click()
    })
})

