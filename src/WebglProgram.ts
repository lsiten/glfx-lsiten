import {
  shaderList
} from './Constants'
import * as webgl from './webgl'
export default class WebglProgram {
  static _gl:any
  static _canvas:any
  shaders: webgl.shader[] = []
  width:number = 0
  height:number = 0
  vertexBuffer:any
  tempFramebuffers:any []
  sourceTexture: any
  currentProgram:any
  lastInChain:boolean = false

  drawCount:number
  currentFramebufferIndex: number = -1
  constructor (options:webgl.options) {
    this._initConfigs(options)
    this._initWebgl()
  }
  /**
   * 
   * @param {shaders} 滤镜类型 
   */
  _initConfigs ({shaders}:webgl.options) {
    if (shaders) {
      if ((<webgl.shader>shaders).name) {
        this.shaders.push(<webgl.shader>shaders)
      } else {
        (<webgl.shader[]>shaders).length && (this.shaders = [...this.shaders, ...(<webgl.shader[]>shaders)])
      }
    } else {
      // this.shaders.push({
      //   name: 'default'
      // })
    }
  }
  /**
   * 初始化webgl
   */
  _initWebgl () {
    try {
      WebglProgram._canvas = document.createElement('canvas')
      WebglProgram._gl = WebglProgram._canvas.getContext('webgl') || WebglProgram._canvas.getContext('experimental-webgl')
    } catch (e) {
      console.log(e)
    }
    if (!WebglProgram._gl) {
      console.log('Could not initialise WebGL, sorry :-(')
    }
  }

