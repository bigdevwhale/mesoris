"""
Download images for 10 new dinosaurs.
Primary source: dinosaurpictures.org
Fallback source: Wikimedia Commons search API
Outputs: public/images/dinosaurs/{slug}/hero.webp, card.webp, gallery-1.webp, gallery-2.webp
"""

import re
import time
from io import BytesIO
from pathlib import Path

import requests
from PIL import Image

BASE_DIR = Path(__file__).parent.parent / "public" / "images" / "dinosaurs"

SLUG_TO_GENUS = {
    "archaeopteryx": "Archaeopteryx",
    "dryosaurus": "Dryosaurus",
    "euhelopus": "Euhelopus",
    "gorgosaurus": "Gorgosaurus",
    "mamenchisaurus": "Mamenchisaurus",
    "monolophosaurus": "Monolophosaurus",
    "saurophaganax": "Saurophaganax",
    "dryptosaurus": "Dryptosaurus",
    "coelurus": "Coelurus",
    "othnielosaurus": "Othnielosaurus",
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) CopilotImageDownloader/1.0"
}


def fetch_dinosaurpictures_urls(genus: str) -> list[str]:
    url = f"https://dinosaurpictures.org/{genus}-pictures"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
    except Exception as exc:
        print(f"    dinosaurpictures page failed: {exc}")
        return []

    pattern_a = r'href="(https?://images\.dinosaurpictures\.org/[^"]+\.(?:jpg|jpeg|png))"[^>]*>\s*<img'
    pattern_b = r'src="(https?://images\.dinosaurpictures\.org/[^"]+\.(?:jpg|jpeg|png))"'
    urls = re.findall(pattern_a, resp.text) or re.findall(pattern_b, resp.text)

    dedup: list[str] = []
    seen = set()
    for u in urls:
        if u not in seen:
            seen.add(u)
            dedup.append(u)
    return dedup


def fetch_wikimedia_urls(genus: str) -> list[str]:
    params = {
        "action": "query",
        "generator": "search",
        "gsrsearch": f"{genus} dinosaur",
        "gsrnamespace": 6,
        "gsrlimit": 20,
        "prop": "imageinfo",
        "iiprop": "url",
        "format": "json",
        "formatversion": 2,
    }
    try:
        resp = requests.get("https://commons.wikimedia.org/w/api.php", params=params, headers=HEADERS, timeout=20)
        resp.raise_for_status()
        data = resp.json()
    except Exception as exc:
        print(f"    wikimedia search failed: {exc}")
        return []

    pages = data.get("query", {}).get("pages", [])
    urls: list[str] = []
    for page in pages:
        title = (page.get("title") or "").lower()
        if any(skip in title for skip in ("skeleton", "tooth", "vertebra", "fossil")):
            continue
        infos = page.get("imageinfo") or []
        if not infos:
            continue
        image_url = infos[0].get("url")
        if not image_url:
            continue
        if not re.search(r"\.(jpg|jpeg|png|webp)$", image_url, re.IGNORECASE):
            continue
        urls.append(image_url)

    dedup: list[str] = []
    seen = set()
    for u in urls:
        if u not in seen:
            seen.add(u)
            dedup.append(u)
    return dedup


def download_image(url: str) -> Image.Image | None:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=30)
        resp.raise_for_status()
        img = Image.open(BytesIO(resp.content))
        img.load()
        return img
    except Exception as exc:
        print(f"      download failed: {url} ({exc})")
        return None


def save_as_webp(img: Image.Image, path: Path, size: tuple[int, int], quality: int):
    local = img.copy()
    local.thumbnail(size, Image.LANCZOS)

    if local.mode in ("RGBA", "LA", "P"):
        if local.mode == "P":
            local = local.convert("RGBA")
        bg = Image.new("RGB", local.size, (255, 255, 255))
        bg.paste(local, mask=local.split()[-1] if local.mode in ("RGBA", "LA") else None)
        local = bg
    elif local.mode != "RGB":
        local = local.convert("RGB")

    local.save(path, "webp", quality=quality, method=6)


def ensure_four_images(slug: str, genus: str) -> str:
    out_dir = BASE_DIR / slug
    out_dir.mkdir(parents=True, exist_ok=True)

    targets = {
        "hero": out_dir / "hero.webp",
        "card": out_dir / "card.webp",
        "gallery-1": out_dir / "gallery-1.webp",
        "gallery-2": out_dir / "gallery-2.webp",
    }

    urls = fetch_dinosaurpictures_urls(genus)
    source = "dinosaurpictures.org"
    if not urls:
        urls = fetch_wikimedia_urls(genus)
        source = "wikimedia"
    elif len(urls) < 2:
        fallback = fetch_wikimedia_urls(genus)
        if fallback:
            urls.extend([u for u in fallback if u not in urls])
            source = "mixed"

    if not urls:
        raise RuntimeError(f"No image URLs found for {slug}")

    downloaded: list[Image.Image] = []
    for url in urls[:12]:
        if len(downloaded) >= 4:
            break
        img = download_image(url)
        if img:
            downloaded.append(img)
        time.sleep(0.25)

    if not downloaded:
        raise RuntimeError(f"All downloads failed for {slug}")

    while len(downloaded) < 4:
        downloaded.append(downloaded[0].copy())

    save_as_webp(downloaded[0], targets["hero"], (1200, 600), 88)
    save_as_webp(downloaded[1], targets["card"], (400, 400), 85)
    save_as_webp(downloaded[2], targets["gallery-1"], (800, 500), 85)
    save_as_webp(downloaded[3], targets["gallery-2"], (800, 500), 85)
    return source


def main():
    print(f"Output directory: {BASE_DIR}")
    fallback_used: list[str] = []
    success = 0

    for slug, genus in SLUG_TO_GENUS.items():
        print(f"\n[{slug}] {genus}")
        try:
            source = ensure_four_images(slug, genus)
            print(f"  ✓ saved 4 files (source: {source})")
            if source != "dinosaurpictures.org":
                fallback_used.append(slug)
            success += 1
        except Exception as exc:
            print(f"  ✗ failed: {exc}")

    print("\n" + "=" * 50)
    print(f"Succeeded: {success}/{len(SLUG_TO_GENUS)}")
    print("Fallback slugs:", ", ".join(fallback_used) if fallback_used else "none")


if __name__ == "__main__":
    main()

