/****************************************************************************
 * Copyright 2017 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***************************************************************************/

var Set = require('../../util/set');

var Action = require('../action');
var Struct = require('../../chem/struct');

var LassoHelper = require('./helper/lasso');

var SGroup = require('./sgroup');
var Atom = require('./atom');

function SelectTool(editor, mode) {
	if (!(this instanceof SelectTool))
		return new SelectTool(editor, mode);

	this.editor = editor;

	this.lassoHelper = new LassoHelper(mode === 'lasso' ? 0 : 1, editor, mode === 'fragment');
}

SelectTool.prototype.mousedown = function (event) { // eslint-disable-line max-statements
	var rnd = this.editor.render;
	var ctab = rnd.ctab;
	var struct = ctab.molecule;
	this.editor.hover(null); // TODO review hovering for touch devicess
	var selectFragment = (this.lassoHelper.fragment || event.ctrlKey);
	var ci = this.editor.findItem(
		event,
		selectFragment ?
			['frags', 'sgroups', 'sgroupData', 'rgroups', 'rxnArrows', 'rxnPluses', 'chiralFlags'] :
			['atoms', 'bonds', 'sgroups', 'sgroupData', 'rgroups', 'rxnArrows', 'rxnPluses', 'chiralFlags']
	);
	this.dragCtx = {
		item: ci,
		xy0: rnd.page2obj(event)
	};
	if (!ci) { //  ci.type == 'Canvas'
		Atom.atomLongtapEvent(this, rnd);
		delete this.dragCtx.item;

		if (!this.lassoHelper.fragment)
			this.lassoHelper.begin(event);
	} else {
		this.editor.hover(null);
		if (!isSelected(rnd, this.editor.selection(), ci)) {
			var sel = closestToSel(ci);
			if (ci.map === 'frags') {
				var frag = ctab.frags.get(ci.id);
				sel = {
					atoms: frag.fragGetAtoms(rnd, ci.id),
					bonds: frag.fragGetBonds(rnd, ci.id)
				};
			} else if (ci.map === 'sgroups') {
				var sgroup = ctab.sgroups.get(ci.id).item;
				sel = {
					atoms: Struct.SGroup.getAtoms(struct, sgroup),
					bonds: Struct.SGroup.getBonds(struct, sgroup)
				};
			} else if (ci.map === 'rgroups') {
				var rgroup = ctab.rgroups.get(ci.id);
				sel = {
					atoms: rgroup.getAtoms(rnd),
					bonds: rgroup.getBonds(rnd)
				};
			}
			this.editor.selection(!event.shiftKey ? sel :
			                         selMerge(sel, this.editor.selection()));
		}
		if (ci.map === 'atoms')
			// this event has to be stopped in others events by `tool.dragCtx.stopTapping()`
			Atom.atomLongtapEvent(this, rnd);
	}
	return true;
};

SelectTool.prototype.mousemove = function (event) {
	var rnd = this.editor.render;
	if (this.dragCtx && this.dragCtx.stopTapping)
		this.dragCtx.stopTapping();

	if (this.dragCtx && this.dragCtx.item) {
		// moving selected objects
		if (this.dragCtx.action) {
			this.dragCtx.action.perform(rnd.ctab);
			this.editor.update(this.dragCtx.action, true); // redraw the elements in unshifted position, lest the have different offset
		}
		this.dragCtx.action = Action.fromMultipleMove(
			rnd.ctab,
			this.editor.explicitSelected(),
			rnd.page2obj(event).sub(this.dragCtx.xy0));
		// finding & highlighting object to stick to
		if (['atoms'/* , 'bonds'*/].indexOf(this.dragCtx.item.map) >= 0) {
			// TODO add bond-to-bond fusing
			var ci = this.editor.findItem(event, [this.dragCtx.item.map], this.dragCtx.item);
			this.editor.hover((ci && ci.map == this.dragCtx.item.map) ? ci : null);
		}
		this.editor.update(this.dragCtx.action, true);
	} else if (this.lassoHelper.running()) {
		var sel = this.lassoHelper.addPoint(event);
		this.editor.selection(!event.shiftKey ? sel :
		                         selMerge(sel, this.editor.selection()));
	} else {
		this.editor.hover(
		this.editor.findItem(event,
			(this.lassoHelper.fragment || event.ctrlKey) ?
				['frags', 'sgroups', 'sgroupData', 'rgroups', 'rxnArrows', 'rxnPluses', 'chiralFlags'] :
				['atoms', 'bonds', 'sgroups', 'sgroupData', 'rgroups', 'rxnArrows', 'rxnPluses', 'chiralFlags']
		)
		);
	}
	return true;
};
SelectTool.prototype.mouseup = function (event) { // eslint-disable-line max-statements
	if (this.dragCtx && this.dragCtx.stopTapping)
		this.dragCtx.stopTapping();

	if (this.dragCtx && this.dragCtx.item) {
		if (['atoms'/* , 'bonds'*/].indexOf(this.dragCtx.item.map) >= 0) {
			// TODO add bond-to-bond fusing
			var ci = this.editor.findItem(event, [this.dragCtx.item.map], this.dragCtx.item);
			if (ci && ci.map == this.dragCtx.item.map) {
				var restruct = this.editor.render.ctab;
				this.editor.hover(null);
				this.editor.selection(null);
				this.dragCtx.action = this.dragCtx.action ?
					Action.fromAtomMerge(restruct, this.dragCtx.item.id, ci.id).mergeWith(this.dragCtx.action) :
					Action.fromAtomMerge(restruct, this.dragCtx.item.id, ci.id);
			}
		}
		if (this.dragCtx.action)
			this.editor.update(this.dragCtx.action);
		delete this.dragCtx;
	} else if (this.lassoHelper.running()) { // TODO it catches more events than needed, to be re-factored
		var sel = this.lassoHelper.end();
		this.editor.selection(!event.shiftKey ? sel :
		                         selMerge(sel, this.editor.selection()));
	} else if (this.lassoHelper.fragment) {
		this.editor.selection(null);
	}
	return true;
};

