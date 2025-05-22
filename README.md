# aciiart

## Customizable ASCII Art Generator

Convert text or images into ASCII art instantly, offline and creatively.

### Installation

```bash
git clone https://github.com/Reddy6812/aciiart.git
cd aciiart
npm install
chmod +x index.js
```

### Usage

#### Text to ASCII

```bash
node index.js --text "Hello, World!" --font Standard --width 100
```

#### Image to ASCII

```bash
node index.js --image path/to/image.jpg --width 80
```

### Options

- `-t, --text <text>`: Provide text to convert.
- `-i, --image <path>`: Provide image file path to convert.
- `-w, --width <number>`: Width of the ASCII output (default: 80).
- `-f, --font <font>`: Font for text output (default: Standard).

### License

MIT License