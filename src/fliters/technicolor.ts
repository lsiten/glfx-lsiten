
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
  r =  r || 1
  let matrix = [
    r*1.9125277891456083,r*-0.8545344976951645,r*-0.09155508482755585,0,r*11.793603434377337,
    r*-0.3087833385928097,r*1.7658908555458428,r*-0.10601743074722245,0,r*-70.35205161461398,
    r*-0.231103377548616,r*-0.7501899197440212,r*1.847597816108189,0,r*30.950940869491138,
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