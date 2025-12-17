typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const HYDRATION_ERROR = {}, UNINITIALIZED = Symbol();
var false_default = !1, is_array = Array.isArray, index_of = Array.prototype.indexOf, array_from = Array.from, object_keys = Object.keys, define_property = Object.defineProperty, get_descriptor = Object.getOwnPropertyDescriptor, get_descriptors = Object.getOwnPropertyDescriptors, object_prototype = Object.prototype, array_prototype = Array.prototype, get_prototype_of = Object.getPrototypeOf, is_extensible = Object.isExtensible;
function is_function(e) {
	return typeof e == "function";
}
const noop = () => {};
function run(e) {
	return e();
}
function run_all(e) {
	for (var O = 0; O < e.length; O++) e[O]();
}
function deferred() {
	var e, O;
	return {
		promise: new Promise((k, A) => {
			e = k, O = A;
		}),
		resolve: e,
		reject: O
	};
}
function to_array(e, O) {
	if (Array.isArray(e)) return e;
	if (O === void 0 || !(Symbol.iterator in e)) return Array.from(e);
	let k = [];
	for (let A of e) if (k.push(A), k.length === O) break;
	return k;
}
const CLEAN = 1024, DIRTY = 2048, MAYBE_DIRTY = 4096, INERT = 8192, EFFECT_TRANSPARENT = 65536, EFFECT_PRESERVED = 1 << 19, USER_EFFECT = 1 << 20, EFFECT_OFFSCREEN = 1 << 25, WAS_MARKED = 32768, REACTION_IS_UPDATING = 1 << 21, ERROR_VALUE = 1 << 23, STATE_SYMBOL = Symbol("$state"), LEGACY_PROPS = Symbol("legacy props"), LOADING_ATTR_SYMBOL = Symbol(""), STALE_REACTION = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function lifecycle_outside_component(e) {
	throw Error("https://svelte.dev/e/lifecycle_outside_component");
}
function async_derived_orphan() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function effect_in_teardown(e) {
	throw Error("https://svelte.dev/e/effect_in_teardown");
}
function effect_in_unowned_derived() {
	throw Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function effect_orphan(e) {
	throw Error("https://svelte.dev/e/effect_orphan");
}
function effect_update_depth_exceeded() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hydration_failed() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function props_invalid_value(e) {
	throw Error("https://svelte.dev/e/props_invalid_value");
}
function state_descriptors_fixed() {
	throw Error("https://svelte.dev/e/state_descriptors_fixed");
}
function state_prototype_fixed() {
	throw Error("https://svelte.dev/e/state_prototype_fixed");
}
function state_unsafe_mutation() {
	throw Error("https://svelte.dev/e/state_unsafe_mutation");
}
function svelte_boundary_reset_onerror() {
	throw Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
function hydration_mismatch(e) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function select_multiple_invalid_value() {
	console.warn("https://svelte.dev/e/select_multiple_invalid_value");
}
function svelte_boundary_reset_noop() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let hydrating = !1;
function set_hydrating(e) {
	hydrating = e;
}
let hydrate_node;
function set_hydrate_node(O) {
	if (O === null) throw hydration_mismatch(), HYDRATION_ERROR;
	return hydrate_node = O;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function reset(O) {
	if (hydrating) {
		if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) throw hydration_mismatch(), HYDRATION_ERROR;
		hydrate_node = O;
	}
}
function next(e = 1) {
	if (hydrating) {
		for (var O = e, k = hydrate_node; O--;) k = /* @__PURE__ */ get_next_sibling(k);
		hydrate_node = k;
	}
}
function skip_nodes(e = !0) {
	for (var O = 0, k = hydrate_node;;) {
		if (k.nodeType === 8) {
			var A = k.data;
			if (A === "]") {
				if (O === 0) return k;
				--O;
			} else (A === "[" || A === "[!") && (O += 1);
		}
		var j = /* @__PURE__ */ get_next_sibling(k);
		e && k.remove(), k = j;
	}
}
function read_hydration_instruction(O) {
	if (!O || O.nodeType !== 8) throw hydration_mismatch(), HYDRATION_ERROR;
	return O.data;
}
function equals(e) {
	return e === this.v;
}
function safe_not_equal(e, O) {
	return e == e ? e !== O || typeof e == "object" && !!e || typeof e == "function" : O == O;
}
function safe_equals(e) {
	return !safe_not_equal(e, this.v);
}
let legacy_mode_flag = !1;
function enable_legacy_mode_flag() {
	legacy_mode_flag = !0;
}
let component_context = null;
function set_component_context(e) {
	component_context = e;
}
function getContext(e) {
	return get_or_init_context_map("getContext").get(e);
}
function setContext(e, O) {
	return get_or_init_context_map("setContext").set(e, O), O;
}
function hasContext(e) {
	return get_or_init_context_map("hasContext").has(e);
}
function getAllContexts() {
	return get_or_init_context_map("getAllContexts");
}
function push(e, O = !1, k) {
	component_context = {
		p: component_context,
		i: !1,
		c: null,
		e: null,
		s: e,
		x: null,
		l: legacy_mode_flag && !O ? {
			s: null,
			u: null,
			$: []
		} : null
	};
}
function pop(e) {
	var O = component_context, k = O.e;
	if (k !== null) {
		O.e = null;
		for (var A of k) create_user_effect(A);
	}
	return e !== void 0 && (O.x = e), O.i = !0, component_context = O.p, e ?? {};
}
function is_runes() {
	return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
function get_or_init_context_map(e) {
	return component_context === null && lifecycle_outside_component(e), component_context.c ??= new Map(get_parent_context(component_context) || void 0);
}
function get_parent_context(e) {
	let O = e.p;
	for (; O !== null;) {
		let e = O.c;
		if (e !== null) return e;
		O = O.p;
	}
	return null;
}
var micro_tasks = [];
function run_micro_tasks() {
	var e = micro_tasks;
	micro_tasks = [], run_all(e);
}
function queue_micro_task(e) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var O = micro_tasks;
		queueMicrotask(() => {
			O === micro_tasks && run_micro_tasks();
		});
	}
	micro_tasks.push(e);
}
function flush_tasks() {
	for (; micro_tasks.length > 0;) run_micro_tasks();
}
function handle_error(e) {
	var O = active_effect;
	if (O === null) return active_reaction.f |= ERROR_VALUE, e;
	if (O.f & 32768) invoke_error_boundary(e, O);
	else {
		if (!(O.f & 128)) throw e;
		O.b.error(e);
	}
}
function invoke_error_boundary(e, O) {
	for (; O !== null;) {
		if (O.f & 128) try {
			O.b.error(e);
			return;
		} catch (O) {
			e = O;
		}
		O = O.parent;
	}
	throw e;
}
var batches = /* @__PURE__ */ new Set();
let current_batch = null, batch_values = null;
var queued_root_effects = [], last_scheduled_effect = null, is_flushing = !1;
let is_flushing_sync = !1;
var Batch = class e {
	committed = !1;
	current = /* @__PURE__ */ new Map();
	previous = /* @__PURE__ */ new Map();
	#e = /* @__PURE__ */ new Set();
	#t = /* @__PURE__ */ new Set();
	#n = 0;
	#r = 0;
	#i = null;
	#a = /* @__PURE__ */ new Set();
	#o = /* @__PURE__ */ new Set();
	skipped_effects = /* @__PURE__ */ new Set();
	is_fork = !1;
	is_deferred() {
		return this.is_fork || this.#r > 0;
	}
	process(e) {
		queued_root_effects = [], this.apply();
		var O = {
			parent: null,
			effect: null,
			effects: [],
			render_effects: []
		};
		for (let k of e) this.#s(k, O);
		this.is_fork || this.#u(), this.is_deferred() ? (this.#c(O.effects), this.#c(O.render_effects)) : (current_batch = null, flush_queued_effects(O.render_effects), flush_queued_effects(O.effects), this.#i?.resolve()), batch_values = null;
	}
	#s(e, O) {
		e.f ^= CLEAN;
		for (var k = e.first; k !== null;) {
			var A = k.f, j = (A & 96) != 0, M = j && (A & 1024) != 0 || (A & 8192) != 0 || this.skipped_effects.has(k);
			if (k.f & 128 && k.b?.is_pending() && (O = {
				parent: O,
				effect: k,
				effects: [],
				render_effects: []
			}), !M && k.fn !== null) {
				j ? k.f ^= CLEAN : A & 4 ? O.effects.push(k) : is_dirty(k) && (k.f & 16 && this.#a.add(k), update_effect(k));
				var N = k.first;
				if (N !== null) {
					k = N;
					continue;
				}
			}
			var P = k.parent;
			for (k = k.next; k === null && P !== null;) P === O.effect && (this.#c(O.effects), this.#c(O.render_effects), O = O.parent), k = P.next, P = P.parent;
		}
	}
	#c(e) {
		for (let O of e) O.f & 2048 ? this.#a.add(O) : O.f & 4096 && this.#o.add(O), this.#l(O.deps), set_signal_status(O, CLEAN);
	}
	#l(e) {
		if (e !== null) for (let O of e) !(O.f & 2) || !(O.f & 32768) || (O.f ^= WAS_MARKED, this.#l(O.deps));
	}
	capture(e, O) {
		this.previous.has(e) || this.previous.set(e, O), e.f & 8388608 || (this.current.set(e, e.v), batch_values?.set(e, e.v));
	}
	activate() {
		current_batch = this, this.apply();
	}
	deactivate() {
		current_batch === this && (current_batch = null, batch_values = null);
	}
	flush() {
		if (this.activate(), queued_root_effects.length > 0) {
			if (flush_effects(), current_batch !== null && current_batch !== this) return;
		} else this.#n === 0 && this.process([]);
		this.deactivate();
	}
	discard() {
		for (let e of this.#t) e(this);
		this.#t.clear();
	}
	#u() {
		if (this.#r === 0) {
			for (let e of this.#e) e();
			this.#e.clear();
		}
		this.#n === 0 && this.#d();
	}
	#d() {
		if (batches.size > 1) {
			this.previous.clear();
			var e = batch_values, O = !0, k = {
				parent: null,
				effect: null,
				effects: [],
				render_effects: []
			};
			for (let e of batches) {
				if (e === this) {
					O = !1;
					continue;
				}
				let j = [];
				for (let [k, A] of this.current) {
					if (e.current.has(k)) if (O && A !== e.current.get(k)) e.current.set(k, A);
					else continue;
					j.push(k);
				}
				if (j.length === 0) continue;
				let M = [...e.current.keys()].filter((e) => !this.current.has(e));
				if (M.length > 0) {
					var A = queued_root_effects;
					queued_root_effects = [];
					let O = /* @__PURE__ */ new Set(), N = /* @__PURE__ */ new Map();
					for (let e of j) mark_effects(e, M, O, N);
					if (queued_root_effects.length > 0) {
						current_batch = e, e.apply();
						for (let O of queued_root_effects) e.#s(O, k);
						e.deactivate();
					}
					queued_root_effects = A;
				}
			}
			current_batch = null, batch_values = e;
		}
		this.committed = !0, batches.delete(this);
	}
	increment(e) {
		this.#n += 1, e && (this.#r += 1);
	}
	decrement(e) {
		--this.#n, e && --this.#r, this.revive();
	}
	revive() {
		for (let e of this.#a) this.#o.delete(e), set_signal_status(e, DIRTY), schedule_effect(e);
		for (let e of this.#o) set_signal_status(e, MAYBE_DIRTY), schedule_effect(e);
		this.flush();
	}
	oncommit(e) {
		this.#e.add(e);
	}
	ondiscard(e) {
		this.#t.add(e);
	}
	settled() {
		return (this.#i ??= deferred()).promise;
	}
	static ensure() {
		if (current_batch === null) {
			let O = current_batch = new e();
			batches.add(current_batch), is_flushing_sync || e.enqueue(() => {
				current_batch === O && O.flush();
			});
		}
		return current_batch;
	}
	static enqueue(e) {
		queue_micro_task(e);
	}
	apply() {}
};
function flushSync(e) {
	var O = is_flushing_sync;
	is_flushing_sync = !0;
	try {
		var k;
		for (e && (current_batch !== null && flush_effects(), k = e());;) {
			if (flush_tasks(), queued_root_effects.length === 0 && (current_batch?.flush(), queued_root_effects.length === 0)) return last_scheduled_effect = null, k;
			flush_effects();
		}
	} finally {
		is_flushing_sync = O;
	}
}
function flush_effects() {
	var e = is_updating_effect;
	is_flushing = !0;
	try {
		var O = 0;
		for (set_is_updating_effect(!0); queued_root_effects.length > 0;) {
			var k = Batch.ensure();
			O++ > 1e3 && infinite_loop_guard(), k.process(queued_root_effects), old_values.clear();
		}
	} finally {
		is_flushing = !1, set_is_updating_effect(e), last_scheduled_effect = null;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (e) {
		invoke_error_boundary(e, last_scheduled_effect);
	}
}
let eager_block_effects = null;
function flush_queued_effects(e) {
	var O = e.length;
	if (O !== 0) {
		for (var k = 0; k < O;) {
			var A = e[k++];
			if (!(A.f & 24576) && is_dirty(A) && (eager_block_effects = /* @__PURE__ */ new Set(), update_effect(A), A.deps === null && A.first === null && A.nodes === null && (A.teardown === null && A.ac === null ? unlink_effect(A) : A.fn = null), eager_block_effects?.size > 0)) {
				old_values.clear();
				for (let e of eager_block_effects) {
					if (e.f & 24576) continue;
					let O = [e], k = e.parent;
					for (; k !== null;) eager_block_effects.has(k) && (eager_block_effects.delete(k), O.push(k)), k = k.parent;
					for (let e = O.length - 1; e >= 0; e--) {
						let k = O[e];
						k.f & 24576 || update_effect(k);
					}
				}
				eager_block_effects.clear();
			}
		}
		eager_block_effects = null;
	}
}
function mark_effects(e, O, k, A) {
	if (!k.has(e) && (k.add(e), e.reactions !== null)) for (let j of e.reactions) {
		let e = j.f;
		e & 2 ? mark_effects(j, O, k, A) : e & 4194320 && !(e & 2048) && depends_on(j, O, A) && (set_signal_status(j, DIRTY), schedule_effect(j));
	}
}
function depends_on(e, O, k) {
	let A = k.get(e);
	if (A !== void 0) return A;
	if (e.deps !== null) for (let A of e.deps) {
		if (O.includes(A)) return !0;
		if (A.f & 2 && depends_on(A, O, k)) return k.set(A, !0), !0;
	}
	return k.set(e, !1), !1;
}
function schedule_effect(e) {
	for (var O = last_scheduled_effect = e; O.parent !== null;) {
		O = O.parent;
		var k = O.f;
		if (is_flushing && O === active_effect && k & 16 && !(k & 262144)) return;
		if (k & 96) {
			if (!(k & 1024)) return;
			O.f ^= CLEAN;
		}
	}
	queued_root_effects.push(O);
}
function createSubscriber(e) {
	let O = 0, k = source(0), A;
	return () => {
		effect_tracking() && (get(k), render_effect(() => (O === 0 && (A = untrack(() => e(() => increment(k)))), O += 1, () => {
			queue_micro_task(() => {
				--O, O === 0 && (A?.(), A = void 0, increment(k));
			});
		})));
	};
}
var flags = EFFECT_PRESERVED | 65664;
function boundary(e, O, k) {
	new Boundary(e, O, k);
}
var Boundary = class {
	parent;
	#e = !1;
	#t;
	#n = hydrating ? hydrate_node : null;
	#r;
	#i;
	#a;
	#o = null;
	#s = null;
	#c = null;
	#l = null;
	#u = null;
	#d = 0;
	#f = 0;
	#p = !1;
	#m = null;
	#h = createSubscriber(() => (this.#m = source(this.#d), () => {
		this.#m = null;
	}));
	constructor(e, O, k) {
		this.#t = e, this.#r = O, this.#i = k, this.parent = active_effect.b, this.#e = !!this.#r.pending, this.#a = block(() => {
			if (active_effect.b = this, hydrating) {
				let e = this.#n;
				hydrate_next(), e.nodeType === 8 && e.data === "[!" ? this.#_() : this.#g();
			} else {
				var e = this.#v();
				try {
					this.#o = branch(() => k(e));
				} catch (e) {
					this.error(e);
				}
				this.#f > 0 ? this.#b() : this.#e = !1;
			}
			return () => {
				this.#u?.remove();
			};
		}, flags), hydrating && (this.#t = hydrate_node);
	}
	#g() {
		try {
			this.#o = branch(() => this.#i(this.#t));
		} catch (e) {
			this.error(e);
		}
		this.#e = !1;
	}
	#_() {
		let e = this.#r.pending;
		e && (this.#s = branch(() => e(this.#t)), Batch.enqueue(() => {
			var e = this.#v();
			this.#o = this.#y(() => (Batch.ensure(), branch(() => this.#i(e)))), this.#f > 0 ? this.#b() : (pause_effect(this.#s, () => {
				this.#s = null;
			}), this.#e = !1);
		}));
	}
	#v() {
		var e = this.#t;
		return this.#e && (this.#u = create_text(), this.#t.before(this.#u), e = this.#u), e;
	}
	is_pending() {
		return this.#e || !!this.parent && this.parent.is_pending();
	}
	has_pending_snippet() {
		return !!this.#r.pending;
	}
	#y(e) {
		var O = active_effect, k = active_reaction, A = component_context;
		set_active_effect(this.#a), set_active_reaction(this.#a), set_component_context(this.#a.ctx);
		try {
			return e();
		} catch (e) {
			return handle_error(e), null;
		} finally {
			set_active_effect(O), set_active_reaction(k), set_component_context(A);
		}
	}
	#b() {
		let e = this.#r.pending;
		this.#o !== null && (this.#l = document.createDocumentFragment(), this.#l.append(this.#u), move_effect(this.#o, this.#l)), this.#s === null && (this.#s = branch(() => e(this.#t)));
	}
	#x(e) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#x(e);
			return;
		}
		this.#f += e, this.#f === 0 && (this.#e = !1, this.#s && pause_effect(this.#s, () => {
			this.#s = null;
		}), this.#l &&= (this.#t.before(this.#l), null));
	}
	update_pending_count(e) {
		this.#x(e), this.#d += e, this.#m && internal_set(this.#m, this.#d);
	}
	get_effect_pending() {
		return this.#h(), get(this.#m);
	}
	error(e) {
		var O = this.#r.onerror;
		let k = this.#r.failed;
		if (this.#p || !O && !k) throw e;
		this.#o &&= (destroy_effect(this.#o), null), this.#s &&= (destroy_effect(this.#s), null), this.#c &&= (destroy_effect(this.#c), null), hydrating && (set_hydrate_node(this.#n), next(), set_hydrate_node(skip_nodes()));
		var A = !1, j = !1;
		let M = () => {
			if (A) {
				svelte_boundary_reset_noop();
				return;
			}
			A = !0, j && svelte_boundary_reset_onerror(), Batch.ensure(), this.#d = 0, this.#c !== null && pause_effect(this.#c, () => {
				this.#c = null;
			}), this.#e = this.has_pending_snippet(), this.#o = this.#y(() => (this.#p = !1, branch(() => this.#i(this.#t)))), this.#f > 0 ? this.#b() : this.#e = !1;
		};
		var N = active_reaction;
		try {
			set_active_reaction(null), j = !0, O?.(e, M), j = !1;
		} catch (e) {
			invoke_error_boundary(e, this.#a && this.#a.parent);
		} finally {
			set_active_reaction(N);
		}
		k && queue_micro_task(() => {
			this.#c = this.#y(() => {
				Batch.ensure(), this.#p = !0;
				try {
					return branch(() => {
						k(this.#t, () => e, () => M);
					});
				} catch (e) {
					return invoke_error_boundary(e, this.#a.parent), null;
				} finally {
					this.#p = !1;
				}
			});
		});
	}
};
function flatten(e, O, k, A) {
	let j = is_runes() ? derived : derived_safe_equal;
	if (k.length === 0 && e.length === 0) {
		A(O.map(j));
		return;
	}
	var M = current_batch, N = active_effect, P = capture();
	function F() {
		Promise.all(k.map((e) => /* @__PURE__ */ async_derived(e))).then((e) => {
			P();
			try {
				A([...O.map(j), ...e]);
			} catch (e) {
				N.f & 16384 || invoke_error_boundary(e, N);
			}
			M?.deactivate(), unset_context();
		}).catch((e) => {
			invoke_error_boundary(e, N);
		});
	}
	e.length > 0 ? Promise.all(e).then(() => {
		P();
		try {
			return F();
		} finally {
			M?.deactivate(), unset_context();
		}
	}) : F();
}
function capture() {
	var e = active_effect, O = active_reaction, k = component_context, A = current_batch;
	return function(j = !0) {
		set_active_effect(e), set_active_reaction(O), set_component_context(k), j && A?.activate();
	};
}
function unset_context() {
	set_active_effect(null), set_active_reaction(null), set_component_context(null);
}
/* @__NO_SIDE_EFFECTS__ */
function derived(e) {
	var k = 2 | DIRTY, A = active_reaction !== null && active_reaction.f & 2 ? active_reaction : null;
	return active_effect !== null && (active_effect.f |= EFFECT_PRESERVED), {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: k,
		fn: e,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: A ?? active_effect,
		ac: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function async_derived(e, k) {
	let A = active_effect;
	A === null && async_derived_orphan();
	var j = A.b, M = void 0, N = source(UNINITIALIZED), P = !active_reaction, F = /* @__PURE__ */ new Map();
	return async_effect(() => {
		var O = deferred();
		M = O.promise;
		try {
			Promise.resolve(e()).then(O.resolve, O.reject).then(() => {
				k === current_batch && k.committed && k.deactivate(), unset_context();
			});
		} catch (e) {
			O.reject(e), unset_context();
		}
		var k = current_batch;
		if (P) {
			var A = !j.is_pending();
			j.update_pending_count(1), k.increment(A), F.get(k)?.reject(STALE_REACTION), F.delete(k), F.set(k, O);
		}
		let I = (e, O = void 0) => {
			if (k.activate(), O) O !== STALE_REACTION && (N.f |= ERROR_VALUE, internal_set(N, O));
			else {
				N.f & 8388608 && (N.f ^= ERROR_VALUE), internal_set(N, e);
				for (let [e, O] of F) {
					if (F.delete(e), e === k) break;
					O.reject(STALE_REACTION);
				}
			}
			P && (j.update_pending_count(-1), k.decrement(A));
		};
		O.promise.then(I, (e) => I(null, e || "unknown"));
	}), teardown(() => {
		for (let e of F.values()) e.reject(STALE_REACTION);
	}), new Promise((e) => {
		function O(k) {
			function A() {
				k === M ? e(N) : O(M);
			}
			k.then(A, A);
		}
		O(M);
	});
}
/* @__NO_SIDE_EFFECTS__ */
function user_derived(e) {
	let O = /* @__PURE__ */ derived(e);
	return push_reaction_value(O), O;
}
/* @__NO_SIDE_EFFECTS__ */
function derived_safe_equal(e) {
	let O = /* @__PURE__ */ derived(e);
	return O.equals = safe_equals, O;
}
function destroy_derived_effects(e) {
	var O = e.effects;
	if (O !== null) {
		e.effects = null;
		for (var k = 0; k < O.length; k += 1) destroy_effect(O[k]);
	}
}
function get_derived_parent_effect(e) {
	for (var O = e.parent; O !== null;) {
		if (!(O.f & 2)) return O.f & 16384 ? null : O;
		O = O.parent;
	}
	return null;
}
function execute_derived(e) {
	var O, k = active_effect;
	set_active_effect(get_derived_parent_effect(e));
	try {
		e.f &= ~WAS_MARKED, destroy_derived_effects(e), O = update_reaction(e);
	} finally {
		set_active_effect(k);
	}
	return O;
}
function update_derived(e) {
	var O = execute_derived(e);
	e.equals(O) || (current_batch?.is_fork || (e.v = O), e.wv = increment_write_version()), !is_destroying_effect && (batch_values === null ? set_signal_status(e, e.f & 512 ? CLEAN : MAYBE_DIRTY) : (effect_tracking() || current_batch?.is_fork) && batch_values.set(e, O));
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
var eager_effects_deferred = !1;
function source(e, O) {
	return {
		f: 0,
		v: e,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/* @__NO_SIDE_EFFECTS__ */
function state(e, O) {
	let k = source(e, O);
	return push_reaction_value(k), k;
}
/* @__NO_SIDE_EFFECTS__ */
function mutable_source(e, O = !1, k = !0) {
	let A = source(e);
	return O || (A.equals = safe_equals), legacy_mode_flag && k && component_context !== null && component_context.l !== null && (component_context.l.s ??= []).push(A), A;
}
function set(e, O, k = !1) {
	return active_reaction !== null && (!untracking || active_reaction.f & 131072) && is_runes() && active_reaction.f & 4325394 && !current_sources?.includes(e) && state_unsafe_mutation(), internal_set(e, k ? proxy(O) : O);
}
function internal_set(e, O) {
	if (!e.equals(O)) {
		var k = e.v;
		is_destroying_effect ? old_values.set(e, O) : old_values.set(e, k), e.v = O;
		var A = Batch.ensure();
		A.capture(e, k), e.f & 2 && (e.f & 2048 && execute_derived(e), set_signal_status(e, e.f & 512 ? CLEAN : MAYBE_DIRTY)), e.wv = increment_write_version(), mark_reactions(e, DIRTY), is_runes() && active_effect !== null && active_effect.f & 1024 && !(active_effect.f & 96) && (untracked_writes === null ? set_untracked_writes([e]) : untracked_writes.push(e)), !A.is_fork && eager_effects.size > 0 && !eager_effects_deferred && flush_eager_effects();
	}
	return O;
}
function flush_eager_effects() {
	eager_effects_deferred = !1;
	var e = is_updating_effect;
	set_is_updating_effect(!0);
	let O = Array.from(eager_effects);
	try {
		for (let e of O) e.f & 1024 && set_signal_status(e, MAYBE_DIRTY), is_dirty(e) && update_effect(e);
	} finally {
		set_is_updating_effect(e);
	}
	eager_effects.clear();
}
function increment(e) {
	set(e, e.v + 1);
}
function mark_reactions(e, O) {
	var k = e.reactions;
	if (k !== null) for (var A = is_runes(), j = k.length, M = 0; M < j; M++) {
		var N = k[M], P = N.f;
		if (!(!A && N === active_effect)) {
			var F = (P & DIRTY) === 0;
			if (F && set_signal_status(N, O), P & 2) {
				var I = N;
				batch_values?.delete(I), P & 32768 || (P & 512 && (N.f |= WAS_MARKED), mark_reactions(I, MAYBE_DIRTY));
			} else F && (P & 16 && eager_block_effects !== null && eager_block_effects.add(N), schedule_effect(N));
		}
	}
}
function proxy(e) {
	if (typeof e != "object" || !e || STATE_SYMBOL in e) return e;
	let k = get_prototype_of(e);
	if (k !== object_prototype && k !== array_prototype) return e;
	var j = /* @__PURE__ */ new Map(), M = is_array(e), N = /* @__PURE__ */ state(0), P = null, I = update_version, B = (e) => {
		if (update_version === I) return e();
		var O = active_reaction, k = update_version;
		set_active_reaction(null), set_update_version(I);
		var A = e();
		return set_active_reaction(O), set_update_version(k), A;
	};
	return M && j.set("length", /* @__PURE__ */ state(e.length, P)), new Proxy(e, {
		defineProperty(e, O, k) {
			(!("value" in k) || k.configurable === !1 || k.enumerable === !1 || k.writable === !1) && state_descriptors_fixed();
			var A = j.get(O);
			return A === void 0 ? A = B(() => {
				var e = /* @__PURE__ */ state(k.value, P);
				return j.set(O, e), e;
			}) : set(A, k.value, !0), !0;
		},
		deleteProperty(e, k) {
			var A = j.get(k);
			if (A === void 0) {
				if (k in e) {
					let e = B(() => /* @__PURE__ */ state(UNINITIALIZED, P));
					j.set(k, e), increment(N);
				}
			} else set(A, UNINITIALIZED), increment(N);
			return !0;
		},
		get(k, A, M) {
			if (A === STATE_SYMBOL) return e;
			var N = j.get(A), I = A in k;
			if (N === void 0 && (!I || get_descriptor(k, A)?.writable) && (N = B(() => /* @__PURE__ */ state(proxy(I ? k[A] : UNINITIALIZED), P)), j.set(A, N)), N !== void 0) {
				var L = get(N);
				return L === UNINITIALIZED ? void 0 : L;
			}
			return Reflect.get(k, A, M);
		},
		getOwnPropertyDescriptor(e, k) {
			var A = Reflect.getOwnPropertyDescriptor(e, k);
			if (A && "value" in A) {
				var M = j.get(k);
				M && (A.value = get(M));
			} else if (A === void 0) {
				var N = j.get(k), P = N?.v;
				if (N !== void 0 && P !== UNINITIALIZED) return {
					enumerable: !0,
					configurable: !0,
					value: P,
					writable: !0
				};
			}
			return A;
		},
		has(e, k) {
			if (k === STATE_SYMBOL) return !0;
			var A = j.get(k), M = A !== void 0 && A.v !== UNINITIALIZED || Reflect.has(e, k);
			return (A !== void 0 || active_effect !== null && (!M || get_descriptor(e, k)?.writable)) && (A === void 0 && (A = B(() => /* @__PURE__ */ state(M ? proxy(e[k]) : UNINITIALIZED, P)), j.set(k, A)), get(A) === UNINITIALIZED) ? !1 : M;
		},
		set(e, k, A, I) {
			var L = j.get(k), R = k in e;
			if (M && k === "length") for (var z = A; z < L.v; z += 1) {
				var V = j.get(z + "");
				V === void 0 ? z in e && (V = B(() => /* @__PURE__ */ state(UNINITIALIZED, P)), j.set(z + "", V)) : set(V, UNINITIALIZED);
			}
			if (L === void 0) (!R || get_descriptor(e, k)?.writable) && (L = B(() => /* @__PURE__ */ state(void 0, P)), set(L, proxy(A)), j.set(k, L));
			else {
				R = L.v !== UNINITIALIZED;
				var H = B(() => proxy(A));
				set(L, H);
			}
			var U = Reflect.getOwnPropertyDescriptor(e, k);
			if (U?.set && U.set.call(I, A), !R) {
				if (M && typeof k == "string") {
					var W = j.get("length"), G = Number(k);
					Number.isInteger(G) && G >= W.v && set(W, G + 1);
				}
				increment(N);
			}
			return !0;
		},
		ownKeys(e) {
			get(N);
			var k = Reflect.ownKeys(e).filter((e) => {
				var k = j.get(e);
				return k === void 0 || k.v !== UNINITIALIZED;
			});
			for (var [A, M] of j) M.v !== UNINITIALIZED && !(A in e) && k.push(A);
			return k;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
function get_proxied_value(e) {
	try {
		if (typeof e == "object" && e && STATE_SYMBOL in e) return e[STATE_SYMBOL];
	} catch {}
	return e;
}
function is(e, O) {
	return Object.is(get_proxied_value(e), get_proxied_value(O));
}
var $window, is_firefox, first_child_getter, next_sibling_getter;
function init_operations() {
	if ($window === void 0) {
		$window = window, document, is_firefox = /Firefox/.test(navigator.userAgent);
		var e = Element.prototype, O = Node.prototype, k = Text.prototype;
		first_child_getter = get_descriptor(O, "firstChild").get, next_sibling_getter = get_descriptor(O, "nextSibling").get, is_extensible(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), is_extensible(k) && (k.__t = void 0);
	}
}
function create_text(e = "") {
	return document.createTextNode(e);
}
/* @__NO_SIDE_EFFECTS__ */
function get_first_child(e) {
	return first_child_getter.call(e);
}
/* @__NO_SIDE_EFFECTS__ */
function get_next_sibling(e) {
	return next_sibling_getter.call(e);
}
function child(e, O) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(e);
	var k = /* @__PURE__ */ get_first_child(hydrate_node);
	if (k === null) k = hydrate_node.appendChild(create_text());
	else if (O && k.nodeType !== 3) {
		var A = create_text();
		return k?.before(A), set_hydrate_node(A), A;
	}
	return set_hydrate_node(k), k;
}
function first_child(e, O = !1) {
	if (!hydrating) {
		var k = /* @__PURE__ */ get_first_child(e);
		return k instanceof Comment && k.data === "" ? /* @__PURE__ */ get_next_sibling(k) : k;
	}
	if (O && hydrate_node?.nodeType !== 3) {
		var A = create_text();
		return hydrate_node?.before(A), set_hydrate_node(A), A;
	}
	return hydrate_node;
}
function sibling(e, O = 1, k = !1) {
	let A = hydrating ? hydrate_node : e;
	for (var j; O--;) j = A, A = /* @__PURE__ */ get_next_sibling(A);
	if (!hydrating) return A;
	if (k && A?.nodeType !== 3) {
		var M = create_text();
		return A === null ? j?.after(M) : A.before(M), set_hydrate_node(M), M;
	}
	return set_hydrate_node(A), A;
}
function clear_text_content(e) {
	e.textContent = "";
}
function should_defer_append() {
	return !1;
}
function autofocus(e, O) {
	if (O) {
		let O = document.body;
		e.autofocus = !0, queue_micro_task(() => {
			document.activeElement === O && e.focus();
		});
	}
}
var listening_to_form_reset = !1;
function add_form_reset_listener() {
	listening_to_form_reset || (listening_to_form_reset = !0, document.addEventListener("reset", (e) => {
		Promise.resolve().then(() => {
			if (!e.defaultPrevented) for (let O of e.target.elements) O.__on_r?.();
		});
	}, { capture: !0 }));
}
function without_reactive_context(e) {
	var O = active_reaction, k = active_effect;
	set_active_reaction(null), set_active_effect(null);
	try {
		return e();
	} finally {
		set_active_reaction(O), set_active_effect(k);
	}
}
function validate_effect(e) {
	active_effect === null && (active_reaction === null && effect_orphan(e), effect_in_unowned_derived()), is_destroying_effect && effect_in_teardown(e);
}
function push_effect(e, O) {
	var k = O.last;
	k === null ? O.last = O.first = e : (k.next = e, e.prev = k, O.last = e);
}
function create_effect(e, O, k) {
	var A = active_effect;
	A !== null && A.f & 8192 && (e |= INERT);
	var j = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: e | 2560,
		first: null,
		fn: O,
		last: null,
		next: null,
		parent: A,
		b: A && A.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	if (k) try {
		update_effect(j), j.f |= 32768;
	} catch (e) {
		throw destroy_effect(j), e;
	}
	else O !== null && schedule_effect(j);
	var M = j;
	if (k && M.deps === null && M.teardown === null && M.nodes === null && M.first === M.last && !(M.f & 524288) && (M = M.first, e & 16 && e & 65536 && M !== null && (M.f |= EFFECT_TRANSPARENT)), M !== null && (M.parent = A, A !== null && push_effect(M, A), active_reaction !== null && active_reaction.f & 2 && !(e & 64))) {
		var N = active_reaction;
		(N.effects ??= []).push(M);
	}
	return j;
}
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
function teardown(e) {
	let O = create_effect(8, null, !1);
	return set_signal_status(O, CLEAN), O.teardown = e, O;
}
function user_effect(e) {
	validate_effect("$effect");
	var O = active_effect.f;
	if (!active_reaction && O & 32 && !(O & 32768)) {
		var k = component_context;
		(k.e ??= []).push(e);
	} else return create_user_effect(e);
}
function create_user_effect(e) {
	return create_effect(4 | USER_EFFECT, e, !1);
}
function user_pre_effect(e) {
	return validate_effect("$effect.pre"), create_effect(8 | USER_EFFECT, e, !0);
}
function effect_root(e) {
	Batch.ensure();
	let O = create_effect(64 | EFFECT_PRESERVED, e, !0);
	return () => {
		destroy_effect(O);
	};
}
function component_root(e) {
	Batch.ensure();
	let O = create_effect(64 | EFFECT_PRESERVED, e, !0);
	return (e = {}) => new Promise((k) => {
		e.outro ? pause_effect(O, () => {
			destroy_effect(O), k(void 0);
		}) : (destroy_effect(O), k(void 0));
	});
}
function effect(e) {
	return create_effect(4, e, !1);
}
function async_effect(e) {
	return create_effect(4194304 | EFFECT_PRESERVED, e, !0);
}
function render_effect(e, O = 0) {
	return create_effect(8 | O, e, !0);
}
function template_effect(e, O = [], k = [], A = []) {
	flatten(A, O, k, (O) => {
		create_effect(8, () => e(...O.map(get)), !0);
	});
}
function block(e, O = 0) {
	return create_effect(16 | O, e, !0);
}
function managed(e, O = 0) {
	return create_effect(16777216 | O, e, !0);
}
function branch(e) {
	return create_effect(32 | EFFECT_PRESERVED, e, !0);
}
function execute_effect_teardown(e) {
	var O = e.teardown;
	if (O !== null) {
		let e = is_destroying_effect, k = active_reaction;
		set_is_destroying_effect(!0), set_active_reaction(null);
		try {
			O.call(null);
		} finally {
			set_is_destroying_effect(e), set_active_reaction(k);
		}
	}
}
function destroy_effect_children(e, O = !1) {
	var k = e.first;
	for (e.first = e.last = null; k !== null;) {
		let e = k.ac;
		e !== null && without_reactive_context(() => {
			e.abort(STALE_REACTION);
		});
		var A = k.next;
		k.f & 64 ? k.parent = null : destroy_effect(k, O), k = A;
	}
}
function destroy_block_effect_children(e) {
	for (var O = e.first; O !== null;) {
		var k = O.next;
		O.f & 32 || destroy_effect(O), O = k;
	}
}
function destroy_effect(e, O = !0) {
	var k = !1;
	(O || e.f & 262144) && e.nodes !== null && e.nodes.end !== null && (remove_effect_dom(e.nodes.start, e.nodes.end), k = !0), destroy_effect_children(e, O && !k), remove_reactions(e, 0), set_signal_status(e, 16384);
	var A = e.nodes && e.nodes.t;
	if (A !== null) for (let e of A) e.stop();
	execute_effect_teardown(e);
	var j = e.parent;
	j !== null && j.first !== null && unlink_effect(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = null;
}
function remove_effect_dom(e, O) {
	for (; e !== null;) {
		var k = e === O ? null : /* @__PURE__ */ get_next_sibling(e);
		e.remove(), e = k;
	}
}
function unlink_effect(e) {
	var O = e.parent, k = e.prev, A = e.next;
	k !== null && (k.next = A), A !== null && (A.prev = k), O !== null && (O.first === e && (O.first = A), O.last === e && (O.last = k));
}
function pause_effect(e, O, k = !0) {
	var A = [];
	pause_children(e, A, !0);
	var j = () => {
		k && destroy_effect(e), O && O();
	}, M = A.length;
	if (M > 0) {
		var N = () => --M || j();
		for (var P of A) P.out(N);
	} else j();
}
function pause_children(e, O, k) {
	if (!(e.f & 8192)) {
		e.f ^= INERT;
		var A = e.nodes && e.nodes.t;
		if (A !== null) for (let e of A) (e.is_global || k) && O.push(e);
		for (var j = e.first; j !== null;) {
			var M = j.next, N = (j.f & 65536) != 0 || (j.f & 32) != 0 && (e.f & 16) != 0;
			pause_children(j, O, N ? k : !1), j = M;
		}
	}
}
function resume_effect(e) {
	resume_children(e, !0);
}
function resume_children(e, O) {
	if (e.f & 8192) {
		e.f ^= INERT, e.f & 1024 || (set_signal_status(e, DIRTY), schedule_effect(e));
		for (var k = e.first; k !== null;) {
			var A = k.next, j = (k.f & 65536) != 0 || (k.f & 32) != 0;
			resume_children(k, j ? O : !1), k = A;
		}
		var M = e.nodes && e.nodes.t;
		if (M !== null) for (let e of M) (e.is_global || O) && e.in();
	}
}
function move_effect(e, O) {
	if (e.nodes) for (var k = e.nodes.start, A = e.nodes.end; k !== null;) {
		var j = k === A ? null : /* @__PURE__ */ get_next_sibling(k);
		O.append(k), k = j;
	}
}
let is_updating_effect = !1;
function set_is_updating_effect(e) {
	is_updating_effect = e;
}
let is_destroying_effect = !1;
function set_is_destroying_effect(e) {
	is_destroying_effect = e;
}
let active_reaction = null, untracking = !1;
function set_active_reaction(e) {
	active_reaction = e;
}
let active_effect = null;
function set_active_effect(e) {
	active_effect = e;
}
let current_sources = null;
function push_reaction_value(e) {
	active_reaction !== null && (current_sources === null ? current_sources = [e] : current_sources.push(e));
}
var new_deps = null, skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(e) {
	untracked_writes = e;
}
let write_version = 1;
var read_version = 0;
let update_version = read_version;
function set_update_version(e) {
	update_version = e;
}
function increment_write_version() {
	return ++write_version;
}
function is_dirty(e) {
	var O = e.f;
	if (O & 2048) return !0;
	if (O & 2 && (e.f &= ~WAS_MARKED), O & 4096) {
		var k = e.deps;
		if (k !== null) for (var A = k.length, j = 0; j < A; j++) {
			var M = k[j];
			if (is_dirty(M) && update_derived(M), M.wv > e.wv) return !0;
		}
		O & 512 && batch_values === null && set_signal_status(e, CLEAN);
	}
	return !1;
}
function schedule_possible_effect_self_invalidation(e, O, k = !0) {
	var A = e.reactions;
	if (A !== null && !current_sources?.includes(e)) for (var j = 0; j < A.length; j++) {
		var M = A[j];
		M.f & 2 ? schedule_possible_effect_self_invalidation(M, O, !1) : O === M && (k ? set_signal_status(M, DIRTY) : M.f & 1024 && set_signal_status(M, MAYBE_DIRTY), schedule_effect(M));
	}
}
function update_reaction(e) {
	var O = new_deps, k = skipped_deps, A = untracked_writes, j = active_reaction, M = current_sources, N = component_context, P = untracking, F = update_version, I = e.f;
	new_deps = null, skipped_deps = 0, untracked_writes = null, active_reaction = I & 96 ? null : e, current_sources = null, set_component_context(e.ctx), untracking = !1, update_version = ++read_version, e.ac !== null && (without_reactive_context(() => {
		e.ac.abort(STALE_REACTION);
	}), e.ac = null);
	try {
		e.f |= REACTION_IS_UPDATING;
		var L = e.fn, R = L(), z = e.deps;
		if (new_deps !== null) {
			var B;
			if (remove_reactions(e, skipped_deps), z !== null && skipped_deps > 0) for (z.length = skipped_deps + new_deps.length, B = 0; B < new_deps.length; B++) z[skipped_deps + B] = new_deps[B];
			else e.deps = z = new_deps;
			if (effect_tracking() && e.f & 512) for (B = skipped_deps; B < z.length; B++) (z[B].reactions ??= []).push(e);
		} else z !== null && skipped_deps < z.length && (remove_reactions(e, skipped_deps), z.length = skipped_deps);
		if (is_runes() && untracked_writes !== null && !untracking && z !== null && !(e.f & 6146)) for (B = 0; B < untracked_writes.length; B++) schedule_possible_effect_self_invalidation(untracked_writes[B], e);
		return j !== null && j !== e && (read_version++, untracked_writes !== null && (A === null ? A = untracked_writes : A.push(...untracked_writes))), e.f & 8388608 && (e.f ^= ERROR_VALUE), R;
	} catch (e) {
		return handle_error(e);
	} finally {
		e.f ^= REACTION_IS_UPDATING, new_deps = O, skipped_deps = k, untracked_writes = A, active_reaction = j, current_sources = M, set_component_context(N), untracking = P, update_version = F;
	}
}
function remove_reaction(e, O) {
	let k = O.reactions;
	if (k !== null) {
		var A = index_of.call(k, e);
		if (A !== -1) {
			var M = k.length - 1;
			M === 0 ? k = O.reactions = null : (k[A] = k[M], k.pop());
		}
	}
	k === null && O.f & 2 && (new_deps === null || !new_deps.includes(O)) && (set_signal_status(O, MAYBE_DIRTY), O.f & 512 && (O.f ^= 512, O.f &= ~WAS_MARKED), destroy_derived_effects(O), remove_reactions(O, 0));
}
function remove_reactions(e, O) {
	var k = e.deps;
	if (k !== null) for (var A = O; A < k.length; A++) remove_reaction(e, k[A]);
}
function update_effect(e) {
	var O = e.f;
	if (!(O & 16384)) {
		set_signal_status(e, CLEAN);
		var k = active_effect, A = is_updating_effect;
		active_effect = e, is_updating_effect = !0;
		try {
			O & 16777232 ? destroy_block_effect_children(e) : destroy_effect_children(e), execute_effect_teardown(e);
			var j = update_reaction(e);
			e.teardown = typeof j == "function" ? j : null, e.wv = write_version;
		} finally {
			is_updating_effect = A, active_effect = k;
		}
	}
}
async function tick() {
	await Promise.resolve(), flushSync();
}
function get(e) {
	var O = (e.f & 2) != 0;
	if (null?.add(e), active_reaction !== null && !untracking && !(active_effect !== null && active_effect.f & 16384) && !current_sources?.includes(e)) {
		var k = active_reaction.deps;
		if (active_reaction.f & 2097152) e.rv < read_version && (e.rv = read_version, new_deps === null && k !== null && k[skipped_deps] === e ? skipped_deps++ : new_deps === null ? new_deps = [e] : new_deps.includes(e) || new_deps.push(e));
		else {
			(active_reaction.deps ??= []).push(e);
			var A = e.reactions;
			A === null ? e.reactions = [active_reaction] : A.includes(active_reaction) || A.push(active_reaction);
		}
	}
	if (is_destroying_effect) {
		if (old_values.has(e)) return old_values.get(e);
		if (O) {
			var j = e, M = j.v;
			return (!(j.f & 1024) && j.reactions !== null || depends_on_old_values(j)) && (M = execute_derived(j)), old_values.set(j, M), M;
		}
	} else O && (!batch_values?.has(e) || current_batch?.is_fork && !effect_tracking()) && (j = e, is_dirty(j) && update_derived(j), is_updating_effect && effect_tracking() && !(j.f & 512) && reconnect(j));
	if (batch_values?.has(e)) return batch_values.get(e);
	if (e.f & 8388608) throw e.v;
	return e.v;
}
function reconnect(e) {
	if (e.deps !== null) {
		e.f ^= 512;
		for (let O of e.deps) (O.reactions ??= []).push(e), O.f & 2 && !(O.f & 512) && reconnect(O);
	}
}
function depends_on_old_values(e) {
	if (e.v === UNINITIALIZED) return !0;
	if (e.deps === null) return !1;
	for (let O of e.deps) if (old_values.has(O) || O.f & 2 && depends_on_old_values(O)) return !0;
	return !1;
}
function untrack(e) {
	var O = untracking;
	try {
		return untracking = !0, e();
	} finally {
		untracking = O;
	}
}
var STATUS_MASK = ~(MAYBE_DIRTY | 3072);
function set_signal_status(e, O) {
	e.f = e.f & STATUS_MASK | O;
}
function exclude_from_object(e, O) {
	var k = {};
	for (var A in e) O.includes(A) || (k[A] = e[A]);
	for (var j of Object.getOwnPropertySymbols(e)) Object.propertyIsEnumerable.call(e, j) && !O.includes(j) && (k[j] = e[j]);
	return k;
}
function deep_read_state(e) {
	if (!(typeof e != "object" || !e || e instanceof EventTarget)) {
		if (STATE_SYMBOL in e) deep_read(e);
		else if (!Array.isArray(e)) for (let O in e) {
			let k = e[O];
			typeof k == "object" && k && STATE_SYMBOL in k && deep_read(k);
		}
	}
}
function deep_read(e, O = /* @__PURE__ */ new Set()) {
	if (typeof e == "object" && e && !(e instanceof EventTarget) && !O.has(e)) {
		for (let k in O.add(e), e instanceof Date && e.getTime(), e) try {
			deep_read(e[k], O);
		} catch {}
		let k = get_prototype_of(e);
		if (k !== Object.prototype && k !== Array.prototype && k !== Map.prototype && k !== Set.prototype && k !== Date.prototype) {
			let O = get_descriptors(k);
			for (let k in O) {
				let A = O[k].get;
				if (A) try {
					A.call(e);
				} catch {}
			}
		}
	}
}
const all_registered_events = /* @__PURE__ */ new Set(), root_event_handles = /* @__PURE__ */ new Set();
function create_event(e, O, k, A = {}) {
	function j(e) {
		if (A.capture || handle_event_propagation.call(O, e), !e.cancelBubble) return without_reactive_context(() => k?.call(this, e));
	}
	return e.startsWith("pointer") || e.startsWith("touch") || e === "wheel" ? queue_micro_task(() => {
		O.addEventListener(e, j, A);
	}) : O.addEventListener(e, j, A), j;
}
function on(e, O, k, A = {}) {
	var j = create_event(O, e, k, A);
	return () => {
		e.removeEventListener(O, j, A);
	};
}
function delegate(e) {
	for (var O = 0; O < e.length; O++) all_registered_events.add(e[O]);
	for (var k of root_event_handles) k(e);
}
var last_propagated_event = null;
function handle_event_propagation(e) {
	var O = this, k = O.ownerDocument, A = e.type, j = e.composedPath?.() || [], M = j[0] || e.target;
	last_propagated_event = e;
	var N = 0, F = last_propagated_event === e && e.__root;
	if (F) {
		var I = j.indexOf(F);
		if (I !== -1 && (O === document || O === window)) {
			e.__root = O;
			return;
		}
		var L = j.indexOf(O);
		if (L === -1) return;
		I <= L && (N = I);
	}
	if (M = j[N] || e.target, M !== O) {
		define_property(e, "currentTarget", {
			configurable: !0,
			get() {
				return M || k;
			}
		});
		var R = active_reaction, z = active_effect;
		set_active_reaction(null), set_active_effect(null);
		try {
			for (var B, V = []; M !== null;) {
				var H = M.assignedSlot || M.parentNode || M.host || null;
				try {
					var U = M["__" + A];
					U != null && (!M.disabled || e.target === M) && U.call(M, e);
				} catch (e) {
					B ? V.push(e) : B = e;
				}
				if (e.cancelBubble || H === O || H === null) break;
				M = H;
			}
			if (B) {
				for (let e of V) queueMicrotask(() => {
					throw e;
				});
				throw B;
			}
		} finally {
			e.__root = O, delete e.currentTarget, set_active_reaction(R), set_active_effect(z);
		}
	}
}
function create_fragment_from_html(e) {
	var O = document.createElement("template");
	return O.innerHTML = e.replaceAll("<!>", "<!---->"), O.content;
}
function assign_nodes(e, O) {
	var k = active_effect;
	k.nodes === null && (k.nodes = {
		start: e,
		end: O,
		a: null,
		t: null
	});
}
/* @__NO_SIDE_EFFECTS__ */
function from_html(e, O) {
	var k = (O & 1) != 0, A = (O & 2) != 0, j, M = !e.startsWith("<!>");
	return () => {
		if (hydrating) return assign_nodes(hydrate_node, null), hydrate_node;
		j === void 0 && (j = create_fragment_from_html(M ? e : "<!>" + e), k || (j = /* @__PURE__ */ get_first_child(j)));
		var O = A || is_firefox ? document.importNode(j, !0) : j.cloneNode(!0);
		if (k) {
			var N = /* @__PURE__ */ get_first_child(O), P = O.lastChild;
			assign_nodes(N, P);
		} else assign_nodes(O, O);
		return O;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function from_namespace(e, O, k = "svg") {
	var A = !e.startsWith("<!>"), j = (O & 1) != 0, M = `<${k}>${A ? e : "<!>" + e}</${k}>`, N;
	return () => {
		if (hydrating) return assign_nodes(hydrate_node, null), hydrate_node;
		if (!N) {
			var e = /* @__PURE__ */ get_first_child(create_fragment_from_html(M));
			if (j) for (N = document.createDocumentFragment(); /* @__PURE__ */ get_first_child(e);) N.appendChild(/* @__PURE__ */ get_first_child(e));
			else N = /* @__PURE__ */ get_first_child(e);
		}
		var O = N.cloneNode(!0);
		if (j) {
			var k = /* @__PURE__ */ get_first_child(O), A = O.lastChild;
			assign_nodes(k, A);
		} else assign_nodes(O, O);
		return O;
	};
}
/* @__NO_SIDE_EFFECTS__ */
function from_svg(e, O) {
	return /* @__PURE__ */ from_namespace(e, O, "svg");
}
function text(e = "") {
	if (!hydrating) {
		var O = create_text(e + "");
		return assign_nodes(O, O), O;
	}
	var k = hydrate_node;
	return k.nodeType !== 3 && (k.before(k = create_text()), set_hydrate_node(k)), assign_nodes(k, k), k;
}
function comment() {
	if (hydrating) return assign_nodes(hydrate_node, null), hydrate_node;
	var e = document.createDocumentFragment(), O = document.createComment(""), k = create_text();
	return e.append(O, k), assign_nodes(O, k), e;
}
function append(e, O) {
	if (hydrating) {
		var k = active_effect;
		(!(k.f & 32768) || k.nodes.end === null) && (k.nodes.end = hydrate_node), hydrate_next();
		return;
	}
	e !== null && e.before(O);
}
function props_id() {
	if (hydrating && hydrate_node && hydrate_node.nodeType === 8 && hydrate_node.textContent?.startsWith("$")) {
		let e = hydrate_node.textContent.substring(1);
		return hydrate_next(), e;
	}
	return (window.__svelte ??= {}).uid ??= 1, `c${window.__svelte.uid++}`;
}
function is_capture_event(e) {
	return e.endsWith("capture") && e !== "gotpointercapture" && e !== "lostpointercapture";
}
var DELEGATED_EVENTS = [
	"beforeinput",
	"click",
	"change",
	"dblclick",
	"contextmenu",
	"focusin",
	"focusout",
	"input",
	"keydown",
	"keyup",
	"mousedown",
	"mousemove",
	"mouseout",
	"mouseover",
	"mouseup",
	"pointerdown",
	"pointermove",
	"pointerout",
	"pointerover",
	"pointerup",
	"touchend",
	"touchmove",
	"touchstart"
];
function can_delegate_event(e) {
	return DELEGATED_EVENTS.includes(e);
}
var DOM_BOOLEAN_ATTRIBUTES = /* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split("."), ATTRIBUTE_ALIASES = {
	formnovalidate: "formNoValidate",
	ismap: "isMap",
	nomodule: "noModule",
	playsinline: "playsInline",
	readonly: "readOnly",
	defaultvalue: "defaultValue",
	defaultchecked: "defaultChecked",
	srcobject: "srcObject",
	novalidate: "noValidate",
	allowfullscreen: "allowFullscreen",
	disablepictureinpicture: "disablePictureInPicture",
	disableremoteplayback: "disableRemotePlayback"
};
function normalize_attribute(e) {
	return e = e.toLowerCase(), ATTRIBUTE_ALIASES[e] ?? e;
}
[...DOM_BOOLEAN_ATTRIBUTES];
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(e) {
	return PASSIVE_EVENTS.includes(e);
}
var RAW_TEXT_ELEMENTS = [
	"textarea",
	"script",
	"style",
	"title"
];
function is_raw_text_element(e) {
	return RAW_TEXT_ELEMENTS.includes(e);
}
function set_text(e, O) {
	var k = O == null ? "" : typeof O == "object" ? O + "" : O;
	k !== (e.__t ??= e.nodeValue) && (e.__t = k, e.nodeValue = k + "");
}
function mount(e, O) {
	return _mount(e, O);
}
function hydrate(O, k) {
	init_operations(), k.intro = k.intro ?? !1;
	let A = k.target, j = hydrating, M = hydrate_node;
	try {
		for (var N = /* @__PURE__ */ get_first_child(A); N && (N.nodeType !== 8 || N.data !== "[");) N = /* @__PURE__ */ get_next_sibling(N);
		if (!N) throw HYDRATION_ERROR;
		set_hydrating(!0), set_hydrate_node(N);
		let j = _mount(O, {
			...k,
			anchor: N
		});
		return set_hydrating(!1), j;
	} catch (j) {
		if (j instanceof Error && j.message.split("\n").some((e) => e.startsWith("https://svelte.dev/e/"))) throw j;
		return j !== HYDRATION_ERROR && console.warn("Failed to hydrate: ", j), k.recover === !1 && hydration_failed(), init_operations(), clear_text_content(A), set_hydrating(!1), mount(O, k);
	} finally {
		set_hydrating(j), set_hydrate_node(M);
	}
}
var document_listeners = /* @__PURE__ */ new Map();
function _mount(O, { target: k, anchor: A, props: j = {}, events: N, context: P, intro: F = !0 }) {
	init_operations();
	var I = /* @__PURE__ */ new Set(), L = (e) => {
		for (var O = 0; O < e.length; O++) {
			var A = e[O];
			if (!I.has(A)) {
				I.add(A);
				var j = is_passive_event(A);
				k.addEventListener(A, handle_event_propagation, { passive: j });
				var M = document_listeners.get(A);
				M === void 0 ? (document.addEventListener(A, handle_event_propagation, { passive: j }), document_listeners.set(A, 1)) : document_listeners.set(A, M + 1);
			}
		}
	};
	L(array_from(all_registered_events)), root_event_handles.add(L);
	var R = void 0, z = component_root(() => {
		var M = A ?? k.appendChild(create_text());
		return boundary(M, { pending: () => {} }, (k) => {
			if (P) {
				push({});
				var A = component_context;
				A.c = P;
			}
			if (N && (j.$$events = N), hydrating && assign_nodes(k, null), R = O(k, j) || {}, hydrating && (active_effect.nodes.end = hydrate_node, hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]")) throw hydration_mismatch(), HYDRATION_ERROR;
			P && pop();
		}), () => {
			for (var e of I) {
				k.removeEventListener(e, handle_event_propagation);
				var O = document_listeners.get(e);
				--O === 0 ? (document.removeEventListener(e, handle_event_propagation), document_listeners.delete(e)) : document_listeners.set(e, O);
			}
			root_event_handles.delete(L), M !== A && M.parentNode?.removeChild(M);
		};
	});
	return mounted_components.set(R, z), R;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(e, O) {
	let k = mounted_components.get(e);
	return k ? (mounted_components.delete(e), k(O)) : Promise.resolve();
}
var BranchManager = class {
	anchor;
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ new Map();
	#n = /* @__PURE__ */ new Map();
	#r = /* @__PURE__ */ new Set();
	#i = !0;
	constructor(e, O = !0) {
		this.anchor = e, this.#i = O;
	}
	#a = () => {
		var e = current_batch;
		if (this.#e.has(e)) {
			var O = this.#e.get(e), k = this.#t.get(O);
			if (k) resume_effect(k), this.#r.delete(O);
			else {
				var A = this.#n.get(O);
				A && (this.#t.set(O, A.effect), this.#n.delete(O), A.fragment.lastChild.remove(), this.anchor.before(A.fragment), k = A.effect);
			}
			for (let [O, k] of this.#e) {
				if (this.#e.delete(O), O === e) break;
				let A = this.#n.get(k);
				A && (destroy_effect(A.effect), this.#n.delete(k));
			}
			for (let [e, A] of this.#t) {
				if (e === O || this.#r.has(e)) continue;
				let j = () => {
					if (Array.from(this.#e.values()).includes(e)) {
						var O = document.createDocumentFragment();
						move_effect(A, O), O.append(create_text()), this.#n.set(e, {
							effect: A,
							fragment: O
						});
					} else destroy_effect(A);
					this.#r.delete(e), this.#t.delete(e);
				};
				this.#i || !k ? (this.#r.add(e), pause_effect(A, j, !1)) : j();
			}
		}
	};
	#o = (e) => {
		this.#e.delete(e);
		let O = Array.from(this.#e.values());
		for (let [e, k] of this.#n) O.includes(e) || (destroy_effect(k.effect), this.#n.delete(e));
	};
	ensure(e, O) {
		var k = current_batch, A = should_defer_append();
		if (O && !this.#t.has(e) && !this.#n.has(e)) if (A) {
			var j = document.createDocumentFragment(), M = create_text();
			j.append(M), this.#n.set(e, {
				effect: branch(() => O(M)),
				fragment: j
			});
		} else this.#t.set(e, branch(() => O(this.anchor)));
		if (this.#e.set(k, e), A) {
			for (let [O, A] of this.#t) O === e ? k.skipped_effects.delete(A) : k.skipped_effects.add(A);
			for (let [O, A] of this.#n) O === e ? k.skipped_effects.delete(A.effect) : k.skipped_effects.add(A.effect);
			k.oncommit(this.#a), k.ondiscard(this.#o);
		} else hydrating && (this.anchor = hydrate_node), this.#a();
	}
};
function snippet(e, O, ...k) {
	var A = new BranchManager(e);
	block(() => {
		let e = O() ?? null;
		A.ensure(e, e && ((O) => e(O, ...k)));
	}, EFFECT_TRANSPARENT);
}
function createAttachmentKey() {
	return Symbol("@attach");
}
function if_block(e, O, k = !1) {
	hydrating && hydrate_next();
	var A = new BranchManager(e), j = k ? EFFECT_TRANSPARENT : 0;
	function M(O, k) {
		if (hydrating && O === (read_hydration_instruction(e) === "[!")) {
			var j = skip_nodes();
			set_hydrate_node(j), A.anchor = j, set_hydrating(!1), A.ensure(O, k), set_hydrating(!0);
			return;
		}
		A.ensure(O, k);
	}
	block(() => {
		var e = !1;
		O((O, k = !0) => {
			e = !0, M(k, O);
		}), e || M(!1, null);
	}, j);
}
function key(e, O, k) {
	hydrating && hydrate_next();
	var A = new BranchManager(e), j = !is_runes();
	block(() => {
		var e = O();
		j && typeof e == "object" && e && (e = {}), A.ensure(e, k);
	});
}
function index$1(e, O) {
	return O;
}
function pause_effects(e, O, k) {
	for (var A = [], j = O.length, N, P = O.length, F = 0; F < j; F++) {
		let k = O[F];
		pause_effect(k, () => {
			if (N) {
				if (N.pending.delete(k), N.done.add(k), N.pending.size === 0) {
					var O = e.outrogroups;
					destroy_effects(array_from(N.done)), O.delete(N), O.size === 0 && (e.outrogroups = null);
				}
			} else --P;
		}, !1);
	}
	if (P === 0) {
		var I = A.length === 0 && k !== null;
		if (I) {
			var L = k, R = L.parentNode;
			clear_text_content(R), R.append(L), e.items.clear();
		}
		destroy_effects(O, !I);
	} else N = {
		pending: new Set(O),
		done: /* @__PURE__ */ new Set()
	}, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(N);
}
function destroy_effects(e, O = !0) {
	for (var k = 0; k < e.length; k++) destroy_effect(e[k], O);
}
var offscreen_anchor;
function each(e, O, k, j, N, P = null) {
	var F = e, I = /* @__PURE__ */ new Map();
	if (O & 4) {
		var L = e;
		F = hydrating ? set_hydrate_node(/* @__PURE__ */ get_first_child(L)) : L.appendChild(create_text());
	}
	hydrating && hydrate_next();
	var R = null, z = /* @__PURE__ */ derived_safe_equal(() => {
		var e = k();
		return is_array(e) ? e : e == null ? [] : array_from(e);
	}), B, V = !0;
	function H() {
		U.fallback = R, reconcile(U, B, F, O, j), R !== null && (B.length === 0 ? R.f & 33554432 ? (R.f ^= EFFECT_OFFSCREEN, move(R, null, F)) : resume_effect(R) : pause_effect(R, () => {
			R = null;
		}));
	}
	var U = {
		effect: block(() => {
			B = get(z);
			var e = B.length;
			let A = !1;
			hydrating && read_hydration_instruction(F) === "[!" != (e === 0) && (F = skip_nodes(), set_hydrate_node(F), set_hydrating(!1), A = !0);
			for (var M = /* @__PURE__ */ new Set(), L = current_batch, U = should_defer_append(), W = 0; W < e; W += 1) {
				hydrating && hydrate_node.nodeType === 8 && hydrate_node.data === "]" && (F = hydrate_node, A = !0, set_hydrating(!1));
				var G = B[W], K = j(G, W), q = V ? null : I.get(K);
				q ? (q.v && internal_set(q.v, G), q.i && internal_set(q.i, W), U && L.skipped_effects.delete(q.e)) : (q = create_item(I, V ? F : offscreen_anchor ??= create_text(), G, K, W, N, O, k), V || (q.e.f |= EFFECT_OFFSCREEN), I.set(K, q)), M.add(K);
			}
			if (e === 0 && P && !R && (V ? R = branch(() => P(F)) : (R = branch(() => P(offscreen_anchor ??= create_text())), R.f |= EFFECT_OFFSCREEN)), hydrating && e > 0 && set_hydrate_node(skip_nodes()), !V) if (U) {
				for (let [e, O] of I) M.has(e) || L.skipped_effects.add(O.e);
				L.oncommit(H), L.ondiscard(() => {});
			} else H();
			A && set_hydrating(!0), get(z);
		}),
		flags: O,
		items: I,
		outrogroups: null,
		fallback: R
	};
	V = !1, hydrating && (F = hydrate_node);
}
function reconcile(e, O, k, A, j) {
	var N = (A & 8) != 0, P = O.length, F = e.items, I = e.effect.first, L, R = null, z, B = [], V = [], H, U, W, G;
	if (N) for (G = 0; G < P; G += 1) H = O[G], U = j(H, G), W = F.get(U).e, W.f & 33554432 || (W.nodes?.a?.measure(), (z ??= /* @__PURE__ */ new Set()).add(W));
	for (G = 0; G < P; G += 1) {
		if (H = O[G], U = j(H, G), W = F.get(U).e, e.outrogroups !== null) for (let O of e.outrogroups) O.pending.delete(W), O.done.delete(W);
		if (W.f & 33554432) if (W.f ^= EFFECT_OFFSCREEN, W === I) move(W, null, k);
		else {
			var K = R ? R.next : I;
			W === e.effect.last && (e.effect.last = W.prev), W.prev && (W.prev.next = W.next), W.next && (W.next.prev = W.prev), link(e, R, W), link(e, W, K), move(W, K, k), R = W, B = [], V = [], I = R.next;
			continue;
		}
		if (W.f & 8192 && (resume_effect(W), N && (W.nodes?.a?.unfix(), (z ??= /* @__PURE__ */ new Set()).delete(W))), W !== I) {
			if (L !== void 0 && L.has(W)) {
				if (B.length < V.length) {
					var q = V[0], J;
					R = q.prev;
					var Y = B[0], X = B[B.length - 1];
					for (J = 0; J < B.length; J += 1) move(B[J], q, k);
					for (J = 0; J < V.length; J += 1) L.delete(V[J]);
					link(e, Y.prev, X.next), link(e, R, Y), link(e, X, q), I = q, R = X, --G, B = [], V = [];
				} else L.delete(W), move(W, I, k), link(e, W.prev, W.next), link(e, W, R === null ? e.effect.first : R.next), link(e, R, W), R = W;
				continue;
			}
			for (B = [], V = []; I !== null && I !== W;) (L ??= /* @__PURE__ */ new Set()).add(I), V.push(I), I = I.next;
			if (I === null) continue;
		}
		W.f & 33554432 || B.push(W), R = W, I = W.next;
	}
	if (e.outrogroups !== null) {
		for (let O of e.outrogroups) O.pending.size === 0 && (destroy_effects(array_from(O.done)), e.outrogroups?.delete(O));
		e.outrogroups.size === 0 && (e.outrogroups = null);
	}
	if (I !== null || L !== void 0) {
		var Z = [];
		if (L !== void 0) for (W of L) W.f & 8192 || Z.push(W);
		for (; I !== null;) !(I.f & 8192) && I !== e.fallback && Z.push(I), I = I.next;
		var Q = Z.length;
		if (Q > 0) {
			var $ = A & 4 && P === 0 ? k : null;
			if (N) {
				for (G = 0; G < Q; G += 1) Z[G].nodes?.a?.measure();
				for (G = 0; G < Q; G += 1) Z[G].nodes?.a?.fix();
			}
			pause_effects(e, Z, $);
		}
	}
	N && queue_micro_task(() => {
		if (z !== void 0) for (W of z) W.nodes?.a?.apply();
	});
}
function create_item(e, O, k, A, j, M, N, P) {
	var F = N & 1 ? N & 16 ? source(k) : /* @__PURE__ */ mutable_source(k, !1, !1) : null, I = N & 2 ? source(j) : null;
	return {
		v: F,
		i: I,
		e: branch(() => (M(O, F ?? k, I ?? j, P), () => {
			e.delete(A);
		}))
	};
}
function move(e, O, k) {
	if (e.nodes) for (var A = e.nodes.start, j = e.nodes.end, M = O && !(O.f & 33554432) ? O.nodes.start : k; A !== null;) {
		var N = /* @__PURE__ */ get_next_sibling(A);
		if (M.before(A), A === j) return;
		A = N;
	}
}
function link(e, O, k) {
	O === null ? e.effect.first = k : O.next = k, k === null ? e.effect.last = O : k.prev = O;
}
function html(O, k, A = !1, j = !1, M = !1) {
	var N = O, P = "";
	template_effect(() => {
		var O = active_effect;
		if (P === (P = k() ?? "")) {
			hydrating && hydrate_next();
			return;
		}
		if (O.nodes !== null && (remove_effect_dom(O.nodes.start, O.nodes.end), O.nodes = null), P !== "") {
			if (hydrating) {
				for (var M = hydrate_node.data, F = hydrate_next(), I = F; F !== null && (F.nodeType !== 8 || F.data !== "");) I = F, F = /* @__PURE__ */ get_next_sibling(F);
				if (F === null) throw hydration_mismatch(), HYDRATION_ERROR;
				assign_nodes(hydrate_node, I), N = set_hydrate_node(F);
				return;
			}
			var L = P + "";
			A ? L = `<svg>${L}</svg>` : j && (L = `<math>${L}</math>`);
			var R = create_fragment_from_html(L);
			if ((A || j) && (R = /* @__PURE__ */ get_first_child(R)), assign_nodes(/* @__PURE__ */ get_first_child(R), R.lastChild), A || j) for (; /* @__PURE__ */ get_first_child(R);) N.before(/* @__PURE__ */ get_first_child(R));
			else N.before(R);
		}
	});
}
function component(e, O, k) {
	hydrating && hydrate_next();
	var A = new BranchManager(e);
	block(() => {
		var e = O() ?? null;
		A.ensure(e, e && ((O) => k(O, e)));
	}, EFFECT_TRANSPARENT);
}
function element(e, O, k, A, j, M) {
	let N = hydrating;
	hydrating && hydrate_next();
	var P = null;
	hydrating && hydrate_node.nodeType === 1 && (P = hydrate_node, hydrate_next());
	var F = hydrating ? hydrate_node : e, I = new BranchManager(F, !1);
	block(() => {
		let e = O() || null;
		var M = j ? j() : k || e === "svg" ? "http://www.w3.org/2000/svg" : null;
		if (e === null) {
			I.ensure(null, null);
			return;
		}
		return I.ensure(e, (O) => {
			if (e) {
				if (P = hydrating ? P : M ? document.createElementNS(M, e) : document.createElement(e), assign_nodes(P, P), A) {
					hydrating && is_raw_text_element(e) && P.append(document.createComment(""));
					var k = hydrating ? /* @__PURE__ */ get_first_child(P) : P.appendChild(create_text());
					hydrating && (k === null ? set_hydrating(!1) : set_hydrate_node(k)), A(P, k);
				}
				active_effect.nodes.end = P, O.before(P);
			}
			hydrating && set_hydrate_node(O);
		}), () => {};
	}, EFFECT_TRANSPARENT), teardown(() => {}), N && (set_hydrating(!0), set_hydrate_node(F));
}
function append_styles(e, O) {
	effect(() => {
		var k = e.getRootNode(), A = k.host ? k : k.head ?? k.ownerDocument.head;
		if (!A.querySelector("#" + O.hash)) {
			let e = document.createElement("style");
			e.id = O.hash, e.textContent = O.code, A.appendChild(e);
		}
	});
}
function attach(e, O) {
	var k = void 0, A;
	managed(() => {
		k !== (k = O()) && (A &&= (destroy_effect(A), null), k && (A = branch(() => {
			effect(() => k(e));
		})));
	});
}
function r(e) {
	var O, k, A = "";
	if (typeof e == "string" || typeof e == "number") A += e;
	else if (typeof e == "object") if (Array.isArray(e)) {
		var j = e.length;
		for (O = 0; O < j; O++) e[O] && (k = r(e[O])) && (A && (A += " "), A += k);
	} else for (k in e) e[k] && (A && (A += " "), A += k);
	return A;
}
function clsx() {
	for (var e, O, k = 0, A = "", j = arguments.length; k < j; k++) (e = arguments[k]) && (O = r(e)) && (A && (A += " "), A += O);
	return A;
}
function clsx$1(e) {
	return typeof e == "object" ? clsx(e) : e ?? "";
}
var whitespace = [..." 	\n\r\f\xA0\v﻿"];
function to_class(e, O, k) {
	var A = e == null ? "" : "" + e;
	if (O && (A = A ? A + " " + O : O), k) {
		for (var j in k) if (k[j]) A = A ? A + " " + j : j;
		else if (A.length) for (var M = j.length, N = 0; (N = A.indexOf(j, N)) >= 0;) {
			var P = N + M;
			(N === 0 || whitespace.includes(A[N - 1])) && (P === A.length || whitespace.includes(A[P])) ? A = (N === 0 ? "" : A.substring(0, N)) + A.substring(P + 1) : N = P;
		}
	}
	return A === "" ? null : A;
}
function append_styles$1(e, O = !1) {
	var k = O ? " !important;" : ";", A = "";
	for (var j in e) {
		var M = e[j];
		M != null && M !== "" && (A += " " + j + ": " + M + k);
	}
	return A;
}
function to_css_name(e) {
	return e[0] !== "-" || e[1] !== "-" ? e.toLowerCase() : e;
}
function to_style(e, O) {
	if (O) {
		var k = "", A, j;
		if (Array.isArray(O) ? (A = O[0], j = O[1]) : A = O, e) {
			e = String(e).replaceAll(/\s*\/\*.*?\*\/\s*/g, "").trim();
			var M = !1, N = 0, P = !1, F = [];
			A && F.push(...Object.keys(A).map(to_css_name)), j && F.push(...Object.keys(j).map(to_css_name));
			var I = 0, L = -1;
			let O = e.length;
			for (var R = 0; R < O; R++) {
				var z = e[R];
				if (P ? z === "/" && e[R - 1] === "*" && (P = !1) : M ? M === z && (M = !1) : z === "/" && e[R + 1] === "*" ? P = !0 : z === "\"" || z === "'" ? M = z : z === "(" ? N++ : z === ")" && N--, !P && M === !1 && N === 0) {
					if (z === ":" && L === -1) L = R;
					else if (z === ";" || R === O - 1) {
						if (L !== -1) {
							var B = to_css_name(e.substring(I, L).trim());
							if (!F.includes(B)) {
								z !== ";" && R++;
								var V = e.substring(I, R).trim();
								k += " " + V + ";";
							}
						}
						I = R + 1, L = -1;
					}
				}
			}
		}
		return A && (k += append_styles$1(A)), j && (k += append_styles$1(j, !0)), k = k.trim(), k === "" ? null : k;
	}
	return e == null ? null : String(e);
}
function set_class(e, O, k, A, j, M) {
	var N = e.__className;
	if (hydrating || N !== k || N === void 0) {
		var P = to_class(k, A, M);
		(!hydrating || P !== e.getAttribute("class")) && (P == null ? e.removeAttribute("class") : O ? e.className = P : e.setAttribute("class", P)), e.__className = k;
	} else if (M && j !== M) for (var F in M) {
		var I = !!M[F];
		(j == null || I !== !!j[F]) && e.classList.toggle(F, I);
	}
	return M;
}
function update_styles(e, O = {}, k, A) {
	for (var j in k) {
		var M = k[j];
		O[j] !== M && (k[j] == null ? e.style.removeProperty(j) : e.style.setProperty(j, M, A));
	}
}
function set_style(e, O, k, A) {
	var j = e.__style;
	if (hydrating || j !== O) {
		var M = to_style(O, A);
		(!hydrating || M !== e.getAttribute("style")) && (M == null ? e.removeAttribute("style") : e.style.cssText = M), e.__style = O;
	} else A && (Array.isArray(A) ? (update_styles(e, k?.[0], A[0]), update_styles(e, k?.[1], A[1], "important")) : update_styles(e, k, A));
	return A;
}
function select_option(e, O, k = !1) {
	if (e.multiple) {
		if (O == null) return;
		if (!is_array(O)) return select_multiple_invalid_value();
		for (var j of e.options) j.selected = O.includes(get_option_value(j));
		return;
	}
	for (j of e.options) if (is(get_option_value(j), O)) {
		j.selected = !0;
		return;
	}
	(!k || O !== void 0) && (e.selectedIndex = -1);
}
function init_select(e) {
	var O = new MutationObserver(() => {
		select_option(e, e.__value);
	});
	O.observe(e, {
		childList: !0,
		subtree: !0,
		attributes: !0,
		attributeFilter: ["value"]
	}), teardown(() => {
		O.disconnect();
	});
}
function get_option_value(e) {
	return "__value" in e ? e.__value : e.value;
}
const CLASS = Symbol("class"), STYLE = Symbol("style");
var IS_CUSTOM_ELEMENT = Symbol("is custom element"), IS_HTML = Symbol("is html");
function remove_input_defaults(e) {
	if (hydrating) {
		var O = !1, k = () => {
			if (!O) {
				if (O = !0, e.hasAttribute("value")) {
					var k = e.value;
					set_attribute(e, "value", null), e.value = k;
				}
				if (e.hasAttribute("checked")) {
					var A = e.checked;
					set_attribute(e, "checked", null), e.checked = A;
				}
			}
		};
		e.__on_r = k, queue_micro_task(k), add_form_reset_listener();
	}
}
function set_selected(e, O) {
	O ? e.hasAttribute("selected") || e.setAttribute("selected", "") : e.removeAttribute("selected");
}
function set_attribute(e, O, k, A) {
	var j = get_attributes(e);
	hydrating && (j[O] = e.getAttribute(O), O === "src" || O === "srcset" || O === "href" && e.nodeName === "LINK") || j[O] !== (j[O] = k) && (O === "loading" && (e[LOADING_ATTR_SYMBOL] = k), k == null ? e.removeAttribute(O) : typeof k != "string" && get_setters(e).includes(O) ? e[O] = k : e.setAttribute(O, k));
}
function set_attributes(e, k, A, j, M = !1, N = !1) {
	if (hydrating && M && e.tagName === "INPUT") {
		var P = e;
		(P.type === "checkbox" ? "defaultChecked" : "defaultValue") in A || remove_input_defaults(P);
	}
	var F = get_attributes(e), I = F[IS_CUSTOM_ELEMENT], L = !F[IS_HTML];
	let R = hydrating && I;
	R && set_hydrating(!1);
	var z = k || {}, B = e.tagName === "OPTION";
	for (var V in k) V in A || (A[V] = null);
	A.class ? A.class = clsx$1(A.class) : (j || A[CLASS]) && (A.class = null), A[STYLE] && (A.style ??= null);
	var H = get_setters(e);
	for (let M in A) {
		let P = A[M];
		if (B && M === "value" && P == null) {
			e.value = e.__value = "", z[M] = P;
			continue;
		}
		if (M === "class") {
			set_class(e, e.namespaceURI === "http://www.w3.org/1999/xhtml", P, j, k?.[CLASS], A[CLASS]), z[M] = P, z[CLASS] = A[CLASS];
			continue;
		}
		if (M === "style") {
			set_style(e, P, k?.[STYLE], A[STYLE]), z[M] = P, z[STYLE] = A[STYLE];
			continue;
		}
		var U = z[M];
		if (!(P === U && !(P === void 0 && e.hasAttribute(M)))) {
			z[M] = P;
			var W = M[0] + M[1];
			if (W !== "$$") if (W === "on") {
				let O = {}, k = "$$" + M, A = M.slice(2);
				var G = can_delegate_event(A);
				if (is_capture_event(A) && (A = A.slice(0, -7), O.capture = !0), !G && U) {
					if (P != null) continue;
					e.removeEventListener(A, z[k], O), z[k] = null;
				}
				if (P != null) if (G) e[`__${A}`] = P, delegate([A]);
				else {
					function j(e) {
						z[M].call(this, e);
					}
					z[k] = create_event(A, e, j, O);
				}
				else G && (e[`__${A}`] = void 0);
			} else if (M === "style") set_attribute(e, M, P);
			else if (M === "autofocus") autofocus(e, !!P);
			else if (!I && (M === "__value" || M === "value" && P != null)) e.value = e.__value = P;
			else if (M === "selected" && B) set_selected(e, P);
			else {
				var K = M;
				L || (K = normalize_attribute(K));
				var q = K === "defaultValue" || K === "defaultChecked";
				if (P == null && !I && !q) if (F[M] = null, K === "value" || K === "checked") {
					let O = e, A = k === void 0;
					if (K === "value") {
						let e = O.defaultValue;
						O.removeAttribute(K), O.defaultValue = e, O.value = O.__value = A ? e : null;
					} else {
						let e = O.defaultChecked;
						O.removeAttribute(K), O.defaultChecked = e, O.checked = A ? e : !1;
					}
				} else e.removeAttribute(M);
				else q || H.includes(K) && (I || typeof P != "string") ? (e[K] = P, K in F && (F[K] = UNINITIALIZED)) : typeof P != "function" && set_attribute(e, K, P, N);
			}
		}
	}
	return R && set_hydrating(!0), z;
}
function attribute_effect(e, O, k = [], A = [], j = [], M, N = !1, P = !1) {
	flatten(j, k, A, (k) => {
		var A = void 0, j = {}, F = e.nodeName === "SELECT", I = !1;
		if (managed(() => {
			var L = O(...k.map(get)), R = set_attributes(e, A, L, M, N, P);
			I && F && "value" in L && select_option(e, L.value);
			for (let e of Object.getOwnPropertySymbols(j)) L[e] || destroy_effect(j[e]);
			for (let O of Object.getOwnPropertySymbols(L)) {
				var z = L[O];
				O.description === "@attach" && (!A || z !== A[O]) && (j[O] && destroy_effect(j[O]), j[O] = branch(() => attach(e, () => z))), R[O] = z;
			}
			A = R;
		}), F) {
			var L = e;
			effect(() => {
				select_option(L, A.value, !0), init_select(L);
			});
		}
		I = !0;
	});
}
function get_attributes(e) {
	return e.__attributes ??= {
		[IS_CUSTOM_ELEMENT]: e.nodeName.includes("-"),
		[IS_HTML]: e.namespaceURI === "http://www.w3.org/1999/xhtml"
	};
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(e) {
	var O = e.getAttribute("is") || e.nodeName, k = setters_cache.get(O);
	if (k) return k;
	setters_cache.set(O, k = []);
	for (var A, j = e, M = Element.prototype; M !== j;) {
		for (var N in A = get_descriptors(j), A) A[N].set && k.push(N);
		j = get_prototype_of(j);
	}
	return k;
}
function init(e = !1) {
	let O = component_context, k = O.l.u;
	if (!k) return;
	let A = () => deep_read_state(O.s);
	if (e) {
		let e = 0, k = {}, j = /* @__PURE__ */ derived(() => {
			let A = !1, j = O.s;
			for (let e in j) j[e] !== k[e] && (k[e] = j[e], A = !0);
			return A && e++, e;
		});
		A = () => get(j);
	}
	k.b.length && user_pre_effect(() => {
		observe_all(O, A), run_all(k.b);
	}), user_effect(() => {
		let e = untrack(() => k.m.map(run));
		return () => {
			for (let O of e) typeof O == "function" && O();
		};
	}), k.a.length && user_effect(() => {
		observe_all(O, A), run_all(k.a);
	});
}
function observe_all(e, O) {
	if (e.l.s) for (let O of e.l.s) get(O);
	O();
}
var is_store_binding = !1;
function capture_store_binding(e) {
	var O = is_store_binding;
	try {
		return is_store_binding = !1, [e(), is_store_binding];
	} finally {
		is_store_binding = O;
	}
}
var rest_props_handler = {
	get(e, O) {
		if (!e.exclude.includes(O)) return e.props[O];
	},
	set(e, O) {
		return !1;
	},
	getOwnPropertyDescriptor(e, O) {
		if (!e.exclude.includes(O) && O in e.props) return {
			enumerable: !0,
			configurable: !0,
			value: e.props[O]
		};
	},
	has(e, O) {
		return e.exclude.includes(O) ? !1 : O in e.props;
	},
	ownKeys(e) {
		return Reflect.ownKeys(e.props).filter((O) => !e.exclude.includes(O));
	}
};
/* @__NO_SIDE_EFFECTS__ */
function rest_props(e, O, k) {
	return new Proxy({
		props: e,
		exclude: O
	}, rest_props_handler);
}
var spread_props_handler = {
	get(e, O) {
		let k = e.props.length;
		for (; k--;) {
			let A = e.props[k];
			if (is_function(A) && (A = A()), typeof A == "object" && A && O in A) return A[O];
		}
	},
	set(e, O, k) {
		let A = e.props.length;
		for (; A--;) {
			let j = e.props[A];
			is_function(j) && (j = j());
			let M = get_descriptor(j, O);
			if (M && M.set) return M.set(k), !0;
		}
		return !1;
	},
	getOwnPropertyDescriptor(e, O) {
		let k = e.props.length;
		for (; k--;) {
			let A = e.props[k];
			if (is_function(A) && (A = A()), typeof A == "object" && A && O in A) {
				let e = get_descriptor(A, O);
				return e && !e.configurable && (e.configurable = !0), e;
			}
		}
	},
	has(e, O) {
		if (O === STATE_SYMBOL || O === LEGACY_PROPS) return !1;
		for (let k of e.props) if (is_function(k) && (k = k()), k != null && O in k) return !0;
		return !1;
	},
	ownKeys(e) {
		let O = [];
		for (let k of e.props) if (is_function(k) && (k = k()), k) {
			for (let e in k) O.includes(e) || O.push(e);
			for (let e of Object.getOwnPropertySymbols(k)) O.includes(e) || O.push(e);
		}
		return O;
	}
};
function spread_props(...e) {
	return new Proxy({ props: e }, spread_props_handler);
}
function prop(e, O, k, A) {
	var j = !legacy_mode_flag || (k & 2) != 0, M = (k & 8) != 0, N = (k & 16) != 0, P = A, I = !0, L = () => (I && (I = !1, P = N ? untrack(A) : A), P), R;
	if (M) {
		var z = STATE_SYMBOL in e || LEGACY_PROPS in e;
		R = get_descriptor(e, O)?.set ?? (z && O in e ? (k) => e[O] = k : void 0);
	}
	var B, V = !1;
	M ? [B, V] = capture_store_binding(() => e[O]) : B = e[O], B === void 0 && A !== void 0 && (B = L(), R && (j && props_invalid_value(O), R(B)));
	var H = j ? () => {
		var k = e[O];
		return k === void 0 ? L() : (I = !0, k);
	} : () => {
		var k = e[O];
		return k !== void 0 && (P = void 0), k === void 0 ? P : k;
	};
	if (j && !(k & 4)) return H;
	if (R) {
		var U = e.$$legacy;
		return (function(e, O) {
			return arguments.length > 0 ? ((!j || !O || U || V) && R(O ? H() : e), e) : H();
		});
	}
	var W = !1, G = (k & 1 ? derived : derived_safe_equal)(() => (W = !1, H()));
	M && get(G);
	var K = active_effect;
	return (function(e, O) {
		if (arguments.length > 0) {
			let k = O ? get(G) : j && M ? proxy(e) : e;
			return set(G, k), W = !0, P !== void 0 && (P = k), e;
		}
		return is_destroying_effect && W || K.f & 16384 ? G.v : get(G);
	});
}
function createClassComponent(e) {
	return new Svelte4Component(e);
}
var Svelte4Component = class {
	#e;
	#t;
	constructor(e) {
		var O = /* @__PURE__ */ new Map(), k = (e, k) => {
			var A = /* @__PURE__ */ mutable_source(k, !1, !1);
			return O.set(e, A), A;
		};
		let A = new Proxy({
			...e.props || {},
			$$events: {}
		}, {
			get(e, A) {
				return get(O.get(A) ?? k(A, Reflect.get(e, A)));
			},
			has(e, A) {
				return A === LEGACY_PROPS ? !0 : (get(O.get(A) ?? k(A, Reflect.get(e, A))), Reflect.has(e, A));
			},
			set(e, A, j) {
				return set(O.get(A) ?? k(A, j), j), Reflect.set(e, A, j);
			}
		});
		this.#t = (e.hydrate ? hydrate : mount)(e.component, {
			target: e.target,
			anchor: e.anchor,
			props: A,
			context: e.context,
			intro: e.intro ?? !1,
			recover: e.recover
		}), (!e?.props?.$$host || e.sync === !1) && flushSync(), this.#e = A.$$events;
		for (let e of Object.keys(this.#t)) e === "$set" || e === "$destroy" || e === "$on" || define_property(this, e, {
			get() {
				return this.#t[e];
			},
			set(O) {
				this.#t[e] = O;
			},
			enumerable: !0
		});
		this.#t.$set = (e) => {
			Object.assign(A, e);
		}, this.#t.$destroy = () => {
			unmount(this.#t);
		};
	}
	$set(e) {
		this.#t.$set(e);
	}
	$on(e, O) {
		this.#e[e] = this.#e[e] || [];
		let k = (...e) => O.call(this, ...e);
		return this.#e[e].push(k), () => {
			this.#e[e] = this.#e[e].filter((e) => e !== k);
		};
	}
	$destroy() {
		this.#t.$destroy();
	}
}, SvelteElement;
typeof HTMLElement == "function" && (SvelteElement = class extends HTMLElement {
	$$ctor;
	$$s;
	$$c;
	$$cn = !1;
	$$d = {};
	$$r = !1;
	$$p_d = {};
	$$l = {};
	$$l_u = /* @__PURE__ */ new Map();
	$$me;
	constructor(e, O, k) {
		super(), this.$$ctor = e, this.$$s = O, k && this.attachShadow({ mode: "open" });
	}
	addEventListener(e, O, k) {
		if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(O), this.$$c) {
			let k = this.$$c.$on(e, O);
			this.$$l_u.set(O, k);
		}
		super.addEventListener(e, O, k);
	}
	removeEventListener(e, O, k) {
		if (super.removeEventListener(e, O, k), this.$$c) {
			let e = this.$$l_u.get(O);
			e && (e(), this.$$l_u.delete(O));
		}
	}
	async connectedCallback() {
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function e(e) {
				return (O) => {
					let k = document.createElement("slot");
					e !== "default" && (k.name = e), append(O, k);
				};
			}
			let O = {}, k = get_custom_elements_slots(this);
			for (let A of this.$$s) A in k && (A === "default" && !this.$$d.children ? (this.$$d.children = e(A), O.default = !0) : O[A] = e(A));
			for (let e of this.attributes) {
				let O = this.$$g_p(e.name);
				O in this.$$d || (this.$$d[O] = get_custom_element_value(O, e.value, this.$$p_d, "toProp"));
			}
			for (let e in this.$$p_d) !(e in this.$$d) && this[e] !== void 0 && (this.$$d[e] = this[e], delete this[e]);
			for (let e in this.$$c = createClassComponent({
				component: this.$$ctor,
				target: this.shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: O,
					$$host: this
				}
			}), this.$$me = effect_root(() => {
				render_effect(() => {
					this.$$r = !0;
					for (let e of object_keys(this.$$c)) {
						if (!this.$$p_d[e]?.reflect) continue;
						this.$$d[e] = this.$$c[e];
						let O = get_custom_element_value(e, this.$$d[e], this.$$p_d, "toAttribute");
						O == null ? this.removeAttribute(this.$$p_d[e].attribute || e) : this.setAttribute(this.$$p_d[e].attribute || e, O);
					}
					this.$$r = !1;
				});
			}), this.$$l) for (let O of this.$$l[e]) {
				let k = this.$$c.$on(e, O);
				this.$$l_u.set(O, k);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(e, O, k) {
		this.$$r || (e = this.$$g_p(e), this.$$d[e] = get_custom_element_value(e, k, this.$$p_d, "toProp"), this.$$c?.$set({ [e]: this.$$d[e] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(e) {
		return object_keys(this.$$p_d).find((O) => this.$$p_d[O].attribute === e || !this.$$p_d[O].attribute && O.toLowerCase() === e) || e;
	}
});
function get_custom_element_value(e, O, k, A) {
	let j = k[e]?.type;
	if (O = j === "Boolean" && typeof O != "boolean" ? O != null : O, !A || !k[e]) return O;
	if (A === "toAttribute") switch (j) {
		case "Object":
		case "Array": return O == null ? null : JSON.stringify(O);
		case "Boolean": return O ? "" : null;
		case "Number": return O ?? null;
		default: return O;
	}
	else switch (j) {
		case "Object":
		case "Array": return O && JSON.parse(O);
		case "Boolean": return O;
		case "Number": return O == null ? O : +O;
		default: return O;
	}
}
function get_custom_elements_slots(e) {
	let O = {};
	return e.childNodes.forEach((e) => {
		O[e.slot || "default"] = !0;
	}), O;
}
function create_custom_element(e, O, k, A, j, M) {
	let I = class extends SvelteElement {
		constructor() {
			super(e, k, j), this.$$p_d = O;
		}
		static get observedAttributes() {
			return object_keys(O).map((e) => (O[e].attribute || e).toLowerCase());
		}
	};
	return object_keys(O).forEach((e) => {
		define_property(I.prototype, e, {
			get() {
				return this.$$c && e in this.$$c ? this.$$c[e] : this.$$d[e];
			},
			set(k) {
				k = get_custom_element_value(e, k, O), this.$$d[e] = k;
				var A = this.$$c;
				A && (get_descriptor(A, e)?.get ? A[e] = k : A.$set({ [e]: k }));
			}
		});
	}), A.forEach((e) => {
		define_property(I.prototype, e, { get() {
			return this.$$c?.[e];
		} });
	}), M && (I = M(I)), e.element = I, I;
}
enable_legacy_mode_flag();
function isFunction(e) {
	return typeof e == "function";
}
function isObject(e) {
	return typeof e == "object" && !!e;
}
var CLASS_VALUE_PRIMITIVE_TYPES = [
	"string",
	"number",
	"bigint",
	"boolean"
];
function isClassValue(e) {
	return e == null || CLASS_VALUE_PRIMITIVE_TYPES.includes(typeof e) ? !0 : Array.isArray(e) ? e.every((e) => isClassValue(e)) : typeof e == "object" ? Object.getPrototypeOf(e) === Object.prototype : !1;
}
const BoxSymbol = Symbol("box"), isWritableSymbol = Symbol("is-writable");
function boxWith(e, O) {
	let k = /* @__PURE__ */ user_derived(e);
	return O ? {
		[BoxSymbol]: !0,
		[isWritableSymbol]: !0,
		get current() {
			return get(k);
		},
		set current(e) {
			O(e);
		}
	} : {
		[BoxSymbol]: !0,
		get current() {
			return e();
		}
	};
}
function isBox(e) {
	return isObject(e) && BoxSymbol in e;
}
function isWritableBox(e) {
	return isBox(e) && isWritableSymbol in e;
}
function boxFrom(e) {
	return isBox(e) ? e : isFunction(e) ? boxWith(e) : simpleBox(e);
}
function boxFlatten(e) {
	return Object.entries(e).reduce((e, [O, k]) => isBox(k) ? (isWritableBox(k) ? Object.defineProperty(e, O, {
		get() {
			return k.current;
		},
		set(e) {
			k.current = e;
		}
	}) : Object.defineProperty(e, O, { get() {
		return k.current;
	} }), e) : Object.assign(e, { [O]: k }), {});
}
function toReadonlyBox(e) {
	return isWritableBox(e) ? {
		[BoxSymbol]: !0,
		get current() {
			return e.current;
		}
	} : e;
}
function simpleBox(e) {
	let O = /* @__PURE__ */ state(proxy(e));
	return {
		[BoxSymbol]: !0,
		[isWritableSymbol]: !0,
		get current() {
			return get(O);
		},
		set current(e) {
			set(O, e, !0);
		}
	};
}
function box(e) {
	let O = /* @__PURE__ */ state(proxy(e));
	return {
		[BoxSymbol]: !0,
		[isWritableSymbol]: !0,
		get current() {
			return get(O);
		},
		set current(e) {
			set(O, e, !0);
		}
	};
}
box.from = boxFrom, box.with = boxWith, box.flatten = boxFlatten, box.readonly = toReadonlyBox, box.isBox = isBox, box.isWritableBox = isWritableBox;
function composeHandlers(...e) {
	return function(O) {
		for (let k of e) if (k) {
			if (O.defaultPrevented) return;
			typeof k == "function" ? k.call(this, O) : k.current?.call(this, O);
		}
	};
}
var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g, NEWLINE_REGEX = /\n/g, WHITESPACE_REGEX = /^\s*/, PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/, COLON_REGEX = /^:\s*/, VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/, SEMICOLON_REGEX = /^[;\s]*/, TRIM_REGEX = /^\s+|\s+$/g, NEWLINE = "\n", FORWARD_SLASH = "/", ASTERISK = "*", EMPTY_STRING = "", TYPE_COMMENT = "comment", TYPE_DECLARATION = "declaration";
function index(e, O) {
	if (typeof e != "string") throw TypeError("First argument must be a string");
	if (!e) return [];
	O ||= {};
	var k = 1, A = 1;
	function j(e) {
		var O = e.match(NEWLINE_REGEX);
		O && (k += O.length);
		var j = e.lastIndexOf(NEWLINE);
		A = ~j ? e.length - j : A + e.length;
	}
	function M() {
		var e = {
			line: k,
			column: A
		};
		return function(O) {
			return O.position = new N(e), I(), O;
		};
	}
	function N(e) {
		this.start = e, this.end = {
			line: k,
			column: A
		}, this.source = O.source;
	}
	N.prototype.content = e;
	function P(j) {
		var M = /* @__PURE__ */ Error(O.source + ":" + k + ":" + A + ": " + j);
		if (M.reason = j, M.filename = O.source, M.line = k, M.column = A, M.source = e, !O.silent) throw M;
	}
	function F(O) {
		var k = O.exec(e);
		if (k) {
			var A = k[0];
			return j(A), e = e.slice(A.length), k;
		}
	}
	function I() {
		F(WHITESPACE_REGEX);
	}
	function L(e) {
		var O;
		for (e ||= []; O = R();) O !== !1 && e.push(O);
		return e;
	}
	function R() {
		var O = M();
		if (!(FORWARD_SLASH != e.charAt(0) || ASTERISK != e.charAt(1))) {
			for (var k = 2; EMPTY_STRING != e.charAt(k) && (ASTERISK != e.charAt(k) || FORWARD_SLASH != e.charAt(k + 1));) ++k;
			if (k += 2, EMPTY_STRING === e.charAt(k - 1)) return P("End of comment missing");
			var N = e.slice(2, k - 2);
			return A += 2, j(N), e = e.slice(k), A += 2, O({
				type: TYPE_COMMENT,
				comment: N
			});
		}
	}
	function z() {
		var e = M(), O = F(PROPERTY_REGEX);
		if (O) {
			if (R(), !F(COLON_REGEX)) return P("property missing ':'");
			var k = F(VALUE_REGEX), A = e({
				type: TYPE_DECLARATION,
				property: trim(O[0].replace(COMMENT_REGEX, EMPTY_STRING)),
				value: k ? trim(k[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
			});
			return F(SEMICOLON_REGEX), A;
		}
	}
	function B() {
		var e = [];
		L(e);
		for (var O; O = z();) O !== !1 && (e.push(O), L(e));
		return e;
	}
	return I(), B();
}
function trim(e) {
	return e ? e.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
}
function StyleToObject(e, O) {
	let k = null;
	if (!e || typeof e != "string") return k;
	let A = index(e), j = typeof O == "function";
	return A.forEach((e) => {
		if (e.type !== "declaration") return;
		let { property: A, value: M } = e;
		j ? O(A, M, e) : M && (k ||= {}, k[A] = M);
	}), k;
}
var NUMBER_CHAR_RE = /\d/, STR_SPLITTERS = [
	"-",
	"_",
	"/",
	"."
];
function isUppercase(e = "") {
	if (!NUMBER_CHAR_RE.test(e)) return e !== e.toLowerCase();
}
function splitByCase(e) {
	let O = [], k = "", A, j;
	for (let M of e) {
		let e = STR_SPLITTERS.includes(M);
		if (e === !0) {
			O.push(k), k = "", A = void 0;
			continue;
		}
		let N = isUppercase(M);
		if (j === !1) {
			if (A === !1 && N === !0) {
				O.push(k), k = M, A = N;
				continue;
			}
			if (A === !0 && N === !1 && k.length > 1) {
				let e = k.at(-1);
				O.push(k.slice(0, Math.max(0, k.length - 1))), k = e + M, A = N;
				continue;
			}
		}
		k += M, A = N, j = e;
	}
	return O.push(k), O;
}
function pascalCase(e) {
	return e ? splitByCase(e).map((e) => upperFirst(e)).join("") : "";
}
function camelCase(e) {
	return lowerFirst(pascalCase(e || ""));
}
function upperFirst(e) {
	return e ? e[0].toUpperCase() + e.slice(1) : "";
}
function lowerFirst(e) {
	return e ? e[0].toLowerCase() + e.slice(1) : "";
}
function cssToStyleObj(e) {
	if (!e) return {};
	let O = {};
	function k(e, k) {
		if (e.startsWith("-moz-") || e.startsWith("-webkit-") || e.startsWith("-ms-") || e.startsWith("-o-")) {
			O[pascalCase(e)] = k;
			return;
		}
		if (e.startsWith("--")) {
			O[e] = k;
			return;
		}
		O[camelCase(e)] = k;
	}
	return StyleToObject(e, k), O;
}
function executeCallbacks(...e) {
	return (...O) => {
		for (let k of e) typeof k == "function" && k(...O);
	};
}
function createParser(e, O) {
	let k = RegExp(e, "g");
	return (e) => {
		if (typeof e != "string") throw TypeError(`expected an argument of type string, but got ${typeof e}`);
		return e.match(k) ? e.replace(k, O) : e;
	};
}
var camelToKebab = createParser(/[A-Z]/, (e) => `-${e.toLowerCase()}`);
function styleToCSS(e) {
	if (!e || typeof e != "object" || Array.isArray(e)) throw TypeError(`expected an argument of type object, but got ${typeof e}`);
	return Object.keys(e).map((O) => `${camelToKebab(O)}: ${e[O]};`).join("\n");
}
function styleToString(e = {}) {
	return styleToCSS(e).replace("\n", " ");
}
var EVENT_LIST = /* @__PURE__ */ "onabort.onanimationcancel.onanimationend.onanimationiteration.onanimationstart.onauxclick.onbeforeinput.onbeforetoggle.onblur.oncancel.oncanplay.oncanplaythrough.onchange.onclick.onclose.oncompositionend.oncompositionstart.oncompositionupdate.oncontextlost.oncontextmenu.oncontextrestored.oncopy.oncuechange.oncut.ondblclick.ondrag.ondragend.ondragenter.ondragleave.ondragover.ondragstart.ondrop.ondurationchange.onemptied.onended.onerror.onfocus.onfocusin.onfocusout.onformdata.ongotpointercapture.oninput.oninvalid.onkeydown.onkeypress.onkeyup.onload.onloadeddata.onloadedmetadata.onloadstart.onlostpointercapture.onmousedown.onmouseenter.onmouseleave.onmousemove.onmouseout.onmouseover.onmouseup.onpaste.onpause.onplay.onplaying.onpointercancel.onpointerdown.onpointerenter.onpointerleave.onpointermove.onpointerout.onpointerover.onpointerup.onprogress.onratechange.onreset.onresize.onscroll.onscrollend.onsecuritypolicyviolation.onseeked.onseeking.onselect.onselectionchange.onselectstart.onslotchange.onstalled.onsubmit.onsuspend.ontimeupdate.ontoggle.ontouchcancel.ontouchend.ontouchmove.ontouchstart.ontransitioncancel.ontransitionend.ontransitionrun.ontransitionstart.onvolumechange.onwaiting.onwebkitanimationend.onwebkitanimationiteration.onwebkitanimationstart.onwebkittransitionend.onwheel".split(".");
const EVENT_LIST_SET = new Set(EVENT_LIST);
function isEventHandler(e) {
	return EVENT_LIST_SET.has(e);
}
function mergeProps(...e) {
	let O = { ...e[0] };
	for (let k = 1; k < e.length; k++) {
		let A = e[k];
		if (A) {
			for (let e of Object.keys(A)) {
				let k = O[e], j = A[e], M = typeof k == "function", N = typeof j == "function";
				if (M && typeof N && isEventHandler(e)) O[e] = composeHandlers(k, j);
				else if (M && N) O[e] = executeCallbacks(k, j);
				else if (e === "class") {
					let A = isClassValue(k), M = isClassValue(j);
					A && M ? O[e] = clsx(k, j) : A ? O[e] = clsx(k) : M && (O[e] = clsx(j));
				} else if (e === "style") {
					let A = typeof k == "object", M = typeof j == "object", N = typeof k == "string", P = typeof j == "string";
					if (A && M) O[e] = {
						...k,
						...j
					};
					else if (A && P) {
						let A = cssToStyleObj(j);
						O[e] = {
							...k,
							...A
						};
					} else if (N && M) O[e] = {
						...cssToStyleObj(k),
						...j
					};
					else if (N && P) {
						let A = cssToStyleObj(k), M = cssToStyleObj(j);
						O[e] = {
							...A,
							...M
						};
					} else A ? O[e] = k : M ? O[e] = j : N ? O[e] = k : P && (O[e] = j);
				} else O[e] = j === void 0 ? k : j;
			}
			for (let e of Object.getOwnPropertySymbols(A)) {
				let k = O[e], j = A[e];
				O[e] = j === void 0 ? k : j;
			}
		}
	}
	return typeof O.style == "object" && (O.style = styleToString(O.style).replaceAll("\n", " ")), O.hidden === !1 && (O.hidden = void 0, delete O.hidden), O.disabled === !1 && (O.disabled = void 0, delete O.disabled), O;
}
var SvelteMap = class extends Map {
	#e = /* @__PURE__ */ new Map();
	#t = /* @__PURE__ */ state(0);
	#n = /* @__PURE__ */ state(0);
	#r = update_version || -1;
	constructor(e) {
		if (super(), e) {
			for (var [O, k] of e) super.set(O, k);
			this.#n.v = super.size;
		}
	}
	#i(e) {
		return update_version === this.#r ? /* @__PURE__ */ state(e) : source(e);
	}
	has(e) {
		var O = this.#e, k = O.get(e);
		if (k === void 0) if (super.get(e) !== void 0) k = this.#i(0), O.set(e, k);
		else return get(this.#t), !1;
		return get(k), !0;
	}
	forEach(e, O) {
		this.#a(), super.forEach(e, O);
	}
	get(e) {
		var O = this.#e, k = O.get(e);
		if (k === void 0) if (super.get(e) !== void 0) k = this.#i(0), O.set(e, k);
		else {
			get(this.#t);
			return;
		}
		return get(k), super.get(e);
	}
	set(e, O) {
		var k = this.#e, A = k.get(e), j = super.get(e), M = super.set(e, O), N = this.#t;
		if (A === void 0) A = this.#i(0), k.set(e, A), set(this.#n, super.size), increment(N);
		else if (j !== O) {
			increment(A);
			var P = N.reactions === null ? null : new Set(N.reactions);
			(P === null || !A.reactions?.every((e) => P.has(e))) && increment(N);
		}
		return M;
	}
	delete(e) {
		var O = this.#e, k = O.get(e), A = super.delete(e);
		return k !== void 0 && (O.delete(e), set(this.#n, super.size), set(k, -1), increment(this.#t)), A;
	}
	clear() {
		if (super.size !== 0) {
			super.clear();
			var e = this.#e;
			set(this.#n, 0);
			for (var O of e.values()) set(O, -1);
			increment(this.#t), e.clear();
		}
	}
	#a() {
		get(this.#t);
		var e = this.#e;
		if (this.#n.v !== e.size) {
			for (var O of super.keys()) if (!e.has(O)) {
				var k = this.#i(0);
				e.set(O, k);
			}
		}
		for ([, k] of this.#e) get(k);
	}
	keys() {
		return get(this.#t), super.keys();
	}
	values() {
		return this.#a(), super.values();
	}
	entries() {
		return this.#a(), super.entries();
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return get(this.#n), super.size;
	}
};
URLSearchParams, Symbol.iterator;
var ReactiveValue = class {
	#e;
	#t;
	constructor(e, O) {
		this.#e = e, this.#t = createSubscriber(O);
	}
	get current() {
		return this.#t(), this.#e();
	}
}, parenthesis_regex = /\(.+\)/, non_parenthesized_keywords = new Set([
	"all",
	"print",
	"screen",
	"and",
	"or",
	"not",
	"only"
]), MediaQuery = class extends ReactiveValue {
	constructor(e, O) {
		let k = parenthesis_regex.test(e) || e.split(/[\s,]+/).some((e) => non_parenthesized_keywords.has(e.trim())) ? e : `(${e})`, A = window.matchMedia(k);
		super(() => A.matches, (e) => on(A, "change", e));
	}
};
function onDestroyEffect(e) {
	user_effect(() => () => {
		e();
	});
}
function onMountEffect(e) {
	user_effect(() => untrack(() => e()));
}
function afterSleep(e, O) {
	return setTimeout(O, e);
}
function afterTick(e) {
	tick().then(e);
}
var ELEMENT_NODE = 1, DOCUMENT_NODE = 9, DOCUMENT_FRAGMENT_NODE = 11;
function isHTMLElement(e) {
	return isObject(e) && e.nodeType === ELEMENT_NODE && typeof e.nodeName == "string";
}
function isDocument(e) {
	return isObject(e) && e.nodeType === DOCUMENT_NODE;
}
function isWindow(e) {
	return isObject(e) && e.constructor?.name === "VisualViewport";
}
function isNode(e) {
	return isObject(e) && e.nodeType !== void 0;
}
function isShadowRoot(e) {
	return isNode(e) && e.nodeType === DOCUMENT_FRAGMENT_NODE && "host" in e;
}
function getDocument(e) {
	return isDocument(e) ? e : isWindow(e) ? e.document : e?.ownerDocument ?? document;
}
function getWindow(e) {
	return isShadowRoot(e) ? getWindow(e.host) : isDocument(e) ? e.defaultView ?? window : isHTMLElement(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function getActiveElement(e) {
	let O = e.activeElement;
	for (; O?.shadowRoot;) {
		let e = O.shadowRoot.activeElement;
		if (e === O) break;
		O = e;
	}
	return O;
}
var DOMContext = class {
	element;
	#e = /* @__PURE__ */ user_derived(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
	get root() {
		return get(this.#e);
	}
	set root(e) {
		set(this.#e, e);
	}
	constructor(e) {
		typeof e == "function" ? this.element = boxWith(e) : this.element = e;
	}
	getDocument = () => getDocument(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => getActiveElement(this.root);
	isActiveElement = (e) => e === this.getActiveElement();
	getElementById(e) {
		return this.root.getElementById(e);
	}
	querySelector = (e) => this.root ? this.root.querySelector(e) : null;
	querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
	setTimeout = (e, O) => this.getWindow().setTimeout(e, O);
	clearTimeout = (e) => this.getWindow().clearTimeout(e);
};
function attachRef(e, O) {
	return { [createAttachmentKey()]: (k) => isBox(e) ? (e.current = k, untrack(() => O?.(k)), () => {
		"isConnected" in k && k.isConnected || (e.current = null, O?.(null));
	}) : (e(k), untrack(() => O?.(k)), () => {
		"isConnected" in k && k.isConnected || (e(null), O?.(null));
	}) };
}
export { first_child as $, each as A, from_html as B, set_class as C, element as D, append_styles as E, mount as F, exclude_from_object as G, props_id as H, set_text as I, effect_root as J, get as K, unmount as L, key as M, if_block as N, component as O, snippet as P, child as Q, append as R, set_attribute as S, clsx as T, text as U, from_svg as V, on as W, user_effect as X, template_effect as Y, user_pre_effect as Z, prop as _, false_default as _t, afterTick as a, createSubscriber as at, init as b, onDestroyEffect as c, getContext as ct, mergeProps as d, push as dt, sibling as et, executeCallbacks as f, setContext as ft, create_custom_element as g, to_array as gt, simpleBox as h, noop as ht, getWindow as i, user_derived as it, index$1 as j, html as k, MediaQuery as l, hasContext as lt, boxWith as m, reset as mt, DOMContext as n, set as nt, afterSleep as o, flushSync as ot, box as p, next as pt, untrack as q, getDocument as r, state as rt, onMountEffect as s, getAllContexts as st, attachRef as t, proxy as tt, SvelteMap as u, pop as ut, rest_props as v, clsx$1 as w, attribute_effect as x, spread_props as y, comment as z };
