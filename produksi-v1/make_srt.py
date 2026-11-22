import re
# (start, end) narasi per segmen di timeline final (jeda 0.5 dtk antar segmen)
segs = [
 (0.00, 13.01, "Meet GHOSTBOARD — a haunted bulletin board system, resurrected as a live gold-trading terminal. Built with Kiro in a single day, it turns a six-minute morning routine into a ten-second check."),
 (13.51, 39.33, "Today, a retail gold trader wastes six minutes every morning asking one question: should I trade today? Price app, then a dollar app, then digging through chat history for yesterday's notes, then typing the plan into MT5 digit by digit. Four apps, zero structure — and one typo costs real money. GHOSTBOARD answers in ten seconds, on one screen."),
 (39.83, 119.11, "Here's how it works. The trader opens GHOSTBOARD and the terminal dials in — live XAU/USD, three thousand seven hundred forty-one dollars, refreshed every sixty seconds. Now watch the Analysis Board: a four-layer validator checks the dollar, the 4-hour EMA50, the 24-hour move, and market structure. Under the hood, Kiro drove this build — specs first, then agent hooks that remind us to run the invariant checks after every task. You can see the full spec in our repo, under dot-kiro. In seconds, we get the verdict — and the Trade Plan Board turns it into an MT5-ready order: buy at three thousand seven hundred thirty-four, stop loss at three thousand seven hundred seventeen, take profit one at three thousand seven hundred sixty-eight — risk-reward one to two. And when no setup passes, it says WAIT, with the zone to watch — no invented entry, ever. Now the trader types plan in the command line — same board, no mouse needed. And the ticker keeps scrolling while the price refreshes. Everything you just saw runs on a real free price feed. Nothing here is mocked."),
 (119.61, 145.50, "We built GHOSTBOARD with plain HTML, CSS, and vanilla JavaScript — no backend, no build step, no login. Kiro's specs, steering docs, and hooks shaped the whole build. The hardest part was honesty: our sandboxed browser couldn't reach the price API, so we built a local relay that serves the real feed — and made the app say WAIT instead of inventing data."),
 (146.00, 168.44, "Next, we're adding live dollar and moving-average feeds, a real news wire, and a Kiro Crew app. We're Mission Control — Habibie builds, SBY cuts the video, Soekarno keeps the crew on course, and IDR trades the gold. Try GHOSTBOARD live at the link below. Thank you — built with Kiro for Kiroween 2026."),
]
def fmt(t):
    ms=int(round(t*1000)); h=ms//3600000; m=(ms%3600000)//60000; s=(ms%60000)//1000; r=ms%1000
    return f"{h:02d}:{m:02d}:{s:02d},{r:03d}"
cues=[]; n=0
for start,end,text in segs:
    sents=[s.strip() for s in re.split(r'(?<=[.!?])\s+', text) if s.strip()]
    total=sum(len(s.split()) for s in sents); cur=start
    for s in sents:
        w=len(s.split()); d=(end-start)*w/total
        n+=1; cues.append((n,cur,min(cur+d,end),s)); cur+=d
out=[]
for i,a,b,t in cues:
    out.append(f"{i}\n{fmt(a)} --> {fmt(b)}\n{t}\n")
open("/home/hatch/workspace/cari-cuan/gas-semua/kiroween/kiroween-video-draft-v1.srt","w").write("\n".join(out))
print("cues:",n)
