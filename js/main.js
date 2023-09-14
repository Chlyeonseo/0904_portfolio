const clickObj = document.querySelectorAll(".clickObj>div");
const clickObj_ect = document.querySelectorAll(".clickObj_ect aside");
const closeBtn = document.querySelectorAll(".close");
const Wrap2 = document.querySelector(".wrap2");
const headerHome = document.querySelector("header >a");

clickObj.forEach((el,index) => {
    el.addEventListener("click", () => {
        for (let ell of clickObj_ect) {
            ell.classList.remove("on");
        }
        if (clickObj_ect[index].classList.contains("on")) {
            return;
        }
        clickObj_ect[index].classList.add("on");
        Wrap2.style.display = "none";
        headerHome.style.display = "none";
    })
});

closeBtn.forEach((el, index) => {
    el.addEventListener("click", () => {
        clickObj_ect[index].classList.remove("on");
        Wrap2.style.display = "block";
        headerHome.style.display = "block";
    })
})

// -----------------------------------------clickObj_ect circle2---------------

const base = "https://www.flickr.com/services/rest/?";
const method = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "17cc3a22d95ddd5a4ea9290f2bc8e3e6";
const per_page = 50;
const format = "json";

const list = document.querySelector("#list");

const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1`;
const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=${format}&nojsoncallback=1&tags=보라색&privacy_filter=1`;

const main = document.querySelector("#cir2Main");

list.addEventListener("click", (e) => {
    e.preventDefault();
    let target = e.target.closest(".item");
    let imgSrc = target.querySelector("a").getAttribute("href");

    let pop = document.createElement("aside");
    let pops = `
        <img src="${imgSrc}">
        <span class="close">CLOSE</span>
    `;
    pop.innerHTML = pops;

    main.append(pop);
    const closeSpan = main.querySelector(".close");
    closeSpan.addEventListener("click", () => {
        main.querySelector("aside").closest("aside").remove();
    })

})

callData(url2);

function callData(url) {

    list.innerHTML = "";
    list.classList.remove("on");

    fetch(url)
        .then((data) => {
            console.log(data);
            let result = data.json();
            console.log(result)
            return result;
        })
        .then((json) => {
            let items = json.photos.photo;

            createList(items);
        })
}

function createList(items) {
    
    let htmls = "";
    items.map((el,index) => {
        let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;
        let BigImgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;
        
        htmls += `
        <li class="item">
            <div>
                <a href="${BigImgSrc}">
                    <img src="${imgSrc}">
                </a>
                <p>${el.title}</p>
                
            </div>
        </li>
        `;

        list.innerHTML = htmls;
        
        delayLoading();
    })   
}


function delayLoading() {
    const imgs = list.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    for (let el of imgs) {
        el.addEventListener("load", () => {
            count++;
            if (count == len) {
                iso();
            }
        })
    }
}

function iso() {
    new Isotope("#list", {
        itemSelection: ".item",
        columnWidth: ".item",
        transtionDuration: "0.5s"
    });
    list.classList.add("on");
}

// ------------------------circle3----------
//-----------------------------circle4-----------------
const mSlide = document.querySelector(".mSlide");
const mUl = mSlide.querySelector("ul");
const lis = mUl.querySelectorAll("li");
const mPrev = mSlide.querySelector(".prev");
const mNext = mSlide.querySelector(".next");
let enableClick = true;

mUl.prepend(mUl.lastElementChild);
mUl.prepend(mUl.lastElementChild);



mPrev.addEventListener("click",(e)=>{
    e.preventDefault();
    if(enableClick){
        enableClick = false;
        mUl.prepend(mUl.lastElementChild);

        setTimeout(() => {
            enableClick = true;
        }, 1000);
    }
})
mNext.addEventListener("click",(e)=>{
    e.preventDefault();
    mUl.append(mUl.firstElementChild);
})
