$(function() {

    // Плавный скролл
    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let elementId = $(this).data('scroll');
        let elementOffset = $(elementId).offset().top;

        $("html, body").animate({
            scrollTop: elementOffset
        }, 700);

        $('.menu__link').removeClass('active');
        $(this).addClass('active');
    });

    // Фильтрация
    $('.filter__link').click(function(event) {
            var i=$(this).data('filter');
            
        if (i==1) {
            $('.portfolio__column').show();
        } else {
            $('.portfolio__column').hide();
            $('.portfolio__column.f_'+i).show();
        }
        $('.filter__link').removeClass('filter__link--active');
        $(this).addClass('filter__link--active');

        return false;
    });
});

// Фиксированная шапка при скролле вниз

const first = document.querySelector('.intro');
const header = document.querySelector('.menu');

const headerHeight = header.offsetHeight;
const firstHeight = first.offsetHeight;
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;

	 if (scrollDistance >= firstHeight + headerHeight) {
	 	header.classList.add('fixed');
	 	first.style.marginTop = `${headerHeight}px`;
	 } else {
	 	header.classList.remove('fixed');
	 	first.style.marginTop = null;
	 }
});



// Метод IBG для FULLSCREEN-ого экрана

function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = `url("${ibg[i].querySelector('img').getAttribute('src')}")`;
        }
    }
}
ibg();


// Анимация при скролле

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeigh / animStart;
            }

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
    }
    animOnScroll();
}

// Активная ссылка при скролле
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;


	if (window.innerWidth > 768) {
		document.querySelectorAll('section').forEach((el, i) => {
			if (el.offsetTop - document.querySelector('.menu__body').clientHeight <= scrollDistance) {
				document.querySelectorAll('a').forEach((el) => {
					if (el.classList.contains('active')) {
						el.classList.remove('active');
					}
				});
                
				document.querySelectorAll('.menu__body li')[i].querySelector('a').classList.add('active');
                
			}
		});
	}
});