import esbuild from 'esbuild';

const config = {
    entryPoints: ['./index.ts'],
    outfile: 'index.js',
    sourcemap: false,
    target: ['esnext'],
    format: 'esm'
};

const minConfig = Object.assign({}, config, {
    outfile: 'index.min.js',
    sourcemap: true,
    minify: true,
    mangleProps: /^_/
})

try {
    esbuild.build(minConfig);
    esbuild.build(config);
} catch(err) {
    throw err;
}