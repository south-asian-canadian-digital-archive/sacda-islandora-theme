/**
 * Custom Bun build script for multi-entry JS files with Tailwind CLI
 * Uses official Tailwind CLI (no plugins needed)
 * Reference: https://stackoverflow.com/questions/79814548
 */

import { globSync } from "glob";
import { spawn } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { mkdirSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

// ANSI colors
const colors = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	dim: "\x1b[2m",
	green: "\x1b[32m",
	cyan: "\x1b[36m",
	yellow: "\x1b[33m",
	red: "\x1b[31m",
};

const WIDTH = 60;

function line(char = "-"): string {
	return "+" + char.repeat(WIDTH - 2) + "+";
}

function padLine(text: string, align: "left" | "center" = "left"): string {
	const inner = WIDTH - 4;
	let padded: string;
	if (align === "center") {
		const leftPad = Math.floor((inner - text.length) / 2);
		const rightPad = inner - text.length - leftPad;
		padded = " ".repeat(leftPad) + text + " ".repeat(rightPad);
	} else {
		padded = text.padEnd(inner);
	}
	return "| " + padded + " |";
}

function printHeader(): void {
	console.log(colors.cyan + line() + colors.reset);
	console.log(
		colors.cyan +
		padLine("SACDA Theme Build (Bun)", "center") +
		colors.reset,
	);
	console.log(colors.cyan + line() + colors.reset);
}

function printSection(title: string, files: string[]): void {
	console.log("");
	console.log(colors.bold + `[${title}]` + colors.reset);
	if (files.length === 0) {
		console.log(colors.dim + "  (none)" + colors.reset);
	} else {
		for (const file of files.sort()) {
			console.log(colors.dim + "  ✓ " + colors.reset + file);
		}
	}
}

function printFooter(success: boolean, jsCount: number): void {
	console.log("");
	const status = success ? colors.green : colors.red;
	const message = success ? "[DONE] Build completed" : "[ERROR] Build failed";
	console.log(status + line() + colors.reset);
	console.log(status + padLine(message) + colors.reset);
	if (success) {
		console.log(
			status +
			padLine(`Built ${jsCount} JavaScript file(s)`) +
			colors.reset,
		);
	}
	console.log(status + line() + colors.reset);
}

function runCommand(
	command: string,
	args: string[],
	options: { cwd?: string } = {},
): Promise<boolean> {
	return new Promise((resolve) => {
		const proc = spawn(command, args, {
			cwd: options.cwd || rootDir,
			stdio: "inherit",
			shell: true,
		});

		proc.on("close", (code) => {
			resolve(code === 0);
		});

		proc.on("error", (error) => {
			console.error(
				colors.red + `  ✗ Error: ${error.message}` + colors.reset,
			);
			resolve(false);
		});
	});
}

async function buildCSS(isWatch: boolean = false): Promise<boolean> {
	console.log(
		colors.yellow + "\n→ Building CSS with Tailwind CLI..." + colors.reset,
	);

	const args = ["-i", "src/css/main.css", "-o", "dist/styles.css"];

	if (isWatch) {
		args.push("--watch");
		console.log(colors.dim + "  (watching for changes)" + colors.reset);
	} else {
		args.push("--minify");
	}

	return runCommand("tailwindcss", args);
}

async function buildJS(files: string[]): Promise<boolean> {
	console.log(
		colors.yellow + "\n→ Building JavaScript files..." + colors.reset,
	);

	let success = true;

	for (const file of files.sort()) {
		const name = file.replace("src/js/", "").replace(/\.(m?[jt]s)$/, "");
		const outFile = `dist/${name}.js`;

		// Ensure output directory exists
		const outDir = dirname(resolve(rootDir, outFile));
		mkdirSync(outDir, { recursive: true });

		console.log(`  Processing: ${file} → ${outFile}`);

		const buildSuccess = await runCommand("bun", [
			"build",
			resolve(rootDir, file),
			"--outfile",
			resolve(rootDir, outFile),
			"--minify",
			"--format=iife",
		]);

		if (!buildSuccess) {
			console.log(
				colors.red + `  ✗ Failed to build ${file}` + colors.reset,
			);
			success = false;
		}
	}

	return success;
}

async function main(): Promise<void> {
	printHeader();

	const isWatch = process.argv.includes("--watch");

	try {
		// Find all JS/TS files in src/js/
		const jsFiles = globSync("src/js/**/*.{js,ts,mjs,mts}", {
			cwd: rootDir,
		});

		printSection("Found JavaScript Files", jsFiles);

		// Build CSS with Tailwind CLI (single entry point)
		let success = await buildCSS(isWatch);

		if (!success && !isWatch) {
			// If watch mode, Tailwind will continue running
			printFooter(false, 0);
			process.exit(1);
		}

		// Build JS files (only if not in watch mode for CSS)
		if (!isWatch) {
			if (jsFiles.length > 0) {
				success = await buildJS(jsFiles);
			} else {
				console.log(
					colors.dim +
					"\n  ℹ No JS files found, skipping JS build" +
					colors.reset,
				);
			}

			if (!success) {
				printFooter(false, jsFiles.length);
				process.exit(1);
			}

			printFooter(true, jsFiles.length);
		}
	} catch (error) {
		console.error(colors.red + "Build error:" + colors.reset, error);
		printFooter(false, 0);
		process.exit(1);
	}
}

main();
