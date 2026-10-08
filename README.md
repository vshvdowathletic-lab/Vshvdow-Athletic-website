# VSHVDOW website: how to deploy and edit it

This folder is your whole website. It's plain HTML, CSS and JavaScript,
with no build step and nothing to install. It lives on GitHub,
Cloudflare publishes it, and you can update it any time by editing one
file.

```
index.html            page structure (you shouldn't need to touch this)
styles.css            visual design (you shouldn't need to touch this)
content.js            ALL text, prices, spots left, links: edit this one
script.js             interactive behaviour (you shouldn't need to touch this)
favicon-16.png        browser tab icon, small size
favicon-32.png        browser tab icon
favicon-180.png       icon used when saved to a phone home screen
favicon-512.png       larger version of the same icon
hero.mp4              looping hero background video (desktop and tablet only)
hero.jpg, about.jpg, momentum.jpg, results.jpg, closing.jpg    the five photos
product-welcome.jpg, product-training.jpg,
product-nutrition.jpg, product-tracker.jpg      the four Products card photos
products-light.jpg, products-dark.jpg           Products banner (light and dark mode)
vshvdow-icon.svg      the crescent V icon (used in Products)
aileron-300.woff2, aileron-400.woff2            the Aileron font (all the numbers)
```

Every file sits flat in one folder, with nothing inside a sub folder.
GitHub's web uploader sometimes drops the files inside a dragged
folder, so keeping everything flat avoids that.

## 1. Update the live site (what to do with this zip)

1. Open your repository on github.com.
2. Click **Add file**, then **Upload files**.
3. Drag in all 18 files from the zip at once (select them all, then
   drag the selection; don't drag a folder). Files with the same name
   are replaced.
4. Wait until every file name shows in the list, then click
   **Commit changes**.

Cloudflare publishes the new version by itself within a minute or two.
Your video and the five photos stay as they are, so they're not in the
zip.

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

**Changing your Instagram or TikTok links.**
At the top of `content.js`, in `CONFIG`.

**Changing the DM message a bundle button copies.**
`DM_MESSAGES` in `content.js`: one for joining, one for the waitlist, in
each language. `{name}` is filled in automatically.

**Changing a Products photo.**
Each product in `PRODUCTS` has an `image:` file name. Upload a new photo
and point it there, or replace the file using the same name.

**Swapping any photo.**
Upload a new file with the exact same name (for example `hero.jpg`) to
the same place as the others. Keep photos under about 500KB so the site
stays fast (squoosh.app does that in one click).

**Adding real testimonials.**
The Results section says case studies are on their way. When you have
some, send them over and I'll build proper testimonial cards.

If the site ever stops working after an edit to `content.js`, it's
almost always a missing comma or quotation mark. Paste the file back to
me and I'll fix it.

## 4. How it behaves

- **Header logo**: your exact Canva logo (Raleway Bold, letter spacing set to
  minus 130, letters touching), drawn as an outline so it looks identical on
  every device. It turns white over the dark photo areas.
- **Header**: transparent over the hero. Once you scroll, a soft fog
  fades in behind it. It turns white only over the dark middle of a
  photo section and stays black over the faded edges and the plain
  sections.
- **Hero**: fills the screen. "PERFORMANCE UNDER PRESSURE" over two
  lines, "VSHVDOW ATHLETIC" under it, the square outline "ENTER THE
  SHADOW" button, and a thin moving line at the bottom that invites a
  scroll.
- **Photo sections** fade into the page at the top and bottom instead
  of ending on a hard edge. In dark mode they dissolve into black.
- **Bundles**: prices written out in words, clean lists with no bullet
  marks, and thin square "Join" buttons.
- **Instagram DM**: Instagram doesn't let websites type into a DM, so
  "Join [bundle]" copies a short ready message and opens your Instagram
  DM in the same tap. The visitor pastes and sends. The message follows
  the language they're reading in.
- **The coach and Results** sit together as one story, with the photos
  on opposite sides.
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
