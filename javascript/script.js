// VARIABLES
const s = document.getElementsByTagName('body')[0]; // body
const revealElements = document.querySelectorAll('.h');

var nav = document.querySelector('#nav');
var nav_selector = document.querySelector('.menu-selector');
var nav_items = document.getElementsByClassName('menu-item');
var mobile_menu = document.querySelector('#popup-menu');

var services_single = document.querySelectorAll('.service');

const presentation = document.getElementById('presentation');

const services_wrapper = document.getElementById('services');

const work_presentation = document.getElementById('work-presentation');
const work = document.getElementById('work');

const footer = document.querySelector('#footer');



// FUNCTION TO MOVE FIXED MENU BUTTON
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
    if (lastScrollY <= window.scrollY && nav.dataset.menu == "closed") {
        nav.dataset.style = "blur";
        nav.classList.add('moving');
    } else {
        nav.classList.remove('moving');
    }
    if(lastScrollY < 50) {
        nav.dataset.style = "none";
        nav.dataset.style = "none";
    }

    if ((window.innerHeight + document.documentElement.scrollTop) >= document.body.scrollHeight - 60) {
        if(window.innerWidth > 1280) {
            nav.style.top = `calc(100% + 5ch - ${footer.offsetHeight}px)`;
            nav.dataset.style = 'none';
        } else {
            nav.classList.remove('moving');
            nav.classList.add('top');
        }
    } else {
        nav.style.top = '';
        nav.dataset.style = 'blur';
    }

    lastScrollY = window.scrollY;
});


// FUNCTION TO DETECT WHEN AN ELEMENT IS VISIBLE
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
})
revealElements.forEach((el) => observer.observe(el));


function hasClass(element, clsName) {
  return (' ' + element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}

// FUNCTION TO HANDLE HOVER EFFECT FOR MENU ITEMS
function menu_item_hover(index) {
    nav_selector.style.left = `${nav_items[index].offsetLeft}px`;
    nav_selector.style.width = `${nav_items[index].offsetWidth}px`;
}
function menu_item_out(index) {
    nav_selector.style.left = `${nav_items[index].offsetLeft}px`;
    nav_selector.style.width = `${nav_items[index].offsetWidth}px`;
}

// FUNCTION TO SHOW POPUP MENU
var menu = document.querySelector('#popup-menu');
var menu_inner = document.querySelector('#popup-menu-inner');
var social_bar_menu = document.querySelector('#social-media-menu-bar');
var menu_button = document.querySelector('.mobile-menu');
var lines = document.querySelectorAll('.mobile-menu span');

function popup_menu() {
    if(hasClass(menu, 'menu--open')) {
        close_popup_menu();
    } else {
        open_popup_menu();
    }
}

// FUNCTION TO HANDLE OPENING OF MOBILE MENU
function open_popup_menu() {
    lines.forEach(line => {
        line.classList.add('menu--open');
    });
    menu.classList.add('menu--open');
    menu_inner.classList.add('menu--open');
    social_bar_menu.classList.add('menu--open');
    // menu.style.left = '0px';
    menu_button.classList.add('menu--open');
    nav.dataset.menu = "open";
    if(nav.dataset.style == "blur") {
        nav.dataset.prev__state = "blur";
    } else {
        nav.dataset.style = "blur";
    }
}

// FUNCTION TO HANDLE CLOSING OF MOBILE MENU
function close_popup_menu() {
    lines.forEach(line => {
        line.classList.remove('menu--open');
    });
    menu.classList.remove('menu--open');
    menu_inner.classList.remove('menu--open');
    social_bar_menu.classList.remove('menu--open');
    // menu.style.left = '-100%';
    menu_button.classList.remove('menu--open');
    nav.dataset.menu = "closed";
    nav.dataset.style = nav.dataset.prev__state;
}

// FUNCTION TO CHANGE BACKGROUND OF WORK PRESENTATION SECTION
window.onscroll = function (event) {
    var scroll = window.pageYOffset;
    const rect = work_presentation.getBoundingClientRect();
    const work_pres_top = rect.top + window.scrollY - window.innerHeight * 0.75;
    const work_pres_bottom = rect.bottom + window.scrollY - window.innerHeight * 0.5;

    var image1 = document.querySelector('#left-image');

    if(scroll > work_pres_top && scroll < work_pres_bottom) {
        image1.classList.add('active');
    } else {
        image1.classList.remove('active');
    }
}

// THIS IS THE FUNCTION THAT HAPPENS WHEN THE PAGE LOADS
function loader(index) {
    // THIS IS THE PART FOR THE LINKS
    var links = document.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(function() {
                window.history.pushState(document.html, document.title, document.URL.split('#')[0]);
            }, 1);
        });
    });

    // THIS IS THE NAV SELECTOR PART
    nav_selector.style.left = `${nav_items[index].offsetLeft}px`;
    nav_selector.style.width = `${nav_items[index].offsetWidth}px`;

    // THIS IS THE SERVICES PART
    if (window.innerWidth < 1250) {
        services_single.forEach(service => {
            service.classList.add('small');
        })
    } else {
        services_single.forEach(service => {
            service.classList.remove('small');
        })
    }
}

// FUNCTION TO HANDLE FORM SUBMISSIONS
const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
    })
    .then(() => console.log("Form successfully submitted"))
    .catch((error) => alert(error));

    var contact = document.querySelector('#contacts');
    var submit = document.querySelector('#form-submitted');

    contact.querySelectorAll('.contact-col').forEach(item => {
        item.style.opacity = 0;
    })
    submit.classList.add('visible');


};

document.querySelector("#contact-form").addEventListener("submit", handleSubmit);
