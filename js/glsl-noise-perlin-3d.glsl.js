const noiseFunction = `
uniform float u_screenWidth;
#define M_PI 3.14159265358979323846

float rand(vec3 c) {
    return fract(sin(dot(c, vec3(12.9898, 78.233, 54.53))) * 43758.5453);
}

float noise(vec2 p, float freq ){
    float unit = u_screenWidth/freq;
    vec2 ij = floor(p/unit);
    vec2 xy = mod(p,unit)/unit;
    //xy = 3.*xy*xy-2.*xy*xy*xy;
    xy = .5*(1.-cos(M_PI*xy));
    vec2 ab = vec2(rand(vec3(ij, freq)), rand(vec3(ij + vec2(1.0, 0.0), freq)));
    vec2 cd = vec2(rand(vec3(ij + vec2(0.0, 1.0), freq)), rand(vec3(ij + vec2(1.0, 1.0), freq)));
    vec2 x1x2 = mix(ab, cd, xy.y);
    return mix(x1x2.x, x1x2.y, xy.x);
}

float pNoise(vec2 p, int res) {
    float persistance = .5;
    float n = 0.;
    float normK = 0.;
    float f = 4.;
    float amp = 1.;
    int iCount = 0;    
	for (int i = 0; i < 50; i++) {
        n += amp * noise(p, f);
        f *= 2.0;
        normK += amp;
        amp *= persistance;
        if (iCount == res) break;
        iCount++;
    }
    float nf = n / normK;
    return nf * nf * nf * nf;
}

`;

export default noiseFunction;
