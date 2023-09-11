const banner_ul = document.querySelector(".slide_wrap ul");
const banners = banner_ul.children;
const lis = banner_ul.querySelectorAll("li");

const btns = document.querySelector(".btns");
const [prev,next] = btns.children;

const pop = document.querySelector(".pop");
const close = pop.querySelector(".close");
const opens = banner_ul.querySelectorAll("a");

for(let i = 0; i<3; i++){
    banner_ul.prepend(banner_ul.lastElementChild);
}

prev.addEventListener("click",(e)=>{
    e.preventDefault();
    banner_ul.prepend(banner_ul.lastElementChild);
    for(let el of banners){
        el.classList.remove("on");
    }
    banners[3].classList.add("on");
})
next.addEventListener("click",(e)=>{
    e.preventDefault();
    banner_ul.append(banner_ul.firstElementChild);
    for(let el of banners){
        el.classList.remove("on");
    }
    banners[3].classList.add("on");
})

console.log(opens);
opens.forEach((el)=>{
    el.addEventListener("click",(e)=>{
        e.preventDefault();
        pop.classList.add("on");
        e.currentTarget.classList.add("off");
        btns.classList.add("off");

        let txt = e.currentTarget.closest("li").querySelector("h2").innerText;
        pop.querySelector("h2").innerText = txt;
    })
})


close.addEventListener("click",()=>{
    pop.classList.remove("on");

    banner_ul.querySelector("li.on a").classList.remove("off")
    btns.classList.remove("off");
})