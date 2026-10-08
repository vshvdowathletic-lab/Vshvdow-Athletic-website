# VSHVDOW website — how to deploy and edit it

This folder is your whole website. It's plain HTML/CSS/JavaScript —
no build step, no dependencies to install. You upload it to GitHub,
connect it to Cloudflare Pages, and it's live, free, forever, and you
can update it any time by editing one file.

```
index.html          page structure (you shouldn't need to touch this)
styles.css           visual design (you shouldn't need to touch this)
content.js           ALL text, prices, spots left, links — edit this
script.js             interactive behaviour (you shouldn't need to touch this)
favicon-16.png        browser-tab icon, small size
favicon-32.png        browser-tab icon
favicon-180.png       icon used when saved to a phone home screen
favicon-512.png       larger version of the same icon
hero.mp4              looping hero background video (desktop/tablet only)
hero.jpg, about.jpg, momentum.jpg, results.jpg, closing.jpg   the five photos
product-welcome.jpg, product-training.jpg,
product-nutrition.jpg, product-tracker.jpg    the four Products card photos
products-light.jpg, products-dark.jpg         Products banner (light / dark mode)
vshvdow-icon.svg      the crescent-V icon (used in Products)
aileron-300.woff2, aileron-400.woff2          the Aileron font (all the numbers)
```

Every file sits flat in one folder now — nothing is inside a
sub-folder. That's deliberate (see the troubleshooting note below).

## 1. Put it on GitHub

