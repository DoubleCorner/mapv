export function pin(context, x, y, size) {
  var w = (size / 5) * 3;
  // Height must be larger than width
  var h = Math.max(w, size);
  var r = w / 2;

  // Dist on y with tangent point and circle center
  var dy = (r * r) / (h - r);
  var cy = y - h + r + dy;
  var angle = Math.asin(dy / r);
  // Dist on x with tangent point and circle center
  var dx = Math.cos(angle) * r;

  var tanX = Math.sin(angle);
  var tanY = Math.cos(angle);

  var cpLen = r * 0.6;
  var cpLen2 = r * 0.7;

  context.moveTo(x - dx, cy + dy);

  context.arc(x, cy, r, Math.PI - angle, Math.PI * 2 + angle);
  context.bezierCurveTo(
    x + dx - tanX * cpLen,
    cy + dy + tanY * cpLen,
    x,
    y - cpLen2,
    x,
    y
  );
  context.bezierCurveTo(
    x,
    y - cpLen2,
    x - dx + tanX * cpLen,
    cy + dy + tanY * cpLen,
    x - dx,
    cy + dy
  );
}

export function roundRect(context, x, y, size) {
  var width = size;
  var height = size;
  var r = size / 4;
  var r1;
  var r2;
  var r3;
  var r4;

  // Convert width and height to positive for better borderRadius
  if (width < 0) {
    x = x + width;
    width = -width;
  }
  if (height < 0) {
    y = y + height;
    height = -height;
  }

  if (typeof r === "number") {
    r1 = r2 = r3 = r4 = r;
  } else if (r instanceof Array) {
    if (r.length === 1) {
      r1 = r2 = r3 = r4 = r[0];
    } else if (r.length === 2) {
      r1 = r3 = r[0];
      r2 = r4 = r[1];
    } else if (r.length === 3) {
      r1 = r[0];
      r2 = r4 = r[1];
      r3 = r[2];
    } else {
      r1 = r[0];
      r2 = r[1];
      r3 = r[2];
      r4 = r[3];
    }
  } else {
    r1 = r2 = r3 = r4 = 0;
  }

  var total;
  if (r1 + r2 > width) {
    total = r1 + r2;
    r1 *= width / total;
    r2 *= width / total;
  }
  if (r3 + r4 > width) {
    total = r3 + r4;
    r3 *= width / total;
    r4 *= width / total;
  }
  if (r2 + r3 > height) {
    total = r2 + r3;
    r2 *= height / total;
    r3 *= height / total;
  }
  if (r1 + r4 > height) {
    total = r1 + r4;
    r1 *= height / total;
    r4 *= height / total;
  }
  context.moveTo(x + r1, y);
  context.lineTo(x + width - r2, y);
  r2 !== 0 && context.arc(x + width - r2, y + r2, r2, -Math.PI / 2, 0);
  context.lineTo(x + width, y + height - r3);
  r3 !== 0 && context.arc(x + width - r3, y + height - r3, r3, 0, Math.PI / 2);
  context.lineTo(x + r4, y + height);
  r4 !== 0 && context.arc(x + r4, y + height - r4, r4, Math.PI / 2, Math.PI);
  context.lineTo(x, y + r1);
  r1 !== 0 && context.arc(x + r1, y + r1, r1, Math.PI, Math.PI * 1.5);
}

export function diamond(context, cx, cy, size) {
  var width = size / 2;
  var height = size / 2;
  context.moveTo(cx, cy - height);
  context.lineTo(cx + width, cy);
  context.lineTo(cx, cy + height);
  context.lineTo(cx - width, cy);
}

export function triangle(context, cx, cy, size) {
  var width = size / 2;
  var height = size / 2;
  context.moveTo(cx, cy - height);
  context.lineTo(cx + width, cy + height);
  context.lineTo(cx - width, cy + height);
}

export function arrow(context, x, y, size) {
  var height = size;
  var width = size;
  var dx = (width / 3) * 2;
  context.moveTo(x, y);
  context.lineTo(x + dx, y + height);
  context.lineTo(x, y + (height / 4) * 3);
  context.lineTo(x - dx, y + height);
  context.lineTo(x, y);
}
