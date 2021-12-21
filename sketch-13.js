import canvasSketch from "canvas-sketch";
import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

const margin = 0;

const settings = {};

const createGrid = size => {
  const points = [];
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      const u = size <= 1 ? 0 : x / size;
      const v = size <= 1 ? 0 : y / size;
      points.push([u, v]);
    }
  }
  return points;
};

const drawTile = (context, tileSize, x, y, rotation) => {
  const topLeft = [-tileSize / 2, -tileSize / 2];
  const bottomRight = [tileSize / 2, tileSize / 2];

  context.save();
  context.translate(x + tileSize / 2, y + tileSize / 2);
  context.rotate((rotation * Math.PI) / 180);

  context.strokeStyle = "white";
  context.lineWidth = tileSize * 0.15;

  context.beginPath();
  context.arc(...topLeft, tileSize / 2, 0, Math.PI * 0.5);
  context.stroke();

  context.beginPath();
  context.arc(...bottomRight, tileSize / 2, Math.PI * 1, Math.PI * 1.5);
  context.stroke();

  /*
  context.strokeStyle = "rgba(255, 255, 255, .1)";
  context.lineWidth = 1;
  context.strokeRect(...topLeft, tileSize, tileSize);
  */

  context.restore();
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#222222";
    context.fillRect(0, 0, width, height);

    const gridSize = 30;
    const largerSide = window.innerWidth > window.innerHeight ? width : height;
    const tileSize = largerSide / gridSize;

    const grid = createGrid(gridSize);
    grid.forEach(([u, v]) => {
      const x = lerp(margin, largerSide - margin, u);
      const y = lerp(margin, largerSide - margin, v);

      const rotation = random.pick([0, 90]);
      drawTile(context, tileSize, x, y, rotation);
    });
  };
};

canvasSketch(sketch, settings);

