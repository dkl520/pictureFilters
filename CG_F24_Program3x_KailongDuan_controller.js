class Controller {
    constructor(programList, loader, drawer) {
        this.programList = programList;
        this.loader = loader;
        this.drawer = drawer;
        this.form = document.getElementById('radioForm');
        this.fileInput = document.getElementById('fileInput');
        this.btn = document.getElementById("dowonload");
        this.initEventListeners();
    }
    initEventListeners() {
        this.form.addEventListener('change', this.handleFormChange);
        this.form.addEventListener('input', this.handleFormInput);
        this.fileInput.onchange = this.handleFileInput;
        this.btn.addEventListener('click', this.handlePict);
    }
    handleFormChange = (event) => {
        if (event.target.name === "color") {
            this.handleShaderChange(event);
        } else {
            this.handleValueChange(event);
        }
    }

    handlePict() {
        // var canvas = document.getElementById("gl-canvas");
        // canvas.toBlob((blob) => {
        //     const url = URL.createObjectURL(blob);
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.download = 'canvas_image.png';
        //     document.body.appendChild(link);
        //     link.click();
        //     document.body.removeChild(link);
        //     setTimeout(() => URL.revokeObjectURL(url), 100);
        // });


        var canvas = document.getElementById("gl-canvas");
        var dataURL = canvas.toDataURL('image/png');

        const img = document.createElement('img');
        img.src = dataURL;
        img.style.maxWidth = '100%';

        const tip = document.createElement('div');
        tip.textContent = '长按图片可保存到相册';

        document.body.appendChild(tip);
        document.body.appendChild(img);
    }
    captureWebGLCanvasOne() {
        const width = canvas.width;
        const height = canvas.height;
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        const imageData = tempCtx.createImageData(width, height);
        imageData.data.set(pixels);
        tempCtx.putImageData(imageData, 0, 0);

        // 现在可以使用toDataURL
        const dataURL = tempCanvas.toDataURL();
        return dataURL;
    }
    async captureWebGLCanvas() {
        const width = canvas.width;
        const height = canvas.height;
        const pixels = new Uint8Array(width * height * 4);
        gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        const flippedPixels = new Uint8Array(width * height * 4);
        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width * 4; j++) {
                flippedPixels[i * width * 4 + j] = pixels[(height - i - 1) * width * 4 + j];
            }
        }
        const imageData = new ImageData(
            new Uint8ClampedArray(flippedPixels),
            width,
            height
        );
        try {
            const bitmap = await window.createImageBitmap(imageData);
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = width;
            tempCanvas.height = height;
            const ctx = tempCanvas.getContext('2d');
            ctx.drawImage(bitmap, 0, 0);
            return tempCanvas.toDataURL();
        } catch (error) {
            console.error('创建ImageBitmap失败:', error);
            return null;
        }
    }


    handleFormInput = (event) => {
        if (event.target.name !== "color") {
            this.handleValueChange(event);
        }
    }
    handleShaderChange = (event) => {
        fragmentName = event.target.value;
        program = this.programList.get(fragmentName);
        if (program == null) {
            program = initShaders(gl, "vertex-shader", fragmentName);
            this.programList.set(fragmentName, program);
        }
        gl.useProgram(program);
        if (event.target.id === "motionBlur") {
            this.loader.blurChange = 1.0;
        } else if (event.target.id === "gaussianBlur") {
            this.loader.blurChange = 0.0;
        }
        if (event.target.id === "HalftoneBayer") {
            this.loader.curMatrix = this.loader.bayerMatrix;
        } else if (event.target.id === "halftonePattern") {
            this.loader.curMatrix = this.loader.halftonePattern16x16;
        }
    }
    handleValueChange = (event) => {
        this.loader[event.target.name] = event.target.value;
    }
    handleFileInput = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => this.handleFileLoad(e);
        fileReader.readAsArrayBuffer(file);
        event.target.value = '';
    }
    handleFileLoad = (event) => {
        const blob = new Blob([event.target.result]);
        const imageUrl = URL.createObjectURL(blob);
        const resultImage = new Image();
        resultImage.onload = () => this.processLoadedImage(resultImage, imageUrl);
        resultImage.src = imageUrl;
    }
    processLoadedImage = (image, imageUrl) => {

        const cvs = document.createElement('canvas');
        cvs.width = image.width;
        cvs.height = image.height;
        canvas.width = image.width;
        canvas.height = image.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
        const maxSize = 650;
        let width = canvas.width;
        let height = canvas.height;
        if (width > maxSize || height > maxSize) {
            if (width > height) {
                width = maxSize;
                height = (canvas.height * maxSize) / canvas.width;
            } else {
                height = maxSize;
                width = (canvas.width * maxSize) / canvas.height;
            }
        }
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;


        const ctx = cvs.getContext("2d");
        try {
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const imageData = ctx.getImageData(0, 0, image.width, image.height);
            this.loader.textureMap = this.loader.createTexture(imageData, image.width, image.height);
            this.drawer.drawAll();
        } catch (error) {
            console.error("Error processing image:", error);
        } finally {
            setTimeout(() => {
                URL.revokeObjectURL(imageUrl);
            }, 0);
        }
    }
}