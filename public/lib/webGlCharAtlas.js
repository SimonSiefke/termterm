const TEXTURE_WIDTH = 1024
const TEXTURE_HEIGHT = 200

const CHAR_WIDTH = 12
const CHAR_HEIGHT = 15

const cacheCanvas = document.createElement('canvas')
cacheCanvas.id = 'CacheCanvas'
cacheCanvas.width = TEXTURE_WIDTH
cacheCanvas.height = TEXTURE_HEIGHT
const cacheCtx = cacheCanvas.getContext('2d')

const tmpCanvas = new OffscreenCanvas(CHAR_WIDTH, CHAR_HEIGHT)
const tmpCtx = tmpCanvas.getContext('2d', {
  // desynchronized: true, // perf
  alpha: false, // perf
})

const cache = Object.create(null)

let i = 0

const drawToCache = (char) => {
  // if (!(char in cache)) {
  tmpCtx.fillStyle = '#000000'
  tmpCtx.fillRect(0, 0, CHAR_WIDTH, CHAR_HEIGHT)
  tmpCtx.font = `${CHAR_HEIGHT}px monospace`
  tmpCtx.fillStyle = '#ffffff'
  tmpCtx.fillText(char, 0, CHAR_HEIGHT)
  cache[char] = {
    i,
  }
  cacheCtx.drawImage(
    tmpCanvas.transferToImageBitmap(),
    (i * CHAR_WIDTH) % 1024,
    0,
  )
  i = (i + 1) % 5_000
  // }
}

const draw = () => {
  for (let j = 0; j < 100; j++) {
    drawToCache(String.fromCharCode(i))
  }
}

draw()

document.body.append(cacheCanvas)

const webglCanvas = document.createElement('canvas')
webglCanvas.id = 'WebglCanvas'
webglCanvas.width = 400
webglCanvas.height = 400
document.body.append(webglCanvas)

const gl = webglCanvas.getContext('webgl2')

const atlasTexture = gl.createTexture()
gl.bindTexture(gl.TEXTURE_2D, atlasTexture)
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, cacheCanvas)

const vertexShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(
  vertexShader,
  `#version 300 es
in vec4 a_position;
in vec2 a_texcoord;

uniform mat4 u_matrix;

out vec2 v_texcoord;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;
}`,
)
gl.compileShader(vertexShader)

if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  const info = gl.getShaderInfoLog(vertexShader)
  throw new Error('Could not compile WebGL program. \n\n' + info)
}

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(
  fragmentShader,
  `#version 300 es
precision highp float;

// Passed in from the vertex shader.
in vec2 v_texcoord;

uniform sampler2D u_texture;

out vec4 outColor;

void main() {
    outColor = texture(u_texture, v_texcoord);
}`,
)
gl.compileShader(fragmentShader)

if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  const info = gl.getShaderInfoLog(fragmentShader)
  throw new Error('Could not compile WebGL program. \n\n' + info)
}

const program = gl.createProgram()
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

gl.linkProgram(program)
