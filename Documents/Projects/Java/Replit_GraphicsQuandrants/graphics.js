// Graphics Quadrants - JavaScript Implementation
// Based on original Java application

// Canvas setup
const canvas = document.getElementById('graphicsCanvas');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const BORDER_OFFSET = 10;

// Control elements
const shapeCountSlider = document.getElementById('shapeCount');
const shapeCountValue = document.getElementById('shapeCountValue');
const circleSizeSlider = document.getElementById('circleSize');
const circleSizeValue = document.getElementById('circleSizeValue');
const squareSizeSlider = document.getElementById('squareSize');
const squareSizeValue = document.getElementById('squareSizeValue');
const randomColorsRadio = document.getElementById('randomColors');
const customColorsRadio = document.getElementById('customColors');
const customColorControls = document.getElementById('customColorControls');
const lineColorPicker = document.getElementById('lineColor');
const circleColorPicker = document.getElementById('circleColor');
const squareColorPicker = document.getElementById('squareColor');
const regenerateBtn = document.getElementById('regenerateBtn');
const resetBtn = document.getElementById('resetBtn');

// Default settings
let settings = {
    shapeCount: 50,
    maxCircleSize: 200,
    squareSize: 50,
    colorMode: 'random',
    lineColor: '#ff0000',
    circleColor: '#00ff00',
    squareColor: '#0000ff'
};

// Event listeners for controls
shapeCountSlider.addEventListener('input', function() {
    settings.shapeCount = parseInt(this.value);
    shapeCountValue.textContent = this.value;
});

circleSizeSlider.addEventListener('input', function() {
    settings.maxCircleSize = parseInt(this.value);
    circleSizeValue.textContent = this.value;
});

squareSizeSlider.addEventListener('input', function() {
    settings.squareSize = parseInt(this.value);
    squareSizeValue.textContent = this.value;
});

randomColorsRadio.addEventListener('change', function() {
    if (this.checked) {
        settings.colorMode = 'random';
        customColorControls.style.display = 'none';
    }
});

customColorsRadio.addEventListener('change', function() {
    if (this.checked) {
        settings.colorMode = 'custom';
        customColorControls.style.display = 'block';
    }
});

lineColorPicker.addEventListener('change', function() {
    settings.lineColor = this.value;
});

circleColorPicker.addEventListener('change', function() {
    settings.circleColor = this.value;
});

squareColorPicker.addEventListener('change', function() {
    settings.squareColor = this.value;
});



regenerateBtn.addEventListener('click', drawAll);

resetBtn.addEventListener('click', function() {
    // Reset to defaults
    settings = {
        shapeCount: 50,
        maxCircleSize: 200,
        squareSize: 50,
        colorMode: 'random',
        lineColor: '#ff0000',
        circleColor: '#00ff00',
        squareColor: '#0000ff'
    };
    
    // Update UI to match
    shapeCountSlider.value = settings.shapeCount;
    shapeCountValue.textContent = settings.shapeCount;
    circleSizeSlider.value = settings.maxCircleSize;
    circleSizeValue.textContent = settings.maxCircleSize;
    squareSizeSlider.value = settings.squareSize;
    squareSizeValue.textContent = settings.squareSize;
    randomColorsRadio.checked = true;
    customColorsRadio.checked = false;
    customColorControls.style.display = 'none';
    lineColorPicker.value = settings.lineColor;
    circleColorPicker.value = settings.circleColor;
    squareColorPicker.value = settings.squareColor;
    
    drawAll();
});

// Helper function to get a random color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Setup canvas with background and dividing lines
function setupCanvas() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    
    // Draw white border and dividing lines
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    
    // Border
    ctx.strokeRect(BORDER_OFFSET, BORDER_OFFSET, WIDTH - 2 * BORDER_OFFSET, HEIGHT - 2 * BORDER_OFFSET);
    
    // Vertical dividing line
    const midX = WIDTH / 2;
    ctx.beginPath();
    ctx.moveTo(midX, BORDER_OFFSET);
    ctx.lineTo(midX, HEIGHT - BORDER_OFFSET);
    ctx.stroke();
    
    // Horizontal dividing line
    const midY = HEIGHT / 2;
    ctx.beginPath();
    ctx.moveTo(BORDER_OFFSET, midY);
    ctx.lineTo(WIDTH - BORDER_OFFSET, midY);
    ctx.stroke();
}

