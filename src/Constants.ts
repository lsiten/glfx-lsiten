import defaultShader from './shaders/default'
import hue from './fliters/hue'
import brightness from './fliters/brightness'
import blur from './fliters/blur'
import brownie from './fliters/brownie'
import contrast from './fliters/contrast'
import desaturate from './fliters/desaturate'
import desaturateLuminance from './fliters/desaturateLuminance'
import detectEdges from './fliters/detectEdges'
import emboss from './fliters/emboss'
import kodachrome from './fliters/kodachrome'
import negative from './fliters/negative'
import saturation from './fliters/saturation'
import sepia from './fliters/sepia'
import sharpen from './fliters/sharpen'
import technicolor from './fliters/technicolor'
import vintagePinhole from './fliters/vintagePinhole'

import * as wegl from './webgl'
// 着色器信息
export const shaderList:any = {
  // 默认，不家滤镜
  default: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: (fragment:string, vertex:string, options: any []): any => {
      let shaders:wegl.shaderSource [] = []
      shaders.push({
        type: wegl.shaderTypes.FRAGMENT_SHADER,
        source: fragment
      })
      shaders.push({
        type: wegl.shaderTypes.VERTEX_SHADER,
        source: vertex
      })
      return {shaders: shaders}
    }
  },
  /**
   * 色调
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'hue',
   *    params: 30
   * })
   */
  hue: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: hue
  },
  /**
   * 亮度
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'brightness',
   *    params: .3
   * })
   */
  brightness: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: brightness
  },
  /**
   * 模糊
   * 使用：
   * 参数：
   *   @options {size:number, width:number, height:number} 
   * 实例：
   * gl.addShader({
   *    name: 'blur',
   *    params: {
   *     size: 2,
   *     width: 200,
   *     height: 200
   *   }
   * })
   */
  blur: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: blur
  },
  /**
   * 布朗尼效果
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'brownie',
   *    params: 3
   * })
   */
  brownie: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: brownie
  },
  /**
   * 对比度
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'contrast',
   *    params: 2
   * })
   */
  contrast: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: contrast
  },
  /**
   * 去饱和度
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'desaturate'
   * })
   */
  desaturate: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: desaturate
  },
  /**
   * 去饱和黑白
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'desaturateLuminance'
   * })
   */
  desaturateLuminance: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: desaturateLuminance
  },
  /**
   * 边缘检测
   * 使用：
   * 参数：
   *   @options {ratio:number, width:number, height:number} 
   * 实例：
   * gl.addShader({
   *    name: 'detectEdges',
   *    params: {
   *     ratio: 2,
   *     width: 200,
   *     height: 200
   *   }
   * })
   */
  detectEdges: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: detectEdges
  },
  /**
   * 浮雕
   * 使用：
   * 参数：
   *   @options {size}:number, width:number, height:number} 
   * 实例：
   * gl.addShader({
   *    name: 'emboss',
   *    params: {
   *     ratio: 2,
   *     width: 200,
   *     height: 200
   *   }
   * })
   */
  emboss: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: emboss
  },
  /**
   * 柯达胶片
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'kodachrome',
   *    params: 2
   * })
   */
  kodachrome: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: kodachrome
  },
  // 
  negative: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: negative
  },
  /**
   * 饱和度
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'saturation',
   *    params: 2
   * })
   */
  saturation: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: saturation
  },
  /**
   * 棕褐
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'sepia',
   *    params: 2
   * })
   */
  sepia: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: sepia
  },
  /**
   * 锐化
   * 使用：
   * 参数：
   *   @options {amount:number, width:number, height:number} 
   * 实例：
   * gl.addShader({
   *    name: 'sharpen',
   *    params: {
   *     ratio: 2,
   *     width: 200,
   *     height: 200
   *   }
   * })
   */
  sharpen: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: sharpen
  },
  /**
   * 鲜明
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'technicolor',
   *    params: 2
   * })
   */
  technicolor: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: technicolor
  },
  /**
   * 复古
   * 使用：
   * 参数：
   *   @options number
   * 实例：
   * gl.addShader({
   *    name: 'vintagePinhole'
   * })
   */
  vintagePinhole: {
    fragment: defaultShader.fragment,
    vertex: defaultShader.vertex,
    process: vintagePinhole
  }
}