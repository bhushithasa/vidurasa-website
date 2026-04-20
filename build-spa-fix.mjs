import fs from 'fs';
import path from 'path';

const cwd = process.cwd();

// Load HTML files
const indexHtml = fs.readFileSync(path.join(cwd, 'index.html'), 'utf8');
const aboutHtml = fs.readFileSync(path.join(cwd, 'about.html'), 'utf8');
const productsHtml = fs.readFileSync(path.join(cwd, 'products.html'), 'utf8');
const contactHtml = fs.readFileSync(path.join(cwd, 'contact.html'), 'utf8');

// Extract sections
const extractMain = (html) => {
    const match = html.match(/<main>([\s\S]*?)<\/main>/);
    return match ? match[1].trim() : '';
};

let homeSections = extractMain(indexHtml);
const keyExportDetailsRegex = /<section class="section container" style="padding-bottom: 2rem;">([\s\S]*?)<\/section>/;
const keyExportDetailsMatch = homeSections.match(keyExportDetailsRegex);
let keyExportDetails = keyExportDetailsMatch ? `<section class="section container" style="padding-bottom: 2rem;">${keyExportDetailsMatch[1]}</section>` : '';

const newHero = `
<section id="home" class="hero">
    <div class="container hero-layout">
        <div class="hero-sticky-element">
            <span class="badge">Export-Ready Ceylon Spices</span>
            <h1>Direct Supplier of Premium Ceylon Cinnamon to Global Markets</h1>
            <a href="#contact" class="btn">Request a Wholesale Quote</a>
        </div>
        <div class="hero-scrolling-content">
            <p style="font-size: 1.15rem; color: var(--text-muted); margin-bottom: 30px; line-height: 1.6;">An export-focused operation providing reliable bulk supply of authentic Cinnamomum verum. Directly sourced, meticulously graded, and securely shipped to international importers, distributors, and food manufacturers.</p>
            
            <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.3rem;">📍</span>
                    <h3 style="font-size: 1.1rem; color: var(--text-main); margin: 0; font-family: var(--f-sans);">Assured Origin</h3>
                </div>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">Cultivated and harvested directly in Sri Lanka—the authentic geographic source of true Ceylon cinnamon.</p>
            </div>

            <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 25px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.3rem;">🤝</span>
                    <h3 style="font-size: 1.1rem; color: var(--text-main); margin: 0; font-family: var(--f-sans);">Direct Sourcing</h3>
                </div>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">We procure directly from carefully maintained estates. Zero middlemen ensures optimal pricing and farm-to-port traceability.</p>
            </div>

            <div style="background: white; border: 1px solid var(--border); border-radius: 8px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
                    <span style="font-size: 1.3rem;">📋</span>
                    <h3 style="font-size: 1.1rem; color: var(--text-main); margin: 0; font-family: var(--f-sans);">Export-Ready Docs</h3>
                </div>
                <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.5;">All shipments include complete regulatory paperwork including Phytosanitary certificates, Certificate of Origin, and QA validation.</p>
            </div>
        </div>
    </div>
</section>
`;

let aboutContent = extractMain(aboutHtml).replace('<section class="section container">', '<section id="about" class="section container" style="padding-top: 80px;">');
let productsContent = extractMain(productsHtml).replace('<section class="section container">', '<section id="products" class="section container" style="padding-top: 80px; background-color: var(--surface); max-width: 100%;"><div class="container">').replace(/<\/section>$/, '</div></section>');
let contactContent = extractMain(contactHtml).replace('<section class="section container">', '<section id="contact" class="section container" style="padding-top: 80px; padding-bottom: 80px;">');

const combinedMain = `
${newHero}
${keyExportDetails}
${aboutContent}
${productsContent}
${contactContent}
`;

let finalHtml = indexHtml.replace(/<main>[\s\S]*?<\/main>/, `<main>${combinedMain}</main>`);

// Update navigation links
finalHtml = finalHtml.replace(/href="index\.html"/g, 'href="#home"');
finalHtml = finalHtml.replace(/href="about\.html"/g, 'href="#about"');
finalHtml = finalHtml.replace(/href="products\.html"/g, 'href="#products"');
finalHtml = finalHtml.replace(/href="contact\.html"/g, 'href="#contact"');

finalHtml = finalHtml.replace(/<a href="#home" class="logo">/, '<a href="#" class="logo">');
finalHtml = finalHtml.replace(/class="active"/g, '');

fs.writeFileSync(path.join(cwd, 'index.html'), finalHtml);
console.log('index.html fully regenerated');
