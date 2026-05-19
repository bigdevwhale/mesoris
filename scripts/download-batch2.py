import sys, time
sys.path.insert(0, 'scripts')
import importlib.util

spec = importlib.util.spec_from_file_location('dl', 'scripts/download-images.py')
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

new_batch = {
    'anchisaurus': 'Anchisaurus',
    'liliensternus': 'Liliensternus',
    'pisanosaurus': 'Pisanosaurus',
    'riojasaurus': 'Riojasaurus',
    'lystrosaurus': 'Lystrosaurus',
    'nyasasaurus': 'Nyasasaurus',
    'eodromaeus': 'Eodromaeus',
    'yangchuanosaurus': 'Yangchuanosaurus',
    'jobaria': 'Jobaria',
    'tuojiangosaurus': 'Tuojiangosaurus',
    'scelidosaurus': 'Scelidosaurus',
    'vulcanodon': 'Vulcanodon',
    'brontosaurus': 'Brontosaurus',
    'camarasaurus': 'Camarasaurus',
    'torvosaurus': 'Torvosaurus',
    'camptosaurus': 'Camptosaurus',
    'scutellosaurus': 'Scutellosaurus',
    'segnosaurus': 'Segnosaurus',
    'dravidosaurus': 'Dravidosaurus',
    'muttaburrasaurus': 'Muttaburrasaurus',
    'hypsilophodon': 'Hypsilophodon',
    'tenontosaurus': 'Tenontosaurus',
    'nodosaurus': 'Nodosaurus',
    'charonosaurus': 'Charonosaurus',
    'tsintaosaurus': 'Tsintaosaurus',
    'shantungosaurus': 'Shantungosaurus',
    'nomingia': 'Nomingia',
    'saurolophus': 'Saurolophus',
    'pentaceratops': 'Pentaceratops',
    'torosaurus': 'Torosaurus',
    'alamosaurus': 'Alamosaurus',
    'irritator': 'Irritator',
    'neovenator': 'Neovenator',
    'sinoceratops': 'Sinoceratops',
    'diabloceratops': 'Diabloceratops',
}

success = 0
failed = []
for slug, genus in new_batch.items():
    print(f'[{slug}]')
    ok = mod.process_dinosaur(slug, genus)
    if ok:
        success += 1
    else:
        failed.append(slug)
    time.sleep(0.5)

print(f'\nDone: {success}/{len(new_batch)} succeeded')
if failed:
    print(f'Failed: {", ".join(failed)}')
