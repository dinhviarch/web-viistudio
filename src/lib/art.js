// Sinh ảnh minh hoạ kiến trúc dạng SVG (mặt đứng tối giản) cho từng dự án.
// Đây là ảnh tạm — khi có ảnh công trình thật, khai báo `images` trong src/data/projects.js
// và build sẽ bỏ qua phần sinh ảnh này.

const PALETTES = {
  sand: { sky: '#EEE8DE', ground: '#D9D0C1', mass: '#FAF7F1', mass2: '#E6DED1', line: '#2B2926', accent: '#B4532A', green: '#7D8B6A', water: '#A9BDBE' },
  clay: { sky: '#F1E4D6', ground: '#D8C3AE', mass: '#FBF4EC', mass2: '#E9D6C3', line: '#33261E', accent: '#A8462A', green: '#6F7F5A', water: '#B3C2BD' },
  mist: { sky: '#E3E7E6', ground: '#C9CFCC', mass: '#F6F7F5', mass2: '#DCE1DE', line: '#23292A', accent: '#C0603A', green: '#6E8270', water: '#9EB6BA' },
  stone: { sky: '#E7E3DC', ground: '#CBC4B8', mass: '#F4F1EB', mass2: '#DAD3C7', line: '#262421', accent: '#8F5B3A', green: '#78806A', water: '#A4B5B5' }
};

const DUSK = { sky: '#25252A', ground: '#1A1A1E', mass: '#3B3A37', mass2: '#302F2D', line: '#8C877E', green: '#3D463A', water: '#3E4B52' };

function palette(name, variant) {
  const base = PALETTES[name] || PALETTES.sand;
  if (variant === 'dusk') return { ...base, ...DUSK, accent: '#E3A062', glass: '#F2C890', glassOpacity: 0.95, sun: '#E3A062' };
  return { ...base, glass: '#3A3F43', glassOpacity: 0.9, sun: base.accent };
}

const r = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const stroke = (p, w = 2) => `stroke="${p.line}" stroke-width="${w}"`;

function tree(x, base, size, p) {
  return `<line x1="${x}" y1="${base}" x2="${x}" y2="${base - size * 1.2}" ${stroke(p, 3)}/>` +
    `<circle cx="${x}" cy="${base - size * 1.55}" r="${size}" fill="${p.green}" opacity=".9"/>` +
    `<circle cx="${x - size * 0.55}" cy="${base - size * 1.2}" r="${size * 0.65}" fill="${p.green}" opacity=".75"/>`;
}

function pine(x, base, h, p) {
  return `<polygon points="${x - h * 0.28},${base} ${x},${base - h} ${x + h * 0.28},${base}" fill="${p.green}" opacity=".85"/>`;
}

function person(x, base, p, s = 1) {
  return `<g fill="${p.line}" opacity=".8"><circle cx="${x}" cy="${base - 46 * s}" r="${6 * s}"/>` +
    `<rect x="${x - 5 * s}" y="${base - 38 * s}" width="${10 * s}" height="${38 * s}" rx="${4 * s}"/></g>`;
}

function mullions(x, y, w, h, step, p) {
  let out = '';
  for (let i = x + step; i < x + w; i += step) out += `<line x1="${i}" y1="${y}" x2="${i}" y2="${y + h}" ${stroke(p, 1.5)}/>`;
  return out;
}

function glass(x, y, w, h, p, step = 0) {
  return r(x, y, w, h, p.glass, `opacity="${p.glassOpacity}"`) + (step ? mullions(x, y, w, h, step, p) : '');
}

