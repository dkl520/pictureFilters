# Image Effects and Filters（图像效果和滤镜）

## 1. Blur Effects（模糊效果）

### Gaussian Blur（高斯模糊）
- Smooths images using Gaussian convolution kernel
- Used for noise reduction or defocus effects
- 使用高斯卷积核实现平滑图像，常用于减少噪点或创建散焦效果

### Motion Blur（动感模糊）
- Simulates camera or object movement blur
- Enhances dynamic effects
- 模拟相机或物体移动时的运动模糊，增加动态效果

## 2. Edge Detection（边缘检测）

### Sobel Operator（Sobel算子）
- Detects image edges
- Outputs high contrast images
- Used for image contour detection
- 用来检测图像中的边缘，输出高对比度图像，通常用于图像轮廓检测

## 3. Cartoon Shading（卡通着色）

### Color Simplification（简化颜色范围）
- Reduces colors to discrete values
- Simulates cartoon or hand-drawn style
- 将图像的颜色简化为几个离散的值，模拟卡通或手绘风格

## 4. Geometric Distortion（几何扭曲）

### Wave Effect（波浪效果）
- Uses vertex/fragment shaders
- Applies sine function transformation
- 通过顶点或片段着色器，将图像的纹理坐标进行正弦函数变换

### Fisheye Effect（鱼眼效果）
- Simulates wide-angle lens
- Creates convex lens distortion
- 模拟广角镜头的视觉效果，产生图像的凸透镜扭曲

### Swirl Effect（漩涡扭曲）
- Implements rotational distortion
- Creates vortex-style deformation
- 实现图像的旋转扭曲，形成漩涡或旋涡样式的变形

## 5. Dynamic Transform Control（动态变形控制）

### Real-time Scaling（实时缩放和变形）
- Slider control for magnification
- Interactive distortion intensity
- 使用滑块调整图像的放大倍数或扭曲强度

### Wave Frequency Control（波动频率控制）
- Slider for wave/sine transformation
- Controls frequency and amplitude
- 通过滑块控制波浪或正弦变形的频率和振幅

## 6. Advanced Filter Effects（高级滤镜效果）

### Emboss Effect（浮雕效果）
- Simulates carved appearance
- Uses edge detection algorithms
- 模拟浮雕雕刻的外观，通常结合边缘检测算法实现

### Night Vision Effect（夜视效果）
- Converts to green filter style
- Simulates night vision devices
- 将图像转换为夜视设备的绿色滤镜风格

### Vintage Photo Effect（老照片效果）
- Adds noise and texture
- Applies sepia filters
- 添加噪点、纹理和褐色滤镜，模拟老旧照片的视觉效果

## 7. Image Segmentation and Collage（图像分割和拼贴）

### Mosaic Effect（马赛克效果）
- Reduces resolution for pixelated look
- Creates mosaic visual effect
- 通过降低分辨率实现图像的马赛克视觉