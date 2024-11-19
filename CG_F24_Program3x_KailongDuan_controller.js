class Controller {
    constructor(programList,loader, drawer) {
        this.programList = programList;
        this.loader = loader;
        this.drawer = drawer;
        this.form = document.getElementById('radioForm');
        this.fileInput = document.getElementById('fileInput');
        this.initEventListeners();
    }
    initEventListeners() {
        this.form.addEventListener('change', this.handleFormChange.bind(this));
        this.form.addEventListener('input', this.handleFormInput.bind(this));
        this.fileInput.onchange = this.handleFileInput.bind(this);
    }
    handleFormChange(event) {
        if (event.target.name === "color") {
            this.handleShaderChange(event);
        } else {
            this.handleValueChange(event);
        }
    }
    handleFormInput(event) {
        if (event.target.name !== "color") {
            this.handleValueChange(event);
        }
    }
    handleShaderChange(event) {
         fragmentName = event.target.value;
         program = this.programList.get(fragmentName);
        if (program == null) {
            program = initShaders(gl, "vertex-shader", fragmentName);
            this.programList.set(fragmentName,program);
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
            this.loader.curMatrix=this.loader.halftonePattern16x16;
        }
    }
    handleValueChange(event) {
        this.loader[event.target.name] = event.target.value;
    }
    handleFileInput(event) {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = (e) => this.handleFileLoad(e);
        fileReader.readAsArrayBuffer(file);
        event.target.value = '';
    }
    handleFileLoad(event) {
        const blob = new Blob([event.target.result]);
        const imageUrl = URL.createObjectURL(blob);
        const resultImage = new Image();
        resultImage.onload = () => this.processLoadedImage(resultImage, imageUrl);
        resultImage.src = imageUrl;
    }
    processLoadedImage(image, imageUrl) {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");
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