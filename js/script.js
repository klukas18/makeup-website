const navBar = document.querySelector('.nav')
const navBtn = document.querySelector('.burger-btn')
const allNavItems = document.querySelectorAll('.nav__item')
const sectionOne = document.querySelector('.header')
const sliderCopy = document.querySelector('.brands-slider__logos').cloneNode(true)
const carousel = document.querySelector('.carousel')
firstImg = carousel.querySelectorAll('.carousel-img')[0]
arrowIcons = document.querySelectorAll('.carousel-container i')
const footerYear = document.querySelector('.footer-year')

const handleNav = () => {
	if (navBar.classList.contains('nav')) {
		navBar.classList.add('nav-mobile')
		navBar.classList.remove('nav')
	} else if (navBar.classList.contains('nav-mobile')) {
		navBar.classList.add('nav')
		navBar.classList.remove('nav-mobile')
	}

	allNavItems.forEach((item) => {
		item.addEventListener('click', () => {
			navBar.classList.remove('nav-mobile')
			navBar.classList.add('nav')
		})
	})
}
navBtn.addEventListener('click', handleNav)

// Navigation shadow
document.addEventListener('DOMContentLoaded', function () {
	const nav = document.querySelector('.nav')
	function addShadow() {
		if (window.scrollY >= 200) {
			nav.classList.add('nav-shadow')
		} else {
			nav.classList.remove('nav-shadow')
		}
	}
	window.addEventListener('scroll', addShadow)
})

// Navigation change with intersection observer
const sectionOneOptions = { rootMargin: '-100px 0px 0px 0px' }
const sectionOneObserver = new IntersectionObserver(function (
	entries,
	sectionOneObserver
) {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) {
			navBar.classList.add('nav-scrolled')
		} else {
			navBar.classList.remove('nav-scrolled')
		}
	})
},
sectionOneOptions)
sectionOneObserver.observe(sectionOne)

// Brand logos animation
document.querySelector('.brands-slider').appendChild(sliderCopy)

// Portfolio image slider
let isDragStart = false,
	isDragging = false,
	prevPageX,
	prevScrollLeft,
	positionDiff

const showHideIcons = () => {
	let scrollWidth = carousel.scrollWidth - carousel.clientWidth
	arrowIcons[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block'
	arrowIcons[1].style.display =
		carousel.scrollLeft == scrollWidth ? 'none' : 'block'
}

arrowIcons.forEach((icon) => {
	icon.addEventListener('click', () => {
		let firstImgWidth = firstImg.clientWidth + 20
		carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth
		setTimeout(() => showHideIcons(), 60)
	})
})

const autoSlide = () => {
	if (
		carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 ||
		carousel.scrollLeft <= 0
	)
		return
	positionDiff = Math.abs(positionDiff)
	let firstImgWidth = firstImg.clientWidth + 20
	let valDifference = firstImgWidth - positionDiff
	if (carousel.scrollLeft > prevScrollLeft) {
		return (carousel.scrollLeft +=
			positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff)
	}
	carousel.scrollLeft -=
		positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff
}

const dragStart = (e) => {
	isDragStart = true
	prevPageX = e.pageX || e.touches[0].pageX
	prevScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
	if (!isDragStart) return
	e.preventDefault()
	isDragging = true
	carousel.classList.add('dragging')
	positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX
	carousel.scrollLeft = prevScrollLeft - positionDiff
	showHideIcons()
}

const dragStop = () => {
	isDragStart = false
	carousel.classList.remove('dragging')

	if (!isDragging) return
	isDragging = false
	autoSlide()
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('touchstart', dragStart)

document.addEventListener('mousemove', dragging)
carousel.addEventListener('touchmove', dragging)

document.addEventListener('mouseup', dragStop)
carousel.addEventListener('mouseleave', dragStop)
carousel.addEventListener('touchleave', dragStop)

// Current footer year

const handleCurrentYear = () => {
	const year = new Date().getFullYear()
	footerYear.innerText = year
}
handleCurrentYear()
