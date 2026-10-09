# VSHVDOW website: how to deploy and edit it

This folder is your whole website. It's plain HTML, CSS and JavaScript,
with no build step and nothing to install. It lives on GitHub,
Cloudflare publishes it, and you can update it any time by editing one
file.

```
index.html            the home page structure (you shouldn't need to touch this)
mission.html          the Mission page structure (you shouldn't need to touch this)
styles.css            visual design (you shouldn't need to touch this)
content.js            ALL text, prices, spots left, links: edit this one
script.js             interactive behaviour (you shouldn't need to touch this)
favicon-16.png        browser tab icon, small size
favicon-32.png        browser tab icon
favicon-180.png       icon used when saved to a phone home screen
favicon-512.png       larger version of the same icon
hero.mp4              looping hero background video (desktop and tablet only)
hero.jpg, about.jpg, momentum.jpg, results.jpg, closing.jpg    the five photos
product-welcome.mp4, product-training.mp4,
product-nutrition.mp4, product-tracker.mp4      the four Products card films
product-welcome.jpg, product-training.jpg,
product-nutrition.jpg, product-tracker.jpg      their stills (the first frame of each film)
vshvdow-icon.svg      the crescent icon (used in Products)
vshvdow-icon-small.svg  the same icon with a heavier body, for small sizes
mission-hero.jpg, mission-hero-1200.jpg         the Mission page photo (big and phone sizes)
aileron-300.woff2, aileron-400.woff2            the Aileron font (all the numbers)
```

Every file sits flat in one folder, with nothing inside a sub folder.
GitHub's web uploader sometimes drops the files inside a dragged
folder, so keeping everything flat avoids that.

## 1. Update the live site (what to do with this zip)