1. Go to github.com and create a **new repository** (top right → "New
   repository"). Name it whatever you like, e.g. `vshvdow-website`.
   Keep it **Public** (Cloudflare Pages' free tier wants that) and
   don't add a README/gitignore when it asks — just click **Create**.
2. On the empty repo page, click **"uploading an existing file"**.
3. Drag in **all 24 files** — select them all at once in your file
   browser (click the first, shift-click the last) and drag that
   whole selection in together. Don't drag a folder.
4. Wait until you can see all 24 file names listed on the upload
   screen before committing — if you only see a handful, the drag
   didn't pick everything up; clear it and try again.
5. Scroll down, click **Commit changes**.

### Why this matters — what likely happened last time
Your screenshot showed the hero photo missing, with everything else
working. That's the signature of GitHub's web uploader: when you drag
a *folder* (like the old `images/` folder) onto its "upload files"
box, it can silently fail to actually add the files inside it,
especially outside Chrome. Nothing in the code was broken — the
folder just didn't make it into the repository. Flattening everything
into one folder, with no sub-folder to drag, removes that whole
failure mode. If any image still doesn't show up after re-uploading,
open your repo on github.com and check the file list — if a file
like `hero.jpg` isn't listed there, it didn't upload; drag that one
file in on its own via **Add file → Upload files**.

## 2. Connect it to Cloudflare Pages

1. Log in to the Cloudflare dashboard → **Workers & Pages** → **Create**
   → **Pages** → **Connect to Git**.
2. Choose the repository you just created.
3. Build settings: leave **Framework preset** as "None" and leave the
   build command **empty**. Set **Build output directory** to `/`
   (just a single slash — this site has no build step, so Cloudflare
   just needs to serve the files as they are).
4. Click **Save and Deploy**. In a minute or two you'll get a live
   link like `vshvdow-website.pages.dev`.

That's it — from now on, any time you edit a file on GitHub (or push
new files), Cloudflare rebuilds the site automatically within a
minute. No re-uploading to Cloudflare, ever.

### Already deployed once? Update the existing site
Go to your repo on github.com, and for each file that changed here
(all of them, this round), click the file → the pencil/edit icon →
paste in the new version → **Commit changes**. Or delete the old
files and upload the new ones fresh, same as step 1. Either way,
Cloudflare redeploys automatically within a minute of the commit.
This round also adds two new files — `aileron-300.woff2` and
`aileron-400.woff2` — upload them next to the others (Add file →
Upload files).

### Adding your own domain later
Whenever you're ready: Cloudflare Pages project → **Custom domains**
→ **Set up a custom domain**, and follow the instructions. This part
isn't free (you have to buy the domain itself somewhere), but
connecting it to Pages is free.

## 3. Editing the site day-to-day

Open **`content.js`**. Every section is labelled. A few examples:

**Someone joins a bundle and you want to lower the spot count**
Find that bundle in the `BUNDLES` list, change `spotsLeft` to the new
number. Push the change to GitHub — the site updates itself. If you
set `spotsLeft: 0`, that bundle automatically switches to a
"Waitlist" button and badge — you don't need to change anything else.

**Changing a price**
Same place — `priceUSD` and `priceEGP` on each bundle.

**Adding real testimonials**
The "Results" section currently says case studies are on their way.
When you have some ready, tell me and I'll build out proper
testimonial cards with them — the section's already positioned and
ready to expand.

**Editing the About text, headline, or any other wording**
It's all in `content.js`, split into `en:` (English) and `ar:`
(Egyptian Arabic) — change either language independently. Keep the quotation
marks and commas exactly as they are; only change the words between
the quote marks.

**Changing your Instagram/TikTok links**
Right at the top of `content.js`, in the `CONFIG` block.

**Changing the DM message a bundle button copies**
`DM_MESSAGES` in `content.js` — one for joining, one for the waitlist,
in each language. `{name}` and `{price}` are filled in automatically.

**Changing a Products photo**
Each product in `PRODUCTS` (content.js) has an `image:` file name —
upload a new photo and point it there, or replace the file with the
same name.

**Swapping a photo**
Replace the file with a new one **using the exact same file name**
(e.g. `hero.jpg`) and upload it to the repo root (same place as the
others, no sub-folder) — it'll update automatically. Keep new photos
under ~500KB so the site stays fast — any free image compressor (like
squoosh.app) will do that in one click.

If you ever break something in `content.js` and the site stops
working, the most common cause is a missing comma or quotation mark
— feel free to paste the file back to me and I'll fix it.

## 4. Turn on the "Join the Shadow" email signup (one time)

The signup at the bottom of the page sends every email address to
**vshvdowathletic@gmail.com** through FormSubmit (free, no account,
no code to run). It needs one confirmation before it starts delivering:

1. After this update is live, open your site, scroll to **Join the
   Shadow**, type your own email and press **JOIN**. (This first time
   the page may say "Couldn't sign you up right now" — that's normal,
   the form isn't confirmed yet.)
2. Open vshvdowathletic@gmail.com — check Spam too — find the email
   from FormSubmit and click the button to **confirm / activate** it.
3. Done. Every signup now lands in your inbox as "New VSHVDOW signup",
   with the address and the language the visitor was reading in.

Optional: FormSubmit can also give you a random code that stands in for
your email address. If you get one, open `content.js` → `CONFIG` →
`signupEndpoint` and replace `vshvdowathletic@gmail.com` at the end of
the link with that code (keep `https://formsubmit.co/ajax/` in front).

Visitors see "You're in. See you in the dark." when it works, and a
short message under the box if the email is mistyped. A hidden trap
field quietly drops spam bots. All of the wording (both languages) is
in `content.js` under `join:`.

## 5. A few things worth knowing about how it behaves

- **Header logo**: the exact Canva logo — Raleway **Bold**, letter
  spacing −130, so the letters touch. It's drawn as an outlined SVG
  inside index.html, so it looks identical on every device (no font
  needed) and turns white over the dark photo areas automatically.
- **Header**: transparent over the hero; once you scroll, a soft fog
  fades in behind it. It turns white only when it's over the dark middle
  of a photo section (the hero, the "Built to perform" band and the
  "Ready to start?" section), and stays black over their faded edges and
  the plain sections. To add another dark section later, add its class
  to the `DARK_ZONES` line in script.js.
- **Section labels**: each section opens with a small numbered label
  ("01 — The method", "02 — Coaching" …). Change them in `content.js`
  under `eyebrows:` in each language.
- **Photo sections melt into the page**: the band and the "Ready to
  start?" photo fade into the page colour at the top and bottom
  instead of ending on a hard edge — in dark mode they dissolve into
  black.
- **Hero**: fills the whole screen. "PERFORMANCE UNDER PRESSURE" in
  small Medium caps over two lines, "VSHVDOW ATHLETIC" under it, the
  square outline "ENTER THE SHADOW" button, and a thin animated line at
  the bottom that hints to scroll. The video gets a black & white grade,
  a vignette and light grain.
- **Buttons**: "ENTER THE SHADOW" (hero) and "INTO THE SHADOW" (bottom)
  are transparent outline buttons that scroll to the Bundles. The header
  has no button. The only buttons that open a DM are the "Join [bundle]"
  buttons on the three bundle cards, so you always know which bundle
  someone wants.
- **Instagram DM button**: Instagram doesn't let websites type a message
  into a DM, so tapping "Join [bundle]" copies a short, ready message to
  the visitor's clipboard and opens your Instagram DM in the same tap.
  They paste and send. The message follows the language they're using:
  English — "Hi Coach, I'd like to subscribe to the Private Athlete
  bundle. Please send me the full details and how I can start. Thanks!";
  Arabic — the same in Egyptian Arabic. Edit it in `DM_MESSAGES`
  (content.js).
- **The pyramid** is drawn with hairlines that widen towards the base,
  with lots of space between the five layers. On phones the slope is
  gentler so every layer stays readable.
- **Products**: a photo banner and the four product cards in one calm
  row (it swipes sideways on phones).
- **Motion**: sections, labels and cards fade up as you scroll to them,
  the pyramid builds itself from the base up, and cards and buttons
  respond on hover. All of it switches off with "reduce motion".
- **Fonts**: Raleway for every letter, Aileron for every number on the
  site (prices, pyramid layers, labels, spots left, the year…), Cairo
  for Arabic. Aileron is hosted with the site (the two `.woff2` files),
  so it always loads; Raleway and Cairo load from Google Fonts.
- **Font weight**: headlines, titles and body text use Medium (500).
  The only bold thing on the site is the header logo.
- **Footer**: "VSHVDOW ATHLETIC" in wide spaced capitals, the tagline,
  Instagram and TikTok, and the © year (updates itself). Your email
  sits under the "Into the Shadow" button in the contact section.
- **Language and dark/light mode**: both remember the visitor's last
  choice (stored in their own browser), and both default to their
  system's preference the first time they visit.
- **Arabic**: written in Egyptian Arabic throughout, with training
  terms people actually use (فورم، باور، سبرنتات، ماكروز).
- **Hero video**: plays on tablet/desktop only — phones show the
  still `hero.jpg` instead, both to save mobile data and because a
  moving background is harder to read text over on a small screen.
  It also stays a still image for anyone with "reduce motion" turned
  on in their system settings. To swap the clip later, replace
  `hero.mp4` with a new file of the same name (keep it short, muted,
  and under ~10MB so it stays fast).
- **Favicon**: the crescent-V icon, white on black, drawn a little
  heavier at small sizes so it stays clear in a browser tab.

## 6. Small copy fixes I made while building this

A few things from the original graphics that I cleaned up for the
permanent site text — flag anything you'd rather I revert:
- "change of diriction" → "change of direction"
- Private Athlete's Athletic components listed "Full athletic
  periodisation" twice — removed the duplicate
- "Muscles Gain" → "Muscle gain"
- "Bi-weekly check-in" (Foundation tier) → written out as "every 2
  weeks" so it can't be misread as twice-weekly
