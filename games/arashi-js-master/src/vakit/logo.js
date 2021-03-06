// +size+ is a pair [width, height]
// +segments+ is a list of lists of the form [sx, sy, ex, ey].
// An extra item '-1' may be inserted, meaning the segment is closing the subpath.
var VectorLogo = function(size, lines) {
  this.size = size;
  this.lines = lines;
};

// This abuses the fact that javascript arrays are really special objects,
// and stores state in their properties.
VectorLogo.prototype.init = function(direction) {
  if (direction === undefined || direction === 'horizontal') {
    this.dsweep = 1 + (this.size[0] / 32);
    this.sweep = 0;
    this.vertical = false;
  }
  else {
    this.dsweep = 1 + (this.size[0] / 128);
    this.sweep = 2 * this.dsweep;
    this.vertical = true;
  }
  var lines = this.lines;
  for (var i = 0; i < lines.length; i++) {
    lines[i].state = false;
  }
};

// Returns true when the animation is finished.
VectorLogo.prototype.animate = function() {
  c.lineWidth = 2;
  c.lineCap = 'square';
  this.sweep += this.dsweep;
  var done = true;
  for (var i = 0; i < this.lines.length; i++) {
    var line = this.lines[i];
    switch (line.state) {
    case false:
      done = false;
      if ((this.vertical && this.sweep > line[3] + (line[1] / 2)) ||
          (!this.vertical && this.sweep > line[2] + (line[0] / 2))) {
        line.state = true;
        line.timer = 6;
      }
      break;
    case true:
      done = false;
      c.strokeStyle = 'blue';
      c.beginPath();
        SizzlingLine.draw(line[0], line[1], line[2], line[3],
            1 + Math.pow(2, 8 - (line.timer / 2)), 3);
      c.stroke();
      line.timer -= 1;
      if (line.timer === 0) { line.state = undefined; }
      break;
    case undefined:
      c.strokeStyle = 'yellow';
      c.beginPath();
        c.moveTo(line[0], line[1]);
        c.lineTo(line[2], line[3]);
      c.stroke();
      break;
    }
  }
  return done;
};


var ArashiLogo = new VectorLogo([656, 180], [
  // A
  [59,0, 117,180], [117,180, 0,180], [0,180, 27,104], [27,104, 50,104], [50,104, 32,158],
  [32,158, 86,158], [86,158, 50,36], [50,36, 59,0, -1],
  // R
  [109,45, 176,45], [176,45, 194,54], [194,54, 208,77], [208,77, 208,95], [208,95, 194,117],
  [194,117, 208,140], [208,140, 208,180], [208,180, 194,180], [194,180, 181,171],
  [181,171, 181,140], [181,140, 172,126], [172,126, 131,126], [131,126, 122,117],
  [122,117, 122,108], [122,108, 127,104], [127,104, 176,104], [176,104, 185,95],
  [185,95, 185,81], [185,81, 172,68], [172,68, 113,68], [113,68, 104,59], [104,59, 104,54],
  [104,54, 109,45, -1],
  // A
  [277,0, 335,180], [335,180, 218,180], [218,180, 245,104], [245,104, 268,104],
  [268,104, 250,158], [250,158, 304,158], [304,158, 268,36], [268,36, 277,0, -1],
  // S
  [348,158, 434,158], [434,158, 443,153], [443,153, 443,144], [443,144, 402,90],
  [402,90, 402,63], [402,63, 425,41], [425,41, 461,41], [461,41, 474,59], [474,59, 470,63],
  [470,63, 434,63], [434,63, 425,68], [425,68, 425,86], [425,86, 456,126], [456,126, 465,149],
  [465,149, 456,171], [456,171, 443,180], [443,180, 348,180], [348,180, 339,176],
  [339,176, 348,158, -1],
  // H, part 1
  [472,180, 521,18], [521,18, 530,9], [530,9, 539,32], [539,32, 517,108], [517,108, 557,108],
  [557,108, 566,126], [566,126, 512,126], [512,126, 494,180], [494,180, 472,180, -1],
  // H, part 2
  [557,180, 607,18], [607,18, 616,9], [616,9, 625,32], [625,32, 580,180], [580,180, 557,180, -1],
  // I
  [607,180, 638,72], [638,72, 647,63], [647,63, 656,86], [656,86, 629,180],
  [629,180, 607,180, -1]
]);

