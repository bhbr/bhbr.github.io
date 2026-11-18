import { Paper, StraightArrow, MGroup, Circle, Color, Line, SimpleButton, TextLabel } from '@bhbr/minter';
import { GRID_SIDELENGTH, LABEL_FONT, LABEL_FONT_SIZE, INPUT_FONT_SIZE, UNDO_BUTTON_FONT_SIZE, UNDO_BUTTON_LABEL_OFFSET, GOAL_SIZE, CONTROLS_X_OFFSET, CONTROLS_Y_OFFSET, BUTTON_WIDTH, BUTTON_HEIGHT, BUTTON_SPACING, GOAL_ICON_SIZE, GOAL_ICON_OFFSET, LANGUAGE } from '../constants.js';
import { vertexOrigin, vertexAdd, vertexSubtract } from '@bhbr/affr2';
import { Frog } from '../pieces/Frog.js';
import { GhostFrog } from '../pieces/GhostFrog.js';
import { Goal } from '../pieces/Goal.js';
import { equal } from '@bhbr/egalite';
import { VisitedSpot } from '../pieces/VisitedSpot.js';
import { isInstanceOf } from '@bhbr/upper-class';
import { NumberInputBox } from '@bhbr/minter-arithmetic';
import { clear } from '@bhbr/betray';
export class Grid extends MGroup {
}
export class FrogPaper extends Paper {
    defaults() {
        return {
            // List all the sidebar button class names here. The paper might ask the Sidebar to reinitialize with a new set of buttons, e. g. when maximising or minimising a board with its own custom set of tools.
            buttonNames: [],
            // Provide help texts for each option in each sidebar button.
            helpTexts: {},
            llPosition: [0, 0],
            previousLLPosiion: null,
            xAxis: new StraightArrow({
                strokeColor: Color.gray(0.5),
                tipStyle: 'dart'
            }),
            xAxisLabel: new TextLabel({
                text: '<i>x</i>',
                font: LABEL_FONT,
                fontSize: LABEL_FONT_SIZE,
                textColor: Color.gray(0.5),
                frameWidth: 30,
                frameHeight: 30
            }),
            yAxis: new StraightArrow({
                strokeColor: Color.gray(0.5),
                tipStyle: 'dart'
            }),
            yAxisLabel: new TextLabel({
                text: '<i>y</i>',
                font: LABEL_FONT,
                fontSize: LABEL_FONT_SIZE,
                textColor: Color.gray(0.5),
                frameWidth: 30,
                frameHeight: 30
            }),
            panShift: vertexOrigin(),
            grid: new Grid(),
            gridPoints: [],
            gridSize: [0, 0],
            frogs: [
                new Frog({ color: 'green', startPosition: [0, 0] }),
                new Frog({ color: 'red', startPosition: [1, 0] }),
                new Frog({ color: 'blue', startPosition: [0, 1] })
            ],
            ghostFrogs: [
                new GhostFrog({ color: 'green' }),
                new GhostFrog({ color: 'red' }),
                new GhostFrog({ color: 'blue' })
            ],
            goal: new Goal({ position: [3, 4] }),
            jumpLines: new MGroup(),
            movesHistory: [],
            movesHistoryPosition: 0,
            resetButton: new SimpleButton({
                text: 'reset',
                anchor: [30, 20],
                width: BUTTON_WIDTH,
                height: BUTTON_HEIGHT
            }),
            undoButton: new SimpleButton({
                text: '&#8634;',
                fontSize: UNDO_BUTTON_FONT_SIZE,
                anchor: [100, 100],
                width: BUTTON_WIDTH,
                height: BUTTON_HEIGHT
            }),
            redoButton: new SimpleButton({
                text: '&#8635;',
                fontSize: UNDO_BUTTON_FONT_SIZE,
                anchor: [200, 100],
                width: BUTTON_WIDTH,
                height: BUTTON_HEIGHT
            }),
            visitedSpots: new MGroup(),
            goalXIcon: new Goal({
                anchor: [10, 100],
                frameWidth: GOAL_ICON_SIZE,
                frameHeight: GOAL_ICON_SIZE
            }),
            goalYIcon: new Goal({
                anchor: [10, 100],
                frameWidth: GOAL_ICON_SIZE,
                frameHeight: GOAL_ICON_SIZE
            }),
            goalXField: new NumberInputBox({
                labelText: '<i>x</i> &nbsp; = &nbsp;',
                labelFont: LABEL_FONT,
                labelFontSize: LABEL_FONT_SIZE,
                inputWidth: 50,
                anchor: [GOAL_SIZE, 80]
            }),
            goalYField: new NumberInputBox({
                labelText: '<i>y</i> &nbsp; = &nbsp;',
                labelFont: LABEL_FONT,
                labelFontSize: LABEL_FONT_SIZE,
                inputWidth: 50,
                anchor: [GOAL_SIZE, 120]
            }),
            welcomeMessage: {
                'en': 'Drag the frogs to make them jump over each other by point reflections. Can you make a frog reach the goal? Which goal points can be reached by the frogs?',
                'de': 'Ziehe die Frösche, um sie mit Punktspiegelungen übereinander hüpfen zu lassen. Kannst du einen Frosch so ins Ziel bringen? Welche Zielpunkte kannst du erreichen?'
            },
            finishMessage: {
                'en': 'Good Game!',
                'de': 'Good Game!'
            },
            playEnabled: false
        };
    }
    setup() {
        super.setup();
        this.background.update({
            fillColor: Color.black()
        });
        this.resize();
        this.setupAxes();
        this.setupGrid();
        this.addToContent(this.visitedSpots);
        this.add(this.jumpLines);
        this.setupPieces();
        this.moveToBack(this.xAxis);
        this.moveToBack(this.yAxis);
        this.moveToBack(this.grid);
        this.moveToBack(this.background);
        this.setInternalDragging(true);
        this.undoButton.action = this.undoMove.bind(this);
        this.undoButton.disable();
        this.undoButton.update({
            anchor: [100, 20]
        });
        this.undoButton.label.update({
            anchor: [0, UNDO_BUTTON_LABEL_OFFSET]
        });
        this.add(this.undoButton);
        this.redoButton.action = this.redoMove.bind(this);
        this.redoButton.disable();
        this.redoButton.update({
            anchor: [160, 20]
        });
        this.redoButton.label.update({
            anchor: [0, UNDO_BUTTON_LABEL_OFFSET]
        });
        this.add(this.redoButton);
        this.resetButton.action = this.reset.bind(this);
        this.add(this.resetButton);
        this.add(this.goalXIcon);
        this.add(this.goalYIcon);
        this.goalXField.update({
            value: this.goal.position[0],
            inputFontSize: INPUT_FONT_SIZE,
            labelFontSize: LABEL_FONT_SIZE
        });
        this.add(this.goalXField);
        this.goalXField.onTap = this.scrollUp.bind(this);
        this.goalXField.onReturn = this.positionGoal.bind(this);
        this.goalYField.update({
            value: this.goal.position[1],
            inputFontSize: INPUT_FONT_SIZE,
            labelFontSize: LABEL_FONT_SIZE
        });
        this.add(this.goalYField);
        this.goalYField.onTap = this.scrollUp.bind(this);
        this.goalYField.onReturn = this.positionGoal.bind(this);
        this.repositionControls();
        window.visualViewport.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                if (Math.abs(window.visualViewport.height - window.innerHeight) < 2) {
                    let paperDiv = document.getElementById('paper_id');
                    paperDiv.style.top = '0px';
                    paperDiv.style.left = '0px';
                }
            });
        });
        window.setTimeout(function () {
            window.alert(this.welcomeMessage[LANGUAGE]);
            this.playEnabled = true;
        }.bind(this), 1000);
    }
    onResize(e) {
        this.resize();
    }
    scrollUp() {
        window.setTimeout(function () {
            let paperDiv = document.getElementById('paper_id');
            let shift = window.visualViewport.height - window.innerHeight;
            paperDiv.style.top = `${shift}px`;
            paperDiv.style.left = '0px';
        }.bind(this), 1000);
    }
    resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;
        this.update({
            frameWidth: width,
            frameHeight: height
        });
        this.background.update({
            width: width,
            height: height
        });
        this.resizeAxes();
        this.resizeGrid();
        this.repositionPieces();
        this.repositionSpots();
        this.repositionControls();
    }
    setupAxes() {
        this.resizeAxes();
        this.add(this.xAxis);
        this.add(this.xAxisLabel);
        this.add(this.yAxis);
        this.add(this.yAxisLabel);
    }
    resizeAxes() {
        this.xAxis.update({
            startPoint: [this.frame.xMin(), this.frame.midY()],
            endPoint: [this.frame.xMax(), this.frame.midY()]
        });
        this.yAxis.update({
            startPoint: [this.frame.midX(), this.frame.yMax()],
            endPoint: [this.frame.midX(), this.frame.yMin()],
        });
        this.positionAxisLabels();
    }
    positionAxisLabels() {
        this.xAxisLabel.update({
            anchor: vertexAdd(this.xAxis.endPoint, [-50, 20])
        });
        this.yAxisLabel.update({
            anchor: vertexAdd(this.yAxis.endPoint, [-50, 20])
        });
    }
    setupGrid() {
        this.remove(this.grid);
        let grid = this.makeGrid();
        this.add(grid);
        this.grid = grid;
    }
    makeGrid() {
        let grid = new Grid();
        this.llPosition = [-0.5 * this.frameWidth / GRID_SIDELENGTH, -0.5 * this.frameHeight / GRID_SIDELENGTH];
        let minIntegerM = Math.floor(this.mMin());
        let maxIntegerM = Math.ceil(this.mMax());
        let minIntegerN = Math.floor(this.nMin());
        let maxIntegerN = Math.ceil(this.nMax());
        this.gridSize = [Math.ceil(maxIntegerM) - Math.floor(minIntegerM) + 1, Math.ceil(maxIntegerN) - Math.floor(minIntegerN) + 1];
        clear(this.gridPoints);
        for (let m = minIntegerM; m <= maxIntegerM; m++) {
            let gridLine = [];
            for (let n = minIntegerN; n <= maxIntegerN; n++) {
                let gridPoint = new Circle({
                    midpoint: this.coordinatesForPosition([m, n]),
                    radius: 2,
                    fillOpacity: 0.25,
                    strokeWidth: 0
                });
                grid.add(gridPoint);
                gridLine.push(gridPoint);
            }
            this.gridPoints.push(gridLine);
        }
        return grid;
    }
    resizeGrid() {
        this.llPosition = [-0.5 * this.frameWidth / GRID_SIDELENGTH, -0.5 * this.frameHeight / GRID_SIDELENGTH];
        let newMinIntegerM = Math.floor(this.mMin());
        let newMaxIntegerM = Math.ceil(this.mMax());
        let newMinIntegerN = Math.floor(this.nMin());
        let newMaxIntegerN = Math.ceil(this.nMax());
        let newGridSize = [Math.ceil(newMaxIntegerM) - Math.floor(newMinIntegerM) + 1, Math.ceil(newMaxIntegerN) - Math.floor(newMinIntegerN) + 1];
        if (!equal(newGridSize, this.gridSize)) {
            this.setupGrid();
        }
    }
    setupPieces() {
        this.add(this.goal);
        for (let frog of this.frogs) {
            this.placePiece(frog, frog.startPosition);
            this.addToContent(frog);
            frog.update({ paper: this });
        }
        for (let frog of this.ghostFrogs) {
            this.placePiece(frog, frog.startPosition);
            this.addToContent(frog);
            frog.hide();
            frog.update({ paper: this });
        }
        this.placePiece(this.goal, this.goal.position);
        this.goal.update({ paper: this });
    }
    repositionPieces() {
        for (let frog of this.frogs) {
            this.placePiece(frog, frog.position);
        }
        for (let frog of this.ghostFrogs) {
            this.placePiece(frog, frog.position);
        }
        this.positionGoal();
    }
    repositionSpots() {
        for (let spot of this.visitedSpots.children) {
            if (!isInstanceOf(spot, 'VisitedSpot')) {
                continue;
            }
            let spot2 = spot;
            spot2.update({
                midpoint: this.coordinatesForPosition(spot2.position)
            });
        }
    }
    repositionControls() {
        this.resetButton.update({
            anchor: [
                CONTROLS_X_OFFSET,
                this.frameHeight - BUTTON_HEIGHT - CONTROLS_Y_OFFSET
            ]
        });
        this.undoButton.update({
            anchor: [
                CONTROLS_X_OFFSET + BUTTON_WIDTH + BUTTON_SPACING,
                this.frameHeight - BUTTON_HEIGHT - CONTROLS_Y_OFFSET
            ]
        });
        this.redoButton.update({
            anchor: [
                CONTROLS_X_OFFSET + 2 * BUTTON_WIDTH + 2 * BUTTON_SPACING,
                this.frameHeight - BUTTON_HEIGHT - CONTROLS_Y_OFFSET
            ]
        });
        this.goalXField.update({
            anchor: [
                this.frameWidth - this.goalXField.frameWidth,
                this.frameHeight - CONTROLS_Y_OFFSET - 2 * this.goalXField.frameHeight - BUTTON_SPACING
            ]
        });
        this.goalYField.update({
            anchor: [
                this.frameWidth - this.goalXField.frameWidth,
                this.frameHeight - CONTROLS_Y_OFFSET - this.goalXField.frameHeight
            ]
        });
        this.goalXIcon.update({
            anchor: vertexAdd(this.goalXField.anchor, GOAL_ICON_OFFSET)
        });
        this.goalYIcon.update({
            anchor: vertexAdd(this.goalYField.anchor, GOAL_ICON_OFFSET)
        });
    }
    reset() {
        for (let frog of this.frogs) {
            this.placePiece(frog, frog.startPosition);
        }
        this.movesHistory = [];
        this.movesHistoryPosition = 0;
        this.visitedSpots.removeAllChildren();
    }
    placePiece(piece, position) {
        let p = this.coordinatesForPosition(position);
        piece.update({
            position: position,
            anchor: [p[0] - piece.frameWidth / 2, p[1] - piece.frameHeight / 2]
        });
    }
    mMin() { return this.llPosition[0]; }
    mMax() { return this.mMin() + this.frameWidth / GRID_SIDELENGTH; }
    nMin() { return this.llPosition[1]; }
    nMax() { return this.nMin() + this.frameHeight / GRID_SIDELENGTH; }
    coordinatesForPosition(position) {
        return [
            GRID_SIDELENGTH * (position[0] - this.llPosition[0]),
            this.frameHeight - GRID_SIDELENGTH * (position[1] - this.llPosition[1])
        ];
    }
    positionForCoordinates(coordinates) {
        return [
            Math.round(this.llPosition[0] + coordinates[0] / GRID_SIDELENGTH),
            Math.round(this.llPosition[1] + (this.frameHeight - coordinates[1]) / GRID_SIDELENGTH)
        ];
    }
    ghostForFrog(frog) {
        return this.ghostFrogs[frog.color];
    }
    startPanning(e) {
        if (!this.playEnabled) {
            return;
        }
        super.startPanning(e);
        this.update({
            previousLLPosition: this.llPosition
        });
    }
    panning(e) {
        if (!this.playEnabled) {
            return;
        }
        this.update({
            panShift: vertexSubtract(this.sensor.localEventVertex(e), this.panPointStart),
            llPosition: vertexAdd(this.previousLLPosition, [
                -this.panShift[0] / GRID_SIDELENGTH,
                this.panShift[1] / GRID_SIDELENGTH
            ])
        });
        this.panAxes();
        this.panGrid();
        this.panPieces();
    }
    panAxes() {
        this.xAxis.update({
            startPoint: this.coordinatesForPosition([this.mMin(), 0]),
            endPoint: this.coordinatesForPosition([this.mMax(), 0])
        });
        this.yAxis.update({
            startPoint: this.coordinatesForPosition([0, this.nMin()]),
            endPoint: this.coordinatesForPosition([0, this.nMax()])
        });
        this.positionAxisLabels();
    }
    panGrid() {
        let minIntegerM = Math.floor(this.mMin());
        let maxIntegerM = minIntegerM + this.gridPoints.length - 1;
        let minIntegerN = Math.floor(this.nMin());
        let maxIntegerN = minIntegerN + this.gridPoints[0].length - 1;
        for (let m = minIntegerM; m <= maxIntegerM; m++) {
            let gridLine = this.gridPoints[m - minIntegerM];
            for (let n = minIntegerN; n <= maxIntegerN; n++) {
                let gridPoint = gridLine[n - minIntegerN];
                let newMidpoint = this.coordinatesForPosition([m, n]);
                gridPoint.update({
                    midpoint: newMidpoint
                });
            }
        }
    }
    panPieces() {
        for (let frog of this.frogs) {
            this.panPiece(frog);
        }
        this.panPiece(this.goal);
        for (let spot of this.visitedSpots.children) {
            if (isInstanceOf(spot, 'VisitedSpot'))
                this.panSpot(spot);
        }
    }
    panPiece(piece) {
        this.placePiece(piece, piece.position);
    }
    panSpot(spot) {
        spot.update({
            midpoint: this.coordinatesForPosition(spot.position)
        });
    }
    endPanning(e) {
        if (!this.playEnabled) {
            return;
        }
        this.update({
            panShift: vertexOrigin()
        });
    }
    startDraggingFrog(frog) {
        let snapPoints = [];
        for (let i = 0; i < this.frogs.length; i++) { // including the dragged frog itself (reflect it around itself)
            let otherFrog = this.frogs[i];
            let snapPosition = [
                2 * otherFrog.position[0] - frog.position[0],
                2 * otherFrog.position[1] - frog.position[1]
            ];
            let ghostFrog = this.ghostFrogs[i];
            ghostFrog.update({
                color: frog.color
            });
            ghostFrog.positionAt(snapPosition);
            ghostFrog.show();
            let snapPoint = this.coordinatesForPosition(snapPosition);
            snapPoints.push(snapPoint);
            if (otherFrog !== frog) {
                let jumpLine = new Line({
                    startPoint: this.coordinatesForPosition(frog.position),
                    endPoint: snapPoint,
                    strokeWidth: 3
                });
                jumpLine.view.path.style.strokeDasharray = '4';
                this.jumpLines.add(jumpLine);
            }
        }
        frog.update({
            snapPoints: snapPoints
        });
    }
    removeJumpLines() {
        this.jumpLines.removeAllChildren();
    }
    removeGhostFrogs() {
        for (let frog of this.ghostFrogs) {
            frog.hide();
        }
    }
    moveFrogs(move) {
        // merely move, without updating the move history
        // (so this method can be used by undoMove and redoMove)
        let pos1 = move[0];
        let pos2 = move[1];
        for (let frog of this.frogs) {
            if (equal(frog.position, pos1)) {
                frog.positionAt(pos2);
                return true;
            }
        }
        return false;
    }
    frogAtPosition(position) {
        for (let frog of this.frogs) {
            if (equal(frog.position, position)) {
                return frog;
            }
        }
        return null;
    }
    makeNewMove(move) {
        let moved = this.moveFrogs(move);
        let movedFrog = this.frogAtPosition(move[1]);
        if (!moved || !movedFrog) {
            return;
        }
        while (this.movesHistory.length > this.movesHistoryPosition) {
            this.movesHistory.pop();
            this.visitedSpots.remove(this.visitedSpots.children[this.visitedSpots.children.length - 1]);
        }
        this.movesHistory.push(move);
        this.movesHistoryPosition += 1;
        this.undoButton.enable();
        this.redoButton.disable();
        let visited = this.positionIsVisited(move[0]);
        if (!visited) {
            let spot = new VisitedSpot({
                position: move[0],
                midpoint: this.coordinatesForPosition(move[0])
            });
            spot.setColor(movedFrog.color);
            this.visitedSpots.add(spot);
        }
        if (equal(move[1], this.goal.position)) {
            window.alert(this.finishMessage[LANGUAGE]);
            this.randomizeGoal();
        }
    }
    positionIsVisited(pos) {
        for (let spot of this.visitedSpots.children) {
            if (!isInstanceOf(spot, 'VisitedSpot')) { continue }
            let spot2 = spot;
            if (equal(pos, spot2.position)) {
                return true
            }
        }
        return false
    }
    undoMove() {
        if (this.movesHistoryPosition == 0) {
            return;
        }
        let move = this.movesHistory[this.movesHistoryPosition - 1];
        this.movesHistoryPosition -= 1;
        this.moveFrogs([move[1], move[0]]);
        this.visitedSpots.children[this.visitedSpots.children.length - 1].hide();
        this.redoButton.enable();
        if (this.movesHistoryPosition == 0) {
            this.undoButton.disable();
        }
    }
    removeLastVisitedSpot() {
        let lastSpot = this.visitedSpots.children[this.visitedSpots.children.length - 1];
        this.visitedSpots.remove(lastSpot);
    }
    redoMove() {
        if (this.movesHistoryPosition == this.movesHistory.length) {
            return;
        }
        let move = this.movesHistory[this.movesHistoryPosition];
        this.movesHistoryPosition += 1;
        this.moveFrogs(move);
        let movedFrog = this.frogAtPosition(move[1]);
        let spot = new VisitedSpot({
            color: movedFrog.color,
            position: move[0]
        });
        this.visitedSpots.children[this.visitedSpots.children.length - 1].show();
        this.undoButton.enable();
        if (this.movesHistoryPosition == this.movesHistory.length) {
            this.redoButton.disable();
        }
    }
    positionGoal() {
        let newM = Math.round(this.goalXField.value);
        if (newM === undefined || isNaN(newM)) {
            newM = this.goal.position[0];
        }
        let newN = Number(this.goalYField.value);
        if (newN === undefined || isNaN(newN)) {
            newN = this.goal.position[1];
        }
        this.reset();
        this.goal.positionAt([newM, newN]);
    }
    randomizeGoal() {
        var m = 0;
        var n = 0;
        do {
            m = Math.round(8 * Math.random() - 4);
            n = Math.round(8 * Math.random() - 4);
        } while (this.frogStartsAt([m, n]));
        this.reset();
        this.goal.positionAt([m, n]);
        this.goalXField.update({ value: m });
        this.goalYField.update({ value: n });
    }
    frogStartsAt(position) {
        for (let frog of this.frogs) {
            if (equal(position, frog.startPosition)) {
                return true;
            }
        }
        return false;
    }
}
