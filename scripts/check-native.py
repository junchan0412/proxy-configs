#!/usr/bin/env python3
import json
import shutil
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.error import URLError
from urllib.request import urlopen

root = Path(__file__).resolve().parent.parent
with tempfile.TemporaryDirectory(prefix='proxy-configs-') as directory:
    work = Path(directory)
    config = json.loads(subprocess.run(
        ['ruby', '-ryaml', '-rjson', '-e', 'puts YAML.load_file(ARGV[0]).to_json', str(root / 'mihomo/mihomo.yaml')],
        capture_output=True, text=True, check=True).stdout)
    for name, provider in config['rule-providers'].items():
        path = work / (name + '.list')
        shutil.copyfile(root / 'rules/mihomo' / (name + '.list'), path)
        provider['type'] = 'file'
        provider['path'] = str(path)
        provider.pop('url')
    (work / 'config.json').write_text(json.dumps(config, ensure_ascii=False))
    subprocess.run([sys.argv[1], '-t', '-d', str(work), '-f', str(work / 'config.json')], check=True)
    with socket.socket() as listener:
        listener.bind(('127.0.0.1', 0))
        port = listener.getsockname()[1]
    config['tun']['enable'] = False
    config['mixed-port'] = 0
    config['external-controller'] = '127.0.0.1:' + str(port)
    expected = {name: len((work / (name + '.list')).read_text().splitlines())
                for name in config['rule-providers']}
    (work / 'config.json').write_text(json.dumps(config, ensure_ascii=False))
    core = subprocess.Popen([sys.argv[1], '-d', str(work), '-f', str(work / 'config.json')],
                            stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True)
    try:
        for attempt in range(80):
            if core.poll() is not None:
                raise RuntimeError(core.stdout.read())
            try:
                with urlopen('http://127.0.0.1:' + str(port) + '/providers/rules', timeout=1) as response:
                    providers = json.load(response)['providers']
                counts = {name: provider['ruleCount'] for name, provider in providers.items()}
                if set(counts) == set(expected) and all(counts.values()):
                    assert counts == expected, {name: (expected[name], counts[name])
                                                for name in expected if counts[name] != expected[name]}
                    print(str(len(counts)) + ' native rule providers loaded completely')
                    break
            except URLError:
                pass
            time.sleep(0.1)
        else:
            raise RuntimeError('Native rule providers did not finish loading')
    finally:
        core.terminate()
        output = core.communicate(timeout=5)[0]
        if core.returncode:
            print(output)
