# glfx-lsiten
## 介绍
glfx是使用webgl的滤镜，目前包含色调滤镜，模糊滤镜，布朗尼效果滤镜，锐化，饱和度，对比度，去饱和度，去饱和黑白，边缘检测，浮雕，柯达胶片滤镜，棕褐滤镜，鲜明滤镜，复古滤镜。

## 使用

### 1、色调

```
gl.addShader({
   name: 'hue',
   params: 30
})
```

### 2、亮度

```
gl.addShader({
   name: 'brightness',
   params: .3
})
```
### 3、模糊

```
 gl.addShader({
    name: 'blur',
    params: {
      size: 2,
      width: 200,
      height: 200
    }
 })
```
### 4、布朗尼效果

```
gl.addShader({
   name: 'brownie',
   params: 3
})
```
### 5、对比度

```
gl.addShader({
   name: 'contrast',
   params: 2
})
```
### 6、去饱和度

```
gl.addShader({
   name: 'desaturate'
})
```
### 7、去饱和黑白

```
gl.addShader({
   name: 'desaturateLuminance'
})
```
### 8、边缘检测

```
gl.addShader({
    name: 'detectEdges',
    params: {
      ratio: 2,
      width: 200,
      height: 200
    }
 })

```
### 9、浮雕

```
gl.addShader({
    name: 'emboss',
    params: {
      ratio: 2,
      width: 200,
      height: 200
    }
 })
```

### 10、柯达胶片

```
gl.addShader({
   name: 'kodachrome',
   params: 2
})
```

### 11、饱和度

```
gl.addShader({
   name: 'saturation',
   params: 2
})
```


### 12、棕褐

```
gl.addShader({
   name: 'sepia',
   params: 2
})
```


### 13、锐化

```
gl.addShader({
    name: 'sharpen',
    params: {
      ratio: 2,
      width: 200,
      height: 200
    }
 })
```

### 14、鲜明

```
gl.addShader({
   name: 'technicolor',
   params: 2
})
```

### 15、复古

```
gl.addShader({
   name: 'vintagePinhole'
})
```


## 项目启动

```
// 安装依赖
npm i
// 启动项目
npm run dev
```

