from PIL import Image, ImageDraw, ImageFont
W,H=1920,1080
BG=(8,14,10); GREEN=(57,255,120); DIM=(140,200,150); WHITE=(235,245,235); AMBER=(255,200,80)
def font(sz, bold=False):
    p="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
    return ImageFont.truetype(p, sz)
def centered(d, y, text, f, fill):
    w=d.textlength(text, font=f)
    d.text(((W-w)/2, y), text, font=f, fill=fill)
    return y + f.size + 10

# --- title card awal ---
img=Image.new("RGB",(W,H),BG); d=ImageDraw.Draw(img)
d.rectangle([60,60,W-60,H-60], outline=GREEN, width=4)
y=300
y=centered(d,y,"GHOSTBOARD",font(150,True),GREEN)
y=centered(d,y+20,"The BBS That Refuses to Die",font(64,True),WHITE)
y=centered(d,y+10,"Live XAU/USD gold-trading terminal  ·  Built with Kiro",font(44),DIM)
y=centered(d,y+60,"KIROWEEN 2026",font(48,True),AMBER)
img.save("/home/hatch/workspace/cari-cuan/gas-semua/kiroween/produksi-v1/title-cards/awal.png")

# --- end card ---
img=Image.new("RGB",(W,H),BG); d=ImageDraw.Draw(img)
d.rectangle([60,60,W-60,H-60], outline=GREEN, width=4)
y=250
y=centered(d,y,"GHOSTBOARD",font(130,True),GREEN)
y=centered(d,y+20,"Try GHOSTBOARD live at the link below",font(56,True),WHITE)
y=centered(d,y+30,"Built with Kiro for Kiroween 2026",font(44),DIM)
y=centered(d,y+80,"Mission Control  ·  Habibie  ·  SBY  ·  Soekarno  ·  IDR",font(40),AMBER)
img.save("/home/hatch/workspace/cari-cuan/gas-semua/kiroween/produksi-v1/title-cards/akhir.png")
print("cards ok")
