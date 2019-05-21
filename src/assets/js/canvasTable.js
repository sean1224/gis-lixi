export default {
    darwBackLine: function (color, splitcount, linewidth, data) {
        var len = Math.floor((config.height - config.Top - config.Bottom) / splitcount);
        var start = config.Top;
        for (var i = 0; i < splitcount; i++) {
            var point = start + len * i;
            drawLine(config.Left, point, (config.width / 2 - config.Right) * scale, point, color, linewidth);
            drawText(data[splitcount - i], 10, point, 'normal 22px Arial', '#605d68');
        }
        drawText(data[splitcount - i], 10, point + len, 'normal 22px Arial', '#605d68');
    }, 
    drawXLine: function (color, splitcount, linewidth, data) {
        var left = config.Left;
        var top = config.height - config.Bottom;
        var right = (config.width / 2 - config.Right) * scale;
        drawLine(config.Left, top, right, top, color, linewidth);
        var len = (right - left) / splitcount;

        for (var i = 0; i < splitcount + 1; i++) {
            var xpoint = left + len * i;
            drawLine(xpoint, top + linewidth, xpoint, top - 5 * scale, color, linewidth);
            var PanningLeft = data[i].toString().length * 5;
            drawText(data[i], xpoint - PanningLeft, top + 15 * scale, 'normal 22px Arial', '#605d68')
        }
    },

    drawLines: function (color, linewidth, data) {
        var count = data.length;
        var left = config.Left;
        var top = config.height - config.Bottom;
        var right = (config.width / 2 - config.Right) * scale;
        var len = (right - left) / (count - 1);
        var i = 0;

        var interval = setInterval(function () {
            if (i >= count - 1) {
                clearInterval(interval);
                return;
            }
            drawLine(left + len * i, top - (data[i] / 800) * (top - config.Top), left + len * (i + 1), top - (data[i + 1] / 800) * (top - config.Top), color, linewidth, 'bevel');
            i++;
        }, 30);
    },

    drawItem: function (text, color, linewidth) {
        var right = (config.width / 2 - config.Right) * scale;
        var left = right - (text.length * 10);
        drawText(text, left, config.Top - 10, 'normal 22px Arial', '#605d68');
        drawLine(left - 20, config.Top - 15, left - 80, config.Top - 15, color, linewidth);
    },

    drawLine: function (stx,startX, startY, endX, endY, color, width, lineJoin) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        if (color) {
            ctx.strokeStyle = color
        }

        if (width) {
            ctx.lineWidth = width * scale;
        }

        if (lineJoin) {
            ctx.lineJoin = lineJoin;
        }

        ctx.closePath();
        ctx.stroke();
    },

    drawText: function (ctx,text, x, y, font, color) {
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    } 
}


