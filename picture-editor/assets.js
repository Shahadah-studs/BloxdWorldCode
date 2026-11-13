const BloxdAssets = {
  drawVoxelPart(ctx, x, y, w, h, color, shadeDepth = 10) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);

    ctx.fillStyle = "rgba(0, 0, 0, 0.22)";
    ctx.fillRect(x + w - shadeDepth, y, shadeDepth, h);

    ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
    ctx.fillRect(x, y, w, 6);

    ctx.strokeStyle = "#090d16";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, w, h);
  },

  drawAvatar(ctx, layer) {
    const pose = layer.pose || "hero";
    const pantsColor = layer.pants || "#1e293b";

    if (layer.cape) {
      ctx.save();
      ctx.fillStyle = "#dc2626";
      ctx.beginPath();
      ctx.moveTo(-58, -45);
      ctx.lineTo(58, -45);
      ctx.lineTo(78, 165);
      ctx.lineTo(-78, 165);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = "#facc15";
      ctx.lineWidth = 5;
      ctx.stroke();
      ctx.restore();
    }

    // Left Leg
    ctx.save();
    ctx.translate(-26, 75);
    if (pose === "run") ctx.rotate(0.38);
    if (pose === "hero") ctx.rotate(0.06);
    this.drawVoxelPart(ctx, -22, 0, 44, 105, pantsColor, 8);
    this.drawVoxelPart(ctx, -24, 88, 48, 22, "#0f172a", 8);
    ctx.restore();

    // Right Leg
    ctx.save();
    ctx.translate(26, 75);
    if (pose === "run") ctx.rotate(-0.42);
    if (pose === "hero") ctx.rotate(-0.06);
    this.drawVoxelPart(ctx, -22, 0, 44, 105, pantsColor, 8);
    this.drawVoxelPart(ctx, -24, 88, 48, 22, "#0f172a", 8);
    ctx.restore();

    // Torso
    this.drawVoxelPart(ctx, -52, -45, 104, 122, layer.shirt, 14);
    ctx.fillStyle = layer.skin;
    ctx.fillRect(-18, -45, 36, 12);

    // Left Arm
    ctx.save();
    ctx.translate(-56, -38);
    if (pose === "wave") ctx.rotate(2.45);
    else if (pose === "battle") ctx.rotate(0.45);
    else if (pose === "run") ctx.rotate(-0.55);
    else ctx.rotate(0.14);
    this.drawVoxelPart(ctx, -32, 0, 34, 105, layer.skin, 7);
    this.drawVoxelPart(ctx, -32, 0, 34, 38, layer.shirt, 7);
    ctx.restore();

    // Right Arm
    ctx.save();
    ctx.translate(56, -38);
    if (pose === "battle") ctx.rotate(-0.85);
    else if (pose === "run") ctx.rotate(0.55);
    else ctx.rotate(-0.14);
    this.drawVoxelPart(ctx, -2, 0, 34, 105, layer.skin, 7);
    this.drawVoxelPart(ctx, -2, 0, 34, 38, layer.shirt, 7);
    ctx.restore();

    // Head
    this.drawVoxelPart(ctx, -50, -148, 100, 100, layer.skin, 14);

    // Hair / Hood
    ctx.fillStyle = layer.hair;
    ctx.fillRect(-52, -152, 104, 30);
    ctx.fillRect(-52, -126, 14, 26);
    ctx.fillRect(38, -126, 14, 26);
    ctx.strokeStyle = "#090d16";
    ctx.lineWidth = 4;
    ctx.strokeRect(-52, -152, 104, 30);

    // Eyes & Eyebrows
    ctx.fillStyle = layer.hair;
    ctx.fillRect(-35, -108, 24, 6);
    ctx.fillRect(11, -108, 24, 6);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-34, -98, 22, 18);
    ctx.fillRect(12, -98, 22, 18);

    ctx.fillStyle = "#0f172a";
    ctx.fillRect(-25, -98, 13, 18);
    ctx.fillRect(12, -98, 13, 18);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-23, -95, 5, 5);
    ctx.fillRect(14, -95, 5, 5);

    ctx.fillStyle = "#7c2d12";
    ctx.fillRect(-12, -66, 24, 5);
  },

  drawPixelGrid(ctx, rowString, colors, px = 15) {
    const rows = rowString.split(",");
    ctx.save();
    const size = rows.length;
    ctx.translate(-(size * px) / 2, -(size * px) / 2);
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const ch = rows[r].charAt(c);
        if (ch !== "0" && colors[ch]) {
          ctx.fillStyle = colors[ch];
          ctx.fillRect(c * px, r * px, px, px);
          ctx.strokeStyle = "rgba(0,0,0,0.45)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(c * px, r * px, px, px);
        }
      }
    }
    ctx.restore();
  },

  drawSword(ctx) {
    const grid = "0000000211,0000002112,0000021120,0000211200,0002112000,0321120000,0333200000,0043300000,0400300000,4000000000";
    this.drawPixelGrid(ctx, grid, {
      "1": "#0284c7",
      "2": "#7dd3fc",
      "3": "#1e3a8a",
      "4": "#92400e"
    });
  },

  drawKnightSword(ctx) {
    const grid = "0000000211,0000002112,0000021120,0000211200,0502112000,0551120000,0055550000,0040550000,0400000000,5000000000";
    this.drawPixelGrid(ctx, grid, {
      "1": "#94a3b8",
      "2": "#f8fafc",
      "4": "#78350f",
      "5": "#facc15"
    });
  },

  drawMoonstonePickaxe(ctx) {
    const grid = "0011111000,0122221100,1210002110,1100021011,0000400011,0004000001,0040000000,0400000000,4000000000,0000000000";
    this.drawPixelGrid(ctx, grid, {
      "1": "#0284c7",
      "2": "#bae6fd",
      "4": "#92400e"
    });
  },

  drawMoonstoneOrb(ctx) {
    const grid = "0001111000,0012222100,0123322210,1233221121,1222211121,1221111221,0121122210,0012222100,0001111000,0000000000";
    this.drawPixelGrid(ctx, grid, {
      "1": "#0369a1",
      "2": "#38bdf8",
      "3": "#e0f2fe"
    }, 14);
  },

  drawFireball(ctx) {
    const grid = "0000110000,0011221000,0122332100,1233332210,1233333211,1233333210,0123332100,0012221000,0001110000,0000000000";
    this.drawPixelGrid(ctx, grid, {
      "1": "#dc2626",
      "2": "#f97316",
      "3": "#fef08a"
    }, 14);
  },

  drawBedwarsBed(ctx) {
    ctx.fillStyle = "#78350f";
    ctx.fillRect(-95, 10, 190, 35);
    ctx.fillStyle = "#dc2626";
    ctx.fillRect(-40, -25, 130, 45);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(-90, -25, 50, 45);
    ctx.strokeStyle = "#090d16";
    ctx.lineWidth = 5;
    ctx.strokeRect(-95, -25, 190, 70);
  }
};