// Draw random lines in top-left quadrant
function drawRandomLines() {
    const quadrantWidth = WIDTH / 2 - BORDER_OFFSET;
    const quadrantHeight = HEIGHT / 2 - BORDER_OFFSET;
    
    for (let i = 0; i < settings.shapeCount; i++) {
        // Random endpoints
        const x1 = Math.floor(Math.random() * quadrantWidth) + BORDER_OFFSET;
        const y1 = Math.floor(Math.random() * quadrantHeight) + BORDER_OFFSET;
        const x2 = Math.floor(Math.random() * quadrantWidth) + BORDER_OFFSET;
        const y2 = Math.floor(Math.random() * quadrantHeight) + BORDER_OFFSET;
        
        // Set color
        if (settings.colorMode === 'random') {
            ctx.strokeStyle = getRandomColor();
        } else {
            ctx.strokeStyle = settings.lineColor;
        }
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}

// Draw random circles in bottom-left quadrant
function drawRandomCircles() {
    const quadrantWidth = WIDTH / 2 - BORDER_OFFSET;
    const quadrantHeight = HEIGHT / 2 - BORDER_OFFSET;
    const minY = HEIGHT / 2 + BORDER_OFFSET;
    
    for (let i = 0; i < settings.shapeCount; i++) {
        // Random circle size
        const size = Math.floor(Math.random() * settings.maxCircleSize) + 5;
        
        // Ensure circles stay within quadrant
        const x = Math.floor(Math.random() * (quadrantWidth - size)) + BORDER_OFFSET;
        const y = Math.floor(Math.random() * (quadrantHeight - size)) + minY;
        
        // Set color
        if (settings.colorMode === 'random') {
            ctx.strokeStyle = getRandomColor();
        } else {
            ctx.strokeStyle = settings.circleColor;
        }
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Draw squares in top-right quadrant
function drawRandomSquares() {
    const minX = WIDTH / 2 + BORDER_OFFSET;
    const quadrantWidth = WIDTH / 2 - 2 * BORDER_OFFSET;
    const quadrantHeight = HEIGHT / 2 - 2 * BORDER_OFFSET;
    
    for (let i = 0; i < settings.shapeCount; i++) {
        // Use the fixed square size from settings
        const size = settings.squareSize;
        
        // Ensure squares stay within quadrant
        const x = Math.floor(Math.random() * (quadrantWidth - size)) + minX;
        const y = Math.floor(Math.random() * (quadrantHeight - size)) + BORDER_OFFSET;
        
        // Set color and fill
        if (settings.colorMode === 'random') {
            ctx.fillStyle = getRandomColor();
        } else {
            ctx.fillStyle = settings.squareColor;
        }
        
        // Draw filled square
        ctx.fillRect(x, y, size, size);
    }
}

// Draw 3D cube in bottom-right quadrant
function draw3DCube() {
    // This implementation follows the original Java code's approach
    // Drawing detailed face-by-face with pixel-level precision
    
    // Blue face (top face)
    ctx.fillStyle = 'blue';
    for (let x = 582; x < 631; x++) {
        for (let y = 330; y < 400; y++) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 49, y + 50);
            ctx.stroke();
        }
    }
    
    // Yellow face (back face)
    ctx.fillStyle = 'yellow';
    for (let x = 530; x < 630; x++) {
        for (let y = 330; y < 430; y++) {
            ctx.fillRect(x, y, 1, 1);
        }
    }
    
    // Green face (left face)
    ctx.fillStyle = 'green';
    for (let x = 530; x < 531; x++) {
        for (let y = 330; y < 430; y++) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + 50, y + 50);
            ctx.stroke();
        }
    }
    
    // Red face (bottom face)
    ctx.fillStyle = 'red';
    for (let x = 580; x < 680; x++) {
        for (let y = 380; y < 480; y++) {
            ctx.fillRect(x, y, 1, 1);
        }
    }
    
    // Add outline for clarity
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    
    // Outline the cube faces
    ctx.beginPath();
    
    // Yellow face (back)
    ctx.moveTo(530, 330);
    ctx.lineTo(630, 330);
    ctx.lineTo(630, 430);
    ctx.lineTo(530, 430);
    ctx.lineTo(530, 330);
    
    // Connect to front face
    ctx.moveTo(530, 330);
    ctx.lineTo(580, 380);
    
    ctx.moveTo(630, 330);
    ctx.lineTo(680, 380);
    
    ctx.moveTo(630, 430);
    ctx.lineTo(680, 480);
    
    ctx.moveTo(530, 430);
    ctx.lineTo(580, 480);
    
    // Red face (bottom/front)
    ctx.moveTo(580, 380);
    ctx.lineTo(680, 380);
    ctx.lineTo(680, 480);
    ctx.lineTo(580, 480);
    ctx.lineTo(580, 380);
    
    ctx.stroke();
}

// Draw everything
function drawAll() {
    setupCanvas();
    drawRandomLines();
    drawRandomCircles();
    drawRandomSquares();
    draw3DCube();
}

// Initialize when window loads
window.onload = function() {
    // Make sure canvas is properly initialized
    if (canvas && canvas.getContext) {
        drawAll();
    } else {
        console.error('Canvas not supported or not found');
    }
};