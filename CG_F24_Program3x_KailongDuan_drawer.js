class Draw {
    constructor(loader) {
        this.loader = loader;
    }
    createBuffer() {
        let vertices = this.loader.vertices;
        let textureCoords = this.loader.textureCoords;
        let textureMap = this.loader.textureMap;
        var vBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
        var positionLoc = gl.getAttribLocation(program, "aPosition");
        gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLoc);
        var tBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(textureCoords), gl.STATIC_DRAW);
        var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
        gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(texCoordLoc);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureMap);
        var samplerLoc = gl.getUniformLocation(program, "uTexMap");
        gl.uniform1i(samplerLoc, 0);
    }
    draw() {
        gl.uniform2f(gl.getUniformLocation(program, 'uResolution'), gl.canvas.width, gl.canvas.height);
        if (fragmentName == "fragment-shader-halftone") {
            const dotSizeLocation = gl.getUniformLocation(program, 'uDotSize');
            gl.uniform1f(dotSizeLocation, this.loader.dotSize);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, this.loader.createHalftoneTexture());
            gl.uniform1i(gl.getUniformLocation(program, 'uHalftoneTex'), 1);
        }
        if (fragmentName == "fragment-shader-blur") {
            gl.uniform1f(gl.getUniformLocation(program, 'uBlurChange'), this.loader.blurChange);
            gl.uniform1f(gl.getUniformLocation(program, 'uBlurStrength'), this.loader.blurStrength);
        }
        if (fragmentName == "fragment-shader-sabedge") {
            gl.uniform1f(gl.getUniformLocation(program, 'uEdgeStrength'), this.loader.edgeStrength);
        }
        if (fragmentName == "fragment-shader-cartoon") {
            gl.uniform1f(gl.getUniformLocation(program, 'uCartoonLevels'), this.loader.cartoonLevels);
        }
        if (fragmentName == "fragment-shader-wave") {
            gl.uniform1f(gl.getUniformLocation(program, 'uWaveStrength'), this.loader.waveStrength);
            gl.uniform1f(gl.getUniformLocation(program, 'uWaveFrequency'), this.loader.waveFrequency);
            gl.uniform1f(gl.getUniformLocation(program, 'uSwirlStrength'), this.loader.swirlStrength);
        }
        if (fragmentName == "fragment-shader-emboss") {
            gl.uniform1f(gl.getUniformLocation(program, 'uEmbossStrength'), this.loader.embossStrength);
        }
        if (fragmentName == "fragment-shader-nightvision") {
            gl.uniform1f(gl.getUniformLocation(program, 'uNightVisionStrength'), this.loader.nightVisionStrength);
        }
        if (fragmentName == "fragment-shader-mosaic") {
            gl.uniform1f(gl.getUniformLocation(program, 'uMosaicSize'), this.loader.mosaicSize);
        }
        if (fragmentName == "fragment-shader-fisheye") {
            gl.uniform1f(gl.getUniformLocation(program, 'uFisheyeStrength'), this.loader.fisheyeStrength);
        }
        if (fragmentName == "fragment-shader-oldpicture") {
            gl.uniform1f(gl.getUniformLocation(program, 'uOldpictureStrength'), this.loader.oldpictureStrength);
        }
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, this.loader.vertices.length);
    }
    drawAll = () => {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.createBuffer();
        this.draw();
        requestAnimationFrame(() => this.drawAll());
    }
}
