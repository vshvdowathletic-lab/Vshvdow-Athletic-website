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
```

Every file sits flat in one folder now — nothing is inside a
sub-folder. That's deliberate (see the troubleshooting note below).

## 1. Put it on GitHub

1. Go to github.com and create a **new repository** (top right → "New
   repository"). Name it whatever you like, e.g. `vshvdow-website`.
   Keep it **Public** (Cloudflare Pages' free tier wants that) and
   don't add a README/gitignore when it asks — just click **Create**.
2. On the empty repo page, click **"uploading an existing file"**.
3. Drag in **all 22 files** — select them all at once in your file
   browser (click the first, shift-click the last) and drag that
   whole selection in together. Don't drag a folder.
4. Wait until you can see all 22 file names listed on the upload
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

## 4. A few things worth knowing about how it behaves

- **Hero button ("ENTER THE SHADOW")** and the bottom "Ready to start?"
  button scroll down to the Bundles. The header no longer has a button.
  The only buttons that open a DM are the "Join [bundle]" buttons on the
  three bundle cards, so you always know which bundle someone wants.
- **Instagram DM button**: Instagram doesn't let websites type a message
  into a DM, so tapping "Join [bundle]" copies a short, ready message to
  the visitor's clipboard and opens your Instagram DM in the same tap.
  They paste and send. The message follows the language they're using:
  English — "Hi Coach, I'd like to subscribe to the Private Athlete
  bundle. Please send me the full details and how I can start. Thanks!";
  Arabic — the same in Egyptian Arabic. Edit it in `DM_MESSAGES`
  (content.js).
- **Social icons** (footer): Instagram and TikTok.
- **Header**: transparent over the top of the hero video; as soon as
  the page scrolls, a frosted blur fades in behind it so the nav
  stays readable over anything. script.js also switches the text
  between white and black over the dark hero/photo bands versus the
  plain page sections. If you add another full-bleed dark section later and want
  the header to go white over it too, add its class name to the
  `DARK_ZONES` line near the top of script.js.
- **Products**: a photo banner and the four product cards in one calm row
  (it swipes sideways on phones).
- **Motion**: sections and cards fade up as you scroll to them, the
  pyramid builds itself from the base up, and bundle cards and buttons
  respond on hover. All of it switches off with "reduce motion".
- **Hero**: fills the whole screen. "PERFORMANCE UNDER PRESSURE" in
  normal-width Medium caps over two lines, "VSHVDOW ATHLETIC" under it,
  and a wide, square-cornered outline button. The video gets a
  high-contrast black & white grade, a vignette and light grain.
- **Header**: transparent over the hero; once you scroll, a soft fog
  fades in behind it (blurred at the top, dissolving downward, no edge
  line). The header logo is a slightly narrower SemiBold version.
- **Font weight**: every headline, title, the wordmark and the body
  text use Medium (500) — nothing on the site is bold.
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
- **Logo**: the header logo and the footer sign-off ("VSHVDOW ATHLETIC")
  are outlined SVG drawn from Archivo Expanded Light, written straight
  into index.html, so they look identical on every device and switch
  black/white with the header automatically. The crescent-V icon is
  `vshvdow-icon.svg` (used in the Products section) and the favicons.
- **Fonts**: Archivo for everything (Medium for text and headings,
  Expanded Light for the hero line and the big numbers), Cairo for
  Arabic. Both load from Google Fonts — no setup needed.
- **The pyramid** is drawn with real angled edges (via CSS clip-path)
  so the five tiers connect into one continuous pyramid shape, widest
  at the bottom, instead of separate stacked cards.
- **Footer wordmark**: now a large hollow/outlined "VSHVDOW", centered,
  sitting behind the tagline and social links as a quiet signature.
- **Favicon**: the new crescent-V icon, white on black, drawn a little
  heavier at small sizes so it stays clear in a browser tab.

## 5. Small copy fixes I made while building this

A few things from the original graphics that I cleaned up for the
permanent site text — flag anything you'd rather I revert:
- "change of diriction" → "change of direction"
- Private Athlete's Athletic components listed "Full athletic
  periodisation" twice — removed the duplicate
- "Muscles Gain" → "Muscle gain"
- "Bi-weekly check-in" (Foundation tier) → written out as "every 2
  weeks" so it can't be misread as twice-weekly
