const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const glob = require('glob');

cloudinary.config({ 
  cloud_name: 'dusbwgei', 
  api_key: '662447261855681', 
  api_secret: 'KM4MZ9PCyeU0Rzid0w37FkTKaws' 
});

const uploadLargePromise = (file, options) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_large(file, options, (error, result) => {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

const ASSETS_JSON_PATH = 'src/content/cloudinary_assets.json';
const PUBLIC_JSON_PATH = 'public/cloudinary_assets.json';

const uploadMedia = async () => {
    // Load existing map — this lets us SKIP already-uploaded files
    let assetsMap = {};
    if (fs.existsSync(ASSETS_JSON_PATH)) {
        assetsMap = JSON.parse(fs.readFileSync(ASSETS_JSON_PATH, 'utf8'));
        console.log('📋 Loaded existing cloudinary_assets.json — will skip already uploaded files.\n');
    }

    // Build a flat set of all URLs already uploaded (for quick lookup)
    const alreadyUploadedUrls = new Set();
    for (const cat of Object.values(assetsMap)) {
        (cat.photos || []).forEach(u => alreadyUploadedUrls.add(u));
        (cat.videos || []).forEach(u => alreadyUploadedUrls.add(u));
    }

    const files = glob.sync('src/content/**/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,mp4,MP4,webm,WEBM,ogg,OGG}');
    console.log(`Found ${files.length} total media files.\n`);

    let newCount = 0;
    let skipCount = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const normalized = file.replace(/\\/g, "/");
        const parts = normalized.split('/');
        const contentIdx = parts.findIndex(p => p.toLowerCase() === 'content');
        if (contentIdx === -1 || contentIdx + 1 >= parts.length) continue;

        const category = parts[contentIdx + 1];
        // Skip the profile category from the gallery map (used separately in Hero)
        if (category.toLowerCase() === 'profile') continue;

        const isVideo = file.match(/\.(mp4|webm|ogg)$/i);
        const resourceType = isVideo ? 'video' : 'image';
        const mediaKey = isVideo ? 'videos' : 'photos';

        // ── Skip if this category already has media (already uploaded) ──────────
        // To force re-upload of a specific file, delete its URL from the JSON first.
        const existingCount = (assetsMap[category]?.[mediaKey] || []).length;
        if (existingCount > 0) {
            // Check by filename match in existing URLs
            const filename = path.basename(file).replace(/\[/g, '').replace(/\]/g, '').replace(/ /g, '_');
            const alreadyUploaded = (assetsMap[category]?.[mediaKey] || []).some(url =>
                url.toLowerCase().includes(filename.toLowerCase().split('.')[0])
            );
            if (alreadyUploaded) {
                console.log(`⏭️  Skipping [${i+1}/${files.length}]: ${file} (already uploaded)`);
                skipCount++;
                continue;
            }
        }

        console.log(`\n🚀 Uploading [${i+1}/${files.length}]: ${file}`);
        newCount++;
        
        try {
            const stats = fs.statSync(file);
            const fileSizeMB = stats.size / (1024 * 1024);
            let result;

            if (fileSizeMB > 90) {
                console.log(`   Large file (${fileSizeMB.toFixed(2)} MB), using chunked upload...`);
                result = await uploadLargePromise(file, {
                    resource_type: resourceType,
                    folder: `aniket_portfolio/${category}/${mediaKey}`,
                    chunk_size: 20000000
                });
            } else {
                result = await cloudinary.uploader.upload(file, {
                    resource_type: resourceType,
                    folder: `aniket_portfolio/${category}/${mediaKey}`,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true
                });
            }

            if (!assetsMap[category]) assetsMap[category] = { photos: [], videos: [] };
            assetsMap[category][mediaKey].push(result.secure_url);
            console.log(`   ✅ ${result.secure_url}`);

            // Save progress after every file so we don't lose work if interrupted
            fs.writeFileSync(ASSETS_JSON_PATH, JSON.stringify(assetsMap, null, 2));

        } catch (error) {
            console.error(`   ❌ Failed: ${error.message || error}`);
        }
    }

    // Final save + copy to public/ so the browser can fetch it
    fs.writeFileSync(ASSETS_JSON_PATH, JSON.stringify(assetsMap, null, 2));
    fs.mkdirSync('public', { recursive: true });
    fs.copyFileSync(ASSETS_JSON_PATH, PUBLIC_JSON_PATH);

    console.log(`\n✅ Done! Uploaded ${newCount} new files. Skipped ${skipCount} already uploaded.`);
    console.log(`📄 JSON saved to: ${ASSETS_JSON_PATH}`);
    console.log(`📄 JSON copied to: ${PUBLIC_JSON_PATH} (for browser fetch)`);
    console.log('\n📌 Next steps: git add . && git commit -m "update media" && git push');
};

uploadMedia();

