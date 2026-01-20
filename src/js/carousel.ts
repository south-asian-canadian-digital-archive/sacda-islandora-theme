/**
 * @file
 * Embla Carousel component (shadcn-style)
 * Uses Embla Carousel with autoplay plugin
 * Supports responsive slidesPerView via data attributes
 */

import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarouselElement extends HTMLElement {
	dataset: DOMStringMap & { 
		autoplayDelay?: string; 
		slidesPerView?: string;
		slidesTablet?: string;
		slidesMobile?: string;
	};
}

// Breakpoint definitions (matches Tailwind defaults)
const BREAKPOINTS = {
	mobile: 640,  // < 640px = mobile
	tablet: 1024, // 640-1024px = tablet
	// > 1024px = desktop
};

class SacdaCarousel {
	private root: CarouselElement;
	private viewport: HTMLElement | null;
	private embla: EmblaCarouselType | null = null;
	private prevBtns: NodeListOf<HTMLButtonElement>;
	private nextBtns: NodeListOf<HTMLButtonElement>;
	private dotsContainer: HTMLElement | null;
	private dots: HTMLButtonElement[] = [];
	private autoplayDelay: number;
	private currentBreakpoint: 'mobile' | 'tablet' | 'desktop' = 'desktop';
	private mediaQueryMobile: MediaQueryList;
	private mediaQueryTablet: MediaQueryList;

	constructor(element: CarouselElement) {
		this.root = element;
		this.viewport = element.querySelector("[data-carousel-viewport]");
		this.prevBtns = element.querySelectorAll("[data-carousel-prev]");
		this.nextBtns = element.querySelectorAll("[data-carousel-next]");
		this.dotsContainer = element.querySelector("[data-carousel-dots]");
		this.autoplayDelay = parseInt(element.dataset.autoplayDelay || "5000", 10);

		// Setup media queries
		this.mediaQueryMobile = window.matchMedia(`(max-width: ${BREAKPOINTS.mobile - 1}px)`);
		this.mediaQueryTablet = window.matchMedia(`(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`);

		if (!this.viewport) return;

		this.init();
		this.setupBreakpointListeners();
	}

	private getCurrentBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
		if (this.mediaQueryMobile.matches) return 'mobile';
		if (this.mediaQueryTablet.matches) return 'tablet';
		return 'desktop';
	}

	private getSlidesPerView(): number {
		const breakpoint = this.getCurrentBreakpoint();
		
		if (breakpoint === 'mobile') {
			return parseInt(this.root.dataset.slidesMobile || "1", 10);
		}
		if (breakpoint === 'tablet') {
			return parseInt(this.root.dataset.slidesTablet || this.root.dataset.slidesPerView || "1", 10);
		}
		return parseInt(this.root.dataset.slidesPerView || "1", 10);
	}

	private updateSlideBasis(slidesPerView: number): void {
		const slides = this.root.querySelectorAll<HTMLElement>('.carousel-slide');
		slides.forEach(slide => {
			slide.style.flexBasis = `calc(100% / ${slidesPerView})`;
		});
	}

	private setupBreakpointListeners(): void {
		const handleBreakpointChange = () => {
			const newBreakpoint = this.getCurrentBreakpoint();
			if (newBreakpoint !== this.currentBreakpoint) {
				this.currentBreakpoint = newBreakpoint;
				this.reinit();
			}
		};

		this.mediaQueryMobile.addEventListener('change', handleBreakpointChange);
		this.mediaQueryTablet.addEventListener('change', handleBreakpointChange);
	}

	private reinit(): void {
		// Destroy existing instance
		if (this.embla) {
			this.embla.destroy();
		}
		// Reinitialize with new settings
		this.init();
	}

	private init(): void {
		const slidesPerView = this.getSlidesPerView();
		this.currentBreakpoint = this.getCurrentBreakpoint();

		// Update slide flex-basis for current breakpoint
		this.updateSlideBasis(slidesPerView);

		const options: EmblaOptionsType = {
			loop: true,
			align: "start",
			slidesToScroll: slidesPerView > 1 ? slidesPerView : 1,
		};

		const autoplayPlugin = Autoplay({
			delay: this.autoplayDelay,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		});

		this.embla = EmblaCarousel(this.viewport!, options, [autoplayPlugin]);

		// Setup navigation buttons (all prev/next buttons)
		this.prevBtns.forEach(btn => {
			btn.addEventListener("click", () => this.embla?.scrollPrev());
		});
		this.nextBtns.forEach(btn => {
			btn.addEventListener("click", () => this.embla?.scrollNext());
		});

		// Setup dots
		this.setupDots();

		// Update button states
		this.embla.on("select", () => this.updateState());
		this.embla.on("init", () => this.updateState());

		// Keyboard navigation
		this.root.addEventListener("keydown", (e) => {
			if (e.key === "ArrowLeft") this.embla?.scrollPrev();
			if (e.key === "ArrowRight") this.embla?.scrollNext();
		});
	}

	private setupDots(): void {
		if (!this.dotsContainer || !this.embla) return;

		const slidesCount = this.embla.scrollSnapList().length;

		// Clear existing dots
		this.dotsContainer.innerHTML = "";
		this.dots = [];

		for (let i = 0; i < slidesCount; i++) {
			const dot = document.createElement("button");
			dot.type = "button";
			dot.className =
				"w-2 h-2 rounded-full transition-all duration-300 bg-white/50 hover:bg-white/80 data-[active=true]:w-6 data-[active=true]:bg-primary";
			dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
			dot.addEventListener("click", () => this.embla?.scrollTo(i));
			this.dotsContainer.appendChild(dot);
			this.dots.push(dot);
		}
	}

	private updateState(): void {
		if (!this.embla) return;

		const selectedIndex = this.embla.selectedScrollSnap();

		// Update dots
		this.dots.forEach((dot, i) => {
			dot.setAttribute("data-active", String(i === selectedIndex));
		});

		// Update button disabled states (optional for loop:true)
		const canScrollPrev = this.embla.canScrollPrev();
		const canScrollNext = this.embla.canScrollNext();

		this.prevBtns.forEach(btn => {
			btn.disabled = !canScrollPrev;
			btn.classList.toggle("opacity-50", !canScrollPrev);
		});
		this.nextBtns.forEach(btn => {
			btn.disabled = !canScrollNext;
			btn.classList.toggle("opacity-50", !canScrollNext);
		});
	}
}

// Initialize all carousels on page
function initCarousels(): void {
	document.querySelectorAll<CarouselElement>("[data-carousel]").forEach((el) => {
		new SacdaCarousel(el);
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initCarousels);
} else {
	initCarousels();
}

