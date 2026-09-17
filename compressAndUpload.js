const { execSync } = require('child_process');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

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

const ffmpegPath = `"C:\\Users\\Yogesh\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg.Essentials_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-essentials_build\\bin\\ffmpeg.exe"`;

const filesToProcess = [
    { type: 'video', path: 'src/content/Other/videos/lv_0_20260105164930.mp4' },
    { type: 'video', path: 'src/content/Other/videos/lv_0_20251228194301.mp4' },
    { type: 'video', path: 'src/content/Fashion/videos/Inayat indoors.mp4' },
    { type: 'video', path: 'src/content/Events/videos/lv_0_20260801210953.mp4' },
    { type: 'video', path: 'src/content/Commercial/videos/oracle_reel1final_final.mp4' },
    { type: 'video', path: 'src/content/Commercial/videos/lv_0_20260907195100.mp4' },
    { type: 'video', path: 'src/content/Commercial/videos/lv_0_20251229163743.mp4' },
    { type: 'image', path: 'src/content/Events/photos/A6701041.JPG' },
    { type: 'image', path: 'src/content/Events/photos/A6700822.JPG' }
];

const processFiles = async () => {
    // Read existing map to update it
    const assetsMapPath = 'src/content/cloudinary_assets.json';
    let assetsMap = {};
    if (fs.existsSync(assetsMapPath)) {
        assetsMap = JSON.parse(fs.readFileSync(assetsMapPath, 'utf8'));
    }

    for (const file of filesToProcess) {
        console.log(`\nProcessing: ${file.path}`);
        if (!fs.existsSync(file.path)) {
            console.log(`File not found: ${file.path}`);
            continue;
        }

        const ext = path.extname(file.path);
        const compressedPath = file.path.replace(ext, `_compressed${ext}`);

        // Compress
        try {
            console.log(`Compressing...`);
            if (file.type === 'video') {
                // scale to 1080p max width/height, crf 28
                execSync(`${ffmpegPath} -y -i "${file.path}" -vcodec libx264 -crf 30 -preset fast -vf "scale='min(1920,iw)':-2" -b:a 128k "${compressedPath}"`, { stdio: 'pipe' });
            } else {
                // scale image to max 1920 width, q:v 5
                execSync(`${ffmpegPath} -y -i "${file.path}" -vf "scale='min(1920,iw)':-1" -q:v 5 "${compressedPath}"`, { stdio: 'pipe' });
            }
            
            const stats = fs.statSync(compressedPath);
            console.log(`Compressed successfully. New size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

            // Check if still too large
            if (file.type === 'video' && stats.size > 100 * 1024 * 1024) {
                console.error(`ERROR: Compressed video is still over 100MB (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
                continue;
            }

            // Extract category for upload
            const normalized = file.path.replace(/\\/g, "/");
            const parts = normalized.split('/');
            const contentIdx = parts.findIndex(p => p.toLowerCase() === 'content');
            const category = parts[contentIdx + 1];
            
            // Upload
            console.log(`Uploading...`);
            let result;
            if (file.type === 'video') {
                result = await uploadLargePromise(compressedPath, {
                    resource_type: 'video',
                    folder: `aniket_portfolio/${category}/videos`,
                    chunk_size: 20000000
                });
            } else {
                result = await cloudinary.uploader.upload(compressedPath, {
                    resource_type: 'image',
                    folder: `aniket_portfolio/${category}/photos`
                });
            }

            console.log(`Success: ${result.secure_url}`);

            // Update JSON map
            if (!assetsMap[category]) assetsMap[category] = { photos: [], videos: [] };
            if (file.type === 'video') assetsMap[category].videos.push(result.secure_url);
            else assetsMap[category].photos.push(result.secure_url);
            
            // Cleanup compressed file
            fs.unlinkSync(compressedPath);
            
        } catch (error) {
            console.error(`Failed to process ${file.path}:`, error.message || error);
        }
    }

    fs.writeFileSync(assetsMapPath, JSON.stringify(assetsMap, null, 2));
    console.log('\nAll done! Updated cloudinary_assets.json');
};

processFiles();
