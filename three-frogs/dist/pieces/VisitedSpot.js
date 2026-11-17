import { Circle, Color } from '@bhbr/minter';
export class VisitedSpot extends Circle {
    defaults() {
        return {
            position: [0, 0],
            fillOpacity: 0.5,
            strokeWidth: 0,
            radius: 10,
            colors: {
                red: new Color(226 / 255, 96 / 255, 65 / 255),
                blue: new Color(88 / 255, 165 / 255, 234 / 255),
                green: new Color(134 / 255, 196 / 255, 62 / 255)
            }
        };
    }
    setColor(newColorName) {
        this.update({
            fillColor: this.colors[newColorName]
        });
    }
}
