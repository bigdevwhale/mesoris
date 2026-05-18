"""Download ichthyosaurus and tylosaurus images from Wikimedia Commons."""
import sys, time
sys.path.insert(0, 'scripts')
import importlib.util

spec = importlib.util.spec_from_file_location('dl', 'scripts/download-images.py')
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

BASE_DIR = mod.BASE_DIR

wikimedia = {
    'ichthyosaurus': [
        'https://upload.wikimedia.org/wikipedia/commons/1/16/Ichthyosaurus_anningae_trio_NT_small.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/3f/Ichthyosaurus_BW.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/22/Mosasaurus_ichthyosaurus.jpg',
    ],
    'tylosaurus': [
        'https://upload.wikimedia.org/wikipedia/commons/1/15/Tylosaurus-proriger.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/4/42/TylosaurusDB2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/8/87/Tylosaurus_nepaeolicus_NT.png',
        'https://upload.wikimedia.org/wikipedia/commons/0/06/Mosasauride_Tylosaurus_paleoart.png',
    ],
}

for slug, urls in wikimedia.items():
    print(f'[{slug}]')
    out_dir = BASE_DIR / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    downloaded = []
    for url in urls:
        img = mod.download_image(url)
        if img:
            downloaded.append(img)
            fname = url.split('/')[-1]
            print(f'  downloaded {fname}')
        time.sleep(0.3)

    if not downloaded:
        print('  FAILED - no images downloaded')
        continue

    while len(downloaded) < 4:
        downloaded.append(downloaded[0])

    needed = {
        'hero':      out_dir / 'hero.webp',
        'card':      out_dir / 'card.webp',
        'gallery-1': out_dir / 'gallery-1.webp',
        'gallery-2': out_dir / 'gallery-2.webp',
    }
    mod.save_as_webp(downloaded[0], needed['hero'],      size=(1200, 600), quality=88)
    mod.save_as_webp(downloaded[1], needed['card'],      size=(400, 400),  quality=85)
    mod.save_as_webp(downloaded[2], needed['gallery-1'], size=(800, 500),  quality=85)
    mod.save_as_webp(downloaded[3], needed['gallery-2'], size=(800, 500),  quality=85)
    print(f'  saved hero, card, gallery-1, gallery-2')