1. Open your repository on github.com.
2. Click **Add file**, then **Upload files**.
3. Drag in all 24 files from the zip at once (select them all, then
   drag the selection; don't drag a folder). Files with the same name
   are replaced.
4. Wait until every file name shows in the list, then click
   **Commit changes**.

Cloudflare publishes the new version by itself within a minute or two.
Your video and the five photos stay as they are, so they're not in the
zip.

The Products section no longer uses `products-light.jpg` and
`products-dark.jpg` (the banner photo is gone). They do no harm if they
stay in your repository. To tidy up, open each one on github.com, click
the **...** menu at the top right of the file, choose **Delete file**,
then **Commit changes**.

## 2. Turn on the "Join the Shadow" email signup (one time)

The signup at the bottom of the page sends every email address to
**vshvdowathletic@gmail.com** through FormSubmit (free, no account).
FormSubmit needs you to confirm it once before it starts delivering:

1. After this update is live, open your site, scroll to **Join the
   Shadow**, type any email and press **JOIN**.
2. The page will say: "Almost there. Open vshvdowathletic@gmail.com,
   press Activate Form in the email from FormSubmit, then sign up again."
3. Open vshvdowathletic@gmail.com (check Spam and Promotions too), find
   the email from FormSubmit and press **Activate Form**.
4. Sign up once more. This time the page says "You're in. See you in
   the dark." and you receive an email called **New VSHVDOW signup**
   with the address and the language the visitor was reading in.

From then on every signup lands in your inbox. Visitors never see the
activation message once it's confirmed.

Optional: FormSubmit can also give you a random code that stands in for
your email address. If you get one, open `content.js`, find
`signupEndpoint` in `CONFIG`, and replace `vshvdowathletic@gmail.com` at
the end of the link with that code (keep `https://formsubmit.co/ajax/`
in front of it).

## 3. Editing the site day to day

Open **`content.js`**. Every section is labelled.

**Someone joins a bundle and you want to lower the spot count.**
Find that bundle in `BUNDLES` and change `spotsLeft`. Set it to `0` and
that bundle switches to a waitlist button and badge by itself.

**Changing a price.**
Each bundle has `priceUSD: [16, 20]` and `priceEGP: [799, 999]`. The
two numbers are the low and the high end. The site writes them out as
"$16 to $20" and "799 to 999 EGP" (in Arabic "16 إلى 20 دولار" and
"799 إلى 999 جنيه"). For one fixed price, write a single number, like
`priceUSD: 20`.

**Editing any wording.**
Everything is in `content.js`, split into `en:` (English) and `ar:`
(Egyptian Arabic). Keep the quotation marks and commas exactly as they
are and only change the words between the quotes. The site's copy is
written without dashes; keep it that way when you add new lines.

**Editing the Mission page.**
Its words are in `content.js` under `mission:` (English) and the second
`mission:` (Arabic): the hero line, the statement, your own paragraph
(`note`) and the closing line. The menu label is `mission` inside `nav`.

**Changing your Instagram or TikTok links.**
At the top of `content.js`, in `CONFIG`.

**Changing the DM message a bundle button copies.**
`DM_MESSAGES` in `content.js`: one for joining, one for the waitlist, in
each language. `{name}` is filled in automatically.

**Changing a photo or a video.**
Part 5 below walks through it step by step: which file is where, the
right size for each, and how to prepare a new film for a Products card.

**Adding real testimonials.**
The Results section says case studies are on their way. When you have
some, send them over and I'll build proper testimonial cards.

If the site ever stops working after an edit to `content.js`, it's
almost always a missing comma or quotation mark. Paste the file back to
me and I'll fix it.

## 4. How it behaves

- **Logo**: VSHVDOW in Raleway Semibold, every letter joined to the
  next by exactly the same amount, and the crescent icon: the edge of a
  shadow, four arcs meeting in one sharp point with a small arch cut
  into it. Both are drawn as outlines inside the pages, so they look
  identical on every device. The browser tab icons (favicons) are the
  crescent too.
- **Header**: transparent over the hero. Once you scroll, a soft fog
  with a light blur fades in behind it. It turns white only over the dark middle of a
  photo section and stays black over the faded edges and the plain
  sections.
- **Hero**: fills the screen. "PERFORMANCE UNDER PRESSURE" over two
  lines, "VSHVDOW ATHLETIC" under it, the square outline "ENTER THE
  SHADOW" button, and a thin moving line at the bottom that invites a
  scroll.
- **Photo sections** fade into the page at the top and bottom instead
  of ending on a hard edge. In dark mode they dissolve into black.
- **Products**: a calm centred title (the crescent, "Products" and one
  line), then four tall cards in a row that slides sideways, sized like
  Opus Athletic's training principle cards: 3:4, about 3.3 across on a
  computer, 1.7 on a tablet, 1.2 on a phone. The row starts on the same
  line as the text and runs off the right edge (the left edge in
  Arabic), so the next card always peeks in. It snaps card by card:
  swipe on a phone or trackpad, drag it with a mouse, or use the arrow
  keys. A hairline under the cards fills as you move through them.
- **The product cards** have no frame: the crescent sits top right, and
  the number sits just above the title, bottom left. Each card is a short
  silent film in black and white: the welcome pack, rows for the training
  plan, pulldowns for nutrition, dips for the tracker. They're graded to
  match each other and the hero, slowed to 80%, and each one loops
  without a visible seam. A film only downloads when its card comes into
  view, plays while it's on screen and pauses when it isn't, so phones
  only load what someone actually reaches (all four together are about
  2.7 MB). Switching language doesn't restart them. Visitors with reduced
  motion or data saver turned on see each card's still instead.
- **Bundles**: prices written out in words, clean lists with no bullet
  marks, and thin square "Join" buttons.
- **Instagram DM**: Instagram doesn't let websites type into a DM, so
  "Join [bundle]" copies a short ready message and opens your Instagram
  DM in the same tap. The visitor pastes and sends. The message follows
  the language they're reading in.
- **The coach and Results** sit together as one story, with the photos
  on opposite sides.
- **Mission page** (`mission.html`): a light, foggy hero with "Built in
  the dark." over the sky, then one calm centred column: the statement,
  the creed, your own words, and the closing line "Become the athlete
  nobody saw coming.", signed VSHVDOW, with the "Enter the Shadow"
  button and the Join the Shadow signup. The hero stays light in dark
  mode too and sinks into black at the bottom. It's in the menu as
  "Mission" (underlined while you're on it), and the coach section on
  the home page links to it.
- **Moving between pages** cross-fades, in browsers that support it.
  The header looks the same on both pages, so it holds still through the
  fade.
- **Menu**: with six links, the header switches to the menu button on
  screens narrower than about 1140px (tablets and small laptops).
- **Footer**: one slim line with the name, Instagram and TikTok, and the
  © year (it updates itself).
- **Fonts**: Raleway for every letter, Aileron for every number, Cairo
  for Arabic. Aileron is hosted with the site, so it always loads.
- **Weights**: everything is Medium. The only bold thing is the header
  logo.
- **Motion**: sections fade up as you scroll, the pyramid builds from
  the base, cards respond on hover. All of it switches off for anyone
  with "reduce motion" turned on.
- **Language and dark mode** remember each visitor's last choice and
  start from their phone or computer setting on the first visit.
- **Hero video** plays on tablets and computers only. Phones show the
  still `hero.jpg`, which saves data and keeps the text easy to read.

## 5. Replacing a photo or a video

Every photo and video on the site is a single file in your GitHub
repository. To change one, you upload a new file with **exactly the same
name**. GitHub swaps it, Cloudflare publishes it, and nothing else needs
to change. You never touch the code for this.

### Step by step

1. Get the new file ready (the table below gives the right shape and size
   for each spot, and the sections after it explain how).
2. Rename it to exactly the name of the file it replaces, ending
   included: `about.jpg`, not `About.jpg`, `about.JPG` or `about.jpeg`.
   Capitals count.
3. Open your repository on github.com.
4. Click **Add file**, then **Upload files**.
5. Drag the new file in. Because the name already exists, it replaces the
   old one. You can drag several at once.
6. Wait until the file name shows in the list, then click **Commit
   changes**.
7. Give Cloudflare a minute or two, then open the site and refresh.

If you still see the old picture, your browser kept a copy. On a
computer press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R**
(Mac). On a phone, close the tab and open the site again, or open it in a
private tab.

### Which file is where

| File | Where it shows | Shape | Best size |
|---|---|---|---|
| `hero.mp4` | Home page, the full screen video behind "PERFORMANCE UNDER PRESSURE" (tablets and computers) | landscape 16:9 | 1920 × 1080, 8 to 15 seconds, under 8 MB |
| `hero.jpg` | The same spot on phones, the still before the video starts, and the picture shown when someone shares your link | landscape 16:9 | 1920 × 1080, under 400 KB |
| `momentum.jpg` | The dark band with "BUILT TO PERFORM · BUILT TO LAST" | landscape | 1920 × 1080 |
| `product-welcome.mp4` and `.jpg` | Products card 01, Welcome Pack: the film and its still | portrait 3:4 | 720 × 960, under 1 MB |
| `product-training.mp4` and `.jpg` | Card 02, Training Plan | portrait 3:4 | 720 × 960, under 1 MB |
| `product-nutrition.mp4` and `.jpg` | Card 03, Nutrition System | portrait 3:4 | 720 × 960, under 1 MB |
| `product-tracker.mp4` and `.jpg` | Card 04, Athlete Tracker | portrait 3:4 | 720 × 960, under 1 MB |
| `about.jpg` | About the coach | shows as a tall 4:5 crop of the middle | 1200 × 1500 portrait is ideal |
| `results.jpg` | Results | shows as a tall 4:5 crop of the middle | 1200 × 1500 portrait is ideal |
| `closing.jpg` | Behind "Ready to start?" at the bottom of the home page | landscape | 1920 × 1080 |
| `mission-hero.jpg` | The Mission page photo on computers | nearly square | 2000 wide |
| `mission-hero-1200.jpg` | The same photo, smaller, for phones | nearly square | 1200 wide |

### Replacing a photo

1. Use a JPG. Keep it under about 500 KB so the page stays fast. The
   free site **squoosh.app** does it in one go: drop the photo in, set
   the size from the table under Resize, choose MozJPEG with quality
   75 to 80, and download.
2. Name it exactly like the photo it replaces and upload it (steps
   above).

Things that keep each spot looking right:

* **Black and white**: only the hero video is turned black and white by
  the site itself. Every other photo shows exactly as you upload it, so
  use black and white versions to keep the look.
* **Hero, band and the closing photo**: the words sit in the middle over
  a dark tint, so a calm centre reads best.
* **About and Results**: the site shows the middle of the photo as a tall
  4:5 crop, so keep the person near the centre.
* **Mission**: upload both sizes of the same photo, the big one as
  `mission-hero.jpg` and a 1200 wide copy as `mission-hero-1200.jpg`.
  "Built in the dark." sits over the upper part, so a light, foggy sky
  there works best.
* **The hero video** plays on tablets and computers only. When you
  change `hero.mp4`, also save one frame of it as `hero.jpg`, so phones
  and the moment before it starts show the same scene.

### Replacing a Products film

Each card has two files that belong together:

* the **film**: `product-welcome.mp4`, `product-training.mp4`,
  `product-nutrition.mp4`, `product-tracker.mp4`
* its **still**: `product-welcome.jpg`, `product-training.jpg`, and so
  on. It's the very first frame of the film.

The still shows for the moment the film is loading, then the film fades
in over it. Because the still is the film's own first frame, nobody sees
the switch. So when you replace a film, replace its still too.

**What a film needs to be**

* **MP4 in H.264.** This plays everywhere. iPhones film in HEVC ("High
  Efficiency"), which some browsers can't play, so export as H.264 (or
  set Settings > Camera > Formats > Most Compatible before filming). Turn
  HDR off too (Settings > Camera > Record Video > HDR Video), because HDR
  looks washed out on websites.
* **Portrait, 3:4**, 720 × 960, the same shape as the cards (and as the
  four videos you sent). A normal tall phone video also works; the card
  shows its middle.
* **5 to 12 seconds**, no sound (the cards are always silent, so remove
  the audio track; it only adds weight).
* **Under about 1 MB.**
* **Black and white**, if you want it to sit with the other three.

**Preparing one for free with HandBrake** (handbrake.fr, Windows and Mac)

1. Open the video in HandBrake.
2. **Summary** tab: Format **MP4**, and tick **Web Optimized**.
3. **Dimensions** tab: Cropping **Custom**, then crop the top and bottom
   until the size reads 3:4 (for a 1080 wide video, 1440 tall). Set the
   width to **720**; the height becomes 960.
4. **Filters** tab: tick **Grayscale** for black and white.
5. **Video** tab: Video Encoder **H.264 (x264)**, Framerate **Same as
   source** with **Constant Framerate**, Quality **RF 26** (a higher RF
   makes a smaller file).
6. **Audio** tab: remove the audio track.
7. Click **Start**, then rename the result to the card's film name, for
   example `product-training.mp4`.

**Making its still**

1. Open the finished film in **VLC** (free, videolan.org) and pause it on
   the very first frame (press **E** to step one frame at a time).
2. Click **Video**, then **Take Snapshot**. VLC saves a picture of that
   frame in your Pictures folder (on a Mac, on the Desktop).
3. Put it through squoosh.app as a JPG (720 × 960, quality 80) and name
   it like the film with `.jpg` at the end, for example
   `product-training.jpg`.
4. Upload both files together.

If preparing films sounds like too much, send me the raw videos like you
did this time. I'll grade them to match the others, slow them, make each
one loop without a seam, and give you the film and its still with the
right names.

**Using different file names, or a photo only**

The names live in `content.js`, in `PRODUCTS`: `video:` is the film and
`image:` is the still. Point them at new names if you upload files
called something else. To make a card a plain photo with no film, write
`video: ""` and put the photo's name in `image:`.

### If something looks wrong

* **The old picture is still there**: refresh with Ctrl + Shift + R (or
  Cmd + Shift + R), or wait a few minutes for Cloudflare.
* **A card shows its still but never moves**: the film's name doesn't
  match `content.js` exactly (capitals too), or the film is HEVC. Export
  it as H.264 and upload it again.
* **A card is blank**: the still's name doesn't match.
* **It plays on a computer but not on an iPhone**: export with Web
  Optimized ticked, in H.264, with HDR off.
* **Low power mode on iPhones** stops every website's videos from
  playing by themselves. The cards show their stills then, which is
  expected.