var GameOverLogo = new VectorLogo([1148, 180], [
  // G
  [136,44, 136,10], [136,10, 126,0], [126,0, 10,0], [10,0, 0,10], [0,10, 0,171], [0,171, 8,179],
  [8,179, 127,179], [127,179, 136,170], [136,170, 136,77], [136,77, 126,67], [126,67, 70,67],
  [70,67, 70,88], [70,88, 105,88], [105,88, 114,97], [114,97, 114,149], [114,149, 105,157],
  [105,157, 51,157], [51,157, 43,149], [43,149, 43,88], [43,88, 22,67], [22,67, 22,24],
  [22,24, 30,16], [30,16, 105,16], [105,16, 114,25], [114,25, 114,44], [114,44, 136,44, -1],
  // A
  [194,0, 252,179], [252,179, 135,179], [135,179, 163,102], [163,102, 185,102],
  [185,102, 167,157], [167,157, 221,157], [221,157, 185,36], [185,36, 194,0, -1],
  // M
  [297,179, 306,170], [306,170, 306,111], [306,111, 283,89], [283,89, 283,77], [283,77, 293,67],
  [293,67, 342,67], [342,67, 351,77], [351,77, 351,179], [351,179, 373,179], [373,179, 373,77],
  [373,77, 383,67], [383,67, 422,67], [422,67, 432,77], [432,77, 432,179], [432,179, 454,179],
  [454,179, 454,53], [454,53, 445,44], [445,44, 269,44], [269,44, 261,53], [261,53, 261,179],
  [261,179, 297,179, -1],
  // E, bottom
  [479,102, 469,112], [469,112, 469,171], [469,171, 477,179], [477,179, 586,179],
  [586,179, 586,157], [586,157, 518,157], [518,157, 510,149], [510,149, 510,125],
  [510,125, 586,125], [586,125, 586,102], [586,102, 479,102, -1],
  // E, top
  [479,53, 488,44], [488,44, 586,44], [586,44, 586,67], [586,67, 520,67], [520,67, 510,78],
  [510,78, 510,97], [510,97, 479,97], [479,97, 479,53, -1],
  // O
  [676,0, 666,10], [666,10, 666,171], [666,171, 674,179], [674,179, 776,179], [776,179, 784,171],
  [784,171, 784,139], [784,139, 766,157], [766,157, 718,157], [718,157, 710,149],
  [710,149, 710,32], [710,32, 720,22], [720,22, 757,22], [757,22, 766,31], [766,31, 766,144],
  [766,144, 784,126], [784,126, 784,10], [784,10, 774,0], [774,0, 676,0, -1],
  // V
  [810,44, 801,53], [801,53, 801,125], [801,125, 828,152], [828,152, 828,170],
  [828,170, 837,179], [837,179, 891,179], [891,179, 900,170], [900,170, 900,125],
  [900,125, 900,44], [900,44, 882,44], [882,44, 882,157], [882,157, 864,157], [864,157, 855,148],
  [855,148, 855,67], [855,67, 833,44], [833,44, 810,44, -1],
  // E, bottom
  [928,102, 918,112], [918,112, 918,171], [918,171, 926,179], [926,179, 1035,179],
  [1035,179, 1035,157], [1035,157, 967,157], [967,157, 959,149], [959,149, 959,125],
  [959,125, 1035,125], [1035,125, 1035,102], [1035,102, 928,102, -1],
  // E, top
  [928,53, 937,44], [937,44, 1035,44], [1035,44, 1035,67], [1035,67, 969,67], [969,67, 959,78],
  [959,78, 959,97], [959,97, 928,97], [928,97, 928,53, -1],
  // R
  [1049,44, 1116,44], [1116,44, 1134,53], [1134,53, 1148,76], [1148,76, 1148,94],
  [1148,94, 1134,116], [1134,116, 1148,139], [1148,139, 1148,179], [1148,179, 1134,179],
  [1134,179, 1121,170], [1121,170, 1121,139], [1121,139, 1112,125], [1112,125, 1071,125],
  [1071,125, 1062,116], [1062,116, 1062,107], [1062,107, 1067,103], [1067,103, 1116,103],
  [1116,103, 1125,94], [1125,94, 1125,80], [1125,80, 1112,67], [1112,67, 1053,67],
  [1053,67, 1044,58], [1044,58, 1044,53], [1044,53, 1049,44, -1]
]);
