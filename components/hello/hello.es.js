typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add("5");
const HYDRATION_ERROR = {}, UNINITIALIZED = Symbol();
var is_array = Array.isArray, index_of = Array.prototype.indexOf, array_from = Array.from, object_keys = Object.keys, define_property = Object.defineProperty, get_descriptor = Object.getOwnPropertyDescriptor, object_prototype = Object.prototype, array_prototype = Array.prototype, get_prototype_of = Object.getPrototypeOf, is_extensible = Object.isExtensible;
function run_all(o) {
	for (var F = 0; F < o.length; F++) o[F]();
}
function deferred() {
	var o, F;
	return {
		promise: new Promise((I, L) => {
			o = I, F = L;
		}),
		resolve: o,
		reject: F
	};
}
const CLEAN = 1024, DIRTY = 2048, MAYBE_DIRTY = 4096, INERT = 8192, EFFECT_PRESERVED = 1 << 19, WAS_MARKED = 32768, REACTION_IS_UPDATING = 1 << 21, ERROR_VALUE = 1 << 23, STATE_SYMBOL = Symbol("$state"), LEGACY_PROPS = Symbol("legacy props"), STALE_REACTION = new class extends Error {
	name = "StaleReactionError";
	message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function async_derived_orphan() {
	throw Error("https://svelte.dev/e/async_derived_orphan");
}
function effect_update_depth_exceeded() {
	throw Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hydration_failed() {
	throw Error("https://svelte.dev/e/hydration_failed");
}
function props_invalid_value(o) {
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
function hydration_mismatch(o) {
	console.warn("https://svelte.dev/e/hydration_mismatch");
}
function svelte_boundary_reset_noop() {
	console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
let hydrating = !1;
function set_hydrating(o) {
	hydrating = o;
}
let hydrate_node;
function set_hydrate_node(F) {
	if (F === null) throw hydration_mismatch(), HYDRATION_ERROR;
	return hydrate_node = F;
}
function hydrate_next() {
	return set_hydrate_node(/* @__PURE__ */ get_next_sibling(hydrate_node));
}
function reset(F) {
	if (hydrating) {
		if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null) throw hydration_mismatch(), HYDRATION_ERROR;
		hydrate_node = F;
	}
}
function next(o = 1) {
	if (hydrating) {
		for (var F = o, I = hydrate_node; F--;) I = /* @__PURE__ */ get_next_sibling(I);
		hydrate_node = I;
	}
}
function skip_nodes(o = !0) {
	for (var F = 0, I = hydrate_node;;) {
		if (I.nodeType === 8) {
			var L = I.data;
			if (L === "]") {
				if (F === 0) return I;
				--F;
			} else (L === "[" || L === "[!") && (F += 1);
		}
		var R = /* @__PURE__ */ get_next_sibling(I);
		o && I.remove(), I = R;
	}
}
function equals(o) {
	return o === this.v;
}
function safe_not_equal(o, F) {
	return o == o ? o !== F || typeof o == "object" && !!o || typeof o == "function" : F == F;
}
function safe_equals(o) {
	return !safe_not_equal(o, this.v);
}
let component_context = null;
function set_component_context(o) {
	component_context = o;
}
function push(o, F = !1, I) {
	component_context = {
		p: component_context,
		i: !1,
		c: null,
		e: null,
		s: o,
		x: null,
		l: null
	};
}
function pop(o) {
	var F = component_context, I = F.e;
	if (I !== null) {
		F.e = null;
		for (var L of I) create_user_effect(L);
	}
	return o !== void 0 && (F.x = o), F.i = !0, component_context = F.p, o ?? {};
}
function is_runes() {
	return !0;
}
var micro_tasks = [];
function run_micro_tasks() {
	var o = micro_tasks;
	micro_tasks = [], run_all(o);
}
function queue_micro_task(o) {
	if (micro_tasks.length === 0 && !is_flushing_sync) {
		var F = micro_tasks;
		queueMicrotask(() => {
			F === micro_tasks && run_micro_tasks();
		});
	}
	micro_tasks.push(o);
}
function flush_tasks() {
	for (; micro_tasks.length > 0;) run_micro_tasks();
}
function handle_error(o) {
	var F = active_effect;
	if (F === null) return active_reaction.f |= ERROR_VALUE, o;
	if (F.f & 32768) invoke_error_boundary(o, F);
	else {
		if (!(F.f & 128)) throw o;
		F.b.error(o);
	}
}
function invoke_error_boundary(o, F) {
	for (; F !== null;) {
		if (F.f & 128) try {
			F.b.error(o);
			return;
		} catch (F) {
			o = F;
		}
		F = F.parent;
	}
	throw o;
}
var batches = /* @__PURE__ */ new Set();
let current_batch = null, batch_values = null;
var queued_root_effects = [], last_scheduled_effect = null, is_flushing = !1;
let is_flushing_sync = !1;
var Batch = class o {
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
	process(o) {
		queued_root_effects = [], this.apply();
		var F = {
			parent: null,
			effect: null,
			effects: [],
			render_effects: []
		};
		for (let I of o) this.#s(I, F);
		this.is_fork || this.#u(), this.is_deferred() ? (this.#c(F.effects), this.#c(F.render_effects)) : (current_batch = null, flush_queued_effects(F.render_effects), flush_queued_effects(F.effects), this.#i?.resolve()), batch_values = null;
	}
	#s(o, F) {
		o.f ^= CLEAN;
		for (var I = o.first; I !== null;) {
			var L = I.f, R = (L & 96) != 0, z = R && (L & 1024) != 0 || (L & 8192) != 0 || this.skipped_effects.has(I);
			if (I.f & 128 && I.b?.is_pending() && (F = {
				parent: F,
				effect: I,
				effects: [],
				render_effects: []
			}), !z && I.fn !== null) {
				R ? I.f ^= CLEAN : L & 4 ? F.effects.push(I) : is_dirty(I) && (I.f & 16 && this.#a.add(I), update_effect(I));
				var B = I.first;
				if (B !== null) {
					I = B;
					continue;
				}
			}
			var V = I.parent;
			for (I = I.next; I === null && V !== null;) V === F.effect && (this.#c(F.effects), this.#c(F.render_effects), F = F.parent), I = V.next, V = V.parent;
		}
	}
	#c(o) {
		for (let F of o) F.f & 2048 ? this.#a.add(F) : F.f & 4096 && this.#o.add(F), this.#l(F.deps), set_signal_status(F, CLEAN);
	}
	#l(o) {
		if (o !== null) for (let F of o) !(F.f & 2) || !(F.f & 32768) || (F.f ^= WAS_MARKED, this.#l(F.deps));
	}
	capture(o, F) {
		this.previous.has(o) || this.previous.set(o, F), o.f & 8388608 || (this.current.set(o, o.v), batch_values?.set(o, o.v));
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
		for (let o of this.#t) o(this);
		this.#t.clear();
	}
	#u() {
		if (this.#r === 0) {
			for (let o of this.#e) o();
			this.#e.clear();
		}
		this.#n === 0 && this.#d();
	}
	#d() {
		if (batches.size > 1) {
			this.previous.clear();
			var o = batch_values, F = !0, I = {
				parent: null,
				effect: null,
				effects: [],
				render_effects: []
			};
			for (let o of batches) {
				if (o === this) {
					F = !1;
					continue;
				}
				let R = [];
				for (let [I, L] of this.current) {
					if (o.current.has(I)) if (F && L !== o.current.get(I)) o.current.set(I, L);
					else continue;
					R.push(I);
				}
				if (R.length === 0) continue;
				let z = [...o.current.keys()].filter((o) => !this.current.has(o));
				if (z.length > 0) {
					var L = queued_root_effects;
					queued_root_effects = [];
					let F = /* @__PURE__ */ new Set(), B = /* @__PURE__ */ new Map();
					for (let o of R) mark_effects(o, z, F, B);
					if (queued_root_effects.length > 0) {
						current_batch = o, o.apply();
						for (let F of queued_root_effects) o.#s(F, I);
						o.deactivate();
					}
					queued_root_effects = L;
				}
			}
			current_batch = null, batch_values = o;
		}
		this.committed = !0, batches.delete(this);
	}
	increment(o) {
		this.#n += 1, o && (this.#r += 1);
	}
	decrement(o) {
		--this.#n, o && --this.#r, this.revive();
	}
	revive() {
		for (let o of this.#a) this.#o.delete(o), set_signal_status(o, DIRTY), schedule_effect(o);
		for (let o of this.#o) set_signal_status(o, MAYBE_DIRTY), schedule_effect(o);
		this.flush();
	}
	oncommit(o) {
		this.#e.add(o);
	}
	ondiscard(o) {
		this.#t.add(o);
	}
	settled() {
		return (this.#i ??= deferred()).promise;
	}
	static ensure() {
		if (current_batch === null) {
			let F = current_batch = new o();
			batches.add(current_batch), is_flushing_sync || o.enqueue(() => {
				current_batch === F && F.flush();
			});
		}
		return current_batch;
	}
	static enqueue(o) {
		queue_micro_task(o);
	}
	apply() {}
};
function flushSync(o) {
	var F = is_flushing_sync;
	is_flushing_sync = !0;
	try {
		var I;
		for (o && (current_batch !== null && flush_effects(), I = o());;) {
			if (flush_tasks(), queued_root_effects.length === 0 && (current_batch?.flush(), queued_root_effects.length === 0)) return last_scheduled_effect = null, I;
			flush_effects();
		}
	} finally {
		is_flushing_sync = F;
	}
}
function flush_effects() {
	var o = is_updating_effect;
	is_flushing = !0;
	try {
		var F = 0;
		for (set_is_updating_effect(!0); queued_root_effects.length > 0;) {
			var I = Batch.ensure();
			F++ > 1e3 && infinite_loop_guard(), I.process(queued_root_effects), old_values.clear();
		}
	} finally {
		is_flushing = !1, set_is_updating_effect(o), last_scheduled_effect = null;
	}
}
function infinite_loop_guard() {
	try {
		effect_update_depth_exceeded();
	} catch (o) {
		invoke_error_boundary(o, last_scheduled_effect);
	}
}
let eager_block_effects = null;
function flush_queued_effects(o) {
	var F = o.length;
	if (F !== 0) {
		for (var I = 0; I < F;) {
			var L = o[I++];
			if (!(L.f & 24576) && is_dirty(L) && (eager_block_effects = /* @__PURE__ */ new Set(), update_effect(L), L.deps === null && L.first === null && L.nodes === null && (L.teardown === null && L.ac === null ? unlink_effect(L) : L.fn = null), eager_block_effects?.size > 0)) {
				old_values.clear();
				for (let o of eager_block_effects) {
					if (o.f & 24576) continue;
					let F = [o], I = o.parent;
					for (; I !== null;) eager_block_effects.has(I) && (eager_block_effects.delete(I), F.push(I)), I = I.parent;
					for (let o = F.length - 1; o >= 0; o--) {
						let I = F[o];
						I.f & 24576 || update_effect(I);
					}
				}
				eager_block_effects.clear();
			}
		}
		eager_block_effects = null;
	}
}
function mark_effects(o, F, I, L) {
	if (!I.has(o) && (I.add(o), o.reactions !== null)) for (let R of o.reactions) {
		let o = R.f;
		o & 2 ? mark_effects(R, F, I, L) : o & 4194320 && !(o & 2048) && depends_on(R, F, L) && (set_signal_status(R, DIRTY), schedule_effect(R));
	}
}
function depends_on(o, F, I) {
	let L = I.get(o);
	if (L !== void 0) return L;
	if (o.deps !== null) for (let L of o.deps) {
		if (F.includes(L)) return !0;
		if (L.f & 2 && depends_on(L, F, I)) return I.set(L, !0), !0;
	}
	return I.set(o, !1), !1;
}
function schedule_effect(o) {
	for (var F = last_scheduled_effect = o; F.parent !== null;) {
		F = F.parent;
		var I = F.f;
		if (is_flushing && F === active_effect && I & 16 && !(I & 262144)) return;
		if (I & 96) {
			if (!(I & 1024)) return;
			F.f ^= CLEAN;
		}
	}
	queued_root_effects.push(F);
}
function createSubscriber(o) {
	let F = 0, I = source(0), L;
	return () => {
		effect_tracking() && (get(I), render_effect(() => (F === 0 && (L = untrack(() => o(() => increment(I)))), F += 1, () => {
			queue_micro_task(() => {
				--F, F === 0 && (L?.(), L = void 0, increment(I));
			});
		})));
	};
}
var flags = EFFECT_PRESERVED | 65664;
function boundary(o, F, I) {
	new Boundary(o, F, I);
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
	constructor(o, F, I) {
		this.#t = o, this.#r = F, this.#i = I, this.parent = active_effect.b, this.#e = !!this.#r.pending, this.#a = block(() => {
			if (active_effect.b = this, hydrating) {
				let o = this.#n;
				hydrate_next(), o.nodeType === 8 && o.data === "[!" ? this.#_() : this.#g();
			} else {
				var o = this.#v();
				try {
					this.#o = branch(() => I(o));
				} catch (o) {
					this.error(o);
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
		} catch (o) {
			this.error(o);
		}
		this.#e = !1;
	}
	#_() {
		let o = this.#r.pending;
		o && (this.#s = branch(() => o(this.#t)), Batch.enqueue(() => {
			var o = this.#v();
			this.#o = this.#y(() => (Batch.ensure(), branch(() => this.#i(o)))), this.#f > 0 ? this.#b() : (pause_effect(this.#s, () => {
				this.#s = null;
			}), this.#e = !1);
		}));
	}
	#v() {
		var o = this.#t;
		return this.#e && (this.#u = create_text(), this.#t.before(this.#u), o = this.#u), o;
	}
	is_pending() {
		return this.#e || !!this.parent && this.parent.is_pending();
	}
	has_pending_snippet() {
		return !!this.#r.pending;
	}
	#y(o) {
		var F = active_effect, I = active_reaction, L = component_context;
		set_active_effect(this.#a), set_active_reaction(this.#a), set_component_context(this.#a.ctx);
		try {
			return o();
		} catch (o) {
			return handle_error(o), null;
		} finally {
			set_active_effect(F), set_active_reaction(I), set_component_context(L);
		}
	}
	#b() {
		let o = this.#r.pending;
		this.#o !== null && (this.#l = document.createDocumentFragment(), this.#l.append(this.#u), move_effect(this.#o, this.#l)), this.#s === null && (this.#s = branch(() => o(this.#t)));
	}
	#x(o) {
		if (!this.has_pending_snippet()) {
			this.parent && this.parent.#x(o);
			return;
		}
		this.#f += o, this.#f === 0 && (this.#e = !1, this.#s && pause_effect(this.#s, () => {
			this.#s = null;
		}), this.#l &&= (this.#t.before(this.#l), null));
	}
	update_pending_count(o) {
		this.#x(o), this.#d += o, this.#m && internal_set(this.#m, this.#d);
	}
	get_effect_pending() {
		return this.#h(), get(this.#m);
	}
	error(o) {
		var F = this.#r.onerror;
		let I = this.#r.failed;
		if (this.#p || !F && !I) throw o;
		this.#o &&= (destroy_effect(this.#o), null), this.#s &&= (destroy_effect(this.#s), null), this.#c &&= (destroy_effect(this.#c), null), hydrating && (set_hydrate_node(this.#n), next(), set_hydrate_node(skip_nodes()));
		var L = !1, R = !1;
		let z = () => {
			if (L) {
				svelte_boundary_reset_noop();
				return;
			}
			L = !0, R && svelte_boundary_reset_onerror(), Batch.ensure(), this.#d = 0, this.#c !== null && pause_effect(this.#c, () => {
				this.#c = null;
			}), this.#e = this.has_pending_snippet(), this.#o = this.#y(() => (this.#p = !1, branch(() => this.#i(this.#t)))), this.#f > 0 ? this.#b() : this.#e = !1;
		};
		var B = active_reaction;
		try {
			set_active_reaction(null), R = !0, F?.(o, z), R = !1;
		} catch (o) {
			invoke_error_boundary(o, this.#a && this.#a.parent);
		} finally {
			set_active_reaction(B);
		}
		I && queue_micro_task(() => {
			this.#c = this.#y(() => {
				Batch.ensure(), this.#p = !0;
				try {
					return branch(() => {
						I(this.#t, () => o, () => z);
					});
				} catch (o) {
					return invoke_error_boundary(o, this.#a.parent), null;
				} finally {
					this.#p = !1;
				}
			});
		});
	}
};
function flatten(o, F, I, L) {
	let R = is_runes() ? derived : derived_safe_equal;
	if (I.length === 0 && o.length === 0) {
		L(F.map(R));
		return;
	}
	var z = current_batch, B = active_effect, V = capture();
	function H() {
		Promise.all(I.map((o) => /* @__PURE__ */ async_derived(o))).then((o) => {
			V();
			try {
				L([...F.map(R), ...o]);
			} catch (o) {
				B.f & 16384 || invoke_error_boundary(o, B);
			}
			z?.deactivate(), unset_context();
		}).catch((o) => {
			invoke_error_boundary(o, B);
		});
	}
	o.length > 0 ? Promise.all(o).then(() => {
		V();
		try {
			return H();
		} finally {
			z?.deactivate(), unset_context();
		}
	}) : H();
}
function capture() {
	var o = active_effect, F = active_reaction, I = component_context, L = current_batch;
	return function(R = !0) {
		set_active_effect(o), set_active_reaction(F), set_component_context(I), R && L?.activate();
	};
}
function unset_context() {
	set_active_effect(null), set_active_reaction(null), set_component_context(null);
}
/* @__NO_SIDE_EFFECTS__ */
function derived(o) {
	var I = 2 | DIRTY, L = active_reaction !== null && active_reaction.f & 2 ? active_reaction : null;
	return active_effect !== null && (active_effect.f |= EFFECT_PRESERVED), {
		ctx: component_context,
		deps: null,
		effects: null,
		equals,
		f: I,
		fn: o,
		reactions: null,
		rv: 0,
		v: UNINITIALIZED,
		wv: 0,
		parent: L ?? active_effect,
		ac: null
	};
}
/* @__NO_SIDE_EFFECTS__ */
function async_derived(o, I) {
	let L = active_effect;
	L === null && async_derived_orphan();
	var R = L.b, z = void 0, B = source(UNINITIALIZED), V = !active_reaction, H = /* @__PURE__ */ new Map();
	return async_effect(() => {
		var F = deferred();
		z = F.promise;
		try {
			Promise.resolve(o()).then(F.resolve, F.reject).then(() => {
				I === current_batch && I.committed && I.deactivate(), unset_context();
			});
		} catch (o) {
			F.reject(o), unset_context();
		}
		var I = current_batch;
		if (V) {
			var L = !R.is_pending();
			R.update_pending_count(1), I.increment(L), H.get(I)?.reject(STALE_REACTION), H.delete(I), H.set(I, F);
		}
		let U = (o, F = void 0) => {
			if (I.activate(), F) F !== STALE_REACTION && (B.f |= ERROR_VALUE, internal_set(B, F));
			else {
				B.f & 8388608 && (B.f ^= ERROR_VALUE), internal_set(B, o);
				for (let [o, F] of H) {
					if (H.delete(o), o === I) break;
					F.reject(STALE_REACTION);
				}
			}
			V && (R.update_pending_count(-1), I.decrement(L));
		};
		F.promise.then(U, (o) => U(null, o || "unknown"));
	}), teardown(() => {
		for (let o of H.values()) o.reject(STALE_REACTION);
	}), new Promise((o) => {
		function F(I) {
			function L() {
				I === z ? o(B) : F(z);
			}
			I.then(L, L);
		}
		F(z);
	});
}
/* @__NO_SIDE_EFFECTS__ */
function derived_safe_equal(o) {
	let F = /* @__PURE__ */ derived(o);
	return F.equals = safe_equals, F;
}
function destroy_derived_effects(o) {
	var F = o.effects;
	if (F !== null) {
		o.effects = null;
		for (var I = 0; I < F.length; I += 1) destroy_effect(F[I]);
	}
}
function get_derived_parent_effect(o) {
	for (var F = o.parent; F !== null;) {
		if (!(F.f & 2)) return F.f & 16384 ? null : F;
		F = F.parent;
	}
	return null;
}
function execute_derived(o) {
	var F, I = active_effect;
	set_active_effect(get_derived_parent_effect(o));
	try {
		o.f &= ~WAS_MARKED, destroy_derived_effects(o), F = update_reaction(o);
	} finally {
		set_active_effect(I);
	}
	return F;
}
function update_derived(o) {
	var F = execute_derived(o);
	o.equals(F) || (current_batch?.is_fork || (o.v = F), o.wv = increment_write_version()), !is_destroying_effect && (batch_values === null ? set_signal_status(o, o.f & 512 ? CLEAN : MAYBE_DIRTY) : (effect_tracking() || current_batch?.is_fork) && batch_values.set(o, F));
}
let eager_effects = /* @__PURE__ */ new Set();
const old_values = /* @__PURE__ */ new Map();
var eager_effects_deferred = !1;
function source(o, F) {
	return {
		f: 0,
		v: o,
		reactions: null,
		equals,
		rv: 0,
		wv: 0
	};
}
/* @__NO_SIDE_EFFECTS__ */
function state(o, F) {
	let I = source(o, F);
	return push_reaction_value(I), I;
}
/* @__NO_SIDE_EFFECTS__ */
function mutable_source(o, F = !1, I = !0) {
	let L = source(o);
	return F || (L.equals = safe_equals), L;
}
function set(o, F, I = !1) {
	return active_reaction !== null && (!untracking || active_reaction.f & 131072) && is_runes() && active_reaction.f & 4325394 && !current_sources?.includes(o) && state_unsafe_mutation(), internal_set(o, I ? proxy(F) : F);
}
function internal_set(o, F) {
	if (!o.equals(F)) {
		var I = o.v;
		is_destroying_effect ? old_values.set(o, F) : old_values.set(o, I), o.v = F;
		var L = Batch.ensure();
		L.capture(o, I), o.f & 2 && (o.f & 2048 && execute_derived(o), set_signal_status(o, o.f & 512 ? CLEAN : MAYBE_DIRTY)), o.wv = increment_write_version(), mark_reactions(o, DIRTY), is_runes() && active_effect !== null && active_effect.f & 1024 && !(active_effect.f & 96) && (untracked_writes === null ? set_untracked_writes([o]) : untracked_writes.push(o)), !L.is_fork && eager_effects.size > 0 && !eager_effects_deferred && flush_eager_effects();
	}
	return F;
}
function flush_eager_effects() {
	eager_effects_deferred = !1;
	var o = is_updating_effect;
	set_is_updating_effect(!0);
	let F = Array.from(eager_effects);
	try {
		for (let o of F) o.f & 1024 && set_signal_status(o, MAYBE_DIRTY), is_dirty(o) && update_effect(o);
	} finally {
		set_is_updating_effect(o);
	}
	eager_effects.clear();
}
function increment(o) {
	set(o, o.v + 1);
}
function mark_reactions(o, F) {
	var I = o.reactions;
	if (I !== null) for (var L = is_runes(), R = I.length, z = 0; z < R; z++) {
		var B = I[z], V = B.f;
		if (!(!L && B === active_effect)) {
			var H = (V & DIRTY) === 0;
			if (H && set_signal_status(B, F), V & 2) {
				var U = B;
				batch_values?.delete(U), V & 32768 || (V & 512 && (B.f |= WAS_MARKED), mark_reactions(U, MAYBE_DIRTY));
			} else H && (V & 16 && eager_block_effects !== null && eager_block_effects.add(B), schedule_effect(B));
		}
	}
}
function proxy(o) {
	if (typeof o != "object" || !o || STATE_SYMBOL in o) return o;
	let L = get_prototype_of(o);
	if (L !== object_prototype && L !== array_prototype) return o;
	var R = /* @__PURE__ */ new Map(), z = is_array(o), B = /* @__PURE__ */ state(0), G = null, K = update_version, q = (o) => {
		if (update_version === K) return o();
		var F = active_reaction, I = update_version;
		set_active_reaction(null), set_update_version(K);
		var L = o();
		return set_active_reaction(F), set_update_version(I), L;
	};
	return z && R.set("length", /* @__PURE__ */ state(o.length, G)), new Proxy(o, {
		defineProperty(o, F, I) {
			(!("value" in I) || I.configurable === !1 || I.enumerable === !1 || I.writable === !1) && state_descriptors_fixed();
			var L = R.get(F);
			return L === void 0 ? L = q(() => {
				var o = /* @__PURE__ */ state(I.value, G);
				return R.set(F, o), o;
			}) : set(L, I.value, !0), !0;
		},
		deleteProperty(o, I) {
			var L = R.get(I);
			if (L === void 0) {
				if (I in o) {
					let o = q(() => /* @__PURE__ */ state(UNINITIALIZED, G));
					R.set(I, o), increment(B);
				}
			} else set(L, UNINITIALIZED), increment(B);
			return !0;
		},
		get(I, L, z) {
			if (L === STATE_SYMBOL) return o;
			var B = R.get(L), H = L in I;
			if (B === void 0 && (!H || get_descriptor(I, L)?.writable) && (B = q(() => /* @__PURE__ */ state(proxy(H ? I[L] : UNINITIALIZED), G)), R.set(L, B)), B !== void 0) {
				var U = get(B);
				return U === UNINITIALIZED ? void 0 : U;
			}
			return Reflect.get(I, L, z);
		},
		getOwnPropertyDescriptor(o, I) {
			var L = Reflect.getOwnPropertyDescriptor(o, I);
			if (L && "value" in L) {
				var z = R.get(I);
				z && (L.value = get(z));
			} else if (L === void 0) {
				var B = R.get(I), V = B?.v;
				if (B !== void 0 && V !== UNINITIALIZED) return {
					enumerable: !0,
					configurable: !0,
					value: V,
					writable: !0
				};
			}
			return L;
		},
		has(o, I) {
			if (I === STATE_SYMBOL) return !0;
			var L = R.get(I), z = L !== void 0 && L.v !== UNINITIALIZED || Reflect.has(o, I);
			return (L !== void 0 || active_effect !== null && (!z || get_descriptor(o, I)?.writable)) && (L === void 0 && (L = q(() => /* @__PURE__ */ state(z ? proxy(o[I]) : UNINITIALIZED, G)), R.set(I, L)), get(L) === UNINITIALIZED) ? !1 : z;
		},
		set(o, I, L, H) {
			var U = R.get(I), W = I in o;
			if (z && I === "length") for (var K = L; K < U.v; K += 1) {
				var J = R.get(K + "");
				J === void 0 ? K in o && (J = q(() => /* @__PURE__ */ state(UNINITIALIZED, G)), R.set(K + "", J)) : set(J, UNINITIALIZED);
			}
			if (U === void 0) (!W || get_descriptor(o, I)?.writable) && (U = q(() => /* @__PURE__ */ state(void 0, G)), set(U, proxy(L)), R.set(I, U));
			else {
				W = U.v !== UNINITIALIZED;
				var Y = q(() => proxy(L));
				set(U, Y);
			}
			var X = Reflect.getOwnPropertyDescriptor(o, I);
			if (X?.set && X.set.call(H, L), !W) {
				if (z && typeof I == "string") {
					var Z = R.get("length"), Q = Number(I);
					Number.isInteger(Q) && Q >= Z.v && set(Z, Q + 1);
				}
				increment(B);
			}
			return !0;
		},
		ownKeys(o) {
			get(B);
			var I = Reflect.ownKeys(o).filter((o) => {
				var I = R.get(o);
				return I === void 0 || I.v !== UNINITIALIZED;
			});
			for (var [L, z] of R) z.v !== UNINITIALIZED && !(L in o) && I.push(L);
			return I;
		},
		setPrototypeOf() {
			state_prototype_fixed();
		}
	});
}
var $window, is_firefox, first_child_getter, next_sibling_getter;
function init_operations() {
	if ($window === void 0) {
		$window = window, document, is_firefox = /Firefox/.test(navigator.userAgent);
		var o = Element.prototype, F = Node.prototype, I = Text.prototype;
		first_child_getter = get_descriptor(F, "firstChild").get, next_sibling_getter = get_descriptor(F, "nextSibling").get, is_extensible(o) && (o.__click = void 0, o.__className = void 0, o.__attributes = null, o.__style = void 0, o.__e = void 0), is_extensible(I) && (I.__t = void 0);
	}
}
function create_text(o = "") {
	return document.createTextNode(o);
}
/* @__NO_SIDE_EFFECTS__ */
function get_first_child(o) {
	return first_child_getter.call(o);
}
/* @__NO_SIDE_EFFECTS__ */
function get_next_sibling(o) {
	return next_sibling_getter.call(o);
}
function child(o, F) {
	if (!hydrating) return /* @__PURE__ */ get_first_child(o);
	var I = /* @__PURE__ */ get_first_child(hydrate_node);
	if (I === null) I = hydrate_node.appendChild(create_text());
	else if (F && I.nodeType !== 3) {
		var L = create_text();
		return I?.before(L), set_hydrate_node(L), L;
	}
	return set_hydrate_node(I), I;
}
function first_child(o, F = !1) {
	if (!hydrating) {
		var I = /* @__PURE__ */ get_first_child(o);
		return I instanceof Comment && I.data === "" ? /* @__PURE__ */ get_next_sibling(I) : I;
	}
	if (F && hydrate_node?.nodeType !== 3) {
		var L = create_text();
		return hydrate_node?.before(L), set_hydrate_node(L), L;
	}
	return hydrate_node;
}
function sibling(o, F = 1, I = !1) {
	let L = hydrating ? hydrate_node : o;
	for (var R; F--;) R = L, L = /* @__PURE__ */ get_next_sibling(L);
	if (!hydrating) return L;
	if (I && L?.nodeType !== 3) {
		var z = create_text();
		return L === null ? R?.after(z) : L.before(z), set_hydrate_node(z), z;
	}
	return set_hydrate_node(L), L;
}
function clear_text_content(o) {
	o.textContent = "";
}
function without_reactive_context(o) {
	var F = active_reaction, I = active_effect;
	set_active_reaction(null), set_active_effect(null);
	try {
		return o();
	} finally {
		set_active_reaction(F), set_active_effect(I);
	}
}
function push_effect(o, F) {
	var I = F.last;
	I === null ? F.last = F.first = o : (I.next = o, o.prev = I, F.last = o);
}
function create_effect(o, F, I) {
	var L = active_effect;
	L !== null && L.f & 8192 && (o |= INERT);
	var R = {
		ctx: component_context,
		deps: null,
		nodes: null,
		f: o | 2560,
		first: null,
		fn: F,
		last: null,
		next: null,
		parent: L,
		b: L && L.b,
		prev: null,
		teardown: null,
		wv: 0,
		ac: null
	};
	if (I) try {
		update_effect(R), R.f |= 32768;
	} catch (o) {
		throw destroy_effect(R), o;
	}
	else F !== null && schedule_effect(R);
	var z = R;
	if (I && z.deps === null && z.teardown === null && z.nodes === null && z.first === z.last && !(z.f & 524288) && (z = z.first, o & 16 && o & 65536 && z !== null && (z.f |= 65536)), z !== null && (z.parent = L, L !== null && push_effect(z, L), active_reaction !== null && active_reaction.f & 2 && !(o & 64))) {
		var B = active_reaction;
		(B.effects ??= []).push(z);
	}
	return R;
}
function effect_tracking() {
	return active_reaction !== null && !untracking;
}
function teardown(o) {
	let F = create_effect(8, null, !1);
	return set_signal_status(F, CLEAN), F.teardown = o, F;
}
function create_user_effect(o) {
	return create_effect(1048580, o, !1);
}
function effect_root(o) {
	Batch.ensure();
	let F = create_effect(64 | EFFECT_PRESERVED, o, !0);
	return () => {
		destroy_effect(F);
	};
}
function component_root(o) {
	Batch.ensure();
	let F = create_effect(64 | EFFECT_PRESERVED, o, !0);
	return (o = {}) => new Promise((I) => {
		o.outro ? pause_effect(F, () => {
			destroy_effect(F), I(void 0);
		}) : (destroy_effect(F), I(void 0));
	});
}
function async_effect(o) {
	return create_effect(4194304 | EFFECT_PRESERVED, o, !0);
}
function render_effect(o, F = 0) {
	return create_effect(8 | F, o, !0);
}
function template_effect(o, F = [], I = [], L = []) {
	flatten(L, F, I, (F) => {
		create_effect(8, () => o(...F.map(get)), !0);
	});
}
function block(o, F = 0) {
	return create_effect(16 | F, o, !0);
}
function branch(o) {
	return create_effect(32 | EFFECT_PRESERVED, o, !0);
}
function execute_effect_teardown(o) {
	var F = o.teardown;
	if (F !== null) {
		let o = is_destroying_effect, I = active_reaction;
		set_is_destroying_effect(!0), set_active_reaction(null);
		try {
			F.call(null);
		} finally {
			set_is_destroying_effect(o), set_active_reaction(I);
		}
	}
}
function destroy_effect_children(o, F = !1) {
	var I = o.first;
	for (o.first = o.last = null; I !== null;) {
		let o = I.ac;
		o !== null && without_reactive_context(() => {
			o.abort(STALE_REACTION);
		});
		var L = I.next;
		I.f & 64 ? I.parent = null : destroy_effect(I, F), I = L;
	}
}
function destroy_block_effect_children(o) {
	for (var F = o.first; F !== null;) {
		var I = F.next;
		F.f & 32 || destroy_effect(F), F = I;
	}
}
function destroy_effect(o, F = !0) {
	var I = !1;
	(F || o.f & 262144) && o.nodes !== null && o.nodes.end !== null && (remove_effect_dom(o.nodes.start, o.nodes.end), I = !0), destroy_effect_children(o, F && !I), remove_reactions(o, 0), set_signal_status(o, 16384);
	var L = o.nodes && o.nodes.t;
	if (L !== null) for (let o of L) o.stop();
	execute_effect_teardown(o);
	var R = o.parent;
	R !== null && R.first !== null && unlink_effect(o), o.next = o.prev = o.teardown = o.ctx = o.deps = o.fn = o.nodes = o.ac = null;
}
function remove_effect_dom(o, F) {
	for (; o !== null;) {
		var I = o === F ? null : /* @__PURE__ */ get_next_sibling(o);
		o.remove(), o = I;
	}
}
function unlink_effect(o) {
	var F = o.parent, I = o.prev, L = o.next;
	I !== null && (I.next = L), L !== null && (L.prev = I), F !== null && (F.first === o && (F.first = L), F.last === o && (F.last = I));
}
function pause_effect(o, F, I = !0) {
	var L = [];
	pause_children(o, L, !0);
	var R = () => {
		I && destroy_effect(o), F && F();
	}, z = L.length;
	if (z > 0) {
		var B = () => --z || R();
		for (var V of L) V.out(B);
	} else R();
}
function pause_children(o, F, I) {
	if (!(o.f & 8192)) {
		o.f ^= INERT;
		var L = o.nodes && o.nodes.t;
		if (L !== null) for (let o of L) (o.is_global || I) && F.push(o);
		for (var R = o.first; R !== null;) {
			var z = R.next, B = (R.f & 65536) != 0 || (R.f & 32) != 0 && (o.f & 16) != 0;
			pause_children(R, F, B ? I : !1), R = z;
		}
	}
}
function move_effect(o, F) {
	if (o.nodes) for (var I = o.nodes.start, L = o.nodes.end; I !== null;) {
		var R = I === L ? null : /* @__PURE__ */ get_next_sibling(I);
		F.append(I), I = R;
	}
}
let is_updating_effect = !1;
function set_is_updating_effect(o) {
	is_updating_effect = o;
}
let is_destroying_effect = !1;
function set_is_destroying_effect(o) {
	is_destroying_effect = o;
}
let active_reaction = null, untracking = !1;
function set_active_reaction(o) {
	active_reaction = o;
}
let active_effect = null;
function set_active_effect(o) {
	active_effect = o;
}
let current_sources = null;
function push_reaction_value(o) {
	active_reaction !== null && (current_sources === null ? current_sources = [o] : current_sources.push(o));
}
var new_deps = null, skipped_deps = 0;
let untracked_writes = null;
function set_untracked_writes(o) {
	untracked_writes = o;
}
let write_version = 1;
var read_version = 0;
let update_version = read_version;
function set_update_version(o) {
	update_version = o;
}
function increment_write_version() {
	return ++write_version;
}
function is_dirty(o) {
	var F = o.f;
	if (F & 2048) return !0;
	if (F & 2 && (o.f &= ~WAS_MARKED), F & 4096) {
		var I = o.deps;
		if (I !== null) for (var L = I.length, R = 0; R < L; R++) {
			var z = I[R];
			if (is_dirty(z) && update_derived(z), z.wv > o.wv) return !0;
		}
		F & 512 && batch_values === null && set_signal_status(o, CLEAN);
	}
	return !1;
}
function schedule_possible_effect_self_invalidation(o, F, I = !0) {
	var L = o.reactions;
	if (L !== null && !current_sources?.includes(o)) for (var R = 0; R < L.length; R++) {
		var z = L[R];
		z.f & 2 ? schedule_possible_effect_self_invalidation(z, F, !1) : F === z && (I ? set_signal_status(z, DIRTY) : z.f & 1024 && set_signal_status(z, MAYBE_DIRTY), schedule_effect(z));
	}
}
function update_reaction(o) {
	var F = new_deps, I = skipped_deps, L = untracked_writes, R = active_reaction, z = current_sources, B = component_context, V = untracking, H = update_version, U = o.f;
	new_deps = null, skipped_deps = 0, untracked_writes = null, active_reaction = U & 96 ? null : o, current_sources = null, set_component_context(o.ctx), untracking = !1, update_version = ++read_version, o.ac !== null && (without_reactive_context(() => {
		o.ac.abort(STALE_REACTION);
	}), o.ac = null);
	try {
		o.f |= REACTION_IS_UPDATING;
		var W = o.fn, G = W(), K = o.deps;
		if (new_deps !== null) {
			var q;
			if (remove_reactions(o, skipped_deps), K !== null && skipped_deps > 0) for (K.length = skipped_deps + new_deps.length, q = 0; q < new_deps.length; q++) K[skipped_deps + q] = new_deps[q];
			else o.deps = K = new_deps;
			if (effect_tracking() && o.f & 512) for (q = skipped_deps; q < K.length; q++) (K[q].reactions ??= []).push(o);
		} else K !== null && skipped_deps < K.length && (remove_reactions(o, skipped_deps), K.length = skipped_deps);
		if (is_runes() && untracked_writes !== null && !untracking && K !== null && !(o.f & 6146)) for (q = 0; q < untracked_writes.length; q++) schedule_possible_effect_self_invalidation(untracked_writes[q], o);
		return R !== null && R !== o && (read_version++, untracked_writes !== null && (L === null ? L = untracked_writes : L.push(...untracked_writes))), o.f & 8388608 && (o.f ^= ERROR_VALUE), G;
	} catch (o) {
		return handle_error(o);
	} finally {
		o.f ^= REACTION_IS_UPDATING, new_deps = F, skipped_deps = I, untracked_writes = L, active_reaction = R, current_sources = z, set_component_context(B), untracking = V, update_version = H;
	}
}
function remove_reaction(o, F) {
	let I = F.reactions;
	if (I !== null) {
		var R = index_of.call(I, o);
		if (R !== -1) {
			var z = I.length - 1;
			z === 0 ? I = F.reactions = null : (I[R] = I[z], I.pop());
		}
	}
	I === null && F.f & 2 && (new_deps === null || !new_deps.includes(F)) && (set_signal_status(F, MAYBE_DIRTY), F.f & 512 && (F.f ^= 512, F.f &= ~WAS_MARKED), destroy_derived_effects(F), remove_reactions(F, 0));
}
function remove_reactions(o, F) {
	var I = o.deps;
	if (I !== null) for (var L = F; L < I.length; L++) remove_reaction(o, I[L]);
}
function update_effect(o) {
	var F = o.f;
	if (!(F & 16384)) {
		set_signal_status(o, CLEAN);
		var I = active_effect, L = is_updating_effect;
		active_effect = o, is_updating_effect = !0;
		try {
			F & 16777232 ? destroy_block_effect_children(o) : destroy_effect_children(o), execute_effect_teardown(o);
			var R = update_reaction(o);
			o.teardown = typeof R == "function" ? R : null, o.wv = write_version;
		} finally {
			is_updating_effect = L, active_effect = I;
		}
	}
}
function get(o) {
	var F = (o.f & 2) != 0;
	if (null?.add(o), active_reaction !== null && !untracking && !(active_effect !== null && active_effect.f & 16384) && !current_sources?.includes(o)) {
		var I = active_reaction.deps;
		if (active_reaction.f & 2097152) o.rv < read_version && (o.rv = read_version, new_deps === null && I !== null && I[skipped_deps] === o ? skipped_deps++ : new_deps === null ? new_deps = [o] : new_deps.includes(o) || new_deps.push(o));
		else {
			(active_reaction.deps ??= []).push(o);
			var L = o.reactions;
			L === null ? o.reactions = [active_reaction] : L.includes(active_reaction) || L.push(active_reaction);
		}
	}
	if (is_destroying_effect) {
		if (old_values.has(o)) return old_values.get(o);
		if (F) {
			var R = o, z = R.v;
			return (!(R.f & 1024) && R.reactions !== null || depends_on_old_values(R)) && (z = execute_derived(R)), old_values.set(R, z), z;
		}
	} else F && (!batch_values?.has(o) || current_batch?.is_fork && !effect_tracking()) && (R = o, is_dirty(R) && update_derived(R), is_updating_effect && effect_tracking() && !(R.f & 512) && reconnect(R));
	if (batch_values?.has(o)) return batch_values.get(o);
	if (o.f & 8388608) throw o.v;
	return o.v;
}
function reconnect(o) {
	if (o.deps !== null) {
		o.f ^= 512;
		for (let F of o.deps) (F.reactions ??= []).push(o), F.f & 2 && !(F.f & 512) && reconnect(F);
	}
}
function depends_on_old_values(o) {
	if (o.v === UNINITIALIZED) return !0;
	if (o.deps === null) return !1;
	for (let F of o.deps) if (old_values.has(F) || F.f & 2 && depends_on_old_values(F)) return !0;
	return !1;
}
function untrack(o) {
	var F = untracking;
	try {
		return untracking = !0, o();
	} finally {
		untracking = F;
	}
}
var STATUS_MASK = ~(MAYBE_DIRTY | 3072);
function set_signal_status(o, F) {
	o.f = o.f & STATUS_MASK | F;
}
const all_registered_events = /* @__PURE__ */ new Set(), root_event_handles = /* @__PURE__ */ new Set();
var last_propagated_event = null;
function handle_event_propagation(o) {
	var F = this, I = F.ownerDocument, L = o.type, R = o.composedPath?.() || [], z = R[0] || o.target;
	last_propagated_event = o;
	var V = 0, H = last_propagated_event === o && o.__root;
	if (H) {
		var U = R.indexOf(H);
		if (U !== -1 && (F === document || F === window)) {
			o.__root = F;
			return;
		}
		var W = R.indexOf(F);
		if (W === -1) return;
		U <= W && (V = U);
	}
	if (z = R[V] || o.target, z !== F) {
		define_property(o, "currentTarget", {
			configurable: !0,
			get() {
				return z || I;
			}
		});
		var G = active_reaction, K = active_effect;
		set_active_reaction(null), set_active_effect(null);
		try {
			for (var q, J = []; z !== null;) {
				var Y = z.assignedSlot || z.parentNode || z.host || null;
				try {
					var X = z["__" + L];
					X != null && (!z.disabled || o.target === z) && X.call(z, o);
				} catch (o) {
					q ? J.push(o) : q = o;
				}
				if (o.cancelBubble || Y === F || Y === null) break;
				z = Y;
			}
			if (q) {
				for (let o of J) queueMicrotask(() => {
					throw o;
				});
				throw q;
			}
		} finally {
			o.__root = F, delete o.currentTarget, set_active_reaction(G), set_active_effect(K);
		}
	}
}
function create_fragment_from_html(o) {
	var F = document.createElement("template");
	return F.innerHTML = o.replaceAll("<!>", "<!---->"), F.content;
}
function assign_nodes(o, F) {
	var I = active_effect;
	I.nodes === null && (I.nodes = {
		start: o,
		end: F,
		a: null,
		t: null
	});
}
/* @__NO_SIDE_EFFECTS__ */
function from_html(o, F) {
	var I = (F & 1) != 0, L = (F & 2) != 0, R, z = !o.startsWith("<!>");
	return () => {
		if (hydrating) return assign_nodes(hydrate_node, null), hydrate_node;
		R === void 0 && (R = create_fragment_from_html(z ? o : "<!>" + o), I || (R = /* @__PURE__ */ get_first_child(R)));
		var F = L || is_firefox ? document.importNode(R, !0) : R.cloneNode(!0);
		if (I) {
			var B = /* @__PURE__ */ get_first_child(F), V = F.lastChild;
			assign_nodes(B, V);
		} else assign_nodes(F, F);
		return F;
	};
}
function append(o, F) {
	if (hydrating) {
		var I = active_effect;
		(!(I.f & 32768) || I.nodes.end === null) && (I.nodes.end = hydrate_node), hydrate_next();
		return;
	}
	o !== null && o.before(F);
}
[.../* @__PURE__ */ "allowfullscreen.async.autofocus.autoplay.checked.controls.default.disabled.formnovalidate.indeterminate.inert.ismap.loop.multiple.muted.nomodule.novalidate.open.playsinline.readonly.required.reversed.seamless.selected.webkitdirectory.defer.disablepictureinpicture.disableremoteplayback".split(".")];
var PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(o) {
	return PASSIVE_EVENTS.includes(o);
}
function set_text(o, F) {
	var I = F == null ? "" : typeof F == "object" ? F + "" : F;
	I !== (o.__t ??= o.nodeValue) && (o.__t = I, o.nodeValue = I + "");
}
function mount(o, F) {
	return _mount(o, F);
}
function hydrate(F, I) {
	init_operations(), I.intro = I.intro ?? !1;
	let L = I.target, R = hydrating, z = hydrate_node;
	try {
		for (var B = /* @__PURE__ */ get_first_child(L); B && (B.nodeType !== 8 || B.data !== "[");) B = /* @__PURE__ */ get_next_sibling(B);
		if (!B) throw HYDRATION_ERROR;
		set_hydrating(!0), set_hydrate_node(B);
		let R = _mount(F, {
			...I,
			anchor: B
		});
		return set_hydrating(!1), R;
	} catch (R) {
		if (R instanceof Error && R.message.split("\n").some((o) => o.startsWith("https://svelte.dev/e/"))) throw R;
		return R !== HYDRATION_ERROR && console.warn("Failed to hydrate: ", R), I.recover === !1 && hydration_failed(), init_operations(), clear_text_content(L), set_hydrating(!1), mount(F, I);
	} finally {
		set_hydrating(R), set_hydrate_node(z);
	}
}
var document_listeners = /* @__PURE__ */ new Map();
function _mount(F, { target: I, anchor: L, props: z = {}, events: B, context: V, intro: H = !0 }) {
	init_operations();
	var U = /* @__PURE__ */ new Set(), W = (o) => {
		for (var F = 0; F < o.length; F++) {
			var L = o[F];
			if (!U.has(L)) {
				U.add(L);
				var R = is_passive_event(L);
				I.addEventListener(L, handle_event_propagation, { passive: R });
				var z = document_listeners.get(L);
				z === void 0 ? (document.addEventListener(L, handle_event_propagation, { passive: R }), document_listeners.set(L, 1)) : document_listeners.set(L, z + 1);
			}
		}
	};
	W(array_from(all_registered_events)), root_event_handles.add(W);
	var G = void 0, K = component_root(() => {
		var R = L ?? I.appendChild(create_text());
		return boundary(R, { pending: () => {} }, (I) => {
			if (V) {
				push({});
				var L = component_context;
				L.c = V;
			}
			if (B && (z.$$events = B), hydrating && assign_nodes(I, null), G = F(I, z) || {}, hydrating && (active_effect.nodes.end = hydrate_node, hydrate_node === null || hydrate_node.nodeType !== 8 || hydrate_node.data !== "]")) throw hydration_mismatch(), HYDRATION_ERROR;
			V && pop();
		}), () => {
			for (var o of U) {
				I.removeEventListener(o, handle_event_propagation);
				var F = document_listeners.get(o);
				--F === 0 ? (document.removeEventListener(o, handle_event_propagation), document_listeners.delete(o)) : document_listeners.set(o, F);
			}
			root_event_handles.delete(W), R !== L && R.parentNode?.removeChild(R);
		};
	});
	return mounted_components.set(G, K), G;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(o, F) {
	let I = mounted_components.get(o);
	return I ? (mounted_components.delete(o), I(F)) : Promise.resolve();
}
function html(F, I, L = !1, R = !1, z = !1) {
	var B = F, V = "";
	template_effect(() => {
		var F = active_effect;
		if (V === (V = I() ?? "")) {
			hydrating && hydrate_next();
			return;
		}
		if (F.nodes !== null && (remove_effect_dom(F.nodes.start, F.nodes.end), F.nodes = null), V !== "") {
			if (hydrating) {
				for (var z = hydrate_node.data, H = hydrate_next(), U = H; H !== null && (H.nodeType !== 8 || H.data !== "");) U = H, H = /* @__PURE__ */ get_next_sibling(H);
				if (H === null) throw hydration_mismatch(), HYDRATION_ERROR;
				assign_nodes(hydrate_node, U), B = set_hydrate_node(H);
				return;
			}
			var W = V + "";
			L ? W = `<svg>${W}</svg>` : R && (W = `<math>${W}</math>`);
			var G = create_fragment_from_html(W);
			if ((L || R) && (G = /* @__PURE__ */ get_first_child(G)), assign_nodes(/* @__PURE__ */ get_first_child(G), G.lastChild), L || R) for (; /* @__PURE__ */ get_first_child(G);) B.before(/* @__PURE__ */ get_first_child(G));
			else B.before(G);
		}
	});
}
var is_store_binding = !1;
function capture_store_binding(o) {
	var F = is_store_binding;
	try {
		return is_store_binding = !1, [o(), is_store_binding];
	} finally {
		is_store_binding = F;
	}
}
function prop(o, F, I, L) {
	var R = !0, z = (I & 8) != 0, B = (I & 16) != 0, H = L, U = !0, W = () => (U && (U = !1, H = B ? untrack(L) : L), H), G;
	if (z) {
		var K = STATE_SYMBOL in o || LEGACY_PROPS in o;
		G = get_descriptor(o, F)?.set ?? (K && F in o ? (I) => o[F] = I : void 0);
	}
	var q, J = !1;
	z ? [q, J] = capture_store_binding(() => o[F]) : q = o[F], q === void 0 && L !== void 0 && (q = W(), G && (R && props_invalid_value(F), G(q)));
	var Y = R ? () => {
		var I = o[F];
		return I === void 0 ? W() : (U = !0, I);
	} : () => {
		var I = o[F];
		return I !== void 0 && (H = void 0), I === void 0 ? H : I;
	};
	if (R && !(I & 4)) return Y;
	if (G) {
		var X = o.$$legacy;
		return (function(o, F) {
			return arguments.length > 0 ? ((!R || !F || X || J) && G(F ? Y() : o), o) : Y();
		});
	}
	var Z = !1, Q = (I & 1 ? derived : derived_safe_equal)(() => (Z = !1, Y()));
	z && get(Q);
	var $ = active_effect;
	return (function(o, F) {
		if (arguments.length > 0) {
			let I = F ? get(Q) : R && z ? proxy(o) : o;
			return set(Q, I), Z = !0, H !== void 0 && (H = I), o;
		}
		return is_destroying_effect && Z || $.f & 16384 ? Q.v : get(Q);
	});
}
function createClassComponent(o) {
	return new Svelte4Component(o);
}
var Svelte4Component = class {
	#e;
	#t;
	constructor(o) {
		var F = /* @__PURE__ */ new Map(), I = (o, I) => {
			var L = /* @__PURE__ */ mutable_source(I, !1, !1);
			return F.set(o, L), L;
		};
		let L = new Proxy({
			...o.props || {},
			$$events: {}
		}, {
			get(o, L) {
				return get(F.get(L) ?? I(L, Reflect.get(o, L)));
			},
			has(o, L) {
				return L === LEGACY_PROPS ? !0 : (get(F.get(L) ?? I(L, Reflect.get(o, L))), Reflect.has(o, L));
			},
			set(o, L, R) {
				return set(F.get(L) ?? I(L, R), R), Reflect.set(o, L, R);
			}
		});
		this.#t = (o.hydrate ? hydrate : mount)(o.component, {
			target: o.target,
			anchor: o.anchor,
			props: L,
			context: o.context,
			intro: o.intro ?? !1,
			recover: o.recover
		}), (!o?.props?.$$host || o.sync === !1) && flushSync(), this.#e = L.$$events;
		for (let o of Object.keys(this.#t)) o === "$set" || o === "$destroy" || o === "$on" || define_property(this, o, {
			get() {
				return this.#t[o];
			},
			set(F) {
				this.#t[o] = F;
			},
			enumerable: !0
		});
		this.#t.$set = (o) => {
			Object.assign(L, o);
		}, this.#t.$destroy = () => {
			unmount(this.#t);
		};
	}
	$set(o) {
		this.#t.$set(o);
	}
	$on(o, F) {
		this.#e[o] = this.#e[o] || [];
		let I = (...o) => F.call(this, ...o);
		return this.#e[o].push(I), () => {
			this.#e[o] = this.#e[o].filter((o) => o !== I);
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
	constructor(o, F, I) {
		super(), this.$$ctor = o, this.$$s = F, I && this.attachShadow({ mode: "open" });
	}
	addEventListener(o, F, I) {
		if (this.$$l[o] = this.$$l[o] || [], this.$$l[o].push(F), this.$$c) {
			let I = this.$$c.$on(o, F);
			this.$$l_u.set(F, I);
		}
		super.addEventListener(o, F, I);
	}
	removeEventListener(o, F, I) {
		if (super.removeEventListener(o, F, I), this.$$c) {
			let o = this.$$l_u.get(F);
			o && (o(), this.$$l_u.delete(F));
		}
	}
	async connectedCallback() {
		if (this.$$cn = !0, !this.$$c) {
			if (await Promise.resolve(), !this.$$cn || this.$$c) return;
			function o(o) {
				return (F) => {
					let I = document.createElement("slot");
					o !== "default" && (I.name = o), append(F, I);
				};
			}
			let F = {}, I = get_custom_elements_slots(this);
			for (let L of this.$$s) L in I && (L === "default" && !this.$$d.children ? (this.$$d.children = o(L), F.default = !0) : F[L] = o(L));
			for (let o of this.attributes) {
				let F = this.$$g_p(o.name);
				F in this.$$d || (this.$$d[F] = get_custom_element_value(F, o.value, this.$$p_d, "toProp"));
			}
			for (let o in this.$$p_d) !(o in this.$$d) && this[o] !== void 0 && (this.$$d[o] = this[o], delete this[o]);
			for (let o in this.$$c = createClassComponent({
				component: this.$$ctor,
				target: this.shadowRoot || this,
				props: {
					...this.$$d,
					$$slots: F,
					$$host: this
				}
			}), this.$$me = effect_root(() => {
				render_effect(() => {
					this.$$r = !0;
					for (let o of object_keys(this.$$c)) {
						if (!this.$$p_d[o]?.reflect) continue;
						this.$$d[o] = this.$$c[o];
						let F = get_custom_element_value(o, this.$$d[o], this.$$p_d, "toAttribute");
						F == null ? this.removeAttribute(this.$$p_d[o].attribute || o) : this.setAttribute(this.$$p_d[o].attribute || o, F);
					}
					this.$$r = !1;
				});
			}), this.$$l) for (let F of this.$$l[o]) {
				let I = this.$$c.$on(o, F);
				this.$$l_u.set(F, I);
			}
			this.$$l = {};
		}
	}
	attributeChangedCallback(o, F, I) {
		this.$$r || (o = this.$$g_p(o), this.$$d[o] = get_custom_element_value(o, I, this.$$p_d, "toProp"), this.$$c?.$set({ [o]: this.$$d[o] }));
	}
	disconnectedCallback() {
		this.$$cn = !1, Promise.resolve().then(() => {
			!this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
		});
	}
	$$g_p(o) {
		return object_keys(this.$$p_d).find((F) => this.$$p_d[F].attribute === o || !this.$$p_d[F].attribute && F.toLowerCase() === o) || o;
	}
});
function get_custom_element_value(o, F, I, L) {
	let R = I[o]?.type;
	if (F = R === "Boolean" && typeof F != "boolean" ? F != null : F, !L || !I[o]) return F;
	if (L === "toAttribute") switch (R) {
		case "Object":
		case "Array": return F == null ? null : JSON.stringify(F);
		case "Boolean": return F ? "" : null;
		case "Number": return F ?? null;
		default: return F;
	}
	else switch (R) {
		case "Object":
		case "Array": return F && JSON.parse(F);
		case "Boolean": return F;
		case "Number": return F == null ? F : +F;
		default: return F;
	}
}
function get_custom_elements_slots(o) {
	let F = {};
	return o.childNodes.forEach((o) => {
		F[o.slot || "default"] = !0;
	}), F;
}
function create_custom_element(o, F, I, L, R, H) {
	let U = class extends SvelteElement {
		constructor() {
			super(o, I, R), this.$$p_d = F;
		}
		static get observedAttributes() {
			return object_keys(F).map((o) => (F[o].attribute || o).toLowerCase());
		}
	};
	return object_keys(F).forEach((o) => {
		define_property(U.prototype, o, {
			get() {
				return this.$$c && o in this.$$c ? this.$$c[o] : this.$$d[o];
			},
			set(I) {
				I = get_custom_element_value(o, I, F), this.$$d[o] = I;
				var L = this.$$c;
				L && (get_descriptor(L, o)?.get ? L[o] = I : L.$set({ [o]: I }));
			}
		});
	}), L.forEach((o) => {
		define_property(U.prototype, o, { get() {
			return this.$$c?.[o];
		} });
	}), H && (U = H(U)), o.element = U, U;
}
var layout_default = "h2{color:green}", root = /* @__PURE__ */ from_html("<h1> </h1> <h2>Shared Style Test</h2> <!>", 1);
function Hello(o, F) {
	push(F, !0);
	let I = prop(F, "name", 7, "World");
	var L = {
		get name() {
			return I();
		},
		set name(o = "World") {
			I(o), flushSync();
		}
	}, R = root(), z = first_child(R), B = child(z);
	return reset(z), html(sibling(z, 4), () => `<style>${layout_default}</style>`), template_effect(() => set_text(B, `Hello ${I() ?? ""}!`)), append(o, R), pop(L);
}
customElements.define("hello-test", create_custom_element(Hello, { name: {} }, [], [], !0));
