import React from 'react';

export default function Line(props) {
    const { A, B, strokeWeight, color, opacity } = props;

    const [x1, y1] = A;
    const [x2, y2] = B;

    const dist2D = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

    const slopeRadian = Math.atan2(y1 - y2, x1 - x2);
    const slopeDegrees = (slopeRadian * 180) / Math.PI;

    const dist1D = (a, aPrime) => aPrime - a

    const line = <span style={{
        position: 'absolute',
        left: `${((x1 + dist1D(x1, x2) / 2) - dist2D / 2) - strokeWeight / 2}px`,
        top: `${(y1 + (dist1D(y1, y2) / 2)) - strokeWeight / 2}px`,
        width: `${dist2D + strokeWeight}px`,
        height: strokeWeight,
        backgroundColor: color,
        borderRadius: `${strokeWeight / 2}px`,
        transform: `rotate(${slopeDegrees}deg)`,
        opacity: opacity || 1.
    }}></span>

    return (<>{line}</>)
}