/* KTZ site scripts — no dependencies. */
(function () {
	'use strict';

	var $ = function (s, c) { return (c || document).querySelector(s); };
	var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---------- Header: scrolled state + mobile nav ---------- */
	var header = $('.header');
	var topbar = $('.topbar');
	var toTop = $('.to-top');

	function onScroll() {
		var y = window.scrollY;
		if (header) header.classList.toggle('is-scrolled', y > 8);
		if (toTop) toTop.classList.toggle('is-visible', y > 700);
		if (topbar) {
			var h = Math.max(0, topbar.offsetHeight - y);
			document.documentElement.style.setProperty('--topbar-h', h + 'px');
		}
	}
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	if (toTop) toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });

	var burger = $('.burger');
	if (burger) {
		burger.addEventListener('click', function () {
			onScroll();
			var open = document.body.classList.toggle('nav-open');
			burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	}
	// Mobile: tap on a parent item toggles its submenu
	$$('.nav__item.has-children > .nav__link').forEach(function (link) {
		link.addEventListener('click', function (e) {
			if (window.matchMedia('(max-width: 1024px)').matches) {
				e.preventDefault();
				link.parentElement.classList.toggle('is-open');
			}
		});
	});

	/* ---------- Search overlay ---------- */
	var search = $('.search');
	function setSearch(open) {
		if (!search) return;
		search.classList.toggle('is-open', open);
		if (open) setTimeout(function () { $('input', search).focus(); }, 50);
	}
	$$('[data-search-open]').forEach(function (b) { b.addEventListener('click', function () { setSearch(true); }); });
	if (search) {
		search.addEventListener('click', function (e) { if (e.target === search || e.target.closest('[data-search-close]')) setSearch(false); });
	}

	/* ---------- Hero slider ---------- */
	var hero = $('.hero');
	if (hero) {
		var slides = $$('.hero__slide', hero);
		var captions = $$('.hero__caption', hero);
		var dots = $$('.hero__dot', hero);
		var countEl = $('.hero__count b', hero);
		var current = 0;
		var timer = null;
		var delay = 6500;

		function go(i) {
			if (!slides.length) return;
			current = (i + slides.length) % slides.length;
			slides.forEach(function (s, k) { s.classList.toggle('is-active', k === current); });
			captions.forEach(function (c, k) { c.classList.toggle('is-active', k === current); });
			dots.forEach(function (d, k) {
				d.classList.remove('is-active');
				d.classList.toggle('is-done', k < current);
				if (k === current) { void d.offsetWidth; d.classList.add('is-active'); }
				d.setAttribute('aria-current', k === current ? 'true' : 'false');
			});
			if (countEl) countEl.textContent = String(current + 1).padStart(2, '0');
			schedule();
		}
		function schedule() {
			clearTimeout(timer);
			if (slides.length < 2 || reduceMotion || hero.classList.contains('is-paused')) return;
			timer = setTimeout(function () { go(current + 1); }, delay);
		}
		hero.style.setProperty('--hero-delay', delay + 'ms');
		dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
		var prev = $('[data-hero-prev]', hero), next = $('[data-hero-next]', hero);
		if (prev) prev.addEventListener('click', function () { go(current - 1); });
		if (next) next.addEventListener('click', function () { go(current + 1); });
		hero.addEventListener('mouseenter', function () { hero.classList.add('is-paused'); clearTimeout(timer); });
		hero.addEventListener('mouseleave', function () { hero.classList.remove('is-paused'); schedule(); });
		go(0);
	}

	/* ---------- Horizontal scrollers ---------- */
	$$('[data-scroller]').forEach(function (root) {
		var track = $('.scroller__track', root);
		var prev = $('[data-scroll-prev]', root.closest('section') || root);
		var next = $('[data-scroll-next]', root.closest('section') || root);
		if (!track) return;
		function step() {
			var first = track.firstElementChild;
			return first ? first.getBoundingClientRect().width + 28 : track.clientWidth;
		}
		function update() {
			var max = track.scrollWidth - track.clientWidth - 2;
			if (prev) prev.disabled = track.scrollLeft <= 2;
			if (next) next.disabled = track.scrollLeft >= max;
			var nav = prev && prev.parentElement;
			if (nav) nav.style.display = max <= 0 ? 'none' : '';
		}
		if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: 'smooth' }); });
		if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: 'smooth' }); });
		track.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		update();
	});

	/* ---------- Lightbox ---------- */
	var lb, lbImg, lbCount, lbItems = [], lbIndex = 0;
	function buildLightbox() {
		lb = document.createElement('div');
		lb.className = 'lightbox';
		lb.setAttribute('role', 'dialog');
		lb.setAttribute('aria-modal', 'true');
		lb.innerHTML =
			'<img alt="">' +
			'<button class="lightbox__btn lightbox__close" type="button" aria-label="Закрыть"><i class="fas fa-times"></i></button>' +
			'<button class="lightbox__btn lightbox__prev" type="button" aria-label="Назад"><i class="fas fa-arrow-left"></i></button>' +
			'<button class="lightbox__btn lightbox__next" type="button" aria-label="Вперёд"><i class="fas fa-arrow-right"></i></button>' +
			'<div class="lightbox__count"></div>';
		document.body.appendChild(lb);
		lbImg = $('img', lb);
		lbCount = $('.lightbox__count', lb);
		$('.lightbox__close', lb).addEventListener('click', closeLb);
		$('.lightbox__prev', lb).addEventListener('click', function () { showLb(lbIndex - 1); });
		$('.lightbox__next', lb).addEventListener('click', function () { showLb(lbIndex + 1); });
		lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
	}
	function showLb(i) {
		lbIndex = (i + lbItems.length) % lbItems.length;
		lbImg.src = lbItems[lbIndex];
		lbCount.textContent = (lbIndex + 1) + ' / ' + lbItems.length;
		var multi = lbItems.length > 1;
		$('.lightbox__prev', lb).style.display = multi ? '' : 'none';
		$('.lightbox__next', lb).style.display = multi ? '' : 'none';
		lbCount.style.display = multi ? '' : 'none';
	}
	function openLb(items, i) {
		if (!lb) buildLightbox();
		lbItems = items;
		showLb(i);
		lb.classList.add('is-open');
		document.body.style.overflow = 'hidden';
	}
	function closeLb() {
		lb.classList.remove('is-open');
		document.body.style.overflow = '';
	}
	document.addEventListener('click', function (e) {
		var a = e.target.closest('[data-lightbox]');
		if (!a) return;
		e.preventDefault();
		var group = a.getAttribute('data-lightbox');
		var all = $$('[data-lightbox="' + group + '"]');
		openLb(all.map(function (x) { return x.getAttribute('href'); }), all.indexOf(a));
	});
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			if (lb && lb.classList.contains('is-open')) closeLb();
			setSearch(false);
			if (document.body.classList.contains('nav-open') && burger) burger.click();
		}
		if (lb && lb.classList.contains('is-open')) {
			if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
			if (e.key === 'ArrowRight') showLb(lbIndex + 1);
		}
	});

	/* ---------- Product gallery ---------- */
	var gallery = $('[data-gallery]');
	if (gallery) {
		var main = $('.gallery__main', gallery);
		var mainImg = $('img', main);
		var thumbs = $$('.gallery__thumb', gallery);
		var srcs = thumbs.length ? thumbs.map(function (t) { return t.getAttribute('data-src'); }) : [mainImg.getAttribute('src')];
		var active = 0;
		thumbs.forEach(function (t, k) {
			t.addEventListener('click', function () {
				active = k;
				mainImg.src = srcs[k];
				thumbs.forEach(function (x, j) { x.classList.toggle('is-active', j === k); });
			});
		});
		main.addEventListener('click', function () { openLb(srcs, active); });
		main.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(srcs, active); } });
	}

	/* ---------- Count-up for stats ---------- */
	function countUp(el) {
		var target = parseInt(el.getAttribute('data-count'), 10);
		if (isNaN(target) || reduceMotion) return;
		var start = null, dur = 1400;
		function tick(ts) {
			if (!start) start = ts;
			var p = Math.min((ts - start) / dur, 1);
			el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('ru-RU');
			if (p < 1) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
	}

	/* ---------- Reveal on scroll ---------- */
	var revealEls = $$('.reveal, .reveal-group');
	if ('IntersectionObserver' in window) {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (en) {
				if (!en.isIntersecting) return;
				en.target.classList.add('is-in');
				$$('[data-count]', en.target).forEach(countUp);
				io.unobserve(en.target);
			});
		}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
		revealEls.forEach(function (el) { io.observe(el); });
	} else {
		revealEls.forEach(function (el) { el.classList.add('is-in'); });
	}
})();
