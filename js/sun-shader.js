import * as THREE from './three.module.js';
import noiseFunction from './glsl-noise-perlin-3d.glsl.js';

console.log(THREE);
	const SunShader = {
	  uniforms: {
		"u_time": { value: 1.0 },
		"u_resolution": { value: new THREE.Vector2() },
		"u_sunColor": { value: new THREE.Color(0xffcc00) },
		"u_screenWidth": { value: window.innerWidth } // Add this line
	  },
	  vertexShader: `
		varying vec2 v_uv;

		void main() {
		  v_uv = uv;
		  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	  `,
	  fragmentShader: `
  ${noiseFunction} // Include the noise function

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec3 u_sunColor;

  varying vec2 v_uv;

  void main() {
	vec2 st = v_uv;
  
	// Add a radial gradient to simulate the star's brightness
	float brightness = 1.0 - smoothstep(0.0, 1.0, length(st - vec2(0.5)));
  
	// Animate the star's surface with a Perlin noise function
	float noise = pNoise(st * 80.0, 6) * 0.5 + 0.5;
	float starSurface = mix(0.3, 1.0, noise);
  
	// Adjust the core brightness and color
	vec3 coreColor = vec3(1.0, 0.85, 0.6);
	vec3 color = mix(u_sunColor, coreColor, starSurface) * brightness;
  
	// Add some small bright spots
	float spots = pNoise(st * 200.0, 6);
	float spotThreshold = 0.97;
	vec3 spotColor = vec3(1.0);
	color = mix(color, spotColor, step(spotThreshold, spots));
  
	gl_FragColor = vec4(color, 1.0);
  }
  
  
`
	};



export { SunShader };