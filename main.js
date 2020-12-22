'use strict'

// Make navbar transparent when it is on the top
// navbar를 투명하게 만들기 위한 로직
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
    
});



// Handle scrolling when tapping on the navbar menu
// navbar menu를 눌렀을 때 화면이동
// 토글버튼 클릭 시 navbar menu가 사라지도록
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null) {
        return;
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});

// navbar toogle button for small screen
// navbar toogle button을 눌렀을때 반응형
// navbarMeunu가 위에 정의되어 있으니 cascading하게
const navbarToogleBtn = document.querySelector('.navbar__toggle-btn');
navbarToogleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
});


// Handle click on "contact me" button on home
// contact me를 눌렀을 때 화면이동
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home slowly fade to transparent as the window scrolls down
// 화면이 아래로 스크롤 될 때 "home" 섹션이 서서히 투명하게 보이도록
// console.log(1 - window.scrollY / homeHeight);
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})


// Show "arrow up" button when scrolling down
// 화살표 방향키를 이용하여 화면이동
// 다큐먼트의 또 다른 이벤트 리스너를 추가해서 스크롤이 될 때 원하는 함수를 호출
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});


// Handle click on the "arrow up" button
// arrowUp이 또 다른 이벤트 리스너를 추가해서 클릭이 되었을 때 원하는 함수를 호출
arrowUp.addEventListener('click', () => {
    scrollIntoView('#home');
});


// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const Projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
// (강조) 프로젝트 안에 있는 span이 클릭 시 (데이터 값이 추출이 안되는 문제 발견됨
// 디버깅을 통하여 watch의 add watch expression에서  
// e.target.parentNode.dataset.filter에 있는 필터 값을 추출
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }
// 클릭 시 애니메이션 추가
    projectContainer.classList.add('anim-out');
    
// opacity가 1로 돌아올 수 있도록 하기 위함
// 0.3초 다음에 코드 실행을 하기 위해 코드 setTimeout 이후에 적용
    setTimeout(() => {
        Projects.forEach((Project) => {
        
            if(filter ==='*' || filter === Project.dataset.type) {
                Project.classList.remove('invisible');
            } else {
                Project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);

});



// 아래 로직은 유틸리티 함수이기 때문에 텍스트 하단에 위치
function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}

