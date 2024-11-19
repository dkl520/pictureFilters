"use strict";
var canvas;
var gl;
var program;
var fragmentName = "fragment-shader-orginal";
class WebglModel {
    constructor() {
        this.programList = null;
        this.loader = null;
        this.drawer = null;
        this.controller = null;
        this.init();
    }
    init() {
        this.programList = new Map();
        program = initShaders(gl, "vertex-shader", fragmentName);
        gl.useProgram(program);
        this.loader = new Loader();
        this.drawer = new Draw(this.loader);
        // this.drawer.drawAll();
        this.controller = new Controller(this.programList, this.loader, this.drawer)
    }
}
window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext('webgl2');
    if (!gl) { alert("WebGL 2.0 isn't available"); }
    gl.enable(gl.DEPTH_TEST);
    // gl.clearColor(1.0, 1.0, 1.0, 1.0);
    let webglModel = new WebglModel()
    webglModel.init();
}
