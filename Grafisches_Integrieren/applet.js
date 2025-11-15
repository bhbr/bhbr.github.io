
// --- Configuration (Unchanged) ---
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const PADDING = 20; 
const X_MIN = -5;
const X_MAX = 5;
const Y_MIN = -5;
const Y_MAX = 5;
const F_COLOR = 'blue';
const F_PRIME_COLOR = 'red';
const LINE_THICKNESS = 2;
const SMOOTHING_WINDOW = 5; 
const START_POINT_RADIUS = 5; 

// --- DOM Elements and Contexts (Unchanged) ---
const fCanvas = document.getElementById('functionCanvas');
const fCtx = fCanvas.getContext('2d');
const fpCanvas = document.getElementById('derivativeCanvas');
const fpCtx = fpCanvas.getContext('2d');

// --- State Variables ---
let isDrawing = false;
let isDraggingStartPoint = false;
let fpPoints = []; 

// The initial condition point for f(x). Will be set by the first drawn point's X.
let startPoint = { 
    x: mathToCanvasX(0), 
    y: mathToCanvasY(0),
    xFixed: false // NEW FLAG: True if the user has already drawn f'(x)
}; 

function mathToCanvasX(xMath) {
    const range = X_MAX - X_MIN;
    const factor = (CANVAS_WIDTH - 2 * PADDING) / range;
    return PADDING + (xMath - X_MIN) * factor;
}

function mathToCanvasY(yMath) {
    const range = Y_MAX - Y_MIN;
    const factor = (CANVAS_HEIGHT - 2 * PADDING) / range;
    return CANVAS_HEIGHT - PADDING - (yMath - Y_MIN) * factor;
}

function canvasToMathX(xCanvas) {
    const range = X_MAX - X_MIN;
    const factor = (CANVAS_WIDTH - 2 * PADDING) / range;
    return X_MIN + (xCanvas - PADDING) / factor;
}

function canvasToMathY(yCanvas) {
    const range = Y_MAX - Y_MIN;
    const factor = (CANVAS_HEIGHT - 2 * PADDING) / range;
    return Y_MIN + (CANVAS_HEIGHT - PADDING - yCanvas) / factor;
}

// --- Drawing Axes on a Canvas (Mostly Unchanged) ---
function drawAxes(ctx, isDerivative) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;

    const centerX = mathToCanvasX(0);
    const centerY = mathToCanvasY(0);
    
    // Draw grid lines
    // ... (omitted for brevity, assume grid drawing logic is here) ...
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

    // Draw X and Y axes 
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(PADDING, centerY); ctx.lineTo(CANVAS_WIDTH - PADDING, centerY); ctx.stroke(); // X-Axis
    ctx.beginPath();
    ctx.moveTo(centerX, PADDING); ctx.lineTo(centerX, CANVAS_HEIGHT - PADDING); ctx.stroke(); // Y-Axis

    // Draw origin and labels
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    
    ctx.fillText(isDerivative ? "f'(x)" : "f(x)", centerX + 5, PADDING + 10);
    ctx.fillText("x", CANVAS_WIDTH - PADDING - 10, centerY - 5);
    ctx.fillText("0", centerX - 10, centerY + 10);

    // Draw Ticks and Labels (omitted for brevity)
    const yPos = (centerY < CANVAS_HEIGHT - PADDING && centerY > PADDING) ? centerY : CANVAS_HEIGHT - PADDING;
    for (let x = X_MIN + 1; x < X_MAX; x++) { if (x !== 0) { const cx = mathToCanvasX(x); ctx.beginPath(); ctx.moveTo(cx, yPos - 3); ctx.lineTo(cx, yPos + 3); ctx.stroke(); ctx.fillText(x.toString(), cx - 5, yPos + 15); } }
    const xPos = (centerX < CANVAS_WIDTH - PADDING && centerX > PADDING) ? centerX : PADDING;
    for (let y = Y_MIN + 1; y < Y_MAX; y++) { if (y !== 0) { const cy = mathToCanvasY(y); ctx.beginPath(); ctx.moveTo(xPos - 3, cy); ctx.lineTo(xPos + 3, cy); ctx.stroke(); ctx.fillText(y.toString(), xPos + 5, cy + 3); } }
}

