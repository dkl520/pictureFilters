class Loader {
    constructor() {
        this.vertices = [
            vec4(-1.0, 1.0, 0.0, 1.0),
            vec4(1.0, 1.0, 0.0, 1.0),
            vec4(-1.0, -1.0, 0.0, 1.0),
            vec4(1.0, -1.0, 0.0, 1.0),
        ];
        this.textureCoords = [
            vec2(0.0, 0.0),
            vec2(1.0, 0.0),
            vec2(0.0, 1.0),
            vec2(1.0, 1.0),
        ];
        this.bayerMatrix = new Float32Array([
            0.0 / 16.0, 8.0 / 16.0, 2.0 / 16.0, 10.0 / 16.0,
            12.0 / 16.0, 4.0 / 16.0, 14.0 / 16.0, 6.0 / 16.0,
            3.0 / 16.0, 11.0 / 16.0, 1.0 / 16.0, 9.0 / 16.0,
            15.0 / 16.0, 7.0 / 16.0, 13.0 / 16.0, 5.0 / 16.0
        ]);
        this.halftonePattern16x16 = new Float32Array([
            0.0 / 256.0, 128.0 / 256.0, 32.0 / 256.0, 160.0 / 256.0, 8.0 / 256.0, 136.0 / 256.0, 40.0 / 256.0, 168.0 / 256.0,
            64.0 / 256.0, 192.0 / 256.0, 48.0 / 256.0, 176.0 / 256.0, 16.0 / 256.0, 144.0 / 256.0, 56.0 / 256.0, 184.0 / 256.0,
            2.0 / 256.0, 130.0 / 256.0, 34.0 / 256.0, 162.0 / 256.0, 10.0 / 256.0, 138.0 / 256.0, 42.0 / 256.0, 170.0 / 256.0,
            66.0 / 256.0, 194.0 / 256.0, 50.0 / 256.0, 178.0 / 256.0, 18.0 / 256.0, 146.0 / 256.0, 58.0 / 256.0, 186.0 / 256.0,
            4.0 / 256.0, 132.0 / 256.0, 36.0 / 256.0, 164.0 / 256.0, 12.0 / 256.0, 140.0 / 256.0, 44.0 / 256.0, 172.0 / 256.0,
            68.0 / 256.0, 196.0 / 256.0, 52.0 / 256.0, 180.0 / 256.0, 20.0 / 256.0, 148.0 / 256.0, 60.0 / 256.0, 188.0 / 256.0,
            1.0 / 256.0, 129.0 / 256.0, 33.0 / 256.0, 161.0 / 256.0, 9.0 / 256.0, 137.0 / 256.0, 41.0 / 256.0, 169.0 / 256.0,
            65.0 / 256.0, 193.0 / 256.0, 49.0 / 256.0, 177.0 / 256.0, 17.0 / 256.0, 145.0 / 256.0, 57.0 / 256.0, 185.0 / 256.0
        ]);
        this.dotSize = 8.0;
        this.embossStrength = 0.0;
        this.nightVisionStrength = 0.5;
        this.edgeStrength = 0.0;
        this.cartoonLevels = 6.0;
        this.oldpictureStrength = 0.0;
        this.blurChange = 0.0;
        this.blurStrength = 1;
        this.waveStrength = 20;
        this.waveFrequency = 10;
        this.swirlStrength = 2;
        this.mosaicSize = 8;
        this.fisheyeStrength = 2;
        this.resolution = null;
        this.textureMap = null;
        // this.uTexMap = this.createTexture();
        // this.resolution = this.createHalftoneTexture();
        this.curMatrix = this.bayerMatrix;
    }
    createHalftoneTexture = () => {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.R32F,  
            4, 4,
            0,
            gl.RED,
            gl.FLOAT,
            this.curMatrix
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        return texture;
    };
    createTexture(image, width, height) {
        if (!image) return;
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0,
            gl.RGBA, gl.UNSIGNED_BYTE, image);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
            gl.NEAREST_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        return texture;
    }
}