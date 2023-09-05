const clickObj = document.querySelectorAll(".clickObj>div");
const clickObj_ect = document.querySelectorAll(".clickObj_ect aside");
const closeBtn = document.querySelectorAll(".close");

clickObj.forEach((el,index) => {
    el.addEventListener("click", () => {
        for (let ell of clickObj_ect) {
            ell.classList.remove("on");
        }
        if (clickObj_ect[index].classList.contains("on")) {
            return;
        }
        clickObj_ect[index].classList.add("on");
    })
});

closeBtn.forEach((el, index) => {
    el.addEventListener("click", () => {
        clickObj_ect[index].classList.remove("on");
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
//해당 url 값읋 가지고 데이터 호출

const loading = document.querySelector(".loading");
const main = document.querySelector("#cir2Main");

list.addEventListener("click", (e) => {
    e.preventDefault();
    //클릭 지점에서 가장 가까이 있는 li(.item)찾기
    let target = e.target.closest(".item");
    //찾은 li(.item)안의 a태그 href 속성 안에 넣어둔
    //큰이미지 주소를 변수에 담아둔다
    let imgSrc = target.querySelector("a").getAttribute("href");

    //동적으로 aside 태그를 생성합니다.
    let pop = document.createElement("aside");
    let pops = `
        <img src="${imgSrc}">
        <span class="close">CLOSE</span>
    `;
    pop.innerHTML = pops;

    main.append(pop);

})

callData(url2);

function callData(url) {

    list.innerHTML = "";
    //list의 기존 내용을 지운다.
    loading.classList.remove("off");
    //off를 지워서 로딩이미지 재출력
    list.classList.remove("on");
    //on을 지워서 활성화 모션 전 상태로 돌림

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
        
        //li 클래스는 item
        //li 안에 div만들고 div 안에 처음요소 a태그 만들고
        //a태그 href속성 안에 큰 이미지주소 넣고
        //a태그 안에 img태그 넣고 imgSrc에는 작은 이미지 주소 넣기
        //a태그와 형제요소로 p태그 만들어서 p태그에 el.title 넣기
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


//로딩하는 동안 그림이 안 나타나게 하고
//로딩이 다 되었을 때 그림이 나타나게 해주는 코딩
function delayLoading() {
    const imgs = list.querySelectorAll("img");
    const len = imgs.length;
    let count = 0;

    // 로딩할 때마다 count 1씩 카운팅
    //로딩이 다 되면 = count 숫자와 len이 같으면
    //isotope플러그인을 사용항여 레이아웃 완성

    loading.classList.remove("off");

    for (let el of imgs) {
        //img들이 로드가 될 때 이벤트 실행
        el.addEventListener("load", () => {
            //로딩할 때마다 카운트
            count++;
            if (count == len) {
                //loading.classList.add("off");
                //내가 생각한 off부여 위치
                iso();
            }
        })
        el.addEventListener("error", (e) => {
            e.currentTarget.closet(".item").querySelector("img").setAttribute("src", "img/k1.jpg");
        })
        //이미지 값이 없어서 오류가 나면, 대체 이미지로 해결함으로써 전체 결과값에 영향을 미치지 않는 방법.

        // el.addEventListener("error", (e) => {
        //     e.currentTarget.closet(".item").style.display = "none";
        // })
        //display :none으로 해결했기 때문에 전체 결과값에 영향을 미침
    }
}

function iso() {
    new Isotope("#list", {
        itemSelection: ".item",//배치할 요소의 이름
        columnWidth: ".item",//너비값을 구할 요소명
        transtionDuration: "0.5s"//화면재배치시 요소가 움직이는 속도
    });
    list.classList.add("on");
    loading.classList.add("off");
}