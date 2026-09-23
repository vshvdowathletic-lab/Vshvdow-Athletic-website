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
hero.jpg, about.jpg, momentum.jpg, results.jpg, closing.jpg   the five photos
```

Every file sits flat in one folder now — nothing is inside a
sub-folder. That's deliberate (see the troubleshooting note below).

## 1. Put it on GitHub

1. Go to github.com and create a **new repository** (top right → "New
   repository"). Name it whatever you like, e.g. `vshvdow-website`.
   Keep it **Public** (Cloudflare Pages' free tier wants that) and
   don't add a README/gitignore when it asks — just click **Create**.
2. On the empty repo page, click **"uploading an existing file"**.
3. Drag in **all 13 files** — select them all at once in your file
   browser (click the first, shift-click the last) and drag that
   whole selection in together. Don't drag a folder.
4. Wait until you can see all 13 file names listed on the upload
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
(Arabic) — change either language independently. Keep the quotation
marks and commas exactly as they are; only change the words between
the quote marks.

**Changing your WhatsApp/Instagram/Facebook links**
Right at the top of `content.js`, in the `CONFIG` block.

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

- **Instagram DM button**: Instagram doesn't let outside websites
  pre-fill a DM's text (WhatsApp allows this; Instagram doesn't), so
  clicking "Join [bundle]" copies a bundle-specific message to the
  clipboard and opens your DMs — the visitor just pastes it in. A
  little toast on screen tells them what happened.
- **WhatsApp button**: this one *can* pre-fill text, so the "Message
  on WhatsApp" button in the contact section opens a chat with your
  number and the message already typed in.
- **Language and dark/light mode**: both remember the visitor's last
  choice (stored in their own browser), and both default to their
  system's preference the first time they visit.
- **Arabic**: I used Modern Standard Arabic throughout rather than
  Egyptian colloquial, for a more universal, professional tone across
  MENA — happy to shift the tone if you'd prefer it more colloquial.
- **Fonts**: Raleway (headlines and body text) and Cairo (Arabic),
  with a little IBM Plex Mono on prices and stats for a "tracked
  data" feel. All load from Google Fonts automatically — no setup
  needed, this just works once the site is live on the internet.
- **Favicon**: now your V/lightning-bolt mark, with the white square
  behind it removed so it sits cleanly on both light and dark browser
  tabs.

## 5. Small copy fixes I made while building this

A few things from the original graphics that I cleaned up for the
permanent site text — flag anything you'd rather I revert:
- "change of diriction" → "change of direction"
- Private Athlete's Athletic components listed "Full athletic
  periodisation" twice — removed the duplicate
- "Muscles Gain" → "Muscle gain"
- "Bi-weekly check-in" (Foundation tier) → written out as "every 2
  weeks" so it can't be misread as twice-weekly