// .........lNK;............xWk'...........;0No.............lNK:............xWk............;0Nl........
// ........:0Nd............oXXc...........,kNO,............:0Nd............oXXc...........,kNO,........
// :,''';lkXKl.........':oOXO:........',cdKXx,.........';lkXKo.........,:oOXO:........',:dKXx,.........
// KK000K0kl'...'cdO000KK0xc....,lxO000KKOo;....:okO0000K0kl'...'cdO000KK0x:....,lxO000KKOo;....:okO000
// ',;:;,.....'oKXOoc::;,.....;xXKxoc:;,'.....cOX0dl:::;,.....'dKXOoc:;;,.....;kXKxoc:;,'.....c0X0dl::c
// ..........,ONk;...........cKXd'...........dN0c............;ONk;...........cXXd,...........dN0c......
// ..........xWk'...........;0No............lNK:.............xWk'...........;0No............lNK:.......
// .........,0Nl............cXK;............dWk.............,ONo............cX0;............dWk'.......
// .........lXK:............;KNl............lN0;............'kWk'...........xWk'............oN0;.......
// ........lKXo..............lXKl...........'xN0:............;0Nx,........,xN0:.............'xNO:......
// .',,;cd0XO:......,,,,......:OX0dc;,,'......l0XOoc;,,,'.....,xKKxl:;;:lxKXx,.....',,,'......o0XOoc;,,
// 0KK000Od:....;oO0K00K0Od;....:dO0000K0kl,...'cxO0000KKOxc'...,lk000000kl,...'cxOKK0KK0kl,...'cxO000K
// l:,''......;kX0dc;,,;cd0Xk;......'',;lkKKd'......',,,:oOX0c.......'''......c0XOo:;,,:lkXKo'......',;
// ..........:KXd'........'dXK:...........;kNk,............cKNo..............oNKc.........;ONk'........
// .........'kWx............xWk'...........,0No.............cXK:............;KXl...........,0No........
// .........,ONo............cX0;............xWk.............;KXc............lN0,............xWk........
// ..........xWO,...........,0No............lXK:............oN0;...........'kWx.............lNK:.......
// ..........,kNO:...........cKXx,...........dXKl'........,xXKc...........:ONO,..............dXKl'.....
// ,:cc:;'....'l0XOdocc:;'....,dKKkdlcc:,.....:kXKxolccldkKKx,.....,:ccldOX0l'....';:cc:,.....:kX0xolcl
// KK000KKOo,....:oxOO00K0kl'...'cdkOO0KK0x:....;lxkOOOOkdc'...'ck0K00OOxo:....,oOK00000K0x:....;lxkOOO
// ;'...':xXXo'.........,lOX0c.........';o0Xk;................c0XOl,..........oKXx:'...';o0Xk,.........
// ........;ONx............lXXl...........'xN0;..............lXXl............xN0;.........'xNO,........
// .........:KXc............dWO'...........'OWd.............'OWd............:KXc...........,ONo........
// .........,ONo............oN0,...........'kWd.............;KXc............oNO,...........'kWd........
// ..........dN0;..........;0Nd............lXXc.............xNO,...........;0Nd............lXXc........
// ..........'dXKo,......'lKNx'..........;xXKl............cONO;..........,lKXx'..........;xXKl.........
// :loool:'....:kKKOxddxOKKk:....':loodx0K0d,....,:looodk0KOl'....;coodxOKKk:....':loodx0K0d,....,:looo
// KOkkk0KKk:....'codxxdoc,....:xKK0kxxdl:'...'lOKKOkkxxol;....,d0K0Okxdoc,....:xKK0kxxdl:'...'lOKKOkkk
// '.....,l0Xk,..............,xX0o,..........:0XOc'...........oXXx;..........,xX0o,..........:0Xkc'....
// ........'kNk'............'kWk,...........:KNo.............oNK:...........'kNk,...........:KXo.......
// .........;KXc............:XK:............dWO'............,OWo............:XK:............dWO'.......
// .........:KXc............oNO,...........'kWd.............,OWo............:XK:............dWO'.......
// ........,kNk'...........:KNo............oNK:..............oNKc...........'kNk,...........:KNo.......
// '.....,o0Xx,..........:xXXo..........'cOX0:................lKXx:'.........,xXKo;..........:ONOc,....
// KOkkO0KKx:....,coxkkO0K0d,....;ldxkkOKKkl'...':odxkkxdl;....,o0K0Okxxoc,....:xKK0Okxdo:'...'lkKK0kkO
// :loolc;'....:kKKkdoolc,....'l0X0xdool:'....,dKKOxdoodx0X0o'....,cloodkKKk:....';clodxOKKd;....':lool
// ..........'xX0l'..........;OXk:...........lKXd;........:kN0:..........'l0Xx'..........,dXKl.........
// ..........dN0;...........,ONd............cXXc............dNO,...........,OWd............cXXc........
// .........,ONo............cXK;............dWk'............;KXc............lN0,...........'kWd........
// .........:KX:............dWO'............oNO,............'OWd............:KXc...........,ONo........
// ........:ONd............lXXl.............,ONx,............cXXl............dN0:.........,xNO,........
// ....',cxXXo.........';lOX0c...............,xXKd:,..........c0XOl;'.........oKXxc,'..,:dKXx,........'
// xOO00KKOo,...':dkOO0KK0xc....,lxkO0OOxo;....;d0KK000Okxl,....cx0KK0OOkdc'...,lOKK000KKOd;....;oxOO00
// xoc::;'....'o0XOdlc::,.....,xKKkolcclx0XOc.....,;::ccokKKx;.....,::cldOX0o'....';:::;,.....cOX0xlc::
// ..........,kNO:...........cKXd,.......'lKNd'...........,dXKc...........:kNO,..............dXKl......
// ..........xWk'...........,0No...........:KNl.............oN0;...........'kWx.............lNK:.......
// .........,ONo............cXK;............kWd.............;0Nl............lNO,............dWk'.......
// .........'kWx............;KXl...........;0No.............'kWx............xWk'............oN0;.......
// ..........;0Nx,...........oXKl.........:ONk'..............:0Nx,........,dXK:.............'kNO:......
// l:;,'......,xXKxl;,''......cOX0dc;,,:lkXKo'.....'',,'......;xXKxl;,,;cxKXx;......','......'oKXkl:,,'
// 0K0000Od:....;ok000000ko;....:dO0000K0xl,...'cx0000000Od:....;ok0K00K0ko;....:dO000000xc'...'lx0K000
// .',,;cd0XOc......',,:lxKXx;......',,'.....'o0Xko:;,,;co0XOc......',,'......:OX0dc;,;:lkXKo'.....',,;
// .......'xNKc...........;0WO,..............oNXl.........'xNKc..............:KWx'........lXNo.........