// --- Drawing the Derivative f'(x) ---
function drawDerivative() {
    drawAxes(fpCtx, true); 

    if (fpPoints.length < 2) return;

    fpCtx.strokeStyle = F_PRIME_COLOR;
    fpCtx.lineWidth = LINE_THICKNESS;
    fpCtx.beginPath();
    fpCtx.moveTo(fpPoints[0].x, fpPoints[0].y);

    for (let i = 1; i < fpPoints.length; i++) {
        fpCtx.lineTo(fpPoints[i].x, fpPoints[i].y);
    }
    fpCtx.stroke();
}

// --- Numerical Integration (Riemann Sums / Accumulation) ---
function calculateFunction() {
    if (fpPoints.length < 2) return [];

    // 1. Convert canvas points of f'(x) to math coordinates {x, y} and sort
    const mathFpPoints = fpPoints.map(p => ({
        x: canvasToMathX(p.x),
        y: canvasToMathY(p.y)
    })).sort((a, b) => a.x - b.x);

    // 2. Identify the initial condition.
    // Use the *current* position of the draggable point, which is at the fixed X
    // determined by the first drawing action, or the user's drag.
    const x0 = canvasToMathX(startPoint.x);
    const y0 = canvasToMathY(startPoint.y); 

    const functionPoints = [];
    let accumulatedArea = 0; 
    let x0Index = -1; // Find the index closest to x0

    // Find the closest point in the sorted array to x0 to use as the base index
    x0Index = mathFpPoints.findIndex(p => p.x >= x0);
    // If x0 is outside the drawn range, find the closest end.
    if (x0Index === -1) x0Index = mathFpPoints.length - 1;
    if (x0Index === 0 && x0 < mathFpPoints[0].x) x0Index = 0;


    // 3. Integrate starting from x0 (forward and backward)
    
    // Initialize the function curve at the starting point
    // We add the initial point multiple times for integration to work smoothly
    functionPoints.push({ x: mathFpPoints[x0Index].x, y: y0 });
    
    // Forward Integration (x > x0)
    for (let i = x0Index; i < mathFpPoints.length - 1; i++) {
        const p1 = mathFpPoints[i];
        const p2 = mathFpPoints[i + 1];

        const dx = p2.x - p1.x;
        const trapezoidArea = (p1.y + p2.y) / 2 * dx;
        
        accumulatedArea += trapezoidArea;
        functionPoints.push({ x: p2.x, y: y0 + accumulatedArea });
    }

    // Backward Integration (x < x0)
    accumulatedArea = 0; // Reset area for backward accumulation
    for (let i = x0Index; i > 0; i--) {
        const p1 = mathFpPoints[i];
        const p2 = mathFpPoints[i - 1]; 

        const dx = p2.x - p1.x; // dx will be negative
        const trapezoidArea = (p1.y + p2.y) / 2 * dx; 
        
        accumulatedArea += trapezoidArea;
        functionPoints.unshift({ x: p2.x, y: y0 + accumulatedArea });
    }
    
    // Sort the final result to ensure continuous plotting
    return functionPoints.sort((a, b) => a.x - b.x);
}


function drawFunction(functionPoints) {
    drawAxes(fCtx, false); 
    
    // 1. Draw the integrated function f(x)
    if (functionPoints.length >= 2) {
        fCtx.strokeStyle = F_COLOR;
        fCtx.lineWidth = LINE_THICKNESS;
        fCtx.beginPath();
        
        let startX = mathToCanvasX(functionPoints[0].x);
        let startY = mathToCanvasY(functionPoints[0].y);
        fCtx.moveTo(startX, startY);

        for (let i = 1; i < functionPoints.length; i++) {
            const cx = mathToCanvasX(functionPoints[i].x);
            const cy = mathToCanvasY(functionPoints[i].y);
            fCtx.lineTo(cx, cy);
        }
        fCtx.stroke();
    }
    
    // 2. Draw the draggable start point (Initial Condition)
    fCtx.fillStyle = F_COLOR;
    fCtx.beginPath();
    fCtx.arc(startPoint.x, startPoint.y, START_POINT_RADIUS, 0, Math.PI * 2);
    fCtx.fill();
    fCtx.strokeStyle = 'black';
    fCtx.lineWidth = 1;
    fCtx.stroke();
}


