import sys, time
sys.path.insert(0, 'scripts')
import importlib.util

spec = importlib.util.spec_from_file_location('dl', 'scripts/download-images.py')
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

new_dinosaurs = {
    'dilophosaurus': 'Dilophosaurus',
    'argentinosaurus': 'Argentinosaurus',
    'carcharodontosaurus': 'Carcharodontosaurus',
    'utahraptor': 'Utahraptor',
    'microraptor': 'Microraptor',
    'amargasaurus': 'Amargasaurus',
    'albertosaurus': 'Albertosaurus',
    'suchomimus': 'Suchomimus',
    'tarbosaurus': 'Tarbosaurus',
    'kentrosaurus': 'Kentrosaurus',
    'psittacosaurus': 'Psittacosaurus',
    'liopleurodon': 'Liopleurodon',
    'acrocanthosaurus': 'Acrocanthosaurus',
    'nigersaurus': 'Nigersaurus',
    'sauroposeidon': 'Sauroposeidon',
}

success = 0
failed = []
for slug, genus in new_dinosaurs.items():
    print(f'[{slug}]')
    ok = mod.process_dinosaur(slug, genus)
    if ok: success += 1
    else: failed.append(slug)
    time.sleep(0.5)

print(f'\nDone: {success}/{len(new_dinosaurs)} succeeded')
if failed:
    print(f'Failed: {", ".join(failed)}')
