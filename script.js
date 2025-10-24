const canvas = document.getElementById('algeriaFlag');
canvas.width = 600;
canvas.height = 400;
const ctx = canvas.getContext('2d');

let offset = 0;

function drawFlag() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // الشريط الأخضر
    ctx.fillStyle = '#006233';
    ctx.fillRect(0, 0, canvas.width/2, canvas.height);

    // الشريط الأبيض
    ctx.fillStyle = '#fff';
    ctx.fillRect(canvas.width/2, 0, canvas.width/2, canvas.height);

    // الهلال الأحمر
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 80, 0.5 * Math.PI + offset, 1.5 * Math.PI + offset, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#d60000';
    ctx.stroke();

    // النجمة
    ctx.save();
    ctx.translate(canvas.width/2 + 30, canvas.height/2);
    ctx.rotate(offset);
    ctx.beginPath();
    for(let i=0; i<5; i++){
        ctx.lineTo(0, -20);
        ctx.rotate((Math.PI * 2) / 5);
        ctx.lineTo(0, -10);
        ctx.rotate((Math.PI * 2) / 5);
    }
    ctx.fillStyle = '#d60000';
    ctx.fill();
    ctx.restore();

    offset += 0.01;
    requestAnimationFrame(drawFlag);
}

drawFlag();