// --- Event Handlers ---
function getMousePos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function startDrawing(event) {
    const pos = getMousePos(fpCanvas, event);
    isDrawing = true;

    // --- NEW LOGIC: Set starting x-coordinate only on the first draw ---
    if (!startPoint.xFixed) {
        // Set the start point x to the canvas x of the *first* drawn point
        // and keep the y value at 0 (center of the canvas).
        const startX_canvas = pos.x;
        const startY_canvas_zero = mathToCanvasY(0); 
        
        startPoint.x = startX_canvas;
        startPoint.y = startY_canvas_zero;
        startPoint.xFixed = true; // Lock the x-coordinate
    }
    // ------------------------------------------------------------------

    fpCtx.beginPath();
    fpCtx.moveTo(pos.x, pos.y);
    fpPoints.push(pos);
}

function drawFPrime(event) {
    if (!isDrawing) return;
    const pos = getMousePos(fpCanvas, event);
    
    fpCtx.lineTo(pos.x, pos.y);
    fpCtx.stroke();
    fpPoints.push(pos);

    // Calculate and draw the integrated function f(x)
    const fPoints = calculateFunction();
    drawFunction(fPoints);
}

function stopDrawing() {
    isDrawing = false;
    fpCtx.closePath();
}

function isNearStartPoint(x, y) {
    // Only allow dragging on the Y-axis of the fixed start point X-coordinate
    // We check closeness only to the Y coordinate for easy horizontal-only dragging
    return Math.abs(x - startPoint.x) < (START_POINT_RADIUS * 3) && 
           Math.abs(y - startPoint.y) < (START_POINT_RADIUS + 5);
}

function startDragging(event) {
    const pos = getMousePos(fCanvas, event);
    // Allow dragging only if the function has been drawn once (startPoint.xFixed is true)
    if (startPoint.xFixed && isNearStartPoint(pos.x, pos.y)) {
        isDraggingStartPoint = true;
        fCanvas.style.cursor = 'grabbing';
    }
}

function dragStartPoint(event) {
    if (!isDraggingStartPoint) return;
    const pos = getMousePos(fCanvas, event);
    
    startPoint.x = Math.max(PADDING, Math.min(CANVAS_WIDTH - PADDING, pos.x));
    startPoint.y = Math.max(PADDING, Math.min(CANVAS_HEIGHT - PADDING, pos.y));
    
    // Recalculate and redraw f(x) based on the new start point
    const fPoints = calculateFunction();
    drawFunction(fPoints);
}

function stopDragging() {
    if (isDraggingStartPoint) {
        isDraggingStartPoint = false;
        fCanvas.style.cursor = 'grab';
    }
}


// --- Public Function and Initialization ---
window.clearAll = function() {
    fpPoints = [];
    // Reset start point to its initial state
    startPoint = { 
        x: mathToCanvasX(0), 
        y: mathToCanvasY(0),
        xFixed: false // IMPORTANT: Reset the lock flag
    }; 
    drawAxes(fCtx, false);
    drawAxes(fpCtx, true);
    drawFunction([]); // Redraw to show reset start point
};

function init() {
    // Event listeners for drawing f'(x) on the right canvas
    fpCanvas.addEventListener('pointerdown', startDrawing);
    fpCanvas.addEventListener('pointermove', drawFPrime);
    fpCanvas.addEventListener('pointerup', stopDrawing);
    fpCanvas.addEventListener('pointerout', stopDrawing);

    // Event listeners for dragging the starting point on the left canvas
    fCanvas.addEventListener('pointerdown', startDragging);
    fCanvas.addEventListener('pointermove', dragStartPoint);
    fCanvas.addEventListener('pointerup', stopDragging);
    fCanvas.addEventListener('pointerout', stopDragging);
    fCanvas.style.cursor = 'grab'; 

    // Draw initial axes and the start point
    drawAxes(fCtx, false);
    drawAxes(fpCtx, true);
    drawFunction([]); // Draw the initial (0,0) point
}

init();
