import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const source = 'C:/Users/AddizTech/Desktop/sticky_mobile_section';
const target = path.resolve('public/product-experience');
await fs.mkdir(target, { recursive: true });
const files = (await fs.readdir(path.join(source, 'assets'))).filter(name => /^(screen\d-\d\.jpg|phone-0[12]\.png|hand\.png)$/.test(name));
const metadata = {};
for (const name of files) {
  const output = name.replace(/\.(png|jpg)$/, '.webp');
  const width = name.startsWith('screen') ? 700 : name === 'hand.png' ? 1870 : 900;
  const result = await sharp(path.join(source, 'assets', name)).resize({ width, withoutEnlargement: true }).webp({ quality: 85, alphaQuality: 95 }).toFile(path.join(target, output));
  metadata[output] = { width: result.width, height: result.height };
}
await fs.copyFile(path.join(source, 'assets/phone.mp4'), path.join(target, 'phone.mp4'));
await fs.writeFile('src/config/product-assets.json', JSON.stringify(metadata, null, 2));

// Port only section CSS; no font files, global resets, scripts or preview footer.
let css = await fs.readFile(path.join(source, 'style.css'), 'utf8');
css = css.slice(css.indexOf('.service-area {'));
css = css.replace(/\.preview-footer[\s\S]*?(?=\/\* ========================================================)/, '');
const names = {
  'service-area':'alp_product-services', 'rr-container-1650':'alp_product-container', 'rr-ov-hidden':'alp_product-overflow', 'section-spacing-top':'alp_product-spacing', 'section-header':'alp_product-heading', 'section-title':'alp_product-title',
  'services-wrapper-box':'alp_product-stage', 'phone-mockup':'alp_product-phone', 'mockup-header':'alp_product-phone-header', 'mockup-logo':'alp_product-logo', 'mockup-offcanvas':'alp_product-menu', 'mockup-text':'alp_product-phone-text', 'underline':'alp_product-underline',
  'services-wrapper-1':'alp_product-cards', 'service-box-1':'alp_product-card', 'thumb':'alp_product-card-icon', 'content':'alp_product-card-content', 'title':'alp_product-card-title', 'add':'alp_product-plus', 'add-shape-wrapper':'alp_product-plus-wrap', 'add-shape':'alp_product-plus-shape',
  'development_dev__ZUMqF':'alp_product-development', 'development_contentbox__UjoNa':'alp_product-development-content', 'development_dev_container__GvCfx':'alp_product-development-container', 'dev-line_line__aWpS_':'alp_product-line', 'dev-line_line_svg__lTEBS':'alp_product-line-svg',
  'development_dev_marquee__bRhyK':'alp_product-marquee', 'marquee_marquee__ZFB97':'alp_product-marquee-base', 'marquee_marquee_wrapper__OPxaX':'alp_product-marquee-track', 'marquee_marquee_item__kBXsQ':'alp_product-marquee-item', 'marquee_marquee_repeater__Yd3f3':'alp_product-marquee-repeat', 'development_dev_marquee_text__oxpfZ':'alp_product-marquee-text',
  'dev-content_dev_content__EguIn':'alp_product-dev-copy', 'dev-content_dev_title__nwp5r':'alp_product-dev-heading', 'dev-content_dev_title_sd__B29dd':'alp_product-dev-title', 'dev-content_dev_title_stars__qdKOg':'alp_product-dev-stars', 'dev-content_dev_bottom__wIerq':'alp_product-dev-bottom', 'dev-content_dev_text__3EkeN':'alp_product-dev-description', 'dev-content_dev_controls__wP5T_':'alp_product-dev-actions',
  'dev-content_dev_btn_white__xEXo0':'alp_product-old-button-white', 'dev-content_dev_btn_gray__6rVLp':'alp_product-old-button-gray', 'development_dev_phones__imyxO':'alp_product-floating-phones', 'development_dev_phones_left__bMCN4':'alp_product-phone-left', 'development_dev_phones_right__HDoTA':'alp_product-phone-right',
  'development_dev_screens__CsH88':'alp_product-screens', 'development_dev_screens_wrapper__6yBxK':'alp_product-screens-wrapper', 'dev-screens_screens__pjAOM':'alp_product-screen-grid', 'dev-screens_screens_list__BiiTu':'alp_product-screen-row', 'dev-screens_screens_item__7a__O':'alp_product-screen-item', 'dev-media_media__rjGrk':'alp_product-screen-media', 'dev-media_media_preview__gac3v':'alp_product-screen-image', 'dev-screens_screens_logo__dgfZA':'alp_product-screen-logo',
  'development_dev_hand_wrapper__ho2uK':'alp_product-hand-wrapper', 'development_dev_hand__CESVA':'alp_product-hand', 'development_dev_hand_image__G9lS_':'alp_product-hand-image', 'dev-video_video__oxf1k':'alp_product-video',
};
css = css.replace(/\.([a-zA-Z][\w-]*)/g, (match, name) => '.' + (names[name] ?? 'alp_' + name));
css = css.replaceAll('marquee_toRight__MlZ3a', 'alp_product_marquee').replaceAll('development_float__BW2Xy', 'alp_product_float');
css = css.replaceAll("'BDOGrotesk', sans-serif", 'var(--alp_font-heading)').replaceAll("'Inter', sans-serif", 'var(--alp_font-body)').replaceAll("'Plus Jakarta Sans', sans-serif", 'var(--alp_font-body)');
css = css.replaceAll('#0d0f11', 'var(--alp_product-dark)').replaceAll('#f6f6f7', 'var(--alp_page-surface)');
// Initial stacked cards are applied by GSAP only, so no-JS/reduced-motion stays usable.
css = css.replace(/\/\* Stacking positions[\s\S]*?(?=\.alp_product-card \{)/, '');
const cssPath = 'src/styles/product-experience.css';
const marker = '/* Algofort integration:';
const existing = await fs.readFile(cssPath, 'utf8').catch(() => '');
const overrides = existing.includes(marker) ? existing.slice(existing.indexOf(marker)) : '';
await fs.writeFile(cssPath, css + '\n' + overrides);
console.log('Imported optimized assets and scoped source CSS:', files.length);