const TYPES = {
  townhouse: {
    focus: [430, 160, 480, 360],
    draw(p) {
      let s = r(290, 330, 180, 390, p.mass2, 'opacity=".7"') + r(730, 270, 200, 450, p.mass2, 'opacity=".7"');
      s += r(470, 170, 260, 550, p.mass, stroke(p));
      for (let row = 0; row < 18; row++) {
        for (let col = 0; col < 11; col++) {
          s += r(493 + col * 20, 200 + row * 20, 13, 13, p.glass, `opacity="${p.glassOpacity * 0.55}"`);
        }
      }
      s += r(462, 370, 276, 10, p.mass2, stroke(p, 1.5)) + r(462, 565, 276, 10, p.mass2, stroke(p, 1.5));
      s += glass(500, 590, 200, 130, p, 50);
      [500, 560, 640, 700].forEach((x) => (s += `<circle cx="${x}" cy="168" r="${18 + (x % 3) * 4}" fill="${p.green}"/>`));
      [470, 730].forEach((x) => (s += `<circle cx="${x}" cy="384" r="14" fill="${p.green}"/><circle cx="${x}" cy="579" r="14" fill="${p.green}"/>`));
      return s + tree(890, 720, 46, p) + person(560, 720, p);
    }
  },

  house: {
    focus: [360, 380, 520, 390],
    draw(p) {
      let s = tree(760, 560, 105, p) + tree(250, 560, 60, p);
      s += r(200, 560, 640, 160, p.mass, stroke(p)) + glass(240, 592, 380, 128, p, 63);
      s += r(840, 560, 220, 12, p.line, 'opacity=".12"');
      s += r(400, 420, 660, 140, p.mass, stroke(p)) + glass(440, 462, 580, 52, p);
      for (let x = 452; x < 1020; x += 26) s += r(x, 462, 8, 52, p.mass2);
      s += r(880, 704, 300, 16, p.water) + r(660, 640, 120, 80, p.accent, 'opacity=".85"');
      return s + person(930, 704, p);
    }
  },

  gable: {
    focus: [560, 360, 460, 345],
    draw(p) {
      let s = pine(140, 720, 260, p) + pine(1060, 720, 300, p) + pine(1130, 720, 200, p);
      s += `<polygon points="240,720 240,480 420,330 600,480 600,720" fill="${p.mass}" ${stroke(p)}/>`;
      s += glass(300, 570, 90, 150, p) + glass(450, 520, 100, 84, p, 50);
      s += `<polygon points="620,720 620,520 790,400 960,520 960,720" fill="${p.mass2}" ${stroke(p)}/>`;
      s += glass(660, 566, 260, 154, p, 65) + `<circle cx="790" cy="478" r="22" fill="${p.glass}" opacity="${p.glassOpacity}"/>`;
      s += `<line x1="240" y1="480" x2="600" y2="480" ${stroke(p, 1.5)}/>` + r(600, 700, 20, 20, p.accent);
      return s + person(1000, 720, p);
    }
  },

  pavilion: {
    focus: [120, 400, 560, 420],
    draw(p) {
      let s = tree(110, 720, 70, p) + tree(1110, 720, 80, p) + tree(980, 470, 50, p);
      s += glass(220, 500, 760, 220, p) ;
      for (let y = 540; y < 720; y += 45) s += `<line x1="230" y1="${y}" x2="970" y2="${y}" stroke="${p.mass2}" stroke-width="3" opacity=".6"/>`;
      s += r(140, 438, 920, 12, p.mass2) + r(100, 450, 1000, 26, p.mass, stroke(p));
      for (let x = 160; x <= 1040; x += 110) s += r(x, 476, 10, 244, p.line, 'opacity=".85"');
      s += r(80, 712, 1040, 8, p.mass2, stroke(p, 1.5)) + r(100, 450, 1000, 4, p.accent);
      return s + person(420, 712, p) + person(450, 712, p, 0.9) + person(760, 712, p);
    }
  },

  arches: {
    focus: [160, 440, 540, 405],
    draw(p) {
      let s = tree(1110, 720, 60, p);
      s += r(140, 480, 920, 240, p.mass, stroke(p)) + r(140, 470, 920, 10, p.accent);
      for (let x = 170; x < 1050; x += 70) s += `<ellipse cx="${x}" cy="466" rx="34" ry="18" fill="${p.green}"/>`;
      for (let i = 0; i < 7; i++) {
        const x = 180 + i * 122;
        s += `<path d="M${x} 720V610A50 50 0 0 1 ${x + 100} 610V720Z" fill="${p.glass}" opacity="${p.glassOpacity}"/>`;
      }
      return s + person(330, 720, p, 0.7) + person(355, 720, p, 0.6) + person(620, 720, p);
    }
  },

  tower: {
    focus: [420, 60, 420, 315],
    draw(p) {
      let s = r(240, 300, 160, 420, p.mass2, 'opacity=".6"') + r(850, 220, 170, 500, p.mass2, 'opacity=".6"');
      s += r(470, 80, 300, 560, p.mass, stroke(p)) + glass(490, 100, 260, 520, p);
      for (let y = 106; y < 620; y += 22) s += r(470, y, 300, 7, p.mass2);
      for (let y = 330; y < 370; y += 14) s += `<ellipse cx="${520 + (y % 3) * 90}" cy="${y}" rx="40" ry="12" fill="${p.green}"/>`;
      for (let x = 520; x < 770; x += 50) s += `<line x1="${x}" y1="80" x2="${x}" y2="640" ${stroke(p, 1)} opacity=".35"/>`;
      s += r(360, 620, 520, 100, p.mass2, stroke(p)) + glass(560, 650, 120, 70, p, 40) + r(360, 612, 520, 8, p.accent);
      return s + tree(320, 720, 40, p) + tree(930, 720, 46, p) + person(720, 720, p);
    }
  },

  interior: {
    focus: [520, 160, 480, 360],
    draw(p) {
      let s = r(0, 0, 1200, 900, p.mass2);
      s += `<polygon points="0,900 1200,900 1000,640 200,640" fill="${p.ground}"/>`;
      s += `<polygon points="0,0 200,120 200,640 0,900" fill="${p.mass2}" ${stroke(p, 1.5)}/>`;
      s += `<polygon points="1200,0 1000,120 1000,640 1200,900" fill="${p.mass2}" ${stroke(p, 1.5)}/>`;
      s += r(200, 120, 800, 520, p.mass, stroke(p, 1.5));
      s += r(560, 180, 340, 360, p.sky) + `<circle cx="800" cy="260" r="40" fill="${p.sun}" opacity=".5"/>` + mullions(560, 180, 340, 360, 113, p);
      s += r(560, 180, 340, 360, 'none', stroke(p, 3));
      s += `<polygon points="560,640 900,640 980,880 420,880" fill="#fff" opacity="${p.glass === '#F2C890' ? 0.08 : 0.35}"/>`;
      for (let i = 0; i < 6; i++) s += r(220 + i * 40, 600 - i * 40, 160 - i * 20, 40, p.mass2, stroke(p, 1));
      s += r(600, 700, 260, 70, p.accent) + r(600, 680, 260, 26, p.accent, 'opacity=".8"') + r(890, 730, 90, 8, p.line);
      s += `<line x1="935" y1="738" x2="935" y2="800" ${stroke(p, 3)}/>`;
      s += `<line x1="440" y1="0" x2="440" y2="300" ${stroke(p, 2)}/><circle cx="440" cy="320" r="22" fill="${p.glass === '#F2C890' ? p.glass : p.line}"/>`;
      s += r(1040, 760, 50, 70, p.line, 'opacity=".8"') + `<circle cx="1065" cy="720" r="46" fill="${p.green}"/><circle cx="1035" cy="690" r="30" fill="${p.green}" opacity=".8"/>`;
      return s;
    }
  }
};

/**
 * @param {{type: string, palette?: string}} art
 * @param {{variant?: 'day'|'dusk', detail?: boolean}} opts
 */
function renderArt(art, { variant = 'day', detail = false } = {}) {
  const type = TYPES[art.type] || TYPES.house;
  const p = palette(art.palette, variant);
  const isInterior = art.type === 'interior';
  const scene = isInterior
    ? type.draw(p)
    : r(0, 0, 1200, 900, p.sky) +
      `<circle cx="${variant === 'dusk' ? 300 : 900}" cy="${variant === 'dusk' ? 600 : 210}" r="78" fill="${p.sun}" opacity=".8"/>` +
      r(0, 720, 1200, 180, p.ground) + `<line x1="0" y1="720" x2="1200" y2="720" ${stroke(p, 2)}/>` +
      type.draw(p);
  const viewBox = detail ? type.focus.join(' ') : '0 0 1200 900';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="1200" height="900" preserveAspectRatio="xMidYMid slice">${scene}</svg>`;
}

module.exports = { renderArt };
