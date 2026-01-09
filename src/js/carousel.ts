/**
 * @file
 * Embla Carousel component (shadcn-style)
 * Uses Embla Carousel with autoplay plugin
 */

import EmblaCarousel, { type EmblaCarouselType, type EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

interface CarouselElement extends HTMLElement {
	dataset: DOMStringMap & { autoplayDelay?: string };
}

class SacdaCarousel {
	private root: HTMLElement;
	private viewport: HTMLElement | null;
	private embla: EmblaCarouselType | null = null;
	private prevBtn: HTMLButtonElement | null;
	private nextBtn: HTMLButtonElement | null;
	private dotsContainer: HTMLElement | null;
	private dots: HTMLButtonElement[] = [];
	private autoplayDelay: number;

	constructor(element: HTMLElement) {
		this.root = element;
		this.viewport = element.querySelector("[data-carousel-viewport]");
		this.prevBtn = element.querySelector("[data-carousel-prev]");
		this.nextBtn = element.querySelector("[data-carousel-next]");
		this.dotsContainer = element.querySelector("[data-carousel-dots]");
		this.autoplayDelay = parseInt(element.dataset.autoplayDelay || "5000", 10);

		if (!this.viewport) return;

		this.init();
	}

	private init(): void {
		const options: EmblaOptionsType = {
			loop: true,
			align: "start",
		};

		const autoplayPlugin = Autoplay({
			delay: this.autoplayDelay,
			stopOnInteraction: false,
			stopOnMouseEnter: true,
		});

		this.embla = EmblaCarousel(this.viewport!, options, [autoplayPlugin]);

		// Setup navigation buttons
		this.prevBtn?.addEventListener("click", () => this.embla?.scrollPrev());
		this.nextBtn?.addEventListener("click", () => this.embla?.scrollNext());

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

		if (this.prevBtn) {
			this.prevBtn.disabled = !canScrollPrev;
			this.prevBtn.classList.toggle("opacity-50", !canScrollPrev);
		}
		if (this.nextBtn) {
			this.nextBtn.disabled = !canScrollNext;
			this.nextBtn.classList.toggle("opacity-50", !canScrollNext);
		}
	}
}

// Initialize all carousels on page
function initCarousels(): void {
	document.querySelectorAll<HTMLElement>("[data-carousel]").forEach((el) => {
		new SacdaCarousel(el);
	});
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", initCarousels);
} else {
	initCarousels();
}
