// --- Configuration ---
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const PADDING = 20; // Padding for axes labels
const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -5;
const Y_MAX = 5;
const F_COLOR = 'blue';
const F_PRIME_COLOR = 'red';
const LINE_THICKNESS = 2;
/** * New: Smoothing window size. 
 * The slope at point i will be calculated between point (i - SMOOTHING_WINDOW) 
 * and point (i + SMOOTHING_WINDOW). Higher values mean more smoothing.
 */
const SMOOTHING_WINDOW = 5; 

// --- DOM Elements and Contexts ---
const fCanvas = document.getElementById('functionCanvas');
const fCtx = fCanvas.getContext('2d');
const fpCanvas = document.getElementById('derivativeCanvas');
const fpCtx = fpCanvas.getContext('2d');

let isDrawing = false;
let points = []; // Array to store {x, y} coordinates in canvas pixels

// --- Coordinate System Utilities (Unchanged) ---

/**
 * Converts a mathematical x-coordinate to a canvas pixel x-coordinate.
 * @param {number} xMath - Math x value.
 */
function mathToCanvasX(xMath) {
    const range = X_MAX - X_MIN;
    const factor = (CANVAS_WIDTH - 2 * PADDING) / range;
    return PADDING + (xMath - X_MIN) * factor;
}

/**
 * Converts a mathematical y-coordinate to a canvas pixel y-coordinate.
 * @param {number} yMath - Math y value.
 */
function mathToCanvasY(yMath) {
    const range = Y_MAX - Y_MIN;
    const factor = (CANVAS_HEIGHT - 2 * PADDING) / range;
    // Note: Canvas Y increases downwards, so we subtract from the max Y position
    return CANVAS_HEIGHT - PADDING - (yMath - Y_MIN) * factor;
}

/**
 * Converts a canvas pixel x-coordinate to a mathematical x-coordinate.
 * @param {number} xCanvas - Canvas x pixel value.
 */
function canvasToMathX(xCanvas) {
    const range = X_MAX - X_MIN;
    const factor = (CANVAS_WIDTH - 2 * PADDING) / range;
    return X_MIN + (xCanvas - PADDING) / factor;
}

/**
 * Converts a canvas pixel y-coordinate to a mathematical y-coordinate.
 * @param {number} yCanvas - Canvas y pixel value.
 */
function canvasToMathY(yCanvas) {
    const range = Y_MAX - Y_MIN;
    const factor = (CANVAS_HEIGHT - 2 * PADDING) / range;
    // Note: Reverse the canvas Y transformation
    return Y_MIN + (CANVAS_HEIGHT - PADDING - yCanvas) / factor;
}

// --- Drawing Axes on a Canvas (Unchanged) ---
function drawAxes(ctx, isDerivative) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;

    // Center coordinates (canvas pixels)
    const centerX = mathToCanvasX(0);
    const centerY = mathToCanvasY(0);
    
    // Draw grid lines
    for (let x = X_MIN + 1; x < X_MAX; x++) {
        const cx = mathToCanvasX(x);
        ctx.beginPath();
        ctx.moveTo(cx, PADDING);
        ctx.lineTo(cx, CANVAS_HEIGHT - PADDING);
        ctx.stroke();
    }
    for (let y = Y_MIN + 1; y < Y_MAX; y++) {
        const cy = mathToCanvasY(y);
        ctx.beginPath();
        ctx.moveTo(PADDING, cy);
        ctx.lineTo(CANVAS_WIDTH - PADDING, cy);
        ctx.stroke();
    }

    // Draw X and Y axes (thicker lines)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;

    // X-Axis
    ctx.beginPath();
    ctx.moveTo(PADDING, centerY);
    ctx.lineTo(CANVAS_WIDTH - PADDING, centerY);
    ctx.stroke();

    // Y-Axis
    ctx.beginPath();
    ctx.moveTo(centerX, PADDING);
    ctx.lineTo(centerX, CANVAS_HEIGHT - PADDING);
    ctx.stroke();

    // Draw origin and labels
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    
    // Y-Axis label
    ctx.fillText(isDerivative ? "f'(x)" : "f(x)", centerX + 5, PADDING + 10);
    // X-Axis label
    ctx.fillText("x", CANVAS_WIDTH - PADDING - 10, centerY - 5);
    // Origin label
    ctx.fillText("0", centerX - 10, centerY + 10);

    // Draw Ticks and Labels on X-axis (if not at Y_MIN or Y_MAX)
    const yPos = (centerY < CANVAS_HEIGHT - PADDING && centerY > PADDING) ? centerY : CANVAS_HEIGHT - PADDING;
    for (let x = X_MIN + 1; x < X_MAX; x++) {
        if (x !== 0) {
            const cx = mathToCanvasX(x);
            ctx.beginPath();
            ctx.moveTo(cx, yPos - 3);
            ctx.lineTo(cx, yPos + 3);
            ctx.stroke();
            ctx.fillText(x.toString(), cx - 5, yPos + 15);
        }
    }

    // Draw Ticks and Labels on Y-axis (if not at X_MIN or X_MAX)
    const xPos = (centerX < CANVAS_WIDTH - PADDING && centerX > PADDING) ? centerX : PADDING;
    for (let y = Y_MIN + 1; y < Y_MAX; y++) {
        if (y !== 0) {
            const cy = mathToCanvasY(y);
            ctx.beginPath();
            ctx.moveTo(xPos - 3, cy);
            ctx.lineTo(xPos + 3, cy);
            ctx.stroke();
            ctx.fillText(y.toString(), xPos + 5, cy + 3);
        }
    }
}

