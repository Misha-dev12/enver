function App() {
	//// video
	const video = document.getElementById('myVideo');
	const playButton = document.getElementById('playButton');
	const closeButton = document.getElementById('closeButton');
	const videoContainer = document.querySelector('.video-container');
	// Перевірка стану відео при завантаженні сторінки
	updateVideoState();
	playButton.addEventListener('click', () => {
		if (video.paused) {
			video.play();
			playButton.innerHTML = '❚❚'; // Міняємо на паузу
			videoContainer.classList.remove('paused');
			videoContainer.classList.add('playing');
		} else {
			video.pause();
			playButton.innerHTML = '▶'; // Міняємо на Play
			videoContainer.classList.remove('playing');
			videoContainer.classList.add('paused');
		}
	});
	// Якщо відео закінчилося — повертаємо кнопку "Play"
	video.addEventListener('ended', () => {
		playButton.innerHTML = '▶';
		videoContainer.classList.remove('playing');
		videoContainer.classList.add('paused');
	});
	// Закриття відео
	closeButton.addEventListener('click', () => {
		video.pause(); // Зупинити відео
		video.currentTime = 0; // Перемотати на початок
		playButton.innerHTML = '▶'; // Повернути кнопку Play
		videoContainer.classList.remove('playing');
		videoContainer.classList.add('paused');
		// Повертаємо постер, коли відео зупинене
		video.load(); // Відновлюємо постер
	});
	// Оновлюємо стан відео на початку
	function updateVideoState() {
		if (video.paused) {
			videoContainer.classList.add('paused');
			videoContainer.classList.remove('playing');
			playButton.innerHTML = '▶';
		} else {
			videoContainer.classList.add('playing');
			videoContainer.classList.remove('paused');
			playButton.innerHTML = '❚❚';
		}
	}

	let sliderPortfolio = new Swiper('.portfolio__slider', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		spaceBetween: 10,
		slidesPerView: 1,
		mousewheel: {
			invert: false,
		},
		breakpoints: {
			900: {
				spaceBetween: 20,
				slidesPerView: 3,
			},
			768: {
				spaceBetween: 10,
				slidesPerView: 2,
			},
			600: {
				spaceBetween: 10,
				slidesPerView: 2,
			},
		},
	});

	// scroll header
	const headerFixed = document.querySelector('.header');

	const setFixedHeader = () => {
		headerFixed.classList.toggle('scroll-active', window.scrollY >= 60);
	};

	window.addEventListener('scroll', setFixedHeader);

	/// header burger

	const burger = document.querySelector('.burger');
	const header = document.querySelector('.header');
	const navItems = document.querySelectorAll('.nav__item');
	const body = document.body;

	function closeMenu() {
		burger.classList.remove('active');
		header.classList.remove('open-menu');
		body.style.overflow = 'visible';
	}

	function toggleMenu() {
		const isActive = burger.classList.toggle('active');
		header.classList.toggle('open-menu', isActive);
		body.style.overflow = isActive ? 'hidden' : 'visible';
	}
	burger.addEventListener('click', toggleMenu);

	navItems.forEach(item => {
		item.addEventListener('click', closeMenu);
	});
	window.addEventListener('resize', () => {
		if (window.innerWidth > 768) {
			closeMenu();
		}
	});
}

App();
