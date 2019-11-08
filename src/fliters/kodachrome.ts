
import {
  shaderSource,
  shaderTypes
} from '../webgl'
import colorShader from '../shaders/colorMatrix'
export default (fragment:string, vertex:string, options: number) => {
  let r = Number(options)
  if (r === NaN) {
    return false
  }

  r = (r || 0)
  let matrix = [
    r*1.1285582396593525,r*-0.3967382283601348,r*-0.03992559172921793,r*0,63.72958762196502,
    r*-0.16404339962244616,r*1.0835251566291304,r*-0.05498805115633132,0,r*24.732407896706203,
    r*-0.16786010706155763,r*-0.5603416277695248,r*1.6014850761964943,0,r*35.62982807460946,
    0,0,0,r*1,0
  ]
  let shaders:shaderSource [] = []
  shaders.push({
    type: shaderTypes.FRAGMENT_SHADER,
    source: colorShader(matrix)
  })
  shaders.push({
      type: shaderTypes.VERTEX_SHADER,
      source: vertex
  })
  
  return {shaders: shaders, cb: (gl:any, program:any) => {
    let m = new Float32Array(matrix)
    m[4] /= 255
    m[9] /= 255
    m[14] /= 255
    m[19] /= 255
    gl.uniform1fv(program.uniform.m, m)
  }}
}