// --- Drawing the Function f(x) (Unchanged) ---
function drawFunction() {
    drawAxes(fCtx, false); // Redraw axes for f(x)

    if (points.length < 2) return;

    fCtx.strokeStyle = F_COLOR;
    fCtx.lineWidth = LINE_THICKNESS;
    fCtx.beginPath();
    fCtx.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
        fCtx.lineTo(points[i].x, points[i].y);
    }
    fCtx.stroke();
}

// --- Numerical Differentiation (Smoothed Central Finite Difference) ---
function calculateDerivative() {
    // Need at least 2*SMOOTHING_WINDOW + 1 points to calculate the derivative for the first inner point
    if (points.length < 2 * SMOOTHING_WINDOW + 1) {
        drawAxes(fpCtx, true); // Clear derivative graph
        return [];
    }
    
    // 1. Convert canvas points to math coordinates {x, y}
    const mathPoints = points.map(p => ({
        x: canvasToMathX(p.x),
        y: canvasToMathY(p.y)
    }));

    // 2. Sort by x-value (crucial for differentiation)
    mathPoints.sort((a, b) => a.x - b.x);

    const derivativePoints = [];

    // 3. Smoothed Central Finite Difference: f'(x_i) ≈ (y_{i+h} - y_{i-h}) / (x_{i+h} - x_{i-h})
    // We use the SMOOTHING_WINDOW size as 'h' (the index offset).
    const h = SMOOTHING_WINDOW; 
    
    // We iterate over points that have enough neighbors on both sides.
    for (let i = h; i < mathPoints.length - h; i++) {
        const point_minus_h = mathPoints[i - h];
        const point_plus_h = mathPoints[i + h];

        const x_i = mathPoints[i].x; // The x-value where we plot the slope
        
        // Denominator: the span of x-values (2h)
        const dx = point_plus_h.x - point_minus_h.x;
        
        // Numerator: the change in y-values
        const dy = point_plus_h.y - point_minus_h.y;
        
        // Slope (the derivative value)
        const slope = dy / dx;

        // Store the derivative point {x, y}
        derivativePoints.push({
            x: x_i,
            y: slope
        });
    }

    return derivativePoints;
}

// --- Drawing the Derivative f'(x) (Unchanged) ---
function drawDerivative(derivativePoints) {
    drawAxes(fpCtx, true); // Redraw axes for f'(x)

    if (derivativePoints.length < 2) return;

    fpCtx.strokeStyle = F_PRIME_COLOR;
    fpCtx.lineWidth = LINE_THICKNESS;
    fpCtx.beginPath();

    // Convert the first math point to canvas coordinates
    let startX = mathToCanvasX(derivativePoints[0].x);
    let startY = mathToCanvasY(derivativePoints[0].y);
    fpCtx.moveTo(startX, startY);

    // Draw the rest of the derivative graph
    for (let i = 1; i < derivativePoints.length; i++) {
        const cx = mathToCanvasX(derivativePoints[i].x);
        const cy = mathToCanvasY(derivativePoints[i].y);
        fpCtx.lineTo(cx, cy);
    }
    fpCtx.stroke();
}

// --- Event Handlers for Drawing (Unchanged) ---
function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function startDrawing(event) {
    isDrawing = true;
    const pos = getMousePos(fCanvas, event);
    // Start a new path
    fCtx.beginPath();
    fCtx.moveTo(pos.x, pos.y);
    points.push(pos);
}

function draw(event) {
    if (!isDrawing) return;
    const pos = getMousePos(fCanvas, event);
    
    // Draw on the function canvas
    fCtx.lineTo(pos.x, pos.y);
    fCtx.stroke();
    points.push(pos);

    // Re-calculate and draw the derivative on the fly
    const derivPoints = calculateDerivative();
    drawDerivative(derivPoints);
}

function stopDrawing() {
    isDrawing = false;
    fCtx.closePath();
}

// --- Public Function for the Button (Unchanged) ---
window.clearAll = function() {
    points = [];
    drawAxes(fCtx, false);
    drawAxes(fpCtx, true);
};

// --- Initialization (Unchanged) ---
function init() {
    // Set up event listeners for drawing on the function canvas
    fCanvas.addEventListener('mousedown', startDrawing);
    fCanvas.addEventListener('mousemove', draw);
    fCanvas.addEventListener('mouseup', stopDrawing);
    fCanvas.addEventListener('mouseout', stopDrawing);

    // Draw initial axes
    drawAxes(fCtx, false);
    drawAxes(fpCtx, true);
}

init();
