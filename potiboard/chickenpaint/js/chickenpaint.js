(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ChickenPaint = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /*
                                                                                                                                                                                                                                                                                  ChickenPaint
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  ChickenPaint is a translation of ChibiPaint from Java to JavaScript
                                                                                                                                                                                                                                                                                  by Nicholas Sherlock / Chicken Smoothie.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  ChickenPaint is free software: you can redistribute it and/or modify
                                                                                                                                                                                                                                                                                  it under the terms of the GNU General Public License as published by
                                                                                                                                                                                                                                                                                  the Free Software Foundation, either version 3 of the License, or
                                                                                                                                                                                                                                                                                  (at your option) any later version.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  ChickenPaint is distributed in the hope that it will be useful,
                                                                                                                                                                                                                                                                                  but WITHOUT ANY WARRANTY; without even the implied warranty of
                                                                                                                                                                                                                                                                                  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                                                                                                                                                                                                                                                                                  GNU General Public License for more details.
                                                                                                                                                                                                                                                                              
                                                                                                                                                                                                                                                                                  You should have received a copy of the GNU General Public License
                                                                                                                                                                                                                                                                                  along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
                                                                                                                                                                                                                                                                              */

exports.default = ChickenPaint;

var _CPBrushInfo = require("./engine/CPBrushInfo");

var _CPBrushInfo2 = _interopRequireDefault(_CPBrushInfo);

var _CPArtwork = require("./engine/CPArtwork");

var _CPArtwork2 = _interopRequireDefault(_CPArtwork);

var _CPResourceLoader = require("./engine/CPResourceLoader");

var _CPResourceLoader2 = _interopRequireDefault(_CPResourceLoader);

var _CPResourceSaver = require("./engine/CPResourceSaver");

var _CPResourceSaver2 = _interopRequireDefault(_CPResourceSaver);

var _CPSplashScreen = require("./gui/CPSplashScreen.js");

var _CPSplashScreen2 = _interopRequireDefault(_CPSplashScreen);

var _CPMainGUI = require("./gui/CPMainGUI");

var _CPMainGUI2 = _interopRequireDefault(_CPMainGUI);

var _CPAboutDialog = require("./gui/CPAboutDialog");

var _CPAboutDialog2 = _interopRequireDefault(_CPAboutDialog);

var _CPConfirmTransformDialog = require("./gui/CPConfirmTransformDialog");

var _CPConfirmTransformDialog2 = _interopRequireDefault(_CPConfirmTransformDialog);

var _CPShortcutsDialog = require("./gui/CPShortcutsDialog");

var _CPShortcutsDialog2 = _interopRequireDefault(_CPShortcutsDialog);

var _CPBoxBlurDialog = require("./gui/CPBoxBlurDialog");

var _CPBoxBlurDialog2 = _interopRequireDefault(_CPBoxBlurDialog);

var _CPTabletDialog = require("./gui/CPTabletDialog");

var _CPTabletDialog2 = _interopRequireDefault(_CPTabletDialog);

var _CPGridDialog = require("./gui/CPGridDialog");

var _CPGridDialog2 = _interopRequireDefault(_CPGridDialog);

var _CPSendDialog = require("./gui/CPSendDialog");

var _CPSendDialog2 = _interopRequireDefault(_CPSendDialog);

var _CPPolyfill = require("./util/CPPolyfill");

var _CPColor = require("./util/CPColor");

var _CPColor2 = _interopRequireDefault(_CPColor);

var _CPWacomTablet = require("./util/CPWacomTablet");

var _CPWacomTablet2 = _interopRequireDefault(_CPWacomTablet);

var _CPRect = require("./util/CPRect");

var _CPRect2 = _interopRequireDefault(_CPRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBrowserSupported() {
    return (0, _CPPolyfill.isCanvasSupported)() && "Uint8Array" in window;
}

function createDrawingTools() {
    var tools = new Array(ChickenPaint.T_MAX);

    tools[ChickenPaint.T_PENCIL] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_PENCIL,
        size: 16,
        alpha: 255,
        isAA: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AA,
        paintMode: _CPBrushInfo2.default.M_PAINT
    });

    tools[ChickenPaint.T_ERASER] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_ERASER,
        size: 16,
        alpha: 255,
        isAA: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: false,
        type: _CPBrushInfo2.default.B_ROUND_AA,
        paintMode: _CPBrushInfo2.default.M_ERASE
    });

    tools[ChickenPaint.T_PEN] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_PEN,
        size: 2,
        alpha: 128,
        isAA: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: true,
        pressureAlpha: false,
        type: _CPBrushInfo2.default.B_ROUND_AA,
        paintMode: _CPBrushInfo2.default.M_PAINT
    });

    tools[ChickenPaint.T_SOFTERASER] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_SOFTERASER,
        size: 16,
        alpha: 64,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AIRBRUSH,
        paintMode: _CPBrushInfo2.default.M_ERASE
    });

    tools[ChickenPaint.T_AIRBRUSH] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_AIRBRUSH,
        size: 50,
        alpha: 32,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AIRBRUSH,
        paintMode: _CPBrushInfo2.default.M_PAINT
    });

    tools[ChickenPaint.T_DODGE] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_DODGE,
        size: 30,
        alpha: 32,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AIRBRUSH,
        paintMode: _CPBrushInfo2.default.M_DODGE
    });

    tools[ChickenPaint.T_BURN] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_BURN,
        size: 30,
        alpha: 32,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AIRBRUSH,
        paintMode: _CPBrushInfo2.default.M_BURN
    });

    tools[ChickenPaint.T_WATER] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_WATER,
        size: 30,
        alpha: 70,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.02,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AA,
        paintMode: _CPBrushInfo2.default.M_WATER,
        resat: 0.3,
        bleed: 0.6
    });

    tools[ChickenPaint.T_BLUR] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_BLUR,
        size: 20,
        alpha: 255,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.05,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_PIXEL,
        paintMode: _CPBrushInfo2.default.M_BLUR
    });

    tools[ChickenPaint.T_SMUDGE] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_SMUDGE,
        size: 20,
        alpha: 128,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.01,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AIRBRUSH,
        paintMode: _CPBrushInfo2.default.M_SMUDGE,
        resat: 0.0,
        bleed: 1.0
    });

    tools[ChickenPaint.T_BLENDER] = new _CPBrushInfo2.default({
        toolNb: ChickenPaint.T_BLENDER,
        size: 20,
        alpha: 60,
        isAA: false,
        isAirbrush: true,
        minSpacing: 0.5,
        spacing: 0.1,
        pressureSize: false,
        pressureAlpha: true,
        type: _CPBrushInfo2.default.B_ROUND_AIRBRUSH,
        paintMode: _CPBrushInfo2.default.M_OIL,
        resat: 0.0,
        bleed: 0.07
    });

    return tools;
}

/**
 * Creates an instance of the ChickenPaint drawing app. Options is an object with these keys:
 *
 * uiElem       - DOM element to insert ChickenPaint into (required)
 * canvasWidth  - Width in pixels to use when creating blank canvases (defaults to 800)
 * canvasHeight - Height in pixels to use when creating blank canvases (defaults to 600)
 * rotation     - Integer from [0..3], number of 90 degree right rotations that should be applied to the canvas after
 *                loading
 *
 * saveUrl   - URL to POST the drawing to to save it
 * postUrl   - URL to navigate to after saving is successful and the user chooses to see/publish their finished product
 * exitUrl   - URL to navigate to after saving is successful and the user chooses to exit (optional)
 * testUrl   - URL that ChickenPaint can simulate a drawing upload to to test the user's permissions/connection (optional)
 *
 * loadImageUrl     - URL of PNG/JPEG image to load for editing (optional)
 * loadChibiFileUrl - URL of .chi file to load for editing (optional). Used in preference to loadImage.
 * loadSwatchesUrl  - URL of an .aco palette to load (optional)
 *
 * allowMultipleSends - Allow the drawing to be sent to the server multiple times (saving does not immediately end drawing session).
 * allowDownload - Allow the drawing to be saved to the user's computer
 * allowFullScreen - Allow the drawing tool to enter "full screen" mode, where the rest of the page contents will be hidden
 *
 * disableBootstrapAPI - Disable Bootstrap's data API on the root of the document. This speeds up things considerably.
 * 
 * resourcesRoot - URL to the directory that contains the gfx/css etc directories (relative to the page that 
 *                 ChickenPaint is loaded on)
 *
 * @throws ChickenPaint.UnsupportedBrowserException if the web browser does not support ChickenPaint
 */
function ChickenPaint(options) {
    var that = this,
        uiElem = options.uiElem,
        canvas,
        mainGUI,
        curColor = new _CPColor2.default(0),
        curBrush = ChickenPaint.T_PENCIL,
        curMode = ChickenPaint.M_DRAW,
        preTransformMode = curMode,
        curGradient = [0xFF000000, 0xFFFFFFFF],
        fullScreenMode = false,
        tools = createDrawingTools(),
        boxBlurDialog,
        gridDialog,
        actions = {
        // GUI actions

        CPFullScreen: {
            action: function action() {
                fullScreenMode = !fullScreenMode;

                $("body").toggleClass("chickenpaint-full-screen", fullScreenMode);
                $(uiElem).toggleClass("chickenpaint-full-screen", fullScreenMode);

                setTimeout(function () {
                    mainGUI.setFullScreenMode(fullScreenMode);
                }, 200);
            },
            isSupported: function isSupported() {
                return options.allowFullScreen !== false;
            },
            modifies: { gui: true }
        },
        CPZoomIn: {
            action: function action() {
                canvas.zoomIn();
            },
            modifies: { gui: true }
        },
        CPZoomOut: {
            action: function action() {
                canvas.zoomOut();
            },
            modifies: { gui: true }
        },
        CPZoom100: {
            action: function action() {
                canvas.zoom100();
            },
            modifies: { gui: true }
        },

        // History actions

        CPUndo: {
            action: function action() {
                that.artwork.undo();
            },
            modifies: { document: true }
        },
        CPRedo: {
            action: function action() {
                that.artwork.redo();
            },
            modifies: { document: true }
        },
        CPClearHistory: {
            action: function action() {
                if (confirm("You're about to clear the current Undo/Redo history.\nThis operation cannot be undone, are you sure you want to do that?")) {
                    that.artwork.clearHistory();
                }
            },
            modifies: { document: true }
        },

        // Drawing tools

        CPPencil: new ToolChangeAction(ChickenPaint.T_PENCIL),
        CPPen: new ToolChangeAction(ChickenPaint.T_PEN),
        CPEraser: new ToolChangeAction(ChickenPaint.T_ERASER),
        CPSoftEraser: new ToolChangeAction(ChickenPaint.T_SOFTERASER),
        CPAirbrush: new ToolChangeAction(ChickenPaint.T_AIRBRUSH),
        CPDodge: new ToolChangeAction(ChickenPaint.T_DODGE),
        CPBurn: new ToolChangeAction(ChickenPaint.T_BURN),
        CPWater: new ToolChangeAction(ChickenPaint.T_WATER),
        CPBlur: new ToolChangeAction(ChickenPaint.T_BLUR),
        CPSmudge: new ToolChangeAction(ChickenPaint.T_SMUDGE),
        CPBlender: new ToolChangeAction(ChickenPaint.T_BLENDER),

        // Modes

        CPFloodFill: new ModeChangeAction(ChickenPaint.M_FLOODFILL),
        CPGradientFill: new ModeChangeAction(ChickenPaint.M_GRADIENTFILL),
        CPRectSelection: new ModeChangeAction(ChickenPaint.M_RECT_SELECTION),
        CPMoveTool: new ModeChangeAction(ChickenPaint.M_MOVE_TOOL),
        CPRotateCanvas: new ModeChangeAction(ChickenPaint.M_ROTATE_CANVAS),
        CPColorPicker: new ModeChangeAction(ChickenPaint.M_COLOR_PICKER),

        // Layer transform

        CPTransform: {
            action: function action() {
                var layer = that.artwork.getActiveLayer(),
                    layerIndex = that.artwork.getActiveLayerIndex();

                if (!layer.visible) {
                    that.showLayerNotification(layerIndex, "Whoops! This layer is currently hidden", "layer");
                } else if (layer.alpha == 0) {
                    that.showLayerNotification(layerIndex, "Whoops! This layer's opacity is currently 0%", "opacity");
                } else if (that.artwork.transformAffineBegin() == null) {
                    that.showLayerNotification(layerIndex, "Whoops! All of the selected pixels are transparent!", "layer");
                } else {
                    setMode(ChickenPaint.M_TRANSFORM);
                }
            },
            modifies: { mode: true }
        },
        CPTransformAccept: {
            action: function action() {
                if (curMode == ChickenPaint.M_TRANSFORM) {
                    that.artwork.transformAffineFinish();
                    setMode(preTransformMode);
                }
            },
            modifies: { mode: true }
        },
        CPTransformReject: {
            action: function action() {
                if (curMode == ChickenPaint.M_TRANSFORM) {
                    that.artwork.transformAffineAbort();
                    setMode(preTransformMode);
                }
            },
            modifies: { document: true, mode: true }
        },

        // Stroke modes

        CPFreeHand: {
            action: function action() {
                tools[curBrush].strokeMode = _CPBrushInfo2.default.SM_FREEHAND;
                callToolListeners();
            },
            modifies: { tool: true }
        },
        CPLine: {
            action: function action() {
                tools[curBrush].strokeMode = _CPBrushInfo2.default.SM_LINE;
                callToolListeners();
            },
            modifies: { tool: true }
        },
        CPBezier: {
            action: function action() {
                tools[curBrush].strokeMode = _CPBrushInfo2.default.SM_BEZIER;
                callToolListeners();
            },
            modifies: { tool: true }
        },

        // Help dialogs

        CPAbout: {
            action: function action() {
                new _CPAboutDialog2.default(uiElem).show();
            },
            modifies: {}
        },
        CPShortcuts: {
            action: function action() {
                new _CPShortcutsDialog2.default(uiElem).show();
            },
            modifies: {}
        },
        CPTabletSupport: {
            action: function action() {
                new _CPTabletDialog2.default(uiElem).show();
            },
            modifies: {}
        },

        // Layer actions

        CPLayerDuplicate: {
            action: function action() {
                that.artwork.duplicateLayer();
            },
            modifies: { document: true }
        },
        CPLayerMergeDown: {
            action: function action() {
                that.artwork.mergeDown(true);
            },
            modifies: { document: true }
        },
        CPLayerMergeAll: {
            action: function action() {
                that.artwork.mergeAllLayers(true);
            },
            modifies: { document: true }
        },
        CPFill: {
            action: function action() {
                that.artwork.fill(that.getCurColorRgb() | 0xff000000);
            },
            modifies: { document: true }
        },
        CPClear: {
            action: function action() {
                that.artwork.clear();
            },
            modifies: { document: true }
        },
        CPSelectAll: {
            action: function action() {
                that.artwork.rectangleSelection(that.artwork.getBounds());
                canvas.repaintAll();
            },
            modifies: { document: true }
        },
        CPDeselectAll: {
            action: function action() {
                that.artwork.rectangleSelection(new _CPRect2.default(0, 0, 0, 0));
                canvas.repaintAll();
            },
            modifies: { document: true }
        },
        CPHFlip: {
            action: function action() {
                that.artwork.hFlip();
            },
            modifies: { document: true }
        },
        CPVFlip: {
            action: function action() {
                that.artwork.vFlip();
            },
            modifies: { document: true }
        },
        CPMNoise: {
            action: function action() {
                that.artwork.monochromaticNoise();
            },
            modifies: { document: true }
        },
        CPCNoise: {
            action: function action() {
                that.artwork.colorNoise();
            },
            modifies: { document: true }
        },
        CPFXBoxBlur: {
            action: function action() {
                showBoxBlurDialog();
            },
            modifies: { document: true }
        },
        CPFXInvert: {
            action: function action() {
                that.artwork.invert();
            },
            modifies: { document: true }
        },

        CPCut: {
            action: function action() {
                that.artwork.cutSelection(true);
            },
            modifies: { document: true }
        },
        CPCopy: {
            action: function action() {
                that.artwork.copySelection();
            },
            modifies: { document: true }
        },
        CPCopyMerged: {
            action: function action() {
                that.artwork.copySelectionMerged();
            },
            modifies: { document: true }
        },
        CPPaste: {
            action: function action() {
                that.artwork.pasteClipboard(true);
            },
            modifies: { document: true }
        },

        CPToggleGrid: {
            action: function action(e) {
                canvas.showGrid(e.selected);
            },
            modifies: { gui: true }
        },
        CPGridOptions: {
            action: function action() {
                showGridOptionsDialog();
            },
            modifies: { gui: true }
        },

        CPLinearInterpolation: {
            action: function action(e) {
                canvas.setInterpolation(e.selected);
            },
            modifies: { gui: true },
            isSupported: function isSupported() {
                return (0, _CPPolyfill.isCanvasInterpolationSupported)();
            }
        },
        CPResetCanvasRotation: {
            action: function action() {
                canvas.resetRotation();
            },
            modifies: { gui: true }
        },

        // Layer palette

        CPAddLayer: {
            action: function action() {
                that.artwork.addLayer();
            },
            modifies: { document: true }
        },
        CPRemoveLayer: {
            action: function action() {
                if (!that.artwork.removeLayer()) {
                    alert("Sorry, you can't remove the last remaining layer in the drawing.");
                }
            },
            modifies: { document: true }
        },
        CPMoveLayer: {
            action: function action(e) {
                that.artwork.moveLayer(e.fromIndex, e.toIndex);
            },
            modifies: { document: true }
        },
        CPSetActiveLayerIndex: {
            action: function action(e) {
                that.artwork.setActiveLayerIndex(e.layerIndex);

                // Since this is a slow GUI operation, this is a good chance to get the canvas ready for drawing
                that.artwork.performIdleTasks();
            },
            modifies: { document: true }
        },
        CPSetLayerVisibility: {
            action: function action(e) {
                that.artwork.setLayerVisibility(e.layerIndex, e.visible);
            },
            modifies: { layerProp: true }
        },
        CPSetLayerName: {
            action: function action(e) {
                that.artwork.setLayerName(e.layerIndex, e.name);
            },
            modifies: { layerProp: true }
        },
        CPSetLayerBlendMode: {
            action: function action(e) {
                that.artwork.setLayerBlendMode(e.layerIndex, e.blendMode);
            },
            modifies: { layerProp: true }
        },
        CPSetLayerAlpha: {
            action: function action(e) {
                that.artwork.setLayerAlpha(e.layerIndex, e.alpha);
            },
            modifies: { layerProp: true }
        },

        // Palettes

        CPPalColor: new PaletteToggleAction("color"),
        CPPalBrush: new PaletteToggleAction("brush"),
        CPPalLayers: new PaletteToggleAction("layers"),
        CPPalStroke: new PaletteToggleAction("stroke"),
        CPPalSwatches: new PaletteToggleAction("swatches"),
        CPPalTool: new PaletteToggleAction("tool"),
        CPPalMisc: new PaletteToggleAction("misc"),
        CPPalTextures: new PaletteToggleAction("textures"),

        CPTogglePalettes: {
            action: function action() {
                mainGUI.togglePalettes();
            },
            modifies: { gui: true }
        },
        CPArrangePalettes: {
            action: function action() {
                mainGUI.arrangePalettes();
            },
            modifies: { gui: true }
        },

        // Saving

        CPSave: {
            action: function action() {
                saveDrawing();
            },
            isSupported: function isSupported() {
                return options.allowDownload !== false;
            },
            modifies: { document: true }
        },
        CPSend: {
            action: function action() {
                sendDrawing();
            },
            isSupported: function isSupported() {
                return !!options.saveUrl;
            },
            modifies: { document: true }
        },
        CPPost: {
            action: function action() {
                window.location = options.postUrl;
            },
            isSupported: function isSupported() {
                return !!options.postUrl;
            },
            modifies: { document: true }
        },
        CPContinue: {
            action: function action() {},
            isSupported: function isSupported() {
                return !!options.allowMultipleSends;
            }
        },
        CPExit: {
            action: function action() {
                // Exit the drawing session without posting the drawing to the forum
                window.location = options.exitUrl;
            },
            isSupported: function isSupported() {
                return !!options.exitUrl;
            },
            modifies: {}
        }
    };

    function PaletteToggleAction(palName) {
        this.palName = palName;
    }

    PaletteToggleAction.prototype.action = function (e) {
        mainGUI.showPalette(this.palName, e.selected);
    };
    PaletteToggleAction.prototype.modifies = { gui: true };

    function ToolChangeAction(toolNum) {
        this.toolNum = toolNum;
    }

    ToolChangeAction.prototype.action = function () {
        setTool(this.toolNum);
    };

    ToolChangeAction.prototype.modifies = { mode: true, tool: true };

    function ModeChangeAction(modeNum) {
        this.modeNum = modeNum;
    }

    ModeChangeAction.prototype.action = function () {
        setMode(this.modeNum);
    };
    ModeChangeAction.prototype.modifies = { mode: true };

    function showBoxBlurDialog() {
        if (!boxBlurDialog) {
            boxBlurDialog = new _CPBoxBlurDialog2.default(uiElem, that);
        }

        boxBlurDialog.show();
    }

    function showGridOptionsDialog() {
        if (!gridDialog) {
            gridDialog = new _CPGridDialog2.default(uiElem, canvas);
        }

        gridDialog.show();
    }

    function callToolListeners() {
        that.emitEvent('toolChange', [curBrush, tools[curBrush]]);
    }

    // TODO make me private
    this.callToolListeners = function () {
        callToolListeners();
    };

    function callModeListeners() {
        that.emitEvent('modeChange', [curMode]);
    }

    function callViewListeners(viewInfo) {
        that.emitEvent('viewChange', [viewInfo]);
    }

    this.getMainGUI = function () {
        return mainGUI;
    };

    this.getArtwork = function () {
        return this.artwork;
    };

    this.setCanvas = function (_canvas) {
        canvas = _canvas;
    };

    /**
        * Change the interpolation mode used by Free Transform operations
        * 
        * @param {string} interpolation - Either "sharp" or "smooth"
        */
    this.setTransformInterpolation = function (interpolation) {
        this.artwork.setTransformInterpolation(interpolation);
    };

    this.setCurColor = function (color) {
        if (!curColor.isEqual(color)) {
            this.artwork.setForegroundColor(color.getRgb());

            curColor.copyFrom(color);

            this.emitEvent('colorChange', [color]);
        }
    };

    this.getCurColor = function () {
        return curColor.clone();
    };

    this.getCurColorRgb = function () {
        return curColor.getRgb();
    };

    this.setCurColorRgb = function (color) {
        this.setCurColor(new _CPColor2.default(color));
    };

    this.setCurGradient = function (gradient) {
        curGradient = gradient.slice(0); // Clone

        this.emitEvent('gradientChange', [curGradient]);
    };

    this.getCurGradient = function () {
        return curGradient.slice(0); // Clone
    };

    this.setBrushSize = function (size) {
        tools[curBrush].size = Math.max(1, Math.min(200, size));
        callToolListeners();
    };

    this.getBrushSize = function () {
        return tools[curBrush].size;
    };

    this.setAlpha = function (alpha) {
        tools[curBrush].alpha = alpha;
        callToolListeners();
    };

    this.getAlpha = function () {
        return tools[curBrush].alpha;
    };

    this.getCurMode = function () {
        return curMode;
    };

    function setMode(newMode) {
        if (curMode != newMode) {
            if (newMode == ChickenPaint.M_TRANSFORM) {
                preTransformMode = curMode;
            }
            curMode = newMode;
            callModeListeners();
        }
    }

    this.getCurTool = function () {
        return curBrush;
    };

    function setTool(tool) {
        setMode(ChickenPaint.M_DRAW);
        curBrush = tool;
        that.artwork.setBrush(tools[tool]);
        callToolListeners();
    }

    this.getBrushInfo = function () {
        return tools[curBrush];
    };

    function saveDrawing() {
        var saver = new _CPResourceSaver2.default({
            artwork: that.getArtwork(),
            rotation: canvas.getRotation90(),
            swatches: mainGUI.getSwatches()
        });

        saver.on("savingComplete", function () {
            that.artwork.setHasUnsavedChanges(false);
        });

        saver.on("savingFailure", function () {
            alert("An error occured while trying to save your drawing! Please try again!");
        });

        saver.save();
    }

    function sendDrawing() {
        if (!that.isActionSupported("CPContinue") && !confirm('Are you sure you want to send your drawing to the server and finish drawing now?')) {
            return;
        }

        var saver = new _CPResourceSaver2.default({
            artwork: that.getArtwork(),
            rotation: canvas.getRotation90(),
            swatches: mainGUI.getSwatches(),
            url: options.saveUrl
        }),
            sendDialog = new _CPSendDialog2.default(that, uiElem, saver);

        saver.on("savingComplete", function () {
            that.artwork.setHasUnsavedChanges(false);

            // If we're not allowed to keep editing, we can only go straight to viewing the new post
            if (!that.isActionSupported("CPContinue") && that.isActionSupported("CPPost")) {
                that.actionPerformed({ action: "CPPost" });
            }
        });

        // Allow the dialog to show before we begin serialization
        sendDialog.on("shown", function () {
            saver.save();
        });

        sendDialog.show();
    }

    /**
     * Not all saving actions will be supported (depending on what options we're configured with). Use this function
     * to check for support for a given action.
     */
    this.isActionSupported = function (actionName) {
        if (actions[actionName]) {
            var supportedType = _typeof(actions[actionName].isSupported);

            if (supportedType == "function") {
                return actions[actionName].isSupported();
            } else if (supportedType == "undefined") {
                // If not otherwise specified, an action defaults to supported
                return true;
            } else {
                return actions[actionName].isSupported;
            }
        }

        return false;
    };

    this.showLayerNotification = function (layerIndex, message, where) {
        this.emitEvent("layerNotification", [layerIndex, message, where]);
    };

    this.actionPerformed = function (e) {
        if (this.artwork == null || canvas == null) {
            return; // this shouldn't happen, but just in case
        }

        var action = actions[e.action];

        if (action) {
            if (curMode == ChickenPaint.M_TRANSFORM && (action.modifies.document || action.modifies.mode) && ["CPTransformAccept", "CPTransformReject"].indexOf(e.action) == -1) {
                if (e.action == "CPUndo") {
                    actions.CPTransformReject.action();
                } else if (e.action == "CPTransform") {
                    // You're already transforming the selection!
                } else {
                    // Prompt the user to finish their transform before starting something else
                    var dialog = new _CPConfirmTransformDialog2.default(uiElem, this);

                    /* If they decide to finish up with the transform, we can apply the original action they
                     * attempted afterwards.
                     */
                    dialog.on("accept", this.actionPerformed.bind(this, e));
                    dialog.on("reject", this.actionPerformed.bind(this, e));

                    dialog.show();
                }
            } else {
                action.action(e);
            }
        }

        // callCPEventListeners(); TODO
    };

    function installUnsavedWarning() {
        if ((0, _CPPolyfill.isEventSupported)("onbeforeunload")) {
            window.addEventListener("beforeunload", function (e) {
                if (that.artwork.getHasUnsavedChanges()) {
                    var confirmMessage = "Your drawing has unsaved changes!";
                    e.returnValue = confirmMessage;
                    return confirmMessage;
                }
            });
        } else {
            // Fall back to just catching links
            $("a").click(function (e) {
                if (this.getAttribute("href") != "#" && that.artwork.getHasUnsavedChanges()) {
                    return confirm("Your drawing has unsaved changes! Are you sure to want to navigate away?");
                }
            });
        }
    }

    function startMainGUI(swatches, initialRotation90) {
        mainGUI = new _CPMainGUI2.default(that, uiElem);

        setTool(ChickenPaint.T_PEN);
        mainGUI.arrangePalettes();

        if (swatches) {
            mainGUI.setSwatches(swatches);
        }

        if (initialRotation90) {
            mainGUI.setRotation(initialRotation90 * Math.PI / 2);
        }

        _CPWacomTablet2.default.getRef().detectTablet();

        installUnsavedWarning();
    }

    this.getResourcesRoot = function () {
        return options.resourcesRoot;
    };

    if (!isBrowserSupported()) {
        throw new ChickenPaint.UnsupportedBrowserException();
    }

    if (typeof document.body.style.flexBasis != "string" && typeof document.body.style.msFlexDirection != "string" || /Presto/.test(navigator.userAgent)) {
        uiElem.className += " no-flexbox";
    }

    uiElem.className += " chickenpaint";

    options.resourcesRoot = options.resourcesRoot || "chickenpaint/";

    if (options.disableBootstrapAPI) {
        $(document).off('.data-api');
    }

    if (options.loadImageUrl || options.loadChibiFileUrl) {
        var loader = new _CPResourceLoader2.default(options);

        new _CPSplashScreen2.default(uiElem, loader, options.resourcesRoot);

        loader.on("loadingComplete", function (resources) {
            that.artwork = resources.layers || resources.flat;

            startMainGUI(resources.swatches, options.rotation);
        });

        loader.load();
    } else {
        this.artwork = new _CPArtwork2.default(options.canvasWidth || 800, options.canvasHeight || 600);
        this.artwork.addBackgroundLayer();

        startMainGUI();
    }
}

ChickenPaint.prototype = Object.create(EventEmitter.prototype);
ChickenPaint.prototype.constructor = ChickenPaint;

ChickenPaint.UnsupportedBrowserException = function () {};

ChickenPaint.UnsupportedBrowserException.prototype.toString = function () {
    return "Sorry, your web browser does not support ChickenPaint. Please try a modern browser like Chrome, Safari, Firefox, or Edge";
};

//
// Definition of all the modes available
//

ChickenPaint.M_DRAW = 0;
ChickenPaint.M_FLOODFILL = 1;
ChickenPaint.M_RECT_SELECTION = 2;
ChickenPaint.M_MOVE_TOOL = 3;
ChickenPaint.M_ROTATE_CANVAS = 4;
ChickenPaint.M_COLOR_PICKER = 5;
ChickenPaint.M_GRADIENTFILL = 6;
ChickenPaint.M_TRANSFORM = 7;

//
// Definition of all the standard tools available
//
ChickenPaint.T_PENCIL = 0;
ChickenPaint.T_ERASER = 1;
ChickenPaint.T_PEN = 2;
ChickenPaint.T_SOFTERASER = 3;
ChickenPaint.T_AIRBRUSH = 4;
ChickenPaint.T_DODGE = 5;
ChickenPaint.T_BURN = 6;
ChickenPaint.T_WATER = 7;
ChickenPaint.T_BLUR = 8;
ChickenPaint.T_SMUDGE = 9;
ChickenPaint.T_BLENDER = 10;
ChickenPaint.T_MAX = 11;
module.exports = exports["default"];

},{"./engine/CPArtwork":2,"./engine/CPBrushInfo":5,"./engine/CPResourceLoader":13,"./engine/CPResourceSaver":14,"./gui/CPAboutDialog":16,"./gui/CPBoxBlurDialog":17,"./gui/CPConfirmTransformDialog":25,"./gui/CPGridDialog":27,"./gui/CPMainGUI":29,"./gui/CPSendDialog":35,"./gui/CPShortcutsDialog":36,"./gui/CPSplashScreen.js":38,"./gui/CPTabletDialog":41,"./util/CPColor":47,"./util/CPPolyfill":49,"./util/CPRect":52,"./util/CPWacomTablet":55}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPArtwork;

var _CPLayer = require("./CPLayer");

var _CPLayer2 = _interopRequireDefault(_CPLayer);

var _CPBlend = require("./CPBlend");

var _CPBlend2 = _interopRequireDefault(_CPBlend);

var _CPGreyBmp = require("./CPGreyBmp");

var _CPGreyBmp2 = _interopRequireDefault(_CPGreyBmp);

var _CPColorBmp = require("./CPColorBmp");

var _CPColorBmp2 = _interopRequireDefault(_CPColorBmp);

var _CPBrushManager = require("./CPBrushManager");

var _CPBrushManager2 = _interopRequireDefault(_CPBrushManager);

var _CPBrushInfo = require("./CPBrushInfo");

var _CPBrushInfo2 = _interopRequireDefault(_CPBrushInfo);

var _CPUndo = require("./CPUndo");

var _CPUndo2 = _interopRequireDefault(_CPUndo);

var _CPClip = require("./CPClip");

var _CPClip2 = _interopRequireDefault(_CPClip);

var _CPColorFloat = require("../util/CPColorFloat");

var _CPColorFloat2 = _interopRequireDefault(_CPColorFloat);

var _CPRect = require("../util/CPRect");

var _CPRect2 = _interopRequireDefault(_CPRect);

var _CPRandom = require("../util/CPRandom");

var _CPRandom2 = _interopRequireDefault(_CPRandom);

var _CPTransform = require("../util/CPTransform");

var _CPTransform2 = _interopRequireDefault(_CPTransform);

var _CPPolyfill = require("../util/CPPolyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Polyfill, used in duplicateLayer
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

function CPArtwork(_width, _height) {

    _width = _width | 0;
    _height = _height | 0;

    var MAX_UNDO = 30,
        EMPTY_BACKGROUND_COLOR = 0xFFFFFFFF,
        EMPTY_LAYER_COLOR = 0x00FFFFFF,
        BURN_CONSTANT = 260,
        BLUR_MIN = 64,
        BLUR_MAX = 1;

    var layers = [],
        curLayer,
        hasUnsavedChanges = false,
        curSelection = new _CPRect2.default(0, 0, 0, 0),


    /**
     * Our buffer for storing all the layers merged together according to their blending modes.
     *
     * @type {CPLayer}
     */
    fusionBuffer = new _CPLayer2.default(_width, _height),


    /**
     * Points to the buffer which represents all the layers merged together (either fusionBuffer or curLayer
     * depending on if the document is single-layered or not).
     *
     * @type {CPLayer}
     */
    fusion = fusionBuffer,


    /**
     * A copy of the current layer's data that can be used for undo operations.
     * 
     * @type {CPLayer}
     */
    undoBuffer = new _CPLayer2.default(_width, _height),


    /**
     * The region of the undoBuffer which is out of date with respect to the content of the layer, and needs updated
     * with prepareForLayerUndo().
     *
     * @type {CPRect}
     */
    undoBufferInvalidRegion = new _CPRect2.default(0, 0, _width, _height),


    /**
     * We use this buffer so we can accurately accumulate small changes to layer opacity during a brush stroke.
     * 
     * Normally we use it as a 16-bit opacity channel per pixel, but some brushes use the full 32-bits per pixel
     * as ARGB.
     */
    opacityBuffer = new _CPGreyBmp2.default(_width, _height, 32),


    /**
     * The area of dirty data contained by opacityBuffer that should be merged by fusionLayers()
     */
    opacityArea = new _CPRect2.default(0, 0, 0, 0),


    /**
     * The area of dirty layer data that should be merged into the fusion by fusionLayers().
     */
    fusionArea = new _CPRect2.default(0, 0, _width, _height),


    /**
     * Used by CPUndoPaint to keep track of the area that has been dirtied by layer operations and should be
     * saved for undo.
     */
    undoArea = new _CPRect2.default(0, 0, 0, 0),
        rnd = new _CPRandom2.default(),
        previewOperation = null,
        clipboard = null,
        // A CPClip
    undoList = [],
        redoList = [],
        curBrush = null,
        brushManager = new _CPBrushManager2.default(),
        lastX = 0.0,
        lastY = 0.0,
        lastPressure = 0.0,
        brushBuffer = null,
        sampleAllLayers = false,
        lockAlpha = false,
        curColor = 0x000000,
        // Black
    transformInterpolation = "smooth",
        that = this;

    // FIXME: 2007-01-13 I'm moving this to the CPRect class
    // find where this version is used and change the
    // code to use the CPRect version
    function clipSourceDest(srcRect, dstRect) {
        // FIXME:
        // /!\ dstRect bottom and right are ignored and instead we clip
        // against the width, height of the layer. :/
        //

        // this version would be enough in most cases (when we don't need
        // srcRect bottom and right to be clipped)
        // it's left here in case it's needed to make a faster version
        // of this function
        // dstRect.right = Math.min(width, dstRect.left + srcRect.getWidth());
        // dstRect.bottom = Math.min(height, dstRect.top + srcRect.getHeight());

        // new dest bottom/right
        dstRect.right = dstRect.left + srcRect.getWidth();
        if (dstRect.right > that.width) {
            srcRect.right -= dstRect.right - that.width;
            dstRect.right = that.width;
        }

        dstRect.bottom = dstRect.top + srcRect.getHeight();
        if (dstRect.bottom > that.height) {
            srcRect.bottom -= dstRect.bottom - that.height;
            dstRect.bottom = that.height;
        }

        // new src top/left
        if (dstRect.left < 0) {
            srcRect.left -= dstRect.left;
            dstRect.left = 0;
        }

        if (dstRect.top < 0) {
            srcRect.top -= dstRect.top;
            dstRect.top = 0;
        }
    }

    function callListenersUpdateRegion(region) {
        that.emitEvent("updateRegion", [region]);
    }

    // layerIndex is optional, provide when only one layer has been updated
    function callListenersLayerChange(layerIndex) {
        that.emitEvent("changeLayer", [layerIndex]);
    }

    // When the selected rectangle changes
    function callListenersSelectionChange() {
        that.emitEvent("changeSelection", []);
    }

    this.getLayers = function () {
        return layers;
    };

    this.getLayerCount = function () {
        return layers.length;
    };

    //
    // Selection methods
    //

    /**
     * Gets the current selection rect or a rectangle covering the whole canvas if there are no selections
     * 
     * @returns CPRect
     */
    this.getSelectionAutoSelect = function () {
        var r;

        if (!curSelection.isEmpty()) {
            r = curSelection.clone();
        } else {
            r = this.getBounds();
        }

        return r;
    };

    this.getSelection = function () {
        return curSelection.clone();
    };

    /**
     * Mark the given rectangle on the canvas as needing to be re-fused (i.e. we've drawn in this region).
     * Listeners are notified about our updated canvas region.
     *
     * @param rect CPRect Rect to invalidate
     */
    function invalidateFusionRect(rect) {
        fusionArea.union(rect);

        // This updated area will need to be updated in our undo buffer later
        undoBufferInvalidRegion.union(rect);

        callListenersUpdateRegion(rect);
    };

    /**
     * Mark the entire canvas as needing to be re-fused (we've drawn to the whole canvas)
     */
    function invalidateFusion() {
        invalidateFusionRect(new _CPRect2.default(0, 0, that.width, that.height));
    };

    this.setHasUnsavedChanges = function (value) {
        hasUnsavedChanges = value;
    };

    this.getHasUnsavedChanges = function () {
        return hasUnsavedChanges;
    };

    this.setLayerVisibility = function (layerIndex, visible) {
        var layer = this.getLayer(layerIndex);

        addUndo(new CPUndoLayerVisible(layerIndex, layer.visible, visible));
        layer.visible = visible;

        invalidateFusion();
        callListenersLayerChange(layerIndex);
    };

    this.addLayer = function () {
        var newLayer = new _CPLayer2.default(this.width, this.height, this.getDefaultLayerName()),
            activeLayerIndex = this.getActiveLayerIndex();

        newLayer.clearAll(EMPTY_LAYER_COLOR); // Transparent white

        addUndo(new CPUndoAddLayer(activeLayerIndex));

        layers.splice(activeLayerIndex + 1, 0, newLayer);
        this.setActiveLayerIndex(activeLayerIndex + 1);

        invalidateFusion();
        callListenersLayerChange();
    };

    this.addLayerObject = function (layer) {
        layers.push(layer);

        if (layers.length == 1) {
            curLayer = layers[0];
        }

        invalidateFusion();
        callListenersLayerChange();
    };

    /**
     * Remove the currently selected layer.
     * 
     * Returns true if the layer was removed, or false when removal failed because there is currently only one layer in 
     * the document.
     */
    this.removeLayer = function () {
        if (layers.length > 1) {
            var activeLayerIndex = this.getActiveLayerIndex();

            addUndo(new CPUndoRemoveLayer(activeLayerIndex, curLayer));

            layers.splice(activeLayerIndex, 1);
            this.setActiveLayerIndex(activeLayerIndex < layers.length ? activeLayerIndex : activeLayerIndex - 1);

            invalidateFusion();
            callListenersLayerChange();

            return true;
        }

        return false;
    };

    this.duplicateLayer = function () {
        var copySuffix = " Copy",
            newLayer = new _CPLayer2.default(this.width, this.height),
            activeLayerIndex = this.getActiveLayerIndex();

        addUndo(new CPUndoDuplicateLayer(activeLayerIndex));

        newLayer.copyFrom(layers[activeLayerIndex]);

        if (!newLayer.name.endsWith(copySuffix)) {
            newLayer.name += copySuffix;
        }

        layers.splice(activeLayerIndex + 1, 0, newLayer);
        this.setActiveLayerIndex(activeLayerIndex + 1);

        invalidateFusion();
        callListenersLayerChange();
    };

    this.mergeDown = function (createUndo) {
        var activeLayerIndex = this.getActiveLayerIndex();

        if (layers.length > 1 && activeLayerIndex > 0) {
            if (createUndo) {
                addUndo(new CPUndoMergeDownLayer(activeLayerIndex));
            }

            _CPBlend2.default.fuseLayer(layers[activeLayerIndex - 1], true, layers[activeLayerIndex], this.getBounds());
            layers.splice(activeLayerIndex, 1);
            this.setActiveLayerIndex(activeLayerIndex - 1);

            invalidateFusion();
            callListenersLayerChange();
        }
    };

    this.mergeAllLayers = function (createUndo) {
        if (layers.length > 1) {
            if (createUndo) {
                addUndo(new CPUndoMergeAllLayers());
            }

            that.fusionLayers();
            layers = [];

            var layer = new _CPLayer2.default(that.width, that.height, this.getDefaultLayerName());

            layer.copyDataFrom(fusion);

            layers.push(layer);
            this.setActiveLayerIndex(0);

            invalidateFusion();
            callListenersLayerChange();
        }
    };

    function moveLayerReal(from, to) {
        var layer = layers.splice(from, 1)[0];

        if (to <= from) {
            layers.splice(to, 0, layer);
            that.setActiveLayerIndex(to);
        } else {
            layers.splice(to - 1, 0, layer);
            that.setActiveLayerIndex(to - 1);
        }

        invalidateFusion();
        callListenersLayerChange();
    }

    /**
     * Move a layer in the stack from one index to another.
     * 
     * @param from int
     * @param to int
     */
    this.moveLayer = function (from, to) {
        if (from < 0 || from >= this.getLayerCount() || to < 0 || to > this.getLayerCount() || from == to) {
            return;
        }

        addUndo(new CPUndoMoveLayer(from, to));
        moveLayerReal(from, to);
    };

    this.setLayerAlpha = function (layerIndex, alpha) {
        var layer = this.getLayer(layerIndex);

        if (layer.getAlpha() != alpha) {
            addUndo(new CPUndoLayerAlpha(layerIndex, alpha));
            layer.setAlpha(alpha);

            invalidateFusion();
            callListenersLayerChange(layerIndex);
        }
    };

    this.setLayerBlendMode = function (layerIndex, blendMode) {
        var layer = this.getLayer(layerIndex);

        if (layer.getBlendMode() != blendMode) {
            addUndo(new CPUndoLayerMode(layerIndex, blendMode));
            layer.setBlendMode(blendMode);

            invalidateFusion();
            callListenersLayerChange(layerIndex);
        }
    };

    this.setLayerName = function (layerIndex, name) {
        var layer = this.getLayer(layerIndex);

        if (layer && layer.name != name) {
            addUndo(new CPUndoLayerRename(layerIndex, name));
            layer.name = name;

            callListenersLayerChange(layerIndex);
        }
    };

    function CPBrushToolBase() {}

    CPBrushToolBase.prototype.beginStroke = function (x, y, pressure) {
        prepareForLayerUndo();
        undoArea.makeEmpty();

        opacityBuffer.clearAll(0);
        opacityArea.makeEmpty();

        lastX = x;
        lastY = y;
        lastPressure = pressure;

        this.createAndPaintDab(x, y, pressure);
    };

    CPBrushToolBase.prototype.continueStroke = function (x, y, pressure) {
        var dist = Math.sqrt((lastX - x) * (lastX - x) + (lastY - y) * (lastY - y)),
            spacing = Math.max(curBrush.minSpacing, curBrush.curSize * curBrush.spacing);

        if (dist > spacing) {
            var nx = lastX,
                ny = lastY,
                np = lastPressure,
                df = (spacing - 0.001) / dist;

            for (var f = df; f <= 1.0; f += df) {
                nx = f * x + (1.0 - f) * lastX;
                ny = f * y + (1.0 - f) * lastY;
                np = f * pressure + (1.0 - f) * lastPressure;
                this.createAndPaintDab(nx, ny, np);
            }
            lastX = nx;
            lastY = ny;
            lastPressure = np;
        }
    };

    CPBrushToolBase.prototype.endStroke = function () {
        undoArea.clip(that.getBounds());

        // Did we end up painting anything?
        if (!undoArea.isEmpty()) {
            mergeOpacityBuffer(curColor, false);
            addUndo(new CPUndoPaint());

            /* Eagerly update the undo buffer for next time so we can avoid this lengthy
             * prepare at the beginning of a paint stroke
             */
            prepareForLayerUndo();
        }
        brushBuffer = null;
    };

    /**
     * Create a paint dab at the given position using the current brush, and paint it.
     *
     * @param x float
     * @param y float
     * @param pressure float
     */
    CPBrushToolBase.prototype.createAndPaintDab = function (x, y, pressure) {
        curBrush.applyPressure(pressure);

        if (curBrush.scattering > 0.0) {
            x += rnd.nextGaussian() * curBrush.curScattering / 4.0;
            y += rnd.nextGaussian() * curBrush.curScattering / 4.0;
        }

        var dab = brushManager.getDab(x, y, curBrush);

        this.paintDab(dab);
    };

    /**
     * Paint a dab returned by brushManager.getDab()
     *
     * @param dab {byte[] brush; int x, y, alpha, width, height}
     */
    CPBrushToolBase.prototype.paintDab = function (dab) {
        var srcRect = new _CPRect2.default(0, 0, dab.width, dab.height),
            dstRect = new _CPRect2.default(0, 0, dab.width, dab.height);

        dstRect.translate(dab.x, dab.y);

        clipSourceDest(srcRect, dstRect);

        // drawing entirely outside the canvas
        if (dstRect.isEmpty()) {
            return;
        }

        undoArea.union(dstRect);
        opacityArea.union(dstRect);

        this.paintDabImplementation(srcRect, dstRect, dab);

        invalidateFusionRect(dstRect);
    };

    function CPBrushToolSimpleBrush() {}

    CPBrushToolSimpleBrush.prototype = Object.create(CPBrushToolBase.prototype);
    CPBrushToolSimpleBrush.prototype.constructor = CPBrushToolSimpleBrush;

    CPBrushToolSimpleBrush.prototype.paintDabImplementation = function (srcRect, dstRect, dab) {
        // FIXME: there should be no reference to a specific tool here
        // create a new brush parameter instead
        if (curBrush.isAirbrush) {
            this.paintFlow(srcRect, dstRect, dab.brush, dab.width, Math.max(1, dab.alpha / 8));
        } else if (curBrush.toolNb == ChickenPaint.T_PEN) {
            this.paintFlow(srcRect, dstRect, dab.brush, dab.width, Math.max(1, dab.alpha / 2));
        } else {
            this.paintOpacity(srcRect, dstRect, dab.brush, dab.width, dab.alpha);
        }
    };

    CPBrushToolSimpleBrush.prototype.mergeOpacityBuf = function (dstRect, color /* int */) {
        var opacityData = opacityBuffer.data,
            undoData = undoBuffer.data,
            red = color >> 16 & 0xFF,
            green = color >> 8 & 0xFF,
            blue = color & 0xFF,
            width = dstRect.getWidth() | 0,
            height = dstRect.getHeight() | 0,
            dstOffset = curLayer.offsetOfPixel(dstRect.left, dstRect.top),
            srcOffset = opacityBuffer.offsetOfPixel(dstRect.left, dstRect.top),
            srcYStride = opacityBuffer.width - width | 0,
            dstYStride = (curLayer.width - width) * _CPColorBmp2.default.BYTES_PER_PIXEL | 0;

        for (var y = 0; y < height; y++, srcOffset += srcYStride, dstOffset += dstYStride) {
            for (var x = 0; x < width; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                var opacityAlpha = opacityData[srcOffset] / 255 | 0;

                if (opacityAlpha > 0) {
                    var destAlpha = undoData[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET],
                        newLayerAlpha = opacityAlpha + destAlpha * (255 - opacityAlpha) / 255 | 0,
                        realAlpha = 255 * opacityAlpha / newLayerAlpha | 0,
                        invAlpha = 255 - realAlpha;

                    curLayer.data[dstOffset] = (red * realAlpha + undoData[dstOffset] * invAlpha) / 255 & 0xff;
                    curLayer.data[dstOffset + 1] = (green * realAlpha + undoData[dstOffset + 1] * invAlpha) / 255 & 0xff;
                    curLayer.data[dstOffset + 2] = (blue * realAlpha + undoData[dstOffset + 2] * invAlpha) / 255 & 0xff;
                    curLayer.data[dstOffset + 3] = newLayerAlpha;
                }
            }
        }
    };

    /**
     *
     * @param srcRect CPRect
     * @param dstRect CPRect
     * @param brush int[]
     * @param brushWidth int
     * @param alpha float
     */
    CPBrushToolSimpleBrush.prototype.paintOpacity = function (srcRect, dstRect, brush, brushWidth, alpha) {
        var opacityData = opacityBuffer.data,
            srcOffset = srcRect.left + srcRect.top * brushWidth,
            dstOffset = opacityBuffer.offsetOfPixel(dstRect.left, dstRect.top),
            dstWidth = dstRect.getWidth(),
            srcYStride = brushWidth - dstWidth,
            dstYStride = that.width - dstWidth;

        alpha = Math.min(255, alpha);

        for (var y = dstRect.top; y < dstRect.bottom; y++, srcOffset += srcYStride, dstOffset += dstYStride) {
            for (var x = 0; x < dstWidth; x++, srcOffset++, dstOffset++) {
                opacityData[dstOffset] = Math.max(brush[srcOffset] * alpha, opacityData[dstOffset]);
            }
        }
    };

    CPBrushToolSimpleBrush.prototype.paintFlow = function (srcRect, dstRect, brush, brushWidth, alpha) {
        var opacityData = opacityBuffer.data,
            srcOffset = srcRect.left + srcRect.top * brushWidth,
            dstOffset = opacityBuffer.offsetOfPixel(dstRect.left, dstRect.top),
            dstWidth = dstRect.getWidth(),
            srcYStride = brushWidth - dstWidth,
            dstYStride = that.width - dstWidth;

        for (var y = dstRect.top; y < dstRect.bottom; y++, srcOffset += srcYStride, dstOffset += dstYStride) {
            for (var x = 0; x < dstWidth; x++, srcOffset++, dstOffset++) {
                var brushAlpha = brush[srcOffset] * alpha;

                if (brushAlpha != 0) {
                    var opacityAlpha = Math.min(255 * 255, opacityData[dstOffset] + (255 - opacityData[dstOffset] / 255) * brushAlpha / 255);

                    opacityData[dstOffset] = opacityAlpha;
                }
            }
        }
    };

    /*CPBrushToolSimpleBrush.prototype.paintOpacityFlow = function(srcRect, dstRect, brush, brushWidth, opacity, flow) {
        var 
            opacityData = opacityBuffer.data,
             by = srcRect.top;
        
        for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
            var 
                srcOffset = srcRect.left + by * brushWidth,
                dstOffset = dstRect.left + y * width;
            
            for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset++) {
                var 
                    brushAlpha = brush[srcOffset] * flow;
                
                if (brushAlpha != 0) {
                    var
                        opacityAlpha = opacityData[dstOffset],
                        newAlpha = Math.min(255 * 255, opacityAlpha + (opacity - opacityAlpha / 255) * brushAlpha / 255);
                    
                    newAlpha = Math.min(opacity * brush[srcOffset], newAlpha);
                    
                    if (newAlpha > opacityAlpha) {
                        opacityData[dstOffset] = newAlpha;
                    }
                }
            }
        }
    };*/

    function CPBrushToolEraser() {}

    CPBrushToolEraser.prototype = Object.create(CPBrushToolSimpleBrush.prototype);
    CPBrushToolEraser.prototype.constructor = CPBrushToolEraser;

    CPBrushToolEraser.prototype.mergeOpacityBuf = function (dstRect, color) {
        var opacityData = opacityBuffer.data,
            undoData = undoBuffer.data;

        for (var y = dstRect.top; y < dstRect.bottom; y++) {
            var dstOffset = curLayer.offsetOfPixel(dstRect.left, y) + _CPColorBmp2.default.ALPHA_BYTE_OFFSET,
                srcOffset = opacityBuffer.offsetOfPixel(dstRect.left, y);

            for (var x = dstRect.left; x < dstRect.right; x++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                var opacityAlpha = opacityData[srcOffset++] / 255 | 0;

                if (opacityAlpha > 0) {
                    var destAlpha = undoData[dstOffset],
                        realAlpha = destAlpha * (255 - opacityAlpha) / 255;

                    curLayer.data[dstOffset] = realAlpha;
                }
            }
        }
    };

    function CPBrushToolDodge() {}

    CPBrushToolDodge.prototype = Object.create(CPBrushToolSimpleBrush.prototype);
    CPBrushToolDodge.prototype.constructor = CPBrushToolDodge;

    CPBrushToolDodge.prototype.mergeOpacityBuf = function (dstRect, color) {
        var opacityData = opacityBuffer.data,
            undoData = undoBuffer.data;

        for (var y = dstRect.top; y < dstRect.bottom; y++) {
            var dstOffset = curLayer.offsetOfPixel(dstRect.left, y),
                srcOffset = opacityBuffer.offsetOfPixel(dstRect.left, y);

            for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                var opacityAlpha = opacityData[srcOffset] / 255 | 0;

                if (opacityAlpha > 0 && undoData[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] != 0) {
                    opacityAlpha += 255;

                    for (var i = 0; i < 3; i++) {
                        var channel = undoData[dstOffset + i] * opacityAlpha / 255 | 0;

                        if (channel > 255) {
                            channel = 255;
                        }

                        curLayer.data[dstOffset + i] = channel;
                    }
                }
            }
        }
    };

    function CPBrushToolBurn() {}

    CPBrushToolBurn.prototype = Object.create(CPBrushToolSimpleBrush.prototype);
    CPBrushToolBurn.prototype.constructor = CPBrushToolBurn;

    CPBrushToolBurn.prototype.mergeOpacityBuf = function (dstRect, color) {
        var opacityData = opacityBuffer.data,
            undoData = undoBuffer.data;

        for (var y = dstRect.top; y < dstRect.bottom; y++) {
            var dstOffset = curLayer.offsetOfPixel(dstRect.left, y),
                srcOffset = opacityBuffer.offsetOfPixel(dstRect.left, y);

            for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                var opacityAlpha = opacityData[srcOffset] / 255 | 0;

                if (opacityAlpha > 0 && undoData[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] != 0) {
                    for (var i = 0; i < 3; i++) {
                        var channel = undoData[dstOffset + i];

                        channel = channel - (BURN_CONSTANT - channel) * opacityAlpha / 255 | 0;

                        if (channel < 0) {
                            channel = 0;
                        }

                        curLayer.data[dstOffset + i] = channel;
                    }
                }
            }
        }
    };

    function CPBrushToolBlur() {}

    CPBrushToolBlur.prototype = Object.create(CPBrushToolSimpleBrush.prototype);
    CPBrushToolBlur.prototype.constructor = CPBrushToolBlur;

    CPBrushToolBlur.prototype.mergeOpacityBuf = function (dstRect, color) {
        var opacityData = opacityBuffer.data,
            undoData = undoBuffer.data,
            dstYStride = undoBuffer.width * _CPColorBmp2.default.BYTES_PER_PIXEL,
            r,
            g,
            b,
            a;

        function addSample(sampleOffset) {
            r += undoData[sampleOffset + _CPColorBmp2.default.RED_BYTE_OFFSET];
            g += undoData[sampleOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET];
            b += undoData[sampleOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET];
            a += undoData[sampleOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET];
        }

        for (var y = dstRect.top; y < dstRect.bottom; y++) {
            var dstOffset = undoBuffer.offsetOfPixel(dstRect.left, y),
                srcOffset = opacityBuffer.offsetOfPixel(dstRect.left, y);

            for (var x = dstRect.left; x < dstRect.right; x++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL, srcOffset++) {
                var opacityAlpha = opacityData[srcOffset] / 255 | 0;

                if (opacityAlpha > 0) {
                    var blur = BLUR_MIN + (BLUR_MAX - BLUR_MIN) * opacityAlpha / 255 | 0,
                        sum = blur + 4;

                    r = blur * undoData[dstOffset + _CPColorBmp2.default.RED_BYTE_OFFSET];
                    g = blur * undoData[dstOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET];
                    b = blur * undoData[dstOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET];
                    a = blur * undoData[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET];

                    addSample(y > 0 ? dstOffset - dstYStride : dstOffset);
                    addSample(y < undoBuffer.height - 1 ? dstOffset + dstYStride : dstOffset);
                    addSample(x > 0 ? dstOffset - _CPColorBmp2.default.BYTES_PER_PIXEL : dstOffset);
                    addSample(x < undoBuffer.width - 1 ? dstOffset + _CPColorBmp2.default.BYTES_PER_PIXEL : dstOffset);

                    a /= sum;
                    r /= sum;
                    g /= sum;
                    b /= sum;

                    curLayer.data[dstOffset + _CPColorBmp2.default.RED_BYTE_OFFSET] = r | 0;
                    curLayer.data[dstOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = g | 0;
                    curLayer.data[dstOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = b | 0;
                    curLayer.data[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = a | 0;
                }
            }
        }
    };

    /* Brushes derived from this class use the opacity buffer as a simple alpha layer (32-bit pixels in ARGB order) */
    function CPBrushToolDirectBrush() {}

    CPBrushToolDirectBrush.prototype = Object.create(CPBrushToolSimpleBrush.prototype);
    CPBrushToolDirectBrush.prototype.constructor = CPBrushToolDirectBrush;

    CPBrushToolDirectBrush.prototype.mergeOpacityBuf = function (dstRect, color) {
        var opacityData = opacityBuffer.data,
            undoData = undoBuffer.data,
            srcOffset = opacityBuffer.offsetOfPixel(dstRect.left, dstRect.top),
            dstOffset = curLayer.offsetOfPixel(dstRect.left, dstRect.top),
            width = dstRect.getWidth() | 0,
            height = dstRect.getHeight() | 0,
            srcYStride = opacityBuffer.width - width | 0,
            dstYStride = (curLayer.width - width) * _CPColorBmp2.default.BYTES_PER_PIXEL | 0;

        for (var y = 0; y < height; y++, srcOffset += srcYStride, dstOffset += dstYStride) {
            for (var x = 0; x < width; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                var color1 = opacityData[srcOffset],
                    alpha1 = color1 >>> 24;

                if (alpha1 == 0) {
                    continue;
                }

                var
                // Pretty sure fusion.alpha is always 100 and the commented section is a copy/paste error
                alpha2 = undoData[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] /* * fusion.alpha / 100 */
                ,
                    newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                if (newAlpha > 0) {
                    var realAlpha = alpha1 * 255 / newAlpha | 0,
                        invAlpha = 255 - realAlpha;

                    curLayer.data[dstOffset] = ((color1 >> 16 & 0xFF) * realAlpha + undoData[dstOffset] * invAlpha) / 255 | 0;
                    curLayer.data[dstOffset + 1] = ((color1 >> 8 & 0xFF) * realAlpha + undoData[dstOffset + 1] * invAlpha) / 255 | 0;
                    curLayer.data[dstOffset + 2] = ((color1 & 0xFF) * realAlpha + undoData[dstOffset + 2] * invAlpha) / 255 | 0;
                    curLayer.data[dstOffset + 3] = newAlpha;
                }
            }
        }
    };

    function CPBrushToolWatercolor() {
        var WCMEMORY = 50,
            WXMAXSAMPLERADIUS = 64;

        var previousSamples = [];

        /**
         * Average out a bunch of samples around the given pixel (x, y).
         * 
         * dx, dy controls the spread of the samples.
         * 
         * @returns CPColorFloat
         */
        function sampleColor(x, y, dx, dy) {
            var samples = [],
                layerToSample = sampleAllLayers ? fusion : that.getActiveLayer();

            x = x | 0;
            y = y | 0;

            samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(x, y)));

            for (var r = 0.25; r < 1.001; r += .25) {
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(~~(x + r * dx), y)));
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(~~(x - r * dx), y)));
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(x, ~~(y + r * dy))));
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(x, ~~(y - r * dy))));

                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(~~(x + r * 0.7 * dx), ~~(y + r * 0.7 * dy))));
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(~~(x + r * 0.7 * dx), ~~(y - r * 0.7 * dy))));
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(~~(x - r * 0.7 * dx), ~~(y + r * 0.7 * dy))));
                samples.push(_CPColorFloat2.default.createFromInt(layerToSample.getPixel(~~(x - r * 0.7 * dx), ~~(y - r * 0.7 * dy))));
            }

            var average = new _CPColorFloat2.default(0, 0, 0);

            for (var i = 0; i < samples.length; i++) {
                var sample = samples[i];

                average.r += sample.r;
                average.g += sample.g;
                average.b += sample.b;
            }

            average.r /= samples.length;
            average.g /= samples.length;
            average.b /= samples.length;

            return average;
        }

        // Blend the brush stroke with full color into the opacityBuffer
        function paintDirect(srcRect, dstRect, brush, brushWidth, alpha, color1) {
            var opacityData = opacityBuffer.data,
                by = srcRect.top;

            for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
                var srcOffset = srcRect.left + by * brushWidth,
                    dstOffset = opacityBuffer.offsetOfPixel(dstRect.left, y);

                for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset++) {
                    var alpha1 = (brush[srcOffset] & 0xff) * alpha / 255 | 0;

                    if (alpha1 <= 0) {
                        continue;
                    }

                    var color2 = opacityData[dstOffset],
                        alpha2 = color2 >>> 24,
                        newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                    if (newAlpha > 0) {
                        var realAlpha = alpha1 * 255 / newAlpha | 0,
                            invAlpha = 255 - realAlpha;

                        // The usual alpha blending formula C = A * alpha + B * (1 - alpha)
                        // has to rewritten in the form C = A + (1 - alpha) * B - (1 - alpha) *A
                        // that way the rounding up errors won't cause problems

                        var newColor = newAlpha << 24 | (color1 >>> 16 & 0xff) + ((color2 >>> 16 & 0xff) * invAlpha - (color1 >>> 16 & 0xff) * invAlpha) / 255 << 16 | (color1 >>> 8 & 0xff) + ((color2 >>> 8 & 0xff) * invAlpha - (color1 >>> 8 & 0xff) * invAlpha) / 255 << 8 | (color1 & 0xff) + ((color2 & 0xff) * invAlpha - (color1 & 0xff) * invAlpha) / 255;

                        opacityData[dstOffset] = newColor;
                    }
                }
            }
        }

        this.beginStroke = function (x, y, pressure) {
            previousSamples = null;

            CPBrushToolDirectBrush.prototype.beginStroke.call(this, x, y, pressure);
        };

        this.paintDabImplementation = function (srcRect, dstRect, dab) {
            if (previousSamples == null) {
                // Seed the previousSamples list to capacity with a bunch of copies of one sample to get us started
                var startColor = sampleColor(~~((dstRect.left + dstRect.right) / 2), ~~((dstRect.top + dstRect.bottom) / 2), Math.max(1, Math.min(WXMAXSAMPLERADIUS, dstRect.getWidth() * 2 / 6)), Math.max(1, Math.min(WXMAXSAMPLERADIUS, dstRect.getHeight() * 2 / 6)));

                previousSamples = [];

                for (var i = 0; i < WCMEMORY; i++) {
                    previousSamples.push(startColor);
                }
            }

            var wcColor = new _CPColorFloat2.default(0, 0, 0);

            for (var i = 0; i < previousSamples.length; i++) {
                var sample = previousSamples[i];

                wcColor.r += sample.r;
                wcColor.g += sample.g;
                wcColor.b += sample.b;
            }
            wcColor.r /= previousSamples.length;
            wcColor.g /= previousSamples.length;
            wcColor.b /= previousSamples.length;

            // resaturation
            wcColor.mixWith(_CPColorFloat2.default.createFromInt(curColor), curBrush.resat * curBrush.resat);

            var newColor = wcColor.toInt();

            // bleed
            wcColor.mixWith(sampleColor((dstRect.left + dstRect.right) / 2, (dstRect.top + dstRect.bottom) / 2, Math.max(1, Math.min(WXMAXSAMPLERADIUS, dstRect.getWidth() * 2 / 6)), Math.max(1, Math.min(WXMAXSAMPLERADIUS, dstRect.getHeight() * 2 / 6))), curBrush.bleed);

            previousSamples.push(wcColor);
            previousSamples.shift();

            paintDirect(srcRect, dstRect, dab.brush, dab.width, Math.max(1, dab.alpha / 4), newColor);
            mergeOpacityBuffer(0, false);

            if (sampleAllLayers) {
                that.fusionLayers();
            }
        };
    }

    CPBrushToolWatercolor.prototype = Object.create(CPBrushToolDirectBrush.prototype);
    CPBrushToolWatercolor.prototype.constructor = CPBrushToolWatercolor;

    function CPBrushToolOil() {

        function oilAccumBuffer(srcRect, dstRect, buffer, w, alpha) {
            var layerToSample = sampleAllLayers ? fusion : that.getActiveLayer(),
                by = srcRect.top;

            for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
                var srcOffset = srcRect.left + by * w,
                    dstOffset = layerToSample.offsetOfPixel(dstRect.left, y);

                for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                    var alpha1 = layerToSample.data[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] * alpha / 255 | 0;

                    if (alpha1 <= 0) {
                        continue;
                    }

                    var color2 = buffer[srcOffset],
                        alpha2 = color2 >>> 24,
                        newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                    if (newAlpha > 0) {
                        var realAlpha = alpha1 * 255 / newAlpha | 0,
                            invAlpha = 255 - realAlpha,
                            color1Red = layerToSample.data[dstOffset + _CPColorBmp2.default.RED_BYTE_OFFSET],
                            color1Green = layerToSample.data[dstOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET],
                            color1Blue = layerToSample.data[dstOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET],
                            newColor = newAlpha << 24 | color1Red + ((color2 >>> 16 & 0xff) * invAlpha - color1Red * invAlpha) / 255 << 16 | color1Green + ((color2 >>> 8 & 0xff) * invAlpha - color1Green * invAlpha) / 255 << 8 | color1Blue + ((color2 & 0xff) * invAlpha - color1Blue * invAlpha) / 255;

                        buffer[srcOffset] = newColor;
                    }
                }
            }
        }

        function oilResatBuffer(srcRect, dstRect, buffer, w, alpha1, color1) {
            var by = srcRect.top;

            if (alpha1 <= 0) {
                return;
            }

            for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
                var srcOffset = srcRect.left + by * w;

                for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++) {
                    var color2 = buffer[srcOffset],
                        alpha2 = color2 >>> 24,
                        newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                    if (newAlpha > 0) {
                        var realAlpha = alpha1 * 255 / newAlpha | 0,
                            invAlpha = 255 - realAlpha,
                            newColor = newAlpha << 24 | (color1 >>> 16 & 0xff) + ((color2 >>> 16 & 0xff) * invAlpha - (color1 >>> 16 & 0xff) * invAlpha) / 255 << 16 | (color1 >>> 8 & 0xff) + ((color2 >>> 8 & 0xff) * invAlpha - (color1 >>> 8 & 0xff) * invAlpha) / 255 << 8 | (color1 & 0xff) + ((color2 & 0xff) * invAlpha - (color1 & 0xff) * invAlpha) / 255;

                        buffer[srcOffset] = newColor;
                    }
                }
            }
        }

        function oilPasteBuffer(srcRect, dstRect, buffer, brush, w, alpha) {
            var opacityData = opacityBuffer.data,
                by = srcRect.top;

            for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
                var bufferOffset = srcRect.left + by * w,
                    // Brush buffer is 1 integer per pixel
                opacityOffset = dstRect.left + y * that.width,
                    // Opacity buffer is 1 integer per pixel
                layerOffset = curLayer.offsetOfPixel(dstRect.left, y); // 4 bytes per pixel 

                for (var x = dstRect.left; x < dstRect.right; x++, bufferOffset++, layerOffset += _CPColorBmp2.default.BYTES_PER_PIXEL, opacityOffset++) {
                    var color1 = buffer[bufferOffset],
                        alpha1 = (color1 >>> 24) * (brush[bufferOffset] & 0xff) * alpha / (255 * 255) | 0;

                    if (alpha1 <= 0) {
                        continue;
                    }

                    var alpha2 = curLayer.data[layerOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET],
                        newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                    if (newAlpha > 0) {
                        var color2Red = curLayer.data[layerOffset + _CPColorBmp2.default.RED_BYTE_OFFSET],
                            color2Green = curLayer.data[layerOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET],
                            color2Blue = curLayer.data[layerOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET],
                            realAlpha = alpha1 * 255 / newAlpha | 0,
                            invAlpha = 255 - realAlpha,
                            newColor = newAlpha << 24 | (color1 >>> 16 & 0xff) + (color2Red * invAlpha - (color1 >>> 16 & 0xff) * invAlpha) / 255 << 16 | (color1 >>> 8 & 0xff) + (color2Green * invAlpha - (color1 >>> 8 & 0xff) * invAlpha) / 255 << 8 | (color1 & 0xff) + (color2Blue * invAlpha - (color1 & 0xff) * invAlpha) / 255;

                        opacityData[opacityOffset] = newColor;
                    }
                }
            }
        }

        this.paintDabImplementation = function (srcRect, dstRect, dab) {
            if (brushBuffer == null) {
                brushBuffer = new Uint32Array(dab.width * dab.height); // Initialized to 0 for us by the browser

                oilAccumBuffer(srcRect, dstRect, brushBuffer, dab.width, 255);
            } else {
                oilResatBuffer(srcRect, dstRect, brushBuffer, dab.width, ~~(curBrush.resat <= 0.0 ? 0 : Math.max(1, curBrush.resat * curBrush.resat * 255)), curColor & 0xFFFFFF);
                oilPasteBuffer(srcRect, dstRect, brushBuffer, dab.brush, dab.width, dab.alpha);
                oilAccumBuffer(srcRect, dstRect, brushBuffer, dab.width, ~~(curBrush.bleed * 255));
            }

            mergeOpacityBuffer(0, false);

            if (sampleAllLayers) {
                that.fusionLayers();
            }
        };
    }

    CPBrushToolOil.prototype = Object.create(CPBrushToolDirectBrush.prototype);
    CPBrushToolOil.prototype.constructor = CPBrushToolOil;

    function CPBrushToolSmudge() {

        /**
         * 
         * @param srcRect
         * @param dstRect
         * @param buffer Uint32Array
         * @param w int
         * @param alpha int
         */
        function smudgeAccumBuffer(srcRect, dstRect, buffer, w, alpha) {
            var layerToSample = sampleAllLayers ? fusion : that.getActiveLayer(),
                by = srcRect.top;

            for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
                var srcOffset = srcRect.left + by * w,
                    dstOffset = layerToSample.offsetOfPixel(dstRect.left, y);

                for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                    var layerRed = layerToSample.data[dstOffset + _CPColorBmp2.default.RED_BYTE_OFFSET],
                        layerGreen = layerToSample.data[dstOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET],
                        layerBlue = layerToSample.data[dstOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET],
                        layerAlpha = layerToSample.data[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET],
                        opacityAlpha = 255 - alpha;

                    if (opacityAlpha > 0) {
                        var destColor = buffer[srcOffset],
                            destAlpha = 255,
                            newLayerAlpha = opacityAlpha + destAlpha * (255 - opacityAlpha) / 255 | 0,
                            realAlpha = 255 * opacityAlpha / newLayerAlpha | 0,
                            invAlpha = 255 - realAlpha,
                            newColor = (layerAlpha * realAlpha + (destColor >>> 24 & 0xff) * invAlpha) / 255 << 24 & 0xff000000 | (layerRed * realAlpha + (destColor >>> 16 & 0xff) * invAlpha) / 255 << 16 & 0xff0000 | (layerGreen * realAlpha + (destColor >>> 8 & 0xff) * invAlpha) / 255 << 8 & 0xff00 | (layerBlue * realAlpha + (destColor & 0xff) * invAlpha) / 255 & 0xff;

                        if (newColor == destColor) {
                            if (layerRed > (destColor & 0xff0000)) {
                                newColor += 1 << 16;
                            } else if (layerRed < (destColor & 0xff0000)) {
                                newColor -= 1 << 16;
                            }

                            if (layerGreen > (destColor & 0xff00)) {
                                newColor += 1 << 8;
                            } else if (layerGreen < (destColor & 0xff00)) {
                                newColor -= 1 << 8;
                            }

                            if (layerBlue > (destColor & 0xff)) {
                                newColor += 1;
                            } else if (layerBlue < (destColor & 0xff)) {
                                newColor -= 1;
                            }
                        }

                        buffer[srcOffset] = newColor;
                    }
                }
            }

            if (srcRect.left > 0) {
                var fill = srcRect.left;

                for (var y = srcRect.top; y < srcRect.bottom; y++) {
                    var offset = y * w,
                        fillColor = buffer[offset + srcRect.left];

                    for (var x = 0; x < fill; x++) {
                        buffer[offset++] = fillColor;
                    }
                }
            }

            if (srcRect.right < w) {
                var fill = w - srcRect.right;

                for (var y = srcRect.top; y < srcRect.bottom; y++) {
                    var offset = y * w + srcRect.right,
                        fillColor = buffer[offset - 1];

                    for (var x = 0; x < fill; x++) {
                        buffer[offset++] = fillColor;
                    }
                }
            }

            for (var y = 0; y < srcRect.top; y++) {
                var srcOffset = srcRect.top * w,
                    dstOffset = y * w;

                for (var x = 0; x < w; x++, srcOffset++, dstOffset++) {
                    buffer[dstOffset] = buffer[srcOffset];
                }
            }

            for (var y = srcRect.bottom; y < w; y++) {
                var srcOffset = (srcRect.bottom - 1) * w,
                    dstOffset = y * w;

                for (var x = 0; x < w; x++, srcOffset++, dstOffset++) {
                    buffer[dstOffset] = buffer[srcOffset];
                }
            }
        }

        /**
         * 
         * @param srcRect CPRect
         * @param dstRect CPRect
         * @param buffer Uint32Array
         * @param brush Uint8Array
         * @param w int
         * @param alpha int
         */
        function smudgePasteBuffer(srcRect, dstRect, buffer, brush, w, alpha) {
            var by = srcRect.top;

            for (var y = dstRect.top; y < dstRect.bottom; y++, by++) {
                var srcOffset = srcRect.left + by * w,
                    dstOffset = curLayer.offsetOfPixel(dstRect.left, y);

                for (var x = dstRect.left; x < dstRect.right; x++, srcOffset++, dstOffset += _CPColorBmp2.default.BYTES_PER_PIXEL) {
                    var bufferColor = buffer[srcOffset],
                        opacityAlpha = (bufferColor >>> 24) * (brush[srcOffset] & 0xff) / 255;

                    if (opacityAlpha > 0) {
                        curLayer.data[dstOffset + _CPColorBmp2.default.RED_BYTE_OFFSET] = bufferColor >> 16 & 0xff;
                        curLayer.data[dstOffset + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = bufferColor >> 8 & 0xff;
                        curLayer.data[dstOffset + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = bufferColor & 0xff;
                        curLayer.data[dstOffset + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = bufferColor >> 24 & 0xff;
                    }
                }
            }
        }

        /**
         * @param srcRect CPRect
         * @param dstRect CPRect
         * @param dab CPBrushDab
         */
        this.paintDabImplementation = function (srcRect, dstRect, dab) {
            if (brushBuffer == null) {
                brushBuffer = new Uint32Array(dab.width * dab.height);
                smudgeAccumBuffer(srcRect, dstRect, brushBuffer, dab.width, 0);
            } else {
                smudgeAccumBuffer(srcRect, dstRect, brushBuffer, dab.width, dab.alpha);
                smudgePasteBuffer(srcRect, dstRect, brushBuffer, dab.brush, dab.width, dab.alpha);

                if (lockAlpha) {
                    restoreAlpha(dstRect);
                }
            }

            opacityArea.makeEmpty();

            if (sampleAllLayers) {
                that.fusionLayers();
            }
        };
    }

    CPBrushToolSmudge.prototype = Object.create(CPBrushToolDirectBrush.prototype);
    CPBrushToolSmudge.prototype.constructor = CPBrushToolSmudge;

    CPBrushToolSmudge.prototype.mergeOpacityBuf = function (dstRect, color) {};

    var paintingModes = [new CPBrushToolSimpleBrush(), new CPBrushToolEraser(), new CPBrushToolDodge(), new CPBrushToolBurn(), new CPBrushToolWatercolor(), new CPBrushToolBlur(), new CPBrushToolSmudge(), new CPBrushToolOil()];

    this.width = _width;
    this.height = _height;

    this.getDefaultLayerName = function () {
        var prefix = "Layer ",
            highestLayerNb = 0;

        for (var i = 0; i < layers.length; i++) {
            var layer = layers[i];

            if (/^Layer [0-9]+$/.test(layer.name)) {
                highestLayerNb = Math.max(highestLayerNb, parseInt(layer.name.substring(prefix.length), 10));
            }
        }
        return prefix + (highestLayerNb + 1);
    };

    function restoreAlpha(rect) {
        that.getActiveLayer().copyAlphaFrom(undoBuffer, rect);
    }

    /**
     * Merge the opacity buffer from the current drawing operation to the active layer.
     */
    function mergeOpacityBuffer(color, clear) {
        if (!opacityArea.isEmpty()) {
            if (curBrush.paintMode != _CPBrushInfo2.default.M_ERASE || !lockAlpha) {
                paintingModes[curBrush.paintMode].mergeOpacityBuf(opacityArea, color);
            } else {
                // FIXME: it would be nice to be able to set the paper color
                paintingModes[_CPBrushInfo2.default.M_PAINT].mergeOpacityBuf(opacityArea, EMPTY_LAYER_COLOR);
            }

            if (lockAlpha) {
                restoreAlpha(opacityArea);
            }

            if (clear) {
                opacityBuffer.clearRect(opacityArea, 0);
            }

            opacityArea.makeEmpty();
        }
    }

    this.addBackgroundLayer = function () {
        var layer = new _CPLayer2.default(that.width, that.height, this.getDefaultLayerName());

        layer.clearAll(EMPTY_BACKGROUND_COLOR);

        this.addLayerObject(layer);
    };

    /**
     * Merge together the visible layers and return the resulting ImageData for display to the screen.
     * 
     * The image is cached, so repeat calls are cheap.
     */
    this.fusionLayers = function () {
        // Is there anything to update from last call?
        if (!fusionArea.isEmpty()) {
            // The current brush renders out its buffers to the layer stack for us
            mergeOpacityBuffer(curColor, false);

            // If the drawing is single-layered and opaque, just use the bottom-most layer as our fusion, we don't need to blend anything!
            if (layers.length == 1 && layers[0].alpha >= 100 && layers[0].visible) {
                fusion = layers[0];
            } else {
                // Fuse into the actual fusion buffer since we need to blend
                fusion = fusionBuffer;

                var fusionIsSemiTransparent = true,
                    first = true;

                layers.forEach(function (layer) {
                    if (!first) {
                        fusionIsSemiTransparent = fusionIsSemiTransparent && fusion.hasAlphaInRect(fusionArea);
                    }

                    if (layer.visible && layer.alpha > 0) {
                        if (first) {
                            first = false;

                            if (layer.alpha == 100) {
                                /*
                                 * Instead of blending the layer onto the empty transparent fusion, we can just copy the
                                 * layer data right into the fusion. This works for all of our blending modes.
                                 */

                                fusion.copyBitmapRect(layer, fusionArea.left, fusionArea.top, fusionArea);
                                return;
                            }

                            fusion.clearRect(fusionArea, 0x00FFFFFF); // Transparent white
                        }

                        _CPBlend2.default.fuseLayer(fusion, fusionIsSemiTransparent, layer, fusionArea);
                    }
                });

                if (first) {
                    // Didn't draw any layers? We have to clear the area, then
                    fusion.clearRect(fusionArea, 0x00FFFFFF); // Transparent white
                }
            }

            fusionArea.makeEmpty();
        }

        return fusion.getImageData();
    };

    this.setActiveLayerIndex = function (newIndex) {
        if (newIndex < 0 || newIndex >= layers.length) {
            return;
        }

        if (curLayer != layers[newIndex]) {
            var oldIndex = this.getActiveLayerIndex();

            curLayer = layers[newIndex];

            // Was the old layer deleted?
            if (oldIndex == -1) {
                callListenersLayerChange();
            } else {
                callListenersLayerChange(oldIndex); // Old layer has now been deselected
                callListenersLayerChange(newIndex); // New layer has now been selected
            }

            invalidateLayerUndo();
        }
    };

    this.getActiveLayerIndex = function () {
        for (var i = 0; i < layers.length; i++) {
            if (layers[i] == curLayer) {
                return i;
            }
        }

        return -1;
    };

    /*
     * Get the index of the topmost visible layer, or 0.
     */
    this.getTopmostVisibleLayer = function () {
        for (var i = layers.length - 1; i >= 0; i--) {
            if (layers[i].visible) {
                return i;
            }
        }

        return 0;
    };

    /**
        * Get the layer with the specified index (no bounds checking)
        *
        * @param {int} i
        * @returns {CPLayer}
        */
    this.getLayer = function (i) {
        return layers[i];
    };

    /**
        * Get the currently active layer (the layer that drawing operations will be applied to))
        *
        * @returns {CPLayer}
        */
    this.getActiveLayer = function () {
        return curLayer;
    };

    this.getDocMemoryUsed = function () {
        var total = fusionBuffer.getMemorySize() * (3 + layers.length);

        if (clipboard != null) {
            total += clipboard.bmp.getMemorySize();
        }

        return total;
    };

    this.getUndoMemoryUsed = function () {
        var total = 0;

        for (var i = 0; i < redoList.length; i++) {
            var undo = redoList[i];

            total += undo.getMemoryUsed(true, null);
        }

        for (var i = 0; i < undoList.length; i++) {
            var undo = undoList[i];

            total += undo.getMemoryUsed(false, null);
        }

        return total;
    };

    function canUndo() {
        return undoList.length > 0;
    }

    function canRedo() {
        return redoList.length > 0;
    }

    //
    // Undo / Redo
    //

    this.undo = function () {
        if (!canUndo()) {
            return;
        }
        hasUnsavedChanges = true;

        var undo = undoList.pop();

        undo.undo();

        redoList.push(undo);
    };

    this.redo = function () {
        if (!canRedo()) {
            return;
        }
        hasUnsavedChanges = true;

        var redo = redoList.pop();

        redo.redo();

        undoList.push(redo);
    };

    /**
     * Ensures that the state of the current layer has been stored in undoBuffer so it can be undone later.
     */
    function prepareForLayerUndo() {
        if (!undoBufferInvalidRegion.isEmpty()) {
            //console.log("Copying " + undoBufferInvalidRegion + " to the undo buffer");
            undoBuffer.copyBitmapRect(curLayer, undoBufferInvalidRegion.left, undoBufferInvalidRegion.top, undoBufferInvalidRegion);
            undoBufferInvalidRegion.makeEmpty();
        }
    }

    /**
     * Call when the undo buffer has become completely worthless (e.g. after the active layer index changes, the undo
     * buffer won't contain any data from the new layer to begin with).
     */
    function invalidateLayerUndo() {
        undoBufferInvalidRegion = that.getBounds();
    }

    /**
     * The result of some of our operations aren't needed until later, so we can defer them until the user is idle.
     *
     * You may call this routine at any time (or never, if you like) as a hint that the user is idle and we should
     * try to perform pending operations before we will need to block on their results.
     */
    this.performIdleTasks = function () {
        prepareForLayerUndo();
    };

    function addUndo(undo) {
        hasUnsavedChanges = true;

        if (redoList.length > 0) {
            redoList = [];
        }

        if (undoList.length == 0 || !undoList[undoList.length - 1].merge(undo)) {
            if (undoList.length >= MAX_UNDO) {
                undoList.unshift();
            }
            if (undoList.length > 0) {
                undoList[undoList.length - 1].compact();
            }
            undoList.push(undo);
        } else if (undoList[undoList.length - 1].noChange()) {
            // Two merged changes can mean no change at all
            // don't leave a useless undo in the list
            undoList.pop();
        }
    }

    this.clearHistory = function () {
        undoList = [];
        redoList = [];
    };

    this.colorPicker = function (x, y) {
        // not really necessary and could potentially the repaint
        // of the canvas to miss that area
        // this.fusionLayers();

        return fusion.getPixel(~~x, ~~y) & 0xFFFFFF;
    };

    this.setSelection = function (rect) {
        curSelection.set(rect);
        curSelection.clip(this.getBounds());
    };

    this.emptySelection = function () {
        curSelection.makeEmpty();
    };

    this.floodFill = function (x, y) {
        prepareForLayerUndo();
        undoArea = this.getBounds();

        curLayer.floodFill(~~x, ~~y, curColor | 0xff000000);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.gradientFill = function (fromX, fromY, toX, toY, gradientPoints) {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.gradient(r, fromX, fromY, toX, toY, gradientPoints);

        if (lockAlpha) {
            restoreAlpha(r);
        }

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.fill = function (color) {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.clearRect(r, color);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.clear = function () {
        this.fill(0xffffff);
    };

    this.hFlip = function () {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.copyRegionHFlip(r, undoBuffer);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.vFlip = function () {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.copyRegionVFlip(r, undoBuffer);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.monochromaticNoise = function () {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.fillWithNoise(r);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.colorNoise = function () {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.fillWithColorNoise(r);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.invert = function () {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        curLayer.invert(r);

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.boxBlur = function (radiusX, radiusY, iterations) {
        var r = this.getSelectionAutoSelect();

        prepareForLayerUndo();
        undoArea = r;

        for (var i = 0; i < iterations; i++) {
            curLayer.boxBlur(r, radiusX, radiusY);
        }

        addUndo(new CPUndoPaint());
        invalidateFusion();
    };

    this.rectangleSelection = function (r) {
        var newSelection = r.clone();

        newSelection.clip(this.getBounds());

        addUndo(new CPUndoRectangleSelection(this.getSelection(), newSelection));

        this.setSelection(newSelection);
    };

    /**
     * Get the most recently completed operation from the undo list, or null if the undo list is empty.
     *
     * @returns {*}
     */
    function getActiveOperation() {
        if (undoList.length > 0) {
            return undoList[undoList.length - 1];
        }

        return null;
    }

    /**
     * Move the currently selected layer data by the given offset.
     *
     * @param {int} offsetX
     * @param {int} offsetY
     * @param {boolean} copy - Make a copy of the selection instead of moving it.
     */
    this.move = function (offsetX, offsetY, copy) {
        /*
         * Add rounding to ensure we haven't been given float coordinates (that would cause horrible flow-on effects like
         * the boundary of the undo rectangle having float coordinates)
         */
        offsetX |= 0;
        offsetY |= 0;

        if (offsetX == 0 && offsetY == 0) {
            return;
        }

        opacityArea.makeEmpty(); // Prevents a drawing tool being called during layer fusion to draw itself to the layer

        var activeOp = getActiveOperation();

        // If we've changed layers since our last move, we want to move the new layer, not the old one, so can't amend
        if (!copy && activeOp instanceof CPActionMoveSelection && activeOp.layerIndex == this.getActiveLayerIndex()) {
            activeOp.amend(offsetX, offsetY);
            redoList = [];
            hasUnsavedChanges = true;
        } else {
            activeOp = new CPActionMoveSelection(this.getSelectionAutoSelect(), offsetX, offsetY, copy);

            addUndo(activeOp);
        }
    };

    /**
     * Change the interpolation mode used by Free Transform operations
     *
     * @param {string} interpolation - Either "sharp" or "smooth"
     */
    this.setTransformInterpolation = function (interpolation) {
        transformInterpolation = interpolation;
        if (previewOperation instanceof CPActionTransformSelection) {
            previewOperation.setInterpolation(interpolation);
        }
    };

    /**
        * If the current operation is an affine transform, roll it back and remove it from the undo history.
        */
    this.transformAffineAbort = function () {
        if (previewOperation instanceof CPActionTransformSelection) {
            previewOperation.undo();
            previewOperation = null;
        }
    };

    /**
        * Begins transforming the current selection/layer, and returns the initial source rectangle and initial transform.
        * You can update the transform by calling transformAffine().
        * 
        * You must call transformAffineFinish() or transformAffineAbort() to finish the transformation.
        * 
        * Returns null if the current selection/layer doesn't contain any non-transparent pixels, and doesn't start
        * transforming.
        */
    this.transformAffineBegin = function () {
        // Are we already transforming? Continue that instead
        if (previewOperation instanceof CPActionTransformSelection) {
            return { transform: previewOperation.getTransform(), rect: previewOperation.getInitialTransformRect(), selection: previewOperation.getInitialSelectionRect() };
        }

        // Only transform the non-transparent pixels
        var layer = this.getActiveLayer(),
            selection = this.getSelectionAutoSelect(),
            initialRect = layer.getNonTransparentBounds(selection),
            initialTransform = new _CPTransform2.default();

        if (initialRect.isEmpty()) {
            return null;
        }

        /* If we introduce other previewOperations, we might want to check we aren't overwriting them here...
         * Though probably ChickenPaint's global exclusive mode will enforce this for us.
         */
        previewOperation = new CPActionTransformSelection(initialRect, initialTransform, transformInterpolation);

        opacityArea.makeEmpty(); // Prevents a drawing tool being called during layer fusion to draw itself to the layer

        return { transform: initialTransform, rect: initialRect, selection: selection };
    };

    /**
        * Finish and save the transform that is currently in progress.
        */
    this.transformAffineFinish = function () {
        if (previewOperation instanceof CPActionTransformSelection) {
            addUndo(previewOperation);
            previewOperation = null;
        }
    };

    /**
     * Transform the currently selected layer data using the given AffineTransform.
     *
     * @param {CPTransform} affineTransform
     */
    this.transformAffineAmend = function (affineTransform) {
        if (previewOperation instanceof CPActionTransformSelection) {
            previewOperation.amend(affineTransform);
        }
    };

    // Copy/Paste functions

    this.cutSelection = function (createUndo) {
        var selection = this.getSelection();

        if (selection.isEmpty()) {
            return;
        }

        clipboard = new _CPClip2.default(curLayer.cloneRect(selection), selection.left, selection.top);

        if (createUndo) {
            addUndo(new CPUndoCut(clipboard.bmp, this.getActiveLayerIndex(), selection));
        }

        curLayer.clearRect(selection, EMPTY_LAYER_COLOR);
        invalidateFusionRect(selection);
    };

    this.copySelection = function () {
        var selection = that.getSelection();

        if (selection.isEmpty()) {
            return;
        }

        clipboard = new _CPClip2.default(curLayer.cloneRect(selection), selection.left, selection.top);
    };

    this.copySelectionMerged = function () {
        var selection = that.getSelection();

        if (selection.isEmpty()) {
            return;
        }

        // make sure the fusioned picture is up to date
        this.fusionLayers();
        clipboard = new _CPClip2.default(fusion.cloneRect(selection), selection.left, selection.top);
    };

    /**
     *
     * @param createUndo boolean
     * @param clip CPClip
     */
    function pasteClip(createUndo, clip) {
        var activeLayerIndex = that.getActiveLayerIndex();

        if (createUndo) {
            addUndo(new CPUndoPaste(clip, activeLayerIndex, that.getSelection()));
        }

        var newLayer = new _CPLayer2.default(that.width, that.height, that.getDefaultLayerName()),
            sourceRect = clip.bmp.getBounds(),
            x,
            y;

        layers.splice(activeLayerIndex + 1, 0, newLayer);
        that.setActiveLayerIndex(activeLayerIndex + 1);

        if (sourceRect.isInside(that.getBounds())) {
            x = clip.x;
            y = clip.y;
        } else {
            x = (that.width - clip.bmp.width) / 2 | 0;
            y = (that.height - clip.bmp.height) / 2 | 0;
        }

        curLayer.copyBitmapRect(clip.bmp, x, y, sourceRect);
        that.emptySelection();

        invalidateFusion();
        callListenersLayerChange();
    }

    this.pasteClipboard = function (createUndo) {
        if (clipboard != null) {
            pasteClip(createUndo, clipboard);
        }
    };

    this.setSampleAllLayers = function (b) {
        sampleAllLayers = b;
    };

    this.setLockAlpha = function (b) {
        lockAlpha = b;
    };

    this.setForegroundColor = function (color) {
        curColor = color;
    };

    this.setBrush = function (brush) {
        curBrush = brush;
    };

    this.setBrushTexture = function (texture) {
        brushManager.setTexture(texture);
    };

    // ///////////////////////////////////////////////////////////////////////////////////
    // Paint engine
    // ///////////////////////////////////////////////////////////////////////////////////

    this.beginStroke = function (x, y, pressure) {
        if (curBrush == null) {
            return;
        }

        paintingModes[curBrush.paintMode].beginStroke(x, y, pressure);
    };

    this.continueStroke = function (x, y, pressure) {
        if (curBrush == null) {
            return;
        }

        paintingModes[curBrush.paintMode].continueStroke(x, y, pressure);
    };

    this.endStroke = function () {
        if (curBrush == null) {
            return;
        }

        paintingModes[curBrush.paintMode].endStroke();
    };

    this.hasAlpha = function () {
        return fusion.hasAlpha();
    };

    /**
     * Get the artwork as a single flat PNG image.
     * 
     * Rotation is [0..3] and selects a multiple of 90 degrees of clockwise rotation to be applied to the drawing before
     * saving.
     * 
     * @return A binary string of the PNG file data.
     */
    this.getFlatPNG = function (rotation) {
        this.fusionLayers();

        return fusion.getAsPNG(rotation);
    };

    /**
     * Returns true if this artwork can be exactly represented as a simple transparent PNG (i.e. doesn't have multiple 
     * layers, and base layer's opacity is set to 100%).
     */
    this.isSimpleDrawing = function () {
        return this.getLayerCount() == 1 && this.getLayer(0).getAlpha() == 100;
    };

    // ////////////////////////////////////////////////////
    // Undo classes

    /**
     * Save the difference between the current layer and the undoBuffer (within the undoArea) for undo, and clear
     * the undoArea.
     *
     * @constructor
     */
    function CPUndoPaint() {
        var rect = undoArea.clone(),
            data = undoBuffer.copyRectXOR(curLayer, rect);

        this.layer = that.getActiveLayerIndex();

        undoArea.makeEmpty();

        this.undo = function () {
            that.getLayer(this.layer).setRectXOR(data, rect);
            invalidateFusionRect(rect);
        };

        this.redo = function () {
            that.getLayer(this.layer).setRectXOR(data, rect);
            invalidateFusionRect(rect);
        };

        this.getMemoryUsed = function (undone, param) {
            return data.length;
        };
    }

    CPUndoPaint.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoPaint.prototype.constructor = CPUndoPaint;

    function CPUndoLayerVisible(_layerIndex, _oldVis, _newVis) {
        this.layerIndex = _layerIndex;
        this.oldVis = _oldVis;
        this.newVis = _newVis;
    }

    CPUndoLayerVisible.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoLayerVisible.prototype.constructor = CPUndoLayerVisible;

    CPUndoLayerVisible.prototype.redo = function () {
        that.getLayer(this.layerIndex).visible = this.newVis;

        invalidateFusion();
        callListenersLayerChange(this.layerIndex);
    };

    CPUndoLayerVisible.prototype.undo = function () {
        that.getLayer(this.layerIndex).visible = this.oldVis;

        invalidateFusion();
        callListenersLayerChange(this.layerIndex);
    };

    CPUndoLayerVisible.prototype.merge = function (u) {
        if (u instanceof CPUndoLayerVisible && this.layerIndex == u.layerIndex) {
            this.newVis = u.newVis;
            return true;
        }
        return false;
    };

    CPUndoLayerVisible.prototype.noChange = function () {
        return this.oldVis == this.newVis;
    };

    function CPUndoAddLayer(layerIndex) {
        this.undo = function () {
            layers.splice(layerIndex + 1, 1);
            that.setActiveLayerIndex(layerIndex);
            invalidateFusion();
            callListenersLayerChange();
        };

        this.redo = function () {
            var newLayer = new _CPLayer2.default(that.width, that.height, that.getDefaultLayerName());
            newLayer.clearAll(EMPTY_LAYER_COLOR);
            layers.splice(layerIndex + 1, 0, newLayer);
            that.setActiveLayerIndex(layerIndex + 1);

            invalidateFusion();
            callListenersLayerChange();
        };
    }

    CPUndoAddLayer.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoAddLayer.prototype.constructor = CPUndoAddLayer;

    function CPUndoDuplicateLayer(layerIndex) {
        this.undo = function () {
            layers.splice(layerIndex + 1, 1);
            that.setActiveLayerIndex(layerIndex);

            invalidateFusion();
            callListenersLayerChange();
        };

        this.redo = function () {
            var copySuffix = " Copy",
                sourceLayer = layers[layerIndex],
                newLayer = new _CPLayer2.default(that.width, that.height),
                newLayerName = sourceLayer.name;

            if (!newLayerName.endsWith(copySuffix)) {
                newLayerName += copySuffix;
            }

            newLayer.copyFrom(sourceLayer);
            newLayer.name = newLayerName;

            layers.splice(layerIndex + 1, 0, newLayer);

            that.setActiveLayerIndex(layerIndex + 1);

            invalidateFusion();
            callListenersLayerChange();
        };
    }

    CPUndoDuplicateLayer.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoDuplicateLayer.prototype.constructor = CPUndoDuplicateLayer;

    /**
     * @param layerIndex int
     * @param layer CPLayer
     */
    function CPUndoRemoveLayer(layerIndex, layer) {
        this.undo = function () {
            layers.splice(layerIndex, 0, layer);
            that.setActiveLayerIndex(layerIndex);

            invalidateFusion();
            callListenersLayerChange();
        };

        this.redo = function () {
            layers.splice(layerIndex, 1);
            that.setActiveLayerIndex(layerIndex < layers.length ? layerIndex : layerIndex - 1);

            invalidateFusion();
            callListenersLayerChange();
        };

        this.getMemoryUsed = function (undone) {
            return undone ? 0 : layer.width * layer.height * _CPColorBmp2.default.BYTES_PER_PIXEL;
        };
    }

    CPUndoRemoveLayer.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoRemoveLayer.prototype.constructor = CPUndoRemoveLayer;

    function CPUndoMergeDownLayer(layerIndex) {
        var layerBottom = new _CPLayer2.default(that.width, that.height),
            layerTop;

        layerBottom.copyFrom(layers[layerIndex - 1]);
        layerTop = layers[layerIndex];

        this.undo = function () {
            layers[layerIndex - 1].copyFrom(layerBottom);
            layers.splice(layerIndex, 0, layerTop);
            that.setActiveLayerIndex(layerIndex);

            layerBottom = layerTop = null;

            invalidateFusion();
            callListenersLayerChange();
        };

        this.redo = function () {
            layerBottom = new _CPLayer2.default(that.width, that.height);
            layerBottom.copyFrom(layers[layerIndex - 1]);
            layerTop = layers[layerIndex];

            that.setActiveLayerIndex(layerIndex);
            that.mergeDown(false);
        };

        this.getMemoryUsed = function (undone, param) {
            return undone ? 0 : that.width * that.height * _CPColorBmp2.default.BYTES_PER_PIXEL * 2;
        };
    }

    CPUndoMergeDownLayer.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoMergeDownLayer.prototype.constructor = CPUndoMergeDownLayer;

    function CPUndoMergeAllLayers() {
        var oldActiveLayerIndex = that.getActiveLayerIndex(),
            oldLayers = layers.slice(0); // Clone old layers array

        this.undo = function () {
            layers = oldLayers.slice(0);
            that.setActiveLayerIndex(oldActiveLayerIndex);

            invalidateFusion();
            callListenersLayerChange();
        };

        this.redo = function () {
            that.mergeAllLayers(false);
        };

        this.getMemoryUsed = function (undone, param) {
            return undone ? 0 : oldLayers.length * width * height * _CPColorBmp2.default.BYTES_PER_PIXEL;
        };
    }

    CPUndoMergeAllLayers.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoMergeAllLayers.prototype.constructor = CPUndoMergeAllLayers;

    function CPUndoMoveLayer(from, to) {
        this.undo = function () {
            if (to <= from) {
                moveLayerReal(to, from + 1);
            } else {
                moveLayerReal(to - 1, from);
            }
        };

        this.redo = function () {
            moveLayerReal(from, to);
        };
    }

    CPUndoMoveLayer.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoMoveLayer.prototype.constructor = CPUndoMoveLayer;

    function CPUndoLayerAlpha(layerIndex, alpha) {
        this.from = that.getLayer(layerIndex).getAlpha();
        this.to = alpha;
        this.layerIndex = layerIndex;
    }

    CPUndoLayerAlpha.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoLayerAlpha.prototype.constructor = CPUndoLayerAlpha;

    CPUndoLayerAlpha.prototype.undo = function () {
        that.getLayer(this.layerIndex).setAlpha(this.from);

        invalidateFusion();
        callListenersLayerChange(this.layerIndex);
    };

    CPUndoLayerAlpha.prototype.redo = function () {
        that.getLayer(this.layerIndex).setAlpha(this.to);

        invalidateFusion();
        callListenersLayerChange(this.layerIndex);
    };

    CPUndoLayerAlpha.prototype.merge = function (u) {
        if (u instanceof CPUndoLayerAlpha && this.layerIndex == u.layerIndex) {
            this.to = u.to;
            return true;
        }
        return false;
    };

    CPUndoLayerAlpha.prototype.noChange = function () {
        return this.from == this.to;
    };

    function CPUndoLayerMode(layerIndex, to) {
        this.layerIndex = layerIndex;
        this.from = that.getLayer(layerIndex).getBlendMode();
        this.to = to;
    }

    CPUndoLayerMode.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoLayerMode.prototype.constructor = CPUndoLayerMode;

    CPUndoLayerMode.prototype.undo = function () {
        that.getLayer(this.layerIndex).setBlendMode(this.from);

        invalidateFusion();
        callListenersLayerChange();
    };

    CPUndoLayerMode.prototype.redo = function () {
        that.getLayer(this.layerIndex).setBlendMode(this.to);

        invalidateFusion();
        callListenersLayerChange();
    };

    CPUndoLayerMode.prototype.merge = function (u) {
        if (u instanceof CPUndoLayerMode && this.layerIndex == u.layerIndex) {
            this.to = u.to;
            return true;
        }
        return false;
    };

    CPUndoLayerMode.prototype.noChange = function () {
        return this.from == this.to;
    };

    function CPUndoLayerRename(layerIndex, to) {
        this.layerIndex = layerIndex;
        this.to = to;
        this.from = that.getLayer(layerIndex).name;
    }

    CPUndoLayerRename.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoLayerRename.prototype.constructor = CPUndoLayerRename;

    CPUndoLayerRename.prototype.undo = function () {
        that.getLayer(this.layerIndex).name = this.from;
        callListenersLayerChange(this.layerIndex);
    };

    CPUndoLayerRename.prototype.redo = function () {
        that.getLayer(this.layerIndex).name = this.to;
        callListenersLayerChange(this.layerIndex);
    };

    CPUndoLayerRename.prototype.merge = function (u) {
        if (u instanceof CPUndoLayerRename && this.layerIndex == u.layerIndex) {
            this.to = u.to;
            return true;
        }
        return false;
    };

    CPUndoLayerRename.prototype.noChange = function () {
        return this.from == this.to;
    };

    /**
     * @param from CPRect
     * @param to CPRect
     */
    function CPUndoRectangleSelection(from, to) {
        from = from.clone();
        to = to.clone();

        this.undo = function () {
            that.setSelection(from);
            callListenersUpdateRegion(that.getBounds());
        };

        this.redo = function () {
            that.setSelection(to);
            callListenersUpdateRegion(that.getBounds());
        };

        this.noChange = function () {
            return from.equals(to);
        };
    }

    CPUndoRectangleSelection.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoRectangleSelection.prototype.constructor = CPUndoRectangleSelection;

    /**
     * Upon creation, transforms the currently selected region of the current layer by the given affine transform.
     *
     * @param {CPRect} srcRect - Rectangle to transform
     * @param {CPTransform} affineTransform - Transform to apply
     * @param {string} interpolation - "smooth" or "sharp"
     */
    function CPActionTransformSelection(srcRect, affineTransform, interpolation) {
        var fromSelection = that.getSelection(),
            dstRect = null,
            tempCanvas = document.createElement("canvas"),
            tempCanvasContext = tempCanvas.getContext("2d"),
            undoData,
            // A copy of the original layer within the undoDataRect
        undoDataRect,


        // A canvas for composing the transform onto
        fullUndoCanvas = document.createElement("canvas"),
            fullUndoCanvasContext = fullUndoCanvas.getContext("2d");

        affineTransform = affineTransform.clone();
        interpolation = interpolation || "smooth";

        this.undo = function () {
            var layer = that.getLayer(this.layerIndex),
                invalidateRegion = dstRect.clone(),
                undoSrcRegion;

            invalidateRegion.union(srcRect);

            undoSrcRegion = invalidateRegion.clone();
            undoSrcRegion.translate(-undoDataRect.left, -undoDataRect.top);

            layer.copyBitmapRect(undoData, invalidateRegion.left, invalidateRegion.top, undoSrcRegion);

            that.setSelection(fromSelection);
            that.setActiveLayerIndex(this.layerIndex);

            invalidateFusionRect(invalidateRegion);

            /*
             * Required because in the case of a copy, we don't invalidate the source rect in the fusion, so the canvas
             * won't end up repainting the selection rectangle there.
             */
            callListenersSelectionChange();
        };

        this.redo = function () {
            var layer = that.getLayer(this.layerIndex);

            // Make a fresh copy of the layer into a Canvas to compose onto
            fullUndoCanvasContext.putImageData(layer.getImageData(), 0, 0);

            // Erase the region we moved from
            fullUndoCanvasContext.clearRect(srcRect.left, srcRect.top, srcRect.getWidth(), srcRect.getHeight());

            (0, _CPPolyfill.setCanvasInterpolation)(fullUndoCanvasContext, interpolation == "smooth");

            fullUndoCanvasContext.save();

            // Apply the transform when drawing the transformed fragment
            fullUndoCanvasContext.setTransform(affineTransform.m[0], affineTransform.m[1], affineTransform.m[2], affineTransform.m[3], affineTransform.m[4], affineTransform.m[5]);
            fullUndoCanvasContext.drawImage(tempCanvas, srcRect.left, srcRect.top);

            fullUndoCanvasContext.restore();

            // Copy back to the layer data
            layer.setImageData(fullUndoCanvasContext.getImageData(0, 0, layer.width, layer.height));

            // Invalidate the source and destination regions we touched
            var invalidateRegion = srcRect.clone(),
                dstCorners = srcRect.toPoints();

            affineTransform.transformPoints(dstCorners);

            dstRect = _CPRect2.default.createBoundingBox(dstCorners);
            dstRect.roundContain();
            layer.getBounds().clip(dstRect);

            invalidateRegion.union(dstRect);

            invalidateFusionRect(invalidateRegion);

            // Transform the selection rect to enclose the transformed selection
            if (!fromSelection.isEmpty()) {
                var toSelectionPoints = fromSelection.toPoints(),
                    toSelectionRect;

                affineTransform.transformPoints(toSelectionPoints);

                toSelectionRect = _CPRect2.default.createBoundingBox(toSelectionPoints);
                toSelectionRect.roundNearest();
                layer.getBounds().clip(toSelectionRect);

                that.setSelection(toSelectionRect);
                callListenersSelectionChange();
            }
        };

        /**
         * Replace the transform with the given one.
         *
         * @param {CPTransform} _affineTransform
         */
        this.amend = function (_affineTransform) {
            var layer = that.getLayer(this.layerIndex);

            this.undo();

            if (undoDataRect.getWidth() < layer.width || undoDataRect.getHeight() < layer.height) {
                /*
                 * We need a complete copy of the layer in undoData to support further redo(). (As we probably previously
                 * only made a backup copy of the areas we erased using the old transform).
                 */
                undoData = layer.clone();
                undoDataRect = layer.getBounds();
            }

            affineTransform = _affineTransform.clone();
            this.redo();
        };

        this.setInterpolation = function (newInterpolation) {
            if (newInterpolation != interpolation) {
                interpolation = newInterpolation;

                this.undo();
                this.redo();
            }
        };

        /**
         * Called when we're no longer the top operation in the undo stack, so that we can optimize for lower memory
         * usage instead of faster revision speed
         */
        this.compact = function () {
            var layer = that.getLayer(this.layerIndex);

            // If we have a full undo, and we don't need very much area for undo, trim it to just the area we need
            if (undoDataRect.getWidth() == layer.width && undoDataRect.getHeight() == layer.height) {
                var dirtyRect = srcRect.getUnion(dstRect);

                if (dirtyRect.getArea() * 2 < layer.width * layer.height) {
                    undoDataRect = dirtyRect;
                    undoData = undoData.cloneRect(undoDataRect);
                }
            }
        };

        this.getMemoryUsed = function (undone, param) {
            return undoData.getMemorySize();
        };

        /**
            * Get a copy of the affine transform.
            */
        this.getTransform = function () {
            return affineTransform.clone();
        };

        /**
         * Get a copy of the initial document rectangle (before the transform was applied)
         *
         * @returns {CPRect}
         */
        this.getInitialTransformRect = function () {
            return srcRect.clone();
        };

        /**
         * Get a copy of the initial user selection rectangle (before the transform was applied). Can be empty if
         * the user didn't have anything selected before the transform began.
         *
         * @returns {CPRect}
         */
        this.getInitialSelectionRect = function () {
            return fromSelection.clone();
        };

        this.layerIndex = that.getActiveLayerIndex();

        var layer = that.getLayer(this.layerIndex);

        undoData = layer.clone();
        undoDataRect = layer.getBounds();
        fullUndoCanvas.width = layer.width;
        fullUndoCanvas.height = layer.height;

        // Make a copy of just the source rectangle in its own canvas so we have it as an image to be drawn later
        tempCanvas.width = srcRect.getWidth();
        tempCanvas.height = srcRect.getHeight();
        tempCanvasContext.putImageData(undoData.getImageData(), -srcRect.left, -srcRect.top, srcRect.left, srcRect.top, srcRect.getWidth(), srcRect.getHeight());

        this.redo();
    }

    CPActionTransformSelection.prototype = Object.create(_CPUndo2.default.prototype);
    CPActionTransformSelection.prototype.constructor = CPActionTransformSelection;

    /**
     * Upon creation, moves the currently selected region of the current layer by the given offset (or copies it if
     * 'copy' is true).
     *
     * @param srcRect
     * @param offsetX
     * @param offsetY
     * @param copy
     * @constructor
     */
    function CPActionMoveSelection(srcRect, offsetX, offsetY, copy) {
        var fromSelection = that.getSelection(),
            dstRect = null,
            fullUndo,
            // A copy of the entire layer
        srcData = null,
            // A copy of the original pixels at the srcRect, or null if we use a fullUndo instead
        dstData = null // A copy of the original pixels at the dstRect, or null
        ;

        this.undo = function () {
            var layer = that.getLayer(this.layerIndex),
                invalidateRegion = dstRect.clone();

            if (!copy) {
                invalidateRegion.union(srcRect);
            }

            if (fullUndo) {
                layer.copyBitmapRect(fullUndo, invalidateRegion.left, invalidateRegion.top, invalidateRegion);
            } else {
                layer.copyBitmapRect(srcData, srcRect.left, srcRect.top, srcData.getBounds());

                if (dstData) {
                    layer.copyBitmapRect(dstData, dstRect.left, dstRect.top, dstData.getBounds());
                }
            }

            that.setSelection(fromSelection);
            that.setActiveLayerIndex(this.layerIndex);

            invalidateFusionRect(invalidateRegion);

            /*
             * Required because in the case of a copy, we don't invalidate the source rect in the fusion, so the canvas
             * won't end up repainting the selection rectangle there.
             */
            callListenersSelectionChange();
        };

        this.redo = function () {
            var layer = that.getLayer(this.layerIndex),
                invalidateRegion = new _CPRect2.default(0, 0, 0, 0);

            if (!copy) {
                layer.clearRect(srcRect, 0);
                invalidateRegion.set(srcRect);
            }

            dstRect = srcRect.clone();
            dstRect.translate(offsetX, offsetY);
            layer.getBounds().clip(dstRect);

            /* Note that while we could copy image data from the layer itself onto the layer (instead of sourcing that
             * data from the undo buffers), this would require that pasteAlphaRect do the right thing when source and
             * dest rects overlap, which it doesn't.
             */
            if (fullUndo) {
                layer.pasteAlphaRect(fullUndo, srcRect, dstRect.left, dstRect.top);
            } else {
                layer.pasteAlphaRect(srcData, srcData.getBounds(), dstRect.left, dstRect.top);
            }

            invalidateRegion.union(dstRect);

            invalidateFusionRect(invalidateRegion);

            if (!fromSelection.isEmpty()) {
                var toSelection = fromSelection.clone();
                toSelection.translate(offsetX, offsetY);
                that.setSelection(toSelection);
                callListenersSelectionChange();
            }
        };

        /**
         * Move further by the given offset on top of the current offset.
         *
         * @param _offsetX {int}
         * @param _offsetY {int}
         */
        this.amend = function (_offsetX, _offsetY) {
            var layer = that.getLayer(this.layerIndex);

            if (fullUndo) {
                if (copy) {
                    this.undo();
                } else {
                    /*
                     * We don't need to restore the image at the *source* location as a full undo would do, since
                     * we'll only erase that area again once we redo(). So just restore the data at the dest.
                     */
                    layer.copyBitmapRect(fullUndo, dstRect.left, dstRect.top, dstRect);
                    invalidateFusionRect(dstRect);
                }
            } else {
                /*
                 * We want to make a complete copy of the layer in fullUndo to support fast further amend() calls.
                 */
                this.undo();

                fullUndo = layer.clone();
                srcData = null;
                dstData = null;
            }

            offsetX += _offsetX;
            offsetY += _offsetY;
            this.redo();
        };

        /**
         * Called when we're no longer the top operation in the undo stack, so that we can optimize for lower memory
         * usage instead of faster revision speed
         */
        this.compact = function () {
            if (fullUndo && srcRect.getArea() * 2 < that.width * that.height) {
                // Replace our copy of the entire layer with just a copy of the areas we damaged

                srcData = fullUndo.cloneRect(srcRect);

                if (!copy && dstRect.isInside(srcRect)) {
                    dstData = null;
                } else {
                    dstData = fullUndo.cloneRect(dstRect);
                }

                fullUndo = null;
            }
        };

        this.getMemoryUsed = function () {
            var size = 0;

            if (fullUndo) {
                size += fullUndo.getMemorySize();
            }
            if (srcData) {
                size += srcData.getMemorySize();
            }
            if (dstData) {
                size += dstData.getMemorySize();
            }

            return size;
        };

        this.layerIndex = that.getActiveLayerIndex();
        fullUndo = that.getLayer(this.layerIndex).clone();

        this.redo();
    }

    CPActionMoveSelection.prototype = Object.create(_CPUndo2.default.prototype);
    CPActionMoveSelection.prototype.constructor = CPActionMoveSelection;

    /**
     * Used to encapsulate multiple undo operation as one
     * 
     * @param undoes CPUndo[] List of undo operations to encapsulate
     */
    function CPMultiUndo(undoes) {
        this.undoes = undoes;
    }

    CPMultiUndo.prototype = Object.create(_CPUndo2.default.prototype);
    CPMultiUndo.prototype.constructor = CPMultiUndo;

    CPMultiUndo.prototype.undo = function () {
        for (var i = this.undoes.length - 1; i >= 0; i--) {
            this.undoes[i].undo();
        }
    };

    CPMultiUndo.prototype.redo = function () {
        for (var i = 0; i < this.undoes.length; i++) {
            this.undoes[i].redo();
        }
    };

    CPMultiUndo.prototype.noChange = function () {
        for (var i = 0; i < undoes.length; i++) {
            if (!undoes[i].noChange()) {
                return false;
            }
        }

        return true;
    };

    CPMultiUndo.prototype.getMemoryUsed = function (undone, param) {
        var total = 0;

        for (var i = 0; i < undoes.length; i++) {
            total += undoes[i].getMemoryUsed(undone, param);
        }

        return total;
    };

    /**
     * Store data to undo a cut operation
     * 
     * @param bmp CPColorBmp The rectangle of image data that was cut
     * @param layerIndex int Index of the layer the cut came from
     * @param selection CPRect The cut rectangle co-ordinates
     */
    function CPUndoCut(bmp, layerIndex, selection) {
        selection = selection.clone();

        this.undo = function () {
            that.setActiveLayerIndex(layerIndex);
            curLayer.copyBitmapRect(bmp, selection.left, selection.top, bmp.getBounds());
            that.setSelection(selection);
            invalidateFusionRect(selection);
        };

        this.redo = function () {
            that.setActiveLayerIndex(layerIndex);
            curLayer.clearRect(selection, EMPTY_LAYER_COLOR);
            that.emptySelection();
            invalidateFusionRect(selection);
        };

        this.getMemoryUsed = function (undone, param) {
            return bmp == param ? 0 : bmp.width * bmp.height * _CPColorBmp2.default.BYTES_PER_PIXEL;
        };
    }

    CPUndoCut.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoCut.prototype.constructor = CPUndoCut;

    /**
     * Store data to undo a paste operation
     * 
     * @param clip CPClip
     * @param layerIndex int
     * @param selection CPRect
     */
    function CPUndoPaste(clip, layerIndex, selection) {
        selection = selection.clone();

        this.undo = function () {
            layers.splice(layerIndex + 1, 1);

            that.setActiveLayerIndex(layerIndex);
            that.setSelection(selection);

            invalidateFusionRect(selection);
            callListenersLayerChange();
        };

        this.redo = function () {
            that.setActiveLayerIndex(layerIndex);
            pasteClip(false, clip);
        };

        this.getMemoryUsed = function (undone, param) {
            return clip.bmp == param ? 0 : clip.bmp.width * clip.bmp.height * 4;
        };
    }

    CPUndoPaste.prototype = Object.create(_CPUndo2.default.prototype);
    CPUndoPaste.prototype.constructor = CPUndoPaste;
};

CPArtwork.prototype = Object.create(EventEmitter.prototype);
CPArtwork.prototype.constructor = CPArtwork;

CPArtwork.prototype.getBounds = function () {
    return new _CPRect2.default(0, 0, this.width, this.height);
};

CPArtwork.prototype.isPointWithin = function (x, y) {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};
module.exports = exports["default"];

},{"../util/CPColorFloat":48,"../util/CPPolyfill":49,"../util/CPRandom":51,"../util/CPRect":52,"../util/CPTransform":53,"./CPBlend":4,"./CPBrushInfo":5,"./CPBrushManager":6,"./CPClip":8,"./CPColorBmp":9,"./CPGreyBmp":10,"./CPLayer":11,"./CPUndo":15}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBitmap;

var _CPRect = require("../util/CPRect");

var _CPRect2 = _interopRequireDefault(_CPRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPBitmap(width, height) {
    // Width and height forced to integers
    this.width = width | 0;
    this.height = height | 0;
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

CPBitmap.prototype.getBounds = function () {
    return new _CPRect2.default(0, 0, this.width, this.height);
};

CPBitmap.prototype.isInside = function (x, y) {
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};
module.exports = exports["default"];

},{"../util/CPRect":52}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBlend;
// This file is generated, please see codegenerator/BlendGenerator.js!

function CPBlend() {}

var BYTES_PER_PIXEL = 4,
    ALPHA_BYTE_OFFSET = 3,
    BLEND_MODE_NAMES = ["normal", "multiply", "add", "screen", "lighten", "darken", "subtract", "dodge", "burn", "overlay", "hardLight", "softLight", "vividLight", "linearLight", "pinLight"],
    softLightLUTSquare = new Array(256),
    softLightLUTSquareRoot = new Array(256);

/**
* Blend the given layer onto the fusion using the multiply blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.multiplyOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = color2 - (layer.data[pixIndex] ^ 0xFF) * color2 * alpha1 / (255 * 255) | 0;

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = color2 - (layer.data[pixIndex + 1] ^ 0xFF) * color2 * alpha1 / (255 * 255) | 0;

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = color2 - (layer.data[pixIndex + 2] ^ 0xFF) * color2 * alpha1 / (255 * 255) | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the multiply blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.multiplyOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = color2 - (layer.data[pixIndex] ^ 0xFF) * color2 * alpha1 / (255 * 255) | 0;

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = color2 - (layer.data[pixIndex + 1] ^ 0xFF) * color2 * alpha1 / (255 * 255) | 0;

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = color2 - (layer.data[pixIndex + 2] ^ 0xFF) * color2 * alpha1 / (255 * 255) | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the multiply blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.multiplyOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color1 * alpha1n2 + color2 * alphan12 + color1 * color2 * alpha12 / 255) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color1 * alpha1n2 + color2 * alphan12 + color1 * color2 * alpha12 / 255) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color1 * alpha1n2 + color2 * alphan12 + color1 * color2 * alpha12 / 255) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the multiply blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.multiplyOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color1 * alpha1n2 + color2 * alphan12 + color1 * color2 * alpha12 / 255) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color1 * alpha1n2 + color2 * alphan12 + color1 * color2 * alpha12 / 255) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color1 * alpha1n2 + color2 * alphan12 + color1 * color2 * alpha12 / 255) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the normal blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.normalOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                if (alpha1 == 255) {

                    fusion.data[pixIndex] = layer.data[pixIndex];

                    fusion.data[pixIndex + 1] = layer.data[pixIndex + 1];

                    fusion.data[pixIndex + 2] = layer.data[pixIndex + 2];
                } else {
                    var invAlpha1 = 255 - alpha1;

                    color1 = layer.data[pixIndex];

                    fusion.data[pixIndex] = (color1 * alpha1 + fusion.data[pixIndex] * invAlpha1) / 255 | 0;

                    color1 = layer.data[pixIndex + 1];

                    fusion.data[pixIndex + 1] = (color1 * alpha1 + fusion.data[pixIndex + 1] * invAlpha1) / 255 | 0;

                    color1 = layer.data[pixIndex + 2];

                    fusion.data[pixIndex + 2] = (color1 * alpha1 + fusion.data[pixIndex + 2] * invAlpha1) / 255 | 0;
                }
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the normal blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.normalOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                if (alpha1 == 255) {

                    fusion.data[pixIndex] = layer.data[pixIndex];

                    fusion.data[pixIndex + 1] = layer.data[pixIndex + 1];

                    fusion.data[pixIndex + 2] = layer.data[pixIndex + 2];
                } else {
                    var invAlpha1 = 255 - alpha1;

                    color1 = layer.data[pixIndex];

                    fusion.data[pixIndex] = (color1 * alpha1 + fusion.data[pixIndex] * invAlpha1) / 255 | 0;

                    color1 = layer.data[pixIndex + 1];

                    fusion.data[pixIndex + 1] = (color1 * alpha1 + fusion.data[pixIndex + 1] * invAlpha1) / 255 | 0;

                    color1 = layer.data[pixIndex + 2];

                    fusion.data[pixIndex + 2] = (color1 * alpha1 + fusion.data[pixIndex + 2] * invAlpha1) / 255 | 0;
                }
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the normal blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.normalOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    realAlpha = alpha1 * 255 / newAlpha | 0,
                    invAlpha = 255 - realAlpha;

                fusion.data[pixIndex] = (layer.data[pixIndex] * realAlpha + fusion.data[pixIndex] * invAlpha) / 255;

                fusion.data[pixIndex + 1] = (layer.data[pixIndex + 1] * realAlpha + fusion.data[pixIndex + 1] * invAlpha) / 255;

                fusion.data[pixIndex + 2] = (layer.data[pixIndex + 2] * realAlpha + fusion.data[pixIndex + 2] * invAlpha) / 255;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the normal blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.normalOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    realAlpha = alpha1 * 255 / newAlpha | 0,
                    invAlpha = 255 - realAlpha;

                fusion.data[pixIndex] = (layer.data[pixIndex] * realAlpha + fusion.data[pixIndex] * invAlpha) / 255;

                fusion.data[pixIndex + 1] = (layer.data[pixIndex + 1] * realAlpha + fusion.data[pixIndex + 1] * invAlpha) / 255;

                fusion.data[pixIndex + 2] = (layer.data[pixIndex + 2] * realAlpha + fusion.data[pixIndex + 2] * invAlpha) / 255;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the add blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.addOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                fusion.data[pixIndex] = fusion.data[pixIndex] + alpha1 * layer.data[pixIndex] / 255 | 0;

                fusion.data[pixIndex + 1] = fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1] / 255 | 0;

                fusion.data[pixIndex + 2] = fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2] / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the add blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.addOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                fusion.data[pixIndex] = fusion.data[pixIndex] + alpha1 * layer.data[pixIndex] / 255 | 0;

                fusion.data[pixIndex + 1] = fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1] / 255 | 0;

                fusion.data[pixIndex + 2] = fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2] / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the add blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.addOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                // No need to clamp the color to 0...255 since we're writing to a clamped array anyway

                fusion.data[pixIndex] = (alpha2 * fusion.data[pixIndex] + alpha1 * layer.data[pixIndex]) / newAlpha | 0;

                fusion.data[pixIndex + 1] = (alpha2 * fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1]) / newAlpha | 0;

                fusion.data[pixIndex + 2] = (alpha2 * fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2]) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the add blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.addOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

                // No need to clamp the color to 0...255 since we're writing to a clamped array anyway

                fusion.data[pixIndex] = (alpha2 * fusion.data[pixIndex] + alpha1 * layer.data[pixIndex]) / newAlpha | 0;

                fusion.data[pixIndex + 1] = (alpha2 * fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1]) / newAlpha | 0;

                fusion.data[pixIndex + 2] = (alpha2 * fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2]) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the subtract blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.subtractOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                fusion.data[pixIndex] = fusion.data[pixIndex] + alpha1 * layer.data[pixIndex] / 255 - alpha1 | 0;

                fusion.data[pixIndex + 1] = fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1] / 255 - alpha1 | 0;

                fusion.data[pixIndex + 2] = fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2] / 255 - alpha1 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the subtract blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.subtractOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                fusion.data[pixIndex] = fusion.data[pixIndex] + alpha1 * layer.data[pixIndex] / 255 - alpha1 | 0;

                fusion.data[pixIndex + 1] = fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1] / 255 - alpha1 | 0;

                fusion.data[pixIndex + 2] = fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2] / 255 - alpha1 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the subtract blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.subtractOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2;

                // No need to clamp the color to 255 since we're writing to a clamped array anyway

                fusion.data[pixIndex] = (alpha2 * fusion.data[pixIndex] + alpha1 * layer.data[pixIndex] - alpha12) / newAlpha | 0;

                fusion.data[pixIndex + 1] = (alpha2 * fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1] - alpha12) / newAlpha | 0;

                fusion.data[pixIndex + 2] = (alpha2 * fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2] - alpha12) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the subtract blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.subtractOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2;

                // No need to clamp the color to 255 since we're writing to a clamped array anyway

                fusion.data[pixIndex] = (alpha2 * fusion.data[pixIndex] + alpha1 * layer.data[pixIndex] - alpha12) / newAlpha | 0;

                fusion.data[pixIndex + 1] = (alpha2 * fusion.data[pixIndex + 1] + alpha1 * layer.data[pixIndex + 1] - alpha12) / newAlpha | 0;

                fusion.data[pixIndex + 2] = (alpha2 * fusion.data[pixIndex + 2] + alpha1 * layer.data[pixIndex + 2] - alpha12) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the screen blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.screenOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = 0xFF ^ ((color2 ^ 0xFF) * invAlpha1 + (layer.data[pixIndex] ^ 0xFF) * (color2 ^ 0xFF) * alpha1 / 255) / 255;

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = 0xFF ^ ((color2 ^ 0xFF) * invAlpha1 + (layer.data[pixIndex + 1] ^ 0xFF) * (color2 ^ 0xFF) * alpha1 / 255) / 255;

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = 0xFF ^ ((color2 ^ 0xFF) * invAlpha1 + (layer.data[pixIndex + 2] ^ 0xFF) * (color2 ^ 0xFF) * alpha1 / 255) / 255;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the screen blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.screenOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = 0xFF ^ ((color2 ^ 0xFF) * invAlpha1 + (layer.data[pixIndex] ^ 0xFF) * (color2 ^ 0xFF) * alpha1 / 255) / 255;

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = 0xFF ^ ((color2 ^ 0xFF) * invAlpha1 + (layer.data[pixIndex + 1] ^ 0xFF) * (color2 ^ 0xFF) * alpha1 / 255) / 255;

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = 0xFF ^ ((color2 ^ 0xFF) * invAlpha1 + (layer.data[pixIndex + 2] ^ 0xFF) * (color2 ^ 0xFF) * alpha1 / 255) / 255;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the screen blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.screenOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = 0xFF ^ ((color1 ^ 0xFF) * alpha1n2 + (color2 ^ 0xFF) * alphan12 + (color1 ^ 0xFF) * (color2 ^ 0xFF) * alpha12 / 255) / newAlpha;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = 0xFF ^ ((color1 ^ 0xFF) * alpha1n2 + (color2 ^ 0xFF) * alphan12 + (color1 ^ 0xFF) * (color2 ^ 0xFF) * alpha12 / 255) / newAlpha;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = 0xFF ^ ((color1 ^ 0xFF) * alpha1n2 + (color2 ^ 0xFF) * alphan12 + (color1 ^ 0xFF) * (color2 ^ 0xFF) * alpha12 / 255) / newAlpha;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the screen blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.screenOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = 0xFF ^ ((color1 ^ 0xFF) * alpha1n2 + (color2 ^ 0xFF) * alphan12 + (color1 ^ 0xFF) * (color2 ^ 0xFF) * alpha12 / 255) / newAlpha;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = 0xFF ^ ((color1 ^ 0xFF) * alpha1n2 + (color2 ^ 0xFF) * alphan12 + (color1 ^ 0xFF) * (color2 ^ 0xFF) * alpha12 / 255) / newAlpha;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = 0xFF ^ ((color1 ^ 0xFF) * alpha1n2 + (color2 ^ 0xFF) * alphan12 + (color1 ^ 0xFF) * (color2 ^ 0xFF) * alpha12 / 255) / newAlpha;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the lighten blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.lightenOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = color2 >= color1 ? color2 : (color2 * invAlpha1 + color1 * alpha1) / 255;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = color2 >= color1 ? color2 : (color2 * invAlpha1 + color1 * alpha1) / 255;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = color2 >= color1 ? color2 : (color2 * invAlpha1 + color1 * alpha1) / 255;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the lighten blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.lightenOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = color2 >= color1 ? color2 : (color2 * invAlpha1 + color1 * alpha1) / 255;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = color2 >= color1 ? color2 : (color2 * invAlpha1 + color1 * alpha1) / 255;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = color2 >= color1 ? color2 : (color2 * invAlpha1 + color1 * alpha1) / 255;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the lighten blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.lightenOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,


                // This alpha is used when color1 > color2
                alpha12 = alpha2 * (alpha1 ^ 0xFF) / newAlpha | 0,
                    invAlpha12 = alpha12 ^ 0xFF | 0,


                // This alpha is used when color2 > color1
                alpha21 = alpha1 * (alpha2 ^ 0xFF) / newAlpha | 0,
                    invAlpha21 = alpha21 ^ 0xFF | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 >= color1 ? color1 * alpha21 + color2 * invAlpha21 : color2 * alpha12 + color1 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 >= color1 ? color1 * alpha21 + color2 * invAlpha21 : color2 * alpha12 + color1 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 >= color1 ? color1 * alpha21 + color2 * invAlpha21 : color2 * alpha12 + color1 * invAlpha12) / 255 | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the lighten blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.lightenOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,


                // This alpha is used when color1 > color2
                alpha12 = alpha2 * (alpha1 ^ 0xFF) / newAlpha | 0,
                    invAlpha12 = alpha12 ^ 0xFF | 0,


                // This alpha is used when color2 > color1
                alpha21 = alpha1 * (alpha2 ^ 0xFF) / newAlpha | 0,
                    invAlpha21 = alpha21 ^ 0xFF | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 >= color1 ? color1 * alpha21 + color2 * invAlpha21 : color2 * alpha12 + color1 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 >= color1 ? color1 * alpha21 + color2 * invAlpha21 : color2 * alpha12 + color1 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 >= color1 ? color1 * alpha21 + color2 * invAlpha21 : color2 * alpha12 + color1 * invAlpha12) / 255 | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the darken blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.darkenOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = color2 >= color1 ? (color2 * invAlpha1 + color1 * alpha1) / 255 : color2;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = color2 >= color1 ? (color2 * invAlpha1 + color1 * alpha1) / 255 : color2;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = color2 >= color1 ? (color2 * invAlpha1 + color1 * alpha1) / 255 : color2;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the darken blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.darkenOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = color2 >= color1 ? (color2 * invAlpha1 + color1 * alpha1) / 255 : color2;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = color2 >= color1 ? (color2 * invAlpha1 + color1 * alpha1) / 255 : color2;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = color2 >= color1 ? (color2 * invAlpha1 + color1 * alpha1) / 255 : color2;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the darken blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.darkenOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,


                // This alpha is used when color1 > color2
                alpha12 = alpha1 * (alpha2 ^ 0xFF) / newAlpha | 0,
                    invAlpha12 = alpha12 ^ 0xFF | 0,


                // This alpha is used when color2 > color1
                alpha21 = alpha2 * (alpha1 ^ 0xFF) / newAlpha | 0,
                    invAlpha21 = alpha21 ^ 0xFF | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 >= color1 ? color2 * alpha21 + color1 * invAlpha21 : color1 * alpha12 + color2 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 >= color1 ? color2 * alpha21 + color1 * invAlpha21 : color1 * alpha12 + color2 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 >= color1 ? color2 * alpha21 + color1 * invAlpha21 : color1 * alpha12 + color2 * invAlpha12) / 255 | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the darken blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.darkenOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,


                // This alpha is used when color1 > color2
                alpha12 = alpha1 * (alpha2 ^ 0xFF) / newAlpha | 0,
                    invAlpha12 = alpha12 ^ 0xFF | 0,


                // This alpha is used when color2 > color1
                alpha21 = alpha2 * (alpha1 ^ 0xFF) / newAlpha | 0,
                    invAlpha21 = alpha21 ^ 0xFF | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 >= color1 ? color2 * alpha21 + color1 * invAlpha21 : color1 * alpha12 + color2 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 >= color1 ? color2 * alpha21 + color1 * invAlpha21 : color1 * alpha12 + color2 * invAlpha12) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 >= color1 ? color2 * alpha21 + color1 * invAlpha21 : color1 * alpha12 + color2 * invAlpha12) / 255 | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the dodge blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.dodgeOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 * invAlpha1 + alpha1 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 * invAlpha1 + alpha1 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 * invAlpha1 + alpha1 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the dodge blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.dodgeOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 * invAlpha1 + alpha1 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 * invAlpha1 + alpha1 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 * invAlpha1 + alpha1 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the dodge blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.dodgeOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the dodge blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.dodgeOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 255 ? 255 : Math.min(255, 255 * color2 / (color1 ^ 0xFF) | 0))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the burn blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.burnOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 * invAlpha1 + alpha1 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 * invAlpha1 + alpha1 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 * invAlpha1 + alpha1 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the burn blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.burnOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color2 * invAlpha1 + alpha1 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color2 * invAlpha1 + alpha1 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color2 * invAlpha1 + alpha1 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the burn blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.burnOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the burn blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.burnOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xFF) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xFF) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (color1 * alpha1n2 + color2 * alphan12 + alpha12 * (color1 == 0 ? 0 : Math.min(255, 255 * (color2 ^ 0xFF) / color1) ^ 0xFF)) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the overlay blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.overlayOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + (color2 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + (color2 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + (color2 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the overlay blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.overlayOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xFF;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + (color2 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + (color2 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + (color2 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the overlay blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.overlayOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color2 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color2 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color2 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the overlay blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.overlayOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color2 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color2 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color2 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the hardLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.hardLightOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the hardLight blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.hardLightOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * 2 * color1 * color2 / 255 : alpha1 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the hardLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.hardLightOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the hardLight blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.hardLightOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * 2 * color1 * color2 / 255 : alpha12 * (2 * (color1 ^ 0xff) * (color2 ^ 0xff) / 255 ^ 0xff))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the softLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.softLightOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + alpha1 * (color1 <= 127 ? (2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2 : (2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + alpha1 * (color1 <= 127 ? (2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2 : (2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + alpha1 * (color1 <= 127 ? (2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2 : (2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2)) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the softLight blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.softLightOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + alpha1 * (color1 <= 127 ? (2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2 : (2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + alpha1 * (color1 <= 127 ? (2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2 : (2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + alpha1 * (color1 <= 127 ? (2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2 : (2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2)) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the softLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.softLightOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * ((2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2) : alpha12 * ((2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * ((2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2) : alpha12 * ((2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * ((2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2) : alpha12 * ((2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the softLight blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.softLightOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * ((2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2) : alpha12 * ((2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * ((2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2) : alpha12 * ((2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * ((2 * color1 - 255) * softLightLUTSquare[color2] / 255 + color2) : alpha12 * ((2 * color1 - 255) * softLightLUTSquareRoot[color2] / 255 + color2))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the vividLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.vividLightOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha1 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha1 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha1 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the vividLight blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.vividLightOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha1 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha1 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + (color1 <= 127 ? alpha1 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha1 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the vividLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.vividLightOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha12 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha12 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha12 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the vividLight blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.vividLightOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha12 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha12 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + (color1 <= 127 ? alpha12 * (color1 == 0 ? 0 : 255 - Math.min(255, (255 - color2) * 255 / (2 * color1))) : alpha12 * (color1 == 255 ? 255 : Math.min(255, color2 * 255 / (2 * (255 - color1)))))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the linearLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.linearLightOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + alpha1 * Math.min(255, Math.max(0, color2 + 2 * layer.data[pixIndex] - 255))) / 255 | 0;

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + alpha1 * Math.min(255, Math.max(0, color2 + 2 * layer.data[pixIndex + 1] - 255))) / 255 | 0;

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + alpha1 * Math.min(255, Math.max(0, color2 + 2 * layer.data[pixIndex + 2] - 255))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the linearLight blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.linearLightOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + alpha1 * Math.min(255, Math.max(0, color2 + 2 * layer.data[pixIndex] - 255))) / 255 | 0;

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + alpha1 * Math.min(255, Math.max(0, color2 + 2 * layer.data[pixIndex + 1] - 255))) / 255 | 0;

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + alpha1 * Math.min(255, Math.max(0, color2 + 2 * layer.data[pixIndex + 2] - 255))) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the linearLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.linearLightOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * Math.min(255, Math.max(0, color2 + 2 * color1 - 255))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * Math.min(255, Math.max(0, color2 + 2 * color1 - 255))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * Math.min(255, Math.max(0, color2 + 2 * color1 - 255))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the linearLight blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.linearLightOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * Math.min(255, Math.max(0, color2 + 2 * color1 - 255))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * Math.min(255, Math.max(0, color2 + 2 * color1 - 255))) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * Math.min(255, Math.max(0, color2 + 2 * color1 - 255))) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the pinLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.pinLightOntoOpaqueFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + alpha1 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + alpha1 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + alpha1 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the pinLight blending operator.
* 
* Fusion pixels must be opaque, and the fusion layer's opacity must be set to 100.
*/

CPBlend.pinLightOntoOpaqueFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {

                var invAlpha1 = alpha1 ^ 0xff;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (invAlpha1 * color2 + alpha1 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (invAlpha1 * color2 + alpha1 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / 255 | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (invAlpha1 * color2 + alpha1 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / 255 | 0;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the pinLight blending operator.
* 
* The layer must have its layer alpha set to 100
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.pinLightOntoTransparentFusionWithOpaqueLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET];

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

/**
* Blend the given layer onto the fusion using the pinLight blending operator.
* 
* Fusion can contain transparent pixels, but the fusion layer's opacity must be set to 100.
*/

CPBlend.pinLightOntoTransparentFusionWithTransparentLayer = function (layer, fusion, rect) {
    var h = rect.getHeight() | 0,
        w = rect.getWidth() | 0,
        yStride = (layer.width - w) * BYTES_PER_PIXEL | 0,
        pixIndex = layer.offsetOfPixel(rect.left, rect.top) | 0;

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += BYTES_PER_PIXEL) {
            var alpha1, alpha2, color1, color2;

            alpha1 = layer.data[pixIndex + ALPHA_BYTE_OFFSET] * layer.alpha / 100 | 0;

            if (alpha1) {
                alpha2 = fusion.data[pixIndex + ALPHA_BYTE_OFFSET];

                var newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0,
                    alpha12 = alpha1 * alpha2 / 255 | 0,
                    alpha1n2 = alpha1 * (alpha2 ^ 0xff) / 255 | 0,
                    alphan12 = (alpha1 ^ 0xff) * alpha2 / 255 | 0;

                color1 = layer.data[pixIndex];

                color2 = fusion.data[pixIndex];

                fusion.data[pixIndex] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 1];

                color2 = fusion.data[pixIndex + 1];

                fusion.data[pixIndex + 1] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / newAlpha | 0;

                color1 = layer.data[pixIndex + 2];

                color2 = fusion.data[pixIndex + 2];

                fusion.data[pixIndex + 2] = (alpha1n2 * color1 + alphan12 * color2 + alpha12 * (color2 >= 2 * color1 ? 2 * color1 : color2 <= 2 * color1 - 255 ? 2 * color1 - 255 : color2)) / newAlpha | 0;

                fusion.data[pixIndex + ALPHA_BYTE_OFFSET] = newAlpha;
            }
        }
    }
};

CPBlend.LM_NORMAL = 0;
CPBlend.LM_MULTIPLY = 1;
CPBlend.LM_ADD = 2;
CPBlend.LM_SCREEN = 3;
CPBlend.LM_LIGHTEN = 4;
CPBlend.LM_DARKEN = 5;
CPBlend.LM_SUBTRACT = 6;
CPBlend.LM_DODGE = 7;
CPBlend.LM_BURN = 8;
CPBlend.LM_OVERLAY = 9;
CPBlend.LM_HARDLIGHT = 10;
CPBlend.LM_SOFTLIGHT = 11;
CPBlend.LM_VIVIDLIGHT = 12;
CPBlend.LM_LINEARLIGHT = 13;
CPBlend.LM_PINLIGHT = 14;

/**
 * Fuse the given layer on top of the given fusion layer, using the blending operation defined in the layer.
 *
 * @param {CPLayer} fusion - Layer to fuse on top of
 * @param {boolean} fusionHasTransparency - True if the fusion layer has alpha < 100, or any transparent pixels.
 * @param {CPLayer} layer - Layer that should be drawn on top of the fusion
 * @param {CPRect} rect - The rectangle of pixels that should be fused.
 */
CPBlend.fuseLayer = function (fusion, fusionHasTransparency, layer, rect) {
    if (layer.alpha <= 0) {
        return;
    }

    var funcName = BLEND_MODE_NAMES[layer.blendMode] + "Onto";

    if (fusion.alpha < 100) {
        throw "Fusion layer alpha < 100 not supported.";
    }

    if (fusionHasTransparency) {
        funcName += "TransparentFusion";
    } else {
        funcName += "OpaqueFusion";
    }

    if (layer.alpha == 100) {
        funcName += "WithOpaqueLayer";
    } else {
        funcName += "WithTransparentLayer";
    }

    fusion.getBounds().clip(rect);

    this[funcName](layer, fusion, rect);
};
function makeLookupTables() {
    // V - V^2 table
    for (var i = 0; i < 256; i++) {
        var v = i / 255;

        softLightLUTSquare[i] = (v - v * v) * 255 | 0;
    }

    // sqrt(V) - V table
    for (var i = 0; i < 256; i++) {
        var v = i / 255;

        softLightLUTSquareRoot[i] = (Math.sqrt(v) - v) * 255 | 0;
    }
}
makeLookupTables();
module.exports = exports["default"];

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBrushInfo;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPBrushInfo(properties) {
    // Set brush setting fields with default values, then apply the supplied 'properties' on top
    for (var propName in CPBrushInfo.DEFAULTS) {
        if (CPBrushInfo.DEFAULTS.hasOwnProperty(propName)) {
            this[propName] = CPBrushInfo.DEFAULTS[propName];
        }
    }

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            this[propName] = properties[propName];
        }
    }
}

// Stroke modes
CPBrushInfo.SM_FREEHAND = 0;
CPBrushInfo.SM_LINE = 1;
CPBrushInfo.SM_BEZIER = 2;

// Brush dab types
CPBrushInfo.B_ROUND_PIXEL = 0;
CPBrushInfo.B_ROUND_AA = 1;
CPBrushInfo.B_ROUND_AIRBRUSH = 2;
CPBrushInfo.B_SQUARE_PIXEL = 3;
CPBrushInfo.B_SQUARE_AA = 4;

// painting modes
CPBrushInfo.M_PAINT = 0;
CPBrushInfo.M_ERASE = 1;
CPBrushInfo.M_DODGE = 2;
CPBrushInfo.M_BURN = 3;
CPBrushInfo.M_WATER = 4;
CPBrushInfo.M_BLUR = 5;
CPBrushInfo.M_SMUDGE = 6;
CPBrushInfo.M_OIL = 7;

CPBrushInfo.DEFAULTS = {
    isAA: false, isAirbrush: false,
    minSpacing: 0, spacing: 0,

    pressureSize: true,
    pressureAlpha: false,
    pressureScattering: false,

    type: 0, paintMode: 0,
    strokeMode: CPBrushInfo.SM_FREEHAND,
    resat: 1.0, bleed: 0.0,

    texture: 1.0,

    // "cur" values are current brush settings (once tablet pressure and stuff is applied)
    size: 0, curSize: 0,
    alpha: 0, curAlpha: 0,
    scattering: 0.0, curScattering: 0,
    squeeze: 0.0, curSqueeze: 0,
    angle: Math.PI, curAngle: 0,

    smoothing: 0.0
};

CPBrushInfo.prototype.applyPressure = function (pressure) {
    // FIXME: no variable size for smudge and oil :(
    if (this.pressureSize && this.paintMode != CPBrushInfo.M_SMUDGE && this.paintMode != CPBrushInfo.M_OIL) {
        this.curSize = Math.max(0.1, this.size * pressure);
    } else {
        this.curSize = Math.max(0.1, this.size);
    }

    // FIXME: what is the point of doing that?
    if (this.curSize > 16) {
        this.curSize = Math.floor(this.curSize);
    }

    this.curAlpha = this.pressureAlpha ? Math.floor(this.alpha * Math.min(pressure, 1.0)) : this.alpha;
    this.curSqueeze = this.squeeze;
    this.curAngle = this.angle;
    this.curScattering = this.scattering * this.curSize * (this.pressureScattering ? pressure : 1.0);
};

CPBrushInfo.prototype.clone = function () {
    return new CPBrushInfo(this);
};
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBrushManager;

var _CPBrushInfo = require("./CPBrushInfo");

var _CPBrushInfo2 = _interopRequireDefault(_CPBrushInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPBrushManager() {
    var MAX_SQUEEZE = 10,
        BRUSH_MAX_DIM = 201,
        BRUSH_AA_MAX_DIM = 202;

    /*CPBrushDab {
        // the brush
        Uint8Array brush;
        int width, height;
        
        // and where and how to apply it
        int x, y, alpha;
    }*/

    var brush = new Uint8Array(BRUSH_MAX_DIM * BRUSH_MAX_DIM),
        brushAA = new Uint8Array(BRUSH_AA_MAX_DIM * BRUSH_AA_MAX_DIM),
        cacheBrush = null,
        cacheSize,
        cacheSqueeze,
        cacheAngle,
        cacheType,
        that = this;

    /**
     * Shift a brush by a positive sub-pixel amount (dx, dy) [0..1), and return the new brush. 
     * 
     * The resulting brush array is 1 pixel larger than the original one in both dimensions.
     */
    function getBrushWithAA(brushInfo, dx, dy) {
        var nonAABrush = getBrush(brushInfo),
            intSize = Math.ceil(brushInfo.curSize),
            intSizeAA = Math.ceil(brushInfo.curSize) + 1;

        for (var x = 0; x < intSizeAA * intSizeAA; x++) {
            brushAA[x] = 0;
        }

        var invdx_invdy = (1 - dx) * (1 - dy),
            dx_invdy = dx * (1 - dy),
            dx_dy = dx * dy,
            invdx_dy = (1 - dx) * dy,
            srcIndex = 0,
            dstIndex = 0;

        for (var y = 0; y < intSize; y++) {
            for (var x = 0; x < intSize; x++) {
                var brushAlpha = nonAABrush[srcIndex];

                /* 
                 * Use a weighted sum to shift the source pixels's position by a sub-pixel amount dx, dy and accumulate
                 * it into the final brushAA array.
                 */
                brushAA[dstIndex] += ~~(brushAlpha * invdx_invdy);
                brushAA[dstIndex + 1] += ~~(brushAlpha * dx_invdy);
                brushAA[dstIndex + 1 + intSizeAA] += ~~(brushAlpha * dx_dy);
                brushAA[dstIndex + intSizeAA] += ~~(brushAlpha * invdx_dy);

                srcIndex++;
                dstIndex++;
            }
            dstIndex += intSizeAA - intSize;
        }

        return brushAA;
    }

    function buildBrush(brush, brushInfo) {
        var intSize = Math.ceil(brushInfo.curSize),
            center = intSize / 2.0,
            sqrRadius = brushInfo.curSize / 2 * (brushInfo.curSize / 2),
            xFactor = 1.0 + brushInfo.curSqueeze * MAX_SQUEEZE,
            cosA = Math.cos(brushInfo.curAngle),
            sinA = Math.sin(brushInfo.curAngle),
            offset = 0;

        for (var j = 0; j < intSize; j++) {
            for (var i = 0; i < intSize; i++) {
                var x = i + 0.5 - center,
                    y = j + 0.5 - center,
                    dx = (x * cosA - y * sinA) * xFactor,
                    dy = y * cosA + x * sinA,
                    sqrDist = dx * dx + dy * dy;

                if (sqrDist <= sqrRadius) {
                    brush[offset++] = 0xFF;
                } else {
                    brush[offset++] = 0;
                }
            }
        }

        return brush;
    }

    function buildBrushAA(brush, brushInfo) {
        var intSize = Math.ceil(brushInfo.curSize),
            center = intSize / 2.0,
            sqrRadius = brushInfo.curSize / 2 * (brushInfo.curSize / 2),
            sqrRadiusInner = (brushInfo.curSize - 2) / 2 * ((brushInfo.curSize - 2) / 2),
            sqrRadiusOuter = (brushInfo.curSize + 2) / 2 * ((brushInfo.curSize + 2) / 2),
            xFactor = 1.0 + brushInfo.curSqueeze * MAX_SQUEEZE,
            cosA = Math.cos(brushInfo.curAngle),
            sinA = Math.sin(brushInfo.curAngle),
            offset = 0;

        for (var j = 0; j < intSize; j++) {
            for (var i = 0; i < intSize; i++) {
                var x = i + 0.5 - center,
                    y = j + 0.5 - center,
                    dx = (x * cosA - y * sinA) * xFactor,
                    dy = y * cosA + x * sinA,
                    sqrDist = dx * dx + dy * dy;

                if (sqrDist <= sqrRadiusInner) {
                    brush[offset++] = 0xFF;
                } else if (sqrDist > sqrRadiusOuter) {
                    brush[offset++] = 0;
                } else {
                    var count = 0;

                    for (var oy = 0; oy < 4; oy++) {
                        for (var ox = 0; ox < 4; ox++) {
                            x = i + ox * (1.0 / 4.0) - center;
                            y = j + oy * (1.0 / 4.0) - center;
                            dx = (x * cosA - y * sinA) * xFactor;
                            dy = y * cosA + x * sinA;

                            sqrDist = dx * dx + dy * dy;
                            if (sqrDist <= sqrRadius) {
                                count += 1;
                            }
                        }
                    }
                    brush[offset++] = Math.min(count * 16, 255);
                }
            }
        }

        return brush;
    }

    function buildBrushSquare(brush, brushInfo) {
        var intSize = Math.ceil(brushInfo.curSize),
            center = intSize / 2.0,
            size = brushInfo.curSize * Math.sin(Math.PI / 4),
            sizeX = size / 2 / (1.0 + brushInfo.curSqueeze * MAX_SQUEEZE),
            sizeY = size / 2,
            cosA = Math.cos(brushInfo.curAngle),
            sinA = Math.sin(brushInfo.curAngle),
            offset = 0;

        for (var j = 0; j < intSize; j++) {
            for (var i = 0; i < intSize; i++) {
                var x = i + 0.5 - center,
                    y = j + 0.5 - center,
                    dx = Math.abs(x * cosA - y * sinA),
                    dy = Math.abs(y * cosA + x * sinA);

                if (dx <= sizeX && dy <= sizeY) {
                    brush[offset++] = 0xFF;
                } else {
                    brush[offset++] = 0;
                }
            }
        }

        return brush;
    }

    function buildBrushSquareAA(brush, brushInfo) {
        var intSize = Math.ceil(brushInfo.curSize),
            center = intSize / 2.0,
            size = brushInfo.curSize * Math.sin(Math.PI / 4),
            sizeX = size / 2 / (1.0 + brushInfo.curSqueeze * MAX_SQUEEZE),
            sizeY = size / 2,
            sizeXInner = sizeX - 1,
            sizeYInner = sizeY - 1,
            sizeXOuter = sizeX + 1,
            sizeYOuter = sizeY + 1,
            cosA = Math.cos(brushInfo.curAngle),
            sinA = Math.sin(brushInfo.curAngle),
            offset = 0;

        for (var j = 0; j < intSize; j++) {
            for (var i = 0; i < intSize; i++) {
                var x = i + 0.5 - center,
                    y = j + 0.5 - center,
                    dx = Math.abs(x * cosA - y * sinA),
                    dy = Math.abs(y * cosA + x * sinA);

                if (dx <= sizeXInner && dy <= sizeYInner) {
                    brush[offset++] = 0xFF;
                } else if (dx > sizeXOuter || dy > sizeYOuter) {
                    brush[offset++] = 0;
                } else {
                    var count = 0;

                    for (var oy = 0; oy < 4; oy++) {
                        for (var ox = 0; ox < 4; ox++) {
                            x = i + ox * (1.0 / 4.0) - center;
                            y = j + oy * (1.0 / 4.0) - center;
                            dx = Math.abs(x * cosA - y * sinA);
                            dy = Math.abs(y * cosA + x * sinA);

                            if (dx <= sizeX && dy <= sizeY) {
                                count++;
                            }
                        }
                    }
                    brush[offset++] = Math.min(count * 16, 255);
                }
            }
        }

        return brush;
    }

    function buildBrushSoft(brush, brushInfo) {
        var intSize = Math.ceil(brushInfo.curSize),
            center = intSize / 2.0,
            sqrRadius = brushInfo.curSize / 2 * (brushInfo.curSize / 2),
            xFactor = 1.0 + brushInfo.curSqueeze * MAX_SQUEEZE,
            cosA = Math.cos(brushInfo.curAngle),
            sinA = Math.sin(brushInfo.curAngle),
            offset = 0;

        for (var j = 0; j < intSize; j++) {
            for (var i = 0; i < intSize; i++) {
                var x = i + 0.5 - center,
                    y = j + 0.5 - center,
                    dx = (x * cosA - y * sinA) * xFactor,
                    dy = y * cosA + x * sinA,
                    sqrDist = dx * dx + dy * dy;

                if (sqrDist <= sqrRadius) {
                    brush[offset++] = ~~(255 * (1 - sqrDist / sqrRadius));
                } else {
                    brush[offset++] = 0;
                }
            }
        }

        return brush;
    }

    /**
     * Build and return a brush that conforms to the given brush settings.
     * 
     * @returns a Uint8Array
     */
    function getBrush(brushInfo) {
        if (cacheBrush != null && brushInfo.curSize == cacheSize && brushInfo.curSqueeze == cacheSqueeze && brushInfo.curAngle == cacheAngle && brushInfo.type == cacheType) {
            return cacheBrush;
        }

        switch (brushInfo.type) {
            case _CPBrushInfo2.default.B_ROUND_AIRBRUSH:
                brush = buildBrushSoft(brush, brushInfo);
                break;
            case _CPBrushInfo2.default.B_ROUND_AA:
                brush = buildBrushAA(brush, brushInfo);
                break;
            case _CPBrushInfo2.default.B_ROUND_PIXEL:
                brush = buildBrush(brush, brushInfo);
                break;
            case _CPBrushInfo2.default.B_SQUARE_AA:
                brush = buildBrushSquareAA(brush, brushInfo);
                break;
            case _CPBrushInfo2.default.B_SQUARE_PIXEL:
                brush = buildBrushSquare(brush, brushInfo);
                break;
        }

        cacheBrush = brush;
        cacheSize = brushInfo.curSize;
        cacheType = brushInfo.type;
        cacheSqueeze = brushInfo.curSqueeze;
        cacheAngle = brushInfo.curAngle;

        return brush;
    }

    function applyTexture(dab, textureAmount) {
        var amount = Math.floor(textureAmount * 255),
            texture = that.texture,
            textureX = dab.x % texture.width,
            textureY = dab.y % texture.height,
            brushPos = 0,
            texturePos,
            textureEOL;

        if (textureX < 0) {
            textureX += texture.width;
        }

        if (textureY < 0) {
            textureY += texture.height;
        }

        for (var y = 0; y < dab.height; y++) {
            texturePos = textureY * texture.width + textureX;
            textureEOL = textureY * texture.width + texture.width;

            for (var x = 0; x < dab.width; x++) {
                var brushValue = dab.brush[brushPos],
                    textureValue = texture.data[texturePos];

                dab.brush[brushPos] = ~~(brushValue * (textureValue * amount / 255 ^ 0xff) / 255);

                brushPos++;

                texturePos++;
                if (texturePos == textureEOL) {
                    // Wrap to left side of texture
                    texturePos -= texture.width;
                }
            }

            textureY++;
            if (textureY == texture.height) {
                textureY = 0;
            }
        }
    }

    /**
     * @param x float
     * @param y float
     * brushInfo - a CPBrushInfo object
     */
    this.getDab = function (x, y, brushInfo) {
        var dab = {
            alpha: brushInfo.curAlpha,
            width: Math.ceil(brushInfo.curSize),
            height: Math.ceil(brushInfo.curSize)
        };

        // FIXME: I don't like this special case for ROUND_PIXEL
        // it would be better to have brush presets for working with pixels
        var useAA = brushInfo.isAA && brushInfo.type != _CPBrushInfo2.default.B_ROUND_PIXEL;

        if (useAA) {
            dab.width++;
            dab.height++;
        }

        var nx = x - dab.width / 2.0 + 0.5,
            ny = y - dab.height / 2.0 + 0.5;

        // this is necessary as Java uses convert towards zero float to int conversion
        if (nx < 0) {
            nx -= 1;
        }
        if (ny < 0) {
            ny -= 1;
        }

        if (useAA) {
            var dx = Math.abs(nx - ~~nx),
                dy = Math.abs(ny - ~~ny);

            dab.brush = getBrushWithAA(brushInfo, dx, dy);
        } else {
            dab.brush = getBrush(brushInfo);
        }

        dab.x = ~~nx;
        dab.y = ~~ny;

        if (brushInfo.texture > 0.0 && this.texture != null) {
            // we need a brush bitmap that can be modified everytime
            // the one in "brush" can be kept in cache so if we are using it, make a copy
            if (dab.brush == brush) {
                brushAA.set(brush);
                dab.brush = brushAA;
            }
            applyTexture(dab, brushInfo.texture);
        }

        return dab;
    };

    this.setTexture = function (texture) {
        this.texture = texture;
    };
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

module.exports = exports["default"];

},{"./CPBrushInfo":5}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPChibiFile;

var _CPArtwork = require("./CPArtwork");

var _CPArtwork2 = _interopRequireDefault(_CPArtwork);

var _CPLayer = require("./CPLayer");

var _CPLayer2 = _interopRequireDefault(_CPLayer);

var _CPColorBmp = require("./CPColorBmp");

var _CPColorBmp2 = _interopRequireDefault(_CPColorBmp);

var _ArrayDataStream = require("../util/ArrayDataStream");

var _ArrayDataStream2 = _interopRequireDefault(_ArrayDataStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint

    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.

    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPChibiFile() {

    function CPChibiHeader(stream, chunk) {
        this.version = stream.readU32BE();
        this.width = stream.readU32BE();
        this.height = stream.readU32BE();
        this.layersNb = stream.readU32BE();
    }

    CPChibiHeader.FIXED_HEADER_LENGTH = 4 * 4;

    function CPChibiChunkHeader(stream) {
        var chunkType = new Array(4);

        for (var i = 0; i < chunkType.length; i++) {
            chunkType[i] = String.fromCharCode(stream.readByte());
        }

        this.chunkType = chunkType.join("");
        this.chunkSize = stream.readU32BE();

        if (stream.eof) {
            throw "Truncated chunk";
        }
    }

    function CPChibiLayerChunkHeader() {
        var payloadOffset, titleLength;

        this.readFixedHeader = function (stream) {
            payloadOffset = stream.readU32BE();

            this.blendMode = stream.readU32BE();
            this.alpha = stream.readU32BE();
            this.visible = (stream.readU32BE() & 1) != 0;

            titleLength = stream.readU32BE();
        };

        /* 
         * After reading the fixed header, use this function to find out how many more bytes of header
         * need to be read.
         */
        this.getVariableHeaderLen = function () {
            return payloadOffset - CPChibiLayerChunkHeader.FIXED_HEADER_LENGTH;
        };

        this.getTotalHeaderLen = function () {
            return CPChibiLayerChunkHeader.FIXED_HEADER_LENGTH + this.getVariableHeaderLen();
        };

        this.readVariableHeader = function (stream) {
            this.name = stream.readString(titleLength);

            // Skip to the pixel data (allows additional header fields to be added that we don't yet support)
            stream.skip(payloadOffset - titleLength - CPChibiLayerChunkHeader.FIXED_HEADER_LENGTH);
        };
    }

    // The size of the initial, fixed-length portion of the header
    CPChibiLayerChunkHeader.FIXED_HEADER_LENGTH = 4 * 5;

    var CHI_MAGIC = "CHIBIOEK",
        CHUNK_TAG_HEAD = "HEAD",
        CHUNK_TAG_LAYER = "LAYR",
        CHUNK_TAG_END = "ZEND",
        BYTES_PER_PIXEL = _CPColorBmp2.default.BYTES_PER_PIXEL,
        ALPHA_BYTE_OFFSET = _CPColorBmp2.default.ALPHA_BYTE_OFFSET,
        RED_BYTE_OFFSET = _CPColorBmp2.default.RED_BYTE_OFFSET,
        GREEN_BYTE_OFFSET = _CPColorBmp2.default.GREEN_BYTE_OFFSET,
        BLUE_BYTE_OFFSET = _CPColorBmp2.default.BLUE_BYTE_OFFSET;

    function serializeEndChunk() {
        var buffer = new Uint8Array(CHUNK_TAG_END.length + 4),
            stream = new _ArrayDataStream2.default(buffer);

        stream.writeString(CHUNK_TAG_END);
        stream.writeU32BE(0);

        return stream.getAsDataArray();
    }

    function serializeHeaderChunk(artwork) {
        var buffer = new Uint8Array(CHUNK_TAG_HEAD.length + 4 * 5),
            stream = new _ArrayDataStream2.default(buffer);

        stream.writeString(CHUNK_TAG_HEAD);
        stream.writeU32BE(16); // ChunkSize

        stream.writeU32BE(0); // Current Version: Major: 0 Minor: 0
        stream.writeU32BE(artwork.width);
        stream.writeU32BE(artwork.height);
        stream.writeU32BE(artwork.getLayerCount());

        return stream.getAsDataArray();
    }

    function serializeLayerChunk(layer) {
        var chunkSize = 20 + layer.name.length + layer.data.length,
            buffer = new Uint8Array(CHUNK_TAG_LAYER.length + 4 + chunkSize),
            stream = new _ArrayDataStream2.default(buffer),
            pos;

        stream.writeString(CHUNK_TAG_LAYER); // Chunk ID
        stream.writeU32BE(chunkSize); // ChunkSize

        stream.writeU32BE(20 + layer.name.length); // Offset to layer data from start of header

        stream.writeU32BE(layer.blendMode);
        stream.writeU32BE(layer.alpha);
        stream.writeU32BE(layer.visible ? 1 : 0); // layer visibility and future flags

        stream.writeU32BE(layer.name.length);
        stream.writeString(layer.name);

        // Convert layer bytes from RGBA to ARGB order to match the Chibi specs
        pos = stream.pos;
        for (var i = 0; i < layer.data.length; i += BYTES_PER_PIXEL) {
            buffer[pos++] = layer.data[i + ALPHA_BYTE_OFFSET];
            buffer[pos++] = layer.data[i + RED_BYTE_OFFSET];
            buffer[pos++] = layer.data[i + GREEN_BYTE_OFFSET];
            buffer[pos++] = layer.data[i + BLUE_BYTE_OFFSET];
        }

        return buffer;
    }

    /**
     * Serialize the given artwork to Chibifile format. Returns a promise which resolves to the serialized Blob.
     */
    this.serialize = function (artwork) {
        return new Promise(function (resolve, reject) {
            var deflator = new window.pako.Deflate({
                level: 7
            }),
                blobParts = [],
                magic = new Uint8Array(CHI_MAGIC.length);

            // The magic file signature is not ZLIB compressed:
            for (var i = 0; i < CHI_MAGIC.length; i++) {
                magic[i] = CHI_MAGIC.charCodeAt(i);
            }
            blobParts.push(magic);

            // The rest gets compressed
            deflator.push(serializeHeaderChunk(artwork), false);

            var layers = artwork.getLayers(),
                i = 0;

            // Insert a settimeout between each serialized layer, so we can maintain browser responsiveness

            function serializeLayer() {
                if (i == layers.length) {
                    deflator.push(serializeEndChunk(artwork), true);

                    blobParts.push(deflator.result);

                    resolve(new Blob(blobParts, { type: "application/octet-stream" }));
                } else {
                    deflator.push(serializeLayerChunk(layers[i++]), false);

                    setTimeout(serializeLayer, 10);
                }
            }

            setTimeout(serializeLayer, 10);
        });
    };

    function hasChibiMagicMarker(array) {
        for (var i = 0; i < CHI_MAGIC.length; i++) {
            if (array[i] != CHI_MAGIC.charCodeAt(i)) {
                return false;
            }
        }

        return true;
    }

    /**
     * Concat two Uint8Arrays to make a new one and return it.
     * 
     * Either one may be set to null. If either one is null, the other is returned. If both are null, null is
     * returned.
     */
    function concatBuffers(one, two) {
        if (one == null || one.length == 0) {
            return two;
        }
        if (two == null || two.length == 0) {
            return one;
        }

        var result = new Uint8Array(one.length + two.length);

        result.set(one, 0);
        result.set(two, one.length);

        return result;
    }

    /**
     * Attempt to load a chibifile from the given arraybuffer.
     *
     * @returns A CPArtwork on success, or null on failure.
     */
    this.read = function (arrayBuffer) {
        var STATE_WAIT_FOR_CHUNK = 0,
            STATE_DECODE_IMAGE_HEADER = 1,
            STATE_DECODE_LAYER_HEADER_FIXED = 2,
            STATE_DECODE_LAYER_HEADER_VARIABLE = 3,
            STATE_DECODE_LAYER = 4,
            STATE_SKIP_TRAILING_CHUNK_BYTES = 5,
            STATE_SUCCESS = 6,
            STATE_FATAL = 10;

        var pako = new window.pako.Inflate({}),
            state = STATE_WAIT_FOR_CHUNK,
            artwork = null,
            layerHeader,
            layer,
            layerBytesRead,
            layerBytesTotal,
            skipCount,
            headerChunk = null,
            header = null,
            chunk = null,
            buffer = null;

        /**
         * Decode A,R,G,B pixels from the given buffer into the R,G,B,A pixel array given by layerPix.
         * 
         * The layerBytesRead and layerBytesTotal variables are used to keep track of the decode process and to 
         * limit the number of bytes read, respectively.
         * 
         * Returns the buffer with the read bytes removed from the front, or null if the buffer was read in its entirety.
         */
        function decodePixels(buffer, layerPix) {
            var subpixel = layerBytesRead % BYTES_PER_PIXEL,
                dstPixelStartOffset = layerBytesRead - subpixel,
                bufferPos = 0,


            // Map from source channel order to CPLayer's dest order
            channelMap = [ALPHA_BYTE_OFFSET, RED_BYTE_OFFSET, GREEN_BYTE_OFFSET, BLUE_BYTE_OFFSET];

            // The first pixel might be a partial one since we might be continuing a pixel split over buffers
            for (; subpixel < BYTES_PER_PIXEL && bufferPos < buffer.length; subpixel++) {
                layerPix[dstPixelStartOffset + channelMap[subpixel]] = buffer[bufferPos];
                layerBytesRead++;
                bufferPos++;
            }

            // How many more pixels are we to read in this buffer?
            var bytesRemain = Math.min(buffer.length - bufferPos, layerBytesTotal - layerBytesRead) | 0,
                fullPixelsRemain = bytesRemain / BYTES_PER_PIXEL | 0,
                subpixelsRemain = bytesRemain % BYTES_PER_PIXEL;

            for (var i = 0; i < fullPixelsRemain; i++) {
                layerPix[layerBytesRead + ALPHA_BYTE_OFFSET] = buffer[bufferPos];
                layerPix[layerBytesRead + RED_BYTE_OFFSET] = buffer[bufferPos + 1];
                layerPix[layerBytesRead + GREEN_BYTE_OFFSET] = buffer[bufferPos + 2];
                layerPix[layerBytesRead + BLUE_BYTE_OFFSET] = buffer[bufferPos + 3];
                layerBytesRead += BYTES_PER_PIXEL;
                bufferPos += BYTES_PER_PIXEL;
            }

            // Read a fractional pixel at the end of the buffer
            dstPixelStartOffset = layerBytesRead;
            for (subpixel = 0; subpixel < subpixelsRemain; subpixel++) {
                layerPix[dstPixelStartOffset + channelMap[subpixel]] = buffer[bufferPos];
                layerBytesRead++;
                bufferPos++;
            }

            if (bufferPos < buffer.length) {
                // Layer was completed before the end of the buffer, there is buffer left over for someone else to use
                return buffer.subarray(bufferPos);
            } else {
                // Buffer exhausted
                return null;
            }
        }

        function processBlock(block) {
            var stream;

            // Add a loop here so we can re-enter the switch with 'continue'
            while (true) {
                switch (state) {
                    case STATE_WAIT_FOR_CHUNK:
                        buffer = concatBuffers(buffer, block);
                        block = null;

                        // Wait for whole chunk header to become available
                        if (!buffer || buffer.length < 8) {
                            break;
                        }

                        // Decode chunk header
                        stream = new _ArrayDataStream2.default(buffer);
                        chunk = new CPChibiChunkHeader(stream);

                        // Remove the chunk header from the start of the buffer
                        buffer = buffer.subarray(stream.pos);

                        if (headerChunk) {
                            if (chunk.chunkType == CHUNK_TAG_END) {
                                state = STATE_SUCCESS;
                                break;
                            } else if (chunk.chunkType == CHUNK_TAG_LAYER) {
                                state = STATE_DECODE_LAYER_HEADER_FIXED;
                            } else {
                                console.log("Unknown chunk type '" + chunk.chunkType + "', attempting to skip...");

                                block = buffer;
                                buffer = null;

                                skipCount = chunk.chunkSize;
                                state = STATE_SKIP_TRAILING_CHUNK_BYTES;
                            }

                            continue;
                        } else if (chunk.chunkType == CHUNK_TAG_HEAD) {
                            headerChunk = chunk;

                            // Try to decode the header
                            state = STATE_DECODE_IMAGE_HEADER;
                            continue;
                        } else {
                            // File didn't start with image header chunk
                            state = STATE_FATAL;
                        }
                        break;
                    case STATE_DECODE_IMAGE_HEADER:
                        buffer = concatBuffers(buffer, block);
                        block = null;

                        // Wait for whole chunk to be available
                        if (!buffer || buffer.length < headerChunk.chunkSize) {
                            break;
                        }

                        stream = new _ArrayDataStream2.default(buffer);
                        header = new CPChibiHeader(stream, headerChunk);

                        if (header.version >>> 16 > 0) {
                            state = STATE_FATAL; // the file version is higher than what we can deal with, bail out
                            break;
                        }

                        artwork = new _CPArtwork2.default(header.width, header.height);

                        block = buffer;
                        buffer = null;

                        skipCount = headerChunk.chunkSize; // Skip the header chunk along with any trailing bytes
                        state = STATE_SKIP_TRAILING_CHUNK_BYTES;
                        continue;
                        break;
                    case STATE_DECODE_LAYER_HEADER_FIXED:
                        buffer = concatBuffers(buffer, block);
                        block = null;

                        // Wait for first part of header to arrive
                        if (!buffer || buffer.length < CPChibiLayerChunkHeader.FIXED_HEADER_LENGTH) {
                            break;
                        }

                        layerHeader = new CPChibiLayerChunkHeader();

                        stream = new _ArrayDataStream2.default(buffer);
                        layerHeader.readFixedHeader(stream);

                        buffer = buffer.subarray(stream.pos);

                        state = STATE_DECODE_LAYER_HEADER_VARIABLE;
                        continue;
                        break;
                    case STATE_DECODE_LAYER_HEADER_VARIABLE:
                        buffer = concatBuffers(buffer, block);
                        block = null;

                        // Wait for variable part of header to arrive
                        if (!buffer || buffer.length < layerHeader.getVariableHeaderLen()) {
                            break;
                        }

                        stream = new _ArrayDataStream2.default(buffer);
                        layerHeader.readVariableHeader(stream);

                        buffer = buffer.subarray(stream.pos);

                        layer = new _CPLayer2.default(header.width, header.height, layerHeader.name);
                        layer.blendMode = layerHeader.blendMode;
                        layer.alpha = layerHeader.alpha;
                        layer.visible = layerHeader.visible;

                        layerBytesRead = 0;
                        layerBytesTotal = header.width * header.height * BYTES_PER_PIXEL;

                        /* 
                         * While decoding layers, we won't keep a persistent buffer around, so if we have any
                         * bytes left over, provide them to the next state as if they were a newly inflated block.
                         */
                        block = buffer;
                        buffer = null;

                        state = STATE_DECODE_LAYER;
                        continue;
                        break;
                    case STATE_DECODE_LAYER:
                        /* 
                         * When decoding layer data, we never concat blocks together, we are capable of decoding
                         * partial pixels that get split over block boundaries. So we don't use 'buffer' to accumulate
                         * data, and only read from incoming 'block's.
                         */
                        if (block != null) {
                            block = decodePixels(block, layer.data);

                            if (layerBytesRead >= layerBytesTotal) {
                                artwork.addLayerObject(layer);

                                // Skip any trailing bytes in the layer chunk
                                skipCount = chunk.chunkSize - layerHeader.getTotalHeaderLen() - layerBytesTotal;
                                state = STATE_SKIP_TRAILING_CHUNK_BYTES;
                                continue;
                            }
                        }
                        break;
                    case STATE_SKIP_TRAILING_CHUNK_BYTES:
                        if (block) {
                            if (skipCount < block.length) {
                                block = block.subarray(skipCount);
                                skipCount = 0;
                            } else {
                                skipCount -= block.length;
                                block = null;
                            }
                        }

                        if (skipCount == 0) {
                            state = STATE_WAIT_FOR_CHUNK;
                            continue;
                        }
                        break;
                }

                break;
            }
        }

        arrayBuffer = new Uint8Array(arrayBuffer);

        if (!hasChibiMagicMarker(arrayBuffer)) {
            return null; // not a ChibiPaint file
        }

        // Remove the magic header
        arrayBuffer = arrayBuffer.subarray(CHI_MAGIC.length);

        pako.onData = processBlock;

        pako.onEnd = function (status) {
            if (status === 0 && state == STATE_SUCCESS) {
                artwork.setActiveLayerIndex(artwork.getTopmostVisibleLayer());

                this.result = artwork;
            } else {
                console.log("Fatal error decoding ChibiFile");

                this.result = null;
            }
        };

        // Begin decompression/decoding
        pako.push(arrayBuffer);

        return pako.result;
    };
}
module.exports = exports["default"];

},{"../util/ArrayDataStream":45,"./CPArtwork":2,"./CPColorBmp":9,"./CPLayer":11}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPClip;
/*
    ChickenPaint

    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.

    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPClip(bmp, x, y) {
    this.bmp = bmp;

    this.x = x;
    this.y = y;
};
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColorBmp;

var _CPBitmap = require("./CPBitmap");

var _CPBitmap2 = _interopRequireDefault(_CPBitmap);

var _CPRect = require("../util/CPRect");

var _CPRect2 = _interopRequireDefault(_CPRect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function createImageData(width, height) {
    // return new ImageData(this.width, this.height); // Doesn't work on old IE
    var canvas = document.createElement("canvas"),
        context = canvas.getContext("2d");

    return context.createImageData(width, height);
}

//
// A 32bpp bitmap class (one byte per channel in RGBA order)
//

function CPColorBmp(width, height) {
    _CPBitmap2.default.call(this, width, height);

    // The ImageData object that holds the image data
    this.imageData = createImageData(this.width, this.height);

    // The bitmap data array (one byte per channel in RGBA order)
    this.data = this.imageData.data;
}

CPColorBmp.prototype = Object.create(_CPBitmap2.default.prototype);
CPColorBmp.prototype.constructor = CPColorBmp;

CPColorBmp.BYTES_PER_PIXEL = 4;
CPColorBmp.RED_BYTE_OFFSET = 0;
CPColorBmp.GREEN_BYTE_OFFSET = 1;
CPColorBmp.BLUE_BYTE_OFFSET = 2;
CPColorBmp.ALPHA_BYTE_OFFSET = 3;

// Creates a CPBitmap from a portion of this bitmap
CPColorBmp.prototype.cloneRect = function (rect) {
    var result = new CPColorBmp(rect.getWidth(), rect.getHeight());

    result.copyBitmapRect(this, 0, 0, rect);

    return result;
};

//
// Pixel access with friendly clipping. Pixel will be 32-bit integer in ARGB format
//
CPColorBmp.prototype.getPixel = function (x, y) {
    x = Math.max(0, Math.min(this.width - 1, x));
    y = Math.max(0, Math.min(this.height - 1, y));

    var pixIndex = this.offsetOfPixel(x, y);

    return this.data[pixIndex + CPColorBmp.ALPHA_BYTE_OFFSET] << 24 | this.data[pixIndex + CPColorBmp.RED_BYTE_OFFSET] << 16 | this.data[pixIndex + CPColorBmp.GREEN_BYTE_OFFSET] << 8 | this.data[pixIndex + CPColorBmp.BLUE_BYTE_OFFSET];
};

/**
 * Get an r,g,b,a array of the xor of this bitmap and the given one, within the given rectangle
 *
 * @returns {Uint8Array}
 */
CPColorBmp.prototype.copyRectXOR = function (bmp, rect) {
    rect = this.getBounds().clip(rect);

    var w = rect.getWidth(),
        h = rect.getHeight(),
        buffer = new Uint8Array(w * h * CPColorBmp.BYTES_PER_PIXEL),
        outputIndex = 0,
        bmp1Index = this.offsetOfPixel(rect.left, rect.top),
        bmp2Index = bmp.offsetOfPixel(rect.left, rect.top),
        bmp1YSkip = (this.width - w) * CPColorBmp.BYTES_PER_PIXEL,
        bmp2YSkip = (bmp.width - w) * CPColorBmp.BYTES_PER_PIXEL,
        widthBytes = w * CPColorBmp.BYTES_PER_PIXEL;

    for (var y = rect.top; y < rect.bottom; y++, bmp1Index += bmp1YSkip, bmp2Index += bmp2YSkip) {
        for (var x = 0; x < widthBytes; x++, outputIndex++, bmp1Index++, bmp2Index++) {
            buffer[outputIndex] = this.data[bmp1Index] ^ bmp.data[bmp2Index];
        }
    }

    return buffer;
};

CPColorBmp.prototype.setRectXOR = function (buffer, rect) {
    rect = this.getBounds().clip(rect);

    var w = rect.getWidth(),
        h = rect.getHeight(),
        bmp1Index = this.offsetOfPixel(rect.left, rect.top),
        bufferIndex = 0,
        bmp1YSkip = (this.width - w) * CPColorBmp.BYTES_PER_PIXEL,
        widthBytes = w * CPColorBmp.BYTES_PER_PIXEL;

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < widthBytes; x++) {
            this.data[bmp1Index++] ^= buffer[bufferIndex++];
        }
        bmp1Index += bmp1YSkip;
    }
};

//
// Copy another bitmap into this one using alpha blending
//
CPColorBmp.prototype.pasteAlphaRect = function (bmp, srcRect, x, y) {
    var srcRectCpy = srcRect.clone(),
        dstRect = new _CPRect2.default(x, y, 0, 0);

    this.getBounds().clipSourceDest(srcRectCpy, dstRect);

    var srcYStride = (bmp.width - dstRect.getWidth()) * CPColorBmp.BYTES_PER_PIXEL,
        dstYStride = (this.width - dstRect.getWidth()) * CPColorBmp.BYTES_PER_PIXEL,
        srcOffset = bmp.offsetOfPixel(srcRectCpy.left, srcRectCpy.top),
        dstOffset = this.offsetOfPixel(dstRect.left, dstRect.top);

    for (var y = dstRect.top; y < dstRect.bottom; y++, srcOffset += srcYStride, dstOffset += dstYStride) {
        for (var x = dstRect.left; x < dstRect.right; x++) {
            var alpha1 = bmp.data[srcOffset + CPColorBmp.ALPHA_BYTE_OFFSET];

            if (alpha1 <= 0) {
                dstOffset += CPColorBmp.BYTES_PER_PIXEL;
                srcOffset += CPColorBmp.BYTES_PER_PIXEL;
                continue;
            }

            if (alpha1 == 255) {
                for (var i = 0; i < CPColorBmp.BYTES_PER_PIXEL; i++) {
                    this.data[dstOffset++] = bmp.data[srcOffset++];
                }
                continue;
            }

            var alpha2 = this.data[dstOffset + CPColorBmp.ALPHA_BYTE_OFFSET],
                newAlpha = alpha1 + alpha2 - alpha1 * alpha2 / 255 | 0;

            if (newAlpha > 0) {
                var realAlpha = alpha1 * 255 / newAlpha | 0,
                    invAlpha = 255 - realAlpha;

                for (var i = 0; i < 3; i++, dstOffset++, srcOffset++) {
                    this.data[dstOffset] = bmp.data[srcOffset] + (this.data[dstOffset] * invAlpha - bmp.data[srcOffset] * invAlpha) / 255 | 0;
                }
                this.data[dstOffset++] = newAlpha;
                srcOffset++;
            } else {
                dstOffset += CPColorBmp.BYTES_PER_PIXEL;
                srcOffset += CPColorBmp.BYTES_PER_PIXEL;
            }
        }
    }
};

/** 
 * Copy the rectangle at srcRect from bmp onto this image at (dstX, dstY).
 */
CPColorBmp.prototype.copyBitmapRect = function (bmp, dstX, dstY, srcRect) {
    var srcRect = srcRect.clone(),
        dstRect = new _CPRect2.default(dstX, dstY, 0, 0);

    this.getBounds().clipSourceDest(srcRect, dstRect);

    var w = dstRect.getWidth() | 0,
        h = dstRect.getHeight() | 0;

    // Are we just trying to duplicate the bitmap?
    if (dstRect.left == 0 && dstRect.top == 0 && w == this.width && h == this.height && w == bmp.width && h == bmp.height) {
        this.copyDataFrom(bmp);
    } else {
        var dstIndex = this.offsetOfPixel(dstRect.left, dstRect.top),
            srcIndex = bmp.offsetOfPixel(srcRect.left, srcRect.top),
            dstYSkip = (this.width - w) * CPColorBmp.BYTES_PER_PIXEL,
            srcYSkip = (bmp.width - w) * CPColorBmp.BYTES_PER_PIXEL;

        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                this.data[dstIndex] = bmp.data[srcIndex];
                this.data[dstIndex + 1] = bmp.data[srcIndex + 1];
                this.data[dstIndex + 2] = bmp.data[srcIndex + 2];
                this.data[dstIndex + 3] = bmp.data[srcIndex + 3];
                dstIndex += 4;
                srcIndex += 4;
            }
            srcIndex += srcYSkip;
            dstIndex += dstYSkip;
        }
    }
};

//
// Copies the Alpha channel from another bitmap. Assumes both bitmaps are the same width.
//
CPColorBmp.prototype.copyAlphaFrom = function (bmp, rect) {
    rect = this.getBounds().clip(rect);

    var w = rect.getWidth(),
        h = rect.getHeight(),
        pixIndex = this.offsetOfPixel(rect.left, rect.top) + CPColorBmp.ALPHA_BYTE_OFFSET /* Apply offset here so we don't have to do it per-pixel*/
    ,
        ySkip = (this.width - w) * CPColorBmp.BYTES_PER_PIXEL;

    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            this.data[pixIndex] = bmp.data[pixIndex];
            pixIndex += CPColorBmp.BYTES_PER_PIXEL;
        }
        pixIndex += ySkip;
    }
};

CPColorBmp.prototype.copyDataFrom = function (bmp) {
    if (bmp.width != this.width || bmp.height != this.height) {
        this.width = bmp.width;
        this.height = bmp.height;

        this.imageData = createImageData(this.width, this.height);
        this.data = this.imageData.data;
    }

    if ("set" in this.data) {
        this.data.set(bmp.data);
    } else {
        // IE doesn't use Uint8ClampedArray for ImageData, so set() isn't available
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = bmp.data[i];
        }
    }
};

/**
 * Flood fill the given color starting from the given point
 * @param x int
 * @param y int
 * @param color int
 */
CPColorBmp.prototype.floodFill = function (x, y, color) {
    if (!this.isInside(x, y)) {
        return;
    }

    var oldColor = this.getPixel(x, y),
        oldAlpha = oldColor >> 24 & 0xFF,
        oldRed = oldColor >> 16 & 0xFF,
        oldGreen = oldColor >> 8 & 0xFF,
        oldBlue = oldColor & 0xFF,
        colorAlpha = color >> 24 & 0xFF,
        colorRed = color >> 16 & 0xFF,
        colorGreen = color >> 8 & 0xFF,
        colorBlue = color & 0xFF,
        stack = [],
        clip = this.getBounds(),
        data = this.data;

    // Change the left and right bounds from pixel indexes into byte indexes for easy clipping
    clip.left *= CPColorBmp.BYTES_PER_PIXEL;
    clip.right *= CPColorBmp.BYTES_PER_PIXEL;

    stack.push({ x1: x * CPColorBmp.BYTES_PER_PIXEL, x2: x * CPColorBmp.BYTES_PER_PIXEL, y: y, dy: -1 });
    stack.push({ x1: x * CPColorBmp.BYTES_PER_PIXEL, x2: x * CPColorBmp.BYTES_PER_PIXEL, y: y + 1, dy: 1 });

    /* 
     * If we are filling 100% transparent areas then we need to ignore the residual color information
     * (it would also be possible to clear it when erasing, but then the performance impact would be on the eraser 
     * rather than on this low importance flood fill)
     */
    if (oldAlpha == 0) {
        if (colorAlpha == 0) {
            return;
        }

        while (stack.length > 0) {
            var line = stack.pop();

            if (line.y < clip.top || line.y >= clip.bottom) {
                continue;
            }

            var lineOffset = this.offsetOfPixel(0, line.y),
                left = line.x1,
                next;

            while (left >= clip.left && data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] == 0) {
                data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] = colorRed;
                data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] = colorGreen;
                data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] = colorBlue;
                data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] = colorAlpha;

                left -= CPColorBmp.BYTES_PER_PIXEL;
            }

            if (left >= line.x1) {
                while (left <= line.x2 && data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] != oldAlpha) {
                    left += CPColorBmp.BYTES_PER_PIXEL;
                }
                next = left + CPColorBmp.BYTES_PER_PIXEL;
                if (left > line.x2) {
                    continue;
                }
            } else {
                left += CPColorBmp.BYTES_PER_PIXEL;
                if (left < line.x1) {
                    stack.push({ x1: left, x2: line.x1 - CPColorBmp.BYTES_PER_PIXEL, y: line.y - line.dy, dy: -line.dy });
                }
                next = line.x1 + CPColorBmp.BYTES_PER_PIXEL;
            }

            do {
                data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] = colorRed;
                data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] = colorGreen;
                data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] = colorBlue;
                data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] = colorAlpha;

                while (next < clip.right && data[next + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] == oldAlpha) {
                    data[next + lineOffset + CPColorBmp.RED_BYTE_OFFSET] = colorRed;
                    data[next + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] = colorGreen;
                    data[next + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] = colorBlue;
                    data[next + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] = colorAlpha;

                    next += CPColorBmp.BYTES_PER_PIXEL;
                }
                stack.push({ x1: left, x2: next - CPColorBmp.BYTES_PER_PIXEL, y: line.y + line.dy, dy: line.dy });

                if (next - CPColorBmp.BYTES_PER_PIXEL > line.x2) {
                    stack.push({ x1: line.x2 + CPColorBmp.BYTES_PER_PIXEL, x2: next - CPColorBmp.BYTES_PER_PIXEL, y: line.y - line.dy, dy: -line.dy });
                }

                left = next + CPColorBmp.BYTES_PER_PIXEL;
                while (left <= line.x2 && data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] != oldAlpha) {
                    left += CPColorBmp.BYTES_PER_PIXEL;
                }

                next = left + CPColorBmp.BYTES_PER_PIXEL;
            } while (left <= line.x2);
        }
    } else {
        if (color == oldColor) {
            return;
        }

        while (stack.length > 0) {
            var line = stack.pop();

            if (line.y < clip.top || line.y >= clip.bottom) {
                continue;
            }

            var lineOffset = this.offsetOfPixel(0, line.y),
                left = line.x1,
                next;

            while (left >= clip.left && data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] == oldRed && data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] == oldGreen && data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] == oldBlue && data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] == oldAlpha) {
                data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] = colorRed;
                data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] = colorGreen;
                data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] = colorBlue;
                data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] = colorAlpha;

                left -= CPColorBmp.BYTES_PER_PIXEL;
            }

            if (left >= line.x1) {
                while (left <= line.x2 && !(data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] == oldRed && data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] == oldGreen && data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] == oldBlue && data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] == oldAlpha)) {
                    left += CPColorBmp.BYTES_PER_PIXEL;
                }
                next = left + CPColorBmp.BYTES_PER_PIXEL;
                if (left > line.x2) {
                    continue;
                }
            } else {
                left += CPColorBmp.BYTES_PER_PIXEL;
                if (left < line.x1) {
                    stack.push({ x1: left, x2: line.x1 - CPColorBmp.BYTES_PER_PIXEL, y: line.y - line.dy, dy: -line.dy });
                }
                next = line.x1 + CPColorBmp.BYTES_PER_PIXEL;
            }

            do {
                data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] = colorRed;
                data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] = colorGreen;
                data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] = colorBlue;
                data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] = colorAlpha;

                while (next < clip.right && data[next + lineOffset + CPColorBmp.RED_BYTE_OFFSET] == oldRed && data[next + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] == oldGreen && data[next + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] == oldBlue && data[next + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] == oldAlpha) {
                    data[next + lineOffset + CPColorBmp.RED_BYTE_OFFSET] = colorRed;
                    data[next + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] = colorGreen;
                    data[next + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] = colorBlue;
                    data[next + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] = colorAlpha;

                    next += CPColorBmp.BYTES_PER_PIXEL;
                }
                stack.push({ x1: left, x2: next - CPColorBmp.BYTES_PER_PIXEL, y: line.y + line.dy, dy: line.dy });

                if (next - CPColorBmp.BYTES_PER_PIXEL > line.x2) {
                    stack.push({ x1: line.x2 + CPColorBmp.BYTES_PER_PIXEL, x2: next - CPColorBmp.BYTES_PER_PIXEL, y: line.y - line.dy, dy: -line.dy });
                }

                left = next + CPColorBmp.BYTES_PER_PIXEL;
                while (left <= line.x2 && !(data[left + lineOffset + CPColorBmp.RED_BYTE_OFFSET] == oldRed && data[left + lineOffset + CPColorBmp.GREEN_BYTE_OFFSET] == oldGreen && data[left + lineOffset + CPColorBmp.BLUE_BYTE_OFFSET] == oldBlue && data[left + lineOffset + CPColorBmp.ALPHA_BYTE_OFFSET] == oldAlpha)) {
                    left += CPColorBmp.BYTES_PER_PIXEL;
                }

                next = left + CPColorBmp.BYTES_PER_PIXEL;
            } while (left <= line.x2);
        }
    }
};

/**
 * Premultiply the RGB channels in the given R,G,B,A channel buffer with the alpha channel.
 * 
 * @param buffer R,G,B,A channel array
 * @param len Number of pixels in buffer to modify
 */
function multiplyAlpha(buffer, len) {
    var pixIndex = 0;

    for (var i = 0; i < len; i++) {
        var alpha = buffer[pixIndex + CPColorBmp.ALPHA_BYTE_OFFSET];

        // Multiply the RGB channels by alpha
        for (var j = 0; j < 3; j++, pixIndex++) {
            buffer[pixIndex] = Math.round(buffer[pixIndex] * alpha / 255);
        }
        pixIndex++; // Don't modify alpha channel
    }
}

/**
 * Inverse of multiplyAlpha()
 */
function separateAlpha(buffer, len) {
    var pixIndex = 0;

    for (var i = 0; i < len; i++) {
        var alpha = buffer[pixIndex + CPColorBmp.ALPHA_BYTE_OFFSET];

        if (alpha != 0) {
            var invAlpha = 255 / alpha;

            for (var j = 0; j < 3; j++, pixIndex++) {
                buffer[pixIndex] = Math.min(Math.round(buffer[pixIndex] * invAlpha), 255);
            }
            // Don't modify alpha channel
            pixIndex++;
        } else {
            pixIndex += CPColorBmp.BYTES_PER_PIXEL;
        }
    }
}

function boxBlurLine(src, dst, len, radius) {
    var totalPixels = 0,
        totalChannels = [0, 0, 0, 0],
        pixIndex,
        dstIndex;

    pixIndex = 0;
    for (var i = 0; i < radius && i < len; i++) {
        for (var j = 0; j < CPColorBmp.BYTES_PER_PIXEL; j++) {
            totalChannels[j] += src[pixIndex++];
        }
        totalPixels++;
    }

    dstIndex = 0;
    for (var i = 0; i < len; i++) {
        // New pixel joins the window at the right
        if (i + radius < len) {
            pixIndex = (i + radius) * CPColorBmp.BYTES_PER_PIXEL;

            for (var j = 0; j < CPColorBmp.BYTES_PER_PIXEL; j++) {
                totalChannels[j] += src[pixIndex++];
            }
            totalPixels++;
        }

        for (var j = 0; j < CPColorBmp.BYTES_PER_PIXEL; j++) {
            dst[dstIndex++] = Math.round(totalChannels[j] / totalPixels);
        }

        // Old pixel leaves the window at the left
        if (i - radius >= 0) {
            pixIndex = (i - radius) * CPColorBmp.BYTES_PER_PIXEL;

            for (var j = 0; j < CPColorBmp.BYTES_PER_PIXEL; j++) {
                totalChannels[j] -= src[pixIndex++];
            }
            totalPixels--;
        }
    }
}

/**
 * Copy a column of pixels in the bitmap to the given R,G,B,A buffer.
 * 
 * @param x X-coordinate of column
 * @param y Y-coordinate of top of column to copy
 * @param len Number of pixels to copy
 * @param buffer R,G,B,A array
 */
CPColorBmp.prototype.copyPixelColumnToArray = function (x, y, len, buffer) {
    var yJump = (this.width - 1) * CPColorBmp.BYTES_PER_PIXEL,
        dstOffset = 0,
        srcOffset = this.offsetOfPixel(x, y);

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < CPColorBmp.BYTES_PER_PIXEL; j++) {
            buffer[dstOffset++] = this.data[srcOffset++];
        }

        srcOffset += yJump;
    }
};

/**
 * Copy the pixels from the given R,G,B,A buffer to a column of pixels in the bitmap.
 * 
 * @param x X-coordinate of column
 * @param y Y-coordinate of top of column to copy
 * @param len Number of pixels to copy
 * @param buffer R,G,B,A array to copy from
 */
CPColorBmp.prototype.copyArrayToPixelColumn = function (x, y, len, buffer) {
    var yJump = (this.width - 1) * CPColorBmp.BYTES_PER_PIXEL,
        srcOffset = 0,
        dstOffset = this.offsetOfPixel(x, y);

    for (var i = 0; i < len; i++) {
        for (var j = 0; j < CPColorBmp.BYTES_PER_PIXEL; j++) {
            this.data[dstOffset++] = buffer[srcOffset++];
        }

        dstOffset += yJump;
    }
};

CPColorBmp.prototype.boxBlur = function (rect, radiusX, radiusY) {
    rect = this.getBounds().clip(rect);

    var rectWidth = rect.getWidth(),
        rectWidthBytes = rectWidth * CPColorBmp.BYTES_PER_PIXEL,
        rectHeight = rect.getHeight(),
        rectLength = Math.max(rectWidth, rectHeight),
        src = new Uint8Array(rectLength * CPColorBmp.BYTES_PER_PIXEL),
        dst = new Uint8Array(rectLength * CPColorBmp.BYTES_PER_PIXEL);

    for (var y = rect.top; y < rect.bottom; y++) {
        var pixOffset = this.offsetOfPixel(rect.left, y);

        for (var x = 0; x < rectWidthBytes; x++) {
            src[x] = this.data[pixOffset++];
        }

        multiplyAlpha(src, rectWidth);
        boxBlurLine(src, dst, rectWidth, radiusX);

        pixOffset = this.offsetOfPixel(rect.left, y);

        for (var x = 0; x < rectWidthBytes; x++) {
            this.data[pixOffset++] = dst[x];
        }
    }

    for (var x = rect.left; x < rect.right; x++) {
        this.copyPixelColumnToArray(x, rect.top, rectHeight, src);

        boxBlurLine(src, dst, rectHeight, radiusY);
        separateAlpha(dst, rectHeight);

        this.copyArrayToPixelColumn(x, rect.top, rectHeight, dst);
    }
};

CPColorBmp.prototype.offsetOfPixel = function (x, y) {
    return (y * this.width + x) * CPColorBmp.BYTES_PER_PIXEL | 0;
};

CPColorBmp.prototype.getMemorySize = function () {
    return this.data.length;
};

// Load from a loaded HTML Image object
CPColorBmp.prototype.loadFromImage = function (image) {
    var imageCanvas = document.createElement("canvas"),
        imageContext = imageCanvas.getContext("2d");

    imageCanvas.width = image.width;
    imageCanvas.height = image.height;

    imageContext.globalCompositeOperation = "copy";
    imageContext.drawImage(image, 0, 0);

    this.imageData = imageContext.getImageData(0, 0, this.width, this.height);
    this.data = this.imageData.data;
};

CPColorBmp.prototype.getImageData = function () {
    return this.imageData;
};

/**
 * Replace the image data with the provided ImageData object (i.e. use it by reference).
 *
 * @param imageData {ImageData}
 */
CPColorBmp.prototype.setImageData = function (imageData) {
    this.width = imageData.width;
    this.height = imageData.height;
    this.imageData = imageData;
    this.data = imageData.data;
};
module.exports = exports["default"];

},{"../util/CPRect":52,"./CPBitmap":3}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPGreyBmp;

var _CPBitmap = require("./CPBitmap");

var _CPBitmap2 = _interopRequireDefault(_CPBitmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPGreyBmp(width, height, bitDepth) {

    _CPBitmap2.default.call(this, width, height);

    this.bitDepth = bitDepth;

    switch (bitDepth) {
        case 32:
            this.data = new Uint32Array(width * height);
            break;
        case 16:
            this.data = new Uint16Array(width * height);
            break;
        case 8:
        default:
            this.data = new Uint8Array(width * height);
    }

    this.clone = function () {
        var result = new CPGreyBmp(this.width, this.height, this.bitDepth);

        result.data.set(this.data);

        return result;
    };

    this.clearAll = function (value) {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = value;
        }
    };

    this.clearRect = function (rect, value) {
        var rect = this.getBounds().clip(rect),
            yStride = this.width - rect.getWidth(),
            pixIndex = this.offsetOfPixel(rect.left, rect.top);

        for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
            for (var x = rect.left; x < rect.right; x++, pixIndex++) {
                this.data[pixIndex] = value;
            }
        }
    };

    this.mirrorHorizontally = function () {
        var newData = new Uint8Array(width * height);

        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                newData[y * width + x] = this.data[y * width + width - x - 1];
            }
        }

        this.data = newData;
    };

    this.applyLUT = function (lut) {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = lut.table[this.data[i]];
        }
    };

    this.toCanvas = function () {
        var imageData = this.toImageData(),
            canvas = document.createElement("canvas"),
            context = canvas.getContext("2d");

        canvas.width = this.width;
        canvas.height = this.height;

        context.putImageData(imageData, 0, 0);

        return canvas;
    };

    this.toImageData = function () {
        var canvas = document.createElement("canvas"),
            context = canvas.getContext("2d"),
            imageData = context.createImageData(this.width, this.height),
            srcIndex = 0,
            dstIndex = 0;

        for (var y = 0; y < this.height; y++) {
            for (var x = 0; x < this.width; x++) {
                imageData.data[dstIndex++] = this.data[srcIndex];
                imageData.data[dstIndex++] = this.data[srcIndex];
                imageData.data[dstIndex++] = this.data[srcIndex];
                imageData.data[dstIndex++] = 0xFF;
                srcIndex++;
            }
        }

        return imageData;
    };
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

CPGreyBmp.prototype.offsetOfPixel = function (x, y) {
    return y * this.width + x;
};
module.exports = exports["default"];

},{"./CPBitmap":3}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPLayer;

var _CPColorBmp = require('./CPColorBmp');

var _CPColorBmp2 = _interopRequireDefault(_CPColorBmp);

var _CPBlend = require('./CPBlend');

var _CPBlend2 = _interopRequireDefault(_CPBlend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Note layer is not cleared to any specific values upon initial creation, use clearAll().
 */
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPLayer(width, height, name) {
    // Super-constructor
    _CPColorBmp2.default.call(this, width, height);

    this.name = name || "";

    this.alpha = 100;
    this.visible = true;
    this.blendMode = _CPBlend2.default.LM_NORMAL;
}

CPLayer.prototype = Object.create(_CPColorBmp2.default.prototype);
CPLayer.prototype.constructor = CPLayer;

var BYTES_PER_PIXEL = 4,
    ALPHA_BYTE_OFFSET = 3;

CPLayer.prototype.clearAll = function (color) {
    var a = color >> 24 & 0xFF,
        r = color >> 16 & 0xFF,
        g = color >> 8 & 0xFF,
        b = color & 0xFF;

    for (var i = 0; i < this.width * this.height * BYTES_PER_PIXEL;) {
        this.data[i++] = r;
        this.data[i++] = g;
        this.data[i++] = b;
        this.data[i++] = a;
    }
};

CPLayer.prototype.clearRect = function (rect, color) {
    var a = color >> 24 & 0xFF,
        r = color >> 16 & 0xFF,
        g = color >> 8 & 0xFF,
        b = color & 0xFF;

    var rect = this.getBounds().clip(rect),
        yStride = (this.width - rect.getWidth()) * BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top);

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        for (var x = rect.left; x < rect.right; x++) {
            this.data[pixIndex++] = r;
            this.data[pixIndex++] = g;
            this.data[pixIndex++] = b;
            this.data[pixIndex++] = a;
        }
    }
};

/**
 * @param rect CPRect
 * @param source CPLayer
 */
CPLayer.prototype.copyRegionHFlip = function (rect, source) {
    rect = this.getBounds().clip(rect);

    for (var y = rect.top; y < rect.bottom; y++) {
        var dstOffset = this.offsetOfPixel(rect.left, y),
            srcOffset = source.offsetOfPixel(rect.right - 1, y);

        for (var x = rect.left; x < rect.right; x++, srcOffset -= _CPColorBmp2.default.BYTES_PER_PIXEL * 2) {
            for (var i = 0; i < _CPColorBmp2.default.BYTES_PER_PIXEL; i++) {
                this.data[dstOffset++] = source.data[srcOffset++];
            }
        }
    }
};

/**
 * @param rect CPRect
 * @param source CPLayer
 */
CPLayer.prototype.copyRegionVFlip = function (rect, source) {
    rect = this.getBounds().clip(rect);

    var widthBytes = rect.getWidth() * _CPColorBmp2.default.BYTES_PER_PIXEL;

    for (var y = rect.top; y < rect.bottom; y++) {
        var dstOffset = this.offsetOfPixel(rect.left, y),
            srcOffset = source.offsetOfPixel(rect.left, rect.bottom - 1 - (y - rect.top));

        for (var x = 0; x < widthBytes; x++) {
            this.data[dstOffset++] = source.data[srcOffset++];
        }
    }
};

/**
 * @param r CPRect
 */
CPLayer.prototype.fillWithNoise = function (rect) {
    rect = this.getBounds().clip(rect);

    var value,
        yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top);

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        for (var x = rect.left; x < rect.right; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            value = Math.random() * 0x100 | 0;

            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = value;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = value;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = value;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = 0xFF;
        }
    }
};

/**
 * Replace the pixels in the given rect with the given horizontal gradient.
 *
 * @param rect CPRect
 * @param fromX int
 * @param toX int
 * @param gradientPoints int[]
 */
CPLayer.prototype.gradientHorzReplace = function (rect, fromX, toX, gradientPoints) {
    var fromColor = {
        r: gradientPoints[0] >> 16 & 0xFF,
        g: gradientPoints[0] >> 8 & 0xFF,
        b: gradientPoints[0] & 0xFF,
        a: gradientPoints[0] >> 24 & 0xFF
    },
        toColor = {
        r: gradientPoints[1] >> 16 & 0xFF,
        g: gradientPoints[1] >> 8 & 0xFF,
        b: gradientPoints[1] & 0xFF,
        a: gradientPoints[1] >> 24 & 0xFF
    },
        yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top) | 0,
        h = rect.bottom - rect.top | 0;

    if (toX < fromX) {
        var temp = toX;
        toX = fromX;
        fromX = temp;

        temp = fromColor;
        fromColor = toColor;
        toColor = temp;
    }

    var gradientRange = toX - fromX | 0,
        rStep = (toColor.r - fromColor.r) / gradientRange,
        gStep = (toColor.g - fromColor.g) / gradientRange,
        bStep = (toColor.b - fromColor.b) / gradientRange,
        aStep = (toColor.a - fromColor.a) / gradientRange,
        jump = Math.max(rect.left - fromX, 0);

    for (var y = 0; y < h; y++, pixIndex += yStride) {
        // The solid color section before the gradient
        var x = rect.left;

        for (var xEnd = Math.min(fromX, rect.right) | 0; x < xEnd; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = fromColor.r;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = fromColor.g;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = fromColor.b;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = fromColor.a;
        }

        // In the gradient
        var r = fromColor.r + rStep * jump,
            g = fromColor.g + gStep * jump,
            b = fromColor.b + bStep * jump,
            a = fromColor.a + aStep * jump;

        for (xEnd = Math.min(toX, rect.right) | 0; x < xEnd; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = r;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = g;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = b;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = a;

            r += rStep;
            g += gStep;
            b += bStep;
            a += aStep;
        }

        // The section after the end of the gradient
        for (; x < rect.right; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = toColor.r;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = toColor.g;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = toColor.b;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = toColor.a;
        }
    }
};

/**
 * Replace the pixels in the given rect with the given vertical gradient.
 *
 * @param {CPRect} rect
 * @param fromY int
 * @param toY int
 * @param gradientPoints int[]
 */
CPLayer.prototype.gradientVertReplace = function (rect, fromY, toY, gradientPoints) {
    var fromColor = {
        r: gradientPoints[0] >> 16 & 0xFF,
        g: gradientPoints[0] >> 8 & 0xFF,
        b: gradientPoints[0] & 0xFF,
        a: gradientPoints[0] >> 24 & 0xFF
    },
        toColor = {
        r: gradientPoints[1] >> 16 & 0xFF,
        g: gradientPoints[1] >> 8 & 0xFF,
        b: gradientPoints[1] & 0xFF,
        a: gradientPoints[1] >> 24 & 0xFF
    },
        yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top) | 0,
        w = rect.right - rect.left | 0;

    if (toY < fromY) {
        var temp = toY;
        toY = fromY;
        fromY = temp;

        temp = fromColor;
        fromColor = toColor;
        toColor = temp;
    }

    var y = rect.top;

    // The solid color section before the start of the gradient
    for (var yEnd = Math.min(rect.bottom, fromY) | 0; y < yEnd; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = fromColor.r;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = fromColor.g;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = fromColor.b;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = fromColor.a;
        }
    }

    // Inside the gradient
    var gradientRange = toY - fromY | 0,
        rStep = (toColor.r - fromColor.r) / gradientRange,
        gStep = (toColor.g - fromColor.g) / gradientRange,
        bStep = (toColor.b - fromColor.b) / gradientRange,
        aStep = (toColor.a - fromColor.a) / gradientRange,
        jump = Math.max(y - fromY, 0),
        r = fromColor.r + rStep * jump,
        g = fromColor.g + gStep * jump,
        b = fromColor.b + bStep * jump,
        a = fromColor.a + aStep * jump;

    for (var yEnd = Math.min(rect.bottom, toY) | 0; y < yEnd; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = r;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = g;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = b;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = a;
        }

        r += rStep;
        g += gStep;
        b += bStep;
        a += aStep;
    }

    // The section after the end of the gradient
    for (; y < rect.bottom; y++, pixIndex += yStride) {
        for (var x = 0; x < w; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = toColor.r;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = toColor.g;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = toColor.b;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = toColor.a;
        }
    }
};

/**
 * Replace the pixels in the given rect with the given gradient.
 *
 * @param rect CPRect
 * @param fromX int
 * @param fromY int
 * @param toX int
 * @param toY int
 * @param gradientPoints int[]
 */
CPLayer.prototype.gradientReplace = function (rect, fromX, fromY, toX, toY, gradientPoints) {
    var yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top) | 0,
        w = rect.right - rect.left | 0,
        fromColor = {
        r: gradientPoints[0] >> 16 & 0xFF,
        g: gradientPoints[0] >> 8 & 0xFF,
        b: gradientPoints[0] & 0xFF,
        a: gradientPoints[0] >> 24 & 0xFF
    },
        toColor = {
        r: gradientPoints[1] >> 16 & 0xFF,
        g: gradientPoints[1] >> 8 & 0xFF,
        b: gradientPoints[1] & 0xFF,
        a: gradientPoints[1] >> 24 & 0xFF
    },


    // How many pixels vertically does the gradient sequence complete over (+infinity for horizontal gradients!)
    vertRange = toY - fromY + (toX - fromX) * (toX - fromX) / (toY - fromY),

    // Same for horizontal
    horzRange = toX - fromX + (toY - fromY) * (toY - fromY) / (toX - fromX),
        horzStep = 1 / horzRange;

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        var
        // The position the row starts at in the gradient [0.0 ... 1.0)
        prop = (rect.left - fromX) / horzRange + (y - fromY) / vertRange;

        for (var x = 0; x < w; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            var propClamped = Math.min(Math.max(prop, 0.0), 1.0),
                invPropClamped = 1 - propClamped;

            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = fromColor.r * invPropClamped + toColor.r * propClamped;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = fromColor.g * invPropClamped + toColor.g * propClamped;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = fromColor.b * invPropClamped + toColor.b * propClamped;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = fromColor.a * invPropClamped + toColor.a * propClamped;

            prop += horzStep;
        }
    }
};

/**
 * Alpha blend the given gradient onto the pixels in the given rect.
 *
 * @param rect CPRect
 * @param fromX int
 * @param fromY int
 * @param toX int
 * @param toY int
 * @param gradientPoints int[]
 */
CPLayer.prototype.gradientAlpha = function (rect, fromX, fromY, toX, toY, gradientPoints) {
    var yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top) | 0,
        w = rect.right - rect.left | 0,
        fromColor = {
        r: gradientPoints[0] >> 16 & 0xFF,
        g: gradientPoints[0] >> 8 & 0xFF,
        b: gradientPoints[0] & 0xFF,
        a: gradientPoints[0] >> 24 & 0xFF
    },
        toColor = {
        r: gradientPoints[1] >> 16 & 0xFF,
        g: gradientPoints[1] >> 8 & 0xFF,
        b: gradientPoints[1] & 0xFF,
        a: gradientPoints[1] >> 24 & 0xFF
    },


    // How many pixels vertically does the gradient sequence complete over (+infinity for horizontal gradients!)
    vertRange = toY - fromY + (toX - fromX) * (toX - fromX) / (toY - fromY),

    // Same for horizontal
    horzRange = toX - fromX + (toY - fromY) * (toY - fromY) / (toX - fromX),
        horzStep = 1 / horzRange;

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        var
        // The position the row starts at in the gradient [0.0 ... 1.0)
        prop = (rect.left - fromX) / horzRange + (y - fromY) / vertRange;

        for (var x = 0; x < w; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            var propClamped = Math.min(Math.max(prop, 0.0), 1.0),
                invPropClamped = 1 - propClamped,


            // The gradient color to draw
            r = fromColor.r * invPropClamped + toColor.r * propClamped,
                g = fromColor.g * invPropClamped + toColor.g * propClamped,
                b = fromColor.b * invPropClamped + toColor.b * propClamped,
                a = fromColor.a * invPropClamped + toColor.a * propClamped,
                alpha2 = this.data[pixIndex + ALPHA_BYTE_OFFSET],
                newAlpha = a + alpha2 - a * alpha2 / 255 | 0;

            if (newAlpha > 0) {
                var realAlpha = a * 255 / newAlpha | 0,
                    invAlpha = 255 - realAlpha;

                this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = (r * realAlpha + this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] * invAlpha) / 255 | 0;
                this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = (g * realAlpha + this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] * invAlpha) / 255 | 0;
                this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = (b * realAlpha + this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] * invAlpha) / 255 | 0;
                this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = newAlpha;
            }

            prop += horzStep;
        }
    }
};

/**
 * Draw a gradient which begins at fromX, fromY and ends at toX, toY, clipped to the given rect, on top of the
 * pixels in the layer.
 *
 * @param gradientPoints Array with gradient colors (ARGB integers)
 * @param rect CPRect
 * @param replace Set to true to replace the pixels in the layer rather than blending the gradient on top of them.
 */
CPLayer.prototype.gradient = function (rect, fromX, fromY, toX, toY, gradientPoints, replace) {
    rect = this.getBounds().clip(rect);

    // Degenerate case
    if (fromX == toX && fromY == toY) {
        return;
    }

    // Opaque blend if possible
    if (replace || gradientPoints[0] >>> 24 == 255 && gradientPoints[1] >>> 24 == 255) {
        if (fromX == toX) {
            this.gradientVertReplace(rect, fromY, toY, gradientPoints);
        } else if (fromY == toY) {
            this.gradientHorzReplace(rect, fromX, toX, gradientPoints);
        } else {
            this.gradientReplace(rect, fromX, fromY, toX, toY, gradientPoints);
        }
    } else {
        this.gradientAlpha(rect, fromX, fromY, toX, toY, gradientPoints);
    }
};

/**
 * @param r CPRect
 */
CPLayer.prototype.fillWithColorNoise = function (rect) {
    rect = this.getBounds().clip(rect);

    var value,
        yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top);

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        for (var x = rect.left; x < rect.right; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            value = Math.random() * 0x1000000 | 0;

            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = value >> 16 & 0xFF;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = value >> 8 & 0xFF;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = value & 0xFF;
            this.data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = 0xFF;
        }
    }
};

/**
 * @param r CPRect
 */
CPLayer.prototype.invert = function (rect) {
    rect = this.getBounds().clip(rect);

    var yStride = (this.width - rect.getWidth()) * _CPColorBmp2.default.BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top);

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        for (var x = rect.left; x < rect.right; x++, pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL) {
            this.data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] ^= 0xFF;
            this.data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] ^= 0xFF;
            this.data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] ^= 0xFF;
        }
    }
};

CPLayer.prototype.getAlpha = function () {
    return this.alpha;
};

CPLayer.prototype.getBlendMode = function () {
    return this.blendMode;
};

CPLayer.prototype.clone = function () {
    var result = new CPLayer(this.width, this.height, "");

    result.copyFrom(this);

    return result;
};

CPLayer.prototype.copyFrom = function (layer) {
    this.name = layer.name;
    this.blendMode = layer.blendMode;
    this.alpha = layer.alpha;
    this.visible = layer.visible;

    this.copyDataFrom(layer);
};

// Do we have any non-opaque pixels in the entire layer?
CPLayer.prototype.hasAlpha = function () {
    if (this.alpha != 100) {
        return true;
    }

    var pixIndex = ALPHA_BYTE_OFFSET;

    for (var y = 0; y < height; y++) {
        var alphaAnded = 0xFF;

        for (var x = 0; x < this.width; x++, pixIndex += BYTES_PER_PIXEL) {
            alphaAnded &= this.data[pixIndex];
        }

        // Only check once per row in order to reduce branching in the inner loop
        if (alphaAnded != 0xFF) {
            return true;
        }
    }

    return false;
};

// Do we have any semi-transparent pixels in the given rectangle?
CPLayer.prototype.hasAlphaInRect = function (rect) {
    if (this.alpha != 100) {
        return true;
    }

    rect = this.getBounds().clip(rect);

    var yStride = (this.width - rect.getWidth()) * BYTES_PER_PIXEL,
        pixIndex = this.offsetOfPixel(rect.left, rect.top) + ALPHA_BYTE_OFFSET;

    for (var y = rect.top; y < rect.bottom; y++, pixIndex += yStride) {
        var alphaAnded = 0xFF;

        for (var x = rect.left; x < rect.right; x++, pixIndex += BYTES_PER_PIXEL) {
            alphaAnded &= this.data[pixIndex];
        }

        // Only check once per row in order to reduce branching in the inner loop
        if (alphaAnded != 0xFF) {
            return true;
        }
    }

    return false;
};

/**
 * Get a rectangle that encloses any non-transparent pixels in the layer within the given initialBounds (or an empty
 * rect if the pixels inside the given bounds are 100% transparent).
 *
 * @param {CPRect} initialBounds - The rect to search within (pass getBounds() to search the whole layer)
 *
 * @returns {CPRect}
 */
CPLayer.prototype.getNonTransparentBounds = function (initialBounds) {
    var pixIndex,
        result = initialBounds.clone(),
        x,
        y,
        alphaOred,
        yStride;

    // Find the first non-transparent row
    yStride = (this.width - result.getWidth()) * BYTES_PER_PIXEL;
    pixIndex = this.offsetOfPixel(result.left, result.top) + ALPHA_BYTE_OFFSET;

    for (y = result.top; y < result.bottom; y++, pixIndex += yStride) {
        alphaOred = 0x00;

        for (var x = result.left; x < result.right; x++, pixIndex += BYTES_PER_PIXEL) {
            alphaOred |= this.data[pixIndex];
        }

        // Only check once per row in order to reduce branching in the inner loop
        if (alphaOred != 0x00) {
            break;
        }
    }

    result.top = y;

    if (result.top == result.bottom) {
        // Rect is empty, no opaque pixels in the initialBounds
        return result;
    }

    // Now the last non-transparent row
    pixIndex = this.offsetOfPixel(result.right - 1, result.bottom - 1) + ALPHA_BYTE_OFFSET;
    for (y = result.bottom - 1; y >= result.top; y--, pixIndex -= yStride) {
        alphaOred = 0x00;

        for (var x = result.right - 1; x >= result.left; x--, pixIndex -= BYTES_PER_PIXEL) {
            alphaOred |= this.data[pixIndex];
        }

        // Only check once per row in order to reduce branching in the inner loop
        if (alphaOred != 0x00) {
            break;
        }
    }

    result.bottom = y + 1; /* +1 since the bottom/right edges of the rect are exclusive */

    // Now columns from the left
    yStride = BYTES_PER_PIXEL * this.width;
    for (x = result.left; x < result.right; x++) {
        pixIndex = this.offsetOfPixel(x, result.top) + ALPHA_BYTE_OFFSET;
        alphaOred = 0x00;

        for (y = result.top; y < result.bottom; y++, pixIndex += yStride) {
            alphaOred |= this.data[pixIndex];
        }

        if (alphaOred != 0x00) {
            break;
        }
    }

    result.left = x;

    // And columns from the right
    for (x = result.right - 1; x >= result.left; x--) {
        pixIndex = this.offsetOfPixel(x, result.top) + ALPHA_BYTE_OFFSET;
        alphaOred = 0x00;

        for (y = result.top; y < result.bottom; y++, pixIndex += yStride) {
            alphaOred |= this.data[pixIndex];
        }

        if (alphaOred != 0x00) {
            break;
        }
    }

    result.right = x + 1;

    return result;
};

CPLayer.prototype.setAlpha = function (alpha) {
    this.alpha = alpha;
};

CPLayer.prototype.setBlendMode = function (blendMode) {
    this.blendMode = blendMode;
};

CPLayer.prototype.getAlpha = function () {
    return this.alpha;
};

CPLayer.prototype.getBlendMode = function () {
    return this.blendMode;
};

/**
 * Returns a new canvas with a rotated version of the given canvas.
 * 
 * Rotation is [0..3] and selects a multiple of 90 degrees of clockwise rotation to be applied.
 */
function getRotatedCanvas(canvas, rotation) {
    rotation = rotation % 4;

    if (rotation == 0) {
        return canvas;
    }

    var rotatedCanvas = document.createElement("canvas"),
        rotatedCanvasContext = rotatedCanvas.getContext("2d");

    if (rotation % 2 == 0) {
        rotatedCanvas.width = canvas.width;
        rotatedCanvas.height = canvas.height;
    } else {
        rotatedCanvas.width = canvas.height;
        rotatedCanvas.height = canvas.width;
    }

    switch (rotation) {
        case 1:
            // 90 degree clockwise:
            rotatedCanvasContext.rotate(Math.PI / 2);
            rotatedCanvasContext.drawImage(canvas, 0, -canvas.height);
            break;
        case 2:
            rotatedCanvasContext.rotate(Math.PI);
            rotatedCanvasContext.drawImage(canvas, -canvas.width, -canvas.height);
            break;
        case 3:
            // 90 degree counter-clockwise:
            rotatedCanvasContext.rotate(-Math.PI / 2);
            rotatedCanvasContext.drawImage(canvas, -canvas.width, 0);
            break;
        case 0:
        default:
            return canvas;
    }

    return rotatedCanvas;
}

function decodeBase64PNGDataURL(url) {
    if (typeof url !== "string" || !url.match(/^data:image\/png;base64,/i)) {
        return false;
    }

    return window.atob(url.substring("data:image\/png;base64,".length));
}

/**
 * Get the layer as a PNG image.
 * 
 * Rotation is [0..3] and selects a multiple of 90 degrees of clockwise rotation to be applied, or 0 to leave
 * unrotated.
 */
CPLayer.prototype.getAsPNG = function (rotation) {
    var canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d");

    // First draw our image data onto a canvas...
    canvas.width = this.imageData.width;
    canvas.height = this.imageData.height;

    canvasContext.putImageData(this.imageData, 0, 0);

    // Rotate it if needed
    canvas = getRotatedCanvas(canvas, rotation || 0);

    return decodeBase64PNGDataURL(canvas.toDataURL('image/png'));
};
module.exports = exports['default'];

},{"./CPBlend":4,"./CPColorBmp":9}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPLookUpTable;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPLookUpTable() {
    this.table = new Uint8Array(256);

    this.loadIdentity = function () {
        for (var i = 0; i < 256; i++) {
            this.table[i] = i;
        }
    };

    this.loadBrightnessContrast = function (brightness, contrast) {
        var slope = contrast > 0.0 ? 1.0 / (1.0001 - contrast) : 1.0 + contrast,
            offset = 0.5 - slope * 0.5 + brightness;

        for (var i = 0; i < 256; i++) {
            var x = i / 255.0,
                y = x * slope + offset;

            this.table[i] = Math.min(255, Math.max(~~(y * 255.0), 0));
        }
    };

    this.invert = function () {
        for (var i = 0; i < 256; i++) {
            this.table[i] = 255 - this.table[i];
        }
    };
}
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPResourceLoader;

var _CPChibiFile = require("./CPChibiFile");

var _CPChibiFile2 = _interopRequireDefault(_CPChibiFile);

var _CPArtwork = require("./CPArtwork");

var _CPArtwork2 = _interopRequireDefault(_CPArtwork);

var _CPLayer = require("./CPLayer");

var _CPLayer2 = _interopRequireDefault(_CPLayer);

var _AdobeColorTable = require("../util/AdobeColorTable");

var _AdobeColorTable2 = _interopRequireDefault(_AdobeColorTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Loads ChickenPaint resources from a remote server and emits progress events.
 *
 * loadImageURL - URL of PNG/JPEG image to load for editing (optional)
 * loadChibiFileURL - URL of .chi file to load for editing (optional). Used in preference to loadImage.
 * loadSwatchesURL - URL of an .aco palette to load (optional)
 */
function CPResourceLoader(options) {
    var resources = [],
        completed = {},
        that = this;

    if (options.loadChibiFileUrl && ("" + options.loadChibiFileUrl).length > 0) {
        resources.push({
            url: options.loadChibiFileUrl,
            friendly: "drawing layers",
            name: "layers",
            required: true
        });
    } else {
        if (options.loadImageUrl && ("" + options.loadImageUrl).length > 0) {
            resources.push({
                url: options.loadImageUrl,
                friendly: "drawing",
                name: "flat",
                required: true
            });
        }
    }

    if (options.loadSwatchesUrl) {
        resources.push({
            url: options.loadSwatchesUrl,
            friendly: "color swatches",
            name: "swatches",
            required: false,
            noProgress: true // So short that we may as well keep the smoothie drained
        });
    }

    function decodeResource(resource, resourceData) {
        return new Promise(function (resolve, reject) {
            switch (resource.name) {
                case "flat":
                    var blob = new Blob([resourceData], { type: "image/png" }),
                        imageUrl = window.URL.createObjectURL(blob);

                    if (imageUrl) {
                        var image = new Image();

                        image.onload = function () {
                            var artwork = new _CPArtwork2.default(this.width, this.height),
                                layer = new _CPLayer2.default(this.width, this.height, "Layer 1");

                            layer.loadFromImage(image);
                            artwork.addLayerObject(layer);

                            image = null;
                            window.URL.revokeObjectURL(imageUrl);

                            resolve(artwork);
                        };

                        image.src = imageUrl;
                    } else {
                        resolve(null);
                    }
                    break;
                case "swatches":
                    var reader = new _AdobeColorTable2.default(),
                        colors = reader.read(resourceData);

                    resolve(colors);
                    break;
                case "layers":
                    var reader = new _CPChibiFile2.default(),
                        artwork = reader.read(resourceData);

                    resolve(artwork);
                    break;
                default:
                    resolve(null);
                    break;
            }
        });
    }

    function reportProgress(resource, progress) {
        if (progress === null) {
            that.emitEvent("loadingProgress", [1.0, "Loading your " + resource.friendly + "..."]);
        } else {
            that.emitEvent("loadingProgress", [progress, "Loading your " + resource.friendly + " (" + Math.round(progress * 100) + "%)..."]);
        }
    }

    this.load = function () {
        if (resources.length == 0) {
            that.emitEvent("loadingComplete", [completed]);
            return;
        }

        var resource = resources.shift(),
            xhr = new XMLHttpRequest();

        xhr.addEventListener("progress", function (evt) {
            var progress;

            if (evt.lengthComputable && !resource.noProgress) {
                progress = evt.loaded / evt.total;
            } else {
                progress = null;
            }

            reportProgress(resource, progress);
        }, false);

        function handleFatal() {
            if (resource.required) {
                that.emitEvent("loadingFailure", ["Failed to load your " + resource.friendly + ", please try again later."]);
            } else {
                // Skip unimportant resources
                that.load();
            }
        }

        xhr.addEventListener("load", function (evt) {
            if (this.status == 200) {
                var response = this.response;

                that.emitEvent("loadingProgress", [1.0, "Starting ChickenPaint..."]);

                // Yield to the DOM to give it a chance to paint the loaded message before we begin decoding
                setTimeout(function () {
                    decodeResource(resource, response).then(function (decoded) {
                        if (decoded) {
                            completed[resource.name] = decoded;

                            // Move on to the next file
                            that.load();
                        } else {
                            that.emitEvent("loadingFailure", ["Failed to read your " + resource.friendly]);
                        }
                    });
                }, 0);
            } else {
                handleFatal();
            }
        }, false);

        xhr.addEventListener("error", handleFatal);

        reportProgress(resource, resource.noProgress ? null : 0.0);

        xhr.open("GET", resource.url, true);

        xhr.responseType = 'arraybuffer';

        xhr.send();
    };
}

CPResourceLoader.prototype = Object.create(EventEmitter.prototype);
CPResourceLoader.prototype.constructor = CPResourceLoader;
module.exports = exports["default"];

},{"../util/AdobeColorTable":44,"./CPArtwork":2,"./CPChibiFile":7,"./CPLayer":11}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.binaryStringToByteArray = binaryStringToByteArray;
exports.default = CPResourceSaver;

var _CPChibiFile = require("./CPChibiFile");

var _CPChibiFile2 = _interopRequireDefault(_CPChibiFile);

var _CPArtwork = require("./CPArtwork");

var _CPArtwork2 = _interopRequireDefault(_CPArtwork);

var _AdobeColorTable = require("../util/AdobeColorTable");

var _AdobeColorTable2 = _interopRequireDefault(_AdobeColorTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * We generally can't do much with binary strings because various methods will try to UTF-8 mangle them.
 * This function converts such a string to a Uint8Array instead.
 */
function binaryStringToByteArray(s) {
    var result = new Uint8Array(s.length);

    for (var i = 0; i < s.length; i++) {
        result[i] = s.charCodeAt(i);
    }

    return result;
}

/**
 * Saves ChickenPaint resources to a remote server or to the disk and emits progress events.
 *
 * Options:
 *     url - URL to send to. If omitted, will save to the disk instead.
 *     artwork - Artwork to send
 *     rotation - Integer [0..3] of the number of 90 degree rotation steps that should be applied to canvas upon opening.
 *     swatches - Array of ARGB integer colors to save as the image swatches (optional)
 */
function CPResourceSaver(options) {
    var that = this,
        cancelled = false;

    options.rotation = options.rotation || 0;

    function reportProgress(progress) {
        if (progress === null) {
            that.emitEvent("savingProgress", [1.0, "Saving your drawing to the server..."]);
        } else {
            that.emitEvent("savingProgress", [progress, "Saving your drawing to the server...  (" + Math.round(progress * 100) + "%)"]);
        }
    }

    function reportFatal(serverMessage) {
        that.emitEvent("savingFailure", [serverMessage]);
    }

    function postDrawing(formData) {
        var xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", function (evt) {
            var progress;

            if (evt.lengthComputable) {
                progress = evt.loaded / evt.total;
            } else {
                progress = null;
            }

            reportProgress(progress);
        }, false);

        xhr.addEventListener("load", function (evt) {
            reportProgress(1.0);

            if (this.status == 200 && /^CHIBIOK/.test(this.response)) {
                that.emitEvent("savingComplete");
            } else {
                reportFatal(this.response);
            }
        }, false);

        xhr.addEventListener("error", function () {
            reportFatal(this.response);
        }, false);

        reportProgress(0);

        xhr.open("POST", options.url, true);

        xhr.responseType = "text";

        xhr.send(formData);
    }

    /**
     * Begin saving the data provided in the constructor. Returns immediately, and fires these events to report the
     * saving progress:
     * 
     * savingProgress(progress) - Progress is [0.0 ... 1.0] and reports how much has uploaded so far, or null if the 
     *                            total progress could not be determined.
     * savingFailure(error)     - When saving fails, along with a string error message to display to the user. 
     * savingComplete()         - When saving completes succesfully
     */
    this.save = function () {
        var flat, flatBlob, swatchesBlob;

        flat = binaryStringToByteArray(options.artwork.getFlatPNG(options.rotation));
        flatBlob = new Blob([flat], { type: "image/png" });
        flat = null; // Don't need this any more

        var serializeLayers;

        if (options.artwork.isSimpleDrawing()) {
            serializeLayers = Promise.resolve(null);
        } else {
            serializeLayers = new _CPChibiFile2.default().serialize(options.artwork);
        }

        serializeLayers.then(function (chibiBlob) {
            if (cancelled) {
                that.emitEvent("savingFailure");
                return;
            }

            if (options.swatches) {
                var aco = new _AdobeColorTable2.default();

                swatchesBlob = new Blob([aco.write(options.swatches)], { type: "application/octet-stream" });
            } else {
                swatchesBlob = null;
            }

            if (options.url) {
                var marker = "This marker ensures the upload wasn't truncated",
                    formData = new FormData();

                formData.append("beginMarker", marker);

                formData.append("painter", "ChickenPaint v1.0");

                formData.append("picture", flatBlob);
                flatBlob = null;

                if (chibiBlob) {
                    formData.append("chibifileFormat", "ChickenPaint v0.0");
                    formData.append("chibifile", chibiBlob);
                    chibiBlob = null;

                    // Layers will need to be rotated upon opening
                    formData.append("rotation", "" + options.rotation);
                } else {
                    /*
                     * Because the image is a flat PNG, we rotate it before we saved it and it doesn't need further
                     * rotation upon opening.
                     */
                    formData.append("rotation", "0");
                }

                if (swatchesBlob) {
                    formData.append("swatches", swatchesBlob);
                    swatchesBlob = null;
                }

                formData.append("endMarker", marker);

                postDrawing(formData);
            } else {
                window.saveAs(flatBlob, "oekaki.png");

                if (chibiBlob) {
                    window.saveAs(chibiBlob, "oekaki.chi");
                }
                if (swatchesBlob) {
                    window.saveAs(swatchesBlob, "oekaki.aco");
                }
            }
        });
    };

    this.cancel = function () {
        cancelled = true;
    };
}

CPResourceSaver.prototype = Object.create(EventEmitter.prototype);
CPResourceSaver.prototype.constructor = CPResourceSaver;

},{"../util/AdobeColorTable":44,"./CPArtwork":2,"./CPChibiFile":7}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPUndo;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPUndo() {}

/**
 * Attempt to merge the given undo into this one, and return true if successful.
 *
 * @param undo
 * @returns {boolean}
 */
CPUndo.prototype.merge = function (undo) {
    return false;
};

/**
 * Return true if this undo didn't modify the document.
 *
 * @returns {boolean}
 */
CPUndo.prototype.noChange = function () {
    return false;
};

/**
 * Return the number of bytes of memory used by this undo, or 0 if it cannot be estimated.
 *
 * @param undone
 * @param param
 * @returns {number}
 */
CPUndo.prototype.getMemoryUsed = function (undone, param) {
    return 0;
};

/**
 * Call when this undo is no longer on the top of the stack, so it can optimize its memory usage.
 */
CPUndo.prototype.compact = function () {};
module.exports = exports["default"];

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPAboutDialog;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPAboutDialog(parent) {
    var dialog = $("<div class=\"modal fade chickenpaint-about-dialog\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">About ChickenPaint</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <a class=\"chickenpaint-on-github\" target=\"_blank\" href=\"https://github.com/thenickdude/chickenpaint\"><span class=\"fa fa-github\"></span> ChickenPaint on GitHub</a>\n                            \n                            <p>\n                                ChickenPaint is a translation of <a href=\"http://www.chibipaint.com/\" target=\"_blank\">ChibiPaint</a>\n                                from Java to JavaScript by Nicholas Sherlock / Chicken Smoothie\n                            </p>\n                            <p>\n                                ChibiPaint is Copyright (c) 2006-2008 Marc Schefer. All Rights Reserved\n                            </p>\n                            <p>\n                                ChickenPaint is free software: you can redistribute it and/or modify\n                                it under the terms of the GNU General Public License as published by\n                                the Free Software Foundation, either version 3 of the License, or\n                                (at your option) any later version.\n                            </p>\n        \n                            <p>\n                                ChickenPaint is distributed in the hope that it will be useful,\n                                but WITHOUT ANY WARRANTY; without even the implied warranty of\n                                MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n                                <a target=\"_blank\" href=\"http://www.gnu.org/licenses/\">GNU General Public License</a> for more details.\n                            </p>\n        \n                            <pre class=\"pre-scrollable chickenpaint-third-party-licenses\">Includes icons from the <a href=\"http://tango.freedesktop.org/\" target=\"_blank\">Tango Desktop Project</a>\n\nIncludes these MIT-licensed libraries:\n\n    Includes the <a target=\"_blank\" href=\"https://github.com/eligrey/FileSaver.js\">FileSaver.js library</a>\n    FileSaver.js Copyright \xA9 2015 <a target=\"_blank\" href=\"http://eligrey.com/\">Eli Grey</a>\n\n    Includes the <a target=\"_blank\" href=\"https://github.com/nodeca/pako\">Pako zlib compression library</a>\n    Copyright (C) 2014-2015 by Vitaly Puzrin\n    \n    Includes the <a target=\"_blank\" href=\"https://github.com/madrobby/keymaster\">keymaster.js</a> keyboard library\n    Copyright (c) 2011-2013 Thomas Fuchs\n\n    Includes the <a target=\"_blank\" href=\"https://github.com/stefanpenner/es6-promise\">es6-promise</a> library\n    Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors\n\n    Includes the <a target=\"_blank\" href=\"http://benalman.com/projects/jquery-throttle-debounce-plugin/\">jQuery throttle-debounce</a> library\n    Copyright (c) 2010 \"Cowboy\" Ben Alman\n\n    Permission is hereby granted, free of charge, to any person\n    obtaining a copy of this software and associated documentation\n    files (the \"Software\"), to deal in the Software without\n    restriction, including without limitation the rights to use,\n    copy, modify, merge, publish, distribute, sublicense, and/or\n    sell copies of the Software, and to permit persons to whom the\n    Software is furnished to do so, subject to the following\n    conditions:\n\n    The above copyright notice and this permission notice shall be\n    included in all copies or substantial portions of the Software.\n\n    THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\n    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES\n    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\n    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT \n    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\n    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\n    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n    OTHER DEALINGS IN THE SOFTWARE.\n\nIncludes the <a href=\"http://www.jquery.com/\" target=\"_blank\">JQuery library</a>\nCopyright <a href=\"https://jquery.org/\" target=\"_blank\">jQuery Foundation and other contributors</a>\n    \n    This software consists of voluntary contributions made by many\n    individuals. For exact contribution history, see the revision \n    history available at https://github.com/jquery/jquery\n    \n    The following license applies to all parts of this software \n    except as documented below:\n    \n    Permission is hereby granted, free of charge, to any person \n    obtaining a copy of this software and associated documentation\n    files (the \"Software\"), to deal in the Software without\n    restriction, including without limitation the rights to use, \n    copy, modify, merge, publish, distribute, sublicense, and/or\n    sell copies of the Software, and to permit persons to whom the\n    Software is furnished to do so, subject to the following\n    conditions:\n    \n    The above copyright notice and this permission notice shall be\n    included in all copies or substantial portions of the Software.\n    \n    THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,\n    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES\n    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND\n    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT\n    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,\n    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING\n    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR\n    OTHER DEALINGS IN THE SOFTWARE.\n                    </pre>\n                </div>\n            </div>\n        </div>\n    ");

    // Destroy the modal upon close
    dialog.on("hidden.bs.modal", function (e) {
        dialog.remove();
    });

    dialog.modal({
        show: false
    });

    // Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
    dialog.data("bs.modal").$body = $(parent);

    parent.appendChild(dialog[0]);

    this.show = function () {
        dialog.modal("show");
    };
}
module.exports = exports["default"];

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBoxBlurDialog;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPBoxBlurDialog(parent, controller) {
    var dialog = $("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Box blur</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form>\n                                <div class=\"form-group\">\n                                    <label>Blur amount (pixels)</label>\n                                    <input type=\"text\" class=\"form-control chickenpaint-blur-amount\" value=\"3\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label>Iterations (1-8, larger gives smoother blur)</label>\n                                    <input type=\"text\" class=\"form-control chickenpaint-blur-iterations\" value=\"1\">\n                                </div>\n                            </form>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                            <button type=\"button\" class=\"btn btn-primary chickenpaint-apply-box-blur\" data-dismiss=\"modal\">Ok</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "),
        blurAmountElem = $(".chickenpaint-blur-amount", dialog),
        blurIterationsElem = $(".chickenpaint-blur-iterations", dialog),
        applyButton = $(".chickenpaint-apply-box-blur", dialog);

    this.show = function () {
        dialog.modal("show");
    };

    applyButton.click(function (e) {
        var blur = Math.max(parseInt(blurAmountElem.val(), 10), 1),
            iterations = Math.min(Math.max(parseInt(blurIterationsElem.val(), 10), 1), 8);

        controller.getArtwork().boxBlur(blur, blur, iterations);
    });

    dialog.modal({
        show: false
    }).on('shown.bs.modal', function () {
        blurAmountElem.focus();
    }).on('keypress', function (e) {
        if (e.keyCode == 13) {
            applyButton.click();
        }
    });

    // Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
    dialog.data("bs.modal").$body = $(parent);

    parent.appendChild(dialog[0]);

    /* TODO
    panel.add(new JLabel("Blur amount:"));
    SpinnerModel blurXSM = new SpinnerNumberModel(3, 1, 100, 1);
    
    panel.add(new JLabel("Iterations:"));
    SpinnerModel iterSM = new SpinnerNumberModel(1, 1, 8, 1);
    */
}
module.exports = exports["default"];

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBrushPalette;

var _ChickenPaint = require("../ChickenPaint");

var _ChickenPaint2 = _interopRequireDefault(_ChickenPaint);

var _CPPalette = require("./CPPalette");

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _CPCheckbox = require("./CPCheckbox");

var _CPCheckbox2 = _interopRequireDefault(_CPCheckbox);

var _CPColorSwatch = require("./CPColorSwatch");

var _CPColorSwatch2 = _interopRequireDefault(_CPColorSwatch);

var _CPSlider = require("./CPSlider");

var _CPSlider2 = _interopRequireDefault(_CPSlider);

var _CPGUIUtils = require("./CPGUIUtils");

var _CPLayer = require("../engine/CPLayer");

var _CPLayer2 = _interopRequireDefault(_CPLayer);

var _CPColor = require("../util/CPColor");

var _CPColor2 = _interopRequireDefault(_CPColor);

var _CPPolyfill = require("../util/CPPolyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sliderCheckboxGroup(checkbox, slider) {
    var group = document.createElement("div");

    group.className = "chickenpaint-checkbox-slider-group";

    group.appendChild(checkbox.getElement());
    group.appendChild(slider.getElement());

    return group;
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

function fillCombobox(combo, optionNames) {
    for (var key in optionNames) {
        var option = document.createElement("option");

        option.appendChild(document.createTextNode(optionNames[key]));
        option.value = key;

        combo.appendChild(option);
    }
}

function CPGradientPreview(controller) {
    var that = this,
        w = 150,
        h = 32,
        canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),
        checkerboard = (0, _CPGUIUtils.createCheckerboardPattern)(canvasContext),
        image = new _CPLayer2.default(w, h, ""),
        imageCanvas = document.createElement("canvas"),
        imageCanvasContext = imageCanvas.getContext("2d"),
        gradient = controller.getCurGradient();

    function paint() {
        image.gradient(image.getBounds(), 0, 0, image.width, 0, gradient, true);
        imageCanvasContext.putImageData(image.imageData, 0, 0, 0, 0, w, h);

        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.drawImage(imageCanvas, 0, 0);
    }

    this.getElement = function () {
        return canvas;
    };

    controller.on("gradientChange", function (_gradient) {
        gradient = _gradient;

        paint();
    });

    canvas.width = imageCanvas.width = w;
    canvas.height = imageCanvas.height = h;

    canvas.className = 'chickenpaint-gradient-preview';

    canvasContext.fillStyle = checkerboard;

    paint();
}

function CPBrushPalette(controller) {
    _CPPalette2.default.call(this, controller, "brush", "Tool options");

    var brushPanel = new CPBrushPanel(controller),
        gradientPanel = new CPGradientPanel(controller),
        transformPanel = new CPTransformPanel(controller),
        body = this.getBodyElement();

    body.appendChild(brushPanel.getElement());
    body.appendChild(gradientPanel.getElement());
    body.appendChild(transformPanel.getElement());

    controller.on('modeChange', function (mode) {
        brushPanel.getElement().style.display = "none";
        gradientPanel.getElement().style.display = "none";
        transformPanel.getElement().style.display = "none";

        switch (mode) {
            case _ChickenPaint2.default.M_GRADIENTFILL:
                gradientPanel.getElement().style.display = "block";
                break;
            case _ChickenPaint2.default.M_TRANSFORM:
                transformPanel.getElement().style.display = "block";
                break;
            default:
                brushPanel.getElement().style.display = "block";
                break;
        }
    });
}

CPBrushPalette.prototype = Object.create(_CPPalette2.default.prototype);
CPBrushPalette.prototype.constructor = CPBrushPalette;

function CPBrushPanel(controller) {
    var TIP_NAMES = ["Round Pixelated", "Round Hard Edge", "Round Soft", "Square Pixelated", "Square Hard Edge"],
        BRUSH_SIZES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200];

    var panel = document.createElement("div"),
        tipCombo = document.createElement("select"),
        alphaCB = new _CPCheckbox2.default(false, "Control brush opacity with pen pressure"),
        alphaSlider = new _CPSlider2.default(1, 255),
        sizeCB = new _CPCheckbox2.default(true, "Control brush size with pen pressure"),
        sizeSlider = new _CPSlider2.default(1, 200, false, true),
        scatteringCB = new _CPCheckbox2.default(false, "Control brush scattering with pen pressure"),
        scatteringSlider = new _CPSlider2.default(0, 1000, false, true),
        resatSlider = new _CPSlider2.default(0, 100, false, true),
        bleedSlider = new _CPSlider2.default(0, 100, false, true),
        spacingSlider = new _CPSlider2.default(0, 100, false, true),
        smoothingSlider = new _CPSlider2.default(0, 100, false, true),
        brushPreview = new CPBrushPalette.CPBrushPreview(controller);

    function fillWithInitialValues() {
        alphaCB.setValue(controller.getBrushInfo().pressureAlpha);
        alphaSlider.setValue(controller.getAlpha());

        sizeCB.setValue(controller.getBrushInfo().pressureSize);
        sizeSlider.setValue(controller.getBrushSize());

        scatteringCB.setValue(controller.getBrushInfo().pressureScattering);
        scatteringSlider.setValue(~~(controller.getBrushInfo().scattering * 100));

        tipCombo.value = controller.getBrushInfo().type;

        resatSlider.setValue(~~(controller.getBrushInfo().resat * 100));
        bleedSlider.setValue(~~(controller.getBrushInfo().bleed * 100));
        spacingSlider.setValue(~~(controller.getBrushInfo().spacing * 100));
        smoothingSlider.setValue(~~(controller.getBrushInfo().smoothing * 100));
    }

    this.getElement = function () {
        return panel;
    };

    alphaSlider.title = function (value) {
        return "Opacity: " + value;
    };

    alphaSlider.on('valueChange', function (value) {
        controller.setAlpha(value);
    });

    sizeSlider.title = function (value) {
        return "Brush size: " + value;
    };

    sizeSlider.on('valueChange', function (value) {
        controller.setBrushSize(value);
    });

    resatSlider.title = function (value) {
        return "Color: " + value + "%";
    };

    resatSlider.on('valueChange', function (value) {
        controller.getBrushInfo().resat = value / 100.0;
        controller.callToolListeners();
    });

    bleedSlider.title = function (value) {
        return "Blend: " + value + "%";
    };

    bleedSlider.on('valueChange', function (value) {
        controller.getBrushInfo().bleed = value / 100.0;
        controller.callToolListeners();
    });

    spacingSlider.title = function (value) {
        return "Spacing: " + value + "%";
    };

    spacingSlider.on('valueChange', function (value) {
        controller.getBrushInfo().spacing = value / 100.0;
        controller.callToolListeners();
    });

    scatteringSlider.title = function (value) {
        return "Scattering: " + value + "%";
    };

    scatteringSlider.on('valueChange', function (value) {
        controller.getBrushInfo().scattering = value / 100.0;
        controller.callToolListeners();
    });

    smoothingSlider.title = function (value) {
        return "Smoothing: " + value + "%";
    };

    smoothingSlider.on('valueChange', function (value) {
        controller.getBrushInfo().smoothing = value / 100.0;
        controller.callToolListeners();
    });

    scatteringCB.on('valueChange', function (state) {
        controller.getBrushInfo().pressureScattering = state;
        controller.callToolListeners();
    });

    alphaCB.on('valueChange', function (state) {
        controller.getBrushInfo().pressureAlpha = state;
        controller.callToolListeners();
    });

    sizeCB.on('valueChange', function (state) {
        controller.getBrushInfo().pressureSize = state;
        controller.callToolListeners();
    });

    tipCombo.addEventListener("change", function (e) {
        controller.getBrushInfo().type = parseInt(tipCombo.value, 10);
    });

    tipCombo.className = 'form-control';
    fillCombobox(tipCombo, TIP_NAMES);

    panel.appendChild(tipCombo);

    panel.appendChild(brushPreview.getElement());

    panel.appendChild(sliderCheckboxGroup(sizeCB, sizeSlider));
    panel.appendChild(sliderCheckboxGroup(alphaCB, alphaSlider));
    panel.appendChild(resatSlider.getElement());
    panel.appendChild(bleedSlider.getElement());
    panel.appendChild(spacingSlider.getElement());
    panel.appendChild(sliderCheckboxGroup(scatteringCB, scatteringSlider));
    panel.appendChild(smoothingSlider.getElement());

    fillWithInitialValues();

    controller.on('toolChange', function (tool, toolInfo) {
        alphaSlider.setValue(toolInfo.alpha);
        sizeSlider.setValue(toolInfo.size);
        sizeCB.setValue(toolInfo.pressureSize);
        alphaCB.setValue(toolInfo.pressureAlpha);
        tipCombo.value = toolInfo.type;
        scatteringCB.setValue(toolInfo.pressureScattering);

        if (~~(toolInfo.resat * 100.0) != resatSlider.value) {
            resatSlider.setValue(~~(toolInfo.resat * 100.0));
        }

        if (~~(toolInfo.bleed * 100.0) != bleedSlider.value) {
            bleedSlider.setValue(~~(toolInfo.bleed * 100.0));
        }

        if (~~(toolInfo.spacing * 100.0) != spacingSlider.value) {
            spacingSlider.setValue(~~(toolInfo.spacing * 100.0));
        }

        if (~~(toolInfo.scattering * 100.0) != scatteringSlider.value) {
            scatteringSlider.setValue(~~(toolInfo.scattering * 100.0));
        }

        if (~~(toolInfo.smoothing * 100.0) != smoothingSlider.value) {
            smoothingSlider.setValue(~~(toolInfo.smoothing * 100.0));
        }
    });

    key("1,2,3,4,5,6,7,8,9,0", function (event, handler) {
        var shortcut = parseInt(handler.shortcut, 10);

        if (shortcut == 0) {
            shortcut = 10;
        }

        controller.setAlpha(Math.round(shortcut / 10 * 255));
    });

    key("{,[", function () {
        var size = controller.getBrushSize();

        for (var i = BRUSH_SIZES.length - 1; i >= 0; i--) {
            if (size > BRUSH_SIZES[i]) {
                controller.setBrushSize(BRUSH_SIZES[i]);
                break;
            }
        }
    });

    key("},]", function () {
        var size = controller.getBrushSize();

        for (var i = 0; i < BRUSH_SIZES.length; i++) {
            if (size < BRUSH_SIZES[i]) {
                controller.setBrushSize(BRUSH_SIZES[i]);
                break;
            }
        }
    });
}

CPBrushPalette.CPBrushPreview = function (controller) {
    var size = 16,
        canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),
        mouseCaptured = false;

    function paint() {
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        canvasContext.beginPath();
        canvasContext.arc(canvas.width / 2, canvas.height / 2, size / 2 * window.devicePixelRatio, 0, Math.PI * 2);
        canvasContext.stroke();
    }

    function handleMouseDrag(e) {
        var offset = $(canvas).offset(),
            pt = { x: e.pageX - offset.left, y: e.pageY - offset.top },
            x = pt.x - $(canvas).width() / 2,
            y = pt.y - $(canvas).height() / 2,
            newSize = Math.round(Math.sqrt(x * x + y * y) * 2);

        size = Math.max(1, Math.min(200, newSize));

        paint();
        controller.setBrushSize(size);
    }

    function handleMouseUp(e) {
        if (mouseCaptured) {
            mouseCaptured = false;
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseDrag);
        }
    }

    this.getElement = function () {
        return canvas;
    };

    canvas.addEventListener('mousedown', function (e) {
        if (!mouseCaptured) {
            mouseCaptured = true;

            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('mousemove', handleMouseDrag);

            handleMouseDrag(e);
        }
    });

    controller.on("toolChange", function (tool, toolInfo) {
        if (toolInfo.size != size) {
            size = toolInfo.size;
            paint();
        }
    });

    canvas.width = 64;
    canvas.height = 64;

    if (window.devicePixelRatio > 1) {
        canvas.style.width = canvas.width + 'px';
        canvas.style.height = canvas.height + 'px';

        canvas.width = canvas.width * window.devicePixelRatio;
        canvas.height = canvas.height * window.devicePixelRatio;
    }

    canvas.className = 'chickenpaint-brush-preview';

    canvasContext.strokeStyle = 'black';
    canvasContext.lineWidth = 1.0 * window.devicePixelRatio;

    paint();
};

function CPGradientPanel(controller) {
    var gradientPanel = document.createElement("div"),
        gradientPreview = new CPGradientPreview(controller),
        gradientStartSwatch = new _CPColorSwatch2.default(new _CPColor2.default(controller.getCurGradient()[0] & 0xFFFFFF)),
        gradientEndSwatch = new _CPColorSwatch2.default(new _CPColor2.default(controller.getCurGradient()[1] & 0xFFFFFF));

    function updateGradient() {
        var gradient = new Array(2);

        gradient[0] = gradientStartSwatch.getAlpha() << 24 | gradientStartSwatch.getColorRgb();
        gradient[1] = gradientEndSwatch.getAlpha() << 24 | gradientEndSwatch.getColorRgb();

        controller.setCurGradient(gradient);
    }

    this.getElement = function () {
        return gradientPanel;
    };

    gradientPanel.className = "chickenpaint-gradient-panel";
    gradientPanel.style.display = "none";

    gradientStartSwatch.on("colorChange", updateGradient);
    gradientStartSwatch.on("alphaChange", updateGradient);
    gradientEndSwatch.on("colorChange", updateGradient);
    gradientEndSwatch.on("alphaChange", updateGradient);

    var title, colorsGroup, colorGroup;

    title = document.createElement("p");
    title.innerHTML = "Gradient";

    gradientPanel.appendChild(title);
    gradientPanel.appendChild(gradientPreview.getElement());

    colorsGroup = document.createElement("div");
    colorsGroup.className = "chickenpaint-gradient-colors";

    colorGroup = document.createElement("div");
    colorGroup.className = "chickenpaint-gradient-start-color";

    colorGroup.appendChild(gradientStartSwatch.getElement());

    colorsGroup.appendChild(colorGroup);

    colorGroup = document.createElement("div");
    colorGroup.className = "chickenpaint-gradient-end-color";

    colorGroup.appendChild(gradientEndSwatch.getElement());

    colorsGroup.appendChild(colorGroup);

    gradientPanel.appendChild(colorsGroup);
}

function CPTransformPanel(controller) {
    var TRANSFORM_INTERPOLATION = { smooth: "Smooth", sharp: "Sharp" };

    var panel = document.createElement("div"),
        acceptButton = document.createElement("button"),
        rejectButton = document.createElement("button"),
        interpCombo = document.createElement("select");

    this.getElement = function () {
        return panel;
    };

    panel.className = "chickenpaint-transform-panel";
    panel.style.display = "none";

    acceptButton.type = "button";
    rejectButton.type = "button";

    acceptButton.className = "btn btn-primary btn-block";
    rejectButton.className = "btn btn-default btn-block";

    acceptButton.innerHTML = "Apply transform";
    rejectButton.innerHTML = "Cancel";

    interpCombo.addEventListener("change", function (e) {
        controller.setTransformInterpolation(this.value);
    });

    interpCombo.className = 'form-control chickenpaint-transform-interpolation';
    fillCombobox(interpCombo, TRANSFORM_INTERPOLATION);

    if ((0, _CPPolyfill.isCanvasInterpolationSupported)()) {
        var interpGroup = document.createElement("div"),
            interpLabel = document.createElement("label");

        interpLabel.innerHTML = "Transform style";

        interpGroup.className = "form-group";
        interpGroup.appendChild(interpLabel);
        interpGroup.appendChild(interpCombo);

        panel.appendChild(interpGroup);
    }

    var buttonGroup = document.createElement("div");

    buttonGroup.appendChild(acceptButton);
    buttonGroup.appendChild(rejectButton);

    buttonGroup.className = "form-group";

    panel.appendChild(buttonGroup);

    acceptButton.addEventListener("click", function (e) {
        controller.actionPerformed({ action: "CPTransformAccept" });
        e.preventDefault();
    });

    rejectButton.addEventListener("click", function (e) {
        controller.actionPerformed({ action: "CPTransformReject" });
        e.preventDefault();
    });
}
module.exports = exports["default"];

},{"../ChickenPaint":1,"../engine/CPLayer":11,"../util/CPColor":47,"../util/CPPolyfill":49,"./CPCheckbox":20,"./CPColorSwatch":24,"./CPGUIUtils":26,"./CPPalette":32,"./CPSlider":37}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPCanvas;

var _CPRect = require("../util/CPRect");

var _CPRect2 = _interopRequireDefault(_CPRect);

var _CPTransform = require("../util/CPTransform");

var _CPTransform2 = _interopRequireDefault(_CPTransform);

var _CPWacomTablet = require("../util/CPWacomTablet");

var _CPWacomTablet2 = _interopRequireDefault(_CPWacomTablet);

var _CPBezier = require("../util/CPBezier");

var _CPBezier2 = _interopRequireDefault(_CPBezier);

var _throttleDebounce = require("../util/throttle-debounce");

var _CPPolygon = require("../util/CPPolygon");

var _CPPolygon2 = _interopRequireDefault(_CPPolygon);

var _CPPolyfill = require("../util/CPPolyfill");

var _ChickenPaint = require("../ChickenPaint");

var _ChickenPaint2 = _interopRequireDefault(_ChickenPaint);

var _CPBrushInfo = require("../engine/CPBrushInfo");

var _CPBrushInfo2 = _interopRequireDefault(_CPBrushInfo);

var _CPGUIUtils = require("./CPGUIUtils");

var _CPScrollbar = require("./CPScrollbar");

var _CPScrollbar2 = _interopRequireDefault(_CPScrollbar);

var _CPVector = require("../util/CPVector");

var _CPVector2 = _interopRequireDefault(_CPVector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPModeStack() {
    this.modes = [];
}

/* We have two distinguished mode indexes which correspond to the CPDefaultMode and the mode that the user has selected
 * in the tool palette (the global drawing mode). On top of that are other transient modes.
 */
CPModeStack.MODE_INDEX_DEFAULT = 0;
CPModeStack.MODE_INDEX_USER = 1;

CPModeStack.prototype.setMode = function (index, newMode) {
    var oldMode = this.modes[index];

    if (oldMode == newMode) {
        return;
    }

    if (oldMode) {
        oldMode.leave();
    }

    this.modes[index] = newMode;
    newMode.enter();
};

CPModeStack.prototype.setDefaultMode = function (newMode) {
    newMode.transient = false;
    newMode.capture = false;

    this.setMode(CPModeStack.MODE_INDEX_DEFAULT, newMode);
};

CPModeStack.prototype.setUserMode = function (newMode) {
    // Leave any transient modes that were on top of the user mode
    for (var i = this.modes.length - 1; i > CPModeStack.MODE_INDEX_USER; i--) {
        this.modes[i].leave();
        this.modes.splice(i, 1);
    }

    newMode.transient = false;
    newMode.capture = false;

    this.setMode(CPModeStack.MODE_INDEX_USER, newMode);
};

/**
 * Deliver the event with the given name and array of parameters to the mode stack.
 *
 * @param event
 * @param params
 * @returns {boolean} True if any mode captured the event
 */
CPModeStack.prototype.deliverEvent = function (event, params) {
    for (var i = this.modes.length - 1; i >= 0; i--) {
        var mode = this.modes[i];

        if (mode[event].apply(mode, params) || mode.capture && event != "paint") {
            /* If the event was handled, don't try to deliver it to anything further up the stack */
            return true;
        }
    }

    return false;
};

// We can call these routines to deliver events that bubble up the mode stack
var _arr = ["mouseDown", "mouseUp"];

var _loop = function _loop() {
    var eventName = _arr[_i];
    CPModeStack.prototype[eventName] = function (e, button, pressure) {
        this.deliverEvent(eventName, [e, button, pressure]);
    };
};

for (var _i = 0; _i < _arr.length; _i++) {
    _loop();
}

var _arr2 = ["mouseDrag", "mouseMove"];

var _loop2 = function _loop2() {
    var eventName = _arr2[_i2];
    CPModeStack.prototype[eventName] = function (e, pressure) {
        this.deliverEvent(eventName, [e, pressure]);
    };
};

for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
    _loop2();
}

var _arr3 = ["keyDown", "keyUp"];

var _loop3 = function _loop3() {
    var eventName = _arr3[_i3];
    CPModeStack.prototype[eventName] = function (e) {
        if (this.deliverEvent(eventName, [e])) {
            // Swallow handled keypresses
            e.preventDefault();
        }
    };
};

for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
    _loop3();
}

CPModeStack.prototype.paint = function (context) {
    this.deliverEvent("paint", [context]);
};

/**
 * Add a mode to the top of the mode stack.
 *
 * @param mode {CPMode}
 * @param transient {boolean} Set to true if the mode is expected to remove itself from stack upon completion.
 */
CPModeStack.prototype.push = function (mode, transient) {
    var previousTop = this.peek();

    if (previousTop) {
        previousTop.suspend();
    }

    mode.transient = transient;
    mode.capture = false;

    mode.enter();

    this.modes.push(mode);
};

CPModeStack.prototype.peek = function () {
    if (this.modes.length > 0) {
        return this.modes[this.modes.length - 1];
    } else {
        return null;
    }
};

/**
 * Remove the node at the top of the stack and return the new top of the stack.
 *
 * @returns {*}
 */
CPModeStack.prototype.pop = function () {
    var outgoingMode = this.modes.pop(),
        newTop = this.peek();

    if (outgoingMode) {
        outgoingMode.leave();
    }

    if (newTop) {
        newTop.resume();
    }

    return newTop;
};

function CPCanvas(controller) {
    var BUTTON_PRIMARY = 0,
        BUTTON_WHEEL = 1,
        BUTTON_SECONDARY = 2,
        MIN_ZOOM = 0.10,
        MAX_ZOOM = 16.0,
        CURSOR_DEFAULT = "default",
        CURSOR_PANNABLE = "grab",
        CURSOR_PANNING = "grabbing",
        CURSOR_CROSSHAIR = "crosshair",
        CURSOR_MOVE = "move",
        CURSOR_NESW_RESIZE = "nesw-resize",
        CURSOR_NWSE_RESIZE = "nwse-resize",
        CURSOR_NS_RESIZE = "ns-resize",
        CURSOR_EW_RESIZE = "ew-resize";

    var that = this,
        canvasContainer = document.createElement("div"),
        canvasContainerTop = document.createElement("div"),
        canvasContainerBottom = document.createElement("div"),


    // Our canvas that fills the entire screen
    canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),


    // Our cache of the artwork's fusion to be drawn onto our main canvas using our current transform
    artworkCanvas = document.createElement("canvas"),
        artworkCanvasContext = artworkCanvas.getContext("2d"),
        checkerboardPattern = (0, _CPGUIUtils.createCheckerboardPattern)(canvasContext),
        artwork = controller.getArtwork(),


    // Canvas transformations
    zoom = 1,
        offsetX = 0,
        offsetY = 0,
        canvasRotation = 0.0,
        transform = new _CPTransform2.default(),
        interpolation = false,


    // Grid options
    showGrid = false,
        gridSize = 32,
        mouseX = 0,
        mouseY = 0,
        mouseIn = false,
        mouseDown = [false, false, false] /* Track each button independently */,
        wacomPenDown = false,


    /* The area of the document that should have its layers fused and repainted to the screen
     * (i.e. an area modified by drawing tools). 
     * 
     * Initially set to the size of the artwork so we can repaint the whole thing.
     */
    artworkUpdateRegion = new _CPRect2.default(0, 0, artwork.width, artwork.height),


    /**
     * The area of the canvas that should be repainted to the screen during the next repaint internal (in canvas
     * coordinates).
     */
    repaintRegion = new _CPRect2.default(0, 0, 0, 0),
        scheduledRepaint = false,


    //
    // Modes system: modes control the way the GUI is reacting to the user input
    // All the tools are implemented through modes
    //

    defaultMode,
        colorPickerMode,
        panMode,
        rotateCanvasMode,
        floodFillMode,
        gradientFillMode,
        rectSelectionMode,
        moveToolMode,
        transformMode,


    // this must correspond to the stroke modes defined in CPToolInfo
    drawingModes = [],
        modeStack = new CPModeStack(),
        curDrawMode,
        curSelectedMode,
        horzScroll = new _CPScrollbar2.default(false),
        vertScroll = new _CPScrollbar2.default(true),
        tablet = _CPWacomTablet2.default.getRef();

    Math.sign = Math.sign || function (x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    };

    // Parent class with empty event handlers for those drawing modes that don't need every event
    function CPMode() {}

    /**
        * True if this mode will be exiting the mode stack as soon as the current interation is complete.
        *
        * @type {boolean}
        */
    CPMode.prototype.transient = false;

    /**
        * If true, no input events will be sent to any modes underneath this one (event stream is captured).
        *
        * Painting events will continue to bubble.
        *
        * @type {boolean}
        */
    CPMode.prototype.capture = false;

    CPMode.prototype.enter = function () {
        setCursor(CURSOR_DEFAULT);
    };

    CPMode.prototype.leave = function () {
        this.capture = false;
    };

    CPMode.prototype.mouseMove = CPMode.prototype.paint = CPMode.prototype.mouseDown = CPMode.prototype.mouseDrag = CPMode.prototype.mouseUp = CPMode.prototype.keyDown = CPMode.prototype.suspend = CPMode.prototype.resume = CPMode.prototype.keyUp = function () {};

    //
    // Default UI Mode when not doing anything: used to start the other modes
    //

    function CPDefaultMode() {}

    CPDefaultMode.prototype = Object.create(CPMode.prototype);
    CPDefaultMode.prototype.constructor = CPDefaultMode;

    CPDefaultMode.prototype.mouseDown = function (e, button, pressure) {
        var spacePressed = key.isPressed("space");

        if (!spacePressed && (button == BUTTON_SECONDARY || button == BUTTON_PRIMARY && e.altKey)) {
            modeStack.push(colorPickerMode, true);
            // Avoid infinite recursion by only delivering the event to the new mode (don't let it bubble back to us!)
            modeStack.peek().mouseDown(e, button, pressure);
        } else if (button == BUTTON_WHEEL || spacePressed && button == BUTTON_PRIMARY) {
            if (e.altKey) {
                modeStack.push(rotateCanvasMode, true);
                modeStack.peek().mouseDown(e, button, pressure);
            } else {
                modeStack.push(panMode, true);
                modeStack.peek().mouseDown(e, button, pressure);
            }
        }
    };

    CPDefaultMode.prototype.keyDown = function (e) {
        if (e.keyCode == 32 /* Space */) {
                if (e.altKey) {
                    modeStack.push(rotateCanvasMode, true);
                    modeStack.peek().keyDown(e);
                } else {
                    // We can start the pan mode before the mouse button is even pressed, so that the "grabbable" cursor appears
                    modeStack.push(panMode, true);
                    modeStack.peek().keyDown(e);
                }
                return true;
            }
    };

    /**
        * A base for the three drawing modes, so they can all share the same brush-preview-circle drawing behaviour.
        *
        * @constructor
        */
    function CPDrawingMode() {
        this.shouldPaintBrushPreview = false;

        /* The last rectangle we dirtied with a brush preview circle, or null if one hasn't been drawn yet */
        this.oldPreviewRect = null;
    }

    CPDrawingMode.prototype = Object.create(CPMode.prototype);
    CPDrawingMode.prototype.constructor = CPDrawingMode;

    /**
     * Get a rectangle that encloses the preview brush, in screen coordinates.
     */
    CPDrawingMode.prototype.getBrushPreviewOval = function () {
        var brushSize = controller.getBrushSize() * zoom;

        return new _CPRect2.default(mouseX - brushSize / 2, mouseY - brushSize / 2, mouseX + brushSize / 2, mouseY + brushSize / 2);
    };

    /**
     * Queues up the brush preview oval to be drawn.
     */
    CPDrawingMode.prototype.queueBrushPreview = function () {
        /* If we're not the top-most mode, it's unlikely that left clicking will drawing for us, so don't consider
         * painting the brush preview
         */
        if (modeStack.peek() != this) {
            return;
        }

        this.shouldPaintBrushPreview = true;

        var rect = this.getBrushPreviewOval();

        rect.grow(2, 2);

        // If a brush preview was drawn previously, stretch the repaint region to remove that old copy
        if (this.oldPreviewRect != null) {
            rect.union(this.oldPreviewRect);
            this.oldPreviewRect = null;
        }

        repaintRect(rect);
    };

    /**
        * Erase the brush preview if one had been drawn
        */
    CPDrawingMode.prototype.eraseBrushPreview = function () {
        this.shouldPaintBrushPreview = false;

        if (this.oldPreviewRect != null) {
            repaintRect(this.oldPreviewRect);
            this.oldPreviewRect = null;
        }
    };

    CPDrawingMode.prototype.mouseMove = function (e, pressure) {
        this.queueBrushPreview();
    };

    CPDrawingMode.prototype.enter = function () {
        CPMode.prototype.enter.call(this);

        if (mouseIn) {
            this.queueBrushPreview();
        }
    };

    CPDrawingMode.prototype.leave = function () {
        CPMode.prototype.leave.call(this);
        this.eraseBrushPreview();
    };

    CPDrawingMode.prototype.suspend = CPDrawingMode.prototype.leave;
    CPDrawingMode.prototype.resume = CPDrawingMode.prototype.enter;

    CPDrawingMode.prototype.paint = function () {
        if (this.shouldPaintBrushPreview) {
            this.shouldPaintBrushPreview = false;

            var r = this.getBrushPreviewOval();

            canvasContext.beginPath();

            canvasContext.arc((r.left + r.right) / 2, (r.top + r.bottom) / 2, r.getWidth() / 2, 0, Math.PI * 2);

            canvasContext.stroke();

            r.grow(2, 2);

            if (this.oldPreviewRect == null) {
                this.oldPreviewRect = r;
            } else {
                this.oldPreviewRect.union(r);
            }
        }
    };

    function CPFreehandMode() {
        CPDrawingMode.call(this);

        this.smoothMouse = { x: 0.0, y: 0.0 };
    }

    CPFreehandMode.prototype = Object.create(CPDrawingMode.prototype);
    CPFreehandMode.prototype.constructor = CPFreehandMode;

    CPFreehandMode.prototype.mouseDown = function (e, button, pressure) {
        if (!this.capture && button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space") && shouldDrawToThisLayer()) {
            var pf = coordToDocument({ x: mouseX, y: mouseY });

            this.eraseBrushPreview();

            this.capture = true;
            artwork.beginStroke(pf.x, pf.y, pressure);

            this.smoothMouse = pf;

            return true;
        }
    };

    CPFreehandMode.prototype.mouseDrag = function (e, pressure) {
        if (this.capture) {
            var pf = coordToDocument({ x: mouseX, y: mouseY }),
                smoothing = Math.min(0.999, Math.pow(controller.getBrushInfo().smoothing, 0.3));

            this.smoothMouse.x = (1.0 - smoothing) * pf.x + smoothing * this.smoothMouse.x;
            this.smoothMouse.y = (1.0 - smoothing) * pf.y + smoothing * this.smoothMouse.y;

            artwork.continueStroke(this.smoothMouse.x, this.smoothMouse.y, pressure);

            return true;
        } else {
            this.mouseMove(e);
        }
    };

    CPFreehandMode.prototype.mouseUp = function (e, button, pressure) {
        if (this.capture) {
            if (button == BUTTON_PRIMARY) {
                this.capture = false;
                artwork.endStroke();
            }
            return true;
        }
    };

    function CPLineMode() {
        var dragLineFrom,
            dragLineTo,
            LINE_PREVIEW_WIDTH = 1;

        this.mouseDown = function (e, button, pressure) {
            if (!this.capture && button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space") && shouldDrawToThisLayer()) {
                this.capture = true;
                dragLineFrom = dragLineTo = { x: mouseX + 0.5, y: mouseY + 0.5 };

                this.eraseBrushPreview();

                return true;
            }
        };

        this.mouseDrag = function (e) {
            if (this.capture) {
                var
                // The old line position that we'll invalidate for redraw
                invalidateRect = new _CPRect2.default(Math.min(dragLineFrom.x, dragLineTo.x) - LINE_PREVIEW_WIDTH - 1, Math.min(dragLineFrom.y, dragLineTo.y) - LINE_PREVIEW_WIDTH - 1, Math.max(dragLineFrom.x, dragLineTo.x) + LINE_PREVIEW_WIDTH + 1 + 1, Math.max(dragLineFrom.y, dragLineTo.y) + LINE_PREVIEW_WIDTH + 1 + 1);

                dragLineTo = { x: mouseX + 0.5, y: mouseY + 0.5 }; // Target centre of pixel

                if (e.shiftKey) {
                    // Snap to nearest 45 degrees
                    var snap = Math.PI / 4,
                        angle = Math.round(Math.atan2(dragLineTo.y - dragLineFrom.y, dragLineTo.x - dragLineFrom.x) / snap);

                    switch (angle) {
                        case 0:
                        case 4:
                            dragLineTo.y = dragLineFrom.y;
                            break;

                        case 2:
                        case 6:
                            dragLineTo.x = dragLineFrom.x;
                            break;

                        default:
                            angle *= snap;

                            var length = Math.sqrt((dragLineTo.y - dragLineFrom.y) * (dragLineTo.y - dragLineFrom.y) + (dragLineTo.x - dragLineFrom.x) * (dragLineTo.x - dragLineFrom.x));

                            dragLineTo.x = dragLineFrom.x + length * Math.cos(angle);
                            dragLineTo.y = dragLineFrom.y + length * Math.sin(angle);
                    }
                }

                // The new line position
                invalidateRect.union(new _CPRect2.default(Math.min(dragLineFrom.x, dragLineTo.x) - LINE_PREVIEW_WIDTH - 1, Math.min(dragLineFrom.y, dragLineTo.y) - LINE_PREVIEW_WIDTH - 1, Math.max(dragLineFrom.x, dragLineTo.x) + LINE_PREVIEW_WIDTH + 1 + 1, Math.max(dragLineFrom.y, dragLineTo.y) + LINE_PREVIEW_WIDTH + 1 + 1));

                repaintRect(invalidateRect);

                return true;
            } else {
                this.mouseMove.call(this, e);
            }
        };

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == BUTTON_PRIMARY) {
                var from = coordToDocument(dragLineFrom),
                    to = coordToDocument(dragLineTo);

                this.capture = false;

                this.drawLine(from, to);

                var invalidateRect = new _CPRect2.default(Math.min(dragLineFrom.x, dragLineTo.x) - LINE_PREVIEW_WIDTH - 1, Math.min(dragLineFrom.y, dragLineTo.y) - LINE_PREVIEW_WIDTH - 1, Math.max(dragLineFrom.x, dragLineTo.x) + LINE_PREVIEW_WIDTH + 1 + 1, Math.max(dragLineFrom.y, dragLineTo.y) + LINE_PREVIEW_WIDTH + 1 + 1);

                repaintRect(invalidateRect);

                return true;
            }
        };

        this.paint = function () {
            if (this.capture) {
                canvasContext.lineWidth = LINE_PREVIEW_WIDTH;
                canvasContext.beginPath();
                canvasContext.moveTo(dragLineFrom.x, dragLineFrom.y);
                canvasContext.lineTo(dragLineTo.x, dragLineTo.y);
                canvasContext.stroke();
            } else {
                // Draw the regular brush preview circle
                CPDrawingMode.prototype.paint.call(this);
            }
        };

        CPDrawingMode.call(this);
    }

    CPLineMode.prototype = Object.create(CPDrawingMode.prototype);
    CPLineMode.prototype.constructor = CPLineMode;

    CPLineMode.prototype.drawLine = function (from, to) {
        artwork.beginStroke(from.x, from.y, 1);
        artwork.continueStroke(to.x, to.y, 1);
        artwork.endStroke();
    };

    function CPBezierMode() {
        var BEZIER_POINTS = 500,
            BEZIER_POINTS_PREVIEW = 100;

        var dragBezierMode = 0,
            // 0 Initial drag, 1 first control point, 2 second point
        dragBezierP0,
            dragBezierP1,
            dragBezierP2,
            dragBezierP3;

        this.mouseDown = function (e, button, pressure) {
            if (!this.capture && button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space") && shouldDrawToThisLayer()) {
                var p = coordToDocument({ x: mouseX, y: mouseY });

                dragBezierMode = 0;
                dragBezierP0 = dragBezierP1 = dragBezierP2 = dragBezierP3 = p;
                this.capture = true;

                this.eraseBrushPreview();

                return true;
            }
        };

        // Handles the first part of the Bezier where the user drags out a straight line
        this.mouseDrag = function (e) {
            if (this.capture && dragBezierMode == 0) {
                var p = coordToDocument({ x: mouseX, y: mouseY });

                dragBezierP2 = dragBezierP3 = p;

                that.repaintAll();

                return true;
            } else {
                this.mouseMove.call(this, e);
            }
        };

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == BUTTON_PRIMARY) {
                if (dragBezierMode == 0) {
                    dragBezierMode = 1;
                } else if (dragBezierMode == 1) {
                    dragBezierMode = 2;
                } else if (dragBezierMode == 2) {
                    this.capture = false;

                    var p0 = dragBezierP0,
                        p1 = dragBezierP1,
                        p2 = dragBezierP2,
                        p3 = dragBezierP3,
                        bezier = new _CPBezier2.default();

                    bezier.x0 = p0.x;
                    bezier.y0 = p0.y;
                    bezier.x1 = p1.x;
                    bezier.y1 = p1.y;
                    bezier.x2 = p2.x;
                    bezier.y2 = p2.y;
                    bezier.x3 = p3.x;
                    bezier.y3 = p3.y;

                    var x = new Array(BEZIER_POINTS),
                        y = new Array(BEZIER_POINTS);

                    bezier.compute(x, y, BEZIER_POINTS);

                    artwork.beginStroke(x[0], y[0], 1);
                    for (var i = 1; i < BEZIER_POINTS; i++) {
                        artwork.continueStroke(x[i], y[i], 1);
                    }
                    artwork.endStroke();
                    that.repaintAll();
                }

                return true;
            }
        };

        this.mouseMove = function (e, pressure) {
            if (this.capture) {
                var p = coordToDocument({ x: mouseX, y: mouseY });

                if (dragBezierMode == 1) {
                    dragBezierP1 = p;
                } else if (dragBezierMode == 2) {
                    dragBezierP2 = p;
                }
                that.repaintAll(); // FIXME: repaint only the bezier region

                return true;
            } else {
                // Draw the normal brush preview while not in the middle of a bezier operation
                CPDrawingMode.prototype.mouseMove.call(this, e, pressure);
            }
        };

        this.paint = function () {
            if (this.capture) {
                var bezier = new _CPBezier2.default(),
                    p0 = coordToDisplay(dragBezierP0),
                    p1 = coordToDisplay(dragBezierP1),
                    p2 = coordToDisplay(dragBezierP2),
                    p3 = coordToDisplay(dragBezierP3);

                bezier.x0 = p0.x;
                bezier.y0 = p0.y;
                bezier.x1 = p1.x;
                bezier.y1 = p1.y;
                bezier.x2 = p2.x;
                bezier.y2 = p2.y;
                bezier.x3 = p3.x;
                bezier.y3 = p3.y;

                var x = new Array(BEZIER_POINTS_PREVIEW),
                    y = new Array(BEZIER_POINTS_PREVIEW);

                bezier.compute(x, y, BEZIER_POINTS_PREVIEW);

                canvasContext.beginPath();

                canvasContext.moveTo(x[0], y[0]);
                for (var i = 1; i < BEZIER_POINTS_PREVIEW; i++) {
                    canvasContext.lineTo(x[i], y[i]);
                }

                canvasContext.moveTo(~~p0.x, ~~p0.y);
                canvasContext.lineTo(~~p1.x, ~~p1.y);

                canvasContext.moveTo(~~p2.x, ~~p2.y);
                canvasContext.lineTo(~~p3.x, ~~p3.y);

                canvasContext.stroke();
            } else {
                // Paint the regular brush preview
                CPDrawingMode.prototype.paint.call(this);
            }
        };

        CPDrawingMode.call(this);
    }

    CPBezierMode.prototype = Object.create(CPDrawingMode.prototype);
    CPBezierMode.prototype.constructor = CPBezierMode;

    function CPColorPickerMode() {
        var mouseButton;

        this.mouseDown = function (e, button, pressure) {
            if (this.capture) {
                return true;
            } else if (!key.isPressed("space") && (button == BUTTON_PRIMARY && (!this.transient || e.altKey) || button == BUTTON_SECONDARY)) {
                mouseButton = button;
                this.capture = true;

                setCursor(CURSOR_CROSSHAIR);

                this.mouseDrag(e);

                return true;
            } else if (this.transient) {
                // If we're not sampling and we get a button not intended for us, we probably shouldn't be on the stack
                modeStack.pop();
            }
        };

        this.mouseDrag = function (e) {
            if (this.capture) {
                var pf = coordToDocument({ x: mouseX, y: mouseY });

                if (artwork.isPointWithin(pf.x, pf.y)) {
                    controller.setCurColorRgb(artwork.colorPicker(pf.x, pf.y));
                }

                return true;
            }
        };

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == mouseButton) {
                mouseButton = -1;
                this.capture = false;
                setCursor(CURSOR_DEFAULT);

                if (this.transient) {
                    modeStack.pop();
                }

                return true;
            }
        };

        this.enter = function () {
            CPMode.prototype.enter.call(this);
            mouseButton = -1;
        };
    }

    CPColorPickerMode.prototype = Object.create(CPMode.prototype);
    CPColorPickerMode.prototype.constructor = CPColorPickerMode;

    function CPPanMode() {
        var panningX, panningY, panningOffset, panningButton;

        this.keyDown = function (e) {
            if (e.keyCode == 32 /* Space */) {
                    // If we're not already panning, then advertise that a left-click would pan
                    if (!this.capture) {
                        setCursor(CURSOR_PANNABLE);
                    }

                    return true;
                }
        };

        this.keyUp = function (e) {
            if (this.transient && panningButton != BUTTON_WHEEL && e.keyCode == 32 /* Space */) {
                    setCursor(CURSOR_DEFAULT);

                    modeStack.pop(); // yield control to the default mode

                    return true;
                }
        };

        this.mouseDown = function (e, button, pressure) {
            if (this.capture) {
                return true;
            } else if (button == BUTTON_WHEEL || key.isPressed("space") && button == BUTTON_PRIMARY) {
                this.capture = true;
                panningButton = button;
                panningX = e.pageX;
                panningY = e.pageY;
                panningOffset = that.getOffset();
                setCursor(CURSOR_PANNING);

                return true;
            } else if (this.transient) {
                // If we're not panning and we get a button not intended for us, we probably shouldn't be on the stack
                modeStack.pop();
            }
        };

        this.mouseDrag = function (e) {
            if (this.capture) {
                that.setOffset(panningOffset.x + e.pageX - panningX, panningOffset.y + e.pageY - panningY);

                return true;
            }
        };

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == panningButton) {
                panningButton = -1;
                this.capture = false;

                if (this.transient && !key.isPressed("space")) {
                    setCursor(CURSOR_DEFAULT);

                    modeStack.pop();
                }

                return true;
            }
        };

        this.enter = function () {
            setCursor(CURSOR_PANNABLE);
        };
    }

    CPPanMode.prototype = Object.create(CPMode.prototype);
    CPPanMode.prototype.constructor = CPFloodFillMode;

    function CPFloodFillMode() {}

    CPFloodFillMode.prototype = Object.create(CPMode.prototype);
    CPFloodFillMode.prototype.constructor = CPFloodFillMode;

    CPFloodFillMode.prototype.mouseDown = function (e, button, pressure) {
        if (button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space") && shouldDrawToThisLayer()) {
            var pf = coordToDocument({ x: mouseX, y: mouseY });

            if (artwork.isPointWithin(pf.x, pf.y)) {
                artwork.floodFill(pf.x, pf.y);
                that.repaintAll();
            }

            return true;
        }
    };

    function CPRectSelectionMode() {
        var firstClick,
            curRect = new _CPRect2.default(0, 0, 0, 0),
            selectingButton = -1;

        this.mouseDown = function (e, button, pressure) {
            if (!this.capture && button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space")) {
                var p = coordToDocumentInt({ x: mouseX, y: mouseY });

                selectingButton = button;

                curRect.makeEmpty();
                firstClick = p;

                that.repaintAll();

                this.capture = true;

                return true;
            }
        };

        this.mouseDrag = function (e) {
            if (!this.capture) return false;

            var p = coordToDocumentInt({ x: mouseX, y: mouseY }),
                square = e.shiftKey,
                squareDist = ~~Math.max(Math.abs(p.x - firstClick.x), Math.abs(p.y - firstClick.y));

            if (p.x >= firstClick.x) {
                curRect.left = firstClick.x;
                curRect.right = (square ? firstClick.x + squareDist : p.x) + 1;
            } else {
                curRect.left = square ? firstClick.x - squareDist : p.x;
                curRect.right = firstClick.x + 1;
            }

            if (p.y >= firstClick.y) {
                curRect.top = firstClick.y;
                curRect.bottom = (square ? firstClick.y + squareDist : p.y) + 1;
            } else {
                curRect.top = square ? firstClick.y - squareDist : p.y;
                curRect.bottom = firstClick.y + 1;
            }

            that.repaintAll();

            return true;
        };

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == selectingButton) {
                artwork.rectangleSelection(curRect);
                curRect.makeEmpty();

                that.repaintAll();

                this.capture = false;
                selectingButton = -1;

                return true;
            }
        };

        this.paint = function () {
            if (!curRect.isEmpty()) {
                canvasContext.lineWidth = 1;
                plotSelectionRect(canvasContext, curRect);
            }
        };
    }

    CPRectSelectionMode.prototype = Object.create(CPMode.prototype);
    CPRectSelectionMode.prototype.constructor = CPRectSelectionMode;

    function CPMoveToolMode() {
        var lastPoint,
            copyMode,
            firstMove = false;

        this.mouseDown = function (e, button, pressure) {
            if (!this.capture && button == BUTTON_PRIMARY && !key.isPressed("space") && shouldDrawToThisLayer()) {
                lastPoint = coordToDocument({ x: mouseX, y: mouseY });

                copyMode = e.altKey;
                firstMove = true;
                this.capture = true;

                return true;
            }
        };

        this.mouseDrag = (0, _throttleDebounce.throttle)(25, function (e) {
            if (this.capture) {
                var p = coordToDocument({ x: mouseX, y: mouseY }),
                    moveFloat = { x: p.x - lastPoint.x, y: p.y - lastPoint.y },
                    moveInt = { x: ~~moveFloat.x, y: ~~moveFloat.y }; // Round towards zero

                artwork.move(moveInt.x, moveInt.y, copyMode && firstMove);

                firstMove = false;

                /*
                 * Nudge the last point by the remainder we weren't able to move this iteration (due to move() only
                 * accepting integer offsets). This'll carry that fractional part of the move over for next iteration.
                 */
                lastPoint.x = p.x - (moveFloat.x - moveInt.x);
                lastPoint.y = p.y - (moveFloat.y - moveInt.y);

                return true;
            }
        });

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == BUTTON_PRIMARY) {
                this.capture = false;
                if (this.transient) {
                    modeStack.pop();
                }
                return true;
            }
        };
    }

    CPMoveToolMode.prototype = Object.create(CPMode.prototype);
    CPMoveToolMode.prototype.constructor = CPMoveToolMode;

    CPMoveToolMode.prototype.mouseMove = function (e) {
        if (!key.isPressed("space") && !e.altKey) {
            setCursor(CURSOR_MOVE);
            return true;
        }
    };

    CPMoveToolMode.prototype.enter = function () {
        setCursor(CURSOR_MOVE);
    };

    function CPTransformMode() {
        var HANDLE_RADIUS = 3,
            DRAG_NONE = -1,
            DRAG_ROTATE = -2,
            DRAG_MOVE = -3,
            DRAG_NW_CORNER = 0,
            DRAG_N_EDGE = 1,
            DRAG_NE_CORNER = 2,
            DRAG_E_EDGE = 3,
            DRAG_SE_CORNER = 4,
            DRAG_S_EDGE = 5,
            DRAG_SW_CORNER = 6,
            DRAG_W_EDGE = 7;

        var
        /** @type {CPTransform} The current transformation */
        affine,

        /** @type {CPRect} The initial document rectangle to transform */
        srcRect,

        /** @type {CPPolygon} The initial transform rect */
        origCornerPoints,

        /** @type {CPPolygon} The current corners of the transform rect in document space */
        cornerPoints,
            draggingMode = DRAG_NONE,
            lastDragPointDisplay,
            lastDragPointDoc,


        // Keep track of how many degrees we've rotated so far during this transformation
        rotationAccumulator;

        /**
               * Get the polygon that represents the current transform result area in display coordinates.
               *
               * @returns {CPPolygon}
               */
        function cornersToDisplayPolygon() {
            return cornerPoints.getTransformed(transform);
        }

        function averagePoints(p1, p2) {
            return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
        }

        function roundPoint(p) {
            return { x: Math.round(p.x), y: Math.round(p.y) };
        }

        /**
               * Decide which drag action should be taken if our mouse was pressed in the given position.
               *
               * @param {CPPolygon} corners - The corners of the current transform area
               * @param mouse - The mouse point
               * @returns {number} A DRAG_* constant
               */
        function classifyDragAction(corners, mouse) {
            var HANDLE_CAPTURE_RADIUS = 7,
                HANDLE_CAPTURE_RADIUS_SQR = HANDLE_CAPTURE_RADIUS * HANDLE_CAPTURE_RADIUS,
                EDGE_CAPTURE_RADIUS = HANDLE_CAPTURE_RADIUS,
                EDGE_CAPTURE_RADIUS_SQR = EDGE_CAPTURE_RADIUS * EDGE_CAPTURE_RADIUS;

            // Are we dragging a corner?
            for (var i = 0; i < corners.points.length; i++) {
                if ((mouse.x - corners.points[i].x) * (mouse.x - corners.points[i].x) + (mouse.y - corners.points[i].y) * (mouse.y - corners.points[i].y) <= HANDLE_CAPTURE_RADIUS_SQR) {
                    return i * 2;
                }
            }

            // Are we dragging an edge?
            for (var i = 0; i < corners.points.length; i++) {
                var edgeP1 = corners.points[i],
                    edgeP2 = corners.points[(i + 1) % corners.points.length],
                    vEdge = new _CPVector2.default(edgeP2.x - edgeP1.x, edgeP2.y - edgeP1.y),
                    vMouse = new _CPVector2.default(mouse.x - edgeP1.x, mouse.y - edgeP1.y),
                    vEdgeLen = vEdge.getLength(),
                    vEdgeScaled = vEdge.getScaled(1 / vEdgeLen),
                    vMouseScaled = vMouse.getScaled(1 / vEdgeLen),
                    mousePropOnLine = vEdgeScaled.getDotProduct(vMouseScaled);

                // If we're within the ends of the line (perpendicularly speaking)
                if (mousePropOnLine >= 0.0 && mousePropOnLine <= 1.0) {
                    // This gives us the point on the line closest to the mouse
                    vEdge.scale(mousePropOnLine);

                    if ((vEdge.x - vMouse.x) * (vEdge.x - vMouse.x) + (vEdge.y - vMouse.y) * (vEdge.y - vMouse.y) <= EDGE_CAPTURE_RADIUS_SQR) {
                        return i * 2 + 1;
                    }
                }
            }

            if (corners.containsPoint(mouse)) {
                return DRAG_MOVE;
            }

            return DRAG_ROTATE;
        }

        function setCursorForHandles() {
            var corners = cornersToDisplayPolygon(),
                mouse = { x: mouseX, y: mouseY },
                dragAction = classifyDragAction(corners, mouse);

            switch (dragAction) {
                case DRAG_NW_CORNER:
                case DRAG_NE_CORNER:
                case DRAG_SE_CORNER:
                case DRAG_SW_CORNER:
                    // Choose a cursor for a 45-degree resize from this corner
                    var cornerIndex = ~~(dragAction / 2),
                        cornerBefore = corners.points[(cornerIndex + 3) % 4],
                        corner = corners.points[cornerIndex],
                        cornerAfter = corners.points[(cornerIndex + 1) % 4],


                    // Get a vector which points 45 degrees toward the center of the box, this'll do for cursor direction
                    v45 = _CPVector2.default.subtractPoints(cornerBefore, corner).normalize().add(_CPVector2.default.subtractPoints(cornerAfter, corner).normalize());

                    setResizeCursorForVector(v45);
                    break;
                case DRAG_N_EDGE:
                case DRAG_E_EDGE:
                case DRAG_S_EDGE:
                case DRAG_W_EDGE:
                    // Resizing from here will move edge perpendicularly
                    var corner1 = corners.points[~~(dragAction / 2)],
                        corner2 = corners.points[(~~(dragAction / 2) + 1) % 4],
                        vPerp = _CPVector2.default.subtractPoints(corner2, corner1).getPerpendicular();

                    setResizeCursorForVector(vPerp);
                    break;
                case DRAG_MOVE:
                    setCursor(CURSOR_MOVE);
                    break;
                case DRAG_ROTATE:
                    setCursor(CURSOR_DEFAULT); // TODO add a custom rotation cursor
                    break;
                default:
                    setCursor(CURSOR_DEFAULT);
            }
        }

        this.mouseDown = function (e, button, pressure) {
            if (!this.capture && button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space")) {
                var corners = cornersToDisplayPolygon();

                draggingMode = classifyDragAction(corners, { x: mouseX, y: mouseY });

                lastDragPointDisplay = { x: mouseX, y: mouseY };
                lastDragPointDoc = coordToDocument(lastDragPointDisplay);

                this.capture = true;

                setCursorForHandles();

                return true;
            }
        };

        this.mouseDrag = (0, _throttleDebounce.throttle)(40, function (e) {
            var MIN_SCALE = 0.001;

            if (this.capture) {
                var dragPointDisplay = { x: mouseX, y: mouseY };

                switch (draggingMode) {
                    case DRAG_MOVE:
                        var dragPointDoc = roundPoint(coordToDocument(dragPointDisplay)),
                            translation = _CPVector2.default.subtractPoints(dragPointDoc, lastDragPointDoc),


                        // Only translate in whole-pixel increments (in document space not canvas space)
                        translationRounded = translation.getTruncated(),
                            translationRemainder = translation.subtract(translationRounded),
                            translateInstance = new _CPTransform2.default();

                        /*
                         * Apply the translate *after* the current affine is applied.
                         */
                        translateInstance.translate(translationRounded.x, translationRounded.y);

                        affine.preMultiply(translateInstance);

                        // Accumulate the fractional move that we didn't apply for next time
                        lastDragPointDoc = _CPVector2.default.subtractPoints(dragPointDoc, translationRemainder);
                        break;
                    case DRAG_ROTATE:
                        var DRAG_ROTATE_SNAP_ANGLE = Math.PI / 4;

                        var centerDoc = cornerPoints.getCenter(),
                            centerDisplay = coordToDisplay(centerDoc),
                            oldMouseAngle = Math.atan2(lastDragPointDisplay.y - centerDisplay.y, lastDragPointDisplay.x - centerDisplay.x),
                            newMouseAngle = Math.atan2(dragPointDisplay.y - centerDisplay.y, dragPointDisplay.x - centerDisplay.x),
                            deltaMouseAngle = newMouseAngle - oldMouseAngle,
                            rotateAngle = void 0,
                            rotateInstance = new _CPTransform2.default();

                        rotationAccumulator += deltaMouseAngle;

                        if (e.shiftKey) {
                            /*
                             * The rotation in the decomposition was made about the origin. We want to rotate about the
                             * center of the selection, so first rotate the selection to square it up with the axes,
                             * then we'll pivot the selection about its center to the new angle.
                             */
                            rotateAngle = -affine.decompose().rotate + Math.round(rotationAccumulator / DRAG_ROTATE_SNAP_ANGLE) * DRAG_ROTATE_SNAP_ANGLE;
                        } else {
                            rotateAngle = deltaMouseAngle;
                        }

                        /* Apply the rotation *after* the current affine instead of before it, so that we don't
                         * end up scaling on top of the rotated selection later (which would cause an unwanted shear)
                         */
                        rotateInstance.rotateAroundPoint(rotateAngle, centerDoc.x, centerDoc.y);

                        affine.preMultiply(rotateInstance);

                        lastDragPointDisplay = dragPointDisplay;
                        break;
                    case DRAG_NW_CORNER:
                    case DRAG_NE_CORNER:
                    case DRAG_SE_CORNER:
                    case DRAG_SW_CORNER:
                        {
                            var draggingCorner = ~~(draggingMode / 2),
                                oldCorner = origCornerPoints.points[draggingCorner],

                            // The corner we dragged will move into its new position
                            newCorner = affine.getInverted().getTransformedPoint(roundPoint(coordToDocument(dragPointDisplay))),


                            // The opposite corner to the one we dragged must not move
                            fixCorner = origCornerPoints.points[(draggingCorner + 2) % 4],


                            /* Now we can see how much we'd need to scale the original rectangle about the fixed corner
                             * for the other corner to reach the new position.
                             */
                            scaleX = (newCorner.x - fixCorner.x) / (oldCorner.x - fixCorner.x),
                                scaleY = (newCorner.y - fixCorner.y) / (oldCorner.y - fixCorner.y);

                            /*
                             * If the user resized it until it was zero-sized, just ignore that position and assume they'll move
                             * past it in a msec.
                             */
                            if (Math.abs(scaleX) < MIN_SCALE || Math.abs(scaleY) < MIN_SCALE || isNaN(scaleX) || isNaN(scaleY)) {
                                return true;
                            }

                            // Does user want proportional resize?
                            if (e.shiftKey) {
                                var largestScale = Math.max(scaleX, scaleY);

                                scaleX = largestScale;
                                scaleY = largestScale;
                            }

                            // The transform we do here will be performed first before any of the other transforms (scale, rotate, etc)
                            affine.scaleAroundPoint(scaleX, scaleY, fixCorner.x, fixCorner.y);
                        }
                        break;
                    case DRAG_N_EDGE:
                    case DRAG_S_EDGE:
                    case DRAG_E_EDGE:
                    case DRAG_W_EDGE:
                        {
                            var cornerIndex = ~~(draggingMode / 2),
                                oldHandle = averagePoints(origCornerPoints.points[cornerIndex], origCornerPoints.points[(cornerIndex + 1) % 4]),


                            // The handle we dragged will move into its new position
                            newHandle = affine.getInverted().getTransformedPoint(roundPoint(coordToDocument(dragPointDisplay))),


                            // The opposite handle to the one we dragged must not move
                            fixHandle = averagePoints(origCornerPoints.points[(cornerIndex + 2) % 4], origCornerPoints.points[(cornerIndex + 3) % 4]),
                                _scaleX = void 0,
                                _scaleY = void 0,
                                oldVector = _CPVector2.default.subtractPoints(oldHandle, fixHandle),
                                newVector = _CPVector2.default.subtractPoints(newHandle, fixHandle),
                                oldLength = oldVector.getLength(),

                            // We only take the length in the perpendicular direction to the transform edge:
                            newLength = oldVector.getDotProduct(newVector) / oldLength,
                                newScale = newLength / oldLength;

                            /*
                             * If the user resized it until it was zero-sized, just ignore that position and assume they'll move
                             * past it in a msec.
                             */
                            if (Math.abs(newScale) < MIN_SCALE || isNaN(newScale)) {
                                return true;
                            }

                            if (draggingMode == DRAG_N_EDGE || draggingMode == DRAG_S_EDGE) {
                                _scaleX = 1.0;
                                _scaleY = newScale;
                            } else {
                                _scaleX = newScale;
                                _scaleY = 1.0;
                            }

                            affine.scaleAroundPoint(_scaleX, _scaleY, fixHandle.x, fixHandle.y);
                        }
                        break;
                }

                cornerPoints = origCornerPoints.getTransformed(affine);

                artwork.transformAffineAmend(affine);

                // TODO make me more specific
                that.repaintAll();

                return true;
            }
        });

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == BUTTON_PRIMARY) {
                this.capture = false;
                draggingMode = DRAG_NONE;
                return true;
            }
        };

        /*
         * Set an appropriate resize cursor for the specified vector from the center to the handle.
         */
        function setResizeCursorForVector(v) {
            var angle = Math.atan2(-v.y, v.x),

            /*
                 * Slice up into 45 degrees slices so that there are +-22.5 degrees centered around each corner,
                 * and a 45 degree segment for each edge
                 */
            slice = Math.floor(angle / (Math.PI / 4) + 0.5),
                cursor = void 0;

            // Wrap angles below the x-axis wrap to positive ones...
            if (slice < 0) {
                slice += 4;
            }

            switch (slice) {
                case 0:
                default:
                    cursor = CURSOR_EW_RESIZE;
                    break;
                case 1:
                    cursor = CURSOR_NESW_RESIZE;
                    break;
                case 2:
                    cursor = CURSOR_NS_RESIZE;
                    break;
                case 3:
                    cursor = CURSOR_NWSE_RESIZE;
                    break;
            }

            setCursor(cursor);
        }

        this.mouseMove = function () {
            // We want to stick with our choice of cursor throughout the drag operation
            if (!this.capture) {
                setCursorForHandles();
            }
        };

        this.paint = function () {
            var corners = cornersToDisplayPolygon().points,
                handles = new Array(corners.length * 2);

            // Collect the positions of the edge and corner handles...
            for (var i = 0; i < corners.length; i++) {
                handles[i] = corners[i];
            }

            for (var i = 0; i < corners.length; i++) {
                var edgeP1 = corners[i],
                    edgeP2 = corners[(i + 1) % corners.length],
                    midWay = { x: (edgeP1.x + edgeP2.x) / 2, y: (edgeP1.y + edgeP2.y) / 2 };

                handles[i + corners.length] = midWay;
            }

            setContrastingDrawStyle(canvasContext, "fill");
            for (var i = 0; i < handles.length; i++) {
                canvasContext.fillRect(handles[i].x - HANDLE_RADIUS, handles[i].y - HANDLE_RADIUS, HANDLE_RADIUS * 2 + 1, HANDLE_RADIUS * 2 + 1);
            }

            strokePolygon(canvasContext, corners);
        };

        this.keyDown = function (e) {
            if (e.keyCode == 13 /* Enter */) {
                    controller.actionPerformed({ action: "CPTransformAccept" });

                    return true;
                } else if (e.keyCode == 27 /* Escape */) {
                    controller.actionPerformed({ action: "CPTransformReject" });

                    return true;
                }
        };

        this.enter = function () {
            CPMode.prototype.enter.call(this);

            // Start off with the identity transform
            var initial = artwork.transformAffineBegin(),
                initialSelection;

            affine = initial.transform;
            srcRect = initial.rect;

            // Decide on the rectangle we'll show as the boundary of the transform area
            initialSelection = initial.selection;

            /* If the user didn't have anything selected, we'll use the actual shrink-wrapped transform area instead. */
            if (initialSelection.isEmpty()) {
                initialSelection = initial.rect.clone();
            }

            origCornerPoints = new _CPPolygon2.default(initialSelection.toPoints());
            cornerPoints = origCornerPoints.getTransformed(affine);

            draggingMode = -1;
            rotationAccumulator = 0;

            that.repaintAll();
        };

        this.leave = function () {
            CPMode.prototype.leave.call(this);
            that.repaintAll();
        };
    }

    CPTransformMode.prototype = Object.create(CPMode.prototype);
    CPTransformMode.prototype.constructor = CPTransformMode;

    function CPRotateCanvasMode() {
        var firstClick,
            initAngle = 0.0,
            initTransform,
            dragged = false,
            rotateButton = -1;

        this.mouseDown = function (e, button, pressure) {
            if (this.capture) {
                return true;
            } else if (!this.transient && button == BUTTON_PRIMARY && !e.altKey && !key.isPressed("space") || e.altKey && (button == BUTTON_WHEEL || button == BUTTON_PRIMARY && key.isPressed("space"))) {
                firstClick = { x: mouseX, y: mouseY };

                initAngle = that.getRotation();
                initTransform = transform.clone();

                dragged = false;

                this.capture = true;
                rotateButton = button;

                return true;
            } else if (this.transient) {
                modeStack.pop();
            }
        };

        this.mouseDrag = function (e) {
            if (this.capture) {
                var p = { x: mouseX, y: mouseY },
                    displayCenter = { x: $(canvas).width() / 2, y: $(canvas).height() / 2 },
                    canvasCenter = { x: canvas.width / 2, y: canvas.height / 2 },
                    deltaAngle = Math.atan2(p.y - displayCenter.y, p.x - displayCenter.x) - Math.atan2(firstClick.y - displayCenter.y, firstClick.x - displayCenter.x),
                    rotTrans = new _CPTransform2.default();

                rotTrans.rotateAroundPoint(deltaAngle, canvasCenter.x, canvasCenter.y);

                rotTrans.multiply(initTransform);

                that.setRotation(initAngle + deltaAngle);
                that.setOffset(~~rotTrans.getTranslateX(), ~~rotTrans.getTranslateY());

                dragged = true;

                return true;
            }
        };

        /**
         * When the mouse is released after rotation, we might want to snap our angle to the nearest 90 degree mark.
         */
        function finishRotation() {
            var ROTATE_SNAP_DEGREES = 5;

            var nearest90 = Math.round(canvasRotation / (Math.PI / 2)) * Math.PI / 2;

            if (Math.abs(canvasRotation - nearest90) < ROTATE_SNAP_DEGREES / 180 * Math.PI) {
                var deltaAngle = nearest90 - initAngle,
                    center = { x: canvas.width / 2, y: canvas.height / 2 },
                    rotTrans = new _CPTransform2.default();

                rotTrans.rotateAroundPoint(deltaAngle, center.x, center.y);

                rotTrans.multiply(initTransform);

                that.setRotation(initAngle + deltaAngle);
                that.setOffset(~~rotTrans.getTranslateX(), ~~rotTrans.getTranslateY());

                that.repaintAll();
            }
        }

        this.mouseUp = function (e, button, pressure) {
            if (this.capture && button == rotateButton) {
                if (dragged) {
                    finishRotation();
                } else {
                    that.resetRotation();
                }

                this.capture = false;

                if (this.transient && !(key.isPressed("space") && key.alt)) {
                    modeStack.pop();
                }

                return true;
            }
        };

        this.keyUp = function (e) {
            if (this.transient && rotateButton != BUTTON_WHEEL && e.keyCode == 32 /* Space */) {
                    setCursor(CURSOR_DEFAULT);

                    modeStack.pop(); // yield control to the default mode

                    return true;
                }
        };

        this.keyDown = function (e) {
            if (e.keyCode == 32 /* Space */ && e.altKey) {
                // That's our hotkey, so stay in this mode (don't forward to CPDefaultMode)
                return true;
            }
        };
    }

    CPRotateCanvasMode.prototype = Object.create(CPMode.prototype);
    CPRotateCanvasMode.prototype.constructor = CPRotateCanvasMode;

    function CPGradientFillMode() {
        // Super constructor
        CPLineMode.call(this);
    }

    CPGradientFillMode.prototype = Object.create(CPLineMode.prototype);
    CPGradientFillMode.prototype.constructor = CPGradientFillMode;

    CPGradientFillMode.prototype.drawLine = function (from, to) {
        artwork.gradientFill(Math.round(from.x), Math.round(from.y), Math.round(to.x), Math.round(to.y), controller.getCurGradient());
    };

    CPGradientFillMode.prototype.queueBrushPreview = function () {
        //Suppress the drawing of the brush preview (inherited from CPDrawingMode)
    };

    function setCursor(cursor) {
        if (canvas.getAttribute("data-cursor") != cursor) {
            canvas.setAttribute("data-cursor", cursor);
        }
    }

    /**
        * Check that we should be drawing to the current layer, and let the user know if they are being blocked by the
        * layer settings.
        *
        * @returns {boolean} True if we should draw to the current layer
        */
    function shouldDrawToThisLayer() {
        var activeLayer = artwork.getActiveLayer();

        if (!activeLayer.visible) {
            controller.showLayerNotification(artwork.getActiveLayerIndex(), "Whoops! This layer is currently hidden", "layer");

            return false;
        } else if (activeLayer.alpha == 0) {
            controller.showLayerNotification(artwork.getActiveLayerIndex(), "Whoops! This layer's opacity is currently 0%", "opacity");

            return false;
        }

        return true;
    }

    /**
     * Update the scrollbar's range/position to match the current view settings for the document.
     *
     * @param scrollbar {CPScrollbar}
     * @param visMin The smallest coordinate in this axis in which the drawing appears
     * @param visWidth The extent of the drawing in this axis
     * @param viewSize The extent of the screen canvas in this axis
     * @param offset The present pixel offset of the drawing in this axis
     */
    function updateScrollBar(scrollbar, visMin, visWidth, viewSize, offset) {
        var xMin = visMin - viewSize - offset + visWidth / 4,
            xMax = visMin + visWidth - offset - visWidth / 4;

        scrollbar.setValues(-offset, viewSize, xMin, xMax);

        scrollbar.setBlockIncrement(Math.max(1, ~~(viewSize * .66)));
        scrollbar.setUnitIncrement(Math.max(1, ~~(viewSize * .05)));
    }

    function updateScrollBars() {
        if (horzScroll == null || vertScroll == null || horzScroll.getValueIsAdjusting() || vertScroll.getValueIsAdjusting()) {
            return;
        }

        var visibleRect = getRefreshArea(new _CPRect2.default(0, 0, artworkCanvas.width, artworkCanvas.height));

        updateScrollBar(horzScroll, visibleRect.left, visibleRect.getWidth(), $(canvas).width(), that.getOffset().x);
        updateScrollBar(vertScroll, visibleRect.top, visibleRect.getHeight(), $(canvas).height(), that.getOffset().y);
    }

    function updateTransform() {
        transform.setToIdentity();
        transform.translate(offsetX, offsetY);
        transform.scale(zoom, zoom);
        transform.rotate(canvasRotation);

        updateScrollBars();
        that.repaintAll();
    }

    /**
     * Convert a canvas-relative coordinate into document coordinates and return the new coordinate.
     */
    function coordToDocument(coord) {
        // TODO cache inverted transform
        return transform.getInverted().getTransformedPoint(coord);
    }

    /**
     * Convert a canvas-relative coordinate into document coordinates.
     */
    function coordToDocumentInt(coord) {
        var result = coordToDocument(coord);

        result.x = Math.floor(result.x);
        result.y = Math.floor(result.y);

        return result;
    }

    /**
     * Convert a {x: pageX, y: pageY} co-ordinate pair from a mouse event to canvas-relative coordinates.
     */
    function mouseCoordToCanvas(coord) {
        var rect = canvas.getBoundingClientRect();

        return { x: coord.x - rect.left - window.pageXOffset, y: coord.y - rect.top - window.pageYOffset };
    }

    function coordToDisplay(p) {
        return transform.getTransformedPoint(p);
    }

    function coordToDisplayInt(p) {
        var result = coordToDisplay(p);

        result.x = Math.round(result.x);
        result.y = Math.round(result.y);

        return result;
    }

    /**
        * Convert a rectangle that encloses the given document pixels into a rectangle in display coordinates.
        *
        * @param rect {CPRect}
        * @returns {*[]}
        */
    function rectToDisplay(rect) {
        var center = coordToDisplay({ x: (rect.left + rect.right) / 2, y: (rect.top + rect.bottom) / 2 }),
            coords = rect.toPoints();

        for (var i = 0; i < coords.length; i++) {
            coords[i] = coordToDisplayInt(coords[i]);

            // Need to inset the co-ordinates by 0.5 display pixels for the line to pass through the middle of the display pixel
            coords[i].x += Math.sign(center.x - coords[i].x) * 0.5;
            coords[i].y += Math.sign(center.y - coords[i].y) * 0.5;
        }

        return coords;
    }

    function strokePolygon(context, coords) {
        context.beginPath();

        context.moveTo(coords[0].x, coords[0].y);
        for (var i = 1; i < coords.length; i++) {
            context.lineTo(coords[i].x, coords[i].y);
        }
        context.lineTo(coords[0].x, coords[0].y);

        context.stroke();
    }

    /**
     * Stroke a selection rectangle that encloses the pixels in the given rectangle (in document co-ordinates).
     */
    function plotSelectionRect(context, rect) {
        strokePolygon(context, rectToDisplay(rect));
    }

    /**
     * Take a CPRect of document coordinates and return a CPRect of canvas coordinates to repaint for that region.
     */
    function getRefreshArea(r) {
        var p1 = coordToDisplayInt({ x: r.left - 1, y: r.top - 1 }),
            p2 = coordToDisplayInt({ x: r.left - 1, y: r.bottom }),
            p3 = coordToDisplayInt({ x: r.right, y: r.top - 1 }),
            p4 = coordToDisplayInt({ x: r.right, y: r.bottom }),
            r2 = new _CPRect2.default(Math.min(Math.min(p1.x, p2.x), Math.min(p3.x, p4.x)), Math.min(Math.min(p1.y, p2.y), Math.min(p3.y, p4.y)), Math.max(Math.max(p1.x, p2.x), Math.max(p3.x, p4.x)) + 1, Math.max(Math.max(p1.y, p2.y), Math.max(p3.y, p4.y)) + 1);

        r2.grow(2, 2); // to be sure to include everything

        return r2;
    }

    /**
     * Adjust the current offset to bring the center of the artwork to the center of the canvas
     */
    function centerCanvas() {
        var width = canvas.width,
            height = canvas.height,
            artworkCenter = coordToDisplay({ x: artwork.width / 2, y: artwork.height / 2 });

        that.setOffset(Math.round(offsetX + width / 2.0 - artworkCenter.x), Math.round(offsetY + height / 2.0 - artworkCenter.y));
    }

    this.setZoom = function (_zoom) {
        zoom = _zoom;
        updateTransform();
    };

    this.getZoom = function () {
        return zoom;
    };

    this.setGridSize = function (_gridSize) {
        gridSize = Math.max(Math.round(_gridSize), 1);
        this.repaintAll();
    };

    this.getGridSize = function () {
        return gridSize;
    };

    this.setOffset = function (x, y) {
        if (isNaN(x) || isNaN(y)) {
            console.log("Bad offset");
        } else {
            offsetX = x;
            offsetY = y;
            updateTransform();
        }
    };

    this.getOffset = function () {
        return { x: offsetX, y: offsetY };
    };

    this.setInterpolation = function (enabled) {
        interpolation = enabled;

        (0, _CPPolyfill.setCanvasInterpolation)(canvasContext, enabled);

        this.repaintAll();
    };

    this.setRotation = function (angle) {
        canvasRotation = angle % (2 * Math.PI);
        updateTransform();
    };

    /**
     * Get canvas rotation in radians.
     * 
     * @return {number}
     */
    this.getRotation = function () {
        return canvasRotation;
    };

    /**
     * Get the rotation as the nearest number of whole 90 degree clockwise rotations ([0..3])
     */
    this.getRotation90 = function () {
        var rotation = Math.round(this.getRotation() / Math.PI * 2);

        // Just in case:
        rotation %= 4;

        // We want [0..3] as output
        if (rotation < 0) {
            rotation += 4;
        }

        return rotation;
    };

    /**
     *
     * @param zoom float
     * @param centerX float X co-ordinate in the canvas space
     * @param centerY float Y co-ordinate in the canvas space
     */
    function zoomOnPoint(zoom, centerX, centerY) {
        zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, zoom));

        if (that.getZoom() != zoom) {
            var offset = that.getOffset();

            that.setOffset(offset.x + ~~((centerX - offset.x) * (1 - zoom / that.getZoom())), offset.y + ~~((centerY - offset.y) * (1 - zoom / that.getZoom())));

            that.setZoom(zoom);

            /*CPController.CPViewInfo viewInfo = new CPController.CPViewInfo();
            viewInfo.zoom = zoom;
            viewInfo.offsetX = offsetX;
            viewInfo.offsetY = offsetY;
            controller.callViewListeners(viewInfo); TODO */

            that.repaintAll();
        }
    }

    // More advanced zoom methods
    function zoomOnCenter(zoom) {
        var width = $(canvas).width(),
            height = $(canvas).height();

        zoomOnPoint(zoom, width / 2, height / 2);
    }

    this.zoomIn = function () {
        zoomOnCenter(this.getZoom() * 2);
    };

    this.zoomOut = function () {
        zoomOnCenter(this.getZoom() * 0.5);
    };

    this.zoom100 = function () {
        zoomOnCenter(1);
        centerCanvas();
    };

    this.resetRotation = function () {
        var center = { x: canvas.width / 2, y: canvas.height / 2 },
            rotTrans = new _CPTransform2.default();

        rotTrans.rotateAroundPoint(-this.getRotation(), center.x, center.y);
        rotTrans.multiply(transform);

        this.setOffset(~~rotTrans.getTranslateX(), ~~rotTrans.getTranslateY());
        this.setRotation(0);
    };

    /**
     * Add the pointer pressure field to the given pointer event.
     */
    function getPointerPressure(e) {
        // Use Wacom pressure in preference to pointer event pressure (if present)
        if (wacomPenDown) {
            return tablet.getPressure();
        } else {
            /* In the Pointer Events API, mice have a default pressure of 0.5, but we want 1.0. Since we can't 
             * distinguish between mice and pens at this point, we don't have any better options:
             */
            return e.pressure * 2;
        }
    }

    var mouseWheelDebounce = false;

    function handleMouseWheel(e) {
        if (e.deltaY != 0) {
            if (!mouseWheelDebounce || Math.abs(e.deltaY) > 20) {
                var factor;

                if (e.deltaY > 0) {
                    factor = 1 / 1.15;
                } else {
                    factor = 1.15;
                }

                var canvasPoint = mouseCoordToCanvas({ x: e.pageX, y: e.pageY }),
                    docPoint = coordToDocument(canvasPoint);

                if (artwork.isPointWithin(docPoint.x, docPoint.y)) {
                    zoomOnPoint(that.getZoom() * factor, canvasPoint.x, canvasPoint.y);
                } else {
                    zoomOnPoint(that.getZoom() * factor, offsetX + ~~(artwork.width * zoom / 2), offsetY + ~~(artwork.height * zoom / 2));
                }

                mouseWheelDebounce = mouseWheelDebounce || setTimeout(function () {
                    mouseWheelDebounce = false;
                }, 50);
            }

            e.preventDefault();
        }
    }

    var canvasClientRect;

    function handlePointerMove(e) {
        // Use the cached position of the canvas on the page if possible
        if (!canvasClientRect) {
            canvasClientRect = canvas.getBoundingClientRect();
        }

        /* Store these globally for the event handlers to refer to (we'd write to the event itself but some browsers
         * don't enjoy that)
         */
        mouseX = e.clientX - canvasClientRect.left;
        mouseY = e.clientY - canvasClientRect.top;

        // Flags used by e.buttons
        var FLAG_PRIMARY = 1,
            FLAG_SECONDARY = 2,
            FLAG_WHEEL = 4;

        var isDragging = e.buttons != 0,
            pressure = getPointerPressure(e);

        // Did any of our buttons change state?
        if ((e.buttons & FLAG_PRIMARY) != 0 != mouseDown[BUTTON_PRIMARY]) {
            if (e.mozPressure === 0.5) {
                /* We received a Mozilla "click" level of pressure (0.5) as a pointer-move
                 * before we received the actual mouseDown event (which carries the correct pressure).
                 *
                 * Observed on Firefox 56 on macOS High Sierra
                 */
                return; // Ignore!
            }

            mouseDown[BUTTON_PRIMARY] = !mouseDown[BUTTON_PRIMARY];

            if (mouseDown[BUTTON_PRIMARY]) {
                modeStack.mouseDown(e, BUTTON_PRIMARY, pressure);
            } else {
                modeStack.mouseUp(e, BUTTON_PRIMARY, pressure);
            }
        }

        if ((e.buttons & FLAG_SECONDARY) != 0 != mouseDown[BUTTON_SECONDARY]) {
            mouseDown[BUTTON_SECONDARY] = !mouseDown[BUTTON_SECONDARY];

            if (mouseDown[BUTTON_SECONDARY]) {
                modeStack.mouseDown(e, BUTTON_SECONDARY, pressure);
            } else {
                modeStack.mouseUp(e, BUTTON_SECONDARY, pressure);
            }
        }

        if ((e.buttons & FLAG_WHEEL) != 0 != mouseDown[BUTTON_WHEEL]) {
            mouseDown[BUTTON_WHEEL] = !mouseDown[BUTTON_WHEEL];

            if (mouseDown[BUTTON_WHEEL]) {
                modeStack.mouseDown(e, BUTTON_WHEEL, pressure);
            } else {
                modeStack.mouseUp(e, BUTTON_WHEEL, pressure);
            }
        }

        if (isDragging) {
            modeStack.mouseDrag(e, pressure);
        } else {
            modeStack.mouseMove(e, pressure);
        }
    }

    // Called when all mouse/pointer buttons are released
    function handlePointerUp(e) {
        mouseDown[BUTTON_PRIMARY] = false;
        mouseDown[BUTTON_SECONDARY] = false;
        mouseDown[BUTTON_WHEEL] = false;

        wacomPenDown = false;
        modeStack.mouseUp(e, e.button, 0.0);
        canvas.releasePointerCapture(e.pointerId);
    }

    // Called when the first button on the pointer is depressed / pen touches the surface
    function handlePointerDown(e) {
        canvas.setPointerCapture(e.pointerId);

        canvasClientRect = canvas.getBoundingClientRect();

        // Store these globally for the event handlers to refer to
        mouseX = e.clientX - canvasClientRect.left;
        mouseY = e.clientY - canvasClientRect.top;

        wacomPenDown = tablet.isPen();

        mouseDown[BUTTON_PRIMARY] = false;
        mouseDown[BUTTON_SECONDARY] = false;
        mouseDown[BUTTON_WHEEL] = false;

        mouseDown[e.button] = true;

        modeStack.mouseDown(e, e.button, getPointerPressure(e));
    }

    function handleKeyDown(e) {
        modeStack.keyDown(e);
    }

    function handleKeyUp(e) {
        modeStack.keyUp(e);
    }

    // Get the DOM element for the canvas area
    this.getElement = function () {
        return canvasContainer;
    };

    /**
     * Schedule a repaint for the current repaint region.
     */
    function repaint() {
        if (!scheduledRepaint) {
            scheduledRepaint = true;
            window.requestAnimationFrame(function () {
                that.paint();
            });
        }
    }

    /**
     * Schedule a repaint for the entire screen.
     */
    this.repaintAll = function () {
        repaintRegion.left = 0;
        repaintRegion.top = 0;
        repaintRegion.right = canvas.width;
        repaintRegion.bottom = canvas.height;

        repaint();
    };

    /**
     * Schedule a repaint for an area of the screen for later.
     * 
     * @param rect CPRect Region that should be repainted using display coordinates
     */
    function repaintRect(rect) {
        repaintRegion.union(rect);

        repaint();
    }

    /**
        * Set the globalCompositeOperation and fill/stroke color up to maximize contrast for the drawn items
        * against arbitrary backgrounds.
        *
        * @param canvasContext
        * @param {string} kind - "stroke" or "fill" depending on which colour you'd like to set
        */
    function setContrastingDrawStyle(canvasContext, kind) {
        kind = kind + "Style";
        canvasContext.globalCompositeOperation = 'exclusion';

        if (canvasContext.globalCompositeOperation == "exclusion") {
            // White + exclusion inverts the colors underneath, giving us good contrast
            canvasContext[kind] = 'white';
        } else {
            // IE Edge doesn't support Exclusion, so how about Difference with mid-grey instead
            // This is visible on black and white, but disappears on a grey background
            canvasContext.globalCompositeOperation = 'difference';
            canvasContext[kind] = '#888';

            // For super dumb browsers (only support source-over), at least don't make the cursor invisible on a white BG!
            if (canvasContext.globalCompositeOperation != "difference") {
                canvasContext[kind] = 'black';
            }
        }
    }

    this.paint = function () {
        var drawingWasClipped = false;

        scheduledRepaint = false;

        /* Clip drawing to the area of the screen we want to repaint */
        if (!repaintRegion.isEmpty()) {
            canvasContext.save();

            if (canvasContext.clip) {
                canvasContext.beginPath();

                repaintRegion.left = repaintRegion.left | 0;
                repaintRegion.top = repaintRegion.top | 0;

                canvasContext.rect(repaintRegion.left, repaintRegion.top, Math.ceil(repaintRegion.getWidth()), Math.ceil(repaintRegion.getHeight()));

                canvasContext.clip();
            }

            drawingWasClipped = true;
        }

        /* Copy pixels that changed in the document into our local fused image cache */
        if (!artworkUpdateRegion.isEmpty()) {
            var imageData = artwork.fusionLayers();

            artworkCanvasContext.putImageData(imageData, 0, 0, artworkUpdateRegion.left, artworkUpdateRegion.top, artworkUpdateRegion.getWidth(), artworkUpdateRegion.getHeight());

            artworkUpdateRegion.makeEmpty();
        }

        canvasContext.fillStyle = '#606060';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        // Transform the coordinate system to bring the document into the right position on the screen (translate/zoom/etc)
        canvasContext.save();
        {
            canvasContext.setTransform(transform.m[0], transform.m[1], transform.m[2], transform.m[3], transform.m[4], transform.m[5]);

            canvasContext.fillStyle = checkerboardPattern;
            canvasContext.fillRect(0, 0, artwork.width, artwork.height);

            canvasContext.drawImage(artworkCanvas, 0, 0, artworkCanvas.width, artworkCanvas.height);
        }
        canvasContext.restore();

        // The rest of the drawing happens using the original screen coordinate system
        setContrastingDrawStyle(canvasContext, "stroke");

        canvasContext.lineWidth = 1.0;

        // Draw the artwork selection so long as we're not in the middle of selecting a new rectangle
        if (!artwork.getSelection().isEmpty() && !(modeStack.peek() instanceof CPRectSelectionMode && modeStack.peek().capture)) {
            canvasContext.setLineDash([3, 2]);

            plotSelectionRect(canvasContext, artwork.getSelection());

            canvasContext.setLineDash([]);
        }

        // Draw grid
        if (showGrid) {
            var bounds = artwork.getBounds(),
                gridVisualPitch = zoom * gridSize;

            /* If the grid is going to be miniscule on the screen (basically just covering/inverting the entire artwork,
             * do not paint it.
             */
            if (gridVisualPitch > 2) {
                canvasContext.beginPath();

                // Vertical lines
                for (var i = gridSize - 1; i < bounds.right; i += gridSize) {
                    var p1 = coordToDisplay({ x: i, y: bounds.top }),
                        p2 = coordToDisplay({ x: i, y: bounds.bottom });

                    canvasContext.moveTo(p1.x + 0.5, p1.y + 0.5);
                    canvasContext.lineTo(p2.x + 0.5, p2.y + 0.5);
                }

                // Horizontal lines
                for (var i = gridSize - 1; i < bounds.bottom; i += gridSize) {
                    var p1 = coordToDisplay({ x: 0, y: i }),
                        p2 = coordToDisplay({ x: bounds.right, y: i });

                    canvasContext.moveTo(p1.x + 0.5, p1.y + 0.5);
                    canvasContext.lineTo(p2.x + 0.5, p2.y + 0.5);
                }

                canvasContext.stroke();
            }
        }

        // Additional drawing by the current mode
        modeStack.paint(canvasContext);

        canvasContext.globalCompositeOperation = 'source-over';

        if (drawingWasClipped) {
            repaintRegion.makeEmpty();

            canvasContext.restore();
        }
    };

    this.showGrid = function (show) {
        showGrid = show;
        this.repaintAll();
    };

    /**
     * Resize the canvas area to the given height (in pixels)
     *
     * @param {int} height New canvas area height in CSS pixels
     * @param {boolean} skipCenter True if the canvas should not be re-centered
     */
    this.resize = function (height, skipCenter) {
        // Leave room for the bottom scrollbar
        height -= $(canvasContainerBottom).outerHeight();

        $(canvas).css('height', height + "px");

        canvas.width = $(canvas).width();
        canvas.height = height;

        canvasClientRect = null;

        if (!skipCenter) {
            centerCanvas();
        }

        // Interpolation property gets reset when canvas resizes
        this.setInterpolation(interpolation);

        this.repaintAll();
    };

    controller.on("toolChange", function (tool, toolInfo) {
        var newMode = drawingModes[toolInfo.strokeMode];

        // If we currently have any drawing modes active, switch them to the drawing mode of the new tool
        for (var i = 0; i < modeStack.modes.length; i++) {
            if (modeStack.modes[i] instanceof CPDrawingMode) {
                modeStack.modes[i].leave();
                modeStack.modes[i] = newMode;
                modeStack.modes[i].enter();

                break;
            }
        }

        curDrawMode = newMode;
    });

    controller.on("modeChange", function (mode) {
        var newMode;

        switch (mode) {
            case _ChickenPaint2.default.M_DRAW:
                newMode = curDrawMode;
                break;

            case _ChickenPaint2.default.M_FLOODFILL:
                newMode = floodFillMode;
                break;

            case _ChickenPaint2.default.M_GRADIENTFILL:
                newMode = gradientFillMode;
                break;

            case _ChickenPaint2.default.M_RECT_SELECTION:
                newMode = rectSelectionMode;
                break;

            case _ChickenPaint2.default.M_MOVE_TOOL:
                newMode = moveToolMode;
                break;

            case _ChickenPaint2.default.M_ROTATE_CANVAS:
                newMode = rotateCanvasMode;
                break;

            case _ChickenPaint2.default.M_COLOR_PICKER:
                newMode = colorPickerMode;
                break;

            case _ChickenPaint2.default.M_TRANSFORM:
                newMode = transformMode;
                break;
        }

        modeStack.setUserMode(newMode);
    });

    //
    // Modes system: modes control the way the GUI is reacting to the user input
    // All the tools are implemented through modes
    //

    defaultMode = new CPDefaultMode();
    colorPickerMode = new CPColorPickerMode();
    panMode = new CPPanMode();
    rotateCanvasMode = new CPRotateCanvasMode();
    floodFillMode = new CPFloodFillMode();
    gradientFillMode = new CPGradientFillMode();
    rectSelectionMode = new CPRectSelectionMode();
    moveToolMode = new CPMoveToolMode();
    transformMode = new CPTransformMode();

    // this must correspond to the stroke modes defined in CPToolInfo
    drawingModes = [new CPFreehandMode(), new CPLineMode(), new CPBezierMode()];

    curDrawMode = drawingModes[_CPBrushInfo2.default.SM_FREEHAND];

    // The default mode will handle the events that no other modes are interested in
    modeStack.setDefaultMode(defaultMode);
    modeStack.setUserMode(curDrawMode);

    artworkCanvas.width = artwork.width;
    artworkCanvas.height = artwork.height;

    canvas.width = 800;
    canvas.height = 900;
    canvas.className = "chickenpaint-canvas";
    canvas.setAttribute("touch-action", "none");

    if (!canvasContext.setLineDash) {
        canvasContext.setLineDash = function () {}; // For IE 10 and older
    }

    canvas.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    canvas.addEventListener("mouseenter", function () {
        mouseIn = true;
    });

    canvas.addEventListener("mouseleave", function () {
        mouseIn = false;

        if (!mouseDown[BUTTON_PRIMARY] && !mouseDown[BUTTON_SECONDARY] && !mouseDown[BUTTON_WHEEL]) {
            that.repaintAll();
        }
    });

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("wheel", handleMouseWheel);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    /* Workaround for Chrome Mac bug that causes canvas to be disposed and never recreated when tab is switched into the 
     * background https://bugs.chromium.org/p/chromium/issues/detail?id=588434
     */
    document.addEventListener("visibilitychange", function () {
        var oldHeight = canvas.height + $(canvasContainerBottom).outerHeight();

        canvas.width = 1;
        canvas.height = 1;

        that.resize(oldHeight, true);
    }, false);

    window.addEventListener("scroll", function () {
        canvasClientRect = null;
    });

    canvas.addEventListener("mousedown", function (e) {
        if (e.button == BUTTON_WHEEL) {
            // Prevent middle-mouse scrolling in Firefox
            e.preventDefault();
        }
    });

    artwork.on("changeSelection", function () {
        // We could keep track of our last-painted selection rect and only invalidate that here
        that.repaintAll();
    });

    artwork.on("updateRegion", function (region) {
        artworkUpdateRegion.union(region);

        repaintRect(getRefreshArea(artworkUpdateRegion));
    });

    horzScroll.on("valueChanged", function (value) {
        var p = that.getOffset();

        that.setOffset(-value, p.y);
    });

    vertScroll.on("valueChanged", function (value) {
        var p = that.getOffset();

        that.setOffset(p.x, -value);
    });

    this.setInterpolation(false);

    var canvasSpacingWrapper = document.createElement("div");

    canvasSpacingWrapper.className = 'chickenpaint-canvas-container-wrapper';
    canvasSpacingWrapper.appendChild(canvas);

    canvasContainerTop.className = 'chickenpaint-canvas-container-top';
    canvasContainerTop.appendChild(canvasSpacingWrapper);
    canvasContainerTop.appendChild(vertScroll.getElement());

    canvasContainerBottom.className = 'chickenpaint-canvas-container-bottom';
    canvasContainerBottom.appendChild(horzScroll.getElement());

    canvasContainer.appendChild(canvasContainerTop);
    canvasContainer.appendChild(canvasContainerBottom);

    controller.setCanvas(this);
}
module.exports = exports["default"];

},{"../ChickenPaint":1,"../engine/CPBrushInfo":5,"../util/CPBezier":46,"../util/CPPolyfill":49,"../util/CPPolygon":50,"../util/CPRect":52,"../util/CPTransform":53,"../util/CPVector":54,"../util/CPWacomTablet":55,"../util/throttle-debounce":56,"./CPGUIUtils":26,"./CPScrollbar":34}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPCheckbox;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPCheckbox(state, title) {
    var canvas = document.createElement('canvas'),
        canvasContext = canvas.getContext('2d'),
        that = this;

    this.state = state || false;

    function paint() {
        var width = canvas.width,
            height = canvas.height;

        canvasContext.clearRect(0, 0, width, height);

        canvasContext.beginPath();
        canvasContext.arc(width / 2 + 1, width / 2 + 1, Math.max(width / 2, 1) - 2, 0, Math.PI * 2);

        if (that.state) {
            canvasContext.fill();
        } else {
            canvasContext.stroke();
        }
    }

    this.setValue = function (b) {
        if (this.state != b) {
            this.state = b;

            this.emitEvent('valueChange', [b]);

            paint();
        }
    };

    this.getElement = function () {
        return canvas;
    };

    canvas.addEventListener("mousedown", function (e) {
        that.setValue(!that.state);
    });

    canvas.title = title || "";
    canvas.className = 'chickenpaint-checkbox';

    canvas.width = 20;
    canvas.height = 20;

    canvas.fillStyle = 'black';
    canvas.strokeStyle = 'black';

    paint();
};

CPCheckbox.prototype = Object.create(EventEmitter.prototype);
CPCheckbox.prototype.constructor = CPCheckbox;
module.exports = exports['default'];

},{}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColorPalette;

var _CPPalette = require('./CPPalette');

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _CPColorSelect = require('./CPColorSelect');

var _CPColorSelect2 = _interopRequireDefault(_CPColorSelect);

var _CPColorSlider = require('./CPColorSlider');

var _CPColorSlider2 = _interopRequireDefault(_CPColorSlider);

var _CPColor = require('../util/CPColor');

var _CPColor2 = _interopRequireDefault(_CPColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPColorPalette(cpController) {
    _CPPalette2.default.call(this, cpController, "color", "Color");

    var colorSelect = new _CPColorSelect2.default(cpController),
        colorSlider = new _CPColorSlider2.default(cpController, colorSelect),
        colorShow = new CPColorShow(cpController),
        body = this.getBodyElement(),
        topSection = document.createElement("div");

    topSection.className = 'chickenpaint-colorpicker-top';

    topSection.appendChild(colorSelect.getElement());
    topSection.appendChild(colorSlider.getElement());

    body.appendChild(topSection);
    body.appendChild(colorShow.getElement());
}

function CPColorShow(cpController) {
    var color = 0,
        element = document.createElement("div");

    function padLeft(string, padding, len) {
        while (string.length < len) {
            string = padding + string;
        }
        return string;
    }

    function paint() {
        element.style.backgroundColor = '#' + padLeft(Number(color).toString(16), "0", 6);
    }

    function mouseClick(e) {
        e.preventDefault();

        var colHex = "#" + padLeft(Number(color).toString(16), "0", 6);

        colHex = window.prompt("Please enter a color in hex format", colHex);

        if (colHex != null) {
            try {
                if (colHex.match(/^#/) || colHex.match(/^$/)) {
                    colHex = colHex.substring(1);
                }

                var newColor = parseInt(colHex, 16);

                cpController.setCurColor(new _CPColor2.default(newColor));
            } catch (e) {}
        }
    }

    this.getElement = function () {
        return element;
    };

    cpController.on("colorChange", function (_color) {
        color = _color.getRgb();
        paint();
    });

    element.className = 'chickenpaint-colorpicker-show';

    element.addEventListener("click", mouseClick);

    paint();
}

CPColorPalette.prototype = Object.create(_CPPalette2.default.prototype);
CPColorPalette.prototype.constructor = CPColorPalette;
module.exports = exports['default'];

},{"../util/CPColor":47,"./CPColorSelect":22,"./CPColorSlider":23,"./CPPalette":32}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColorSelect;

var _CPColor = require("../util/CPColor");

var _CPColor2 = _interopRequireDefault(_CPColor);

var _CPColorBmp = require("../engine/CPColorBmp");

var _CPColorBmp2 = _interopRequireDefault(_CPColorBmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint

    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.

    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPColorSelect(cpController, initialColor) {
    var w = 128,
        h = 128,
        canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),
        imageData = canvasContext.createImageData(w, h),
        data = imageData.data,
        color = new _CPColor2.default(),
        needRefresh = true,
        capturedMouse = false;

    function makeBitmap() {
        var col = color.clone(),
            pixIndex = 0;

        for (var y = 0; y < h; y++) {
            col.setValue(255 - y * 255 / h);

            for (var x = 0; x < w; x++) {
                col.setSaturation(x * 255 / w);

                data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = col.rgb >> 16 & 0xFF;
                data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = col.rgb >> 8 & 0xFF;
                data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = col.rgb & 0xFF;
                data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = 0xFF;

                pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL;
            }
        }

        needRefresh = false;
    }

    function paint() {
        if (needRefresh) {
            makeBitmap();
        }

        canvasContext.putImageData(imageData, 0, 0, 0, 0, w, h);

        var x = color.getSaturation() * w / 255,
            y = (255 - color.getValue()) * h / 255;

        canvasContext.globalCompositeOperation = 'exclusion';
        canvasContext.strokeStyle = 'white';
        canvasContext.lineWidth = 1.5;

        canvasContext.beginPath();
        canvasContext.arc(x, y, 5, 0, Math.PI * 2);
        canvasContext.stroke();

        canvasContext.globalCompositeOperation = 'source-over';
    }

    function mousePickColor(e) {
        var x = e.pageX - $(canvas).offset().left,
            y = e.pageY - $(canvas).offset().top,
            sat = x * 255 / w,
            value = 255 - y * 255 / h;

        color.setSaturation(Math.max(0, Math.min(255, sat)));
        color.setValue(Math.max(0, Math.min(255, value)));

        paint();
        cpController.setCurColor(color);
    }

    function continueDrag(e) {
        mousePickColor(e);
    }

    function endDrag(e) {
        canvas.releasePointerCapture(e.pointerId);
        capturedMouse = false;
        canvas.removeEventListener("pointerup", endDrag);
        canvas.removeEventListener("pointermove", continueDrag);
    }

    function startDrag(e) {
        if (!capturedMouse) {
            capturedMouse = true;
            canvas.setPointerCapture(e.pointerId);
            canvas.addEventListener("pointerup", endDrag);
            canvas.addEventListener("pointermove", continueDrag);
        }

        mousePickColor(e);
    }

    this.setHue = function (hue) {
        if (color.getHue() != hue) {
            color.setHue(hue);
            cpController.setCurColor(color);
        }
    };

    this.getElement = function () {
        return canvas;
    };

    cpController.on("colorChange", function (c) {
        color.copyFrom(c);

        needRefresh = true;
        paint();
    });

    canvas.addEventListener("pointerdown", startDrag);

    canvas.className = 'chickenpaint-colorpicker-select';
    canvas.setAttribute("touch-action", "none");

    canvas.width = w;
    canvas.height = h;

    if (initialColor) {
        color.copyFrom(initialColor);
    }

    paint();
}
module.exports = exports["default"];

},{"../engine/CPColorBmp":9,"../util/CPColor":47}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColorSlider;

var _CPColor = require("../util/CPColor");

var _CPColor2 = _interopRequireDefault(_CPColor);

var _CPColorBmp = require("../engine/CPColorBmp");

var _CPColorBmp2 = _interopRequireDefault(_CPColorBmp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint

    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.

    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPColorSlider(cpController, selecter, initialHue) {
    var that = this,
        w = 24,
        h = 128,
        canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),
        imageData = canvasContext.createImageData(w, h),
        data = imageData.data,
        capturedMouse = false,
        hue = initialHue || 0;

    function makeBitmap() {
        var color = new _CPColor2.default(),
            pixIndex = 0;

        color.setRgbComponents(0, 255, 255);

        for (var y = 0; y < h; y++) {
            color.setHue(y * 359 / h);

            for (var x = 0; x < w; x++) {
                data[pixIndex + _CPColorBmp2.default.RED_BYTE_OFFSET] = color.rgb >> 16 & 0xFF;
                data[pixIndex + _CPColorBmp2.default.GREEN_BYTE_OFFSET] = color.rgb >> 8 & 0xFF;
                data[pixIndex + _CPColorBmp2.default.BLUE_BYTE_OFFSET] = color.rgb & 0xFF;
                data[pixIndex + _CPColorBmp2.default.ALPHA_BYTE_OFFSET] = 0xFF;

                pixIndex += _CPColorBmp2.default.BYTES_PER_PIXEL;
            }
        }
    }

    function paint() {
        canvasContext.putImageData(imageData, 0, 0, 0, 0, w, h);

        var y = hue * h / 360;

        canvasContext.globalCompositeOperation = 'exclusion';
        canvasContext.strokeStyle = 'white';
        canvasContext.lineWidth = 1.5;

        canvasContext.beginPath();
        canvasContext.moveTo(0, y);
        canvasContext.lineTo(w, y);
        canvasContext.stroke();

        canvasContext.globalCompositeOperation = 'source-over';
    }

    function mousePickColor(e) {
        var y = e.pageY - $(canvas).offset().top,
            _hue = ~~(y * 360 / h);

        hue = Math.max(0, Math.min(359, _hue));
        paint();

        if (selecter != null) {
            selecter.setHue(hue);
        }
    }

    function continueDrag(e) {
        mousePickColor(e);
    }

    function endDrag(e) {
        canvas.releasePointerCapture(e.pointerId);
        capturedMouse = false;
        canvas.removeEventListener("pointerup", endDrag);
        canvas.removeEventListener("pointermove", continueDrag);
    }

    function startDrag(e) {
        if (!capturedMouse) {
            capturedMouse = true;
            canvas.setPointerCapture(e.pointerId);
            canvas.addEventListener("pointerup", endDrag);
            canvas.addEventListener("pointermove", continueDrag);
        }

        mousePickColor(e);
    }

    this.getElement = function () {
        return canvas;
    };

    this.setHue = function (h) {
        hue = h;
        paint();
    };

    cpController.on("colorChange", function (color) {
        that.setHue(color.getHue());
    });

    canvas.setAttribute("touch-action", "none");

    canvas.addEventListener("pointerdown", startDrag);

    canvas.width = w;
    canvas.height = h;

    canvas.className = 'chickenpaint-colorpicker-slider';

    makeBitmap();
    paint();
}
module.exports = exports["default"];

},{"../engine/CPColorBmp":9,"../util/CPColor":47}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColorSwatch;

var _CPColor = require('../util/CPColor');

var _CPColor2 = _interopRequireDefault(_CPColor);

var _CPSlider = require('./CPSlider');

var _CPSlider2 = _interopRequireDefault(_CPSlider);

var _CPColorSelect = require('./CPColorSelect');

var _CPColorSelect2 = _interopRequireDefault(_CPColorSelect);

var _CPColorSlider = require('./CPColorSlider');

var _CPColorSlider2 = _interopRequireDefault(_CPColorSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint

    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.

    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPColorSwatch(initialColor, initialAlpha) {
    var that = this,
        color = new _CPColor2.default(0),
        alpha = 255,
        element = document.createElement("div");

    function padLeft(string, padding, len) {
        while (string.length < len) {
            string = padding + string;
        }
        return string;
    }

    function paint() {
        element.style.backgroundColor = '#' + padLeft(Number(color.getRgb()).toString(16), "0", 6);
    }

    function mouseClick(e) {
        e.preventDefault();
    }

    this.getElement = function () {
        return element;
    };

    this.setColor = function (_color) {
        if (!color.isEqual(_color)) {
            color.copyFrom(_color);

            paint();

            this.emitEvent("colorChange", [color]);
        }
    };

    this.setAlpha = function (_alpha) {
        if (_alpha != alpha) {
            alpha = _alpha;

            paint();

            this.emitEvent("alphaChange", [alpha]);
        }
    };

    this.getColorRgb = function () {
        return color.getRgb();
    };

    this.getAlpha = function () {
        return alpha;
    };

    this.setCurColor = this.setColor;

    function buildColorEditPanel() {
        var panel = document.createElement("div"),
            group = document.createElement("div"),
            select = new _CPColorSelect2.default(that, color),
            slider = new _CPColorSlider2.default(that, select, color.getHue()),
            alphaSlider = new _CPSlider2.default(0, 255);

        panel.className = "chickenpaint-color-pick-panel";

        group.className = "chickenpaint-colorpicker-top";

        group.appendChild(select.getElement());
        group.appendChild(slider.getElement());

        panel.appendChild(group);

        alphaSlider.value = alpha;
        alphaSlider.title = function (alpha) {
            return "Opacity: " + alpha;
        };
        alphaSlider.on("valueChange", function (alpha) {
            that.setAlpha(alpha);
        });

        panel.appendChild(alphaSlider.getElement());

        setTimeout(function () {
            alphaSlider.resize();
        }, 0);

        return panel;
    }

    element.className = 'chickenpaint-color-pick-swatch';

    element.addEventListener("click", mouseClick);

    if (initialColor) {
        color.copyFrom(initialColor);
    }

    if (initialAlpha) {
        alpha = initialAlpha;
    }

    // Clicking outside the popover will dismiss it
    function closeClickHandler(e) {
        if ($(e.target).closest(".popover").length == 0 && $(e.target).closest(".chickenpaint-color-pick-swatch")[0] != element) {
            $(element).popover("hide");
        }
    }

    $(element).popover({
        html: true,
        content: function content() {
            window.addEventListener("mousedown", closeClickHandler);

            return buildColorEditPanel();
        },
        trigger: "manual",
        placement: "bottom"

    }).on("click", function () {
        $(this).popover("toggle");
    }).on("hidden.bs.popover", function () {
        window.removeEventListener("mousedown", closeClickHandler);
    });

    paint();
}

CPColorSwatch.prototype = Object.create(EventEmitter.prototype);
CPColorSwatch.prototype.constructor = CPColorSwatch;
module.exports = exports['default'];

},{"../util/CPColor":47,"./CPColorSelect":22,"./CPColorSlider":23,"./CPSlider":37}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CPConfirmTransformDialog;
/*
	ChickenPaint

	ChickenPaint is a translation of ChibiPaint from Java to JavaScript
	by Nicholas Sherlock / Chicken Smoothie.

	ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

	ChickenPaint is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	ChickenPaint is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/
function CPConfirmTransformDialog(parent, controller) {
	var dialog = $("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n\t            <div class=\"modal-dialog\">\n\t                <div class=\"modal-content\">\n\t                    <div class=\"modal-header\">\n\t                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n\t                            <span aria-hidden=\"true\">&times;</span>\n\t                        </button>\n\t                        <h4 class=\"modal-title\">Complete transform</h4>\n\t                    </div>\n\t                    <div class=\"modal-body\">\n\t                        <p>\n\t                            You need to finish transforming this layer before you can do that. What would you like to do with the transform?\n\t\t\t\t\t\t\t</p>\n\t                    </div>\n\t                    <div class=\"modal-footer\">\n\t                        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n\t                        <button type=\"button\" class=\"btn btn-default chickenpaint-reject-transform\" data-dismiss=\"modal\">Undo transform</button>\n\t                        <button type=\"button\" class=\"btn btn-primary chickenpaint-accept-transform\" data-dismiss=\"modal\">Apply transform</button>\n\t                    </div>\n\t                </div>\n\t            </div>\n\t        </div>\n\t    "),
	    that = this,
	    applyButton = $(".chickenpaint-accept-transform", dialog),
	    rejectButton = $(".chickenpaint-reject-transform", dialog);

	applyButton.click(function (e) {
		controller.actionPerformed({ action: "CPTransformAccept" });
		that.emitEvent("accept");
	});

	rejectButton.click(function (e) {
		controller.actionPerformed({ action: "CPTransformReject" });
		that.emitEvent("reject");
	});

	dialog.modal({
		show: false
	}).on('shown.bs.modal', function () {
		applyButton.focus();
	}).on("hidden.bs.modal", function (e) {
		// Destroy the modal upon close
		dialog.remove();
	}).on('keypress', function (e) {
		if (e.keyCode == 13) {
			applyButton.click();
		}
	});

	// Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
	dialog.data("bs.modal").$body = $(parent);

	parent.appendChild(dialog[0]);

	this.show = function () {
		dialog.modal("show");
	};
}

CPConfirmTransformDialog.prototype = Object.create(EventEmitter.prototype);
CPConfirmTransformDialog.prototype.constructor = CPConfirmTransformDialog;
module.exports = exports["default"];

},{}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCheckerboardPattern = createCheckerboardPattern;
/**
 * Create a checkerboard HTML5 CanvasPattern (which can be used for fillStyle) using the given canvas context.
 * 
 * @param canvasContext
 * @returns {CanvasPattern}
 */
function createCheckerboardPattern(canvasContext) {
    var checkerboardCanvas = document.createElement("canvas"),
        checkerboardContext = checkerboardCanvas.getContext("2d"),
        imageData = checkerboardContext.createImageData(64, 64),
        data = imageData.data,
        pixelOffset = 0;

    for (var j = 0; j < 64; j++) {
        for (var i = 0; i < 64; i++) {
            if ((i & 0x8) != 0 ^ (j & 0x8) != 0) {
                // White
                data[pixelOffset++] = 0xff;
                data[pixelOffset++] = 0xff;
                data[pixelOffset++] = 0xff;
                data[pixelOffset++] = 0xff;
            } else {
                // Grey
                data[pixelOffset++] = 0xcc;
                data[pixelOffset++] = 0xcc;
                data[pixelOffset++] = 0xcc;
                data[pixelOffset++] = 0xff;
            }
        }
    }

    checkerboardCanvas.width = 64;
    checkerboardCanvas.height = 64;
    checkerboardContext.putImageData(imageData, 0, 0);

    return canvasContext.createPattern(checkerboardCanvas, 'repeat');
}

},{}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPGridDialog;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPGridDialog(parent, canvas) {
    var dialog = $("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Grid options</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <form>\n                                <div class=\"form-group\">\n                                    <label>Grid size</label>\n                                    <input type=\"text\" class=\"form-control chickenpaint-grid-size\" value=\"\" autofocus>\n                                </div>\n                            </form>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel</button>\n                            <button type=\"button\" class=\"btn btn-primary chickenpaint-apply-grid-settings\" data-dismiss=\"modal\">Ok</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "),
        gridSizeElem = $(".chickenpaint-grid-size", dialog),
        applyButton = $(".chickenpaint-apply-grid-settings", dialog);

    gridSizeElem.val(canvas.getGridSize());

    $(".chickenpaint-apply-grid-settings", dialog).click(function (e) {
        var gridSize = parseInt(gridSizeElem.val(), 10);

        canvas.setGridSize(gridSize);
    });

    dialog.modal({
        show: false
    }).on('shown.bs.modal', function () {
        gridSizeElem.focus();
    }).on('keypress', function (e) {
        if (e.keyCode == 13) {
            applyButton.click();
        }
    });

    // Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
    dialog.data("bs.modal").$body = $(parent);

    parent.appendChild(dialog[0]);

    this.show = function () {
        dialog.modal("show");
    };
}
module.exports = exports["default"];

},{}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPLayersPalette;

var _CPPalette = require("./CPPalette");

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _CPSlider = require("./CPSlider");

var _CPSlider2 = _interopRequireDefault(_CPSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPLayersPalette(controller) {
    _CPPalette2.default.call(this, controller, "layers", "Layers", true);

    var MODE_NAMES = ["Normal", "Multiply", "Add", "Screen", "Lighten", "Darken", "Subtract", "Dodge", "Burn", "Overlay", "Hard Light", "Soft Light", "Vivid Light", "Linear Light", "Pin Light"];

    var palette = this,
        layerH = 32,
        eyeW = 24,
        body = this.getBodyElement(),
        layerWidget = new CPLayerWidget(),
        alphaSlider = new _CPSlider2.default(0, 100),
        blendCombo = document.createElement("select"),
        renameField = new CPRenameField(),
        cbSampleAllLayers = document.createElement("input"),
        cbLockAlpha = document.createElement("input"),
        addButton = document.createElement("li"),
        removeButton = document.createElement("li");

    function fillCombobox(combo, optionNames) {
        for (var i = 0; i < optionNames.length; i++) {
            var option = document.createElement("option");

            option.appendChild(document.createTextNode(optionNames[i]));
            option.value = i;

            combo.appendChild(option);
        }
    }

    function wrapCheckboxWithLabel(checkbox, title) {
        var div = document.createElement("div"),
            label = document.createElement("label");

        div.className = "checkbox";

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(title));

        div.appendChild(label);

        return div;
    }

    function showRenameControl(layerIndex) {
        var d = layerWidget.getCSSSize(),
            artwork = controller.getArtwork(),
            layer = artwork.getLayer(layerIndex);

        renameField.show(eyeW / window.devicePixelRatio, d.height - (layerIndex + 1) * layerH / window.devicePixelRatio, layerIndex, layer.name);
    }

    var parentSetSize = this.setSize,
        parentSetHeight = this.setHeight;

    this.setSize = function (w, h) {
        parentSetSize.call(this, w, h);

        layerWidget.resize();
        alphaSlider.resize();
    };

    this.setHeight = function (h) {
        parentSetHeight.call(this, h);

        layerWidget.resize();
    };

    function CPLayerWidget() {
        var NOTIFICATION_HIDE_DELAY_MS_PER_CHAR = 70,
            NOTIFICATION_HIDE_DELAY_MIN = 3000;

        var layerDrag,
            layerDragReally,
            layerDragIndex,
            layerDragY,
            container = document.createElement("div"),
            canvas = document.createElement("canvas"),
            canvasContext = canvas.getContext("2d"),
            oldApplyPlacement,
            notificationMessage = "",
            notificationLayerIndex = -1,
            notificationLocation = "",
            dismissTimer = false,
            that = this;

        /**
         * Get the size of the component on screen in CSS pixels.
         */
        this.getCSSSize = function () {
            return { width: $(canvas).width(), height: $(canvas).height() };
        };

        function getLayerIndex(point) {
            return Math.floor((canvas.height - point.y / $(canvas).height() * canvas.height) / layerH);
        }

        /**
         * @param layer CPLayer
         * @param selected boolean
         */
        function drawLayer(layer, selected) {
            var d = { width: canvas.width, height: canvas.height };

            if (selected) {
                canvasContext.fillStyle = '#B0B0C0';
            } else {
                canvasContext.fillStyle = 'white';
            }
            canvasContext.fillRect(0, 0, d.width, layerH);

            canvasContext.beginPath();

            canvasContext.moveTo(0, 0);
            canvasContext.lineTo(d.width, 0);

            canvasContext.moveTo(eyeW, 0);
            canvasContext.lineTo(eyeW, layerH);

            canvasContext.moveTo(eyeW + 6 * window.devicePixelRatio, layerH / 2);
            canvasContext.lineTo(d.width - 6 * window.devicePixelRatio, layerH / 2);

            canvasContext.stroke();

            canvasContext.fillStyle = 'black';

            canvasContext.fillText(layer.name, eyeW + 6 * window.devicePixelRatio, 12 * window.devicePixelRatio);
            canvasContext.fillText(MODE_NAMES[layer.blendMode] + ": " + layer.alpha + "%", eyeW + 6 * window.devicePixelRatio, layerH - 5 * window.devicePixelRatio);

            canvasContext.beginPath();
            if (layer.visible) {
                canvasContext.arc(eyeW / 2, layerH / 2, 9 * window.devicePixelRatio, 0, Math.PI * 2);
                canvasContext.fill();
            } else {
                canvasContext.arc(eyeW / 2, layerH / 2, 9 * window.devicePixelRatio, 0, Math.PI * 2);
                canvasContext.stroke();
            }
        }

        function mouseUp(e) {
            if (e.button == 0) {
                var offset = $(canvas).offset(),
                    artwork = controller.getArtwork(),
                    layers = artwork.getLayers(),
                    mouseLoc = { x: e.pageX - offset.left, y: e.pageY - offset.top },
                    layerOver = getLayerIndex(mouseLoc);

                //layerDragY = e.pageY - offset.top;

                if (layerOver >= 0 && layerOver <= layers.length && layerOver != layerDragIndex && layerOver != layerDragIndex + 1) {
                    controller.actionPerformed({ action: "CPMoveLayer", fromIndex: layerDragIndex, toIndex: layerOver });
                }

                // Do we need to repaint to erase draglines?
                if (layerDragReally) {
                    layerDragReally = false;
                    that.paint();
                }

                layerDrag = false;

                window.removeEventListener("mousemove", mouseDragged);
                window.removeEventListener("mouseup", mouseUp);
            }
        }

        function mouseDragged(e) {
            if (layerDrag) {
                layerDragReally = true;
                layerDragY = e.pageY - $(canvas).offset().top;
                that.paint();
            }
        }

        /**
         * Repaint just the layer with the specified index
         */
        this.paintLayer = function (layerIndex) {
            var layer = artwork.getLayer(layerIndex),
                layerTop = canvas.height - layerH * (layerIndex + 1);

            canvasContext.save();

            canvasContext.fillStyle = '#606060';
            canvasContext.fillRect(0, layerTop, canvas.width, layerH);

            canvasContext.strokeStyle = 'black';

            canvasContext.translate(0, layerTop);
            drawLayer(layer, layerIndex == artwork.getActiveLayerIndex());

            canvasContext.restore();
        };

        /**
         * Repaint the entire control
         */
        this.paint = function () {
            var artwork = controller.getArtwork(),
                layers = artwork.getLayers(),
                d = { width: canvas.width, height: canvas.height },
                canvasScaleFactor = canvas.height / $(canvas).height();

            canvasContext.save();

            canvasContext.fillStyle = '#606060';
            canvasContext.fillRect(0, 0, d.width, d.height - layers.length * layerH);

            canvasContext.strokeStyle = 'black';

            // Draw the list of layers, with the first layer at the bottom of the control
            canvasContext.translate(0, d.height - layerH);

            for (var i = 0; i < layers.length; i++) {
                drawLayer(layers[i], i == artwork.getActiveLayerIndex());
                canvasContext.translate(0, -layerH);
            }

            if (layerDragReally) {
                canvasContext.translate(0, layers.length * layerH - (d.height - layerH));
                canvasContext.strokeRect(0, layerDragY * canvasScaleFactor - layerH / 2, d.width, layerH);

                var layerOver = getLayerIndex({ x: 0, y: layerDragY });

                if (layerOver <= layers.length && layerOver != layerDragIndex && layerOver != layerDragIndex + 1) {
                    canvasContext.fillRect(0, d.height - layerOver * layerH - 2, d.width, 4 * window.devicePixelRatio);
                }
            }

            canvasContext.restore();
        };

        this.resize = function () {
            var artwork = controller.getArtwork(),


            // Our parent container will act as our scrollbar clip area
            parent = $(canvas).parent(),
                parentHeight = parent.height(),
                parentWidth = parent.width(),
                newWidth,
                newHeight;

            layerH = 34 * window.devicePixelRatio;
            eyeW = 24 * window.devicePixelRatio;

            newWidth = parentWidth * window.devicePixelRatio;
            newHeight = Math.max(layerH * artwork.getLayerCount(), parentHeight * window.devicePixelRatio);

            // Should we trigger a scrollbar to appear?
            if (newHeight > parentHeight * window.devicePixelRatio) {
                // Take the scrollbar width into account in our width
                newWidth -= 15 * window.devicePixelRatio;
                parent[0].style.overflowY = 'scroll';
            } else {
                parent[0].style.overflowY = 'hidden';
            }

            canvas.width = newWidth;
            canvas.height = newHeight;

            canvas.style.width = newWidth / window.devicePixelRatio + "px";
            canvas.style.height = newHeight / window.devicePixelRatio + "px";

            canvasContext.font = layerH * 0.25 + "pt sans-serif";

            this.paint();
            this.dismissNotification();
        };

        this.getElement = function () {
            return container;
        };

        canvas.addEventListener("click", function (e) {
            if (renameField.isVisible()) {
                renameField.renameAndHide();
            }
        });

        canvas.addEventListener("dblclick", function (e) {
            var offset = $(canvas).offset(),
                mouseLoc = { x: e.pageX - offset.left, y: e.pageY - offset.top },
                layerIndex = getLayerIndex(mouseLoc);

            if (mouseLoc.x * window.devicePixelRatio > eyeW && layerIndex >= 0 && layerIndex < artwork.getLayerCount()) {
                showRenameControl(layerIndex);
            }
        });

        canvas.addEventListener("mousedown", function (e) {
            var offset = $(canvas).offset(),
                mouseLoc = { x: e.pageX - offset.left, y: e.pageY - offset.top };

            /* Click, moved from mouseClicked due to problems with focus and stuff */
            if (e.button == 0) {
                /* Left button */
                var artwork = controller.getArtwork(),
                    layers = artwork.getLayers(),
                    layerIndex = getLayerIndex(mouseLoc);

                if (layerIndex >= 0 && layerIndex < artwork.getLayerCount()) {
                    var layer = artwork.getLayer(layerIndex);

                    if (mouseLoc.x / $(canvas).width() * canvas.width < eyeW) {
                        controller.actionPerformed({ action: "CPSetLayerVisibility", layerIndex: layerIndex, visible: !layer.visible });
                    } else if (artwork.getActiveLayerIndex() != layerIndex) {
                        controller.actionPerformed({ action: "CPSetActiveLayerIndex", layerIndex: layerIndex });
                    }
                }

                if (layerIndex < layers.length) {
                    layerDrag = true;
                    layerDragY = mouseLoc.y;
                    layerDragIndex = layerIndex;

                    window.addEventListener("mousemove", mouseDragged);
                    window.addEventListener("mouseup", mouseUp);
                }
            }
        });

        /**
         * Scroll the layer widget until the layer with the given index is fully visible.
         *
         * @param layerIndex
         */
        function revealLayer(layerIndex) {
            var layerWidgetPos = canvas.getBoundingClientRect(),
                scrollBoxPos = container.getBoundingClientRect(),
                scrollBoxHeight = scrollBoxPos.bottom - scrollBoxPos.top,
                layerHeight = layerH / window.devicePixelRatio,
                layerTop = layerWidgetPos.bottom - layerHeight * (layerIndex + 1),
                layerBottom = layerTop + layerHeight;

            container.scrollTop = Math.max(Math.min(Math.max(container.scrollTop, layerBottom - layerWidgetPos.top - scrollBoxHeight), layerTop - layerWidgetPos.top), 0);
        }

        this.dismissNotification = function () {
            $(canvas).popover('hide');
        };

        this.showNotification = function (layerIndex, message, where) {
            notificationMessage = message;
            notificationLayerIndex = layerIndex;

            if (artwork.getActiveLayerIndex() == layerIndex && where == "opacity") {
                notificationLocation = "opacity";
            } else {
                notificationLocation = "layer";
                revealLayer(layerIndex);
            }

            $(canvas).popover("show");

            if (dismissTimer) {
                clearTimeout(dismissTimer);
            }
            dismissTimer = setTimeout(function () {
                dismissTimer = false;
                that.dismissNotification();
            }, Math.max(Math.round(notificationMessage.length * NOTIFICATION_HIDE_DELAY_MS_PER_CHAR), NOTIFICATION_HIDE_DELAY_MIN));
        };

        /* Reposition the popover to the layer/location that the notification applies to */
        function applyNotificationPlacement(offset, placement) {
            oldApplyPlacement.call(this, offset, placement);

            var $tip = this.tip(),
                $arrow = this.arrow(),
                layerWidgetPos = canvas.getBoundingClientRect(),
                scrollBoxPos = container.getBoundingClientRect();

            switch (notificationLocation) {
                case "layer":
                    var layerMiddle = layerWidgetPos.bottom - layerH / window.devicePixelRatio * (notificationLayerIndex + 0.5);

                    layerMiddle = Math.min(Math.max(layerMiddle, scrollBoxPos.top), scrollBoxPos.bottom);

                    $tip.offset({
                        top: layerMiddle + document.body.scrollTop - $tip.height() / 2,
                        left: layerWidgetPos.left - $tip.outerWidth() - $arrow.outerWidth()
                    });
                    break;
                case "opacity":
                    var alphaSliderPos = alphaSlider.getElement().getBoundingClientRect();

                    $tip.offset({
                        top: (alphaSliderPos.top + alphaSliderPos.bottom - $tip.height()) / 2 + document.body.scrollTop,
                        left: alphaSliderPos.left - $tip.outerWidth() - $arrow.outerWidth()
                    });
                    break;
            }

            $arrow.css("top", "50%");
        }

        controller.on("layerNotification", this.showNotification.bind(this));

        $(canvas).popover({
            html: false,
            content: function content() {
                return notificationMessage;
            },
            placement: "left",
            trigger: "manual",
            container: palette.getElement()
        });

        var popover = $(canvas).data('bs.popover');

        // Save the old positioning routine so we can call it later
        oldApplyPlacement = popover.applyPlacement;

        popover.applyPlacement = applyNotificationPlacement;

        if (!window.devicePixelRatio) {
            window.devicePixelRatio = 1.0;
        }

        canvasContext.strokeStyle = 'black';

        container.className = "chickenpaint-layers-widget";
        container.appendChild(canvas);
    }

    function CPRenameField() {
        var layerIndex = -1,
            textBox = document.createElement("input"),
            that = this;

        this.hide = function () {
            layerIndex = -1;
            textBox.style.display = 'none';
        };

        this.renameAndHide = function () {
            if (artwork.getLayer(layerIndex).name != textBox.value) {
                controller.actionPerformed({ action: "CPSetLayerName", layerIndex: layerIndex, name: textBox.value });
            }

            this.hide();
        };

        this.isVisible = function () {
            return textBox.style.display != 'none';
        };

        this.setLocation = function (positionX, positionY) {
            textBox.style.left = positionX + "px";
            textBox.style.top = positionY + "px";
        };

        this.show = function (x, y, _layerIndex, layerName) {
            layerIndex = _layerIndex;
            textBox.value = layerName;
            this.setLocation(x, y);

            textBox.style.display = 'block';
            textBox.select();
        };

        this.getElement = function () {
            return textBox;
        };

        textBox.type = "text";
        textBox.className = "chickenpaint-layer-new-name form-control input-sm";
        textBox.style.display = 'none';

        textBox.addEventListener("keydown", function (e) {
            // Prevent other keyhandlers (CPCanvas) from getting their grubby hands on the input
            e.stopPropagation();
        });

        textBox.addEventListener("keypress", function (e) {
            if (e.keyCode == 13) {
                // Enter
                that.renameAndHide();
            }
            e.stopPropagation();
        });

        textBox.addEventListener("keyup", function (e) {
            if (e.keyCode == 27) {
                // Escape
                that.hide();
            }
            e.stopPropagation();
        });

        textBox.addEventListener("blur", function (e) {
            if (layerIndex != -1) {
                that.renameAndHide();
            }
        });
    }

    blendCombo.className = "form-control";
    blendCombo.title = "Layer blending mode";
    blendCombo.addEventListener("change", function (e) {
        controller.actionPerformed({ action: "CPSetLayerBlendMode", layerIndex: artwork.getActiveLayerIndex(), blendMode: parseInt(blendCombo.value, 10) });
    });

    fillCombobox(blendCombo, MODE_NAMES);

    body.appendChild(blendCombo);

    alphaSlider.title = function (value) {
        return "Opacity: " + value + "%";
    };

    alphaSlider.on("valueChange", function (value) {
        controller.actionPerformed({ action: "CPSetLayerAlpha", layerIndex: artwork.getActiveLayerIndex(), alpha: value });
    });

    body.appendChild(alphaSlider.getElement());

    cbSampleAllLayers.type = "checkbox";
    cbSampleAllLayers.addEventListener("click", function (e) {
        var artwork = controller.getArtwork();

        artwork.setSampleAllLayers(cbSampleAllLayers.checked);
    });

    body.appendChild(wrapCheckboxWithLabel(cbSampleAllLayers, "Sample all layers"));

    cbLockAlpha.type = "checkbox";
    cbLockAlpha.addEventListener("click", function (e) {
        var artwork = controller.getArtwork();

        artwork.setLockAlpha(cbLockAlpha.checked);
    });

    body.appendChild(wrapCheckboxWithLabel(cbLockAlpha, "Lock alpha"));

    layerWidget.getElement().appendChild(renameField.getElement());

    body.appendChild(layerWidget.getElement());

    // Add/Remove layer buttons
    var addRemoveContainer = document.createElement("ul");

    addRemoveContainer.className = 'chickenpaint-layer-add-remove list-unstyled';

    addButton.className = 'chickenpaint-small-toolbar-button chickenpaint-add-layer';
    addButton.title = 'Add layer';
    addButton.addEventListener("click", function () {
        controller.actionPerformed({ action: "CPAddLayer" });
    });

    removeButton.className = 'chickenpaint-small-toolbar-button chickenpaint-remove-layer';
    removeButton.title = "Delete layer";
    removeButton.addEventListener("click", function () {
        controller.actionPerformed({ action: "CPRemoveLayer" });
    });

    addRemoveContainer.appendChild(addButton);
    addRemoveContainer.appendChild(removeButton);

    body.appendChild(addRemoveContainer);

    var artwork = controller.getArtwork();

    // Set initial values
    alphaSlider.setValue(artwork.getActiveLayer().getAlpha());
    blendCombo.value = artwork.getActiveLayer().getBlendMode();

    artwork.on("changeLayer", function (layerIndex) {
        var artwork = this;

        if (artwork.getActiveLayer().getAlpha() != alphaSlider.value) {
            alphaSlider.setValue(artwork.getActiveLayer().getAlpha());
        }

        if (artwork.getActiveLayer().getBlendMode() != parseInt(blendCombo.value, 10)) {
            blendCombo.value = artwork.getActiveLayer().getBlendMode();
        }

        if (layerIndex !== undefined) {
            layerWidget.paintLayer(layerIndex);
        } else {
            // We may have added or removed layers, resize as appropriate
            layerWidget.resize();
        }

        layerWidget.dismissNotification();
    });
}

CPLayersPalette.prototype = Object.create(_CPPalette2.default.prototype);
CPLayersPalette.prototype.constructor = CPLayersPalette;
module.exports = exports["default"];

},{"./CPPalette":32,"./CPSlider":37}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPMainGUI;

var _CPCanvas = require("./CPCanvas");

var _CPCanvas2 = _interopRequireDefault(_CPCanvas);

var _CPPaletteManager = require("./CPPaletteManager");

var _CPPaletteManager2 = _interopRequireDefault(_CPPaletteManager);

var _CPMainMenu = require("./CPMainMenu");

var _CPMainMenu2 = _interopRequireDefault(_CPMainMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPMainGUI(controller, uiElem) {
    var lowerArea = document.createElement("div"),
        canvas = new _CPCanvas2.default(controller),
        paletteManager = new _CPPaletteManager2.default(controller),
        menuBar,
        fullScreenMode = false,
        that = this;

    this.togglePalettes = function () {
        paletteManager.togglePalettes();
    };

    this.arrangePalettes = function () {
        // Give the browser a chance to do the sizing of the palettes before we try to rearrange them
        setTimeout(paletteManager.arrangePalettes.bind(paletteManager), 0);
    };

    this.constrainPalettes = function () {
        paletteManager.constrainPalettes();
    };

    this.showPalette = function (paletteName, show) {
        paletteManager.showPaletteByName(paletteName, show);
    };

    this.getSwatches = function () {
        return paletteManager.palettes.swatches.getSwatches();
    };

    this.setSwatches = function (swatches) {
        paletteManager.palettes.swatches.setSwatches(swatches);
    };

    this.getPaletteManager = function () {
        return paletteManager;
    };

    this.setRotation = function (rotation) {
        canvas.setRotation(rotation);
    };

    this.setFullScreenMode = function (value) {
        fullScreenMode = value;

        that.resize();
        that.arrangePalettes();
    };

    this.resize = function () {
        var newHeight;

        if (fullScreenMode) {
            newHeight = $(window).height() - $(menuBar.getElement()).height();
        } else {
            newHeight = Math.min(Math.max($(window).height() - $(menuBar.getElement()).height() - 65, 500), 750);
        }

        canvas.resize(newHeight);
        that.constrainPalettes();
    };

    menuBar = new _CPMainMenu2.default(controller, this);

    uiElem.appendChild(menuBar.getElement());

    lowerArea.className = 'chickenpaint-main-section';

    lowerArea.appendChild(canvas.getElement());
    lowerArea.appendChild(paletteManager.getElement());

    uiElem.appendChild(lowerArea);

    window.addEventListener("resize", this.resize.bind(this));

    setTimeout(this.resize.bind(this), 0);
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

CPMainGUI.prototype = Object.create(EventEmitter.prototype);
CPMainGUI.prototype.constructor = CPMainGUI;
module.exports = exports["default"];

},{"./CPCanvas":19,"./CPMainMenu":30,"./CPPaletteManager":33}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPMainMenu;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

var MENU_ENTRIES = [{
    name: "File",
    mnemonic: "F",
    children: [{
        name: "Save to my computer",
        action: "CPSave",
        mnemonic: "S",
        shortcut: "ctrl+s"
    }, {
        name: "Save Oekaki",
        action: "CPSend",
        mnemonic: "S",
        shortcut: "ctrl+s"
    }]
}, {
    name: "Edit",
    mnemonic: "E",
    children: [{
        name: "Undo",
        action: "CPUndo",
        mnemonic: "U",
        shortcut: "ctrl+z",
        title: "Undoes the most recent action"
    }, {
        name: "Redo",
        action: "CPRedo",
        mnemonic: "R",
        shortcut: "shift+ctrl+z",
        title: "Redoes a previously undone action"
    }, {
        name: "Clear history",
        action: "CPClearHistory",
        mnemonic: "H",
        title: "Removes all undo/redo information to regain memory"
    }, {
        name: "-"
    }, {
        name: "Cut",
        action: "CPCut",
        mnemonic: "T",
        shortcut: "ctrl+x"
    }, {
        name: "Copy",
        action: "CPCopy",
        mnemonic: "C",
        shortcut: "ctrl+c"
    }, {
        name: "Copy merged",
        action: "CPCopyMerged",
        mnemonic: "Y",
        shortcut: "shift+ctrl+c"
    }, {
        name: "Paste",
        action: "CPPaste",
        mnemonic: "P",
        shortcut: "ctrl+v"
    }, {
        name: "-"
    }, {
        name: "Select all",
        action: "CPSelectAll",
        mnemonic: "A",
        shortcut: "ctrl+a"
    }, {
        name: "Deselect",
        action: "CPDeselectAll",
        mnemonic: "D",
        shortcut: "ctrl+d"
    }, {
        name: "-"
    }, {
        name: "Transform",
        action: "CPTransform",
        mnemonic: "T",
        shortcut: "ctrl+y"
    }]
}, {
    name: "Layers",
    mnemonic: "L",
    children: [{
        name: "Duplicate",
        action: "CPLayerDuplicate",
        mnemonic: "D",
        shortcut: "shift+ctrl+d",
        title: "Creates a copy of the currently selected layer"
    }, {
        name: "-"
    }, {
        name: "Merge down",
        action: "CPLayerMergeDown",
        mnemonic: "E",
        shortcut: "ctrl+e",
        title: "Merges the currently selected layer with the one directly below it"
    }, {
        name: "Merge all layers",
        action: "CPLayerMergeAll",
        mnemonic: "A",
        title: "Merges all the layers"
    }]
}, {
    name: "Effects",
    mnemonic: "E",
    children: [{
        name: "Clear",
        action: "CPClear",
        mnemonic: "D",
        shortcut: "del,backspace",
        title: "Clears the selected area"
    }, {
        name: "Fill",
        action: "CPFill",
        mnemonic: "F",
        shortcut: "ctrl+f",
        title: "Fills the selected area with the current color"
    }, {
        name: "Flip horizontal",
        action: "CPHFlip",
        mnemonic: "H",
        title: "Flips the current selected area horizontally"
    }, {
        name: "Flip vertical",
        action: "CPVFlip",
        mnemonic: "V",
        title: "Flips the current selected area vertically"
    }, {
        name: "Invert",
        action: "CPFXInvert",
        mnemonic: "I",
        title: "Invert the image colors"
    }, {
        name: "-"
    }, {
        name: "Box blur...",
        action: "CPFXBoxBlur",
        mnemonic: "B",
        title: "Blur effect"
    }, {
        name: "-"
    }, {
        name: "Monochromatic noise",
        action: "CPMNoise",
        mnemonic: "M",
        title: "Fills the selection with noise"
    }, {
        name: "Color noise",
        action: "CPCNoise",
        mnemonic: "C",
        title: "Fills the selection with colored noise"
    }]
}, {
    name: "View",
    mnemonic: "V",
    children: [{
        name: "Full-screen mode",
        action: "CPFullScreen",
        mnemonic: "F",
        checkbox: true,
        checked: false
    }, {
        name: "-"
    }, {
        name: "Zoom in",
        action: "CPZoomIn",
        mnemonic: "I",
        shortcut: "ctrl+=",
        title: "Zooms in"
    }, {
        name: "Zoom out",
        action: "CPZoomOut",
        mnemonic: "O",
        shortcut: "ctrl+-",
        title: "Zooms out"
    }, {
        name: "Zoom 100%",
        action: "CPZoom100",
        mnemonic: "1",
        shortcut: "ctrl+0",
        title: "Resets the zoom factor to 100%"
    }, {
        action: "CPLinearInterpolation",
        name: "-"
    }, {
        name: "Smooth-out zoomed canvas",
        action: "CPLinearInterpolation",
        mnemonic: "L",
        title: "Linear interpolation is used to give a smoothed looked to the picture when zoomed in",
        checkbox: true
    }, {
        name: "-"
    }, {
        name: "Show grid",
        action: "CPToggleGrid",
        mnemonic: "G",
        shortcut: "ctrl+g",
        title: "Displays a grid over the image",
        checkbox: true,
        checked: false
    }, {
        name: "Grid options...",
        action: "CPGridOptions",
        mnemonic: "D",
        title: "Shows the grid options dialog box"
    }]
}, {
    name: "Palettes",
    mnemonic: "P",
    children: [{
        name: "Rearrange",
        action: "CPArrangePalettes",
        title: "Rearrange the palette windows"
    }, {
        name: "Toggle palettes",
        action: "CPTogglePalettes",
        mnemonic: "P",
        shortcut: "tab",
        title: "Hides or shows all palettes"
    }, {
        name: "-"
    }, {
        name: "Show tool options",
        action: "CPPalBrush",
        mnemonic: "B",
        checkbox: true,
        checked: true
    }, {
        name: "Show color",
        action: "CPPalColor",
        mnemonic: "C",
        checkbox: true,
        checked: true
    }, {
        name: "Show layers",
        action: "CPPalLayers",
        mnemonic: "Y",
        checkbox: true,
        checked: true
    }, {
        name: "Show misc",
        action: "CPPalMisc",
        mnemonic: "M",
        checkbox: true,
        checked: true
    }, {
        name: "Show stroke",
        action: "CPPalStroke",
        mnemonic: "S",
        checkbox: true,
        checked: true
    }, {
        name: "Show swatches",
        action: "CPPalSwatches",
        mnemonic: "W",
        checkbox: true,
        checked: true
    }, {
        name: "Show textures",
        action: "CPPalTextures",
        mnemonic: "X",
        checkbox: true,
        checked: true
    }, {
        name: "Show tools",
        action: "CPPalTool",
        mnemonic: "T",
        checkbox: true,
        checked: true
    }]
}, {
    name: "Help",
    mnemonic: "H",
    children: [{
        name: "Tablet support",
        mnemonic: "T",
        action: "CPTabletSupport",
        title: "Help with getting a drawing tablet working"
    }, {
        name: "Shortcuts",
        mnemonic: "S",
        action: "CPShortcuts",
        title: "List of keyboard and mouse shortcuts"
    }, {
        name: "-"
    }, {
        name: "About",
        mnemonic: "A",
        action: "CPAbout",
        title: "Displays some information about ChickenPaint"
    }]
}];

function CPMainMenu(controller, mainGUI) {
    var bar = $('<nav class="navbar navbar-default">' + '<div class="container-fluid">' + '<div class="navbar-header">' + '<a class="navbar-brand" href="#">ChickenPaint</a>' + '</div>' + '<ul class="nav navbar-nav">' + '</ul>' + '</div>' + '</nav>'),
        macPlatform = /^Mac/i.test(navigator.platform);

    function menuItemClicked(target) {
        var action = target.data('action'),
            checkbox = target.data('checkbox'),
            selected;

        if (checkbox) {
            target.toggleClass("selected");
            selected = target.hasClass("selected");
        } else {
            selected = false;
        }

        controller.actionPerformed({
            action: action,
            checkbox: checkbox,
            selected: selected
        });
    }

    function presentShortcutText(shortcut) {
        shortcut = shortcut.toUpperCase();

        // Only show the first potential shortcut out of the comma-separated list
        shortcut = shortcut.replace(/(,.+)$/, "");

        // Although the keycode for zoom in is "=", we'll present it to the user as "+"
        shortcut = shortcut.replace("ctrl+=", "ctrl++");
        shortcut = shortcut.replace("⌘+=", "⌘++");

        if (macPlatform) {
            shortcut = shortcut.replace(/([^+])\+/g, "$1");
        } else {
            shortcut = shortcut.replace(/([^+])\+/g, "$1 ");
        }

        return shortcut;
    }

    function recurseFillMenu(menuElem, entries) {
        menuElem.append(entries.map(function (entry) {
            var entryElem;

            if (entry.action && !controller.isActionSupported(entry.action)) {
                return;
            }

            if (entry.action == "CPSend" && !controller.isActionSupported("CPContinue")) {
                // User won't be able to come back after saving, so make it sound more final
                entry.name = "Post Oekaki";
                entry.shortcut = "ctrl+p";
            }

            if (entry.children) {
                entryElem = $('<li class="dropdown">' + '<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + entry.name + ' <span class="caret"></span></a>' + '<ul class="dropdown-menu">' + '</ul>' + '</li>');

                $(".dropdown-toggle", entryElem).dropdown();

                entryElem.on("show.bs.dropdown", function () {
                    /* Instead of Bootstrap's extremely expensive data API, we'll only listen for dismiss clicks on the
                     * document *while the menu is open!*
                     */
                    $(document).one("click", function () {
                        if (entryElem.hasClass("open")) {
                            $(".dropdown-toggle", entryElem).dropdown("toggle");
                        }
                    });
                });

                recurseFillMenu($(".dropdown-menu", entryElem), entry.children);
            } else if (entry.name == '-') {
                entryElem = $('<li role="separator" class="divider"></li>');
            } else {
                entryElem = $('<li><a href="#" data-action="' + entry.action + '"><span>' + entry.name + '</span></a></li>');

                if (entry.checkbox) {
                    $("a", entryElem).data("checkbox", true).toggleClass("selected", !!entry.checked);
                }
            }

            if (entry.title) {
                entryElem.attr('title', entry.title);
            }

            if (entry.shortcut) {
                var menuLink = $("> a", entryElem),
                    shortcutDesc = document.createElement("small");

                // Rewrite the shortcuts to Mac-style
                if (macPlatform) {
                    entry.shortcut = entry.shortcut.replace(/SHIFT/im, "⇧");
                    entry.shortcut = entry.shortcut.replace(/ALT/im, "⌥");
                    entry.shortcut = entry.shortcut.replace(/CTRL/im, "⌘");
                }

                shortcutDesc.className = "chickenpaint-shortcut";
                shortcutDesc.innerHTML = presentShortcutText(entry.shortcut);

                menuLink.append(shortcutDesc);

                key(entry.shortcut, function (e) {
                    menuItemClicked(menuLink);

                    e.preventDefault();
                    e.stopPropagation();

                    return false;
                });
            }

            return entryElem;
        }));
    }

    this.getElement = function () {
        return bar[0];
    };

    recurseFillMenu($(".navbar-nav", bar), MENU_ENTRIES);

    $(bar).on('click', 'a:not(.dropdown-toggle)', function (e) {
        menuItemClicked($(this));
        e.preventDefault();
    });

    function onPaletteVisChange(paletteName, show) {
        // Toggle the tickbox of the corresponding menu entry to match the new palette visibility
        var palMenuEntry = $('[data-action=\"CPPal' + paletteName.substring(0, 1).toUpperCase() + paletteName.substring(1) + '\"]', bar);

        palMenuEntry.toggleClass("selected", show);
    }

    mainGUI.getPaletteManager().on("paletteVisChange", onPaletteVisChange);
}
module.exports = exports["default"];

},{}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPMiscPalette;

var _CPPalette = require("./CPPalette");

var _CPPalette2 = _interopRequireDefault(_CPPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPMiscPalette(cpController) {
    _CPPalette2.default.call(this, cpController, "misc", "Misc");

    var that = this,
        buttons = [{
        className: "chickenpaint-tool-zoom-in",
        command: "CPZoomIn",
        toolTip: "Zoom in"
    }, {
        className: "chickenpaint-tool-zoom-out",
        command: "CPZoomOut",
        toolTip: "Zoom out"
    }, {
        className: "chickenpaint-tool-zoom-100",
        command: "CPZoom100",
        toolTip: "Zoom 100%"
    }, {
        className: "chickenpaint-tool-undo",
        command: "CPUndo",
        toolTip: "Undo"
    }, {
        className: "chickenpaint-tool-redo",
        command: "CPRedo",
        toolTip: "Redo"
    }, {
        className: "chickenpaint-tool-send",
        command: "CPSend",
        toolTip: "Save pic"
    }];

    function buildButtons() {
        var body = that.getBodyElement(),
            listElem = document.createElement("ul");

        listElem.className = "chickenpaint-misc-tools list-unstyled";

        for (var i in buttons) {
            var button = buttons[i],
                buttonElem = document.createElement("li");

            if (button.command == 'CPSend' && !cpController.isActionSupported("CPContinue")) {
                button.toolTip = "Send picture to server";
                button.className = "chickenpaint-tool-send-and-end";
            }

            buttonElem.className = "chickenpaint-toolbar-button " + button.className;
            buttonElem.setAttribute("data-buttonIndex", i);

            listElem.appendChild(buttonElem);
        }

        listElem.addEventListener("mousedown", function (e) {
            if (e.target && e.target.nodeName == "LI") {
                $(e.target).addClass("selected");
            }
        });

        listElem.addEventListener("mouseup", function (e) {
            if (e.target && e.target.nodeName == "LI") {
                $(e.target).removeClass("selected");
            }
        });

        listElem.addEventListener("click", function (e) {
            if (e.target && e.target.nodeName == "LI") {
                var button = buttons[parseInt(e.target.getAttribute("data-buttonIndex"), 10)];

                cpController.actionPerformed({ action: button.command });
            }
        });

        body.appendChild(listElem);
    }

    buildButtons();
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

CPMiscPalette.prototype = Object.create(_CPPalette2.default.prototype);
CPMiscPalette.prototype.constructor = CPMiscPalette;
module.exports = exports["default"];

},{"./CPPalette":32}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPPalette;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPPalette(cpController, className, title, resizeVert) {
    this.title = title;
    this.name = className;
    this.resizeVert = resizeVert || false;

    var containerElement = document.createElement("div"),
        headElement = document.createElement("div"),
        closeButton = document.createElement("button"),
        bodyElement = document.createElement("div"),
        vertHandle = null,
        dragOffset,
        that = this;

    this.getElement = function () {
        return containerElement;
    };

    this.getBodyElement = function () {
        return bodyElement;
    };

    this.getWidth = function () {
        return $(containerElement).outerWidth();
    };

    this.getHeight = function () {
        return $(containerElement).outerHeight();
    };

    this.getX = function () {
        return parseInt(containerElement.style.left, 10) || 0;
    };

    this.getY = function () {
        return parseInt(containerElement.style.top, 10) || 0;
    };

    this.setLocation = function (x, y) {
        containerElement.style.left = x + "px";
        containerElement.style.top = y + "px";
    };

    this.setWidth = function (width) {
        containerElement.style.width = width + "px";
    };

    this.setHeight = function (height) {
        containerElement.style.height = height + "px";
    };

    this.setSize = function (width, height) {
        this.setWidth(width);
        this.setHeight(height);
    };

    function mouseDrag(e) {
        that.setLocation(e.pageX - dragOffset.x, e.pageY - dragOffset.y);
    }

    function mouseDragRelease(e) {
        window.removeEventListener("mousemove", mouseDrag);
        window.removeEventListener("mouseup", mouseDragRelease);
    }

    function vertHandleDrag(e) {
        that.setHeight(e.pageY - $(containerElement).offset().top);
    }

    function vertHandleRelease(e) {
        window.removeEventListener("mousemove", vertHandleDrag);
        window.removeEventListener("mouseup", vertHandleRelease);
    }

    function vertHandleMouseDown(e) {
        window.addEventListener("mousemove", vertHandleDrag);
        window.addEventListener("mouseup", vertHandleRelease);
    }

    function addVertResizeHandle() {
        vertHandle = document.createElement("div");

        vertHandle.className = "chickenpaint-resize-handle-vert";

        vertHandle.addEventListener("mousedown", vertHandleMouseDown);

        containerElement.appendChild(vertHandle);
    }

    closeButton.type = "button";
    closeButton.className = "close";
    closeButton.innerHTML = "&times;";

    containerElement.className = "chickenpaint-palette chickenpaint-palette-" + className;

    headElement.className = "chickenpaint-palette-head";

    var headTitle = document.createElement("h4");

    headTitle.className = 'modal-title';
    headTitle.appendChild(document.createTextNode(this.title));

    headElement.appendChild(closeButton);
    headElement.appendChild(headTitle);

    bodyElement.className = "chickenpaint-palette-body";

    containerElement.appendChild(headElement);
    containerElement.appendChild(bodyElement);

    if (this.resizeVert) {
        addVertResizeHandle();
    }

    headElement.addEventListener("mousedown", function (e) {
        if (e.button == 0) {
            /* Left */
            if (e.target.nodeName == "BUTTON") {
                that.emitEvent("paletteVisChange", [that, false]);
            } else {
                window.addEventListener("mousemove", mouseDrag);
                window.addEventListener("mouseup", mouseDragRelease);

                dragOffset = { x: e.pageX - $(containerElement).position().left, y: e.pageY - $(containerElement).position().top };
            }
        }
    });
}

CPPalette.prototype = Object.create(EventEmitter.prototype);
CPPalette.prototype.constructor = EventEmitter;
module.exports = exports["default"];

},{}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPPaletteManager;

var _CPToolPalette = require("./CPToolPalette");

var _CPToolPalette2 = _interopRequireDefault(_CPToolPalette);

var _CPMiscPalette = require("./CPMiscPalette");

var _CPMiscPalette2 = _interopRequireDefault(_CPMiscPalette);

var _CPStrokePalette = require("./CPStrokePalette");

var _CPStrokePalette2 = _interopRequireDefault(_CPStrokePalette);

var _CPColorPalette = require("./CPColorPalette");

var _CPColorPalette2 = _interopRequireDefault(_CPColorPalette);

var _CPBrushPalette = require("./CPBrushPalette");

var _CPBrushPalette2 = _interopRequireDefault(_CPBrushPalette);

var _CPLayersPalette = require("./CPLayersPalette");

var _CPLayersPalette2 = _interopRequireDefault(_CPLayersPalette);

var _CPTexturePalette = require("./CPTexturePalette");

var _CPTexturePalette2 = _interopRequireDefault(_CPTexturePalette);

var _CPSwatchesPalette = require("./CPSwatchesPalette");

var _CPSwatchesPalette2 = _interopRequireDefault(_CPSwatchesPalette);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPPaletteManager(cpController) {
    var palettes = {
        tool: new _CPToolPalette2.default(cpController),
        misc: new _CPMiscPalette2.default(cpController),
        stroke: new _CPStrokePalette2.default(cpController),
        color: new _CPColorPalette2.default(cpController),
        brush: new _CPBrushPalette2.default(cpController),
        layers: new _CPLayersPalette2.default(cpController),
        textures: new _CPTexturePalette2.default(cpController),
        swatches: new _CPSwatchesPalette2.default(cpController)
    },
        paletteFrames = [],
        hiddenFrames = [],
        parentElem = document.createElement("div"),
        that = this;

    this.palettes = palettes;

    function showPalette(palette, show) {
        var palElement = palette.getElement();

        if (show) {
            parentElem.appendChild(palElement);
        } else {
            parentElem.removeChild(palElement);
        }
        that.emitEvent("paletteVisChange", [palette.name, show]);

        // FIXME: focus hack
        // controller.canvas.grabFocus(); TODO
    }

    this.showPaletteByName = function (paletteName, show) {
        var palette = palettes[paletteName];

        if (palette) {
            showPalette(palette, show);
        }
    };

    this.togglePalettes = function () {
        if (hiddenFrames.length == 0) {
            $("> .chickenpaint-palette", parentElem).each(function () {
                that.showPaletteByName(this.getAttribute("data-paletteName"), false);
                hiddenFrames.push(this);
            });
        } else {
            for (var i = 0; i < hiddenFrames.length; i++) {
                var frame = hiddenFrames[i];

                that.showPaletteByName(frame.getAttribute("data-paletteName"), true);
            }
            hiddenFrames = [];
        }
    };

    /**
     * Pop palettes that are currently outside the visible area back into view.
     */
    this.constrainPalettes = function () {
        var windowWidth = $(parentElem).parents(".chickenpaint-main-section").width(),
            windowHeight = $(parentElem).parents(".chickenpaint-main-section").height();

        for (var i in palettes) {
            var palette = palettes[i];

            /* Move palettes that are more than half out of the frame back into it */
            if (palette.getX() + palette.getWidth() / 2 > windowWidth) {
                palette.setLocation(windowWidth - palette.getWidth(), palette.getY());
            }

            if (palette.getY() + palette.getHeight() / 2 > windowHeight) {
                palette.setLocation(palette.getX(), windowHeight - palette.getHeight());
            }
        }

        //Move small palettes to the front so that they aren't completely hidden
        //palettes.swatches.moveToFront();

        //Special handling for the swatches palette being under the brush palette:
        var widthToSpare = windowWidth - palettes.tool.getWidth() - palettes.misc.getWidth() - palettes.stroke.getWidth() - palettes.color.getWidth() - palettes.brush.getWidth() - 15 > 0;

        if (palettes.swatches.getX() + palettes.swatches.getWidth() == palettes.brush.getX() + palettes.brush.getWidth() && Math.abs(palettes.swatches.getY() - palettes.brush.getY()) < 20) {
            palettes.swatches.setLocation(palettes.brush.getX() - palettes.swatches.getWidth() - (widthToSpare ? 5 : 1), 0);
        }

        //Special handling for layers palette being too damn tall:
        if (palettes.layers.getY() + palettes.layers.getHeight() > windowHeight) {
            palettes.layers.setHeight(Math.max(windowHeight - palettes.layers.getY(), 200));
        }
    };

    /**
     * Rearrange the palettes from scratch into a useful arrangement.
     */
    this.arrangePalettes = function () {
        var windowWidth = $(parentElem).parents(".chickenpaint-main-section").width(),
            windowHeight = $(parentElem).parents(".chickenpaint-main-section").height(),
            haveWidthToSpare = windowWidth - palettes.tool.getWidth() - palettes.misc.getWidth() - palettes.stroke.getWidth() - palettes.color.getWidth() - palettes.brush.getWidth() - 15 > 0;

        palettes.brush.setLocation(windowWidth - palettes.brush.getWidth() - 15, 0);

        var bottomOfBrush = palettes.brush.getY() + palettes.brush.getHeight();

        palettes.layers.setLocation(palettes.brush.getX(), windowHeight - bottomOfBrush > 300 ? bottomOfBrush + 2 : bottomOfBrush);
        palettes.layers.setSize(palettes.brush.getWidth(), windowHeight - palettes.layers.getY());

        palettes.tool.setLocation(0, 0);

        palettes.misc.setLocation(palettes.tool.getX() + palettes.tool.getWidth() + (haveWidthToSpare ? 5 : 1), 0);

        if (haveWidthToSpare) {
            palettes.stroke.setLocation(palettes.misc.getX() + palettes.misc.getWidth() + (haveWidthToSpare ? 5 : 1), 0);
        } else {
            palettes.stroke.setLocation(palettes.misc.getX(), palettes.misc.getY() + palettes.misc.getHeight() + 1);
        }

        palettes.swatches.setLocation(palettes.brush.getX() - palettes.swatches.getWidth() - (haveWidthToSpare ? 5 : 1), 0);

        palettes.textures.setWidth(Math.min(palettes.layers.getX() - palettes.textures.getX(), 490));
        palettes.textures.setLocation(palettes.color.getX() + palettes.color.getWidth() + 4, windowHeight - palettes.textures.getHeight());

        palettes.color.setLocation(0, Math.max(palettes.tool.getY() + palettes.tool.getHeight(), windowHeight - palettes.color.getHeight()));
    };

    this.getElement = function () {
        return parentElem;
    };

    parentElem.className = "chickenpaint-palettes";

    for (var paletteName in palettes) {
        var palette = palettes[paletteName],
            palElement = palette.getElement();

        palette.on("paletteVisChange", function () {
            showPalette(this, false);
        });

        palElement.setAttribute("data-paletteName", paletteName);
        paletteFrames.push(palElement);
    }

    for (var paletteName in palettes) {
        var palElement = palettes[paletteName].getElement();

        parentElem.appendChild(palElement);
    }
}

CPPaletteManager.prototype = Object.create(EventEmitter.prototype);
CPPaletteManager.prototype.constructor = CPPaletteManager;
module.exports = exports["default"];

},{"./CPBrushPalette":18,"./CPColorPalette":21,"./CPLayersPalette":28,"./CPMiscPalette":31,"./CPStrokePalette":39,"./CPSwatchesPalette":40,"./CPTexturePalette":42,"./CPToolPalette":43}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPScrollbar;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * @param vertical boolean
 */
function CPScrollbar(vertical) {
    var bar = document.createElement("div"),
        handle = document.createElement("div"),
        handleInner = document.createElement("div"),
        min = 0,
        max = 1,
        offset = 0,
        visibleRange = 1,
        blockIncrement = 10,
        unitIncrement = 1,
        valueIsAdjusting = false,
        handleSize = 1,
        dragLastOffset,
        that = this;

    function updateBar() {
        var longDimension = vertical ? $(bar).height() : $(bar).width();

        /* As the size of the document approaches the size of the container, handle size grows to fill the 
         * whole track:
         */
        handleSize = visibleRange / (max - min) * longDimension;

        var handleOffset = (offset - min) / (max - min) * (longDimension - handleSize);

        handleInner.style[vertical ? "height" : "width"] = handleSize + "px";
        handle.style[vertical ? "height" : "width"] = handleSize + "px";

        handle.style[vertical ? "top" : "left"] = handleOffset + "px";
    }

    this.setValues = function (_offset, _visibleRange, _min, _max) {
        offset = _offset;
        visibleRange = _visibleRange;
        min = _min;
        max = _max;

        updateBar();
    };

    this.setBlockIncrement = function (increment) {
        blockIncrement = increment;
    };

    this.setUnitIncrement = function (increment) {
        unitIncrement = increment;
    };

    this.getElement = function () {
        return bar;
    };

    this.getValueIsAdjusting = function () {
        return valueIsAdjusting;
    };

    function onBarClick(e) {
        if (this == bar) {
            var clickPos = vertical ? e.pageY - $(bar).offset().top : e.pageX - $(bar).offset().left,
                barPos = parseInt(handle.style[vertical ? "top" : "left"], 10);

            if (clickPos < barPos) {
                offset -= blockIncrement;
            } else {
                offset += blockIncrement;
            }

            that.emitEvent("valueChanged", [offset]);
            updateBar();
        }
    }

    function onHandlePress(e) {
        e.stopPropagation();
        dragLastOffset = vertical ? e.pageY - $(bar).offset().top : e.pageX - $(bar).offset().left;

        $(handle).addClass("dragging");
        window.addEventListener("mouseup", onHandleRelease);
        window.addEventListener("mousemove", onHandleDrag);
    }

    function onHandleClick(e) {
        e.stopPropagation();
    }

    function onHandleDrag(e) {
        valueIsAdjusting = true;

        var longDimension = vertical ? $(bar).height() : $(bar).width(),
            mouseOffset = vertical ? e.pageY - $(bar).offset().top : e.pageX - $(bar).offset().left;

        offset = offset + (mouseOffset - dragLastOffset) * (max - min) / (longDimension - handleSize);

        offset = Math.min(Math.max(offset, min), max);

        dragLastOffset = mouseOffset;

        that.emitEvent("valueChanged", [offset]);
        updateBar();

        valueIsAdjusting = false;
    }

    function onHandleRelease(e) {
        e.stopPropagation();
        $(handle).removeClass("dragging");
        window.removeEventListener("mouseup", onHandleRelease);
        window.removeEventListener("mousemove", onHandleDrag);
    }

    bar.className = "chickenpaint-scrollbar " + (vertical ? "chickenpaint-scrollbar-vertical" : "chickenpaint-scrollbar-horizontal");
    handle.className = "chickenpaint-scrollbar-handle";
    handleInner.className = "chickenpaint-scrollbar-handle-inner";

    handle.appendChild(handleInner);
    bar.appendChild(handle);

    handle.addEventListener("mousedown", onHandlePress);
    handle.addEventListener("click", onHandleClick);

    bar.addEventListener("click", onBarClick);
}

CPScrollbar.prototype = Object.create(EventEmitter.prototype);
CPScrollbar.prototype.constructor = CPScrollbar;
module.exports = exports["default"];

},{}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPSendDialog;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPSendDialog(controller, parent, resourceSaver) {
    var dialog = $("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\">\n                \n                    <div class=\"modal-content\" data-stage=\"saving\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Saving drawing...</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p class=\"chickenpaint-saving-progress-message\">Preparing your drawing to be saved, please wait...</p>\n                            <pre class=\"chickenpaint-saving-error-message pre-scrollable\"></pre>\n                            <div class=\"progress\">\n                                <div class=\"progress-bar\" role=\"progressbar\" aria-valuenow=\"0\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width: 0%;\"></div>\n                            </div>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-default chickenpaint-send-cancel\" data-dismiss=\"modal\">Cancel</button>\n                        </div>\n                    </div>\n                    <div class=\"modal-content\" data-stage=\"success-not-previously-posted\" style=\"display:none\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Drawing saved!</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p>Your drawing has been saved, would you like to post it to the forum now?</p>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-primary chickenpaint-post-drawing\" data-dismiss=\"modal\">Yes, post it now</button>\n                            <button type=\"button\" class=\"btn btn-default chickenpaint-continue-drawing\" data-dismiss=\"modal\">No, keep drawing</button>\n                            <button type=\"button\" class=\"btn btn-default chickenpaint-exit\" data-dismiss=\"modal\">No, quit and I'll finish it later</button>\n                        </div>\n                    </div>\n                    <div class=\"modal-content\" data-stage=\"success-already-posted\" style=\"display:none\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Drawing saved!</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p>Your drawing has been saved, would you like to view it on the forum now?</p>\n                        </div>\n                        <div class=\"modal-footer\">\n                            <button type=\"button\" class=\"btn btn-primary chickenpaint-post-drawing\" data-dismiss=\"modal\">Yes, view the post</button>\n                            <button type=\"button\" class=\"btn btn-default chickenpaint-continue-drawing\" data-dismiss=\"modal\">No, keep drawing</button>\n                        </div>\n                    </div>\n                    <div class=\"modal-content\" data-stage=\"success-redirect\" style=\"display:none\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Drawing saved!</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p>Your drawing has been saved, redirecting you to view your new post now...</p>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "),
        progressMessageElem = $(".chickenpaint-saving-progress-message", dialog),
        progressError = $(".chickenpaint-saving-error-message", dialog),
        progressElem = $(".progress-bar", dialog),
        that = this;

    resourceSaver.on("savingProgress", function (progress, message) {
        progress *= 100;

        progressMessageElem.text(message);

        $(progressElem).attr("aria-valuenow", progress).css("width", progress + "%");
    });

    resourceSaver.on("savingComplete", function () {
        $(".modal-content[data-stage='saving']", dialog).hide();

        if (controller.isActionSupported("CPContinue")) {
            if (controller.isActionSupported("CPExit")) {
                $(".modal-content[data-stage='success-not-previously-posted']", dialog).show();
            } else {
                $(".modal-content[data-stage='success-already-posted']", dialog).show();
            }
        } else {
            $(".modal-content[data-stage='success-redirect']", dialog).show();
        }
    });

    resourceSaver.on("savingFailure", function (serverMessage) {
        progressElem.addClass("progress-bar-danger");

        var errorMessage = "Sorry, your drawing could not be saved, please try again later.";

        if (serverMessage) {
            serverMessage = serverMessage.replace(/^CHIBIERROR\s*/, "");

            if (serverMessage.length > 0) {
                errorMessage += "<br><br>The error returned from the server was:";

                progressError.text(serverMessage).show();
            }

            progressMessageElem.html(errorMessage);
        }
    });

    $(".chickenpaint-post-drawing", dialog).click(function () {
        controller.actionPerformed({ action: "CPPost" });
    });

    $(".chickenpaint-exit", dialog).toggle(controller.isActionSupported("CPExit")).click(function () {
        alert("When you want to come back and finish your drawing, just click the 'new drawing' button again and " + "you can choose to continue this drawing.");
        controller.actionPerformed({ action: "CPExit" });
    });

    $(".chickenpaint-send-cancel", dialog).click(function () {
        resourceSaver.cancel();
    });

    // Destroy the modal upon close
    dialog.on("hidden.bs.modal", function (e) {
        dialog.remove();
    });

    dialog.modal({
        show: false
    });

    dialog.on('shown.bs.modal', function () {
        that.emitEvent("shown");
    });

    // Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
    dialog.data("bs.modal").$body = $(parent);

    parent.appendChild(dialog[0]);

    this.show = function () {
        dialog.modal("show");
    };
}

CPSendDialog.prototype = Object.create(EventEmitter.prototype);
CPSendDialog.prototype.contructor = CPSendDialog;
module.exports = exports["default"];

},{}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPShortcutsDialog;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPShortcutsDialog(parent) {
    var dialog = $("<div class=\"modal fade chickenpaint-shortcuts-dialog\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog modal-lg\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Shortcuts</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p>\n                                Many of the menu options and painting tools have keyboard shortcuts which are\n                                written next to them or appear when you hover.\n                            </p>\n                            <p>\n                                Here are some other shortcuts which are not as obvious!\n                            </p>\n                            <div class=\"chickenpaint-shortcuts-sections\">\n                                <div class=\"chickenpaint-shortcuts-section\">\n                                    <h5>Color swatches palette</h5>\n                                    <ul class=\"chickenpaint-shortcuts-list list-unstyled\">\n                                        <li>\n                                            <dl>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"fa fa-mouse-pointer\"></span> Left</span>\n                                                </dt>\n                                                <dd>\n                                                    Use as the drawing color\n                                                </dd>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"fa fa-mouse-pointer\"></span> Right</span>\n                                                </dt>\n                                                <dd>\n                                                    Remove or replace a color swatch\n                                                </dd>\n                                             </dl>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"chickenpaint-shortcuts-section\">\n                                    <h5>Line drawing mode</h5>\n                                    <ul class=\"chickenpaint-shortcuts-list list-unstyled\">\n                                        <li>\n                                            <dl>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">Shift</span> + <span class=\"fa fa-mouse-pointer\"></span> Left</span>\n                                                </dt>\n                                                <dd>\n                                                    Snap line to nearest 45 degrees\n                                                </dd>\n                                             </dl>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"chickenpaint-shortcuts-section\">\n                                    <h5>Painting tools</h5>\n                                    <ul class=\"chickenpaint-shortcuts-list list-unstyled\">\n                                        <li>\n                                            <dl>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">1</span> - <span class=\"chickenpaint-shortcut-key\">9</span> , <span class=\"chickenpaint-shortcut-key\">0</span></span>\n                                                </dt>\n                                                <dd>\n                                                    Change brush opacity\n                                                </dd>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">[</span> , <span class=\"chickenpaint-shortcut-key\">]</span></span>\n                                                </dt>\n                                                <dd>\n                                                    Change brush size\n                                                </dd>\n                                            </dl>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"chickenpaint-shortcuts-section\">\n                                    <h5>Brush palette</h5>\n                                    <ul class=\"chickenpaint-shortcuts-list list-unstyled\">\n                                        <li>\n                                            <dl>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"fa fa-mouse-pointer\"></span> Right drag</span>\n                                                </dt>\n                                                <dd>\n                                                    Adjust brush sliders more precisely\n                                                </dd>\n                                            </dl>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"chickenpaint-shortcuts-section\">\n                                    <h5>Drawing canvas</h5>\n                                    <ul class=\"chickenpaint-shortcuts-list list-unstyled\">\n                                        <li>\n                                            <dl>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"fa fa-mouse-pointer\"></span> Middle</span> <span class=\"chickenpaint-shortcut-alternate\">or</span> <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">Space</span> + <span class=\"fa fa-mouse-pointer\"></span> Left</span>\n                                                </dt>\n                                                <dd>\n                                                    Move the canvas around\n                                                </dd>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">Alt</span> + <span class=\"fa fa-mouse-pointer\"></span> Middle</span> <span class=\"chickenpaint-shortcut-alternate\">or</span> <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">Alt</span> + <span class=\"chickenpaint-shortcut-key\">Space</span> + <span class=\"fa fa-mouse-pointer\"></span> Left</span>\n                                                </dt>\n                                                <dd>\n                                                    Rotate the canvas\n                                                </dd>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"fa fa-mouse-pointer\"></span> Right</span> <span class=\"chickenpaint-shortcut-alternate\">or</span> <span class=\"chickenpaint-shortcut\"><span class=\"chickenpaint-shortcut-key\">Alt</span> + <span class=\"fa fa-mouse-pointer\"></span> Left</span>\n                                                </dt>\n                                                <dd>\n                                                    Sample the color under the cursor\n                                                </dd>\n                                             </dl>\n                                        </li>\n                                    </ul>\n                                </div>\n                                <div class=\"chickenpaint-shortcuts-section\">\n                                    <h5>Layers palette</h5>\n                                    <ul class=\"chickenpaint-shortcuts-list list-unstyled\">\n                                        <li>\n                                            <dl>\n                                                <dt>\n                                                    <span class=\"chickenpaint-shortcut\"><span class=\"fa fa-mouse-pointer\"></span> Double click</span>\n                                                </dt>\n                                                <dd>\n                                                    Rename layer\n                                                </dd>\n                                             </dl>\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            ");

    // Destroy the modal upon close
    dialog.on("hidden.bs.modal", function (e) {
        dialog.remove();
    });

    dialog.modal({
        show: false
    });

    // Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
    dialog.data("bs.modal").$body = $(parent);

    parent.appendChild(dialog[0]);

    this.show = function () {
        dialog.modal("show");
    };
}
module.exports = exports["default"];

},{}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPSlider;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * A simple slider control.
 */
function CPSlider(minValue, maxValue, centerMode, expMode) {
    var PRECISE_DRAG_SCALE = 4,
        EXP_MODE_FACTOR = 1.5;

    var canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),
        valueRange = maxValue - minValue,
        dragNormal = false,
        dragPrecise = false,
        dragPreciseX,
        doneInitialPaint = false,
        that = this;

    this.value = undefined;

    /**
     * Either a string to draw on the slider, or a function(value) which receives the current value of the slider and
     * should return the string to be painted to the slider.
     *
     * @name CPSlider#title
     * @default ""
     */
    this.title = "";

    centerMode = centerMode || false;

    function paint() {
        var width = canvas.width,
            height = canvas.height,
            title = typeof that.title === "string" ? that.title : that.title(that.value),
            textX = 2 * window.devicePixelRatio,
            textY = canvas.height * 0.75;

        if (centerMode) {
            canvasContext.save();

            canvasContext.fillStyle = 'white';

            canvasContext.fillRect(0, 0, width, height);

            canvasContext.fillStyle = 'black';

            canvasContext.fillText(title, textX, textY);
            canvasContext.beginPath();

            if (that.value >= valueRange / 2) {
                canvasContext.rect(width / 2, 0, (that.value - valueRange / 2) * width / valueRange, height);
            } else {
                canvasContext.rect(that.value * width / valueRange, 0, (valueRange / 2 - that.value) * width / valueRange, height);
            }

            canvasContext.fill();
            canvasContext.clip();

            canvasContext.fillStyle = 'white';
            canvasContext.fillText(title, textX, textY);

            canvasContext.restore();
        } else {
            var barProp = (that.value - minValue) / valueRange,
                barWidth;

            if (expMode) {
                barProp = Math.pow(barProp, 1 / EXP_MODE_FACTOR);
            }

            barWidth = barProp * width;

            canvasContext.save();
            canvasContext.save();

            canvasContext.fillStyle = 'black';

            canvasContext.beginPath();
            canvasContext.rect(0, 0, barWidth, height);
            canvasContext.fill();

            canvasContext.clip();

            canvasContext.fillStyle = 'white';
            canvasContext.fillText(title, textX, textY);

            // Remove the clip region
            canvasContext.restore();

            canvasContext.fillStyle = 'white';

            canvasContext.beginPath();
            canvasContext.rect(barWidth, 0, width, height);
            canvasContext.fill();

            canvasContext.clip();

            canvasContext.fillStyle = 'black';
            canvasContext.fillText(title, textX, textY);

            canvasContext.restore();
        }
    }

    function mouseSelect(e) {
        var width = $(canvas).width(),
            left = $(canvas).offset().left,
            proportion = (e.pageX - left) / width;

        if (expMode) {
            // Give the user finer control over the low values
            proportion = Math.pow(Math.max(proportion, 0.0), EXP_MODE_FACTOR);
        }

        that.setValue(proportion * valueRange + minValue);
    }

    function mouseDragged(e) {
        if (dragNormal) {
            mouseSelect(e);
        } else if (dragPrecise) {
            var diff = (e.pageX - dragPreciseX) / PRECISE_DRAG_SCALE;

            if (diff != 0) {
                var unrounded = that.value + diff,
                    rounded = unrounded | 0;

                that.setValue(rounded);

                /* Tweak the "old mouseX" position such that the fractional part of the value we were unable to set
                 * will be accumulated
                 */
                dragPreciseX = e.pageX - (unrounded - rounded) * PRECISE_DRAG_SCALE;
            }
        }
    }

    function mouseUp(e) {
        if (dragNormal && e.button == 0) {
            dragNormal = false;
        } else if (dragPrecise && e.button == 2) {
            dragPrecise = false;
        } else {
            return;
        }

        canvas.releasePointerCapture(e.pointerId);
        canvas.removeEventListener("pointerup", mouseUp);
        canvas.removeEventListener("pointermove", mouseDragged);
    }

    this.setValue = function (_value) {
        _value = ~~Math.max(minValue, Math.min(maxValue, _value));

        if (this.value != _value) {
            this.value = _value;

            // The event listeners might like to update our title property at this point to reflect the new value
            this.emitEvent('valueChange', [this.value]);

            if (doneInitialPaint) {
                paint();
            } else {
                // We don't bother to do our canvas dimensioning until we're supplied with an initial value
                doneInitialPaint = true;
                this.resize();
            }
        }
    };

    /**
     * Get the DOM element for the slider component.
     */
    this.getElement = function () {
        return canvas;
    };

    this.resize = function () {
        canvas.width = $(canvas).width() || 150;
        canvas.height = $(canvas).height() || 20;

        if (window.devicePixelRatio > 1) {
            // Assume our width is set to 100% or similar, so we only need to the fix the height
            canvas.style.height = canvas.height + 'px';

            canvas.width = canvas.width * window.devicePixelRatio;
            canvas.height = canvas.height * window.devicePixelRatio;
        }

        canvasContext.font = canvas.height * 0.47 + 'pt sans-serif';

        paint();
    };

    canvas.addEventListener("pointerdown", function (e) {
        var dragging = dragNormal || dragPrecise;

        if (!dragging) {
            canvas.setPointerCapture(e.pointerId);

            switch (e.button) {
                case 0:
                    // Left
                    dragNormal = true;
                    mouseSelect(e);
                    break;
                case 2:
                    // Right
                    dragPrecise = true;
                    dragPreciseX = e.pageX;
                    break;
                default:
                    return;
            }

            canvas.addEventListener("pointerup", mouseUp);
            canvas.addEventListener("pointermove", mouseDragged);
        }
    });

    canvas.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    });

    canvas.setAttribute("touch-action", "none");

    canvas.className = 'chickenpaint-slider';

    if (!window.devicePixelRatio) {
        // Old browsers
        window.devicePixelRatio = 1.0;
    }
}

CPSlider.prototype = Object.create(EventEmitter.prototype);
CPSlider.prototype.constructor = CPSlider;
module.exports = exports["default"];

},{}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPSplashScreen;
function CPSplashScreen(uiParent, loader, resourcesRoot) {
    var MAX_SMOOTHIE_OFFSET = 170;

    var canvas = document.createElement("canvas"),
        canvasContext = canvas.getContext("2d"),
        cup = new Image(),
        lid = new Image(),
        outlines = new Image(),
        text = new Image(),
        shading = new Image(),
        highlights = new Image(),
        smoothie = new Image(),
        images = [cup, lid, outlines, text, shading, highlights, smoothie],
        loadedCount = 0,
        cupComposite,
        smoothieComposite,
        cupCompositeContext,
        smoothieCompositeContext,
        progress = 0.0,
        message = "",
        fontHeight = 14;

    var imageRoot = resourcesRoot + "splash/";

    for (var i = 0; i < images.length; i++) {
        images[i].onload = function () {
            loadedCount++;

            if (loadedCount == images.length) {
                repaint();
            }
        };
    }

    cup.src = imageRoot + "cup.png";
    highlights.src = imageRoot + "highlights.png";
    lid.src = imageRoot + "lid.png";
    outlines.src = imageRoot + "lines.png";
    shading.src = imageRoot + "shading.png";
    smoothie.src = imageRoot + "smoothie.png";
    text.src = imageRoot + "text.png";

    function buildSmoothieComposite(imgWidth, imgHeight, progress) {
        if (!smoothieComposite) {
            smoothieComposite = document.createElement("canvas");

            smoothieComposite.width = imgWidth;
            smoothieComposite.height = imgHeight;

            smoothieCompositeContext = smoothieComposite.getContext("2d");
        }

        // First draw the smoothie in its mask position:
        smoothieCompositeContext.globalCompositeOperation = "copy";
        smoothieCompositeContext.drawImage(smoothie, 0, 0);

        // Now shift the smoothie downwards and use the original position as a mask
        smoothieCompositeContext.globalCompositeOperation = "source-in";
        smoothieCompositeContext.drawImage(smoothie, 0, Math.round(progress * MAX_SMOOTHIE_OFFSET));
    }

    function buildCupComposite(imgWidth, imgHeight, progress) {
        if (!cupComposite) {
            cupComposite = document.createElement("canvas");

            cupComposite.width = imgWidth;
            cupComposite.height = imgHeight;

            cupCompositeContext = cupComposite.getContext("2d");
        }

        cupCompositeContext.globalCompositeOperation = "copy";
        cupCompositeContext.drawImage(cup, 0, 0);

        buildSmoothieComposite(imgWidth, imgHeight, progress);

        cupCompositeContext.globalCompositeOperation = "source-over";
        cupCompositeContext.drawImage(smoothieComposite, 0, 0);

        cupCompositeContext.drawImage(lid, 0, 0);

        cupCompositeContext.globalCompositeOperation = "screen";
        cupCompositeContext.drawImage(highlights, 0, 0);

        cupCompositeContext.globalCompositeOperation = "multiply";
        cupCompositeContext.drawImage(shading, 0, 0);

        return cupComposite;
    }

    function repaint() {
        var centerX = canvas.width / 2,
            centerY = canvas.height / 2;

        canvasContext.fillStyle = 'white';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);

        if (loadedCount == images.length) {
            var imgWidth = text.width,
                imgHeight = text.height,
                left = Math.round(centerX - imgWidth / 2),
                top = Math.round(centerY - imgHeight / 2);

            canvasContext.drawImage(text, left, top);

            buildCupComposite(imgWidth, imgHeight, progress);

            //The whole cup composite is slightly transparent
            canvasContext.globalAlpha = 0.88;
            canvasContext.drawImage(cupComposite, left, top);

            canvasContext.globalAlpha = 1.0;

            canvasContext.drawImage(outlines, left, top);

            centerY = Math.round(centerY + imgHeight / 2 + 2);
        }

        if (message != "") {
            canvasContext.fillStyle = "black";

            var lines = message.split("\n");

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i],
                    lineWidth = canvasContext.measureText(line).width;

                centerY += fontHeight * 2;

                canvasContext.fillText(line, centerX - lineWidth / 2, centerY);
            }
        }
    }

    function resize() {
        // Use the canvas dimensions set by the CSS styles
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        canvasContext.font = fontHeight + "pt sans-serif";

        repaint();
    }

    loader.on("loadingProgress", function (_progress, _message) {
        progress = _progress;
        message = _message;

        repaint();
    });

    loader.on("loadingFailure", function (_message) {
        progress = 0;
        message = _message;

        repaint();
    });

    loader.on("loadingComplete", function () {
        window.removeEventListener("resize", resize);
        uiParent.removeChild(canvas);
    });

    window.addEventListener("resize", resize);

    canvas.className = "chickenpaint-splash-screen";

    uiParent.appendChild(canvas);

    resize();
}
module.exports = exports["default"];

},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPStrokePalette;

var _CPPalette = require('./CPPalette');

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _CPBrushInfo = require('../engine/CPBrushInfo');

var _CPBrushInfo2 = _interopRequireDefault(_CPBrushInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPStrokePalette(cpController) {
    _CPPalette2.default.call(this, cpController, "stroke", "Stroke");

    var that = this,
        buttons = [{
        className: "chickenpaint-tool-freehand",
        command: "CPFreeHand",
        toolTip: "Free-hand",
        selected: true
    }, {
        className: "chickenpaint-tool-line",
        command: "CPLine",
        toolTip: "Straight line"
    }, {
        className: "chickenpaint-tool-bezier",
        command: "CPBezier",
        toolTip: "Bezier curve"
    }],
        body = that.getBodyElement();

    function buildButtons() {
        var listElem = document.createElement("ul");

        listElem.className = "chickenpaint-stroke-tools list-unstyled";

        for (var i in buttons) {
            var button = buttons[i],
                buttonElem = document.createElement("li");

            buttonElem.className = "chickenpaint-toolbar-button " + button.className;
            buttonElem.setAttribute("data-buttonIndex", i);

            if (button.selected) {
                buttonElem.className = buttonElem.className + " selected";
            }

            listElem.appendChild(buttonElem);
        }

        listElem.addEventListener("click", function (e) {
            if (e.target && e.target.nodeName == "LI") {
                var button = buttons[parseInt(e.target.getAttribute("data-buttonIndex"), 10)];

                $("li", listElem).removeClass("selected");
                $(e.target).addClass("selected");

                cpController.actionPerformed({ action: button.command });
            }
        });

        body.appendChild(listElem);
    }

    buildButtons();

    cpController.on("toolChange", function (tool, toolInfo) {
        $(".chickenpaint-tool-freehand", body).toggleClass("selected", toolInfo.strokeMode == _CPBrushInfo2.default.SM_FREEHAND);
        $(".chickenpaint-tool-line", body).toggleClass("selected", toolInfo.strokeMode == _CPBrushInfo2.default.SM_LINE);
        $(".chickenpaint-tool-bezier", body).toggleClass("selected", toolInfo.strokeMode == _CPBrushInfo2.default.SM_BEZIER);
    });
}

CPStrokePalette.prototype = Object.create(_CPPalette2.default.prototype);
CPStrokePalette.prototype.constructor = CPStrokePalette;
module.exports = exports['default'];

},{"../engine/CPBrushInfo":5,"./CPPalette":32}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPSwatchesPalette;

var _CPPalette = require('./CPPalette');

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _CPColor = require('../util/CPColor');

var _CPColor2 = _interopRequireDefault(_CPColor);

var _AdobeColorTable = require('../util/AdobeColorTable');

var _AdobeColorTable2 = _interopRequireDefault(_AdobeColorTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function padLeft(string, padding, len) {
    while (string.length < len) {
        string = padding + string;
    }
    return string;
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

function wrapWithElem(e, wrapWithName) {
    var parent = document.createElement(wrapWithName);

    parent.appendChild(e);

    return parent;
}

function fileAPIsSupported() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

function CPSwatchesPalette(controller) {
    _CPPalette2.default.call(this, controller, "swatches", "Color swatches");

    var INIT_COLORS = [0xffffff, 0x000000, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00],
        modified = false,
        swatchPanel = document.createElement("ul"),
        buttonPanel = document.createElement("div"),
        fileInput,
        that = this;

    function CPColorSwatch(color) {
        var wrapper = document.createElement("div"),
            swatchElem = document.createElement("a"),
            swatchMenu = document.createElement("ul"),
            mnuRemove = document.createElement("a"),
            mnuSetToCurrent = document.createElement("a"),
            that = this;

        this.getElement = function () {
            return wrapper;
        };

        this.setColor = function (color) {
            swatchElem.setAttribute("data-color", color);
            swatchElem.style.backgroundColor = '#' + padLeft("" + Number(color).toString(16), "0", 6);
        };

        this.setColor(color);

        swatchElem.href = "#";
        swatchElem.className = "chickenpaint-color-swatch dropdown-toggle";
        swatchElem.setAttribute("data-toggle", "dropdown");

        mnuRemove.href = "#";
        mnuRemove.innerHTML = "Remove";

        mnuRemove.addEventListener("click", function (e) {
            e.preventDefault();
            $(wrapper).remove();

            modified = true;
        });

        mnuSetToCurrent.href = "#";
        mnuSetToCurrent.innerHTML = "Replace with current color";

        mnuSetToCurrent.addEventListener("click", function (e) {
            e.preventDefault();

            that.setColor(controller.getCurColor().getRgb());

            modified = true;
        });

        swatchMenu.className = "dropdown-menu";

        swatchMenu.appendChild(wrapWithElem(mnuRemove, "li"));
        swatchMenu.appendChild(wrapWithElem(mnuSetToCurrent, "li"));

        wrapper.className = "chickenpaint-color-swatch-wrapper";
        wrapper.appendChild(swatchElem);
        wrapper.appendChild(swatchMenu);

        $(wrapper).on("show.bs.dropdown", function () {
            var $btnDropDown = $(this).find(".dropdown-toggle"),
                $listHolder = $(this).find(".dropdown-menu");

            $listHolder.css({
                "top": $btnDropDown.position().top + $btnDropDown.outerHeight(true) + "px",
                "left": $btnDropDown.position().left + "px"
            });
        });
    }

    function clearSwatches() {
        while (swatchPanel.lastChild) {
            swatchPanel.removeChild(swatchPanel.lastChild);
        }
    }

    function addSwatch(color) {
        var swatch = new CPColorSwatch(color);

        swatchPanel.appendChild(swatch.getElement());
    }

    /**
     * Returns an array of colors in RGB 32-bit integer format
     */
    this.getSwatches = function () {
        var swatches = $(".chickenpaint-color-swatch", swatchPanel),
            colors = new Array(swatches.length);

        for (var i = 0; i < swatches.length; i++) {
            colors[i] = parseInt(swatches.get(i).getAttribute("data-color"), 10);
        }

        return colors;
    };

    this.setSwatches = function (swatches) {
        clearSwatches();

        for (var i = 0; i < swatches.length; i++) {
            addSwatch(swatches[i]);
        }

        modified = true;
    };

    this.isModified = function () {
        return modified;
    };

    function loadSwatches() {
        fileInput.onchange = function () {
            var fileList = this.files;

            if (fileList.length < 1) return;

            var file = fileList[0],
                reader = new FileReader();

            reader.onload = function () {
                var swatches = new _AdobeColorTable2.default().read(this.result);

                if (swatches != null && swatches.length > 0) {
                    that.setSwatches(swatches);
                } else {
                    alert("The swatches could not be read, did you select an .aco file?");
                }
            };

            reader.readAsArrayBuffer(file);
        };

        fileInput.click();
    }

    function saveSwatches() {
        var aco = new _AdobeColorTable2.default().write(that.getSwatches()),
            blob = new Blob([aco], { type: "application/octet-stream" });

        window.saveAs(blob, "oekakiswatches.aco");
    }

    function initSwatchPanel() {
        swatchPanel.className = "chickenpaint-color-swatches list-unstyled";

        for (var i = 0; i < INIT_COLORS.length; i++) {
            swatchPanel.appendChild(new CPColorSwatch(INIT_COLORS[i]).getElement());
        }

        swatchPanel.addEventListener("click", function (e) {
            var swatch = e.target;

            if (!/chickenpaint-color-swatch/.test(swatch.className)) {
                return;
            }

            if (e.button == 0 /* Left */ && swatch.getAttribute("data-color") !== undefined) {
                controller.setCurColor(new _CPColor2.default(parseInt(swatch.getAttribute("data-color"), 10)));
                e.stopPropagation();
                e.preventDefault();
            }
        });

        swatchPanel.addEventListener("contextmenu", function (e) {
            var swatch = e.target;

            if (!/chickenpaint-color-swatch/.test(swatch.className)) {
                return;
            }

            e.preventDefault();

            $(swatch).dropdown("toggle").off("click.bs.dropdown"); // Remove Bootstrap's left-click handler installed by toggle
        });
    }

    function initButtonsPanel() {
        var btnSettings = document.createElement("div"),
            btnAdd = document.createElement("div"),
            settingsMenu = document.createElement("ul"),
            mnuSave = document.createElement("a"),
            mnuLoad = document.createElement("a");

        btnAdd.title = "Add the current brush color as a new swatch";
        btnAdd.className = "chickenpaint-small-toolbar-button chickenpaint-color-swatch-add";

        btnSettings.className = "chickenpaint-small-toolbar-button chickenpaint-color-swatch-settings";
        btnSettings.setAttribute("data-toggle", "dropdown");
        $(btnSettings).dropdown();

        mnuSave.href = "#";
        mnuSave.innerHTML = "Save swatches to your computer...";
        mnuSave.addEventListener("click", function (e) {
            e.preventDefault();

            saveSwatches();
        });

        mnuLoad.href = "#";
        mnuLoad.innerHTML = "Load swatches from your computer...";
        mnuLoad.addEventListener("click", function (e) {
            e.preventDefault();

            loadSwatches();
        });

        settingsMenu.className = "dropdown-menu dropdown-menu-right";

        settingsMenu.appendChild(wrapWithElem(mnuSave, "li"));
        settingsMenu.appendChild(wrapWithElem(mnuLoad, "li"));

        var btnSettingsContainer = document.createElement("div");

        btnSettingsContainer.className = 'dropdown';
        btnSettingsContainer.appendChild(btnSettings);
        btnSettingsContainer.appendChild(settingsMenu);

        $(btnSettingsContainer).on("show.bs.dropdown", function () {
            /* Instead of Bootstrap's extremely expensive data API, we'll only listen for dismiss clicks on the
             * document *while the menu is open!*
             */
            $(document).one("click", function () {
                if ($(btnSettingsContainer).hasClass("open")) {
                    $(btnSettings).dropdown("toggle");
                }
            });
        });

        btnAdd.addEventListener("click", function (e) {
            addSwatch(controller.getCurColor().getRgb());
            modified = true;
        });

        buttonPanel.className = 'chickenpaint-color-swatches-buttons';

        // Don't offer to load/save swatches if we don't have the file API needed for reading them
        if (fileAPIsSupported()) {
            fileInput = document.createElement("input");

            fileInput.type = "file";
            fileInput.multiple = false;
            fileInput.style.display = "none";

            buttonPanel.appendChild(btnSettingsContainer);
            buttonPanel.appendChild(fileInput);
        }

        buttonPanel.appendChild(btnAdd);
    }

    initSwatchPanel();
    this.getBodyElement().appendChild(swatchPanel);

    initButtonsPanel();
    this.getBodyElement().appendChild(buttonPanel);
}

CPSwatchesPalette.prototype = Object.create(_CPPalette2.default.prototype);
CPSwatchesPalette.prototype.constructor = CPSwatchesPalette;
module.exports = exports['default'];

},{"../util/AdobeColorTable":44,"../util/CPColor":47,"./CPPalette":32}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPTabletDialog;

var _CPWacomTablet = require("../util/CPWacomTablet");

var _CPWacomTablet2 = _interopRequireDefault(_CPWacomTablet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPTabletDialog(parent) {
    var dialog = $("<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n                <div class=\"modal-dialog\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-header\">\n                            <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                <span aria-hidden=\"true\">&times;</span>\n                            </button>\n                            <h4 class=\"modal-title\">Drawing tablet support</h4>\n                        </div>\n                        <div class=\"modal-body\">\n                            <p class=\"chickenpaint-tablet-there-are-two-options\">\n                                There are two ways you could use your tablet's pen pressure support with ChickenPaint.\n                            </p>\n                            <div class=\"chickenpaint-tablet-support chickenpaint-wacom-support\">\n                                <h4>\n                                    Plugin for Wacom tablets\n                                </h4>\n                                <div class=\"chickenpaint-supported-browsers\">\n                                    <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-internet-explorer\"></span>\n                                        IE 10, 11\n                                    </div>\n                                    <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-firefox\"></span>\n                                        Firefox (32-bit only)\n                                    </div>\n                                    <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-safari\"></span>\n                                        Safari\n                                    </div>\n                                        <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-opera\"></span>\n                                        Opera\n                                    </div>\n                                </div>\n                                <p class=\"chickenpaint-not-installed\">\n                                    The plugin for Wacom tablets doesn't seem to be installed in your browser yet.\n                                </p>\n                                <p class=\"chickenpaint-not-installed\">\n                                    Please make sure that you've installed the latest drivers for your tablet from the \n                                    <a href=\"http://www.wacom.com/en-us/support/product-support/drivers\" target=\"_blank\">Wacom drivers page</a>,\n                                    then restart your browser.\n                                </p>\n                                <p class=\"chickenpaint-not-supported\">\n                                    Your browser doesn't support the Wacom tablet plugin, please \n                                    try one of the browsers listed above instead.\n                                </p>\n                                <p class=\"chickenpaint-supported alert alert-success\">\n                                    The Wacom tablet plugin is installed and working.\n                                </p>\n                            </div>\n                            <div class=\"chickenpaint-tablet-support chickenpaint-pointerevents-support\">\n                                <h4>\n                                    Built-in support for most tablets <small>including Wacom tablets</small>\n                                </h4>\n                                <div class=\"chickenpaint-supported-browsers\">\n                                    <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-internet-explorer\"></span>\n                                        IE (Windows 8)\n                                    </div>\n                                        <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-edge\"></span>\n                                        Edge (Windows 10)\n                                    </div>\n                                    <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-firefox\"></span>\n                                        Firefox (<a href=\"https://github.com/thenickdude/chickenpaint/blob/master/help/Firefox pressure support.md\" target=\"_blank\">experimental <i class=\"glyphicon glyphicon-new-window\"></i></a>)\n                                    </div>\n                                    <div class=\"chickenpaint-supported-browser\">\n                                        <span class=\"fa fa-chrome\"></span>\n                                        Chrome\n                                    </div>\n                                </div>\n                                <p class=\"chickenpaint-not-supported\">\n                                    Your browser doesn't have built-in support for drawing tablets, please try\n                                    one of the other browsers listed above.\n                                </p>\n                                <p class=\"chickenpaint-supported alert alert-success\">\n                                    Your browser has built-in support for drawing tablets!\n                                </p>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n       ");

    var wacomSupportElem = $(".chickenpaint-wacom-support", dialog),
        peSupportElem = $(".chickenpaint-pointerevents-support", dialog),
        bothOptionsElem = $(".chickenpaint-tablet-there-are-two-options", dialog),
        wacomPresent = _CPWacomTablet2.default.getRef().isTabletPresent(),
        peSupported = !!window.hasNativePointerEvents;

    wacomSupportElem.toggleClass("supported", wacomPresent);

    if (wacomPresent) {
        // Don't bother displaying info about Pointer Events if we have the Wacom plugin installed
        peSupportElem.hide();
        bothOptionsElem.hide();
    } else {
        // Chrome has dropped NPAPI support, so the Wacom plugin cannot be installed
        if (/Chrome/i.test(navigator.userAgent) && !/OPR/.test(navigator.userAgent) || /iPad/.test(navigator.userAgent) || /iPhone/.test(navigator.userAgent)) {
            wacomSupportElem.addClass("not-supported");
        }

        // Don't bother showing the Wacom plugin details if this browser supports pointer events
        if (peSupported) {
            wacomSupportElem.hide();
            bothOptionsElem.hide();
        }
    }

    peSupportElem.toggleClass("supported", peSupported);
    peSupportElem.toggleClass("not-supported", !peSupported);

    dialog.modal({
        show: false
    });

    // Fix the backdrop location in the DOM by reparenting it to the chickenpaint container
    dialog.data("bs.modal").$body = $(parent);

    parent.appendChild(dialog[0]);

    this.show = function () {
        dialog.modal("show");
    };
} /*
      ChickenPaint
      
      ChickenPaint is a translation of ChibiPaint from Java to JavaScript
      by Nicholas Sherlock / Chicken Smoothie.
      
      ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
      ChickenPaint is free software: you can redistribute it and/or modify
      it under the terms of the GNU General Public License as published by
      the Free Software Foundation, either version 3 of the License, or
      (at your option) any later version.
  
      ChickenPaint is distributed in the hope that it will be useful,
      but WITHOUT ANY WARRANTY; without even the implied warranty of
      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
      GNU General Public License for more details.
  
      You should have received a copy of the GNU General Public License
      along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

module.exports = exports["default"];

},{"../util/CPWacomTablet":55}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPTexturePalette;

var _CPGreyBmp = require('../engine/CPGreyBmp');

var _CPGreyBmp2 = _interopRequireDefault(_CPGreyBmp);

var _CPLookUpTable = require('../engine/CPLookUpTable');

var _CPLookUpTable2 = _interopRequireDefault(_CPLookUpTable);

var _CPPalette = require('./CPPalette');

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _CPSlider = require('./CPSlider');

var _CPSlider2 = _interopRequireDefault(_CPSlider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function wrapCheckboxWithLabel(checkbox, title) {
    var div = document.createElement("div"),
        label = document.createElement("label");

    div.className = "checkbox";

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(title));

    div.appendChild(label);

    return div;
}

function loadTextures(textureFilename, width, height, textureCount, then) {
    var img = new Image(),
        textures = [];

    img.onload = function () {
        var canvas = document.createElement("canvas"),
            canvasContext = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        for (var i = 0; i < textureCount; i++) {
            canvasContext.drawImage(img, 0, i * height, width, height, 0, 0, width, height);

            try {
                var imageData = canvasContext.getImageData(0, 0, width, height),
                    texture = new _CPGreyBmp2.default(width, height);

                // Take just the red channel from the image to form the new grayscale texture
                for (var j = 0; j < width * height; j++) {
                    texture.data[j] = imageData.data[j * 4];
                }

                textures.push(texture);
            } catch (e) {
                // Quietly ignore errors that occur while loading the image (e.g. cross-origin security failures)
                console.log(e);
            }
        }

        then(textures);
    };

    img.src = textureFilename;
}

function CPTexturePalette(controller) {
    _CPPalette2.default.call(this, controller, "textures", "Textures");

    var TEXTURE_PREVIEW_SIZE = 64,
        TEXTURE_SWATCH_BUTTON_SIZE = 32,
        textures = [],
        // Array of CPGreyBmp
    selectedTexture,
        processedTexture,
        //Both CPGreyBmp

    mirror = false,
        inverse = false,
        brightness = 0.0,
        contrast = 0.0,
        optionsPanel,
        texturesPanel = document.createElement("div"),
        body = this.getBodyElement();

    /**
     * Add an array of textures to the global texture list, and add swatches for them to the UI.
     */
    function addTextures(newTextures) {
        for (var i = 0; i < newTextures.length; i++) {
            var texture = newTextures[i];

            textures.push(texture);

            var button = new CPTextureSwatch(texture, TEXTURE_SWATCH_BUTTON_SIZE, TEXTURE_SWATCH_BUTTON_SIZE);

            button.on("click", function () {
                selectedTexture = this.texture;
                updateSelectedTexture();
            });

            texturesPanel.appendChild(button.getElement());
        }
    }

    /**
     * Generate and return an array of procedurally-generated textures
     * 
     * @returns CPGreyBmp[]
     */
    function makeProceduralTextures() {
        var result = [null];

        var texture = new _CPGreyBmp2.default(2, 2);
        texture.data[0] = 0xFF;
        texture.data[3] = 0xFF;
        result.push(texture);

        result.push(makeDotTexture(2));
        result.push(makeDotTexture(3));
        result.push(makeDotTexture(4));
        result.push(makeDotTexture(6));
        result.push(makeDotTexture(8));

        result.push(makeVertLinesTexture(1, 2));
        result.push(makeVertLinesTexture(2, 4));

        result.push(makeHorizLinesTexture(1, 2));
        result.push(makeHorizLinesTexture(2, 4));

        result.push(makeCheckerBoardTexture(2));
        result.push(makeCheckerBoardTexture(4));
        result.push(makeCheckerBoardTexture(8));
        result.push(makeCheckerBoardTexture(16));

        return result;
    }

    /**
     * @param size int
     * 
     * @returns CPGreyBmp
     */
    function makeDotTexture(size) {
        var texture = new _CPGreyBmp2.default(size, size);

        for (var i = 1; i < size * size; i++) {
            texture.data[i] = 0xFF;
        }
        return texture;
    }

    /**
     * Make a checkerboard texture of the given dimensions.
     * 
     * @param size int
     * 
     * @returns CPGreyBmp
     */
    function makeCheckerBoardTexture(size) {
        var textureSize = 2 * size,
            texture = new _CPGreyBmp2.default(textureSize, textureSize);

        for (var i = 0; i < textureSize; i++) {
            for (var j = 0; j < textureSize; j++) {
                texture.data[i + j * textureSize] = (~~(i / size) + ~~(j / size)) % 2 == 0 ? 0 : 0xFF;
            }
        }

        return texture;
    }

    /**
     * Make a texture consisting of a series of evenly-spaced vertical lines
     * 
     * @param lineSize int
     * @param size int
     * 
     * @returns CPGreyBmp
     */
    function makeVertLinesTexture(lineSize, size) {
        var texture = new _CPGreyBmp2.default(size, size);

        for (var i = 0; i < size * size; i++) {
            if (~~(i % size) >= lineSize) {
                texture.data[i] = 0xFF;
            }
        }

        return texture;
    }

    /**
     * Make a texture consisting of a series of evenly-spaced horizontal lines
     *
     * @param lineSize int
     * @param size int
     * 
     * @returns CPGreyBmp
     */
    function makeHorizLinesTexture(lineSize, size) {
        var texture = new _CPGreyBmp2.default(size, size);

        for (var i = 0; i < size * size; i++) {
            if (i / size >= lineSize) {
                texture.data[i] = 0xFF;
            }
        }

        return texture;
    }

    function updateSelectedTexture() {
        if (selectedTexture != null) {
            processedTexture = selectedTexture.clone();

            if (mirror) {
                processedTexture.mirrorHorizontally();
            }

            var lut = new _CPLookUpTable2.default();

            lut.loadBrightnessContrast(brightness, contrast);

            if (inverse) {
                lut.invert();
            }

            processedTexture.applyLUT(lut);
        } else {
            processedTexture = null;
        }

        controller.getArtwork().setBrushTexture(processedTexture);

        if (optionsPanel != null) {
            optionsPanel.updateTexture();
        }
    }

    function CPTextureOptionsPanel() {
        var panel = document.createElement("div"),
            cbInverse = document.createElement("input"),
            cbMirror = document.createElement("input"),
            slBrightness = new _CPSlider2.default(0, 200, true),
            slContrast = new _CPSlider2.default(0, 200, true),
            sampleSwatch = new CPTextureSwatch(null, TEXTURE_PREVIEW_SIZE, TEXTURE_PREVIEW_SIZE),
            btnCustomize = document.createElement("button"),
            textureControlsPanel;

        function updatePopoverControls() {
            cbInverse.checked = inverse;
            cbMirror.checked = mirror;

            slBrightness.setValue(brightness * 100 + 100);
            slContrast.setValue(contrast * 100 + 100);
        }

        function buildTextureControlsPanel() {
            var panel = document.createElement("div");

            cbInverse.type = "checkbox";
            cbInverse.addEventListener("click", function (e) {
                inverse = this.checked;
                updateSelectedTexture();
            });

            panel.appendChild(wrapCheckboxWithLabel(cbInverse, "Inverse"));

            cbMirror.type = "checkbox";
            cbMirror.addEventListener("click", function (e) {
                mirror = this.checked;
                updateSelectedTexture();
            });

            panel.appendChild(wrapCheckboxWithLabel(cbMirror, "Mirror"));

            slBrightness.title = function (value) {
                return "Brightness: " + (value - 100) + "%";
            };

            slBrightness.on("valueChange", function (value) {
                brightness = (value - 100) / 100.0;

                updateSelectedTexture();
            });

            panel.appendChild(slBrightness.getElement());

            slContrast.title = function (value) {
                return "Contrast: " + (value - 100) + "%";
            };

            slContrast.on("valueChange", function (value) {
                contrast = (value - 100) / 100;

                updateSelectedTexture();
            });

            panel.appendChild(slContrast.getElement());

            var okayButton = document.createElement("button"),
                resetButton = document.createElement("button");

            okayButton.innerHTML = "Ok";
            okayButton.className = "btn btn-primary btn-sm";
            okayButton.type = "button";

            okayButton.addEventListener("click", function (e) {
                $(btnCustomize).popover('hide');
            });

            panel.appendChild(okayButton);
            panel.appendChild(document.createTextNode(" "));

            resetButton.innerHTML = "Reset";
            resetButton.className = "btn btn-default btn-sm";
            resetButton.type = "button";

            resetButton.addEventListener("click", function (e) {
                brightness = 0;
                contrast = 0;
                mirror = false;
                inverse = false;

                updatePopoverControls();
                updateSelectedTexture();
            });

            panel.appendChild(resetButton);

            updatePopoverControls();

            return panel;
        }

        // TODO use events instead
        this.updateTexture = function () {
            btnCustomize.disabled = processedTexture == null;
            sampleSwatch.setTexture(processedTexture);
        };

        this.getElement = function () {
            return panel;
        };

        panel.className = "chickenpaint-texture-options";
        panel.appendChild(sampleSwatch.getElement());

        btnCustomize.type = "button";
        btnCustomize.className = "btn btn-default btn-sm";
        btnCustomize.innerHTML = "Customize";

        textureControlsPanel = buildTextureControlsPanel();

        $(btnCustomize).popover({
            html: true,
            content: function content() {
                return textureControlsPanel;
            },
            trigger: "manual"
        }).on("click", function () {
            $(this).popover("toggle");
        });

        panel.appendChild(btnCustomize);

        this.updateTexture();
    }

    function CPTextureSwatch(texture, width, height) {
        var canvas = document.createElement("canvas"),
            canvasContext = canvas.getContext("2d"),
            that = this;

        this.setTexture = function (texture) {
            this.texture = texture;

            this.paint();
        };

        this.getElement = function () {
            return canvas;
        };

        this.paint = function () {
            if (this.texture != null) {
                canvasContext.fillStyle = canvasContext.createPattern(this.texture.toCanvas(), "repeat");
            } else {
                canvasContext.fillStyle = 'white';
            }
            canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        };

        canvas.addEventListener("click", function () {
            that.emit("click");
        });

        canvas.width = width;
        canvas.height = height;

        this.setTexture(texture);
    }

    CPTextureSwatch.prototype = Object.create(EventEmitter.prototype);
    CPTextureSwatch.prototype.constructor = CPTextureSwatch;

    optionsPanel = new CPTextureOptionsPanel();

    body.appendChild(optionsPanel.getElement());

    texturesPanel.className = 'chickenpaint-texture-swatches';

    body.appendChild(texturesPanel);

    addTextures(makeProceduralTextures());

    loadTextures(controller.getResourcesRoot() + "gfx/textures32.png", 32, 32, 2, function (loadedTextures) {
        addTextures(loadedTextures);
    });
}

CPTexturePalette.prototype = Object.create(_CPPalette2.default.prototype);
CPTexturePalette.prototype.constructor = CPTexturePalette;
module.exports = exports['default'];

},{"../engine/CPGreyBmp":10,"../engine/CPLookUpTable":12,"./CPPalette":32,"./CPSlider":37}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPToolPalette;

var _CPPalette = require('./CPPalette');

var _CPPalette2 = _interopRequireDefault(_CPPalette);

var _ChickenPaint = require('../ChickenPaint');

var _ChickenPaint2 = _interopRequireDefault(_ChickenPaint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPToolPalette(cpController) {
    _CPPalette2.default.call(this, cpController, "tool", "Tools");

    var that = this,
        buttons = [{
        className: "chickenpaint-tool-rect-selection",
        command: "CPRectSelection",
        toolTip: "Marquee",
        shortcut: "m",
        mode: _ChickenPaint2.default.M_RECT_SELECTION
    }, {
        className: "chickenpaint-tool-move",
        command: "CPMoveTool",
        toolTip: "Move tool",
        shortcut: "v",
        mode: _ChickenPaint2.default.M_MOVE_TOOL
    }, {
        className: "chickenpaint-tool-flood-fill",
        command: "CPFloodFill",
        toolTip: "Flood fill",
        shortcut: "f",
        mode: _ChickenPaint2.default.M_FLOODFILL
    }, {
        className: "chickenpaint-tool-gradient-fill",
        command: "CPGradientFill",
        toolTip: "Gradient fill",
        shortcut: "g",
        mode: _ChickenPaint2.default.M_GRADIENTFILL
    }, {
        className: "chickenpaint-tool-color-picker",
        command: "CPColorPicker",
        toolTip: "Color picker",
        shortcut: "i",
        mode: _ChickenPaint2.default.M_COLOR_PICKER
    }, {
        className: "chickenpaint-tool-rotate-canvas",
        command: "CPRotateCanvas",
        commandDoubleClick: "CPResetCanvasRotation",
        toolTip: "Rotate canvas",
        mode: _ChickenPaint2.default.M_ROTATE_CANVAS
    }, {
        className: "chickenpaint-tool-pencil",
        command: "CPPencil",
        toolTip: "Pencil",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_PENCIL
    }, {
        className: "chickenpaint-tool-pen",
        command: "CPPen",
        toolTip: "Pen",
        selected: true, // TODO a better mechanism for the controller to let us know the initial tool
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_PEN
    }, {
        className: "chickenpaint-tool-airbrush",
        command: "CPAirbrush",
        toolTip: "Airbrush",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_AIRBRUSH
    }, {
        className: "chickenpaint-tool-water",
        command: "CPWater",
        toolTip: "Waterpaint",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_WATER
    }, {
        className: "chickenpaint-tool-eraser",
        command: "CPEraser",
        toolTip: "Eraser",
        shortcut: "e",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_ERASER
    }, {
        className: "chickenpaint-tool-soft-eraser",
        command: "CPSoftEraser",
        toolTip: "Soft eraser",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_SOFTERASER
    }, {
        className: "chickenpaint-tool-smudge",
        command: "CPSmudge",
        toolTip: "Smudge",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_SMUDGE
    }, {
        className: "chickenpaint-tool-blender",
        command: "CPBlender",
        toolTip: "Blender",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_BLENDER
    }, {
        className: "chickenpaint-tool-dodge",
        command: "CPDodge",
        toolTip: "Dodge",
        shortcut: "o",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_DODGE
    }, {
        className: "chickenpaint-tool-burn",
        command: "CPBurn",
        toolTip: "Burn",
        shortcut: "p",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_BURN
    }, {
        className: "chickenpaint-tool-blur",
        command: "CPBlur",
        toolTip: "Blur",
        mode: _ChickenPaint2.default.M_DRAW,
        tool: _ChickenPaint2.default.T_BLUR
    }],
        listElem = document.createElement("ul");

    function buttonClicked(e) {
        if (this.nodeName == "LI") {
            var button = buttons[parseInt(this.getAttribute("data-buttonIndex"), 10)];

            cpController.actionPerformed({ action: button.command });
        }
    }

    function buildButtons() {
        var body = that.getBodyElement();

        listElem.className = "chickenpaint-tools list-unstyled";

        for (var i in buttons) {
            (function (i) {
                var button = buttons[i],
                    buttonElem = document.createElement("li");

                buttonElem.className = "chickenpaint-toolbar-button " + button.className;
                buttonElem.setAttribute("data-buttonIndex", i);

                buttonElem.setAttribute('data-mode', button.mode);
                if (button.tool !== undefined) {
                    buttonElem.setAttribute('data-tool', button.tool);
                }

                buttonElem.title = button.toolTip;

                if (button.shortcut) {
                    buttonElem.title += " (" + button.shortcut.toUpperCase() + ")";

                    key(button.shortcut, function () {
                        buttonClicked.call(buttonElem);

                        return false;
                    });
                }

                if (button.selected) {
                    buttonElem.className = buttonElem.className + " selected";
                }

                listElem.appendChild(buttonElem);
            })(i);
        }

        $(listElem).on("click", "li", buttonClicked);

        listElem.addEventListener("dblclick", function (e) {
            if (this.nodeName == "LI") {
                var button = buttons[parseInt(this.getAttribute("data-buttonIndex"), 10)];

                if (button.commandDoubleClick) {
                    cpController.actionPerformed({ action: button.commandDoubleClick });
                }
            }
        });

        body.appendChild(listElem);
    }

    cpController.on("modeChange", function (newMode) {
        var body = that.getBodyElement();

        $("li", body).removeClass("selected");

        if (newMode == _ChickenPaint2.default.M_DRAW) {
            $("li[data-tool=" + cpController.getCurTool() + "]", body).addClass("selected");
        } else {
            $("li[data-mode=" + newMode + "]", body).addClass("selected");
        }
    });

    cpController.on("toolChange", function (newTool) {
        var body = that.getBodyElement();

        if (cpController.getCurMode() == _ChickenPaint2.default.M_DRAW) {
            $("li", body).removeClass("selected");

            $("li[data-tool=" + newTool + "]", body).addClass("selected");
        }
    });

    buildButtons();
}

CPToolPalette.prototype = Object.create(_CPPalette2.default.prototype);
CPToolPalette.prototype.constructor = CPToolPalette;
module.exports = exports['default'];

},{"../ChickenPaint":1,"./CPPalette":32}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = AdobeColorTable;

var _ArrayDataStream = require("./ArrayDataStream");

var _ArrayDataStream2 = _interopRequireDefault(_ArrayDataStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ACO_COLORSPACE_RGB = 0,
    ACO_COLORSPACE_HSB = 1,
    ACO_COLORSPACE_CMYK = 2,
    ACO_COLORSPACE_LAB = 7,
    ACO_COLORSPACE_GRAYSCALE = 8; /* 
                                   * By Nicholas Sherlock <n.sherlock@gmail.com>
                                   * 
                                   * Released under the WTFPLv2 https://en.wikipedia.org/wiki/WTFPL
                                   */

function AdobeColorTable() {}

/**
 * Read an .aco (Adobe COlor) swatches file and return an array of RGB colors.
 * 
 * Supports version 1 palettes, only RGB format.
 * 
 * @param input A Uint8Array of the .aco file contents
 * @return An array of colours, or null if the file was not supported.
 */
AdobeColorTable.prototype.read = function (input) {
    if (input == null) {
        return null;
    }

    var stream = new _ArrayDataStream2.default(new Uint8Array(input)),
        version,
        count,
        result = [];

    version = stream.readU16BE();
    if (version != 1) {
        return null;
    }
    count = stream.readU16BE();

    for (var i = 0; i < count; i++) {
        var colourspace = stream.readU16BE();

        if (colourspace != ACO_COLORSPACE_RGB) {
            continue; // Drop unsupported colours silently
        }

        // Scale back down from 16-bit to 8-bit
        var r = stream.readU16BE() * 255 / 65535,
            g = stream.readU16BE() * 255 / 65535,
            b = stream.readU16BE() * 255 / 65535;

        stream.readU16BE(); // third value unused

        result.push(r << 16 | g << 8 | b);
    }

    return result;
};

/**
 * Write an .aco (Adobe COlor) swatches file of the given array of RGB colours (colors are integers with the
 * blue channel in the least-significant position).
 */
AdobeColorTable.prototype.write = function (colours) {
    var buffer = new Uint8Array(2 * 2 + colours.length * 10),
        stream = new _ArrayDataStream2.default(buffer);

    stream.writeU16BE(1); // Version 1
    stream.writeU16BE(colours.length); // Number of colours

    for (var i = 0; i < colours.length; i++) {
        var colour = colours[i];

        stream.writeU16BE(ACO_COLORSPACE_RGB);

        // Scale up colours to 16-bits (65535/255 = 257)
        stream.writeU16BE((colour >> 16 & 0xFF) * 257);
        stream.writeU16BE((colour >> 8 & 0xFF) * 257);
        stream.writeU16BE((colour & 0xFF) * 257);
        stream.writeU16BE(0);
    }

    return stream.getAsDataArray();
};
module.exports = exports["default"];

},{"./ArrayDataStream":45}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ArrayDataStream;
/**
 * A tool for presenting a Uint8Array as a stream for reading and writing some simple data types.
 * 
 * By Nicholas Sherlock <n.sherlock@gmail.com> 2016, released under the WTFPL license.
 */

var EOF = -1;

function signExtend16Bit(word) {
    //If sign bit is set, fill the top bits with 1s to sign-extend
    return word & 0x8000 ? word | 0xFFFF0000 : word;
}

function signExtend8Bit(byte) {
    //If sign bit is set, fill the top bits with 1s to sign-extend
    return byte & 0x80 ? byte | 0xFFFFFF00 : byte;
}

/**
 * Create a stream on existing array of unsigned byte data (i.e. hopefully Uint8Array).
 * 
 * @param data Uint8Array to stream data from
 * @param start The index of the byte in the array that will be read first, or leave undefined to begin at the
 *              beginning of the array
 * @param end The index of the end of the stream, or leave undefined to use the end of the array as the end of
 *            the stream.
 */
function ArrayDataStream(data, start, end) {
    this.data = data;
    this.eof = false;
    this.start = start === undefined ? 0 : start;
    this.end = end === undefined ? data.length : end;
    this.pos = this.start;
};

/**
 * Read a single byte from the stream and turn it into a JavaScript string (assuming ASCII).
 * 
 * @returns String containing one character, or EOF if the end of file was reached (eof flag
 * is set).
 */
ArrayDataStream.prototype.readChar = function () {
    if (this.pos < this.end) {
        return String.fromCharCode(this.data[this.pos++]);
    }

    this.eof = true;
    return EOF;
};

/**
 * Read one unsigned byte from the stream
 * 
 * @returns Unsigned byte, or EOF if the end of file was reached (eof flag is set).
 */
ArrayDataStream.prototype.readByte = function () {
    if (this.pos < this.end) {
        return this.data[this.pos++];
    }

    this.eof = true;
    return EOF;
};

//Synonym:
ArrayDataStream.prototype.readU8 = ArrayDataStream.prototype.readByte;

ArrayDataStream.prototype.readS8 = function () {
    return signExtend8Bit(this.readByte());
};

ArrayDataStream.prototype.unreadChar = function (c) {
    this.pos--;
};

ArrayDataStream.prototype.peekChar = function () {
    if (this.pos < this.end) {
        return String.fromCharCode(this.data[this.pos]);
    }

    this.eof = true;
    return EOF;
};

ArrayDataStream.prototype.readString = function (length) {
    var chars = new Array(length),
        i;

    for (i = 0; i < length; i++) {
        chars[i] = this.readChar();
    }

    return chars.join("");
};

ArrayDataStream.prototype.readS16 = function () {
    var b1 = this.readByte(),
        b2 = this.readByte();

    return signExtend16Bit(b1 << 8 | b2);
};

ArrayDataStream.prototype.readU16BE = function () {
    var b1 = this.readByte(),
        b2 = this.readByte();

    return b1 << 8 | b2;
};

ArrayDataStream.prototype.readU16LE = function () {
    var b1 = this.readByte(),
        b2 = this.readByte();

    return b2 << 8 | b1;
};

ArrayDataStream.prototype.readU32BE = function () {
    var b1 = this.readByte(),
        b2 = this.readByte(),
        b3 = this.readByte(),
        b4 = this.readByte();
    return (b1 << 24 | b2 << 16 | b3 << 8 | b4) >>> 0;
};

ArrayDataStream.prototype.readU32LE = function () {
    var b1 = this.readByte(),
        b2 = this.readByte(),
        b3 = this.readByte(),
        b4 = this.readByte();
    return (b4 << 24 | b3 << 16 | b2 << 8 | b1) >>> 0;
};

ArrayDataStream.prototype.readBytes = function (count) {
    var result = this.data.subarray(this.pos, this.pos + count);

    this.pos += count;

    if (this.pos > this.end) {
        this.eof = true;
    }

    return result;
};

ArrayDataStream.prototype.skip = function (numBytes) {
    this.pos += numBytes;

    if (this.pos > this.end) {
        this.eof = true;
    }
};

ArrayDataStream.prototype.seek = function (offset) {
    this.pos = offset;
};

ArrayDataStream.prototype.writeBytes = function (arr) {
    for (var i = 0; i < arr.length; i++) {
        this.data[this.pos++] = arr[i];
    }
};

ArrayDataStream.prototype.writeByte = function (b) {
    this.data[this.pos++] = b;
};

//Synonym:
ArrayDataStream.prototype.writeU8 = ArrayDataStream.prototype.writeByte;

ArrayDataStream.prototype.writeU16LE = function (u) {
    this.data[this.pos++] = u;
    this.data[this.pos++] = u >> 8;
};

ArrayDataStream.prototype.writeU16BE = function (u) {
    this.data[this.pos++] = u >> 8;
    this.data[this.pos++] = u;
};

ArrayDataStream.prototype.writeU32BE = function (u) {
    this.data[this.pos++] = u >> 24;
    this.data[this.pos++] = u >> 16;
    this.data[this.pos++] = u >> 8;
    this.data[this.pos++] = u;
};

ArrayDataStream.prototype.writeU32LE = function (u) {
    this.data[this.pos++] = u;
    this.data[this.pos++] = u >> 8;
    this.data[this.pos++] = u >> 16;
    this.data[this.pos++] = u >> 24;
};

ArrayDataStream.prototype.writeDoubleBE = function (d) {
    var bytes = new Uint8Array(new Float64Array([d]).buffer);

    for (var i = bytes.length - 1; i >= 0; i--) {
        this.writeByte(bytes[i]);
    }
};

ArrayDataStream.prototype.writeFloatBE = function (d) {
    var bytes = new Uint8Array(new Float32Array([d]).buffer);

    for (var i = bytes.length - 1; i >= 0; i--) {
        this.writeByte(bytes[i]);
    }
};

/**
 * Write an ASCII string to the stream
 */
ArrayDataStream.prototype.writeString = function (s) {
    for (var i = 0; i < s.length; i++) {
        this.data[this.pos++] = s.charCodeAt(i);
    }
};

/**
 * Write the given unsigned 32-bit integer to the stream in big-endian order using the given byte width.
 * No error checking is performed to ensure that the supplied width is correct for the integer.
 * 
 * Omit the width parameter to have it determined automatically for you.
 * 
 * @param u Unsigned integer to be written
 * @param width Number of bytes to write to the stream
 */
ArrayDataStream.prototype.writeUnsignedIntBE = function (u, width) {
    if (width === undefined) {
        width = this.measureUnsignedInt(u);
    }

    // Each case falls through:
    switch (width) {
        case 5:
            this.writeU8(Math.floor(u / 4294967296)); // Need to use division to access >32 bits of floating point var
        case 4:
            this.writeU8(u >> 24);
        case 3:
            this.writeU8(u >> 16);
        case 2:
            this.writeU8(u >> 8);
        case 1:
            this.writeU8(u);
            break;
        default:
            throw new RuntimeException("Bad UINT size " + width);
    }
};

/**
 * Return the number of bytes needed to hold the non-zero bits of the given unsigned integer.
 */
ArrayDataStream.prototype.measureUnsignedInt = function (val) {
    // Force to 32-bit unsigned integer
    if (val < 1 << 8) {
        return 1;
    } else if (val < 1 << 16) {
        return 2;
    } else if (val < 1 << 24) {
        return 3;
    } else if (val < 4294967296) {
        return 4;
    } else {
        return 5;
    }
};

/**
 * Return a view on the portion of the buffer from the beginning to the current seek position as a Uint8Array.
 */
ArrayDataStream.prototype.getAsDataArray = function () {
    if (this.pos < this.data.byteLength) {
        return this.data.subarray(0, this.pos);
    } else if (this.pos == this.data.byteLength) {
        return this.data;
    } else {
        throw "ArrayDataStream's pos lies beyond end of buffer";
        // Chance is pretty good that you overflowed the end of the buffer during writing and your file is trash 
    }
};

ArrayDataStream.prototype.EOF = EOF;
module.exports = exports["default"];

},{}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPBezier;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPBezier() {

    // How to use this class:
    //
    // 1 - set the 4 points coordinates (x0-3, y0-3)
    // two options:
    // 2a - call init() with desired dt then read the current coordinate (Bx, By) and use nextPoint() to compute the
    // next point
    // 2b - use one of the "compute" methods to compute the values for the whole curve in one step

    // The 4 points coordinates
    this.x0 = this.y0 = this.x1 = this.y1 = this.x2 = this.y2 = this.x3 = this.y3 = 0.0;

    // used to compute the Bezier curve with the forward differences method
    var Bx,
        dBx,
        ddBx,
        dddBx,
        By,
        dBy,
        ddBy,
        dddBy,
        that = this;

    function init(dt) {
        // Implements a fast degree-3 Bezier curve using the forward differences method
        //
        // Reference for this algorithm:
        // "Curves and Surfaces for Computer Graphics" by David Salomon, page 189

        var q1 = 3.0 * dt,
            q2 = q1 * dt,
            q3 = dt * dt * dt,
            q4 = 2.0 * q2,
            q5 = 6.0 * q3,
            q6x = that.x0 - 2.0 * that.x1 + that.x2,
            q6y = that.y0 - 2.0 * that.y1 + that.y2,
            q7x = 3.0 * (that.x1 - that.x2) - that.x0 + that.x3,
            q7y = 3.0 * (that.y1 - that.y2) - that.y0 + that.y3;

        Bx = that.x0;
        By = that.y0;

        dBx = (that.x1 - that.x0) * q1 + q6x * q2 + q7x * q3;
        dBy = (that.y1 - that.y0) * q1 + q6y * q2 + q7y * q3;

        ddBx = q6x * q4 + q7x * q5;
        ddBy = q6y * q4 + q7y * q5;

        dddBx = q7x * q5;
        dddBy = q7y * q5;
    }

    /**
     * Fill the given x,y arrays with a series of points on the curve.
     * 
     * @param x int[]
     * @param y int[]
     * @param elements int Count of elements to fill x and y arrays
     */
    this.compute = function (x, y, elements) {
        init(1.0 / elements);

        x[0] = ~~Bx;
        y[0] = ~~By;

        for (var i = 1; i < elements; i++) {
            Bx += dBx;
            By += dBy;
            dBx += ddBx;
            dBy += ddBy;
            ddBx += dddBx;
            ddBy += dddBy;

            x[i] = ~~Bx;
            y[i] = ~~By;
        }
    };
}
module.exports = exports["default"];

},{}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColor;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPColor(rgb) {
    var that = this;

    this.rgb = 0; // in RGB byte order

    this.hue = 0;
    this.saturation = 0;
    this.value = 0;

    function rgbToHsv() {
        var r = that.rgb >> 16 & 0xff,
            g = that.rgb >> 8 & 0xff,
            b = that.rgb & 0xff;

        // Value
        that.value = Math.max(r, Math.max(g, b));

        // Saturation
        var mini = Math.min(r, Math.min(g, b));

        if (that.value == 0) {
            that.saturation = 0;
        } else {
            that.saturation = ~~((that.value - mini) / that.value * 255);
        }

        // Hue
        if (that.saturation == 0) {
            that.hue = 0;
        } else {
            var cr = (that.value - r) / (that.value - mini),
                cg = (that.value - g) / (that.value - mini),
                cb = (that.value - b) / (that.value - mini);

            var _hue = 0;

            if (that.value == r) {
                _hue = cb - cg;
            }
            if (that.value == g) {
                _hue = 2 + cr - cb;
            }
            if (that.value == b) {
                _hue = 4 + cg - cr;
            }

            _hue *= 60;
            if (_hue < 0) {
                _hue += 360;
            }

            that.hue = ~~_hue;
        }
    }

    function hsvToRgb() {
        // no saturation means it's just a shade of grey
        if (that.saturation == 0) {
            that.rgb = that.value << 16 | that.value << 8 | that.value;
        } else {
            var f = that.hue / 60;

            f = f - Math.floor(f);

            var s = that.saturation / 255,
                m = ~~(that.value * (1 - s)),
                n = ~~(that.value * (1 - s * f)),
                k = ~~(that.value * (1 - s * (1 - f)));

            switch (~~(that.hue / 60)) {
                case 0:
                    that.rgb = that.value << 16 | k << 8 | m;
                    break;
                case 1:
                    that.rgb = n << 16 | that.value << 8 | m;
                    break;
                case 2:
                    that.rgb = m << 16 | that.value << 8 | k;
                    break;
                case 3:
                    that.rgb = m << 16 | n << 8 | that.value;
                    break;
                case 4:
                    that.rgb = k << 16 | m << 8 | that.value;
                    break;
                case 5:
                    that.rgb = that.value << 16 | m << 8 | n;
                    break;
                default:
                    that.rgb = 0; // invalid hue
                    break;
            }
        }
    }

    this.getRgb = function () {
        return this.rgb;
    };

    this.getSaturation = function () {
        return this.saturation;
    };

    this.getHue = function () {
        return this.hue;
    };

    this.getValue = function () {
        return this.value;
    };

    this.setRgbComponents = function (r, g, b) {
        this.setRgb(r << 16 | g << 8 | b);
    };

    this.setRgb = function (rgb) {
        this.rgb = rgb;
        rgbToHsv();
    };

    this.setHsv = function (hue, value, saturation) {
        this.hue = hue;
        this.saturation = saturation;
        this.value = value;

        hsvToRgb();
    };

    this.setHue = function (hue) {
        this.hue = hue;
        hsvToRgb();
    };

    this.setSaturation = function (saturation) {
        this.saturation = saturation;
        hsvToRgb();
    };

    this.setValue = function (value) {
        this.value = value;
        hsvToRgb();
    };

    this.clone = function () {
        var result = new CPColor();

        result.copyFrom(this);

        return result;
    };

    this.copyFrom = function (c) {
        this.rgb = c.rgb;
        this.hue = c.hue;
        this.saturation = c.saturation;
        this.value = c.value;
    };

    this.isEqual = function (color) {
        return this.rgb == color.rgb && this.hue == color.hue && this.saturation == color.saturation && this.value == color.value;
    };

    this.setRgb(rgb || 0);
}
module.exports = exports["default"];

},{}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPColorFloat;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

// An RGB color with floating point values for each channel (between 0.0 and 1.0)
function CPColorFloat(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

CPColorFloat.prototype.toInt = function () {
    return Math.max(0, Math.min(255, Math.round(this.r * 255))) << 16 | Math.max(0, Math.min(255, Math.round(this.g * 255))) << 8 | Math.max(0, Math.min(255, Math.round(this.b * 255)));
};

CPColorFloat.prototype.mixWith = function (color, alpha) {
    this.r = this.r * (1.0 - alpha) + color.r * alpha;
    this.g = this.g * (1.0 - alpha) + color.g * alpha;
    this.b = this.b * (1.0 - alpha) + color.b * alpha;
};

CPColorFloat.prototype.clone = function () {
    return new CPColorFloat(this.r, this.g, this.b);
};

CPColorFloat.createFromInt = function (color) {
    return new CPColorFloat((color >>> 16 & 0xff) / 255, (color >>> 8 & 0xff) / 255, (color & 0xff) / 255);
};
module.exports = exports["default"];

},{}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.isCanvasInterpolationSupported = isCanvasInterpolationSupported;
exports.setCanvasInterpolation = setCanvasInterpolation;
exports.isEventSupported = isEventSupported;
exports.isCanvasSupported = isCanvasSupported;
/*
	ChickenPaint

	ChickenPaint is a translation of ChibiPaint from Java to JavaScript
	by Nicholas Sherlock / Chicken Smoothie.

	ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

	ChickenPaint is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	ChickenPaint is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function getCanvasInterpolationPropName(canvasContext) {
	var browserProperties = ["imageSmoothingEnabled", "mozImageSmoothingEnabled", "webkitImageSmoothingEnabled", "msImageSmoothingEnabled"];

	for (var i = 0; i < browserProperties.length; i++) {
		if (browserProperties[i] in canvasContext) {
			return browserProperties[i];
		}
	}

	return null;
}

function isCanvasInterpolationSupported() {
	var canvas = document.createElement("canvas"),
	    canvasContext = canvas.getContext("2d");

	return !!getCanvasInterpolationPropName(canvasContext);
}

function setCanvasInterpolation(canvasContext, enabled) {
	var propName = getCanvasInterpolationPropName(canvasContext);

	if (propName) {
		canvasContext[propName] = enabled;
	}
}

function isEventSupported(eventName) {
	var isSupported = eventName in window;

	if (!isSupported) {
		var el = document.createElement('div');
		el.setAttribute(eventName, 'return;');

		isSupported = typeof el[eventName] == 'function';
	}

	return isSupported;
}

function isCanvasSupported() {
	var elem = document.createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
}

},{}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CPPolygon;

var _CPTransform = require('./CPTransform');

var _CPTransform2 = _interopRequireDefault(_CPTransform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CPPolygon(points) {
	this.points = points || [];
} /*
  	ChickenPaint
  
  	ChickenPaint is a translation of ChibiPaint from Java to JavaScript
  	by Nicholas Sherlock / Chicken Smoothie.
  
  	ChibiPaint is Copyright (c) 2006-2008 Marc Schefer
  
  	ChickenPaint is free software: you can redistribute it and/or modify
  	it under the terms of the GNU General Public License as published by
  	the Free Software Foundation, either version 3 of the License, or
  	(at your option) any later version.
  
  	ChickenPaint is distributed in the hope that it will be useful,
  	but WITHOUT ANY WARRANTY; without even the implied warranty of
  	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  	GNU General Public License for more details.
  
  	You should have received a copy of the GNU General Public License
  	along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
  */

CPPolygon.prototype.clone = function () {
	var result = new CPPolygon(new Array(this.points.length));

	for (var i = 0; i < this.points.length; i++) {
		// Deep clone
		result.points[i] = { x: this.points[i].x, y: this.points[i].y };
	}

	return result;
};

/**
 * Get a new polygon which is the result of transforming the points of this polygon with the given affine transform.
 *
 * @param {CPTransform} affineTransform
 * @returns {CPPolygon}
 */
CPPolygon.prototype.getTransformed = function (affineTransform) {
	var result = new CPPolygon(new Array(this.points.length));

	for (var i = 0; i < this.points.length; i++) {
		result.points[i] = affineTransform.getTransformedPoint(this.points[i]);
	}

	return result;
};

CPPolygon.prototype.getCenter = function () {
	var centerX = this.points[0].x,
	    centerY = this.points[0].y;

	for (var i = 1; i < this.points.length; i++) {
		centerX += this.points[i].x;
		centerY += this.points[i].y;
	}

	return { x: centerX / this.points.length, y: centerY / this.points.length };
};

/**
 * From https://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
 *
 * @param point
 * @returns {boolean}
 */
CPPolygon.prototype.containsPoint = function (point) {
	var i,
	    j,
	    contained = false;

	for (i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
		if (this.points[i].y > point.y != this.points[j].y > point.y && point.x < (this.points[j].x - this.points[i].x) * (point.y - this.points[i].y) / (this.points[j].y - this.points[i].y) + this.points[i].x) {
			contained = !contained;
		}
	}

	return contained;
};
module.exports = exports['default'];

},{"./CPTransform":53}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPRandom;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPRandom() {
    var nextNextGaussian,
        haveNextNextGaussian = false;

    /**
     * Definition from Java, mean of 0.0 and standard deviation 1.0.
     */
    this.nextGaussian = function () {
        if (haveNextNextGaussian) {
            haveNextNextGaussian = false;
            return nextNextGaussian;
        } else {

            var v1, v2, s;

            do {
                v1 = 2 * Math.random() - 1; // between -1.0 and 1.0
                v2 = 2 * Math.random() - 1; // between -1.0 and 1.0
                s = v1 * v1 + v2 * v2;
            } while (s >= 1 || s == 0);

            var multiplier = Math.sqrt(-2 * Math.log(s) / s);

            nextNextGaussian = v2 * multiplier;
            haveNextNextGaussian = true;

            return v1 * multiplier;
        }
    };
};
module.exports = exports["default"];

},{}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPRect;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPRect(left, top, right, bottom) {
    /*
    if (left === undefined || top === undefined || right === undefined || bottom === undefined) {
        throw "Bad rect";
    }
    
    if (~~left !== left || ~~top !== top || ~~right !== right || ~~bottom !== bottom) {
        throw "Bad rect";
    }
    */

    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
}

CPRect.prototype.makeEmpty = function () {
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
};

CPRect.prototype.union = function (that) {
    if (this.isEmpty()) {
        this.set(that);
    } else {
        this.left = Math.min(this.left, that.left);
        this.top = Math.min(this.top, that.top);
        this.right = Math.max(this.right, that.right);
        this.bottom = Math.max(this.bottom, that.bottom);
    }
};

CPRect.prototype.getUnion = function (that) {
    var result = this.clone();

    result.union(that);

    return result;
};

/**
 * Clip this rectangle to fit within `that`.
 * 
 * @returns a reference to this rectangle for chaining
 */
CPRect.prototype.clip = function (that) {
    if (!this.isEmpty()) {
        if (that.isEmpty()) {
            this.makeEmpty();
        } else {
            this.left = Math.max(this.left, that.left);
            this.top = Math.max(this.top, that.top);
            this.right = Math.min(this.right, that.right);
            this.bottom = Math.min(this.bottom, that.bottom);
        }
    }

    return this;
};

CPRect.prototype.containsPoint = function (p) {
    return !(p.x < this.left || p.y < this.top || p.x >= this.right || p.y >= this.bottom);
};

CPRect.prototype.isInside = function (that) {
    return this.left >= that.left && this.top >= that.top && this.right <= that.right && this.bottom <= that.bottom;
};

/**
 * Use this rectangle as bounds to clip the placement of the area of srcRect at the position of dstRect inside
 * our bounds.
 *
 * dstRect has its right and bottom set by this operation to match the area that would be copied from the source.
 * srcRect has its coordinates tweaked to match the area that will be copied.
 */
CPRect.prototype.clipSourceDest = function (srcRect, dstRect) {
    dstRect.right = dstRect.left + srcRect.getWidth();
    dstRect.bottom = dstRect.top + srcRect.getHeight();

    if (this.isEmpty() || dstRect.left >= this.right || dstRect.top >= this.bottom || dstRect.right <= this.left || dstRect.bottom <= this.top) {
        srcRect.makeEmpty();
        dstRect.makeEmpty();
    } else {
        // bottom/right
        if (dstRect.right > this.right) {
            srcRect.right -= dstRect.right - this.right;
            dstRect.right = this.right;
        }

        if (dstRect.bottom > this.bottom) {
            srcRect.bottom -= dstRect.bottom - this.bottom;
            dstRect.bottom = this.bottom;
        }

        // top/left
        if (dstRect.left < this.left) {
            srcRect.left += this.left - dstRect.left;
            dstRect.left = this.left;
        }

        if (dstRect.top < this.top) {
            srcRect.top += this.top - dstRect.top;
            dstRect.top = this.top;
        }
    }
};

CPRect.prototype.getWidth = function () {
    return this.right - this.left;
};

CPRect.prototype.getHeight = function () {
    return this.bottom - this.top;
};

CPRect.prototype.getArea = function () {
    return this.getWidth() * this.getHeight();
};

CPRect.prototype.isEmpty = function () {
    return this.right <= this.left || this.bottom <= this.top;
};

CPRect.prototype.set = function (r) {
    this.left = r.left;
    this.top = r.top;
    this.right = r.right;
    this.bottom = r.bottom;
};

CPRect.prototype.clone = function () {
    return new CPRect(this.left, this.top, this.right, this.bottom);
};

CPRect.prototype.translate = function (x, y) {
    this.left += x;
    this.right += x;
    this.top += y;
    this.bottom += y;
};

CPRect.prototype.moveTo = function (x, y) {
    this.translate(x - this.left, y - this.top);
};

CPRect.prototype.equals = function (that) {
    return this.left == that.left && this.right == that.right && this.top == that.top && this.bottom == that.bottom;
};

/**
 * Add h pixels to both the left and right sides of the rectangle, and v pixels to both the top and bottom sides.
 *  
 * @param h
 * @param v
 */
CPRect.prototype.grow = function (h, v) {
    // TODO checks for rectangles with zero-extent
    this.left -= h;
    this.right += h;
    this.top -= v;
    this.bottom += v;
};

CPRect.prototype.toString = function () {
    return "(" + this.left + "," + this.top + "," + this.right + "," + this.bottom + ")";
};

/**
 * Convert the rectangle into an array of points of the corners of the rectangle (clockwise starting from the top left
 * point).
 */
CPRect.prototype.toPoints = function () {
    return [{ x: this.left, y: this.top }, { x: this.right, y: this.top }, { x: this.right, y: this.bottom }, { x: this.left, y: this.bottom }];
};

/**
 * Round the rectangle coordinates to the nearest integer.
 */
CPRect.prototype.roundNearest = function () {
    this.left = Math.round(this.left);
    this.top = Math.round(this.top);
    this.right = Math.round(this.right);
    this.bottom = Math.round(this.bottom);
};

/**
 * Round the rectangle coordinates to integers so that the old rectangle is contained by the new one.
 */
CPRect.prototype.roundContain = function () {
    this.left = Math.floor(this.left);
    this.top = Math.floor(this.top);
    this.right = Math.ceil(this.right);
    this.bottom = Math.ceil(this.bottom);
};

/**
 * Create an AABB CPRect which encloses the given array of points.
 */
CPRect.createBoundingBox = function (points) {
    var result = new CPRect(points[0].x, points[0].y, points[0].x, points[0].y);

    for (var i = 1; i < points.length; i++) {
        result.left = Math.min(result.left, points[i].x);
        result.top = Math.min(result.top, points[i].y);
        result.right = Math.max(result.right, points[i].x);
        result.bottom = Math.max(result.bottom, points[i].y);
    }

    return result;
};

/* 
 * Chrome is initially eager to optimize CPRect and users assuming that all the fields are SMIs, then later on decides
 * that they should be tagged numbers after all. This causes all the blending operation functions to be reoptimized
 * a couple of times. 
 * 
 * Avoid that mess by starting things off with floats in the members.  
 */
window.cpRectGarbage = new CPRect(1.5, 2.5, 3.5, 4.5);
module.exports = exports["default"];

},{}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPTransform;
// Modifications by Nicholas Sherlock. Original docs below:

// Last updated November 2011
// By Simon Sarris
// www.simonsarris.com
// sarris@acm.org
//
// Free to use and distribute at will
// So long as you are nice to people, etc

// Simple class for keeping track of the current transformation matrix

// For instance:
//    var t = new Transform();
//    t.rotate(5);
//    var m = t.m;
//    ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);

// Is equivalent to:
//    ctx.rotate(5);

// But now you can retrieve it :)

// Remember that this does not account for any CSS transforms applied to the canvas

function CPTransform() {
    this.setToIdentity();
}

CPTransform.prototype.setToIdentity = function () {
    /* Matrix components are stored in this order in 'm':
     * [0 2 4]
     * [1 3 5]
     * [x x x]
     *
     * Last row is always 0, 0, 1 so we don't store it.
     */
    this.m = [1, 0, 0, 1, 0, 0];
};

/**
 * Multiply this matrix with the given transformation one like so:
 *
 * [this] = [this] * [matrix]
 *
 * @param {CPTransform} matrix
 */
CPTransform.prototype.multiply = function (matrix) {
    var m11 = this.m[0] * matrix.m[0] + this.m[2] * matrix.m[1],
        m12 = this.m[1] * matrix.m[0] + this.m[3] * matrix.m[1],
        m21 = this.m[0] * matrix.m[2] + this.m[2] * matrix.m[3],
        m22 = this.m[1] * matrix.m[2] + this.m[3] * matrix.m[3],
        dx = this.m[0] * matrix.m[4] + this.m[2] * matrix.m[5] + this.m[4],
        dy = this.m[1] * matrix.m[4] + this.m[3] * matrix.m[5] + this.m[5];

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;
};

/**
 * Multiply this matrix with the given transformation one like so:
 *
 * [this] = [matrix] * [this]
 *
 * @param {CPTransform} matrix
 */
CPTransform.prototype.preMultiply = function (matrix) {
    var m11 = matrix.m[0] * this.m[0] + matrix.m[2] * this.m[1],
        m12 = matrix.m[1] * this.m[0] + matrix.m[3] * this.m[1],
        m21 = matrix.m[0] * this.m[2] + matrix.m[2] * this.m[3],
        m22 = matrix.m[1] * this.m[2] + matrix.m[3] * this.m[3],
        dx = matrix.m[0] * this.m[4] + matrix.m[2] * this.m[5] + matrix.m[4],
        dy = matrix.m[1] * this.m[4] + matrix.m[3] * this.m[5] + matrix.m[5];

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
    this.m[4] = dx;
    this.m[5] = dy;
};

CPTransform.prototype.invert = function () {
    var d = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
        m0 = this.m[3] * d,
        m1 = -this.m[1] * d,
        m2 = -this.m[2] * d,
        m3 = this.m[0] * d,
        m4 = d * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
        m5 = d * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);

    this.m[0] = m0;
    this.m[1] = m1;
    this.m[2] = m2;
    this.m[3] = m3;
    this.m[4] = m4;
    this.m[5] = m5;
};

CPTransform.prototype.getInverted = function () {
    var result = new CPTransform();

    result.m[0] = this.m[0];
    result.m[1] = this.m[1];
    result.m[2] = this.m[2];
    result.m[3] = this.m[3];
    result.m[4] = this.m[4];
    result.m[5] = this.m[5];

    result.invert();

    return result;
};

/**
 * Multiply this transform by a rotation matrix for the given angle:
 *
 * [ cos(a) -sin(a) 0]
 * [ sin(a)  cos(a) 0]
 * [   0       0    1]
 */
CPTransform.prototype.rotate = function (rad) {
    var c = Math.cos(rad),
        s = Math.sin(rad),
        m11 = this.m[0] * c + this.m[2] * s,
        m12 = this.m[1] * c + this.m[3] * s,
        m21 = this.m[0] * -s + this.m[2] * c,
        m22 = this.m[1] * -s + this.m[3] * c;

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
};

CPTransform.prototype.rotateAroundPoint = function (rad, x, y) {
    this.translate(x, y);
    this.rotate(rad);
    this.translate(-x, -y);
};

/**
 * Multiply this transform by a translation matrix:
 *
 * [1  0  x]
 * [0  1  y]
 * [0  0  1]
 *
 * @param x
 * @param y
 */
CPTransform.prototype.translate = function (x, y) {
    this.m[4] += this.m[0] * x + this.m[2] * y;
    this.m[5] += this.m[1] * x + this.m[3] * y;
};

/**
 * Multiply this transform by a scale matrix:
 *
 * [sx 0  0]
 * [0  sy 0]
 * [0  0  1]
 *
 * @param sx
 * @param sy
 */
CPTransform.prototype.scale = function (sx, sy) {
    this.m[0] *= sx;
    this.m[1] *= sx;
    this.m[2] *= sy;
    this.m[3] *= sy;
};

CPTransform.prototype.scaleAroundPoint = function (sx, sy, px, py) {
    this.translate(px, py);
    this.scale(sx, sy);
    this.translate(-px, -py);
};

/**
 * Multiply this transform by a shear matrix:
 *
 * [1  sx 0]
 * [sy 1  0]
 * [0  0  1]
 *
 * @param sx
 * @param sy
 */
CPTransform.prototype.shear = function (x, y) {
    var m11 = this.m[0] + this.m[2] * y,
        m12 = this.m[1] + this.m[3] * y,
        m21 = this.m[2] + this.m[0] * x,
        m22 = this.m[3] + this.m[1] * x;

    this.m[0] = m11;
    this.m[1] = m12;
    this.m[2] = m21;
    this.m[3] = m22;
};

CPTransform.prototype.getTransformedPoint = function (p) {
    return {
        x: p.x * this.m[0] + p.y * this.m[2] + this.m[4],
        y: p.x * this.m[1] + p.y * this.m[3] + this.m[5]
    };
};

CPTransform.prototype.transformPoints = function (points) {
    for (var i = 0; i < points.length; i++) {
        points[i] = this.getTransformedPoint(points[i]);
    }
};

CPTransform.prototype.getTranslateX = function () {
    return this.m[4];
};

CPTransform.prototype.getTranslateY = function () {
    return this.m[5];
};

CPTransform.prototype.clone = function () {
    var result = new CPTransform();

    result.m[0] = this.m[0];
    result.m[1] = this.m[1];
    result.m[2] = this.m[2];
    result.m[3] = this.m[3];
    result.m[4] = this.m[4];
    result.m[5] = this.m[5];

    return result;
};

CPTransform.prototype.getDeterminant = function () {
    return this.m[0] * this.m[3] - this.m[1] * this.m[2];
};

/**
 * Break down the matrix into a translation, scale, rotation, then shear operation.
 *
 * x or y scale must not be zero.
 *
 * http://www.maths-informatique-jeux.com/blog/frederic/?post/2013/12/01/Decomposition-of-2D-transform-matrices
 */
CPTransform.prototype.decompose = function () {
    var determinant = this.getDeterminant(),
        r = Math.sqrt(this.m[0] * this.m[0] + this.m[1] * this.m[1]);

    return {
        translate: { x: this.m[4], y: this.m[5] },
        rotate: Math.sign(this.m[1]) * Math.acos(this.m[0] / r),
        scale: { x: r, y: determinant / r },
        shear: { x: Math.atan((this.m[0] * this.m[2] + this.m[1] * this.m[3]) / (r * r)), y: 0 }
    };
};

CPTransform.prototype.toString = function () {
    var PLACES = 2;

    return "[" + this.m[0].toFixed(PLACES) + " " + this.m[2].toFixed(PLACES) + " " + this.m[4].toFixed(PLACES) + "]\n" + "[" + this.m[1].toFixed(PLACES) + " " + this.m[3].toFixed(PLACES) + " " + this.m[5].toFixed(PLACES) + "]\n" + "[0.00 0.00 1.00]";
};

Math.sign = Math.sign || function (x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
        return x;
    }
    return x > 0 ? 1 : -1;
};
module.exports = exports["default"];

},{}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = CPVector;
/*
	ChickenPaint

	ChickenPaint is a translation of ChibiPaint from Java to JavaScript
	by Nicholas Sherlock / Chicken Smoothie.

	ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

	ChickenPaint is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	ChickenPaint is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPVector(x, y) {
	this.x = x;
	this.y = y;
}

CPVector.prototype.getLength = function () {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

/**
 *
 * @returns {CPVector} This vector for chaining
 */
CPVector.prototype.normalize = function () {
	var length = this.getLength();

	this.x /= length;
	this.y /= length;

	return this;
};

/**
 *
 * @param {CPVector} that
 */
CPVector.prototype.getDotProduct = function (that) {
	return this.x * that.x + this.y * that.y;
};

/**
 *
 * @param scaleFactor
 * @returns {CPVector} This vector for chaining
 */
CPVector.prototype.scale = function (scaleFactor) {
	this.x *= scaleFactor;
	this.y *= scaleFactor;

	return this;
};

CPVector.prototype.getScaled = function (scaleFactor) {
	var result = new CPVector(this.x, this.y);

	result.scale(scaleFactor);

	return result;
};

CPVector.prototype.getRounded = function () {
	return new CPVector(Math.round(this.x), Math.round(this.y));
};

CPVector.prototype.getTruncated = function () {
	return new CPVector(~~this.x, ~~this.y);
};

CPVector.prototype.getPerpendicular = function () {
	return new CPVector(-this.y, this.x);
};

/**
 * Add that vector to this one
 *
 * @param {CPVector} that
 * @returns {CPVector} This vector for chaining
 */
CPVector.prototype.add = function (that) {
	this.x += that.x;
	this.y += that.y;

	return this;
};

/**
 * Subtract that vector from this one
 *
 * @param {CPVector} that
 * @returns {CPVector} This vector for chaining
 */
CPVector.prototype.subtract = function (that) {
	this.x -= that.x;
	this.y -= that.y;

	return this;
};

/**
 * Get the sum of this vector and that one.
 *
 * @param {CPVector} that
 * @returns {CPVector}
 */
CPVector.prototype.getSum = function (that) {
	return new CPVector(this.x + that.x, this.y + that.y);
};

/**
 * Create a new vector by p1 - p2
 *
 * @param p1
 * @param p2
 *
 * @returns {CPVector}
 */
CPVector.subtractPoints = function (p1, p2) {
	return new CPVector(p1.x - p2.x, p1.y - p2.y);
};
module.exports = exports["default"];

},{}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = CPWacomTablet;
/*
    ChickenPaint
    
    ChickenPaint is a translation of ChibiPaint from Java to JavaScript
    by Nicholas Sherlock / Chicken Smoothie.
    
    ChibiPaint is Copyright (c) 2006-2008 Marc Schefer

    ChickenPaint is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    ChickenPaint is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChickenPaint. If not, see <http://www.gnu.org/licenses/>.
*/

function CPWacomTablet() {
    var penAPI = null,
        pluginObject,
        that = this;

    /**
     * Is the pen currently interacting with the tablet surface?
     */
    this.isPen = function () {
        var pointerType;

        if (penAPI) {
            pointerType = penAPI.pointerType;

            return pointerType == 1 /* Pen */ || pointerType == 3 /* Eraser */;
        }

        return false;
    };

    this.getPressure = function () {
        if (penAPI) {
            return penAPI.pressure;
        }

        return 1.0;
    };

    this.pluginLoaded = function () {
        console.log("Wacom tablet support loaded!");

        penAPI = pluginObject.penAPI;
    };

    this.isTabletPresent = function () {
        return !!penAPI;
    };

    /**
     * Call after the document body is ready (needs DOM to be ready for loading the Wacom plugin).
     */
    this.detectTablet = function () {
        // Chrome has dropped NPAPI support, so the Wacom plugin cannot be installed
        if (/Chrome/i.test(navigator.userAgent) && !/OPR/.test(navigator.userAgent)) {
            // Prevent an ugly "this page has tried to load a plugin which is not supported" error message
            console.log("Not attempting to load Wacom tablet plugin, since this is Chrome");
            return;
        }

        console.log("Attempting to load Wacom tablet support...");

        pluginObject = document.createElement("object");

        if ("classid" in pluginObject) {
            // IE
            pluginObject.classid = "CLSID:092dfa86-5807-5a94-bf3b-5a53ba9e5308";
        } else {
            var param = document.createElement("param");

            param.name = "onload";
            param.value = "onWacomPluginLoaded";

            pluginObject.appendChild(param);

            pluginObject.type = "application/x-wacomtabletplugin";
        }

        pluginObject.style.position = "absolute";
        pluginObject.style.visibility = "hidden";
        pluginObject.onload = "onWacomPluginLoaded";

        document.body.appendChild(pluginObject);

        setTimeout(function () {
            if (!that.isTabletPresent()) {
                console.log("Looks like the Wacom plugin isn't installed, or failed to load.");
            }
        }, 5000);
    };
}

CPWacomTablet.getRef = function () {
    if (CPWacomTablet.instance == null) {
        CPWacomTablet.instance = new CPWacomTablet();
    }
    return CPWacomTablet.instance;
};

window.onWacomPluginLoaded = function () {
    CPWacomTablet.getRef().pluginLoaded();
};
module.exports = exports["default"];

},{}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.throttle = throttle;
exports.debounce = debounce;
/*!
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery throttle / debounce: Sometimes, less is more!
//
// *Version: 1.1, Last updated: 3/7/2010*
// 
// Project Home - http://benalman.com/projects/jquery-throttle-debounce-plugin/
// GitHub       - http://github.com/cowboy/jquery-throttle-debounce/
// Source       - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.js
// (Minified)   - http://github.com/cowboy/jquery-throttle-debounce/raw/master/jquery.ba-throttle-debounce.min.js (0.7kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// Throttle - http://benalman.com/code/projects/jquery-throttle-debounce/examples/throttle/
// Debounce - http://benalman.com/code/projects/jquery-throttle-debounce/examples/debounce/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - none, 1.3.2, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome 4-5, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-throttle-debounce/unit/
// 
// About: Release History
// 
// 1.1 - (3/7/2010) Fixed a bug in <jQuery.throttle> where trailing callbacks
//       executed later than they should. Reworked a fair amount of internal
//       logic as well.
// 1.0 - (3/6/2010) Initial release as a stand-alone project. Migrated over
//       from jquery-misc repo v0.4 to jquery-throttle repo v1.0, added the
//       no_trailing throttle parameter and debounce functionality.

// Method: throttle
//
// Throttle execution of a function. Especially useful for rate limiting
// execution of handlers on events like resize and scroll. If you want to
// rate-limit execution of a function to a single time, see the
// <jQuery.debounce> method.
//
// In this visualization, | is a throttled-function call and X is the actual
// callback execution:
//
// > Throttled with `no_trailing` specified as false or unspecified:
// > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
// > X    X    X    X    X    X        X    X    X    X    X    X
// >
// > Throttled with `no_trailing` specified as true:
// > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
// > X    X    X    X    X             X    X    X    X    X
//
// Usage:
//
// > var throttled = jQuery.throttle( delay, [ no_trailing, ] callback );
// >
// > jQuery('selector').bind( 'someevent', throttled );
// > jQuery('selector').unbind( 'someevent', throttled );
//
// This also works in jQuery 1.4+:
//
// > jQuery('selector').bind( 'someevent', jQuery.throttle( delay, [ no_trailing, ] callback ) );
// > jQuery('selector').unbind( 'someevent', callback );
//
// Arguments:
//
//  delay - (Number) A zero-or-greater delay in milliseconds. For event
//    callbacks, values around 100 or 250 (or even higher) are most useful.
//  no_trailing - (Boolean) Optional, defaults to false. If no_trailing is
//    true, callback will only execute every `delay` milliseconds while the
//    throttled-function is being called. If no_trailing is false or
//    unspecified, callback will be executed one final time after the last
//    throttled-function call. (After the throttled-function has not been
//    called for `delay` milliseconds, the internal counter is reset)
//  callback - (Function) A function to be executed after delay milliseconds.
//    The `this` context and all arguments are passed through, as-is, to
//    `callback` when the throttled-function is executed.
//
// Returns:
//
//  (Function) A new, throttled, function.

function throttle(delay, no_trailing, callback, debounce_mode) {
	// After wrapper has stopped being called, this timeout ensures that
	// `callback` is executed at the proper times in `throttle` and `end`
	// debounce modes.
	var timeout_id,


	// Keep track of the last time `callback` was executed.
	last_exec = 0;

	// `no_trailing` defaults to falsy.
	if (typeof no_trailing !== 'boolean') {
		debounce_mode = callback;
		callback = no_trailing;
		no_trailing = undefined;
	}

	// The `wrapper` function encapsulates all of the throttling / debouncing
	// functionality and when executed will limit the rate at which `callback`
	// is executed.
	function wrapper() {
		var that = this,
		    elapsed = +new Date() - last_exec,
		    args = arguments;

		// Execute `callback` and update the `last_exec` timestamp.
		function exec() {
			last_exec = +new Date();
			callback.apply(that, args);
		}

		// If `debounce_mode` is true (at_begin) this is used to clear the flag
		// to allow future `callback` executions.
		function clear() {
			timeout_id = undefined;
		}

		if (debounce_mode && !timeout_id) {
			// Since `wrapper` is being called for the first time and
			// `debounce_mode` is true (at_begin), execute `callback`.
			exec();
		}

		// Clear any existing timeout.
		timeout_id && clearTimeout(timeout_id);

		if (debounce_mode === undefined && elapsed > delay) {
			// In throttle mode, if `delay` time has been exceeded, execute
			// `callback`.
			exec();
		} else if (no_trailing !== true) {
			// In trailing throttle mode, since `delay` time has not been
			// exceeded, schedule `callback` to execute `delay` ms after most
			// recent execution.
			//
			// If `debounce_mode` is true (at_begin), schedule `clear` to execute
			// after `delay` ms.
			//
			// If `debounce_mode` is false (at end), schedule `callback` to
			// execute after `delay` ms.
			timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
		}
	}

	// Return the wrapper function.
	return wrapper;
}

// Method: jQuery.debounce
//
// Debounce execution of a function. Debouncing, unlike throttling,
// guarantees that a function is only executed a single time, either at the
// very beginning of a series of calls, or at the very end. If you want to
// simply rate-limit execution of a function, see the <jQuery.throttle>
// method.
//
// In this visualization, | is a debounced-function call and X is the actual
// callback execution:
//
// > Debounced with `at_begin` specified as false or unspecified:
// > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
// >                          X                                 X
// >
// > Debounced with `at_begin` specified as true:
// > ||||||||||||||||||||||||| (pause) |||||||||||||||||||||||||
// > X                                 X
//
// Usage:
//
// > var debounced = jQuery.debounce( delay, [ at_begin, ] callback );
// >
// > jQuery('selector').bind( 'someevent', debounced );
// > jQuery('selector').unbind( 'someevent', debounced );
//
// This also works in jQuery 1.4+:
//
// > jQuery('selector').bind( 'someevent', jQuery.debounce( delay, [ at_begin, ] callback ) );
// > jQuery('selector').unbind( 'someevent', callback );
//
// Arguments:
//
//  delay - (Number) A zero-or-greater delay in milliseconds. For event
//    callbacks, values around 100 or 250 (or even higher) are most useful.
//  at_begin - (Boolean) Optional, defaults to false. If at_begin is false or
//    unspecified, callback will only be executed `delay` milliseconds after
//    the last debounced-function call. If at_begin is true, callback will be
//    executed only at the first debounced-function call. (After the
//    throttled-function has not been called for `delay` milliseconds, the
//    internal counter is reset)
//  callback - (Function) A function to be executed after delay milliseconds.
//    The `this` context and all arguments are passed through, as-is, to
//    `callback` when the debounced-function is executed.
//
// Returns:
//
//  (Function) A new, debounced, function.

function debounce(delay, at_begin, callback) {
	return callback === undefined ? throttle(delay, at_begin, false) : throttle(delay, callback, at_begin !== false);
}

},{}]},{},[1])(1)
});