  /**
   * 
   * @param type 着色器类型
   * @param source 着色器源码
   */
  _getShader (type:webgl.shaderTypes, source:string) {
    const gl = WebglProgram._gl
    // 步骤一创建着色器对象
    let shader = type === webgl.shaderTypes.FRAGMENT_SHADER ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER)
    // 步骤二，为着色器对象填充代码
    gl.shaderSource(shader, source)
    // 步骤三，编译着色器对象
    gl.compileShader(shader)
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.log(gl.getShaderInfoLog(shader))
      return null
    }
    return shader
  }

  /**
   * 生成program
   */
  _gennerateProgram () {
    const gl = WebglProgram._gl
    const shaderProgram = gl.createProgram()
    return shaderProgram
  }

  /**
   * 使用过程
   */
  _process (shaderItem:any, params: any) {
    const program = this._gennerateProgram()
    const gl = WebglProgram._gl
    let result:any = {}
    let shaderData = shaderItem.process(shaderItem.fragment, shaderItem.vertex, params)
    if (!shaderData) {
      return false
    }
    shaderData.shaders.map((itemShader:any) => {
      //步骤五，为程序对象分配片元着色器与顶点着色器
      gl.attachShader(program, this._getShader(itemShader.type, itemShader.source))
    })


    // 步骤6，链接着色器
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.log('Could not initialise shaders')
    }
    // 步骤7，使用这个着色器，可以使用这个函数进行多个着色器间的切换。
    gl.useProgram(program)
    
    shaderData.shaders.map((itemShader:any) => {
      let cellectTemp = this._collect(itemShader.source, itemShader.type, program)
      cellectTemp.uniform && (result.uniform ? result.uniform = {...result.uniform, ...cellectTemp.uniform} : result.uniform = cellectTemp.uniform)
      cellectTemp.attribute && (result.attribute ? result.attribute = {...result.attribute, ...cellectTemp.attribute} : result.attribute = cellectTemp.attribute)
    })

    result.id = program

    let floatSize = Float32Array.BYTES_PER_ELEMENT
    let vertSize = 4 * floatSize
    gl.enableVertexAttribArray(result.attribute.pos)
    gl.vertexAttribPointer(result.attribute.pos, 2, gl.FLOAT, false, vertSize , 0 * floatSize)
    gl.enableVertexAttribArray(result.attribute.uv)
    gl.vertexAttribPointer(result.attribute.uv, 2, gl.FLOAT, false, vertSize, 2 * floatSize)

    typeof shaderData.cb === 'function' && shaderData.cb(gl, result)
    return result
  }
 /**
  * 重置canvas宽高
  */
  _resize (width:number, height:number) {
    if (width === this.width && height === this.height) {
      return false
    }

    const canvas = WebglProgram._canvas
    const gl = WebglProgram._gl

    canvas.width = this.width = width
    canvas.height = this.height = height

    // Create the context if we don't have it yet
    if( !this.vertexBuffer ) {
      // Create the vertex buffer for the two triangles [x, y, u, v] * 6
      let vertices = new Float32Array([
        -1, -1, 0, 1,
        1, -1, 1, 1,
        -1, 1, 0, 0,
        -1, 1, 0, 0,
        1, -1, 1, 1,
        1, 1, 1, 0
      ])
      this.vertexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

      // Note sure if this is a good idea; at least it makes texture loading
      // in Ejecta instant.
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
    }

    gl.viewport(0, 0, this.width, this.height)

    // Delete old temp framebuffers
    this.tempFramebuffers = [null, null]
  }

  /**
   * 获取glsl参数
   * @param source glsl字符串
   * @param type 着色器类型
   * @param program gl 的program
   */
  _collect (source:string, type:webgl.shaderTypes, program:any) {
    let collection:any = {}
    const gl = WebglProgram._gl
    
    if (type === webgl.shaderTypes.VERTEX_SHADER) {
      let prefix = 'attribute'
      let r = new RegExp('\\b' + prefix + ' \\w+ (\\w+)', 'ig')
      collection['attribute'] = {} 
      source.replace(r, function(match, name) {
        collection['attribute'][name] = gl.getAttribLocation(program, name)
        return match
      })
      prefix = 'uniform'
      r = new RegExp('\\b' + prefix + ' \\w+ (\\w+)', 'ig')
      collection['uniform'] = {} 
      source.replace(r, function(match, name) {
        collection['uniform'][name] = gl.getUniformLocation(program, name)
        return match
      })
    } else {
      let prefix = 'uniform'
      let r = new RegExp('\\b' + prefix + ' \\w+ (\\w+)', 'ig')
      collection['uniform'] = {} 
      source.replace(r, function(match, name) {
        collection['uniform'][name] = gl.getUniformLocation(program, name)
        return match
      })
    }
    return collection
  }

  /**
   * 生成framebuffer
   * @param width 图片宽度
   * @param height 图片高度
   */
  _createFramebufferTexture (width:number, height:number) {
    const gl = WebglProgram._gl
    let fbo = gl.createFramebuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)

    let renderbuffer = gl.createRenderbuffer()
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer)

    let texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

    gl.bindTexture(gl.TEXTURE_2D, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    return {fbo: fbo, texture: texture}
  }

  /**
   *  获取framebuffer的缓存
   * @param index framebuffer的缓存id
   */
  _getTempFramebuffer (index:number) {
    this.tempFramebuffers[index] = this.tempFramebuffers[index] || this._createFramebufferTexture(this.width, this.height)
    return this.tempFramebuffers[index]
  }

  _draw () {
    const gl = WebglProgram._gl
    let source:any
    let target:any
    let flipY:boolean = false

    // Set up the source
    if( this.drawCount == 0 ) {
      // First draw call - use the source texture
      source = this.sourceTexture
    } else {
      // All following draw calls use the temp buffer last drawn to
      source =  this._getTempFramebuffer(this.currentFramebufferIndex).texture
    }
    this.drawCount++
    if (this.lastInChain) {
      target = null
      flipY = this.drawCount % 2 === 0
    } else {
      this.currentFramebufferIndex = (this.currentFramebufferIndex + 1) % 2
      target = this._getTempFramebuffer(this.currentFramebufferIndex).fbo
    }

    gl.bindTexture(gl.TEXTURE_2D, source)
    gl.uniform1f(this.currentProgram.uniform.flipY, (flipY ? -1 : 1) )
    gl.bindFramebuffer(gl.FRAMEBUFFER, target)
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }
  /**
   * 重置滤镜
   */
  reset () {
    this.shaders = []
  }
  /**
   * 添加滤镜
   * @param shader 要添加的滤镜
   */
  addShader (shader:webgl.shader) {
    if (!shader || !shader.name) {
      return false
    }
    this.shaders.push(shader)
  }
  /**
   * 图片滤镜过程
   * @param img 图片对象
   */
  apply (img:any) {
    const gl = WebglProgram._gl

    this._resize(img.width, img.height)

    this.drawCount = 0


    // Create the texture for the input image
    this.sourceTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this.sourceTexture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST) 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
    // No filters? Just draw
    if( this.shaders.length == 0 ) {
      this.lastInChain = true
      this.currentProgram = this._process(shaderList.default, {})
      if (!this.currentProgram) {
        console.log('error')
        return img
      }
      this._draw()
    } else {
      this.shaders.map((item:webgl.shader, index:number) => {
        this.lastInChain = (index === this.shaders.length - 1)
        this.currentProgram = this._process(shaderList[item.name], item.params)
        if (this.currentProgram) {
          this._draw()
        }
      })
    }
    return WebglProgram._canvas
  }
}