SelectTool.prototype.dblclick = function (event) { // eslint-disable-line max-statements
	var editor = this.editor;
	var rnd = this.editor.render;
	var ci = this.editor.findItem(event, ['atoms', 'bonds', 'sgroups']);
	if (!ci) return;

	var struct = rnd.ctab.molecule;
	if (ci.map === 'atoms') {
		this.editor.selection(closestToSel(ci));
		var atom = struct.atoms.get(ci.id);
		var ra = editor.event.elementEdit.dispatch(atom);
		Promise.resolve(ra).then(function (newatom) {
			// TODO: deep compare to not produce dummy, e.g.
			// atom.label != attrs.label || !atom.atomList.equals(attrs.atomList)
			editor.update(Action.fromAtomsAttrs(rnd.ctab, ci.id, newatom));
		});
	} else if (ci.map === 'bonds') {
		this.editor.selection(closestToSel(ci));
		var bond = rnd.ctab.bonds.get(ci.id).b;
		var rb = editor.event.bondEdit.dispatch(bond);
		Promise.resolve(rb).then(function (newbond) {
			editor.update(Action.fromBondAttrs(rnd.ctab, ci.id, newbond));
		});
	} else if (ci.map === 'sgroups') {
		this.editor.selection(closestToSel(ci));
		SGroup.dialog(this.editor, ci.id);
//    } else if (ci.map == 'sgroupData') {
//        SGroup.dialog(this.editor, ci.sgid);
	}
	return true;
};

SelectTool.prototype.cancel = SelectTool.prototype.mouseleave = function () {
	if (this.dragCtx && this.dragCtx.stopTapping)
		this.dragCtx.stopTapping();

	if (this.dragCtx && this.dragCtx.action) {
		var action = this.dragCtx.action;
		this.editor.update(action);
	}
	if (this.lassoHelper.running())
		this.editor.selection(this.lassoHelper.end());

	delete this.dragCtx;

	this.editor.hover(null);
};

function closestToSel(ci) {
	var res = {};
	res[ci.map] = [ci.id];
	return res;
}

// TODO: deep-merge?
function selMerge(selection, add) {
	if (add) {
		for (var item in add) {
			if (add.hasOwnProperty(item)) {
				if (!selection[item]) {
					selection[item] = add[item].slice();
				} else {
					selection[item] = uniqArray(selection[item],
						add[item]);
				}
			}
		}
	}
	return selection;
}

function uniqArray(dest, add) {
	for (var i = 0; i < add.length; i++) {
		if (dest.indexOf(add[i]) < 0)
			dest.push(add[i]);
	}
	return dest;
}

function isSelected(render, selection, item) {
	if (!selection)
		return false;
	var ctab = render.ctab;
	if (item.map === 'frags' || item.map === 'rgroups') {
		var atoms = item.map === 'frags' ?
			ctab.frags.get(item.id).fragGetAtoms(render, item.id) :
		    ctab.rgroups.get(item.id).getAtoms(render);

		return !!selection['atoms'] &&
			Set.subset(Set.fromList(atoms), Set.fromList(selection['atoms']));
	}

	return !!selection[item.map] &&
		selection[item.map].indexOf(item.id) > -1;
}

module.exports = SelectTool;
