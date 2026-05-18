"""
Download dinosaur images from dinosaurpictures.org and save as webp files.
Images are saved to: public/images/dinosaurs/{slug}/
Files: hero.webp, card.webp, gallery-1.webp, gallery-2.webp
"""

import os
import re
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path
from io import BytesIO

try:
    import requests
    from PIL import Image
except ImportError:
    print("Missing dependencies. Run: python -m pip install requests Pillow")
    sys.exit(1)

# Base directory
BASE_DIR = Path(__file__).parent.parent / "public" / "images" / "dinosaurs"

# Slug → genus name mapping for dinosaurpictures.org URL
SLUG_TO_GENUS = {
    "tyrannosaurus-rex": "Tyrannosaurus",
    "triceratops": "Triceratops",
    "velociraptor": "Velociraptor",
    "brachiosaurus": "Brachiosaurus",
    "stegosaurus": "Stegosaurus",
    "spinosaurus": "Spinosaurus",
    "ankylosaurus": "Ankylosaurus",
    "parasaurolophus": "Parasaurolophus",
    "diplodocus": "Diplodocus",
    "allosaurus": "Allosaurus",
    "pteranodon": "Pteranodon",
    "mosasaurus": "Mosasaurus",
    "apatosaurus": "Apatosaurus",
    "baryonyx": "Baryonyx",
    "carnotaurus": "Carnotaurus",
    "ceratosaurus": "Ceratosaurus",
    "coelophysis": "Coelophysis",
    "compsognathus": "Compsognathus",
    "corythosaurus": "Corythosaurus",
    "daspletosaurus": "Daspletosaurus",
    "deinonychus": "Deinonychus",
    "edmontosaurus": "Edmontosaurus",
    "euoplocephalus": "Euoplocephalus",
    "gallimimus": "Gallimimus",
    "giganotosaurus": "Giganotosaurus",
    "iguanodon": "Iguanodon",
    "lambeosaurus": "Lambeosaurus",
    "maiasaura": "Maiasaura",
    "megalosaurus": "Megalosaurus",
    "ornithomimus": "Ornithomimus",
    "oviraptor": "Oviraptor",
    "pachycephalosaurus": "Pachycephalosaurus",
    "pachyrhinosaurus": "Pachyrhinosaurus",
    "plateosaurus": "Plateosaurus",
    "protoceratops": "Protoceratops",
    "styracosaurus": "Styracosaurus",
    "therizinosaurus": "Therizinosaurus",
    "troodon": "Troodon",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def fetch_image_urls(genus: str) -> list[str]:
    """Fetch image URLs from dinosaurpictures.org for a given genus."""
    url = f"https://dinosaurpictures.org/{genus}-pictures"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
    except Exception as e:
        print(f"  ✗ Failed to fetch page for {genus}: {e}")
        return []

    # Extract image URLs from img tags inside .img-container divs
    # Pattern: <a href="http://images.dinosaurpictures.org/...jpg" target="_blank">
    pattern = r'href="(https?://images\.dinosaurpictures\.org/[^"]+\.jpg)"[^>]*>\s*<img'
    urls = re.findall(pattern, resp.text)

    if not urls:
        # Fallback: any img src from images.dinosaurpictures.org
        pattern2 = r'src="(https?://images\.dinosaurpictures\.org/[^"]+\.jpg)"'
        urls = re.findall(pattern2, resp.text)

    # Deduplicate while preserving order
    seen = set()
    unique_urls = []
    for u in urls:
        if u not in seen:
            seen.add(u)
            unique_urls.append(u)

    return unique_urls


def download_image(url: str) -> Image.Image | None:
    """Download an image and return as PIL Image."""
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20, stream=True)
        resp.raise_for_status()
        img = Image.open(BytesIO(resp.content))
        img.load()  # ensure fully loaded
        return img
    except Exception as e:
        print(f"    ✗ Failed to download {url}: {e}")
        return None


def save_as_webp(img: Image.Image, path: Path, size: tuple[int, int] | None = None, quality: int = 85):
    """Save PIL Image as webp, optionally resizing."""
    if size:
        img = img.copy()
        img.thumbnail(size, Image.LANCZOS)
    # Convert to RGB if necessary (webp doesn't support RGBA well without transparency)
    if img.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        bg.paste(img, mask=img.split()[-1] if img.mode in ("RGBA", "LA") else None)
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")
    img.save(path, "webp", quality=quality, method=6)


def process_dinosaur(slug: str, genus: str):
    """Download and save images for one dinosaur."""
    out_dir = BASE_DIR / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    # Check which files already exist
    needed = {
        "hero": out_dir / "hero.webp",
        "card": out_dir / "card.webp",
        "gallery-1": out_dir / "gallery-1.webp",
        "gallery-2": out_dir / "gallery-2.webp",
    }
    missing = {k: v for k, v in needed.items() if not v.exists()}
    if not missing:
        print(f"  ✓ {slug} — all images already present, skipping")
        return True

    print(f"  → {slug} ({genus}): fetching page...")
    image_urls = fetch_image_urls(genus)

    if not image_urls:
        print(f"  ✗ {slug}: no images found on dinosaurpictures.org")
        return False

    print(f"    Found {len(image_urls)} image(s)")

    # Download up to 4 images
    downloaded = []
    for url in image_urls[:6]:  # try up to 6 in case some fail
        if len(downloaded) >= 4:
            break
        img = download_image(url)
        if img:
            downloaded.append(img)
        time.sleep(0.3)  # be polite

    if not downloaded:
        print(f"  ✗ {slug}: all downloads failed")
        return False

    # Assign roles
    # hero: large landscape, 1200x600
    # card: square thumbnail, 400x400
    # gallery-1, gallery-2: medium, 800x500

    imgs = downloaded
    # If we have fewer than 4, reuse the first image
    while len(imgs) < 4:
        imgs.append(imgs[0])

    save_as_webp(imgs[0], needed["hero"],   size=(1200, 600), quality=88)
    save_as_webp(imgs[1], needed["card"],   size=(400, 400),  quality=85)
    save_as_webp(imgs[2], needed["gallery-1"], size=(800, 500), quality=85)
    save_as_webp(imgs[3], needed["gallery-2"], size=(800, 500), quality=85)

    print(f"  ✓ {slug}: saved hero, card, gallery-1, gallery-2")
    return True


def main():
    print(f"Downloading dinosaur images to: {BASE_DIR}\n")
    success = 0
    failed = []

    for slug, genus in SLUG_TO_GENUS.items():
        print(f"[{slug}]")
        ok = process_dinosaur(slug, genus)
        if ok:
            success += 1
        else:
            failed.append(slug)
        time.sleep(0.5)  # be polite between requests

    print(f"\n{'='*50}")
    print(f"Done: {success}/{len(SLUG_TO_GENUS)} succeeded")
    if failed:
        print(f"Failed: {', '.join(failed)}")


if __name__ == "__main__":
    main()
