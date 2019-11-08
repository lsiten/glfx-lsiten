
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import blur from '../shaders/blur'
export default (fragment:string, vertex:string, {size, width = -1, height = -1}: {size: number, width?:number, height?:number}) => {
  if (!size) {
    return false
  }
  let shaders:shaderSource [] = []
  shaders.push({
    type: shaderTypes.FRAGMENT_SHADER,
    source: blur
  })
  shaders.push({
      type: shaderTypes.VERTEX_SHADER,
      source: vertex
  })
  
  return {shaders: shaders, cb: (gl:any, program:any) => {
    let blurSizeX = (size / 7) / width
    let blurSizeY = (size / 7) / height
    gl.uniform2f(program.uniform.px, 0, blurSizeY)
    gl.uniform2f(program.uniform.px, blurSizeX, 0);
  }}
}